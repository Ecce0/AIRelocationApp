import { cities } from './metroCities.mjs'
import { getSSMParam } from '../backend/shared/utils.mjs'
import { saveToCache } from '../backend/shared/dynamoDbCache.mjs'

const wait = (ms) => new Promise(r => setTimeout(r, ms))

const seedCostOfLiving = async () => {
  const apiKey = await getSSMParam('zyla_api_key')
  const apiUrl = await getSSMParam('zyla_api_url')
  const batchSize = 50
  const delayCity = 5000
  const delayBatch = 2 * 60 * 1000

  const processBatch = async (batch, batchIndex) => {
    for (let i = 0; i < batch.length; i++) {
      const city = batch[i]
      try {
        const res = await fetch(`${apiUrl}?city=${encodeURIComponent(city)}`, {
          headers: { Authorization: `Bearer ${apiKey}` },
        })
        if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`)
        const data = await res.json()
        await saveToCache('relo-calc-app-cost-of-living-cache', { city, data })
        console.log(`✓ ${city}`)
        if (i < batch.length - 1) await wait(delayCity)
      } catch (err) {
        console.error(`❌ ${city}: ${err.message}`)
        process.exit(1)
      }
    }
    if ((batchIndex + 1) * batchSize < cities.length) await wait(delayBatch)
  }

  const batches = []
  for (let i = 0; i < cities.length; i += batchSize)
    batches.push(cities.slice(i, i + batchSize))

  await Promise.all(
    batches.map(async (batch, idx) => await processBatch(batch, idx))
  )

  console.log('✅ Done.')
}

seedCostOfLiving()
//Credit to OpenAI 