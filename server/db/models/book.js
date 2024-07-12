"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "ownerId", as: "Owner" });
      this.hasMany(models.Review, { foreignKey: "bookId", as: "Review" });
      this.hasMany(models.Exchange, { foreignKey: "fromBook" });
      this.hasMany(models.Exchange, { foreignKey: "toBook" });
      this.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: "bookId",
      });
      this.belongsToMany(models.User, {
        through: models.RatingBook,
        foreignKey: "bookId",
        as: "Book",
      });
    }
  }
  Book.init(
    {
      ownerId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      rating: DataTypes.FLOAT,
      numberOfRating: DataTypes.INTEGER,
      pictureUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
