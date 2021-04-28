/* eslint-disable no-unused-vars */
const cryptosRouter = require('express').Router()
const CryptoBaseInfo = require('../models/crypto_base_info')

cryptosRouter.get('/baseinfo/all', (req, res, next) => {
  CryptoBaseInfo.find({}).then(baseinfos => {
    res.json(baseinfos)
  })
})

cryptosRouter.get('/baseinfo/id/:id', (req, res, next) => {
  CryptoBaseInfo.findById(req.params.id)
    .then(crypto => {
      if (crypto) {
        res.json(crypto)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

cryptosRouter.get('/baseinfo/symbol/:symbol', (req, res, next) => {
  const symbol = req.params.symbol.toUpperCase()

  CryptoBaseInfo.find({ symbol: symbol })
    .then(crypto => {
      if (crypto) {
        res.json(crypto)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

cryptosRouter.get('/baseinfo/slug/:slug', (req, res, next) => {
  const slug = req.params.slug.toLowerCase()

  CryptoBaseInfo.find({ slug: slug })
    .then(crypto => {
      if (crypto) {
        res.josn(crypto)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
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
      .then(crypto => {
        console.log(crypto)
      })
      .catch(error => {
        next(error)
      })
  })

  res.status(202).end()
})

module.exports = cryptosRouter
