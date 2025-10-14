import { Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/Context"
import Layout from "./components/utils/Layout"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Raleigh from "./components/pages/Raleigh"
import WashingtonDC from "./components/pages/WashingtonDC"


const routes = [
  {
    path: "/",
    element: <Home />,
  },
  { path: "/about",
    element: <About />
  },
  {
    path: "/raleigh/*" ,
    element: <Raleigh />
  },
  {
    path: "/washington-dc/*",
    element: <WashingtonDC />
  }
]

const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          {routes.map((route, index) => (
            <Route 
               key={index} 
                path={route.path || `${route.path}/*`} 
                element={route.element} />
          ))}
        </Route>
      </Routes>
    </AppProvider>
  )
}

export default App
