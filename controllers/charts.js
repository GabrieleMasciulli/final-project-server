const chartRouter = require('express').Router()
const Chart = require('../models/chart')
const coinGecko = require('../utils/coingecko')

chartRouter.get('/:id/:days', (req, res, next) => {
  const id = req.params.id
  const days = req.params.days

  Chart.findOne({ coin_id: id }).then(chart => {
    //if chart hasn't been saved yet, getting data from api and then storing that data
    if (!chart) {
      coinGecko
        .getMarketChart(id, days)
        .then(chart_data => {
          const newChart = new Chart({
            coin_id: id,
            ...chart_data,
          })

          newChart.save().then(savedChart => {
            res.status(202).json(savedChart)
            return
          })
        })
        .catch(() => next({ name: 'CastError' }))
    } else {
      coinGecko.getMarketChart(id, days).then(latestChart => {
        const [lastUpdatedPrice] = latestChart.prices.slice(-1)[0]
        const [lastUpdatedMarketcap] = latestChart.market_caps.slice(-1)[0]
        const [lastUpdatedVolume] = latestChart.total_volumes.slice(-1)[0]

        Chart.findOne({ coin_id: id })
          .select({
            prices: { $slice: -1 },
            market_caps: { $slice: -1 },
            total_volumes: { $slice: -1 },
          })
          .then(storedLastValues => {
            const storedLastPrice = storedLastValues.prices[0][0]
            console.log(storedLastPrice)
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

              Chart.findOneAndUpdate({ coin_id: id }, updatedChart, {
                new: true,
              })
                .then(savedChart => {
                  res.status(202).json(savedChart)
                  return
                })
                .catch(error => next(error))
            }
          })
      })
    }
  })
})

module.exports = chartRouter
