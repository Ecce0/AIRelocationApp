import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY || "",
  },
})

// export const fetchSalary = async (city: string, job: string) => {
//   const res = await api.get(`/salary`, {
//     params: { city, job },
//   })
//   return res.data
// }

// export const fetchCostOfLiving = async (city: string) => {
//   const res = await api.get(`/col`, {
//     params: { city },
//   })
//   return res.data
// }

export const fetchMetrics = async (city: string, job: string) => {
  const res = await api.get(`/metrics`, {
    params: { city, job }
  })
  return res.data
}

export default api
