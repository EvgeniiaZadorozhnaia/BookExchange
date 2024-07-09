'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "authorId", as: 'Author' });
      this.belongsTo(models.User, { foreignKey: "toUser", as: "Reciever" });
      this.belongsTo(models.Exchange, { foreignKey: "exchangeId" });
    }
  }
  Message.init({
    text: DataTypes.TEXT,
    authorId: DataTypes.INTEGER,
    toUser: DataTypes.INTEGER,
    exchangeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};