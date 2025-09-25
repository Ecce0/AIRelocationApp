const auth = async (event) => {
  // TODO: implement real auth later
  return {
    statusCode: 200,
    body: JSON.stringify({
      authorized: true,
    }),
  }
}
export default auth
