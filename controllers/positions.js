const positionsRouter = require('express').Router()
const positionsMethods = require('../middlewares/trading')

// getting all positions and transactions for a user without financial stats
positionsRouter.get('/', positionsMethods.getAssets)

// getting all positions and transactions for a user with related financial stats
positionsRouter.get('/analysis', positionsMethods.getAssetsWithAnalysis)

// getting current total balance related to a user
positionsRouter.get('/balance', positionsMethods.getPortfolioBalance)

positionsRouter.get('/pie', positionsMethods.getPortfolioPieChart)

//adding new trade to either current or new position
positionsRouter.post('/', positionsMethods.newTrade)

//deleting position from account ( transactions included)
positionsRouter.delete('/:coin', positionsMethods.deleteAsset)

module.exports = positionsRouter
