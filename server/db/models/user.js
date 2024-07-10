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
      this.hasMany(models.Review, { foreignKey: "userId" });
      this.hasMany(models.Exchange, { foreignKey: "fromUser" });
      this.hasMany(models.Exchange, { foreignKey: "toUser" });
      this.belongsToMany(models.Book, {
        through: models.Favorite,
        foreignKey: "userId",
      });
      this.hasMany(models.Message, { foreignKey: "authorId" });
      this.hasMany(models.Message, { foreignKey: "toUser" });
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
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
