import { Link, useLocation } from "react-router-dom"
import UniversalCard from "../utils/UniversalCard"
import skyIsTheLimit from "../../assets/skyIsTheLimit.jpg"

const ResumeHeader = () => (
  <div>
    <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
    <p>Email: ecollier871@outlook.com</p>
    <p>
      <Link to="https://linkedin.com/in/ericacollier" target="_blank" rel="noopener noreferrer" className="link">
        LinkedIn
      </Link>
    </p>
    <p>
      <Link to="https://github.com/Ecce0" target="_blank" rel="noopener noreferrer" className="link">
        Portfolio
      </Link>
    </p>
  </div>
)

const ResumeSection = ({ title, date, bullets }: { title: string; date: string; bullets: string[] }) => (
  <div className="mb-4">
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-sm italic mb-2">{date}</p>
    <ul className="list-disc ml-6 space-y-1">
      {bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
)

const CertificationsList = ({ items }: { items: string[] }) => (
  <ul className="list-disc ml-6 space-y-1">
    {items.map((c, i) => (
      <li key={i}>{c}</li>
    ))}
  </ul>
)

const Resume = () => {
  const { pathname } = useLocation()

  const sections = [
    { nav: "/resume", title: "Resume", description: <ResumeHeader /> },
    {
      nav: "/resume/objective",
      title: "Objective",
      description: `As a forward-thinking Cloud Engineer, my goal is to strengthen my expertise in serverless and DevOps practices while contributing to high-impact cloud platforms. I design scalable, cost-efficient systems. My goal is to eventually progress into a solutions architecture role bridging innovation and business goals.`,
    },
    {
      nav: "/resume/current-position",
      title: "Current Position",
      description: (
        <ResumeSection
          title="AWS Cloud Engineer"
          date="Jan 2025 – Present"
          bullets={[
            "Design and maintain secure, scalable AWS infrastructures using Lambda, API Gateway, VPC networking, etc.",
            "Implement observability via CloudWatch, Dynatrace, and Kibana dashboards.",
            "Build proxy APIs for vendor access to internal systems with OAuth 2.0 and IAM-based security controls.",
            "Automate infrastructure using Terraform to ensure environment consistency and compliance.",
          ]}
        />
      ) as unknown as string,
    },
    {
      nav: "/resume/positions-held",
      title: "Positions Held",
      description: (
        <ResumeSection
          title="Software Application Engineer"
          date="Jan 2021 – Dec 2024"
          bullets={[
            "Developed React and Node.js production applications for claims automation and reporting.",
            "Collaborated with DevOps and QA teams to improve CI/CD delivery and post release monitoring.",
            "Created automated Jest test suites increasing code coverage and release confidence.",
            "Enhanced UI performance and accessibility through targeted refactors and code reviews.",
          ]}
        />
      ) as unknown as string,
    },
    {
      nav: "/resume/certifications",
      title: "Certifications",
      description: (
        <CertificationsList
          items={[
            "AWS Cloud Practitioner",
            "Salesforce AI Associate",
            "Salesforce Administrator",
            "Salesforce Agentforce"
          ]}
        />
      ) as unknown as string,
    },
    {
      nav: "/resume/education",
      title: "Education",
      description: `University of North Carolina at Greensboro — Bachelor of Science in Business Administration, August 2016`,
    },
    {
      nav: '/',
      title: 'Home',
      description: null
    }
  ]

  const current = sections.find((s) => s.nav === pathname)

  return (
    <UniversalCard
      imageSrc={skyIsTheLimit}
      title={current?.title || "Resume"}
      description={current?.description || "Information not available."}
      links={sections.map(({ title, nav }) => ({ title, nav }))}
    />
  )
}

export default Resume
