const router = require("express").Router();
const { Like } = require("../../db/models");

router
  .get("/", async (req, res) => {
    try {
      const data = await Like.findAll();
      const Likes = data.map((like) => like.reviewId);
      res.json(Likes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })

  .post("/", async (req, res) => {
    console.log("В ручке я");
    const { userId, reviewId } = req.body;
    console.log(userId, reviewId);
    try {
      const [like, created] = await Like.findOrCreate({
        where: { userId, reviewId },
        default: { userId, reviewId },
      });
      console.log(like, created);
      res.json(created);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  });

module.exports = router;
