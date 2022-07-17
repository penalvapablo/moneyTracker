const express = require('express')
const userRouter = require('./user')
const categoryRouter = require('./category')
const router = express.Router()

// user routes
router.use('/user', userRouter)

// catgory routes
router.use('/category', categoryRouter)



module.exports = router
