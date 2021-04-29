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
