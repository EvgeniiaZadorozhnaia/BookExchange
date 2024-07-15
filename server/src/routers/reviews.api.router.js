const router = require("express").Router();
const { Review, User } = require("../../db/models");

router
  .get("/:bookId", async (req, res) => {
    const { bookId } = req.params;
    try {
      const reviews = await Review.findAll({
        where: { bookId },
        include: { model: User, attributes: ["username", "id", "createdAt", "avatarUrl"] },
      });
      res.json(reviews);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Произошла ошибка при получении отзывов" });
    }
  })

  .put("/like/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.findByPk(id);
      if (!review) {
        throw new Error("Отзыв не найден");
      }
      review.likes = (review.likes || 0) + 1;
      await review.save();
      res.status(200).json({ message: "Лайк успешно добавлен" });
    } catch (error) {
      console.error("Ошибка при обновлении лайков:", error);
    }
  })

  .put("/dislike/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.findByPk(id);
      if (!review) {
        throw new Error("Отзыв не найден");
      }
      review.dislikes = (review.dislikes || 0) + 1;
      await review.save();
      res.status(200).json({ message: "Дизлайк успешно добавлен" });
    } catch (error) {
      console.error("Ошибка при обновлении лайков:", error);
    }
  })

  .post("/:userId/:bookId", async (req, res) => {
    const { userId, bookId } = req.params;
    const { content } = req.body;
    try {
      const newReview = await Review.create({
        content,
        userId,
        bookId,
      });

      const reviewWithUser = await Review.findOne({
        where: { id: newReview.id },
        include: {
          model: User,
          as: "User",
        },
      });

      res.status(201).json(reviewWithUser);
    } catch (error) {
      res.status(500).json({ error: "Ошибка при создании отзыва." });
    }
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Review.destroy({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Ошибка при удалении отзыва." });
    }
  });

module.exports = router;
