const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const cryptoRouter = require('./controllers/crypto')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const compression = require('compression')

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

app.use(cors())
app.use(express.static('build'))

//increasing the limit of data which can pass through express server
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(middleware.requestLogger)

app.use('/api/cryptos', cryptoRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.use(compression())

module.exports = app
