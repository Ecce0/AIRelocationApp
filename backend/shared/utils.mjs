import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'

export const getSSMParam = async (paramKey) => {
  let cachedApiKey
  // v3 client
  const ssm = new SSMClient({ region: process.env.AWS_REGION || 'us-east-1' })
  try {
    const response = await ssm.send(
      new GetParameterCommand({
        Name: `/relo-ai-app/${paramKey}`,
        WithDecryption: true,
      }),
    )

    cachedApiKey = response.Parameter?.Value
    return cachedApiKey
  } catch (error) {
    console.error('Error fetching API key from SSM:', error)
    throw error
  }
}
