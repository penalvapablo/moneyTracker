const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { createCategory, updateCategory, getCategory, getCategoriesByUser, getAllCategories, deleteCategory } = require('../services/category')
const { decodeToken } = require('../middlewares/jwt')

module.exports = {
  create: catchAsync(async (req, res, next) => {
    const { name, typeId } = req.body
    const { id: userId } = decodeToken(req)
    const category = await createCategory({ name, typeId, userId })
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'Category created',
      body: { category },
    })
  }
  ),
  update: catchAsync(async (req, res, next) => {
    const category = await updateCategory(req)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Category updated',
      body: { category },
    })
  }
  ),
  getById: catchAsync(async (req, res, next) => {
    const category = await getCategory(req.params.id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Category retrieved',
      body: { category },
    })
  },
  ),
  getByUser: catchAsync(async (req, res, next) => {
    const { id: userId } = decodeToken(req)
    const categories = await getCategoriesByUser(userId)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Categories retrieved',
      body: { categories },
    })
  }
  ),
  getAll: catchAsync(async (req, res, next) => {
    const categories = await getAllCategories(req)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Categories retrieved',
      body: { categories },
    })
  },
  ),
  delete: catchAsync(async (req, res, next) => {
    const category = await deleteCategory(req.params.id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Category deleted',
      body: { category },
    })
  },
  )
}