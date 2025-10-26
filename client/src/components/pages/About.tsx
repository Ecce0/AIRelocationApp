import { useLocation } from "react-router-dom"
import UniversalCard from "../utils/UniversalCard"
import home2 from "../../assets/home2.jpg"

interface AboutProps {
  nav: string
  title: string
  description: React.ReactNode 
}

const About = () => {
  const { pathname } = useLocation()

  const aboutPages: AboutProps[] = [
    {
      nav: "/about",
      title: "About tRCA",
      description: (
        <>
          The Relocation-Calculation App (tRCA) was built to simplify one of the hardest
          questions in career planning — “Can I afford to live there?”
          As a cloud engineer preparing for a move to the DMV, I wanted
          a clear, data-driven way to compare salaries and living costs
          across cities. The app transforms that research process into
          clarity and confidence.
        </>
      ),
    },
    {
      nav: "/about/how-it-works",
      title: "How Does It Work?",
      description: (
        <>
          tRCA pulls live salary data from{" "}
          <a
            href="https://www.openwebninja.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            OpenWebNinja
          </a>{" "}
          and cost-of-living data from{" "}
          <a
            href="https://zylalabs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Zyla Labs
          </a>
          . It maps eight cloud roles — Cloud Engineer,
          Cloud Developer, SRE, Cloud Architect, DevOps Engineer, Cloud Security Engineer, Cloud Solutions Architect,
          Cloud Consultant — across five professional levels modeled
          after{" "}
          <a
            href="https://www.tealhq.com/job-titles/cloud-developer"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Teal
          </a>{" "}
          benchmarks. Users can compare cities, adjust experience levels,
          and see metrics rendered in real time using mathematical computing.
        </>
      ),
    },
    {
      nav: '/',
      title: 'Home',
      description: null
    }
  ]

  const currentPage = aboutPages.find((page) => page.nav === pathname)

  return (
    <UniversalCard
      title={currentPage?.title || "About tRA"}
      description={currentPage?.description || "Information not available."}
      imageSrc={home2}
      links={aboutPages.map(({ title, nav }) => ({ title, nav }))}
    />
  )
}

export default About
