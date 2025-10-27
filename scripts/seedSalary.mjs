import { cities } from './metroCities.mjs'
import { getSSMParam } from '../backend/shared/utils.mjs'
import { saveToCache } from '../backend/shared/dynamoDbCache.mjs'

const cacheTableName = 'job_salaries'
const professionalLevels = ['I', 'II', 'III', 'IV', 'V']

const numericSalary = (value) => {
  const numeric = Number(String(value).replace(/[^0-9.]/g, ''))
  return numeric
}

const buildPayload = ({ city, job, level, salary }) => ({
  city,
  job,
  level,
  average_salary: salary,
  last_updated: new Date().toISOString(),
})

const seedSalary = async () => {
  const apiKey = await getSSMParam('openwebninja_api_key')
  const apiUrl = await getSSMParam('openwebninja_api_url')
  if (!apiKey || !apiUrl) console.log('no key, no url for api')

  const shouldSkipCache = process.env.SKIP_CACHE === 'true'
  let successCount = 0
  const missingEntries = []

  cities.forEach(async city => {
    const cityName = city.name
    const positions = city.Position || []

    positions.forEach(async position => {
      const positionName = position.name
      const salaryValue = numericSalary(position.salary)

      professionalLevels.forEach(async level => {
        if (salaryValue === null) {
          missingEntries.push({ city: cityName, job: `${positionName} ${level}` })
          return
        }

        const item = buildPayload({
          city: cityName,
          job: `${positionName} ${level}`,
          level,
          salary: salaryValue,
        })

        if (!shouldSkipCache) await saveToCache(cacheTableName, item)
        successCount++
      })
    })
  })

  console.log(`Seed complete: ${successCount} saved.`)
  if (missingEntries.length) {
    console.log('Entries missing data:')
    missingEntries.forEach(({ city, job }) => console.log(` - ${city}: ${job}`))
  }
}

seedSalary().catch(err => console.error('Error running seedSalary:', err))
