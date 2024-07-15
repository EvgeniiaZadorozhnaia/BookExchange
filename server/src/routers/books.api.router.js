const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/verifyToken");
const multer = require("../middlewares/multer");
const { Book, User, Review } = require("../../db/models");

router
  .get("/", verifyAccessToken, async (req, res) => {
    try {
      const booksByOneOwner = await Book.findAll({
        include: [
          {
            model: User,
            as: "Owner",
          },
        ],
        order: [["rating", "DESC"]],
      });
      res.json(booksByOneOwner);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Произошла ошибка при получении списка книг" });
    }
  })
  .get("/oneBook/:bookId", async (req, res) => {
    const { bookId } = req.params;
    try {
      const book = await Book.findOne({
        where: { id: bookId },
        include: [
          {
            model: Review,
            as: "Review",
            include: [
              {
                model: User,
                as: "User",
              },
            ],
          },
          {
            model: User,
            as: "Owner",
          },
        ],
      });
      res.json(book);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка при получении книги" });
    }
  })
  .delete("/:bookId", verifyAccessToken, async (req, res) => {
    const { bookId } = req.params;

    try {
      await Book.destroy({ where: { id: bookId } });
      res.status(204).send();
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка при удалении книги" });
    }
  })

  .put(
    "/:bookId",
    verifyAccessToken,
    multer.single("frontpage"),
    async (req, res) => {
      const { bookId } = req.params;
      const { title, author, pages } = req.body;
      const pictureUrl = req.file ? `${req.file.originalname}` : null;
      console.log("pictureUrl", pictureUrl);

      try {
        const updatedBook = await Book.update(
          {
            title,
            author,
            pages,
            pictureUrl,
          },
          {
            where: {
              id: bookId,
            },
          }
        );
        const book = await Book.findByPk(bookId);
        return res.status(200).json(book);
      } catch (error) {
        return res.status(500).json({
          message: "Произошла ошибка при обновлении книги",
          error: error.message,
        });
      }
    }
  )

  .post(
    "/:ownerId",
    verifyAccessToken,
    multer.single("frontpage"),
    async (req, res) => {
      const { ownerId } = req.params;
      const { title, author, pages } = req.body;
      const pictureUrl = req.file ? `${req.file.originalname}` : null;

      try {
        const newBook = await Book.create({
          ownerId,
          title,
          author,
          pages,
          pictureUrl,
        });
        return res
          .status(201)
          .json({ message: "Книга успешно создано", book: newBook });
      } catch (error) {
        return res.status(500).json({
          message: "Произошла ошибка при создании книги",
          error: error.message,
        });
      }
    }
  )

  .get("/:ownerId", verifyAccessToken, async (req, res) => {
    const { ownerId } = req.params;
    try {
      const books = await Book.findAll({ where: { ownerId } });
      const data = books.map((el) => el.get({ plain: true }));

      res.json(data);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        message: "Произошла ошибка при получении списка книг пользователя",
      });
    }
  })
  .get("/:id/owner", verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const booksWithOwner = await Book.findAll({
        where: { id },
        include: [
          {
            model: User,
            as: "Owner",
          },
        ],
      });
      res.json(booksWithOwner);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Произошла ошибка при получении владельца книги" });
    }
  })
  .get("/:ownerId/all", verifyAccessToken, async (req, res) => {
    const { ownerId } = req.params;
    try {
      const booksByOneOwner = await Book.findAll({
        where: { ownerId },
        include: [
          {
            model: User,
            as: "Owner",
          },
        ],
      });
      res.json(booksByOneOwner);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Произошла ошибка при получении владельца книги" });
    }
  })

  .put("/rate/:bookId", async (req, res) => {
    const { bookId } = req.params;
    const { rating } = req.body;

    try {
      const [numberOfUpdatedRows] = await Book.update(
        {
          rating,
        },
        { where: { id: bookId } }
      );

      if (numberOfUpdatedRows === 0) {
        return res.status(404).json({ message: "Книга не найдена" });
      }

      const updatedBook = await Book.findByPk(bookId);
      res.json(updatedBook);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ message: "Произошла ошибка при обновлении рейтинга" });
    }
  })

  .delete('/:userId/allBooks', async (req, res) => {
    const { userId } = req.params;
    try {
      await Book.destroy({where: {ownerId: userId}});
      res.status(204).send();
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Произошла ошибка при удалении книг" });
    }
  })

module.exports = router;
