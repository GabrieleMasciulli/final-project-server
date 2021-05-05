/* eslint-disable quotes */
const authenticationRouter = require('express').Router()
const verifySignUp = require('../middlewares/verifySignUp')
const authenticationMethods = require('../middlewares/auth.index')
const Role = require('../models/role')

authenticationRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

authenticationRouter.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authenticationMethods.signup
)

authenticationRouter.post('/signin', authenticationMethods.signin)

//DEVELOPEMENT ONLY, RENDERING INITIAL ROLES IN THE DATABASE
// eslint-disable-next-line no-unused-vars
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

module.exports = authenticationRouter
