import { getSSMParam } from '../shared/utils.mjs'
import { getFromCache, saveToCache } from '../shared/dynamoDbCache.mjs'

const costOfLiving = async (event) => {
  const { ZYLA_KEY, ZYLA_URL, CACHE_TABLE } = process.env
  const { city } = event.queryStringParameters || {}

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'You must provide a city' }),
    }
  }

  // 1. Try cache
  const cached = await getFromCache(CACHE_TABLE, { city })
  if (cached) {
    console.log('Cache hit:', cached)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'cache', data: cached }),
    }
  }

  // 2. Fetch API config
  const apiKey = await getSSMParam(ZYLA_KEY)
  const apiUrl = await getSSMParam(ZYLA_URL)

  if (!apiKey || !apiUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API configuration missing' }),
    }
  }

  // 3. Call external API
  const url = `${apiUrl}?city=${encodeURIComponent(city)}`
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })

  const data = await response.json()

  if (response.status !== 200) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Upstream failed', msg: data }),
    }
  }

  const payload = {
    status: data.Status,
    city: data['City Name'],
    apartment_city_centre_1br: data['Apartment (1 bedroom) in City Centre'],
    basic_utilities:
      data[
        'Basic (Electricity, Heating, Cooling, Water, Garbage) for 915 sq ft Apartment'
      ],
    monthly_transport_pass: data['Monthly Pass (Regular Price)'],
    avg_monthly_net_salary: data['Average Monthly Net Salary (After Tax)'],
    mortgage_interest_rate:
      data[
        'Mortgage Interest Rate in Percentages (%), Yearly, for 20 Years Fixed-Rate'
      ],
  }

  // Save to cache
  await saveToCache(CACHE_TABLE, payload)

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'api', data: payload }),
  }
}

export default costOfLiving
