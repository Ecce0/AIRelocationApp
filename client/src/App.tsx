import { Routes, Route } from "react-router-dom"
import Layout from "./components/utils/Layout"
import Home from "./components/pages/Home"
import Raleigh from "./components/pages/Raleigh"
import WashingtonDC from "./components/pages/WashingtonDC"
import Ai from "./components/pages/Ai"
import Contact from "./components/pages/Contact"
import Resume from "./components/pages/Resume"

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/raleigh" element={<Raleigh />} />
        <Route path="/washingtondc" element={<WashingtonDC />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Resume" element={<Resume />} />
      </Route>
    </Routes>
  )
}

export default App
