const router = require("express").Router();
const { User } = require("../../db/models");
router
  .get("/allCities", async (req, res) => {
    try {
      const cities = await User.findAll({ attributes: ["city"] });
      const uniqueCities = [...new Set(cities)];
      res.json(uniqueCities.map((el) => el.city));
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

module.exports = router;
