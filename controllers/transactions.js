/* eslint-disable quotes */
const transactionsRouter = require('express').Router()
const Position = require('../models/position')
const User = require('../models/user')
const portfolioUtility = require('../middlewares/portfolio')

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
    res.status(400).json({ error: 'User not found' })
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

transactionsRouter.get('/assets', portfolioUtility.portfolioAssets)

transactionsRouter.get('/balance', portfolioUtility.portfolioBalance)

module.exports = transactionsRouter
