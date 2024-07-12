'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RatingBook extends Model {
    static associate(models) {
    }
  }
  RatingBook.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    mark: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'RatingBook',
  });
  return RatingBook;
};