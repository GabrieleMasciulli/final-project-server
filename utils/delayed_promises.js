function chunk(array, chunkSize) {
  const results = []
  const tmp = array.slice() // we dont want to mutate the original

  while (tmp.length) {
    results.push(tmp.splice(0, chunkSize))
  }
  return results
}

function reduceP(promises, reducer, accumulator) {
  return promises.reduce(async (acc, curr) => {
    return reducer(await acc, await curr)
  }, accumulator)
}

function mapP(promises, fn, concurrency = promises.length) {
  return reduceP(
    chunk(promises, concurrency),
    async (acc, batch) => {
      return acc.concat(await Promise.all(batch.map(fn)))
    },
    []
  )
}

function delayP(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function retryP({ action, interval, backoff, attempts }) {
  console.log('Interval: ', interval)
  try {
    await delayP(15000)
    return await action
  } catch (error) {
    if (attempts === 0) {
      console.log(error)
    } else {
      console.log(error)
    }
    await delayP(interval)
    return retryP({
      action,
      backoff,
      interval: interval * backoff,
      attempts: attempts - 1,
    })
  }
}

//logic:

// cryptoRouter.post('/metadata/all', (req, res, next) => {
//   Crypto.find({})
//     .sort()
//     .skip(0)
//     .limit(200)
//     .then(cryptos => {
//       let count = 1

//       const ids = cryptos.map(crypto => crypto.coingecko_id)

//       const metadatas = mapP(
//         ids,
//         id => {
//           console.log('coin: ', id)
//           console.log('Number: ', count)

//           count += 1

//           return retryP({
//             attempts: 3,
//             interval: 1000,
//             backoff: 2,
//             action: axios.get(
//               `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
//             ),
//           })
//         },
//         10
//       )
//       return metadatas
//     })
//     .then(metadatas => {
//       metadatas.map(metadata => {
//         const alteredMetadata = { ...metadata, coingecko_id: metadata.id }
//         const newMetadata = new Metadata(alteredMetadata)

//         newMetadata
//           .save()
//           .then()
//           .catch(error => next(error))
//       })

//       res.status(202).end()
//     })
//     .catch(error => {
//       next(error)
//     })
// })
