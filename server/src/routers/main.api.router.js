const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/verifyToken");
const { Question, User } = require("../../db/models");
const { checkBody, checkIdAndPrice } = require("../middlewares/common");



module.exports = router;
