import { Footer, FooterCopyright, FooterDivider } from "flowbite-react"
import { FaGithub, FaLinkedin } from "react-icons/fa";

const GlobalFooter = () => {
    return (
       <Footer container className="bg-primary text-secondary font-playfair">
      <div className="w-full text-center">
        <div className="flex justify-center space-x-6 mb-3">
          <a
            href="https://github.com/ecce0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent1"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="https://linkedin.com/in/ericacollier"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent2"
          >
            <FaLinkedin size={22} />
          </a>
        </div>
        <FooterDivider />
        <FooterCopyright
          href="#"
          by="E. Collier"
          year={2025}
        />
      </div>
    </Footer>
    )
}

export default GlobalFooter;