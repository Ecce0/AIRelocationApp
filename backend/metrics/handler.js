const metrics = async (event) => {
  // TODO: combine salary + cost-of-living for adjusted salary
  return {
    statusCode: 200,
    body: JSON.stringify({
      adjustedSalary: 135000,
    }),
  }
}
export default metrics
