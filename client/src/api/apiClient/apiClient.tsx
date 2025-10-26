import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY || "",
  },
})

export const fetchMetrics = async () => {
  const res = await api.get("/metrics")
  return res.data
}

export const fetchSalary = async (city: string, job: string) => {
  const res = await api.get(`/salary`, {
    params: { city, job },
  })
  return res.data
}

export const fetchCostOfLiving = async (city: string) => {
  const res = await api.get(`/col`, {
    params: { city },
  })
  return res.data
}

export default api
