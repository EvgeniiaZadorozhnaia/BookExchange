const router = require("express").Router();
const { Dislike } = require("../../db/models");

router

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Dislike.findAll({ where: { userId: id } });
      const Dislikes = data.map((dislike) => dislike.reviewId);
      res.json(Dislikes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })
  .post("/", async (req, res) => {
    try {
      const { userId, reviewId } = req.body;
      const [dislike, created] = await Dislike.findOrCreate({
        where: { userId, reviewId },
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
      await Dislike.destroy({ where: { userId, reviewId: id } });
      res.status(204).send();
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })

module.exports = router;
