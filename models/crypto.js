require('dotenv').config()
const mongoose = require('mongoose')

const cryptoSchema = new mongoose.Schema({
  coingecko_id: {
    type: 'String',
  },
  symbol: {
    type: 'String',
  },
  name: {
    type: 'String',
  },
})

cryptoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Crypto', cryptoSchema)
