import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY || "",
  },
})


export const fetchMetrics = async (city: string, job: string, level: string ) => {
  const cityName = city.split(',')[0].trim()
  const res = await api.get('/metrics', {
    params: { city: cityName, job, level }
  })
  console.log("API Response:", res)
  return res.data
}

export default api