'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exchange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'fromUser', as: 'Author' });
      this.belongsTo(models.User, { foreignKey: 'toUser', as: 'Reciever' });
      this.belongsTo(models.Book, { foreignKey: 'fromBook', as: "BookFromAuthor" });
      this.belongsTo(models.Book, { foreignKey: 'toBook', as: "BookFromReciever" });
      this.hasMany(models.Message, { foreignKey: "exchangeId" });
    }
  }
  Exchange.init({
    fromUser: DataTypes.INTEGER,
    fromBook: DataTypes.INTEGER,
    toUser: DataTypes.INTEGER,
    toBook: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exchange',
  });
  return Exchange;
};