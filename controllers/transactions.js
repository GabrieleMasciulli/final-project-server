/* eslint-disable quotes */
const transactionsRouter = require('express').Router()
const Position = require('../models/position')
const User = require('../models/user')
const SearchResult = require('../models/searchResult')
const coinGecko = require('../utils/coingecko')
const dateUtility = require('../utils/date.utility')

transactionsRouter.post('/', (req, res) => {
  const body = req.body
  const transaction = body.transaction

  User.findOne({ _id: body.user_id }, (err, user) => {
    if (err) {
      res.status(404).send({ message: 'User not found' })
      return
    }

    Position.findOne({
      $and: [{ coin_id: body.coin_id }, { user: body.user_id }],
    }).then(position => {
      if (!position) {
        const position = new Position({
          type: body.type,
          coin_id: body.coin_id,
          user: body.user_id,
          transactions: [transaction],
        })

        position.save(err => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          res
            .status(200)
            .json({ message: 'Buy order registered successfully!' })
        })
        return
      }

      Position.updateOne(
        { $and: [{ coin_id: body.coin_id }, { user: body.user_id }] },
        { $push: { transactions: transaction } }
      ).then(() => {
        res.status(200).json({
          message:
            'New transaction registered successfully to current postion!',
        })
      })
    })
  })
})

// getting all positions and transactions for a user
transactionsRouter.get('/all', (req, res, next) => {
  const user_id = req.body.user_id
  if (!user_id) {
    res.status(400).json({ error: 'Invalid id' })
    return
  }

  Position.find({ user: user_id })
    .then(positions => {
      if (positions) {
        res.status(202).json(positions)
      } else {
        next({ name: 'CastError' })
      }
    })
    .catch(() => next({ name: 'CastError' }))
})

transactionsRouter.get('/assets', (req, res, next) => {
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
})

module.exports = transactionsRouter
