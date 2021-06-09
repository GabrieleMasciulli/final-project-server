const Position = require('../models/position')

//checks if position related to a particular cryptocurrency has already been created
const isNewPosition = async req => {
  const body = req.body
  const userId = req.userId

  const position = await Position.findOne({
    $and: [{ coin_id: body.coin_id }, { user: userId }],
  })

  if (!position) {
    return true
  }
  return false
}

module.exports = {
  isNewPosition,
}
