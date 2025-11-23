import { getFromCache } from '../shared/dynamoDbCache.mjs'

const handler = async (event) => {
  try {
    const { city, job, level } = event.queryStringParameters || {}
    const cityValue = city 
    const jobBase = job 
    const levelValue = level

    const colTable = process.env.COL_TABLE
    const salaryTable = process.env.SALARY_TABLE

    console.log('Fetching data for:', { city: cityValue, jobBase, level: levelValue })

    const colData = await getFromCache(colTable, { city: cityValue })
    
    const jobWithLevel = `${jobBase} ${levelValue}`
    const salaryData = await getFromCache(salaryTable, { city: cityValue, job: jobWithLevel })

    console.log('colData result:', colData)
    console.log('salaryData result:', salaryData)

    if (!colData) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Data not found',
          msg: 'No data returned from cost-of-living cache',
        }),
      }
    }

    if (!salaryData) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Data not found',
          msg: `No data returned from salary cache for ${jobWithLevel}`,
        }),
      }
    }

    const costData =
      typeof colData.data === 'string'
        ? JSON.parse(colData.data)
        : colData.data

    const salary = parseFloat(salaryData.average_salary || 0)
    const monthlySalary = salary / 12
    const totalMonthlyCosts = 
      parseFloat(costData.rent || 0) +
      parseFloat(costData.groceries || 0) +
      parseFloat(costData.transport || 0) +
      parseFloat(costData.utilities || 0)

    const affordabilityRatio = totalMonthlyCosts / monthlySalary

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        city: cityValue,
        job: jobWithLevel,
        level: levelValue,
        salary,
        costOfLiving: costData,
        metrics: {
          monthlySalary,
          totalMonthlyCosts,
          affordabilityRatio,
          interpretation: affordabilityRatio < 0.3 ? 'Highly Affordable' :
                         affordabilityRatio < 0.5 ? 'Affordable' :
                         affordabilityRatio < 0.7 ? 'Moderate' : 'Expensive'
        }
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