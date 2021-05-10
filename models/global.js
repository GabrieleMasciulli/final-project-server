require('dotenv').config()
const mongoose = require('mongoose')

const globalSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  active_cryptocurrencies: {
    type: 'Number',
  },
  upcoming_icos: {
    type: 'Number',
  },
  ongoing_icos: {
    type: 'Number',
  },
  ended_icos: {
    type: 'Number',
  },
  markets: {
    type: 'Number',
  },
  total_market_cap: {
    type: ['Mixed'],
  },
  total_volume: {
    type: ['Mixed'],
  },
  market_cap_percentage: {
    type: ['Mixed'],
  },
  market_cap_change_percentage_24h_usd: {
    type: 'Number',
  },
  updated_at: {
    type: 'Number',
  },
})

globalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Global', globalSchema)
