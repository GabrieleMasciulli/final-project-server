require('dotenv').config()
const mongoose = require('mongoose')

const chartSchema = new mongoose.Schema({
  coin_id: {
    type: String,
  },
  prices: [[Number]],
  market_caps: [[Number]],
  total_volumes: [[Number]],
})

chartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Chart', chartSchema)
