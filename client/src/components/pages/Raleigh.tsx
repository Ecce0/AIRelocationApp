import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAppContext } from "../../context/Context"
import UniversalCard from "../utils/UniversalCard"
import rdu from "../../assets/rdu.jpg"

interface RaleighProps {
  nav: string
  title: string
  description: string
}

const Raleigh = () => {
  const { getSalary, getCostOfLiving } = useAppContext()
  const { pathname } = useLocation()

  const pageLocationInfo: RaleighProps[] = [
    {
      nav: "/raleigh",
      title: "Raleigh, NC",
      description: `I’ve lived in Sanford, Greensboro, Charlotte, and now Raleigh for a total of 13 years...`,
    },
    {
      nav: "/raleigh/taxes",
      title: "Taxes",
      description: `Raleigh, NC has a relatively moderate tax burden compared to other major cities...`,
    },
    {
      nav: "/raleigh/job-market",
      title: "Job Market",
      description: `Raleigh, NC boasts a robust and diverse job market, driven by its strong presence...`,
    },
    {
      nav: "/raleigh/salary",
      title: "Salary",
      description: `The average salary in Raleigh, NC is approximately $65,000 per year...`,
    },
    {
      nav: "/raleigh/col",
      title: "Cost of Living",
      description: `Raleigh, NC has a cost of living that is slightly above the national average...`,
    },
  ]

  const currentPage = pageLocationInfo.find((page) => page.nav === pathname)

  useEffect(() => {
    getSalary("Raleigh, NC")
    getCostOfLiving("Raleigh, NC")
  }, [])

  return (
    <UniversalCard
      imageSrc={rdu}
      title={currentPage?.title || "Raleigh, NC"}
      description={currentPage?.description || "Information not available."}
      links={pageLocationInfo.map(({ title, nav }) => ({ title, nav }))}
    />
  )
}

export default Raleigh
