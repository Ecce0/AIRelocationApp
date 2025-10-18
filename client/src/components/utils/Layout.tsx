import { Outlet } from "react-router-dom"
import GlobalNavBar from "./GlobalNavBar.tsx"
import Footer from "./GlobalFooter.tsx"

const Layout = () => {
  return (
    <div className="py-3 border bg-primary min-h-screen text-secondary font-playfair">
    <div className="flex flex-col bg-secondary ">
     {/*<div className="bg-primary border-2 border-red-950 text-2xl text-cyan-500">Test</div>
      <div className="bg-primary border-2 border-red-950 text-2xl text-cyan-500">Test</div> */}

      {/* <GlobalNavBar />
      <main className="flex-grow container mx-auto px-6 py-10">
        <Outlet />
      </main>
      <Footer /> */}
       </div>
      </div>
  )
}

export default Layout
