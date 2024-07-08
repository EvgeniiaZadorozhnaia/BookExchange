"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({}) {}
  }
  Question.init(
    {
      topic: DataTypes.STRING,
      price: DataTypes.INTEGER,
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
