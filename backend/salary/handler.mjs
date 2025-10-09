import { getSSMParam } from '../shared/utils.mjs'
import { getFromCache, saveToCache } from '../shared/dynamoDbCache.mjs'

const salary = async (event) => {
  const { CACHE_TABLE } = process.env
  const { location, job_title } = event.queryStringParameters || {}

  if (!location || !job_title) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'You must add a job AND a city' }),
    }
  }

  // 1. Try cache
  const cached = await getFromCache(CACHE_TABLE, {
    job: job_title,
    city: location,
  })
  if (cached) {
    console.log('Cache hit:', cached)
    return {
      statusCode: 200,
      body: JSON.stringify({ source: 'cache', data: cached }),
    }
  }

  // 2. Fetch API key + URL from SSM
  const apiKey = await getSSMParam('openwebninja_api_key')
  const apiUrl = await getSSMParam('openwebninja_api_url')

  if (!apiKey || !apiUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key or URL missing' }),
    }
  }

  // 3. Call external API
  const url = `${apiUrl}?job_title=${encodeURIComponent(
    job_title,
  )}&location=${encodeURIComponent(location)}`
  const response = await fetch(url, {
    headers: { 'x-api-key': apiKey },
  })

  if (response.status !== 200) {
    const errorText = await response.text()
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: 'upstream failed', msg: errorText }),
    }
  }

  const { data } = await response.json()

  const results = data.map(
    ({ job_title, location, median_salary, salaries_updated_at }) => ({
      job: job_title,
      city: location,
      average_salary: median_salary,
      last_updated: salaries_updated_at,
    }),
  )

  // 4. Save results
  if (results.length > 0) {
    await saveToCache(CACHE_TABLE, results[0])
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ data: results }),
  }
}

export default salary
