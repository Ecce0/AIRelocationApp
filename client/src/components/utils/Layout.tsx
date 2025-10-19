import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import type { ReactNode } from "react"

interface LayoutProps {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
   <div className="bg-primary min-h-screen flex flex-col justify-between font-code">
      <div className="w-full flex justify-center items-start">
        <Navbar />
      </div>

      <main className="flex-grow flex justify-center items-center my-2 mx-26">
        {children}
      </main>

      <div className="w-full flex justify-center items-end">
        <Footer />
      </div>
    </div>
  )
}

export default Layout
