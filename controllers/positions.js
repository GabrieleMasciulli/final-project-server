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

//adding new trade to either current or new position
positionsRouter.post('/', [authJwt.verifyToken], positionsMethods.newTrade)

module.exports = positionsRouter
