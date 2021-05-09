const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const app = express()
const cors = require('cors')
const path = require('path')

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
// if (process.env.NODE_ENV === 'production') {

//   // Express serve up index.html file if it doesn't recognize route
//   app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
//   })

//   app.get('/detail/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
//   })
// }

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
