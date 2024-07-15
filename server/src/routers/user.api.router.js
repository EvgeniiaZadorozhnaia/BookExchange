const router = require("express").Router();
const { User, Review } = require("../../db/models");
router

.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        isAdmin: null,
      },
      include: [
        {
          model: Review,
          as: "reviews",
          attributes: ["id", "content", "likes", "dislikes"],
        },
      ],
      attributes: ["id", "username", "email", "rating", "isBlocked"],
    });
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Произошла ошибка при получении пользователей и их отзывов",
    });
  }
})

  .get("/allCities", async (req, res) => {
    try {
      const cities = await User.findAll({ attributes: ["city", "id"] });
      const newCities = cities.map((el) => el.city)
      const uniqueCities = [...new Set(newCities)];
      res.json(uniqueCities);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ message: "Произошла ошибка при получении списка городов" });
    }
  })
  .put("/rate/:userId", async (req, res) => {
    const { userId } = req.params;
    const { rating, numberOfRating } = req.body;

    try {
      const [numberOfUpdatedRows] = await User.update(
        {
          rating,
          numberOfRating,
        },
        { where: { id: userId } }
      );

      if (numberOfUpdatedRows === 0) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const updatedUser = await User.findByPk(userId);
      res.json(updatedUser);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ message: "Произошла ошибка при обновлении пользователя" });
    }
  });

router.put("/:id/block", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }
    if (user.isBlocked) {
      return res.status(400).json({ message: "Пользователь уже заблокирован" });
    }

    user.isBlocked = true;
    await user.save();

    res.status(200).json({ message: "Пользователь успешно заблокирован" });
  } catch (error) {
    console.error("Ошибка при блокировке пользователя:", error.message);
    res
      .status(500)
      .json({ message: "Произошла ошибка при блокировке пользователя" });
  }
});

module.exports = router;
