import React from "react"
import vaca from "../../assets/vaca.jpg"
import houseDemo from '../../assets/houseDemo.jpg'
import UniversalCard from "./UniversalCard"

interface FallbackProps {
  error?: Error
}

const TechnicalError: React.FC<FallbackProps> = ({ error }) => {
  const links = [
    { title: "Home", nav: "/" },
    { title: "About tRA", nav: "/about" },
    { title: "Raleigh, NC", nav: "/raleigh" },
    { title: "Washington, DC", nav: "/washington-dc" },
    { title: "Relocation Calculation", nav: "/relo" },
    { title: "Resume", nav: "/resume" },
  ]

  const message = error
    ? "Something went very wrong here. Please refresh or return to the homepage."
    : `Looks like you've gotten lost. Yes, I would love to go on vacation too,
       but right now, let's focus on getting to the next city in our
       Cloud Engineering career.`

  return (
      <UniversalCard
        imageSrc={error ? houseDemo : vaca}
        title={error ? "Technical Error" : "Uh Oh"}
        description={message}
        links={links}
      />
  )
}

export default TechnicalError
