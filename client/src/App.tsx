import { Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/Context"
import Layout from "./components/utils/Layout"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Raleigh from "./components/pages/Raleigh"
import WashingtonDC from "./components/pages/WashingtonDC"
import AI from "./components/pages/AI"
import Resume from "./components/pages/Resume"

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/raleigh/*", element: <Raleigh /> },
  { path: "/washington-dc/*", element: <WashingtonDC /> },
  { path: "/ai", element: <AI /> },
  { path: "/resume/*", element: <Resume /> }
]

const App = () => {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </Layout>
    </AppProvider>
  )
}

export default App
