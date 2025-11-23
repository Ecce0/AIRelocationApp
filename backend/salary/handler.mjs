import { getFromCache } from '../shared/dynamoDbCache.mjs'

const salary = async (event) => {
  const { CACHE_TABLE } = process.env
  const { city, job, level } = event.queryStringParameters || {}

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing city from salary handler' }),
    }
  }

  if (!job) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing job from salary handler' }),
    }
  }

  const jobWithLevel = level ? `${job} ${level}` : job

  return getFromCache(CACHE_TABLE, { city, job: jobWithLevel })
    .then((cachedData) => {
      if (!cachedData) {
        return {
          statusCode: 404,
          body: JSON.stringify({ 
            error: 'Data not found',
            msg: `No salary data for ${jobWithLevel} in ${city}`
          }),
        }
      }

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
          error: 'Failed to retrieve from cache - salary',
          details: error?.message,
        })
      }
    })
}

export default salary