import { getFromCache, saveToCache } from '../shared/dynamoDbCache.mjs'

const handler = async (event) => {
  const city = event.queryStringParameters?.city || 'Washington DC'
  const metric = event.queryStringParameters?.metric || 'housing'
  const tableName = process.env.CACHE_TABLE

  // Try cache
  const cached = await getFromCache(tableName, { city, metric })
  if (cached) {
    console.log('Cache hit:', cached)
    return {
      statusCode: 200,
      body: JSON.stringify({ source: 'cache', data: cached }),
    }
  }

  // If miss, call external API
  const apiResponse = await fetchExternalMetric(city, metric)

  // Save result to cache
  await saveToCache(tableName, { city, metric, value: apiResponse.value })

  return {
    statusCode: 200,
    body: JSON.stringify({ source: 'api', data: apiResponse }),
  }
}

// Example stub
const fetchExternalMetric = async (city, metric) => {
  return { value: `${metric} data for ${city}` }
}

export default handler
