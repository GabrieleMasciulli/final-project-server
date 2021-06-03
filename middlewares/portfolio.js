const Position = require('../models/position')
const User = require('../models/user')
const SearchResult = require('../models/searchResult')
const coinGecko = require('../utils/coingecko')
const dateUtility = require('../utils/date.utility')

const portfolioAssets = (req, res, next) => {
  const user_id = req.query.user

  const yesterday = dateUtility.getYesterdayDate()

  Position.find({ user: user_id })
    .then(positions => {
      const alteredAssetsPromises = positions.map(async position => {
        const coin_id = position.coin_id
        const coin = await SearchResult.findOne({
          coingecko_id: coin_id,
        })

        let last_price = await coinGecko.getSimplePrice(coin_id)
        last_price = last_price[coin_id].usd

        let yesterday_price = await coinGecko.getPriceFromDate(
          coin_id,
          yesterday
        )
        yesterday_price = yesterday_price.market_data.current_price.usd

        const day_change_in_currency = last_price - yesterday_price

        const percentage_day_change =
          (day_change_in_currency / yesterday_price) * 100

        let holding_in_crypto = 0
        let total_open_holding = 0

        const transactions = position.transactions
        transactions.map(transaction => {
          const quantity = transaction.quantity
          const price = transaction.price
          const type = transaction.type

          holding_in_crypto =
            type === 'buy'
              ? (holding_in_crypto += quantity)
              : (holding_in_crypto -= quantity)

          total_open_holding =
            type === 'buy'
              ? (total_open_holding += quantity * price)
              : (total_open_holding -= quantity * price)
        })

        const holding_in_currency = holding_in_crypto * last_price

        const profit = holding_in_currency - total_open_holding

        const percentage_profit_change = (profit / total_open_holding) * 100

        const asset = {
          coin: coin,
          last_price: last_price,
          day_change_in_currency: day_change_in_currency,
          percentage_day_change: percentage_day_change,
          holding_in_crypto: holding_in_crypto,
          holding_in_currency: holding_in_currency,
          profit_in_currency: profit,
          percentage_profit_change: percentage_profit_change,
          position,
        }
        return asset
      })

      Promise.all(alteredAssetsPromises).then(response =>
        res.status(200).json(response)
      )
    })
    .catch(() => next({ name: 'CastError' }))
}

const portfolioBalance = async (req, res, next) => {
  const user_id = req.query.user
  const yesterday = dateUtility.getYesterdayDate()

  if (!user_id) {
    res.status(400).json({ error: 'Invalid user' })
    return
  }

  const positions = await Position.find({ user: user_id })

  let current_holdings = 0
  let yesterdays_holdings = 0

  await Promise.all(
    positions.map(async pos => {
      const coin_id = pos.coin_id
      let coin_holding = 0
      let last_price = await coinGecko.getSimplePrice(coin_id)
      last_price = last_price[coin_id].usd
      let yesterday_price = await coinGecko.getPriceFromDate(coin_id, yesterday)
      yesterday_price = yesterday_price.market_data.current_price.usd

      pos.transactions.map(transaction => {
        const quantity = transaction.quantity
        const type = transaction.type

        coin_holding =
          type === 'buy'
            ? (coin_holding += quantity)
            : (coin_holding -= quantity)
      })

      current_holdings += coin_holding * last_price
      yesterdays_holdings += coin_holding * yesterday_price
    })
  )

  const day_change_in_currency = current_holdings - yesterdays_holdings
  const day_change_percentage =
    (day_change_in_currency * 100) / yesterdays_holdings

  res.status(200).json({
    holdings: current_holdings,
    yesterdays_holdings: yesterdays_holdings,
    day_change_in_currency: day_change_in_currency,
    day_change_percentage: day_change_percentage,
  })
}

const portfolioPieChart = async (req, res, next) => {
  const user_id = req.query.user

  if (!user_id) {
    res.status(400).json({ error: 'Invalid user' })
    return
  }

  const positions = await Position.find({ user: user_id })

  let labels = []
  let series = []

  await Promise.all(
    positions.map(async pos => {
      const coin_id = pos.coin_id
      const coin = await SearchResult.findOne({
        coingecko_id: pos.coin_id,
      })
      labels.push(coin.symbol)

      let coin_holding = 0
      let last_price = await coinGecko.getSimplePrice(coin_id)
      last_price = last_price[coin_id].usd

      pos.transactions.map(transaction => {
        const quantity = transaction.quantity
        const type = transaction.type

        coin_holding =
          type === 'buy'
            ? (coin_holding += quantity)
            : (coin_holding -= quantity)
      })

      series.push(coin_holding * last_price)
    })
  )

  res.status(200).json({
    labels: labels,
    series: series,
  })
}

module.exports = {
  portfolioAssets,
  portfolioBalance,
  portfolioPieChart,
}
