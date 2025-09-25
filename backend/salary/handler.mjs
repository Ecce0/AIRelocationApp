import { getApiKey } from '../shared/utils.mjs';


const salary = async (event) => {
const { location , job_title } = event.queryStringParameters || {};

  if (!location || !job_title) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'You must add a job AND a city',
      }),
    };
  }

  const apiKey = await getApiKey();
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'API key missing',
      }),
    };
  }

 const url = `https://api.openwebninja.com/job-salary-data/job-salary?job_title=${encodeURIComponent(
  job_title
)}&location=${encodeURIComponent(location)}`;


  const response = await fetch(url, {
    headers: { 'x-api-key': apiKey },
  });

  if (response.status !== 200) {
    return {
      statusCode: response.status,
      body: JSON.stringify({
        error: 'upstream failed',
        msg: response.data,
      }),
    };
  }

const { data } = await response.json();
const results = data.map(({ job_title, location }) => ({
  job: job_title,
  city: location,
}));

return {
  statusCode: 200,
  body: JSON.stringify({ data: results }),
};
}

export default salary;