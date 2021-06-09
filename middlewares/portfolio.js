const Position = require('../models/position')
const SearchResult = require('../models/searchResult')
const coinGecko = require('../utils/coingecko')
const dateUtility = require('../utils/date.utility')

const portfolioBalance = async (req, res) => {
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
  const daily_trend = day_change_in_currency >= 0 ? 'up' : 'down'

  res.status(200).json({
    holdings: current_holdings,
    yesterdays_holdings: yesterdays_holdings,
    day_change_in_currency: day_change_in_currency,
    day_change_percentage: day_change_percentage,
    daily_trend: daily_trend,
  })
}

const portfolioPieChart = async (req, res) => {
  const user_id = req.query.user

  if (!user_id) {
    res.status(400).json({ error: 'Invalid user' })
    return
  }

  const positions = await Position.find({ user: user_id })

  let holdings = []

  await Promise.all(
    positions.map(async pos => {
      const coin_id = pos.coin_id
      const coin = await SearchResult.findOne({
        coingecko_id: pos.coin_id,
      })

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

      holdings.push({
        label: coin.symbol,
        value: coin_holding * last_price,
      })
    })
  )

  //sorting holdings for marketcap descending
  const sorted_holdings = holdings.sort(({ value: a }, { value: b }) => b - a)

  const labels = sorted_holdings.map(holding => holding.label)
  const series = sorted_holdings.map(holding => holding.value)

  res.status(200).json({
    labels: labels,
    series: series,
  })
}

module.exports = {
  portfolioBalance,
  portfolioPieChart,
}
