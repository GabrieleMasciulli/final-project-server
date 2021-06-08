/* eslint-disable quotes */
const cryptoRouter = require('express').Router()
const Crypto = require('../models/crypto')
const Metadata = require('../models/metadata')
const coinGecko = require('../utils/coingecko')
const sparklineGenerator = require('../utils/sparkline')

cryptoRouter.get('/', async (req, res) => {
  const cryptos = await Crypto.find({})

  res.json({ tot: cryptos.length })
})

cryptoRouter.get('/price/:id', async (req, res, next) => {
  const id = req.params.id

  const price = await coinGecko.getSimplePrice(id)

  if (JSON.stringify(price) === JSON.stringify({})) {
    next({ name: 'CastError' })
    return
  }

  res.status(200).json(price[id])
  return
})

cryptoRouter.get('/detail/:id', async (req, res, next) => {
  const id = req.params.id

  const crypto = await coinGecko.getBaseDataFromId(id)

  if (crypto) {
    res.status(202).json(crypto)
  } else {
    next({ name: 'CastError' })
  }
})

cryptoRouter.get('/info/:order/:number/:page', async (req, res) => {
  const order = req.params.order
  const number = req.params.number
  const page = req.params.page

  const cryptos = await coinGecko.getBaseData(order, number, page)

  const alteredCryptos = cryptos.map(crypto => {
    const daily_trend =
      crypto.price_change_percentage_24h_in_currency >= 0 ? 'up' : 'down'
    const sparklineData = crypto.sparkline_in_7d.price
    const weekly_trend =
      crypto.price_change_percentage_7d_in_currency > 0 ? 'up' : 'down'
    const url = sparklineGenerator.generateSparkline(
      weekly_trend,
      sparklineData
    )

    return {
      ...crypto,
      sparkline_url: url,
      daily_trend: daily_trend,
      weekly_trend: weekly_trend,
    }
  })
  res.status(200).json(alteredCryptos)
})

cryptoRouter.get('/metadata/:id', async (req, res) => {
  const id = req.params.id

  const metadata = await Metadata.find({ coingecko_id: id })

  if (crypto.length > 0) {
    res.status(200).json(metadata)
    return
  } else {
    const metadata = await coinGecko.getMetadata(id)

    const alteredCrypto = { ...metadata, coingecko_id: metadata.id }
    const newMetadata = new Metadata(alteredCrypto)
    const savedMetadata = await newMetadata.save()

    res.status(200).json(savedMetadata)
    return
  }
})

//generating 7day sparklines for a single crypto
cryptoRouter.get('/img/generated/sparkline/:id', async (req, res, next) => {
  const id = req.params.id

  const sparkline = await coinGecko.getSparkline(id)

  if (!sparkline) {
    next({ name: 'CastError' })
  } else {
    const sparklineData = sparkline.sparkline_in_7d.price
    const trend =
      sparkline.price_change_percentage_7d_in_currency > 0 ? 'up' : 'down'

    const url = sparklineGenerator.generateSparkline(trend, sparklineData)

    res.status(200).json({ image: url })
    return
  }
})

//generating just 7day sparklines for a whole page of cryptos
cryptoRouter.get(
  '/img/generated/sparklines/:order/:number/:page',
  async (req, res) => {
    const order = req.params.order
    const number = req.params.number
    const page = req.params.page

    const cryptos = await coinGecko.getBaseData(order, number, page)

    const urls = []
    cryptos.map(crypto => {
      const sparklineData = crypto.sparkline_in_7d.price
      const trend =
        crypto.price_change_percentage_7d_in_currency > 0 ? 'up' : 'down'
      const url = sparklineGenerator.generateSparkline(trend, sparklineData)
      urls.push({ id: crypto.id, sparkline_url: url })
    })
    res.status(200).json(urls)
    return
  }
)

cryptoRouter.get('/market_chart/:id/:days', async (req, res, next) => {
  const id = req.params.id
  const days = req.params.days

  const cryptos = await coinGecko.getMarketChart(id, days)

  res.status(200).json(cryptos)
})

// data to display in the statistics right pane on the detail page

cryptoRouter.get('/stats/:id', async (req, res, next) => {
  const id = req.params.id

  const stats = await coinGecko.getStats(id)
  const globals = await coinGecko.getGlobals()

  const daily_trend = stats.market_data.price_change_24h >= 0 ? 'up' : 'down'
  const marketcap_daily_trend =
    stats.market_data.market_cap.usd >= 0 ? 'up' : 'down'
  const vol_over_marketcap =
    stats.market_data.total_volume.usd / stats.market_data.market_cap.usd
  const market_dominance =
    (stats.market_data.market_cap.usd / globals.data.total_market_cap.usd) * 100

  const alteredStats = {
    ...stats,
    daily_trend: daily_trend,
    vol_over_marketcap: vol_over_marketcap,
    market_dominance: market_dominance,
    marketcap_daily_trend: marketcap_daily_trend,
  }

  res.status(200).json(alteredStats)
  return
})

//developement ONLY!!!
//admin post request to upload all cryptos in bulk
cryptoRouter.post('/', async (req, res) => {
  const data = req.body

  data.map(async crypto => {
    // mongodb ids were creating conflict with coinMarketCap's ids
    const alteredCrypto = { ...crypto, coingecko_id: crypto.id }
    const newCrypto = new Crypto(alteredCrypto)
    await newCrypto.save()
  })

  res.status(200).end()
  return
})

module.exports = cryptoRouter
