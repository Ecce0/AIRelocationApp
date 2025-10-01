import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
} from "@aws-sdk/client-dynamodb"
import { fromIni } from "@aws-sdk/credential-providers"
import { getSSMParam } from "../backend/shared/utils.mjs"
import { cities } from "./metroCities.mjs"

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const BATCH_SIZE = 25

const main = async () => {
    try {
        const apiKey = await getSSMParam("zyla_api_key")
        const apiUrl = await getSSMParam("zyla_api_url")

        console.log("Using API URL:", apiUrl)
        console.log("Total cities to seed:", cities.length)

        const dynamo = new DynamoDBClient({
            region: process.env.AWS_REGION || "us-east-1",
            credentials: fromIni({
                profile: process.env.AWS_PROFILE || "erica-admin",
            }),
        })
//fix all loops and make them more sophisticated
        for (let i = 0; i < cities.length; i += BATCH_SIZE) {
      const batch = cities.slice(i, i + BATCH_SIZE)

        for (const city of batch) {
            console.log("Checking city:", city)

            const exists = await dynamo.send(
                new GetItemCommand({
                    TableName: "relo-ai-app-cost-of-living-cache",
                    Key: { city: { S: city } },
                })
            )

            if (exists.Item) {
                console.log(`Skipping ${city}, already seeded`)
                continue
            }

            let success = false
            let attempts = 0

            while (!success && attempts < 5) {
                try {
                    const response = await fetch(`${apiUrl}?city=${encodeURIComponent(city)}`, {
                        headers: { Authorization: `Bearer ${apiKey}` },
                    })

                    if (response.status === 429) {
                        attempts++
                        const backoff = 1000 * attempts
                        console.warn(`429 Too Many Requests for ${city}. Retrying in ${backoff} ms...`)
                        await delay(backoff)
                        continue
                    }

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status} for ${city}`)
                    }

                    const data = await response.json()

                    await dynamo.send(
                        new PutItemCommand({
                            TableName: "relo-ai-app-cost-of-living-cache",
                            Item: {
                                city: { S: city },
                                payload: { S: JSON.stringify(data) },
                                seededAt: { S: new Date().toISOString() },
                            },
                        })
                    )


                    console.log(`Seeded ${city}`)
                    success = true
                } catch (err) {
                    attempts++
                    console.error(`Error seeding ${city}: ${err.message}`)
                    if (attempts < 5) {
                        await delay(1000 * attempts)
                    } else {
                        console.error(`Giving up on ${city} after ${attempts} attempts`)
                    }
                }
            }

            await delay(10000)
        }
    }

    console.log(" Seeding completed")
   } catch (err) {
    console.error("Seeding failed", err)
    process.exit(1)
}
}

main()
