const cryptosRouter = require('express').Router()

cryptosRouter.get('/', (req, res) => {
  res.json({
    test: 'get request',
  })
})

cryptosRouter.post('/', (req, res) => {})
