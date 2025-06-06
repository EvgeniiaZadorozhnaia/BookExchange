"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Book, { foreignKey: "ownerId" });
      this.hasMany(models.Review, { foreignKey: "userId", as: "reviews" });
      this.hasMany(models.Exchange, { foreignKey: "fromUser" });
      this.hasMany(models.Exchange, { foreignKey: "toUser" });
      this.belongsToMany(models.Book, {
        through: models.Favorite,
        foreignKey: "userId",
      });
      this.belongsToMany(models.Review, {
        through: models.Like,
        foreignKey: "userId", as: "Review",
      });
      this.belongsToMany(models.Review, {
        through: models.Dislike,
        foreignKey: "userId",
      });
      this.hasMany(models.Message, { foreignKey: "authorId" });
      this.hasMany(models.Message, { foreignKey: "toUser" });
      this.belongsToMany(models.Book, {
        through: models.RatingBook,
        foreignKey: "userId", as: "Book",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      numberOfRating: DataTypes.INTEGER,
      placeOfMeeting: DataTypes.STRING,
      city: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      isBlocked: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
