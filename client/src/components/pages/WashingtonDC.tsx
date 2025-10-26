import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAppContext } from "../../context/Context"
import UniversalCard from "../utils/UniversalCard"
import dc from "../../assets/dc.jpg"

interface DCProps {
  nav: string
  title: string
  description: string | null
}

const WashingtonDC = () => {
  const { getSalary, getCostOfLiving } = useAppContext()
  const { pathname } = useLocation()

  const pageLocationInfo: DCProps[] = [
    {
      nav: "/washington-dc",
      title: "Washington, DC",
      description: `Washington, DC is where ambition meets purpose. The city’s energy blends history, culture, and innovation in a way that constantly inspires growth. From world-class museums to tech conferences and global organizations, DC offers unmatched opportunities for connection and impact. Every visit feels like a return to where my drive and vision belong.`,
    },
    {
      nav: "/washington-dc/taxes",
      title: "Taxes",
      description: `DC’s tax system is progressive, ranging from roughly 4% to 10.75%, with moderate property and sales taxes compared to other major metros. While residents pay both city and federal taxes, overall rates remain manageable for most professionals. Balanced taxation supports excellent city services, transit, and infrastructure — essential to DC’s thriving urban environment.`,
    },
    {
      nav: "/washington-dc/job-market",
      title: "Job Market",
      description: `DC’s job market is one of the most dynamic in the country, offering roles across government, policy, consulting, and technology. Cloud, cybersecurity, and data-focused positions are expanding rapidly as federal agencies modernize and startups grow. The city attracts professionals who value purpose-driven work and opportunities to make national and global impact.`,
    },
    {
      nav: "/washington-dc/salary",
      title: "Salary",
      description: `Average professional salaries in Washington, DC range from $95K to $140K depending on industry and expertise. Cloud and DevOps engineers often see top-tier compensation due to increasing demand for secure, scalable systems. While competitive, these salaries reflect the city’s high-performance culture and the value placed on technical excellence.`,
    },
    {
      nav: "/washington-dc/col",
      title: "Cost of Living",
      description: `Washington, DC’s cost of living is among the highest in the country, driven largely by housing and daily expenses. To live comfortably, income levels need to align with the city’s premium pricing across rent, transit, and services. For professionals in tech or federal sectors, strong compensation packages make the tradeoff worthwhile — ensuring access to DC’s vibrant lifestyle and career opportunities.`,
    },
    {
      nav: '/',
      title: 'Home',
      description: null
    }
  ]

  useEffect(() => {
    getSalary("Washington, DC", "Cloud Consultant")
    getCostOfLiving("Washington, DC")
  }, [])

  const currentPage = pageLocationInfo.find((page) => page.nav === pathname)

  return (
    <UniversalCard
      imageSrc={dc}
      title={currentPage?.title || "Washington, DC"}
      description={currentPage?.description || "Information not available."}
      links={pageLocationInfo.map(({ title, nav }) => ({ title, nav }))}
    />
  )
}

export default WashingtonDC
