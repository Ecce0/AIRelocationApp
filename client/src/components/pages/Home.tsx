import UniversalCard from "../utils/UniversalCard"
import home3 from "../../assets/home3.jpg"

const links = [
  { title: "About tRA", nav: "/about" },
  { title: "Raleigh, NC", nav: "/raleigh" },
  { title: "Washington, DC", nav: "/washington-dc" },
  { title: "Relocation + AI", nav: "/ai" },
  { title: "Resume", nav: "/resume" }
]

const Home = () => {
  return (
    <UniversalCard
      imageSrc={home3}
      title="The Relocation App"
      description="An AI assistance app created for transients, nomads, and wanderers who seek to transition from one U.S. city to another."
      links={links}
    />
  )
}

export default Home
