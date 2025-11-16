/**
 * Now that I've obtained the salaries from OpenAI,
 * I've refactored the salary Lambda to be leaner so that the app 
 * itself is lightweight. 
 */

import { getFromCache } from '../shared/dynamoDbCache.mjs'

const salary = async (event) => {
  const { CACHE_TABLE } = process.env
  const { city, job } = event.queryStringParameters || {}

  if (!city) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing city from salary handler' }),
    }
  }

  if (!job) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing job from salary handler' }),
    }
  }

 
  await getFromCache(CACHE_TABLE, { city, job })
  .then((cachedData) => {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: cachedData }),
    }
  }).catch((error) => {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to retrieve from cache - salary',
        details: error?.message,
        data: error.data
      })
    }
  })

  
}

export default salary
