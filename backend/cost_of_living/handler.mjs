import { getSSMParam } from '../shared/utils.mjs'

const costOfLiving = async (event) => {
  const { ZYLA_KEY, ZYLA_URL } = process.env

  const { city } = event.queryStringParameters || {}

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'You must provide a city' }),
    }
  }

  const apiKey = await getSSMParam(process.env.ZYLA_KEY)
  const apiUrl = await getSSMParam(process.env.ZYLA_URL)

  if (!apiKey || !apiUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API configuration missing' }),
    }
  }

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

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }
}

export default costOfLiving
