const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');
const booksRouter = require('./books.api.router');
const usersRouter = require('./user.api.router');


router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/books', booksRouter);
router.use('/users', usersRouter);

module.exports = router;
