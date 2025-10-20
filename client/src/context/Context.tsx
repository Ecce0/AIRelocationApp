import React, { createContext, useContext, useState } from "react"
import { fetchMetrics, fetchSalary, fetchCostOfLiving } from "../api/apiClient/apiClient"

interface AppContextProps {
  metrics: any
  salaryData: any
  colData: any
  currentCity: string
  targetCity: string
  position: string
  aiResponse: string | null
  loading: boolean
  setCurrentCity: (value: string | ((prevState: string) => string)) => void
  setTargetCity: (value: string | ((prevState: string) => string)) => void
  setPosition: (value: string | ((prevState: string) => string)) => void
  setAiResponse: any | null
  setLoading: (value: boolean | ((prevState: boolean) => boolean)) => void
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
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false) 

  const getMetrics = async () => {
    const data = await fetchMetrics()
    setMetrics(data)
  }

  const getSalary = async (city: string) => {
    const data = await fetchSalary(city)
    setSalaryData(data)
  }

  const getCostOfLiving = async (city: string) => {
    const data = await fetchCostOfLiving(city)
    setColData(data)
  }

  return (
    <Context.Provider
      value={{
        metrics,
        salaryData,
        colData,
        getMetrics,
        getSalary,
        getCostOfLiving,
        currentCity,
        targetCity,
        position,
        setPosition,
        aiResponse,
        loading,
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
