
import { type ChangeEvent } from "react"
import robot from "../../assets/robot.jpg"
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
    position,
    setPosition,
    profLevel,
    setProfLevel,
    aiResponse,
    setAiResponse,
    loading,
    setLoading
  } = useAppContext()

  const onSubmit = async () => {
    setLoading(true)
    try {
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
    } else if (name === 'position') {
      setPosition(value)
    } else if (name === 'profLevel') {
      setProfLevel(value)
    }
  }


  return (
    <div className=" relative w-full min-h-[80vh] flex justify-center items-center overflow-visible">
      <img
        src={robot}
        alt=""
        className="absolute inset-0 w-full h-full object-cover contrast-75"
      />
      <div className="relative z-20 w-11/12 md:w-10/12 lg:w-8/12 h-auto bg-primary/80 backdrop-blur-sm rounded-md p-8 font-playfair text-secondary flex flex-col flex-nowrap gap-8">
        <h1 className="text-3xl font-bold font-oxanium mb-2">AI Relocation Insights</h1>

        {/* <div className="stats shadow bg-base-100/20 text-secondary w-full">
          <div className="stat">
            <div className="stat-title">Cloud Position</div>
            <div className="stat-value">{position}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Current City</div>
            <div className="stat-value">{currentCity}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Desired City</div>
            <div className="stat-value">{targetCity}</div>
          </div>
          <div className="stat">
            <div className="stat-title">AI Calculation</div>
            <div className="stat-value">{aiResponse}</div>
          </div>
        </div> */}

        <div className="grid grid-cols-4 gap-4 font-oxanium">
          <input 
              type="text" 
              placeholder="Current City" 
              className="input input-success col-span-1 bg-base-100/10"
              value={currentCity}
              onChange={onChange}
              />
          <input 
              type="text"
              className="input input-warning col-span-1 bg-base-100/10"
              placeholder="Desired City"
              value={targetCity}
              onChange={onChange}
          />
          <input 
              type="text" 
              className="input input-info col-span-1 bg-base-100/10"
              placeholder="Cloud Position"
              value={position}
              onChange={onChange}
          />
          <input 
              type="text" 
              className="input input-error col-span-1 bg-base-100/10"
              placeholder="Professional Level"
              value={profLevel}
              onChange={onChange}
          />
        </div>
          <button className="btn btn-soft btn-accent w-full mt-4 font-oxanium" onClick={onSubmit}>Calculate</button>
      </div>
    </div>
  )
}

export default AI
