import { Link, useLocation } from "react-router-dom"
import skyIsTheLimit from '../../assets/skyIsTheLimit.jpg'
import UniversalCard from "../utils/UniversalCard"

const Resume = () => {
  const { pathname } = useLocation()
  
  const ResumeHeader = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Contact Information</h1>
      <p>Email: ecollier871@outlook.com</p>
      <p>
        <Link
          to="https://linkedin.com/in/ecollier"
          target="_blank" 
          rel="noopener noreferrer"
        

        >
          LinkedIn
        </Link>
      </p>
      <p>
        <Link to="/portfolio"
         target="_blank" 
         rel="noopener noreferrer">
          Portfolio
        </Link>
      </p>
    </div>
  )
}

  const pageLocationInfo = [
  {
    nav: "/resume",
    title: "Resume",
    description: <ResumeHeader /> as unknown as string
  },
  {
    nav: "/resume/objective",
    title: "Objective",
    description: `As a driven and forward-thinking AWS Cloud Engineer, my objective is to expand my expertise in serverless architectures and multi-cloud integration while contributing to a high-impact engineering team. I aim to design scalable, observable, and cost-efficient systems that improve developer velocity and reliability. My long-term goal is to advance into a senior cloud engineering or solutions architecture role where I can bridge technical innovation and business strategy.`,
  },
  {
    nav: "/resume/current-position",
    title: "Current Position",
    description: `I currently serve as an AWS Cloud Engineer, responsible for designing and maintaining secure, scalable, and observable infrastructure. My daily activities include building proxy APIs that allow external users and vendors to access internal company APIs securely. I monitor system health and application performance through AWS CloudWatch, Dynatrace, and Elasticsearch/Kibana to ensure uptime, traceability, and telemetry integrity. I also create and maintain Route53 DNS records, monitor health checks, and work extensively with AWS Lambda, API Gateway, and VPC networking. Using Terraform, I provision and manage cloud resources to maintain infrastructure consistency and compliance across environments.`,
  },
  {
    nav: "/resume/positions-held",
    title: "Positions Held",
    description: `Previously, I worked as a Software Application Engineer, developing production-grade web applications that enabled policyholders to report and manage auto accident claims. My work primarily involved React and Node.js within a CI/CD pipeline. I collaborated closely with QA and DevOps teams to deploy new releases, monitor post-production performance, and implement user feedback. I was also responsible for creating and maintaining automated tests using frameworks such as Jest, improving test coverage and release confidence. This experience helped strengthen my understanding of full-stack workflows, RESTful design, and front-end optimization for user-centric products.`,
  },
  {
    nav: "/resume/certifications",
    title: "Certifications",
    description: `AWS Certified Cloud Practitioner • Salesforce AI Associate • Salesforce Administrator • Salesforce Agentforce • AWS Certified Solutions Architect (Pending)`,
  },
  {
    nav: "/resume/education",
    title: "Education",
    description: `University of North Carolina at Greensboro — Bachelor of Science in Business Administration, August 2016`,
  },
]

const currentPage = pageLocationInfo.find((page) => page.nav === pathname)


  return (
<UniversalCard
    imageSrc={skyIsTheLimit}
    title={currentPage?.title || 'Washington DC'}
    description={currentPage?.description || "Information not available."}
      links={pageLocationInfo.map(({ title, nav }) => ({ title, nav }))} 

      />
  )
}

export default Resume
