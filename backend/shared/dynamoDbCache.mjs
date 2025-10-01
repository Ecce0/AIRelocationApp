import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({})

/**
 * Get an item from DynamoDB cache
 * @param {string} tableName - DynamoDB table name
 * @param {object} key - Primary key object { pkName: pkValue, skName?: skValue }
 */

export const getFromCache = async (tableName, key) => {
  const command = new GetItemCommand({
    TableName: tableName,
    Key: Object.fromEntries(Object.entries(key).map(([k, v]) => [k, { S: v }])),
  })

  const result = await client.send(command)
  return result.Item ? unmarshall(result.Item) : null
}

/**
 * Save an item into DynamoDB cache
 * @param {string} tableName
 * @param {object} item - Item to store
 */
export const saveToCache = async (tableName, item) => {
  const marshalled = Object.fromEntries(
    Object.entries(item).map(([k, v]) => [k, { S: String(v) }]),
  )

  const command = new PutItemCommand({
    TableName: tableName,
    Item: marshalled,
  })

  await client.send(command)
}

// Helper: DynamoDB unmarshall (simple string-only for now)
const unmarshall = (item) => {
  return Object.fromEntries(Object.entries(item).map(([k, v]) => [k, v.S]))
}
