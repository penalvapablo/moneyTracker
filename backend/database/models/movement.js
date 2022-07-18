'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movement.belongsTo(models.Type, {
        foreignKey: 'typeId'
      }),
        Movement.belongsTo(models.Category, {
          foreignKey: 'categoryId'
        }),
        Movement.belongsTo(models.User, {
          foreignKey: 'userId'
        })
    }
  }
  Movement.init({
    typeId: DataTypes.INTEGER,
    concept: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movement',
    timestamps: true,
    paranoid: true,
  });
  return Movement;
};