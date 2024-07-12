const router = require("express").Router();
const { RatingBook } = require("../../db/models");

router

  .get("/:userId/:bookId", async (req, res) => {
    const { userId, bookId } = req.params;
    try {
      const rating = await RatingBook.findOne({ where: { userId, bookId } });
      if (!rating) {
        return res
          .status(417)
          .json({
            message: "Рейтинга для этого пользователя и книги не найдено",
          });
      }
      res.json(rating);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })

  .post("/", async (req, res) => {
    const { userId, bookId, mark } = req.body;
    try {
      const [rating, created] = await RatingBook.findOrCreate({
        where: { userId, bookId },
        defaults: { userId, bookId, mark },
      });
      res.json(created);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  });

module.exports = router;