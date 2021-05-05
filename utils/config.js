require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY

module.exports = {
  MONGODB_URI,
  PORT,
  AUTH_SECRET_KEY,
}
