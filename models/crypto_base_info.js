require('dotenv').config()
const mongoose = require('mongoose')

const cryptoBaseInfoSchema = new mongoose.Schema({
  id: {
    type: 'Number',
  },
  name: {
    type: 'String',
  },
  symbol: {
    type: 'String',
  },
  slug: {
    type: 'String',
  },
  num_market_pairs: {
    type: 'Number',
  },
  date_added: {
    type: 'Date',
  },
  tags: {
    type: ['String'],
  },
  max_supply: {
    type: 'Number',
  },
  last_updated: {
    type: 'Date',
  },
})

cryptoBaseInfoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('CryptoBaseInfo', cryptoBaseInfoSchema)
