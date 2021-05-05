require('dotenv').config()
const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
  name: String,
})

roleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Role', roleSchema)
