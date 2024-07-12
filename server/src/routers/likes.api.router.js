const router = require("express").Router();
const { Like } = require("../../db/models");

router
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Like.findAll({ where: { userId: id } });
      const Likes = data.map((like) => like.reviewId);
      res.json(Likes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })

  .post("/", async (req, res) => {
    const { userId, reviewId } = req.body;
    try {
      const [like, created] = await Like.findOrCreate({
        where: { userId, reviewId },
        default: { userId, reviewId },
      });
      res.json(created);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })

  .delete("/:userId/:id", async (req, res) => {
    const { userId, id } = req.params;
    try {
      await Like.destroy({ where: { userId, reviewId: id } });
      res.status(204).send();
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })

module.exports = router;
