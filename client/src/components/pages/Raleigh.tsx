import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAppContext } from "../../context/Context"
import UniversalCard from "../utils/UniversalCard"
import CityCard from "../utils/UniversalCard"
import rdu from '../../assets/rdu.jpg'

interface RaleighProps {
  loc: string
  description: string
  header: string
}

const Raleigh = () => {
  const { salaryData, colData, getSalary, getCostOfLiving } = useAppContext()
  const { pathname } = useLocation()

  const pageLocationInfo = [
    {
      loc: "/raleigh",
      header: "",
      description: `I’ve lived in Sanford, Greensboro, Charlotte, and now Raleigh for a total of 13 years. It’s a beautiful state, and I’d even go as far as to call it the California of the East Coast. North Carolina is growing rapidly—its infrastructure, economy, and population are all thriving—and there’s something here for everyone, no matter their walk of life. My family’s roots run deep in central North Carolina, tracing back to the 1700s, and we suspect our lineage connects to the Catawba or ancient Aniyunwiya tribes.
       Ironically, though, I’ve never truly felt home here. I’ve given it my best, but something in me has always felt called elsewhere. Still, this state has shaped me in the best ways—grounded, optimistic, and grateful. Leaving will be bittersweet, but I’ll always carry with me the hospitality, resilience, and calm that North Carolina instilled in me.`
    },
    {
      loc: "/raleigh/taxes",
      header: "Taxes",
      description: `Raleigh, NC has a relatively moderate tax burden compared to other major cities in the United States. The state of North Carolina imposes a flat income tax rate of 5.25% on all taxable income, which is lower than the national average. Additionally, Raleigh has a local sales tax rate of 2.25%, bringing the total sales tax rate to 7.25%. Property taxes in Raleigh are also reasonable, with an average effective property tax rate of around 0.85%. Overall, Raleigh's tax structure is designed to be business-friendly and attractive to residents, making it a favorable location for both individuals and businesses looking to minimize their tax liabilities.`
    },
    {
      loc: "/raleigh/job-market",
      header: "Job Market",
      description: `Raleigh, NC boasts a robust and diverse job market, driven by its strong presence in technology, healthcare, education, and finance sectors. The city is part of the Research Triangle, which includes Durham and Chapel Hill, and is home to numerous tech companies, startups, and research institutions. Major employers in the area include IBM, Cisco Systems, and North Carolina State University. Additionally, Raleigh has a growing healthcare industry with several hospitals and medical research facilities. The city's low unemployment rate and steady job growth make it an attractive destination for professionals seeking career opportunities in a dynamic and expanding market.`
    },
    {
      loc: "/raleigh/salary",
      header: "Salary",
      description: `The average salary in Raleigh, NC is approximately $65,000 per year. However, salaries can vary significantly based on factors such as industry, experience level, and job role. For instance, professionals in the technology and healthcare sectors may earn higher salaries compared to those in retail or service industries. Additionally, the cost of living in Raleigh is relatively moderate, which can impact overall purchasing power. It's important for individuals considering a move to Raleigh to research specific salary ranges within their field to ensure financial stability in this competitive market.`
    },
    {
      loc: "/raleigh/col",
      header: "Cost of Living",
      description: `Raleigh, NC has a cost of living that is slightly above the national average but remains affordable compared to other major cities in the United States. Housing is the most significant expense, with median home prices and rental rates that are reasonable for the area. Other costs, such as groceries, transportation, and healthcare, are also relatively affordable. The city's vibrant culture, amenities, and quality of life contribute to its appeal while maintaining a cost structure that is manageable for residents. Overall, Raleigh offers a balanced lifestyle with access to urban conveniences without the high expenses associated with larger metropolitan areas.`
    }
  ] as RaleighProps[]

  useEffect(() => {
    getSalary("Raleigh, NC")
    getCostOfLiving("Raleigh, NC")
  }, [])


  return (
    <>
    <UniversalCard imageSrc={rdu}>
      {/* {pageLocationInfo.map((page, key) => (
        
        <CityCard
          key={key}
          cityLinks={page.loc}
          cityHeader={page.header}
          descriptionBox={pathname === page.loc && `${page.description}`}
        /> 
        
      ))} */}
      </UniversalCard>
    </>
  )
}

export default Raleigh
