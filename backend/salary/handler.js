import { getApiKey } from './shared/utils.js'

const salary = async (event) => {
  const { body } = event
  body === "string" ? JSON.parse(body) : (body || {});
  const { job, city } = body;

  if (!job || !city) {
    return { 
      statusCode: 400, 
      body: JSON.stringify({ 
        error: "You must add a job AND a city" 
      }) 
    };
  }

  const apiKey = await getApiKey();
  if (!apiKey) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: "API key missing" 
      }) 
    };
  }

  const url = `https://app.openwebninja.com/api/job-salary-data?job_title=${encodeURIComponent(job)}&location=${encodeURIComponent(city)}`;

  const response = await fetch(
    url, 
    { 
      headers: 
      { 
        "X-Api-Key": apiKey 
      } 
    }
  );
  const data = await response.json();

  //fix this
  if (!response.ok) {
    return { 
      statusCode: response.status, 
      body: JSON.stringify({ 
        error: "upstream failed", 
        details: data 
      }) 
    };
  }

  // TODO: cache to DynamoDB here (optional)

  return { 
    statusCode: 200, 
    body: JSON.stringify({ 
      source: "api", 
      job, city, data 
    }) 
  };
};

export default salary