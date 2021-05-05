/* eslint-disable quotes */
const authRouter = require('express').Router()
const verifySignUp = require('../middlewares/verifySignUp')
const authMethods = require('./auth')
const Role = require('../models/role')

authRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

authRouter.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authMethods.signup
)

//DEVELOPEMENT ONLY, RENDERING INITIAL ROLES IN THE DATABASE
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save(err => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'user' to roles collection")
      })

      new Role({
        name: 'moderator',
      }).save(err => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'moderator' to roles collection")
      })

      new Role({
        name: 'admin',
      }).save(err => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'admin' to roles collection")
      })
    }
  })
}

module.exports = authRouter
