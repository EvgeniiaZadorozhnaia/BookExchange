const router = require("express").Router();

const { Exchange, User } = require("../../db/models");

router
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const exchanges = await Exchange.findAll({
        where: { toUser: id },
        include: [
          {
            model: User,
            as: "Author",
          },
          {
            model: User,
            as: "Reciever",
          },
        ],
      });
      res.json(exchanges);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })

module.exports = router;
