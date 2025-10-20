import { FaGithub, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-transparent text-secondary m-2 p-2 items-center">
      <aside className="grid-flow-col items-center">
        <p className="text-base text-xs">
          By <span className="text-accent">E. Collier</span>  Copyright © 2025 – All rights reserved
        </p>
      </aside>

      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-lg">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            transition-all
            duration-300
            rounded-full
            p-2
            text-error
            hover:bg-primary
            hover:text-secondary
            hover:drop-shadow-[0_0_5px_#000]
          "
          style={{ filter: 'drop-shadow(0 0 2px #000)' }}
        >
          <FaGithub />
        </a>

        <a
          href="https://linkedin.com/"
          target="_blank" 
          rel="noopener noreferrer"
          className="
            transition-all
            duration-300
            rounded-full
            p-2
            text-success
            hover:bg-primary
            hover:text-secondary
            hover:drop-shadow-[0_0_5px_#000]
          "
          style={{ filter: 'drop-shadow(0 0 2px #000)' }}
        >
          <FaLinkedin />
        </a>
      </nav>
    </footer>
  )
}

export default Footer
