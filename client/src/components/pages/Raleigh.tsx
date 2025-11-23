import { useLocation } from "react-router-dom"
import UniversalCard from "../utils/UniversalCard"
import rdu from "../../assets/rdu.jpg"

interface RaleighProps {
  nav: string
  title: string
  description: string | null
}

const Raleigh = () => {
  const { pathname } = useLocation()

  const pageLocationInfo: RaleighProps[] = [
  {
    nav: "/raleigh",
    title: "Raleigh, NC",
    description: `Raleigh blends Southern charm with a growing tech economy. After living in several North Carolina cities, I've spent the last few years here experiencing its balance of affordability, opportunity, and community. With proximity to Research Triangle Park, it’s a strong base for cloud and software professionals looking to grow.`,
  },
  {
    nav: "/raleigh/taxes",
    title: "Taxes",
    description: `North Carolina maintains a flat state income tax rate of 4.5%, making Raleigh relatively moderate compared to states with progressive rates. Property taxes remain below the national average, while sales tax stays around 7%, keeping the overall burden predictable for long-term residents.`,
  },
  {
    nav: "/raleigh/job-market",
    title: "Job Market",
    description: `The Raleigh-Durham area continues to expand its cloud, data, and software sectors thanks to major employers like IBM, Red Hat, and SAS. Startups and remote-first roles have added flexibility, making the region competitive with larger metros for cloud engineers and developers.`,
  },
  {
    nav: "/raleigh/salary",
    title: "Salary",
    description: `Average tech salaries in Raleigh range from $90K to $130K depending on role and experience. Cloud and DevOps positions command the highest median range, reflecting steady regional demand and cost-of-living alignment with national averages.`,
  },
  {
    nav: "/raleigh/col",
    title: "Cost of Living",
    description: `Raleigh’s cost of living sits roughly 5% above the U.S. average, driven by rising housing demand. However, utilities, healthcare, and transportation remain affordable, keeping it one of the best value metros for tech professionals transitioning from higher-cost regions.`,
  },
  {
      nav: '/',
      title: 'Home',
      description: null
  }
]


  const currentPage = pageLocationInfo.find((page) => page.nav === pathname)

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
