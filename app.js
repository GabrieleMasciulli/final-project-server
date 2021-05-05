const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const app = express()
const cors = require('cors')

//routers
const cryptoRouter = require('./controllers/crypto')
const authenticationRouter = require('./controllers/authentication')
const authorizationRouter = require('./controllers/authorization')

//middlewares
const devUtilsMiddleware = require('./middlewares/dev_utils')

//utils
const logger = require('./utils/logger')

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

app.use(compression())
app.use(cors())
app.use(express.static('build'))

//increasing the limit of data which can pass through express server
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(devUtilsMiddleware.requestLogger)

app.use('/api/cryptos', cryptoRouter)
app.use('/api/auth', authenticationRouter)
app.use('/api/test', authorizationRouter)

app.use(devUtilsMiddleware.unknownEndpoint)
app.use(devUtilsMiddleware.errorHandler)

module.exports = app
