import { useState } from "react"
import type { ChangeEvent } from "react"
import { useAppContext } from "../../context/Context"


const AI = () => {
  const { 
    getSalary, 
    getCostOfLiving, 
    salaryData, 
    colData,
    currentCity,
    setCurrentCity,
    targetCity,
    setTargetCity,
    aiResponse,
    setAiResponse,
    loading,
    setLoading
  } = useAppContext()
  

  const onSubmit = async () => {
    setLoading(true)
    try {
      // placeholder for backend call — will connect to /ai Lambda later
      const fakeAiResponse = `Based on your selections, ${targetCity} has a higher cost of living but stronger salary growth potential.`
      setAiResponse(fakeAiResponse)
    } catch (err) {
      setAiResponse("Error retrieving AI insights. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target 
    if (name === "currentCity") {
      setCurrentCity(value)
    } else if (name === "targetCity") {
      setTargetCity(value)
    }
  }

  return (
    <div className="font-oxanium">
      <h1>AI Relocation Insights</h1>
      <p>
        Compare cities to see how salary, cost of living, and opportunity balance
        for your relocation goals.
      </p>

      <div>
        <label>Current City:</label>
        <input
          type="text"
          value={currentCity}
          onChange={onChange}
          placeholder="e.g. Raleigh, NC"
        />
      </div>

      <div>
        <label>Target City:</label>
        <input
          type="text"
          value={targetCity}
          onChange={onChange}
          placeholder="e.g. Washington, DC"
        />
      </div>

      <button onClick={onSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Generate AI Insight"}
      </button>

      {aiResponse && (
        <div>
          <h2>AI Recommendation</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  )
}

export default AI
