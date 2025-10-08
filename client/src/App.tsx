import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/utils/Navbar";
import Footer from "./components/utils/Footer";
import Raleigh from "./components/Raleigh";
import WashingtonDC from "./components/WashingtonDC";
import Ai from "./components/Ai";
import Resume from "./components/Resume";
import Contact from "./components/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow">
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
    </BrowserRouter>
  );
}
export default App;