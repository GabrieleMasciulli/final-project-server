const cryptoRouter = require('express').Router()
const Crypto = require('../models/crypto')
const Metadata = require('../models/metadata')
const coinGecko = require('../utils/coingecko')

cryptoRouter.get('/', (req, res) => {
  Crypto.find({}).then(response => {
    res.json(response)
  })
})

cryptoRouter.get('/metadata/:order/:number/:page', (req, res, next) => {
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

cryptoRouter.post('/metadata/all', (req, res, next) => {
  Crypto.find({})
    .then(cryptos => {
      cryptos.map(crypto => {
        coinGecko.getMetadata(crypto.coingecko_id).then(metadata => {
          const alteredMetadata = { ...metadata, coingecko_id: metadata.id }
          const newMetadata = new Metadata(alteredMetadata)

          newMetadata
            .save()
            .then()
            .catch(error => {
              next(error)
            })
        })
      })
      res.status(202).end()
    })
    .catch(error => {
      next(error)
    })
})

module.exports = cryptoRouter
