import React, { createContext, useContext, useState } from "react"
import { fetchMetrics } from "../api/apiClient/apiClient"

type MetricsRecord = {
  city: string
  job: string
  level: string
  salary: number
  costOfLiving: any
  metrics: {
    monthlySalary: number
    totalMonthlyCosts: number
    affordabilityRatio: number
    interpretation: string
  }
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
  getMetrics: (city?: string, job?: string, level?: string) => Promise<MetricsRecord | null>
  calculateRelocation: (city: string, job: string, level?: string) => Promise<MetricsRecord | null>
  resetCalculationState: () => void
}

const Context = createContext<AppContextProps | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [metricsData, setMetricsData] = useState<MetricsRecord>(null)
  const [currentCity, setCurrentCity] = useState("")
  const [targetCity, setTargetCity] = useState("")
  const [position, setPosition] = useState("")
  const [profLevel, setProfLevel] = useState("I")
  const [ccResponse, setCCResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [increaseInPay, setIncreaseInPay] = useState(false)
  const [decreaseInPay, setDecreaseInPay] = useState(false)
  const [payDifference, setPayDifference] = useState(0)
  
  const cloudRoles = [
    "Cloud Developer",
    "Cloud Engineer",
    "Solutions Architect",
    "DevOps Engineer",
    "Site Reliability Engineer",
    "Cloud Security Engineer",
    "Cloud Consultant"
  ]
  
  const profLevels = [
    "I",
    "II",
    "III",
    "IV",
    "V"
  ]

  const resetCalculationState = () => {
    setMetricsData(null)
    setCCResponse(null)
  }

  const getMetrics = async (
    cityParam?: string, 
    jobParam?: string, 
    levelParam?: string
  ): Promise<MetricsRecord | null> => {
    const cityToUse = cityParam ?? currentCity
    const jobToUse = jobParam ?? position
    const levelToUse = levelParam ?? profLevel 
    
    if (!cityToUse || !jobToUse) {
      console.warn("getMetrics called without city or job")
      return null
    }
    
    setLoading(true)
    setError(false)
    
    try {
      const response = await fetchMetrics(cityToUse, jobToUse, levelToUse)
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

  const calculateRelocation = async (
    city: string, 
    job: string, 
    level?: string
  ): Promise<MetricsRecord | null> => {
    if (!city || !job) return null
    
    try {
      setError(false)
      const metrics = await getMetrics(city, job, level)
      return metrics
    } catch (err) {
      console.error("Failed to calculate relocation", err)
      setError(true)
      return null
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