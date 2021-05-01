const cryptoRouter = require('express').Router()
const Crypto = require('../models/crypto')
const Metadata = require('../models/metadata')
const coinGecko = require('../utils/coingecko')

cryptoRouter.get('/', (req, res) => {
  Crypto.find({}).then(response => {
    res.json({ tot: response.length })
  })
})

cryptoRouter.get('/info/:order/:number/:page', (req, res, next) => {
  const order = req.params.order
  const number = req.params.number
  const page = req.params.page

  coinGecko
    .getBaseData(order, number, page)
    .then(response => res.json(response))
    .catch(error => {
      next(error)
    })
})

cryptoRouter.get('/metadata/:id', (req, res, next) => {
  const id = req.params.id

  Metadata.find({ coingecko_id: id }).then(crypto => {
    if (crypto.length > 0) {
      res.status(202).json(crypto)
    } else {
      coinGecko
        .getMetadata(id)
        .then(crypto => {
          const alteredCrypto = { ...crypto, coingecko_id: crypto.id }
          const newCrypto = new Metadata(alteredCrypto)

          newCrypto
            .save()
            .then(savedMetadata => {
              res.status(202).json(savedMetadata)
            })
            .catch(error => next(error))
        })
        .catch(() => next({ name: 'CastError' }))
    }
  })
})

//developement ONLY!!!
//admin post request to upload all cryptos in bulk
cryptoRouter.post('/', (req, res, next) => {
  const data = req.body

  data.map(crypto => {
    // mongodb ids were creating conflict with coinMarketCap's ids
    const alteredCrypto = { ...crypto, coingecko_id: crypto.id }

    const newCrypto = new Crypto(alteredCrypto)

    newCrypto
      .save()
      .then()
      .catch(error => {
        next(error)
      })
  })

  res.status(202).end()
})

module.exports = cryptoRouter
