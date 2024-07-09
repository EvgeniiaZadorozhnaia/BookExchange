const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/verifyToken");
const { Book } = require("../../db/models");
const { User } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll({ include: { model: User, attributes: ['city'] } });
    console.log(books)
    res.json(books.map((el) => el.get({ plain: true })));
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Произошла ошибка при получении списка книг" });
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
