const { extensions } = require("sequelize/lib/utils/validator-extras");

function removeHeader(req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
}

function checkId(req, res, next) {
  const { id } = req.params;
  if (Number(id)) {
    next();
  } else {
    res.status(400).send(`
        <h1>Неверный тип данных для id</h1>
        <a href='/'>На главную</a>
      `);
  }
}

function checkBody(req, res, next) {
  const { id, price, userAnswer } = req.body;
  if (id || price || userAnswer) {
    next();
  } else {
    res.status(409).send("Нет необходимых данных для изменений");
  }
}

function checkIdAndPrice(req, res, next) {
  const { id, price } = req.body;
  if (Number(id) && Number(price)) {
    next();
  } else {
    res.status(409).send("Нет необходимых данных для изменений");
  }
}


module.exports = { removeHeader, checkId, checkBody, checkIdAndPrice };
