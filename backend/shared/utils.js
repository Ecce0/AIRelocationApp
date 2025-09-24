import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'

export const getApiKey = async () => {
  let cachedKey;
  if (cachedKey) return cachedKey;

  // v3 client
  const ssm = new SSMClient({ region: process.env.AWS_REGION || "us-east-1" });

  const response = await ssm.send(
    new GetParameterCommand({
      Name: "/relo-ai-app/openwebninja_api_key",
      WithDecryption: true,
    })
  );

  cachedKey = response.Parameter?.Value;
  return cachedKey;
};
