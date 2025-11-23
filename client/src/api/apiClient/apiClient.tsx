import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY || "",
  },
})


export const fetchMetrics = async (city: string, job: string, level: string = 'II') => {
  const res = await api.get(`/metrics`, {
    params: { city, job, level }
  })
  return res.data
}

export default api