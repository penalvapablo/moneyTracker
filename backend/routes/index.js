const express = require('express')
const userRouter = require('./user')
const categoryRouter = require('./category')
const movementRouter = require('./movement')
const router = express.Router()

// user routes
router.use('/user', userRouter)

// catgory routes
router.use('/category', categoryRouter)

// movement routes
router.use('/movement', movementRouter)



module.exports = router
