const { Movement, Category, Type } = require('../database/models');
const { ErrorObject } = require('../helpers/errorObject');
const httpStatus = require('../helpers/httpStatus');

module.exports = {
  createMovement: async (data) => {
    const { id: typeId } = await Type.findOne({ where: { name: data.type } })
    const category = await Category.findOne({ where: { name: data.category, userId: data.userId, typeId } });
    if (!category) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Category not found');
    }
    data.categoryId = category.id;
    data.typeId = typeId;
    const movement = await Movement.create(data);
    return movement;
  },
  updateMovement: async (req) => {
    const { id } = req.params;
    const { concept, amount, date, category: categoryName, type } = req.body;
    const { id: typeId } = await Type.findOne({ where: { name: type } })
    const category = await Category.findOne({ where: { name: categoryName, typeId: typeId } });
    if (!category) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Category not found');
    }
    const categoryId = category.id;
    const movement = await Movement.update({ concept, amount, date, categoryId, typeId }, { where: { id } });
    if (movement[0] === 0) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Movement not found');
    }
    const movementUpdated = await Movement.findOne({ where: { id } });
    return movementUpdated;
  },
  getMovement: async (id, userId) => {
    const movement = await Movement.findOne({
      where: { id },
      include: [
        {
          model: Type,
          attributes: ["name"],
        },
        {
          model: Category,
          attributes: ["name"],
        }
      ],
    });
    if (movement.userId !== userId) {
      throw new ErrorObject(httpStatus.UNAUTHORIZED, 'Movement not found');
    }
    if (!movement) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Movement not found');
    }
    return movement;
  }
  ,
  getMovementsByUser: async (userId) => {
    const movements = await Movement.findAll({
      where: { userId },
      include: [
        {
          model: Type,
          attributes: ["name"],
        },
        {
          model: Category,
          attributes: ["name"],
        }
      ],
    });
    if (!movements) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Movement not found');
    }
    return movements;
  }
  ,
  getAllMovements: async () => {
    const movements = await Movement.findAll();
    if (!movements) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Movement not found');
    }
    return movements;
  }
  ,
  deleteMovement: async (id) => {
    const movement = await Movement.destroy({ where: { id } });
    if (movement === 0) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Movement not found');
    }
    return movement;
  }
  ,
  getMovementsByType: async (typeId) => {
    const movements = await Movement.findAll({ where: { typeId } });
    if (!movements) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Movement not found');
    }
    return movements;
  }
  ,
  getMovementsByCategory: async (categoryId) => {
    const movements = await Movement.findAll({ where: { categoryId } });
    if (!movements) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Movement not found');
    }
    return movements;
  }
  ,
  getMovementsByDate: async (date) => {
    const movements = await Movement.findAll({ where: { date } });
    if (!movements) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Movement not found');
    }
    return movements;
  }
  ,
  getMovementsByConcept: async (concept) => {
    const movements = await Movement.findAll({ where: { concept } });
    if (!movements) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Movement not found');
    }
    return movements;
  }
  ,
  getMovementsByAmount: async (amount) => {
    const movements = await Movement.findAll({ where: { amount } });
    if (!movements) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Movement not found');
    }
    return movements;
  }
}