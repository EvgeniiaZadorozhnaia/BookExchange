const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/verifyToken");
const { Book } = require("../../db/models");
const { User } = require("../../db/models");

router
  .get("/", async (req, res) => {
    try {
      const books = await Book.findAll({
        include: { model: User, attributes: ["city"] },
      });
      console.log(books);
      res.json(books.map((el) => el.get({ plain: true })));
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Произошла ошибка при получении списка книг" });
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

  .post("/:ownerId", verifyAccessToken, async (req, res) => {
    const { ownerId } = req.params;
    const { title, author, pages, pictureUrl } = req.body;

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
      return res
        .status(500)
        .json({
          message: "Произошла ошибка при создании книги",
          error: error.message,
        });
    }
  })

  .get("/:ownerId", verifyAccessToken, async (req, res) => {
    const { ownerId } = req.params;
    try {
      const books = await Book.findAll({ where: { ownerId } });
      const data = books.map((el) => el.get({ plain: true }));

      res.json(data);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({
          message: "Произошла ошибка при получении списка книг пользователя",
        });
    }
  });

// .get("/filteredBooks", async (req, res) => {
//   const { input, city } = req.query;
//   try {
//     let users = await User.findAll({ where: { city } });
//     users = users.map((el) => el.id);
//     console.log(users);
//     let books = await Book.findAll({
//       where: {
//         userId: {
//           [Sequelize.Op.in]: users,
//         },
//       },
//     });
//     if (input) {
//       books = books.filter(
//         (book) =>
//           book.title.toLowerCase().includes(input.toLowerCase()) ||
//           book.author.toLowerCase().includes(input.toLowerCase())
//       );
//     }
//     res.json(books);
//   } catch (error) {
//     console.error(error.message);
//     res
//       .status(500)
//       .json({ message: "Произошла ошибка при получении списка книг" });
//   }
// });

module.exports = router;
