import UniversalCard from "../utils/UniversalCard"
import home2 from '../../assets/home2.jpg'

const links = [
  { title: "Home", nav: "/" },
  { title: "Raleigh, NC", nav: "/raleigh" },
  { title: "Washington, DC", nav: "/washington-dc" },
  { title: "Relocation + AI", nav: "/relocation-ai" },
  { title: "Resume", nav: "/resume" },
  { title: "Contact", nav: "/contact" },
]

const desc = `I currently reside in Raleigh, North Carolina, 
but I’ve always envisioned building a life in the DMV — the Washington, 
D.C., Maryland, and Virginia region. Every visit brings me a sense of 
belonging, purpose, and home. As an AWS Cloud Engineer with five years of 
experience, I’m now ready to make that transition — I just need the right 
opportunity that aligns with both career growth and cost of living.
I created the Relocation AI App to simplify the complex process of comparing 
salaries and living expenses between cities. Understanding what it truly takes 
to live comfortably shouldn’t be confusing. The app uses live data from multiple 
sources — including OpenWebNinja for salary insights and Zyla Labs for 
cost-of-living data — to help users make informed relocation decisions.
The Relocation AI App provides salary comparisons for eight core 
cloud roles — such as Cloud Developer, Cloud Engineer, Cloud Architect, 
DevOps Engineer, Site Reliability Engineer (SRE), Cloud Security Engineer, 
Cloud Solutions Architect, and Cloud Consultant — across five professional 
levels, from junior through executive leadership. These roles and definitions 
are modeled in part after the industry insights published by Teal.
This project combines AI, cloud architecture, and real-world data to transform 
the complexity of relocation into clarity — empowering others, like me, to 
pursue their goals confidently and strategically.`

const About = () => {
    return (
        <>
         <UniversalCard 
           title='About tRA'
           description={desc}
           imageSrc={home2}
           links={links}
         />
        </>
    )
}
export default About