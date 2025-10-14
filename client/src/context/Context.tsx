import React, { createContext, useContext, useState } from "react"
import { fetchMetrics, fetchSalary, fetchCostOfLiving } from "../api/apiClient/apiClient"

interface AppContextProps {
  metrics: any
  salaryData: any
  colData: any
  getMetrics: () => Promise<void>
  getSalary: (city: string) => Promise<void>
  getCostOfLiving: (city: string) => Promise<void>
}

const Context = createContext<AppContextProps | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [metrics, setMetrics] = useState(null)
  const [salaryData, setSalaryData] = useState(null)
  const [colData, setColData] = useState(null)

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
        getCostOfLiving
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
