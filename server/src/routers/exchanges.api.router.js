const router = require("express").Router();
const { Exchange, User } = require("../../db/models");

router
  .post("/", async (req, res) => {
    const { fromUser, fromBook, toUser, toBook } = req.body;
    try {
      const newExchange = await Exchange.create({
        fromUser,
        fromBook,
        toUser,
        toBook,
        status: "pending",
      });
      res.json(newExchange);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })
  .get("/incoming/:id", async (req, res) => {
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
        order: [["createdAt", "DESC"]],
      });
      res.json(exchanges);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })
  .get("/outcoming/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const exchanges = await Exchange.findAll({
        where: { fromUser: id },
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
        order: [["createdAt", "DESC"]],
      });
      res.json(exchanges);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })
  .get("/history/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const exchangesIncoming = await Exchange.findAll({
        where: { toUser: userId },
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
      const exchangesOutcoming = await Exchange.findAll({
        where: { fromUser: userId },
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
      res.json({ exchangesIncoming, exchangesOutcoming });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })
  .put("/:exchangeId", async (req, res) => {
    const { exchangeId } = req.params;
    const { status } = req.body;
    try {
      const [numberOfUpdatedRows] = await Exchange.update(
        { status },
        { where: { id: exchangeId } }
      );

      if (numberOfUpdatedRows === 0) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      
      const updatedExchange = await Exchange.findByPk(exchangeId);
      res.json(updatedExchange);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const exchange = await Exchange.findByPk(id);
      res.json(exchange)
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка" });
    }
  });

module.exports = router;
