const { Category, Type, Movement } = require('../database/models')
const { ErrorObject } = require('../helpers/errorObject')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  createCategory: async (data) => {

    const { id: typeId } = await Type.findOne({ where: { name: data.type } })

    const {
      name,
      userId,
    } = data
    const [category, created] = await Category.findOrCreate({
      where: { name, typeId, userId },
      defaults: {
        name,
        typeId,
        userId
      },
    })
    if (!created) throw new ErrorObject(httpStatus.CONFLICT, 'Category already exists')
    return category
  },
  updateCategory: async (req) => {
    const { name, typeId } = req.body
    const idCategory = req.params.id
    const result = await Category.update(
      {
        name,
        typeId
      },
      {
        where: { id: idCategory },
      },
    )
    if (result[0] === 0) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Category not found')
    }
    const category = await Category.findOne({ where: { id: idCategory } })
    return category
  },
  getCategory: async (id) => {
    const category = await Category.findOne({ where: { id } })
    if (!category) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Category not found')
    }
    return category
  },
  getCategoriesByUser: async (userId) => {
    const categories = await Category.findAll({ where: { userId: userId }, include: [{ model: Type, attributes: ["name"] }] })
    if (!categories) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Category not found')
    }
    return categories
  },
  getAllCategories: async () => {
    const categories = await Category.findAll()
    return categories
  },
  deleteCategory: async (id) => {
    await Movement.destroy({ where: { categoryId: id } })
    const category = await Category.destroy({
      where: { id },
    })
    if (category === 0) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'Category not found')
    }
    return
  },
}