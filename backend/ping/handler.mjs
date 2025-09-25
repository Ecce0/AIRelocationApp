const ping = async (e) => {
  console.log('ping successful:', e)
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ping: true, time: new Date().toISOString() }),
  }
}

export default ping
