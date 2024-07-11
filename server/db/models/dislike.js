'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dislike extends Model {
    static associate(models) {
    }
  }
  Dislike.init({
    userId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dislike',
  });
  return Dislike;
};