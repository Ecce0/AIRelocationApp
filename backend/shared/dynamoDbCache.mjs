import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from "@aws-sdk/util-dynamodb"

const client = new DynamoDBClient({})

export const getFromCache = async (tableName, key) => {
  try {
    if (!key || !key.city) {
      console.error('Missing key.city', { tableName, key })
      return null
    }

    let Key
    if (tableName.includes('job_salaries')) {
      if (!key.job) {
        console.error('Missing key.job for job_salaries', { key })
        return null
      }

      // Normalize city (strip ", ST" if present)
      const cityOnly = key.city.split(',')[0].trim()
      Key = { job: { S: key.job }, city: { S: cityOnly } }
    } else {
      Key = { city: { S: key.city } }
    }

    const command = new GetItemCommand({ TableName: tableName, Key })
    const result = await client.send(command)

    console.log(
      '📦 DynamoDB getFromCache result:',
      tableName,
      Key,
      result.Item ? 'Found' : 'Not Found'
    )

    if (!result.Item) return null

    const unmarshalled = unmarshall(result.Item)

    if (unmarshalled.data && typeof unmarshalled.data === 'string' && unmarshalled.data.startsWith('{')) {
      try {
        unmarshalled.data = JSON.parse(unmarshalled.data)
      } catch {
        console.warn('Failed to parse JSON from data field')
      }
    }

    return unmarshalled
  } catch (err) {
    console.error('getFromCache error:', err)
    return null
  }
}

export const saveToCache = async (tableName, item) => {
  const sanitized = Object.fromEntries(
    Object.entries(item).map(([k, v]) => [
      k,
      typeof v === "object" ? JSON.stringify(v) : v,
    ])
  )
  const command = new PutItemCommand({
    TableName: tableName,
    Item: marshall(sanitized),
  })
  await client.send(command)
}


const unmarshall = (item) =>
  Object.fromEntries(Object.entries(item).map(([k, v]) => [k, v.S]))
