import React from "react"
import { Link } from "react-router-dom"

interface UCProps {
  title: string
  description: string
  links: { title: string; nav: string }[]
  imageSrc: string
}

const UniversalCard: React.FC<UCProps> = ({ imageSrc, title, description, links }) => {
  return (
    <div className="relative w-full min-h-[70vh] flex justify-center items-center overflow-visible">
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover contrast-75"
      />
      <div className="relative z-20 w-11/12 md:w-10/12 lg:w-8/12 h-auto bg-primary/75 backdrop-blur-xs rounded-md p-8 font-playfair text-secondary grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-md leading-relaxed max-h-[45vh] overflow-y-auto pr-2">
            {description}
          </p>
        </div>
        <div className="col-span-1 flex flex-col justify-start">
          <ul className="space-y-3 text-lg font-bold italic border-y-2 border-secondary py-4">
            {links?.map((link, key) => (
              <li key={key}>
                <Link to={link.nav}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UniversalCard
