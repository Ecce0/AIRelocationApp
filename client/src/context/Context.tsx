import React, { createContext, useContext, useState } from "react"
import { fetchMetrics, fetchSalary, fetchCostOfLiving } from "../api/apiClient/apiClient"

interface AppContextProps {
  metrics: any
  salaryData: any
  colData: any
  currentCity: string
  targetCity: string
  position: string
  profLevel: string
  aiResponse: string | null
  loading: boolean
  error: boolean
  setCurrentCity: (value: string | ((prevState: string) => string)) => void
  setTargetCity: (value: string | ((prevState: string) => string)) => void
  setPosition: (value: string | ((prevState: string) => string)) => void
  setProfLevel: (value: string | ((prevState: string) => string)) => void
  setAiResponse: (value: string | null | ((prevState: string | null) => string | null)) => void
  setLoading: (value: boolean | ((prevState: boolean) => boolean)) => void
  setError: (value: boolean | ((prevState: boolean) => boolean)) => void
  getMetrics: () => Promise<void>
  getSalary: (city: string) => Promise<void>
  getCostOfLiving: (city: string) => Promise<void>
}

const Context = createContext<AppContextProps | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [metrics, setMetrics] = useState(null)
  const [salaryData, setSalaryData] = useState(null)
  const [colData, setColData] = useState(null)
  const [currentCity, setCurrentCity] = useState("")
  const [targetCity, setTargetCity] = useState("")
  const [position, setPosition] = useState("")
  const [profLevel, setProfLevel] = useState("")
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

 async function getSalary(city: string) {
    const cacheKey = `salary_${city.toLowerCase()}`
    const cached = sessionStorage.getItem(cacheKey)

    if (cached) {
      setSalaryData(JSON.parse(cached))
      return
    }

    try {
      const data = await fetchSalary(city)
      setSalaryData(data)
      sessionStorage.setItem(cacheKey, JSON.stringify(data))
    } catch (err) {
      console.error("Error fetching salary data:", err)
    }
  }

  const getCostOfLiving = async (city: string) => {
  const cacheKey = `col_${city.toLowerCase()}`
  const cached = sessionStorage.getItem(cacheKey)

  if (cached) {
    setColData(JSON.parse(cached))
    return
  }

  try {
    const data = await fetchCostOfLiving(city)
    setColData(data)
    sessionStorage.setItem(cacheKey, JSON.stringify(data))
  } catch (err) {
    console.error("Error fetching COL data:", err)
  }
}

const getMetrics = async () => {
  const cacheKey = "metrics"
  const cached = sessionStorage.getItem(cacheKey)

  if (cached) {
    setMetrics(JSON.parse(cached))
    return
  }

  try {
    const data = await fetchMetrics()
    setMetrics(data)
    sessionStorage.setItem(cacheKey, JSON.stringify(data))
  } catch (err) {
    console.error("Error fetching metrics data:", err)
  }
}

  return (
    <Context.Provider
      value={{
        metrics,
        salaryData,
        colData,
        currentCity,
        targetCity,
        position,
        profLevel,
        aiResponse,
        loading,
        error,
        getMetrics,
        getSalary,
        getCostOfLiving,
        setPosition,
        setProfLevel,
        setError,
        setCurrentCity,
        setTargetCity,
        setAiResponse,
        setLoading,
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
