const router = require("express").Router();
const { Dislike } = require("../../db/models");

router
  .post("/", async (req, res) => {
    try {
      const { userId, reviewId } = req.body;
      const [dislike, created] = await Dislike.findOrCreate({ where: { userId, reviewId } });
      res.json(created);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  });

module.exports = router;
