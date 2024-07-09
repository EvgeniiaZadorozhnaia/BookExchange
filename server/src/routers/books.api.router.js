const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/verifyToken");
const { Book } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
    console.log(books);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Произошла ошибка при получении списка книг" });
  }
});

module.exports = router;
