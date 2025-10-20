import { useEffect, type ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"


interface LayoutProps {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
      useEffect(() => {
      const images = [
        "/src/assets/home3.jpg",
        "/src/assets/home2.jpg",
        "/src/assets/rdu.jpg",
        "/src/assets/dc.jpg",
        "/src/assets/robot.jpg",
        "/src/assets/logo.jpg",
        "/src/assets/skyIsTheLimit.jpg"
      ]
      images.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }, [])




  return (
   <div className="bg-primary min-h-screen flex flex-col justify-between font-oxanium">
      <div className="w-full flex justify-center items-start">
        <Navbar />
      </div>

      <main className="flex-grow flex justify-center items-center my-2 mx-8">
        {children}
      </main>

      <div className="w-full flex justify-center items-end">
        <Footer />
      </div>
    </div>
  )
}

export default Layout
