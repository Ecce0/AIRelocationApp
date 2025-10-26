import React, { createContext, useContext, useState } from "react"
import { fetchMetrics, fetchSalary, fetchCostOfLiving } from "../api/apiClient/apiClient"

interface AppContextProps {
  metricsData: any
  salaryData: any
  colData: any
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
  getMetrics: () => Promise<void>
  getSalary: (city: string, job: string) => Promise<void>
  getCostOfLiving: (city: string) => Promise<void>
}

const Context = createContext<AppContextProps | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [metricsData, setMetricsData] = useState(null)
  const [salaryData, setSalaryData] = useState(null)
  const [colData, setColData] = useState(null)
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


  const getSalary = async (city: string, job: string) => {
    if (!city || !job) {
      console.warn("getCostOfLiving called without city or job")
      return
    }

    const cacheKey = `salary_${city.toLowerCase()}`
    const cached = sessionStorage.getItem(cacheKey)

    if (cached) {
      setSalaryData(JSON.parse(cached))
      return
    }
    try {
      setLoading(true)
      setError(false)
      const data = await fetchSalary(city, job)
      setSalaryData(data)
      sessionStorage.setItem(cacheKey, JSON.stringify(data))
      return data
    } catch (err) {
      console.error("Error fetching salary data:", err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

    const getCostOfLiving = async (city: string) => {
      if (!city) {
        console.warn("getCostOfLiving called without city")
        return
      }
      const cacheKey = `col_${city.toLowerCase()}`
      const cached = sessionStorage.getItem(cacheKey)
  
      if (cached) {
        setColData(JSON.parse(cached))
        return
      }
  
      try {
        setLoading(true)
        setError(false)
        const data = await fetchCostOfLiving(city)
        sessionStorage.setItem(cacheKey, JSON.stringify(data))
        return data
      } catch (err) {
        console.error("Error fetching COL data:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
  
    const getMetrics = async () => {
      const cacheKey = "metrics"
      const cached = sessionStorage.getItem(cacheKey)
  
      if (cached) {
        setMetricsData(JSON.parse(cached))
        return
      }
  
      try {
        setLoading(true)
        setError(false)
        const data = await fetchMetrics()
        setMetricsData(data)
        sessionStorage.setItem(cacheKey, JSON.stringify(data))
        setLoading(false)
        return data
      } catch (err) {
        console.error("Error fetching metrics data:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    

  
    return (
      <Context.Provider
        value={{
          metricsData,
          salaryData,
          colData,
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
          getMetrics,
          getSalary,
          getCostOfLiving,
          setPosition,
          setProfLevel,
          setError,
          setCurrentCity,
          setTargetCity,
          setCCResponse,
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
