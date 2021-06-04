const axios = require('axios')

const getSimplePrice = async id => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
  )

  return response.data
}

const getPriceFromDate = async (id, date) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&localization=false`
  )

  return response.data
}

const getBaseDataFromId = async id => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  )

  return response.data
}

const getBaseData = async (order, number, page) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${order}&per_page=${number}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  )

  return response.data
}

const getMetadata = async id => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
  )

  return response.data
}

const getSparkline = async id => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&sparkline=true&price_change_percentage=7d`
  )

  return response.data[0]
}

const getMarketChart = async (id, days) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  )

  return response.data
}

const getStats = async id => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  )

  return response.data
}

const getGlobals = async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/global')

  return response.data
}

const getBasicSearchResults = async (page, number) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${number}&page=${page}&sparkline=false`
  )

  return response.data
}

module.exports = {
  getSimplePrice,
  getPriceFromDate,
  getBaseDataFromId,
  getBaseData,
  getMetadata,
  getSparkline,
  getMarketChart,
  getStats,
  getGlobals,
  getBasicSearchResults,
}
