import React, { createContext, useContext, useState } from "react"
import { fetchMetrics } from "../api/apiClient/apiClient"

type MetricsRecord = {
  city: string
  job: string
  salary: any
  costOfLiving: any,
  affordability: any
} | null


interface AppContextProps {
  metricsData: MetricsRecord
  currentCity: string
  targetCity: string
  position: string
  profLevel: string
  ccResponse: string | null
  loading: boolean
  error: boolean
  increaseInPay: boolean
  decreaseInPay: boolean
  payDifference: number
  cloudRoles: string[]
  profLevels: string[]
  setCurrentCity: (value: string | ((prevState: string) => string)) => void
  setTargetCity: (value: string | ((prevState: string) => string)) => void
  setPosition: (value: string | ((prevState: string) => string)) => void
  setProfLevel: (value: string | ((prevState: string) => string)) => void
  setCCResponse: (value: string | null | ((prevState: string | null) => string | null)) => void
  setLoading: (value: boolean | ((prevState: boolean) => boolean)) => void
  setError: (value: boolean | ((prevState: boolean) => boolean)) => void
  setIncreaseInPay: (value: boolean | ((prevState: boolean) => boolean)) => void
  setDecreaseInPay: (value: boolean | ((prevState: boolean) => boolean)) => void
  setPayDifference: (value: number | ((prevState: number) => number)) => void
  getMetrics: (city?: string, job?: string) => Promise<MetricsRecord | null>
  calculateRelocation: (city: string, job: string) => Promise<MetricsRecord | void>
  resetCalculationState: () => void
}

const Context = createContext<AppContextProps | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [ metricsData, setMetricsData ] = useState<MetricsRecord>(null)
  const [currentCity, setCurrentCity] = useState("")
  const [targetCity, setTargetCity] = useState("")
  const [position, setPosition] = useState("")
  const [profLevel, setProfLevel] = useState("")
  const [ccResponse, setCCResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [increaseInPay, setIncreaseInPay] = useState(false)
  const [decreaseInPay, setDecreaseInPay] = useState(false)
  const [payDifference, setPayDifference] = useState(0)
  const cloudRoles = [
    "Cloud Developer",
    "Cloud Engineer",
    "Cloud Architect",
    "DevOps Engineer",
    "Site Reliability Engineer",
    "Cloud Security Engineer",
    "Cloud Solutions Architect",
    "Cloud Consultant"
  ]
  const profLevels = [
    "I — Junior / Entry / Associate",
    "II — Mid-Level / Developer",
    "III — Senior / Lead",
    "IV — Principal / Manager",
    "V — Director / VP / Chief"
  ]

  // const normalizeSalary = (payload: any): SalaryRecord => {
  //   const record = payload?.data?.[0] || payload
  //   if (!record) return null
  //   return {
  //     job: record.job || record.job_title,
  //     city: record.city || record.location,
  //     average_salary: Number(record.average_salary ?? record.median_salary ?? 0),
  //     last_updated: record.last_updated || record.salaries_updated_at,
  //   }
  // }

  // const normalizeCol = (payload: any): CostRecord => {
  //   let data: any = payload?.data ?? payload
  //   if (typeof data === "string") {
  //     try {
  //       data = JSON.parse(data)
  //     } catch {
  //       data = null
  //     }
  //   }
  //   if (!data) return null
  //   const toNumber = (value: any) => {
  //     if (value === null || value === undefined) return null
  //     const num = Number(String(value).replace(/[^0-9.\-]/g, ""))
  //     return Number.isFinite(num) ? num : null
  //   }
  //   return {
  //     city: data.city ?? data["City Name"],
  //     avgMonthlyNetSalary: toNumber(data.avg_monthly_net_salary),
  //     monthlyUtilities:
  //       toNumber(data.basic_utilities) ??
  //       toNumber(
  //         data["Basic (Electricity, Heating, Cooling, Water, Garbage) for 915 sq ft Apartment"]
  //       ),
  //     monthlyTransportation: toNumber(data.monthly_transport_pass ?? data["Monthly Pass (Regular Price)"]),
  //     rentOneBedroom: toNumber(data.apartment_city_centre_1br ?? data["Apartment (1 bedroom) in City Centre"]),
  //     mortgageInterestRate:
  //       toNumber(data.mortgage_interest_rate) ??
  //       toNumber(
  //         data["Mortgage Interest Rate in Percentages (%), Yearly, for 20 Years Fixed-Rate"]
  //       ),
  //     raw: data,
  //   }
  // }

  // const getSalary = async (city: string, job: string): Promise<SalaryRecord> => {
  //   if (!city || !job) {
  //     console.warn("getSalary called without city or job")
  //     return null
  //   }

  //   const cacheKey = `salary_${city.toLowerCase()}_${job.toLowerCase()}`
  //   const cached = sessionStorage.getItem(cacheKey)
  //   if (cached) {
  //     const parsed = normalizeSalary(JSON.parse(cached))
  //     setSalaryData(parsed)
  //     return parsed
  //   }

  //   try {
  //     const response = await fetchSalary(city, job)
  //     sessionStorage.setItem(cacheKey, JSON.stringify(response))
  //     const normalized = normalizeSalary(response)
  //     setSalaryData(normalized)
  //     return normalized
  //   } catch (err) {
  //     console.error("Error fetching salary data:", err)
  //     setError(true)
  //     return null
  //   }
  // }

  // const getCostOfLiving = async (city: string): Promise<CostRecord> => {
  //   if (!city) {
  //     console.warn("getCostOfLiving called without city")
  //     return null
  //   }

  //   const cacheKey = `col_${city.toLowerCase()}`
  //   const cached = sessionStorage.getItem(cacheKey)

  //   if (cached) {
  //     const parsed = normalizeCol(JSON.parse(cached))
  //     setColData(parsed)
  //     return parsed
  //   }

  //   try {
  //     const data = await fetchCostOfLiving(city)
  //     sessionStorage.setItem(cacheKey, JSON.stringify(data))
  //     const normalized = normalizeCol(data)
  //     setColData(normalized)
  //     return normalized
  //   } catch (err) {
  //     console.error("Error fetching COL data:", err)
  //     setError(true)
  //     return null
  //   }
  // }

  const resetCalculationState = () => {
    setMetricsData(null)
    setCCResponse(null)
  }

  const getMetrics = async (cityParam?: string, jobParam?: string): Promise<MetricsRecord | null> => {
    const cityToUse = cityParam ?? currentCity
    const jobToUse = jobParam ?? position
    if (!cityToUse || !jobToUse) {
      console.warn("getMetrics called without city or job")
      return null
    }
    setLoading(true)
    setError(false)
    try {
      const response = await fetchMetrics(cityToUse, jobToUse)
      setMetricsData(response as MetricsRecord)
      return response as MetricsRecord
    } catch (err) {
      console.error("Error fetching metrics:", err)
      setError(true)
      return null
    } finally {
      setLoading(false)
    }
  }

  const calculateRelocation = async (city: string, job: string) => {
    if (!city) return
    try {
      setError(false)
      const metrics = await getMetrics(city, job)
      return metrics
    } catch (err) {
      console.error("Failed to calculate relocation", err)
      setError(true)
      throw err
    }
  }




  return (
    <Context.Provider
      value={{
        metricsData,
        currentCity,
        targetCity,
        position,
        profLevel,
        ccResponse,
        loading,
        error,
        increaseInPay,
        decreaseInPay,
        payDifference,
        cloudRoles,
        profLevels,
        setDecreaseInPay,
        setIncreaseInPay,
        setPayDifference,
        calculateRelocation,
        resetCalculationState,
        setPosition,
        setProfLevel,
        setError,
        setCurrentCity,
        setTargetCity,
        setCCResponse,
        setLoading,
        getMetrics,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
