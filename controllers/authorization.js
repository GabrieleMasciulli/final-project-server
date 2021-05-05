const authenticationRouter = require('express').Router()
const { authJwt } = require('../middlewares/auth.index')
const authorizationMethods = require('../middlewares/authorization')

authenticationRouter.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

authenticationRouter.get('/all', authorizationMethods.allAccess)

authenticationRouter.get(
  '/user',
  [authJwt.verifyToken],
  authorizationMethods.userBoard
)

authenticationRouter.get(
  '/mod',
  [authJwt.verifyToken, authJwt.isModerator],
  authorizationMethods.moderatorBoard
)

authenticationRouter.get(
  '/admin',
  [authJwt.verifyToken, authJwt.isAdmin],
  authorizationMethods.adminBoard
)

module.exports = authenticationRouter
