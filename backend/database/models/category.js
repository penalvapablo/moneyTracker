'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Movement, {  foreignKey: 'categoryId' }),
      Category.belongsTo(models.Type, {  foreignKey: 'typeId' })
      Category.belongsTo(models.User, {  foreignKey: 'userId' })
    }
  }
  Category.init({
    name: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: true,
  });
  return Category;
};