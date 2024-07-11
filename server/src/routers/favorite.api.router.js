const router = require("express").Router();
const { Book, User, Favorite } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const favoriteBooks = await Book.findAll({
      include:[
        { model: User, where: { id }, required: true },
        { model: User, as: "Owner"}
      ] 
    });
    res.json(favoriteBooks);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Произошла ошибка при получении списка книг" });
  }
})

  .delete("/:userId/:bookId", verifyAccessToken, async (req, res) => {
    const { bookId, userId } = req.params;
    try {
      await Favorite.destroy({ where: { bookId, userId } });
      res.status(204).send();
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка при удалении книги" });
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
