const { signin, signup } = require('./authentication')
const authJwt = require('./authJwt')

module.exports = {
  signin,
  signup,
  authJwt,
}
