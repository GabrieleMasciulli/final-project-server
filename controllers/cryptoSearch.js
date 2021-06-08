/* eslint-disable quotes */
const searchRouter = require('express').Router()
const coinGecko = require('../utils/coingecko')
const SearchResult = require('../models/searchResult')

searchRouter.get('/first/:limit', async (req, res) => {
  const limit = parseInt(req.params.limit)

  const searchResults = await SearchResult.find({}).limit(limit)

  res.status(200).json(searchResults)
})

//finding all documents which container query coming from user... using regular expression to make case-unsensitive filtering
searchRouter.get('/:query', async (req, res) => {
  const query = req.params.query
  const searchResults = SearchResult.find({
    $or: [
      { coingecko_id: { $regex: new RegExp(query, 'i') } },
      { symbol: { $regex: new RegExp(query, 'i') } },
      { name: { $regex: new RegExp(query, 'i') } },
    ],
  }).limit(100)

  res.status(200).json(searchResults)
})

//DEVELOPEMENT ONLY!!! DON'T USE
searchRouter.post('/:page/:number', async (req, res) => {
  const page = req.params.page
  const number = req.params.number

  const cryptos = await coinGecko.getBasicSearchResults(page, number)

  const alteredSearchResults = cryptos.map(async crypto => {
    const newSearchResult = new SearchResult({
      coingecko_id: crypto.id,
      symbol: crypto.symbol.toUpperCase(),
      name: crypto.name,
      logo: crypto.image,
    })

    await newSearchResult.save()
    return { newSearchResult }
  })
  res.status(201).json(alteredSearchResults)
})

module.exports = searchRouter
