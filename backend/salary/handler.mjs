import { getSSMParam } from '../shared/utils.mjs';

const salary = async (event) => {
  const { location, job_title } = event.queryStringParameters || {};

  if (!location || !job_title) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'You must add a job AND a city' }),
    };
  }

  // Fetch API key + URL from SSM
  const apiKey = await getSSMParam('openwebninja_api_key');
  const apiUrl = await getSSMParam('openwebninja_api_url');

  if (!apiKey || !apiUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key or URL missing' }),
    };
  }

  // Build URL
  const url = `${apiUrl}?job_title=${encodeURIComponent(job_title)}&location=${encodeURIComponent(location)}`;

  const response = await fetch(url, {
    headers: { 'x-api-key': apiKey },
  });

  // Handle errors early
  if (response.status !== 200) {
    const errorText = await response.text(); // <-- safe for debugging
    return {
      statusCode: response.status,
      body: JSON.stringify({
        error: 'upstream failed',
        msg: errorText,
      }),
    };
  }

  // Parse data
  const { data } = await response.json();

  // Shape into simpler structure
  const results = data.map(({ job_title, location }) => ({
    job: job_title,
    city: location,
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({ data: results }),
  };
};

export default salary;