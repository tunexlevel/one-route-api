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
    }
  }

  Message.init({
    phone_no: DataTypes.STRING,
    msg_id: DataTypes.STRING,
    message: DataTypes.STRING,
    type: DataTypes.STRING,
    timestamp: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};