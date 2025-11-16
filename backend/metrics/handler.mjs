import { getFromCache } from '../shared/dynamoDbCache.mjs'

const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    const city = body.city || 'Washington, DC'
    const job = body.job || 'Cloud Engineer'

    const colTable = process.env.COL_TABLE
    const salaryTable = process.env.SALARY_TABLE

    console.log('getFromCache called with:', { city, job })

    const colData = await getFromCache(colTable, { city })
    const salaryData = await getFromCache(salaryTable, { city, job })

    console.log('colData result:', colData)
    console.log('salaryData result:', salaryData)

    if (!colData) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Data not found for this city/job from cache',
          msg: 'No data returned from cost-of-living cache',
        }),
      }
    }

    if (!salaryData) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Data not found for this city/job from cache',
          msg: 'No data returned from salary cache',
        }),
      }
    }

    const costData =
      typeof colData.data === 'string'
        ? JSON.parse(colData.data)
        : colData.data

    const affordability =
      parseFloat(salaryData.average_salary || 0) /
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
  } catch (err) {
    console.error('Metrics handler error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        details: err.message,
      }),
    }
  }
}

export default handler
