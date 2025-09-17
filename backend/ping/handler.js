const ping = async (event) => {
  console.log('ping event:', event)
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ping: true, time: new Date().toISOString() }),
  }
}

module.exports.ping = ping
