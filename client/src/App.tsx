import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Navbar from './components/utils/Navbar'
import Footer from './components/utils/Footer'
import Raleigh from './components/pages/Raleigh'
import WashingtonDC from './components/pages/WashingtonDC'
import Ai from './components/pages/Ai'
import Resume from './components/pages/Resume'
import Contact from './components/pages/Contact'
import Layout from './components/utils/Layout'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/raleigh" element={<Raleigh />} />
          <Route path="/washington-dc" element={<WashingtonDC />} />
          <Route path="/ai" element={<Ai />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </BrowserRouter >
  )
}
export default App
