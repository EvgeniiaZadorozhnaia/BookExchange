const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/verifyToken");
const { Book } = require("../../db/models");

router.get("/", async (req, res) => {
  
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Произошла ошибка при получении списка книг" });
  }
})

  .delete('/:bookId', verifyAccessToken, async (req, res) => {
    
    const { bookId } = req.params;
    
    try {
      await Book.destroy({ where: { id: bookId } });
      res.status(204).send();
    } catch (error) {
      console.error(error.message);
      res
       .status(500)
       .json({ message: "Произошла ошибка при удалении книги" });
    }
  })

  .post('/:ownerId', verifyAccessToken, async (req, res) => {
    
    const { ownerId } = req.params;
    const {
      title, author, pages, pictureUrl
    } = req.body;
    
    try {
      const newBook = await Book.create({
        ownerId,
        title,
        author,
        pages,
        pictureUrl,
      });
      return res.status(201).json({ message: 'Книга успешно создано', book: newBook });
    } catch (error) {
      return res.status(500).json({ message: 'Произошла ошибка при создании книги', error: error.message });
    }
  })

  .get('/:ownerId', verifyAccessToken, async (req, res) => {
    
    const { ownerId } = req.params;
    try {
      const books = await Book.findAll({ where: { ownerId } });
      const data = books.map((el) => el.get({ plain: true }))

      res.json(data);
    } catch (error) {
      console.error(error.message);
      res
       .status(500)
       .json({ message: "Произошла ошибка при получении списка книг пользователя" });
    }
  })

  

module.exports = router;
