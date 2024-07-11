'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
      this.belongsTo(models.Book, { foreignKey: 'bookId' });
      this.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'reviewId', as: 'Review',
      });
      this.belongsToMany(models.User, {
        through: models.Dislike,
        foreignKey: 'reviewId',
      });
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};