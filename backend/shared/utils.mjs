import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'
import { fromIni } from '@aws-sdk/credential-provider-ini'

const ssm = new SSMClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: fromIni({ profile: 'erica-admin' }),
})

export const getSSMParam = async (paramKey) => {
  try {
    const response = await ssm.send(
      new GetParameterCommand({
        Name: `/relo-ai-app/${paramKey}`,
        WithDecryption: true,
      }),
    )
    return response.Parameter?.Value
  } catch (error) {
    console.error('Error fetching API key from SSM:', error)
    throw error
  }
}
