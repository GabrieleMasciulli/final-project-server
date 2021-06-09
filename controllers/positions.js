const positionsRouter = require('express').Router()
const { authJwt } = require('../middlewares/auth.index')
const positionsMethods = require('../middlewares/trading')

// getting all positions and transactions for a user without financial stats
positionsRouter.get('/', [authJwt.verifyToken], positionsMethods.getAssets)

// getting all positions and transactions for a user with related financial stats
positionsRouter.get(
  '/analysis',
  [authJwt.verifyToken],
  positionsMethods.getAssetsWithAnalysis
)

positionsRouter.get(
  '/balance',
  [authJwt.verifyToken],
  positionsMethods.getPortfolioBalance
)

positionsRouter.get(
  '/pie',
  [authJwt.verifyToken],
  positionsMethods.getPortfolioPieChart
)

//adding new trade to either current or new position
positionsRouter.post('/', [authJwt.verifyToken], positionsMethods.newTrade)

//deleting position from account ( transactions included)
positionsRouter.delete(
  '/:coin',
  [authJwt.verifyToken],
  positionsMethods.deleteAsset
)

module.exports = positionsRouter
