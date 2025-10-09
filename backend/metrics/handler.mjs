import { getFromCache, saveToCache } from '../shared/dynamoDbCache.mjs'

const handler = async (event) => {
  const trimSpace = (str = '') => str.replace(/\s+/g, ' ').trim()
  const body = JSON.parse(event.body || '{}')
  const city = trimSpace(body.city) || 'Washington, DC'
  const job = trimSpace(body.job) || 'Cloud Engineer'

  const colTable = process.env.COL_TABLE
  const salaryTable = process.env.SALARY_TABLE

  const colData = await getFromCache(colTable, { city })
  const salaryData = await getFromCache(salaryTable, { job, city })

  if (!colData || !salaryData) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Data not found for this city/job' }),
    }
  }

  const costData = JSON.parse(colData.data)

  const affordability =
    parseFloat(salaryData.average_salary) /
    parseFloat(costData.avg_monthly_net_salary || 1)

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      city,
      job,
      salary: salaryData.average_salary,
      costOfLiving: costData,
      affordability,
    }),
  }
}

export default handler
