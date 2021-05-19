const globalRouter = require('express').Router()
const coingecko = require('../utils/coingecko')

globalRouter.get('/', (req, res, next) => {
  coingecko
    .getGlobals()
    .then(response => res.status(200).json(response.data))
    .catch(error => next(error))
})

module.exports = globalRouter
