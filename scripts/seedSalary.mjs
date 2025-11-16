import { cities } from './metroCities.mjs'
import { saveToCache } from '../backend/shared/dynamoDbCache.mjs'

const cacheTableName = 'job_salaries'
const professionalLevels = ['I', 'II', 'III', 'IV', 'V']

const numericSalary = (value) => {
  if (value === undefined || value === null) return null
  return Number(String(value).replace(/[^0-9.]/g, ''))
}

const buildPayload = ({ city, job, level, salary }) => ({
  city, // include state abbreviation (City, ST)
  job,
  level,
  average_salary: salary,
  last_updated: new Date().toISOString(),
})

const seedSalary = async () => {
  let success = 0
  const missing = []

  for (const city of cities) {
    const cityName = city.city // should be in format "Raleigh, NC"
    for (const position of city.Position || []) {
      for (const level of professionalLevels) {
        const salaryValue = numericSalary(position[level]?.salary || position[level])
        if (!salaryValue) {
          missing.push({ city: cityName, job: position.name })
          continue
        }

        const item = buildPayload({
          city: cityName,
          job: `${position.name} ${level}`,
          level,
          salary: salaryValue,
        })

        await saveToCache(cacheTableName, item)
        success++
      }
    }
  }

  console.log(`✅ Seeding done. Success: ${success}, Missing: ${missing.length}`)
}

seedSalary().catch(console.error)
