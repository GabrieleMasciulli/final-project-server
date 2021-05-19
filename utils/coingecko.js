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

const getBaseData = (order, number, page) => {
  const request = axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${order}&per_page=${number}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  )

  return request.then(response => response.data)
}

const getMetadata = id => {
  const request = axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
  )

  return request.then(response => response.data)
}

const getSparkline = id => {
  const request = axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&sparkline=true&price_change_percentage=7d`
  )

  return request.then(response => response.data[0])
}

const getMarketChart = (id, days) => {
  const request = axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  )

  return request.then(response => response.data)
}

const getStats = id => {
  const request = axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  )

  return request.then(response => response.data)
}

const getGlobals = () => {
  const request = axios.get('https://api.coingecko.com/api/v3/global')

  return request.then(response => response.data)
}

const getBasicSearchResults = (page, number) => {
  const request = axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${number}&page=${page}&sparkline=false`
  )

  return request.then(response => response.data)
}

module.exports = {
  getSimplePrice,
  getPriceFromDate,
  getBaseData,
  getMetadata,
  getSparkline,
  getMarketChart,
  getStats,
  getGlobals,
  getBasicSearchResults,
}
