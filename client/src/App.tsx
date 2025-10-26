import { Routes, Route } from "react-router-dom"
import { ErrorBoundary } from 'react-error-boundary'
import { AppProvider } from "./context/Context"
import Layout from "./components/utils/Layout"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Raleigh from "./components/pages/Raleigh"
import WashingtonDC from "./components/pages/WashingtonDC"
import Relo from "./components/pages/Relo/ReloMain"
import Resume from "./components/pages/Resume"
import TechnicalError from "./components/utils/TechnicalError"

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about/*", element: <About /> },
  { path: "/raleigh/*", element: <Raleigh /> },
  { path: "/washington-dc/*", element: <WashingtonDC /> },
  { path: "/relo-calc", element: <Relo /> },
  { path: "/resume/*", element: <Resume /> }
]

const App = () => {
  return (
    <AppProvider>
      <Layout>
        <ErrorBoundary FallbackComponent={TechnicalError}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<TechnicalError />} />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </AppProvider>
  )
}

export default App
