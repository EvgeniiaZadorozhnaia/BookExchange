const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');
const mainRouter = require('./main.api.router');


router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/main', mainRouter);




module.exports = router;
