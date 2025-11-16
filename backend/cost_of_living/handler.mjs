/**
 * Now that I've obtained the cost of living data from Zyla Labs,
 * I've refactored the COL Lambda to be leaner so that the app 
 * itself is lightweight. 
 */

import { getFromCache } from '../shared/dynamoDbCache.mjs'

const costOfLiving = async (event) => {
  const { CACHE_TABLE } = process.env
  const { city } = event.queryStringParameters || {}

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'You must provide a city' }),
    }
  }

  return getFromCache(CACHE_TABLE, { city })
    .then((cachedData) => {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: cachedData }),
      }
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to retrieve from cache - col', 
          details: error?.message, 
          data: error.data
        }),
      }
    })
}

export default costOfLiving
