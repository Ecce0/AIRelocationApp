const costOfLiving = async (event) => {
  // TODO: read city from event, fetch from DynamoDB
  return {
    statusCode: 200,
    body: JSON.stringify({
      city: 'Raleigh',
      costIndex: 100,
    }),
  }
}
export default costOfLiving
