import { Link } from "react-router-dom"
import {
  FaHome,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRobot,
  FaQuestionCircle,
  FaAddressCard,
} from "react-icons/fa"
import logo from "../../assets/logo.png"

const colors = [
  "text-info",
  "text-success",
  "text-warning",
  "text-error",
  "text-accent",
  "text-warning",
]

const navRoutes = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "About", path: "/about", icon: <FaQuestionCircle /> },
  { name: "RDU", path: "/raleigh", icon: <FaPlaneDeparture /> },
  { name: "DMV", path: "/washington-dc", icon: <FaPlaneArrival /> },
  { name: "AI", path: "/ai", icon: <FaRobot /> },
  { name: "Resume", path: "/resume", icon: <FaAddressCard /> },
]

const Navbar = () => {
  return (
    <div className="navbar bg-transparent text-primary px-4">
      <div className="navbar-start flex items-center gap-2">
        <img src={logo} alt="Relo AI Logo" className="w-12 h-12" />
        <Link to="/" className="text-secondary text-lg">
          The Relo AI App
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 text-3xl">
          {navRoutes.map((route, index) => {
            const color = colors[index % colors.length]
            return (
              <li key={route.name}>
                <Link
                  to={route.path}
                  className={`
  ${color}
  transition-all
  duration-300
  rounded-full
  p-2
  hover:bg-primary
  hover:${color === "text-secondary" ? "text-accent" : "text-secondary"}
  hover:drop-shadow-[0_0_5px_#000]
`}
                  style={{ filter: "drop-shadow(0 0 2px #000)" }}
                >
                  {route.icon}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
