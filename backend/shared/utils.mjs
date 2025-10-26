import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'

const ssm = new SSMClient({
  region: process.env.AWS_REGION || 'us-east-1',
})

export const getSSMParam = async (paramKey) => {
  try {
    const response = await ssm.send(
      new GetParameterCommand({
        Name: `/relo-calc-app/${paramKey}`,
        WithDecryption: true,
      }),
    )
    return response.Parameter?.Value
  } catch (error) {
    console.error('Error fetching API key from SSM:', error)
    throw error
  }
}
