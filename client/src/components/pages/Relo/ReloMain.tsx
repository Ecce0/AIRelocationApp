import relo from "../../../assets/relo.jpg"
import { useState, type ChangeEvent } from "react"
import { useAppContext } from "../../../context/Context"
import { cities } from "../../../../cities"
import ReloResults from "./ReloResults"
import ReloTable from "./ReloTable"

const ErrorState = ({ msg }: { msg: string }) => (
  <div role="alert" className="alert alert-error alert-soft mt-2">
    <span>{msg}</span>
  </div>
)

const ReloMain = () => {
  const {
    currentCity,
    setCurrentCity,
    targetCity,
    setTargetCity,
    position,
    setPosition,
    profLevel,
    setProfLevel,
    ccResponse,
    setCCResponse,
    cloudRoles,
    profLevels,
    getMetrics,
    resetCalculationState
  } = useAppContext()

  const [citySuggestions, setCitySuggestions] = useState<string[]>([])
  const [targetSuggestions, setTargetSuggestions] = useState<string[]>([])
  const [cardLoading, setCardLoading] = useState(false)
  const [metrics, setMetrics] = useState<{ city: string; job: string; salary: any; costOfLiving: any; affordability: any } | null>(null)
  const [errors, setErrors] = useState({
    currentCity: false,
    targetCity: false,
    sameCity: false,
    position: false,
    profLevel: false
  })
  const isConsultantRole = position === "Cloud Consultant"
  const removeSpace = (input: any) => input.trim()

  const validateInputs = () => {
    const newErr = {
      currentCity: !removeSpace(currentCity),
      targetCity: !removeSpace(targetCity),
      sameCity:
        removeSpace(currentCity) !== '' &&
        removeSpace(targetCity) !== '' &&
        removeSpace(currentCity).toLowerCase() === removeSpace(targetCity).toLowerCase(),
      position: !removeSpace(position),
      profLevel: isConsultantRole ? false : !removeSpace(profLevel),
    }
    setErrors(newErr)
    return !Object.entries(newErr)
      .filter(([key]) => key !== 'sameCity')
      .some(([, value]) => value)
  }

   const resetForm = () => {
    setCurrentCity("")
    setTargetCity("")
    setPosition("")
    setProfLevel("")
    setCCResponse(null)
    setCardLoading(false)
    setMetrics(null)
    resetCalculationState()
    setErrors({
      currentCity: false,
      targetCity: false,
      sameCity: false,
      position: false,
      profLevel: false,
    })
    setCitySuggestions([])
    setTargetSuggestions([])
  }

  const onSubmit = async () => {
    if (ccResponse) return resetForm()
    if (!validateInputs()) return

    if (
      removeSpace(currentCity) &&
      removeSpace(targetCity) &&
      removeSpace(currentCity).toLowerCase() === removeSpace(targetCity).toLowerCase()
    ) {
      setErrors((prev) => ({ ...prev, sameCity: true, currentCity: true, targetCity: true }))
      return
    }
    try {
      setCardLoading(true)
      const res = await getMetrics(targetCity, position, profLevel)
      console.log(res)
      setMetrics(null)
      setCCResponse("metrics_loaded")
    } catch (err) {
      console.error(err)
      setCCResponse("Error retrieving insights. Please try again later.")
    } finally {
      setCardLoading(false)
    }
 
    setCitySuggestions([])
    setTargetSuggestions([])
  }

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCurrentCity(value)
    setErrors((err) => ({
      ...err,
      currentCity: !removeSpace(value),
      sameCity:
        removeSpace(value) !== '' &&
        removeSpace(targetCity) !== '' &&
        removeSpace(value).toLowerCase() === removeSpace(targetCity).toLowerCase(),
    }))
    setCitySuggestions(
      value.length > 1
        ? cities
            .filter((city) =>
              city.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 6)
        : []
    )
  }

  const handleTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTargetCity(value)
    setErrors((err) => ({
      ...err,
      targetCity: !removeSpace(value),
      sameCity:
        removeSpace(currentCity) !== '' &&
        removeSpace(value) !== '' &&
        removeSpace(currentCity).toLowerCase() === removeSpace(value).toLowerCase(),
    }))
    setTargetSuggestions(
      value.length > 1
        ? cities
            .filter((city) =>
              city.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 6)
        : []
    )
  }

  const handleSelectCity = (city: string, type: "current" | "target") => {
    if (type === "current") {
      setCurrentCity(city)
      setCitySuggestions([])
      setErrors((err) => ({
        ...err,
        currentCity: false,
        sameCity:
          removeSpace(city) !== '' &&
          removeSpace(targetCity) !== '' &&
          removeSpace(city).toLowerCase() === removeSpace(targetCity).toLowerCase(),
      }))
    } else {
      setTargetCity(city)
      setTargetSuggestions([])
      setErrors((err) => ({
        ...err,
        targetCity: false,
        sameCity:
          removeSpace(currentCity) !== '' &&
          removeSpace(city) !== '' &&
          removeSpace(currentCity).toLowerCase() === removeSpace(city).toLowerCase(),
      }))
    }
  }

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === "position") {
      setPosition(value)
      setErrors((err) => ({ ...err, position: false }))
      if (value === "Cloud Consultant") {
        setProfLevel("")
        setErrors((err) => ({ ...err, profLevel: false }))
      }
    } else if (name === "profLevel") {
      setProfLevel(value)
      setErrors((err) => ({ ...err, profLevel: false }))
      if (value === "Cloud Consultant") {
        setProfLevel("")
        setErrors((err) => ({ ...err, profLevel: false }))
      }
    }

  }



  const annualSalary = metrics?.salary?.average_salary ?? 0
  const monthlySalary = annualSalary ? Number(annualSalary) / 12 : 0
  const hasCostData = Boolean(metrics?.costOfLiving)

  return (
    <div className="relative w-full min-h-[80vh] flex justify-center items-center overflow-visible">
      <img src={relo} alt="" className="absolute inset-0 w-full h-full object-cover contrast-75" />
      <div className="relative z-20 w-11/12 bg-primary/80 backdrop-blur-xs rounded-md p-8 text-secondary flex flex-col gap-8 font-oxanium">
        <h1 className="text-3xl font-bold mb-2">Relocation Calculation + Metrics</h1>

        <div className="grid grid-cols-4 gap-8">
          <div className="relative col-span-1">
            <input
              type="text"
              placeholder="Current City"
              className="input input-success bg-primary/75 w-full"
              value={currentCity}
              onChange={handleCityChange}
              autoComplete="off"
            />
            {errors.currentCity && <ErrorState msg="Check the current city" />}
            {citySuggestions.length > 0 && (
              <ul className="absolute top-full mt-1 bg-primary/75 rounded-md shadow-lg max-h-48 overflow-y-auto w-full z-30">
                {citySuggestions.map((c) => (
                  <li
                    key={c}
                    className="px-3 py-2 hover:bg-primary/75 cursor-pointer"
                    onClick={() => handleSelectCity(c, "current")}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative col-span-1">
            <input
              type="text"
              placeholder="Desired City"
              className="input input-warning bg-primary/75 w-full"
              value={targetCity}
              onChange={handleTargetChange}
              autoComplete="off"
            />
            {errors.targetCity && (
              <ErrorState msg="Check the desired city" />
            )}
            {errors.sameCity && !errors.targetCity && !errors.currentCity && (
              <ErrorState msg="Current city and desired city cannot be the same." />
            )}
            {targetSuggestions.length > 0 && (
              <ul className="absolute top-full mt-1 bg-primary/75 rounded-md shadow-lg max-h-48 overflow-y-auto w-full z-30">
                {targetSuggestions.map((c) => (
                  <li
                    key={c}
                    className="px-3 py-2 hover:bg-primary-300 cursor-pointer"
                    onClick={() => handleSelectCity(c, "target")}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-span-1">
            <select
              name="position"
              className="select select-info bg-primary/75 w-full"
              value={position}
              onChange={onChange}
            >
              <option value="">Select Cloud Position</option>
              {cloudRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.position && <ErrorState msg="Which cloud position?" />}
          </div>
          <div className="col-span-1">
            <select
              name="profLevel"
              className="select select-error bg-primary/75 w-full"
              value={profLevel}
              onChange={onChange}
              disabled={isConsultantRole}
            >
              <option value="">Select Professional Level</option>
              {profLevels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            {!isConsultantRole && errors.profLevel && <ErrorState msg="Which professional level?" />}
          </div>
       
        </div>

        <div className="flex justify-center align-center">
          <button className="btn btn-soft btn-accent w-1/3 mt-4" onClick={onSubmit}>
            {ccResponse ? "Reset" : "Calculate"}
          </button>
        </div>

        {cardLoading && (
          <>
          <div className="flex flex-col items-center justify-center mt-2 w-full">
            <div className="card w-full bg-base-200 shadow-lg flex items-center justify-center py-12">
              <span className="loading loading-infinity loading-lg text-secondary"></span>
            </div>
          </div>
            <ReloResults
              percentage={0}
              city={targetCity}
              position={position}
              salary={annualSalary}
              increaseAmount={false}
              noData
            />
            </>)}
            {hasCostData && (
              <ReloTable
                monthlySalary={monthlySalary}
                monthlyTrans={metrics?.costOfLiving?.monthlyTransportation}
                monthlyUtilities={metrics?.costOfLiving?.monthlyUtilities}
                oneBRApt={metrics?.costOfLiving?.rentOneBedroom}
                mortgIntRate={metrics?.costOfLiving?.mortgageInterestRate}
              />
            )}
          </div>
      </div>
  )
}

export default ReloMain
