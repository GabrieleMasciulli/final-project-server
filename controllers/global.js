const globalRouter = require('express').Router()
const coingecko = require('../utils/coingecko')

globalRouter.get('/', async (req, res) => {
  const globals = await coingecko.getGlobals()

  res.status(200).json(globals.data)
})

module.exports = globalRouter
