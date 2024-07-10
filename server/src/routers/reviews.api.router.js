const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/verifyToken");
const { Review, User } = require("../../db/models");

router.get("/:bookId", async (req, res) => {
  const { bookId } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { bookId },
      include: { model: User, attributes: ["username", "id", "createdAt"] },
    });
    res.json(reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Произошла ошибка при получении отзывов" });
  }
});

module.exports = router;
