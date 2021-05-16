/* eslint-disable quotes */
const searchRouter = require('express').Router()
const coinGecko = require('../utils/coingecko')
const SearchResult = require('../models/searchResult')

searchRouter.get('/first', (req, res) => {
  SearchResult.find({})
    .limit(100)
    .then(results => {
      res.status(200).json(results)
    })
})

//finding all documents which container query coming from user... using regular expression to make case-unsensitive filtering
searchRouter.get('/:query', (req, res) => {
  const query = req.params.query
  SearchResult.find({
    $or: [
      { coingecko_id: { $regex: new RegExp(query, 'i') } },
      { symbol: { $regex: new RegExp(query, 'i') } },
      { name: { $regex: new RegExp(query, 'i') } },
    ],
  }).then(results => {
    res.status(202).json(results)
  })
})

//DEVELOPEMENT ONLY!!! DON'T USE
searchRouter.post('/:page/:number', (req, res, next) => {
  const page = req.params.page
  const number = req.params.number

  coinGecko.getBasicSearchResults(page, number).then(cryptos => {
    const alteredSearchResults = cryptos.map(crypto => {
      const newSearchResult = new SearchResult({
        coingecko_id: crypto.id,
        symbol: crypto.symbol.toUpperCase(),
        name: crypto.name,
        logo: crypto.image,
      })

      newSearchResult
        .save()
        .then()
        .catch(error => next(error))
      return { newSearchResult }
    })
    res.status(202).json(alteredSearchResults)
  })
})

module.exports = searchRouter
