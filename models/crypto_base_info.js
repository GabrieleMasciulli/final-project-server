require('dotenv').config()
const mongoose = require('mongoose')

const misc_dataSchema = new mongoose.Schema({
  categories: [String],
})

const metricSchema = new mongoose.Schema({
  misc_data: misc_dataSchema,
})

const CryptoBaseInfoSchema = new mongoose.Schema({
  symbol: String,
  slug: String,
  name: String,
  metrics: metricSchema,
})

module.exports = mongoose.model('CryptoBaseInfo', CryptoBaseInfoSchema)
