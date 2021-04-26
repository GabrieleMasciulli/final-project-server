const cryptosRouter = require('express').Router()
const CryptoBaseInfo = require('../models/crypto_base_info')

cryptosRouter.get('/', (req, res) => {
  res.json({
    test: 'test get request',
  })
})

cryptosRouter.post('/baseinfo/all', (req, res) => {
  const data = req.body.data

  data.map(crypto => {
    const newCryptoBaseInfo = new CryptoBaseInfo(crypto)
    console.log(newCryptoBaseInfo)
  })

  res.status(202).end()
})

module.exports = cryptosRouter
