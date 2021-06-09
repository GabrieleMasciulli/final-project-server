/* eslint-disable quotes */
const transactionsRouter = require('express').Router()
const portfolioUtility = require('../middlewares/portfolio')

transactionsRouter.get('/balance', portfolioUtility.portfolioBalance)

transactionsRouter.get('/pie', portfolioUtility.portfolioPieChart)

module.exports = transactionsRouter
