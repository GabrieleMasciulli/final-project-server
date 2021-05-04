const QuickChart = require('quickchart-js')

const generateSparkline = (trend, dataset) => {
  const sparkline = new QuickChart()
  let color = ''

  if (trend === 'up') {
    color = 'rgb(59,183, 117)'
  } else {
    color = 'rgb(214, 53, 83)'
  }

  const config = {
    type: 'line',
    data: {
      labels: dataset,
      datasets: [
        {
          fill: false,
          borderColor: color,
          borderWidth: 2,
          data: dataset,
        },
      ],
    },
    options: {
      responsive: false,
      legend: {
        display: false,
      },
      elements: {
        line: {
          borderColor: '#000000',
          borderWidth: 1,
        },
        point: {
          radius: 0,
        },
      },
      scales: {
        yAxes: [
          {
            display: false,
          },
        ],
        xAxes: [
          {
            display: false,
          },
        ],
      },
    },
  }
  sparkline
    .setConfig(config)
    .setWidth(164)
    .setHeight(54)
    .setBackgroundColor('transparent')

  const url = sparkline.getShortUrl().then(link => link)

  return url
}

module.exports = { generateSparkline }
