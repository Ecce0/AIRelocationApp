const salary = async (event) => {
  // TODO: read job + city from event, fetch from DynamoDB
  return { 
    statusCode: 200, 
    body: JSON.stringify({ 
        job: "Cloud Engineer", 
        salary: 120000 
    }) 
 };
};
module.exports.salary = salary;
