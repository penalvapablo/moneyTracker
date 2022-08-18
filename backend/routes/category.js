const router = require('express').Router()
const { auth } = require('../middlewares/auth')
const { validateSchema } = require('../middlewares/validateSchema')
const { categorySchema } = require('../schemas/category')
const { create, update, getById, getByUser, getAll, delete: deleteCategory } = require('../controllers/category')

router.get('/', auth, getByUser)

router.post('/', auth, validateSchema(categorySchema), create)

router.put('/:id', auth, validateSchema(categorySchema), update)

router.delete('/:id', auth, deleteCategory)

module.exports = router
