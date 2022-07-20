const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes/index')
const { errorConverter, errorHandler } = require('./middlewares/errorHandler')

const port = process.env.PORT || 3000

const app = express()
app.use(cors())


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not Found'))
})

// error converter
app.use(errorConverter)
// error handler
app.use(errorHandler)


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor funcionando en el puerto ${port}`)
})

