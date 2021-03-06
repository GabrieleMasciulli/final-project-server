const Position = require('../models/position')
const tradingHelper = require('../utils/trading')
const dateUtility = require('../utils/date.utility')
const SearchResult = require('../models/searchResult')
const coinGecko = require('../utils/coingecko')

// getting all positions and transactions for a user
const getAssets = async (req, res) => {
  const positions = await Position.find({ user: req.userId })

  res.status(200).json(positions)
}

const getAssetsWithAnalysis = async (req, res) => {
  const yesterday = dateUtility.getYesterdayDate()

  const positions = await Position.find({ user: req.userId })

  const alteredAssetsPromises = positions.map(async position => {
    const coin_id = position.coin_id
    const coin = await SearchResult.findOne({
      coingecko_id: coin_id,
    })

    let last_price = await coinGecko.getSimplePrice(coin_id)
    last_price = last_price[coin_id].usd

    let yesterday_price = await coinGecko.getPriceFromDate(coin_id, yesterday)
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

    const daily_trend = day_change_in_currency >= 0 ? 'up' : 'down'
    const profit_trend = profit >= 0 ? 'up' : 'down'

    const asset = {
      coin: coin,
      last_price: last_price,
      day_change_in_currency: day_change_in_currency,
      percentage_day_change: percentage_day_change,
      daily_trend: daily_trend,
      holding_in_crypto: holding_in_crypto,
      holding_in_currency: holding_in_currency,
      profit_in_currency: profit,
      percentage_profit_change: percentage_profit_change,
      profit_trend: profit_trend,
      position,
    }
    return asset
  })

  const assetsResult = await Promise.all(alteredAssetsPromises)
  res.status(200).json(assetsResult)
}

const getPortfolioBalance = async (req, res) => {
  const yesterday = dateUtility.getYesterdayDate()

  const positions = await Position.find({ user: req.userId })

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

const getPortfolioPieChart = async (req, res) => {
  const positions = await Position.find({ user: req.userId })

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

const newTrade = async (req, res) => {
  const body = req.body
  const transaction = body.transaction
  const userId = req.userId

  const isNewPosition = await tradingHelper.isNewPosition(req)

  if (isNewPosition) {
    const position = new Position({
      type: body.type,
      coin_id: body.coin_id,
      user: userId,
      transactions: [transaction],
    })

    await position.save()

    res.status(201).json({ message: 'Buy order registered successfully!' })
    return
  }

  await Position.updateOne(
    { $and: [{ coin_id: body.coin_id }, { user: userId }] },
    { $push: { transactions: transaction } }
  )

  res.status(201).json({
    message: 'New transaction registered successfully to current postion!',
  })
  return
}

const deleteAsset = async (req, res) => {
  const coinId = req.params.coin
  await Position.findByIdAndRemove(coinId)

  res
    .status(200)
    .json({ message: 'Asset successfully removed from portfolio!' })
}

module.exports = {
  newTrade,
  getAssets,
  getAssetsWithAnalysis,
  getPortfolioBalance,
  getPortfolioPieChart,
  deleteAsset,
}
