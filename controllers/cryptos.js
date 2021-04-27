/* eslint-disable no-unused-vars */
const cryptosRouter = require('express').Router()
const CryptoBaseInfo = require('../models/crypto_base_info')

cryptosRouter.get('/baseinfo/all', (req, res, next) => {
  CryptoBaseInfo.find({}).then(baseinfos => {
    res.json(baseinfos)
  })
})

cryptosRouter.get('/baseinfo/:id', (req, res, next) => {
  
})

//add logo urls to each crypto in the database
cryptosRouter.put('/baseinfo/all/urls', (req, res, next) => {})

//admin post request to upload all cryptos in bulk
cryptosRouter.post('/baseinfo/all', (req, res, next) => {
  const data = req.body.data

  data.map(crypto => {
    // mongodb ids were creating conflict with coinMarketCap's ids
    let newCrypto = { ...crypto, coinmarketcap_id: crypto.id }

    const newCryptoBaseInfo = new CryptoBaseInfo(newCrypto)

    newCryptoBaseInfo
      .save()
      .then(returnedObject => {
        console.log(returnedObject)
      })
      .catch(error => {
        next(error)
      })
  })

  res.status(202).end()
})

module.exports = cryptosRouter
