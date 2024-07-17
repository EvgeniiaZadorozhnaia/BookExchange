const router = require("express").Router();
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const { User } = require("../../db/models");
const generateToken = require("../utils/generateToken");
const cookiesConfig = require("../configs/cookiesConfig");
const multer = require("../middlewares/multer");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "eu.skorobogatowa@gmail.com",
    pass: "jjns jwze fhbs jyjt",
  },
});

router
  .post("/signup", multer.single("avatarUrl"), async (req, res) => {
    const { username, email, password, city, placeOfMeeting } = req.body;
    const avatarUrl = req.file ? `${req.file.originalname}` : null;

    if (
      !(username && email && password && city && placeOfMeeting && avatarUrl)
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(403)
        .json({ message: "User with this email already exists" });
    }

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
        city,
        placeOfMeeting,
        avatarUrl,
      },
    });

    const plainUser = user.get();
    delete plainUser.password;

    if (!created) res.status(403).json({ message: "User already exists" });

    //! Генерируем access и refresh
    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    //! Устанавливаем cookie с access токеном
    res
      .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
      .json({ user: plainUser, accessToken });
  })

  .post("/send", async (req, res) => {
    const { to, subject, text } = req.body;


    const mailOptions = {
      from: "eu.skorobogatowa@gmail.com",
      to,
      subject,
      text,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).send(`Email sent: ${info.response}`);
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send(`Error sending email: ${error.toString()}`);
    }
  })
  .post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Incorrect user or password" });
      }

      const correctPass = await bcrypt.compare(password, user.password);
      if (!correctPass) {
        return res.status(401).json({ message: "Incorrect user or password" });
      }

      const plainUser = user.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      res
        .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
        .json({ user: plainUser, accessToken });
    } catch (error) {
      console.error("Error in signin:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
  .get("/logout", (req, res) => {
    res.clearCookie("refreshToken").sendStatus(200);
  });

module.exports = router;
