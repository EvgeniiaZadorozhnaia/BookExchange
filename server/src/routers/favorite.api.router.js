const router = require("express").Router();
const { Book, Favorite } = require("../../db/models");

router.get("/", async (req, res) => {
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
});

module.exports = router;
