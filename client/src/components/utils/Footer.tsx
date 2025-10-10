import { FaGithub, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-primary text-accent-primary items-center p-4">
  <aside className="grid-flow-col items-center">
        <p className="font-semibold tracking-wide">
          © 2025 Relo.AI.App — Built by Erica Collier
        </p>
      </aside>

      <nav className="grid-flow-col gap-6 md:place-self-center md:justify-self-end">
        <a
          href="https://github.com/fake-link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base-content hover:text-primary transition-colors"
        >
          <FaGithub className="h-6 w-6" />
        </a>
        <a
          href="https://linkedin.com/in/fake-link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base-content hover:text-primary transition-colors"
        >
          <FaLinkedin className="h-6 w-6" />
        </a>
      </nav>
    </footer>
  )
}

export default Footer
