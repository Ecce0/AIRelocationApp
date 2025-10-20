import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAppContext } from "../../context/Context"
import UniversalCard from "../utils/UniversalCard"
import dc from '../../assets/dc.jpg'

interface DCProps {
  nav: string
  title: string
  description: string
}

const WashingtonDC = () => {
  const { salaryData, colData, getSalary, getCostOfLiving } = useAppContext()
  const { pathname } = useLocation()

  const pageLocationInfo = [
    {
      nav: "/washington-dc",
      title: "",
      description: `This is where I belong! The culture feels like a missing piece of my life’s puzzle—diverse, intellectual, and full of energy. From the Smithsonian museums and rich history to the art, music, and political pulse, Washington, DC has always had my heart. The city’s rhythm is uniquely its own—Go-go music echoing through the streets, the mysterious absence of “J” Street, and the legendary Ben’s Chili Bowl that feels like a rite of passage for anyone new to the area.
      DC inspires ambition. It challenges you to grow while surrounding you with purpose and opportunity. Every visit feels like coming home to a place that’s been waiting for me—vibrant, cultured, and full of promise. It’s more than a destination; it’s the next chapter of my story.`
    },
    {
      nav: "/washington-dc/taxes",
      title: "Taxes",
      description: `Washington, DC has a progressive income tax system with rates ranging from 4% to 10.75%. The city also imposes a sales tax of 6% on most goods and services, with an additional 1% for certain items like restaurant meals and hotel stays. Property taxes in DC are relatively low compared to other major cities, with rates varying based on the property's assessed value and location. Additionally, DC residents are subject to federal taxes, including Social Security and Medicare taxes. Overall, while DC's tax rates are moderate, the city's high cost of living can impact overall affordability for residents.`
    },
    {
      nav: "/washington-dc/job-market",
      title: "Job Market",
      description: `Washington, DC boasts a robust job market driven by its status as the nation's capital. The city is a hub for government agencies, non-profits, international organizations, and lobbying firms, providing ample opportunities in public policy, administration, and advocacy. Additionally, DC has a growing tech sector, with numerous startups and established companies in fields like cybersecurity, software development, and data analysis. The presence of major universities and research institutions also contributes to a dynamic job market. Overall, DC offers diverse career opportunities across various industries, making it an attractive destination for professionals seeking growth and impact.`
    },
    {
      nav: "/washington-dc/salary",
      title: "Salary",
      description: `The average salary in Washington, DC is approximately $85,000 per year. However, salaries can vary significantly based on factors such as industry, experience level, and job role. For instance, professionals in government or tech sectors may earn higher salaries compared to those in non-profit or service industries. Additionally, the cost of living in DC is relatively high, which can impact overall purchasing power. It's important for individuals considering a move to DC to research specific salary ranges within their field to ensure financial stability in this competitive market.`
    },
    {
      nav: "/washington-dc/col",
      title: "Cost of Living",
      description: `Washington, DC has a high cost of living compared to the national average. Housing is the most significant expense, with median home prices and rental rates well above the national average. Other costs, such as groceries, transportation, and healthcare, are also higher than average. The city's vibrant culture and amenities contribute to its appeal but also drive up expenses. Residents should budget carefully and consider their income relative to living costs when planning to move to or live in Washington, DC.`
    }
  ] as DCProps[]


  useEffect(() => {
    getSalary("Washington, DC")
    getCostOfLiving("Washington, DC")
  }, [])

const currentPage = pageLocationInfo.find((page) => page.nav === pathname)

  return (
    <UniversalCard
    imageSrc={dc}
    title={currentPage?.title || 'Washington DC'}
    description={currentPage?.description || "Information not available."}
      links={pageLocationInfo.map(({ title, nav }) => ({ title, nav }))} 

      />
  )
}

export default WashingtonDC
