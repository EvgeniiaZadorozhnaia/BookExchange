const router = require('express').Router();

const messagesRouter = require("./messages.api.router");
const exchangesRouter = require("./exchanges.api.router");
const authRouter = require("./auth.api.router");
const tokensRouter = require("./tokens.api.router");
const booksRouter = require("./books.api.router");
const usersRouter = require("./user.api.router");
const reviewsRouter = require("./reviews.api.router");

router.use("/tokens", tokensRouter);
router.use("/auth", authRouter);
router.use("/messages", messagesRouter);
router.use("/exchanges", exchangesRouter);
router.use("/books", booksRouter);
router.use("/users", usersRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;
