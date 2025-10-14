import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:1111",
  timeout: 60000,
  headers: { "Content-Type": "application/json" }
})

export const fetchMetrics = async () => {
  const res = await api.get("/metrics")
  return res.data
}

export const fetchSalary = async (city: string) => {
  const res = await api.get(`/salary?city=${encodeURIComponent(city)}`)
  return res.data
}

export const fetchCostOfLiving = async (city: string) => {
  const res = await api.get(`/col?city=${encodeURIComponent(city)}`)
  return res.data
}

export default api
