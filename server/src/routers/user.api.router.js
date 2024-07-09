const router = require("express").Router();
const { User } = require("../../db/models");
router.get("/allCities", async (req, res) => {
  try {
    const cities = await User.findAll({ attributes: ["city"] });
    console.log(cities);
    const uniqueCities = [...new Set(cities)]
    console.log(uniqueCities);
    res.json(uniqueCities.map((el) => el.city));
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Произошла ошибка при получении списка городов" });
  }
});

module.exports = router;
