require('dotenv').config()
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  _id: false,
  type: {
    type: String,
    enum: ['buy', 'sell'],
  },
  date: {
    type: Date,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
})

module.exports = transactionSchema
