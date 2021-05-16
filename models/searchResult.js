require('dotenv').config()
const mongoose = require('mongoose')

const searchResultSchema = new mongoose.Schema({
  coingecko_id: {
    type: String,
  },
  symbol: {
    type: String,
  },
  name: {
    type: String,
  },
  logo: {
    type: String,
  },
})

searchResultSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('SearchResult', searchResultSchema)
