const router = require("express").Router();
const { Book, User, Favorite } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router
  .get("/", async (req, res) => {
    try {
      const favoriteBooks = await Book.findAll({
        include: [
          {
            model: Favorite,
          },
        ],
      });
      res.json(favoriteBooks);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Произошла ошибка при получении списка книг" });
    }
  })

  .post("/", async (req, res) => {
    try {
      const { bookId, userId } = req.body;
      const book = await Favorite.create({ bookId, userId });
      res.status(201).json(book);
    } catch (error) {
      console.log(error);
      res
      .status(500)
      .json({ message: "Произошла ошибка при добавлении книги в избранное" });
    }
  });

module.exports = router;
