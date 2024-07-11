const router = require("express").Router();

const { Exchange, User } = require("../../db/models");

router
  .get("/incoming/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const exchanges = await Exchange.findAll({
        where: { toUser: id },
        include: [
          {
            model: User,
            as: "Author",
          },
          {
            model: User,
            as: "Reciever",
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.json(exchanges);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })
  .get("/outcoming/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const exchanges = await Exchange.findAll({
        where: { fromUser: id },
        include: [
          {
            model: User,
            as: "Author",
          },
          {
            model: User,
            as: "Reciever",
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.json(exchanges);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })
  .get("/history/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const exchangesIncoming = await Exchange.findAll({
        where: { toUser: userId },
        include: [
          {
            model: User,
            as: "Author",
          },
          {
            model: User,
            as: "Reciever",
          },
        ],
      });
      const exchangesOutcoming = await Exchange.findAll({
        where: { fromUser: userId },
        include: [
          {
            model: User,
            as: "Author",
          },
          {
            model: User,
            as: "Reciever",
          },
        ],
      });
      res.json({ exchangesIncoming, exchangesOutcoming });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })
  .post("/", async (req, res) => {
    const { fromUser, toUser, toBook } = req.body;
    try {
      const newExchange = await Exchange.create({
        fromUser,
        toUser,
        toBook,
        status: "processing",
      });
      res.json(newExchange);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  });

module.exports = router;
