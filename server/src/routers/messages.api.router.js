const router = require("express").Router();

const { Message, User } = require("../../db/models");

router
.get('/:userId/exchange/:exchangeId', async (req, res) => {
  const { userId, exchangeId } = req.params;
  try {
    const messages = await Message.findAll({
      where: { exchangeId },
      include: [{ model: User, as: 'Author' },{ model: User, as: 'Reciever' }]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении сообщений.' });
  }
})
.post('/', async (req, res) => {
  const { text, authorId, toUser, exchangeId } = req.body;
  try {
    const newMessage = await Message.create({
      text,
      authorId,
      toUser,
      exchangeId
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании сообщения.' });
  }
})

module.exports = router;
