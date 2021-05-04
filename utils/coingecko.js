const axios = require('axios')

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

module.exports = { getBaseData, getMetadata, getSparkline }
