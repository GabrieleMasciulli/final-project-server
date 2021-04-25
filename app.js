const express = require('express')
const app = express()
const cors = require('cors')
const cryptosRouter = require('./controllers/cryptos')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

logger.info('Connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors)
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/cryptos', cryptosRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
