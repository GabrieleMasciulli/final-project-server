/* eslint-disable quotes */
const cryptoRouter = require('express').Router()
const Crypto = require('../models/crypto')
const Metadata = require('../models/metadata')
const coinGecko = require('../utils/coingecko')
const sparklineGenerator = require('../utils/sparkline')

cryptoRouter.get('/', (req, res) => {
  Crypto.find({}).then(response => {
    res.json({ tot: response.length })
  })
})

cryptoRouter.get('/price/:id', (req, res, next) => {
  const id = req.params.id

  coinGecko.getSimplePrice(id).then(price => {
    if (JSON.stringify(price) === JSON.stringify({})) {
      next({ name: 'CastError' })
      return
    }
    res.status(202).json(price[id])
    return
  })
})

cryptoRouter.get('/detail/:id', (req, res, next) => {
  const id = req.params.id

  coinGecko
    .getBaseDataFromId(id)
    .then(crypto => {
      if (crypto) {
        res.status(202).json(crypto)
      } else {
        next({ name: 'CastError' })
      }
    })
    .catch(error => next(error))
})

cryptoRouter.get('/info/:order/:number/:page', (req, res, next) => {
  const order = req.params.order
  const number = req.params.number
  const page = req.params.page

  coinGecko
    .getBaseData(order, number, page)
    .then(cryptos => {
      const alteredCryptos = cryptos.map(crypto => {
        const sparklineData = crypto.sparkline_in_7d.price
        const trend =
          crypto.price_change_percentage_7d_in_currency > 0 ? 'up' : 'down'
        const url = sparklineGenerator.generateSparkline(trend, sparklineData)

        return { ...crypto, sparkline_url: url }
      })
      res.status(202).json(alteredCryptos)
    })
    .catch(() => next({ name: 'CastError' }))
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

//generating 7day sparklines for a single crypto
cryptoRouter.get('/img/generated/sparkline/:id', (req, res, next) => {
  const id = req.params.id

  coinGecko
    .getSparkline(id)
    .then(data => {
      if (!data) {
        next({ name: 'CastError' })
      } else {
        const sparklineData = data.sparkline_in_7d.price
        const trend =
          data.price_change_percentage_7d_in_currency > 0 ? 'up' : 'down'

        const url = sparklineGenerator.generateSparkline(trend, sparklineData)

        res.status(200).json({
          image: url,
        })
      }
    })
    .catch(error => {
      next(error)
    })
})

//generating just 7day sparklines for a whole page of cryptos
cryptoRouter.get(
  '/img/generated/sparklines/:order/:number/:page',
  (req, res, next) => {
    const order = req.params.order
    const number = req.params.number
    const page = req.params.page

    coinGecko.getBaseData(order, number, page).then(cryptos => {
      const urls = []
      cryptos.map(crypto => {
        const sparklineData = crypto.sparkline_in_7d.price
        const trend =
          crypto.price_change_percentage_7d_in_currency > 0 ? 'up' : 'down'
        const url = sparklineGenerator.generateSparkline(trend, sparklineData)
        urls.push({ id: crypto.id, sparkline_url: url })
      })
      res.status(202).json(urls)
    })
  }
)

cryptoRouter.get('/market_chart/:id/:days', (req, res, next) => {
  const id = req.params.id
  const days = req.params.days

  coinGecko
    .getMarketChart(id, days)
    .then(cryptos => {
      res.status(202).json(cryptos)
    })
    .catch(() => next({ name: 'CastError' }))
})

// data to display in the statistics right pane on the detail page

cryptoRouter.get('/stats/:id', (req, res, next) => {
  const id = req.params.id

  coinGecko
    .getStats(id)
    .then(stats => {
      res.status(202).json(stats)
    })
    .catch(() => next({ name: 'CastError' }))
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
