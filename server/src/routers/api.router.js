const router = require('express').Router();

const messagesRouter = require("./messages.api.router");
const exchangesRouter = require("./exchanges.api.router");
const authRouter = require("./auth.api.router");
const tokensRouter = require("./tokens.api.router");
const booksRouter = require("./books.api.router");

router.use("/tokens", tokensRouter);
router.use("/auth", authRouter);
router.use("/messages", messagesRouter);
router.use("/exchanges", exchangesRouter);
router.use("/books", booksRouter);

module.exports = router;
