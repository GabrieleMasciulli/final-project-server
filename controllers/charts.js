const chartRouter = require('express').Router()
const Chart = require('../models/chart')
const coinGecko = require('../utils/coingecko')

chartRouter.get('/:id/:days', async (req, res) => {
  const id = req.params.id
  const days = req.params.days

  const chart = await Chart.findOne({ coin_id: id })

  //if chart hasn't been saved yet, getting data from api and then storing that data
  if (!chart) {
    const chartData = await coinGecko.getMarketChart(id, days)

    const newChart = new Chart({
      coin_id: id,
      ...chartData,
    })

    const savedChartData = await newChart.save()
    res.status(200).json(savedChartData)
    return
  } else {
    const latestChart = await coinGecko.getMarketChart(id, days)

    const [lastUpdatedPrice] = latestChart.prices.slice(-1)[0]
    const [lastUpdatedMarketcap] = latestChart.market_caps.slice(-1)[0]
    const [lastUpdatedVolume] = latestChart.total_volumes.slice(-1)[0]

    const storedLastValues = await Chart.finOne({ coin_id: id }).select({
      prices: { $slice: -1 },
      market_caps: { $slice: -1 },
      total_volumes: { $slice: -1 },
    })

    const storedLastPrice = storedLastValues.prices[0][0]
    // console.log(storedLastPrice)
    const storedLastMarketcap = storedLastValues.market_caps[0][0]
    const storedLastVolume = storedLastValues.total_volumes[0][0]

    //if stored latest values correspond to actual latest market's values, sending back data from database, othewise saving new values and then sending back updated ones
    if (
      storedLastPrice == lastUpdatedPrice &&
      storedLastMarketcap == lastUpdatedMarketcap &&
      storedLastVolume == lastUpdatedVolume
    ) {
      res.status(200).json(chart)
      return
    } else {
      const updatedChart = {
        coin_id: id,
        ...latestChart,
      }

      const savedChart = Chart.findOneAndUpdate({ coin_id: id }, updatedChart, {
        new: true,
      })

      res.status(200).json(savedChart)
      return
    }
  }
})

module.exports = chartRouter
