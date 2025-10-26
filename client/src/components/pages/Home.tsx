import UniversalCard from "../utils/UniversalCard"
import home3 from "../../assets/home3.jpg"

const links = [
  { title: "About tRCA", nav: "/about" },
  { title: "Raleigh, NC", nav: "/raleigh" },
  { title: "Washington, DC", nav: "/washington-dc" },
  { title: "Relocation Calculation", nav: "/relo-calc" },
  { title: "Resume", nav: "/resume" }
]

const Home = () => {
  return (
    <UniversalCard
      imageSrc={home3}
      title="The Relocation App"
      description="A Cloud Computing assistance app created for transients, nomads, and wanderers who seek to transition from one U.S. city to another."
      links={links}
    />
  )
}

export default Home
