require('dotenv').config()
const mongoose = require('mongoose')

const misc_dataSchema = new mongoose.Schema(
  {
    categories: [String],
  },
  { _id: false }
)

const metricSchema = new mongoose.Schema(
  {
    misc_data: misc_dataSchema,
  },
  { _id: false }
)

const cryptoBaseInfoSchema = new mongoose.Schema({
  symbol: String,
  slug: String,
  name: String,
  logo: String,
  metrics: metricSchema,
})

cryptoBaseInfoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('CryptoBaseInfo', cryptoBaseInfoSchema)
