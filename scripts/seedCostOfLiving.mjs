import fetch from "node-fetch";
import { cities } from "./metroCities.mjs";
import { getSSMParam } from "../backend/shared/utils.mjs";
import { saveToCache } from "../backend/shared/dynamoDbCache.mjs";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const seedCostOfLiving = async () => {
  const apiKey = await getSSMParam("zyla_api_key");
  const apiUrl = await getSSMParam("zyla_api_url");
  let counter = 0;

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    try {
      const resp = await fetch(`${apiUrl}?city=${encodeURIComponent(city)}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      if (resp.status === 429) {
        console.log(`Rate limited on ${city}, backing off...`);
        await delay(60000);
        i--;
        continue;
      }

      if (!resp.ok) throw new Error(`Error ${resp.status}: ${await resp.text()}`);

      const data = await resp.json();
      await saveToCache("relo-ai-app-cost-of-living-cache", { city, data });
      console.log(`Seeded: ${city}`);
    } catch (err) {
      console.error(`Failed for ${city}:`, err.message);
    }

    counter++;
    await delay(5000);
    if (counter % 20 === 0) {
      console.log("Hourly throttle pause: sleeping 55 minutes...");
      await delay(55 * 60 * 1000);
    }
  }

  console.log("Seeding complete");
};

seedCostOfLiving();
