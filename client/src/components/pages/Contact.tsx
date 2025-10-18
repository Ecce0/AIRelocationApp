import React from "react"

const Contact = () => {
  return (
    <div>
      <h1>Contact</h1>
      <p>If you’d like to connect, collaborate, or learn more about my work, feel free to reach out through any of the links below.</p>

      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:ercollie871@outlook.com">ercollie871@outlook.com</a>
        </li>
        <li>
          <strong>GitHub:</strong>{" "}
          <a href="https://github.com/ecce0" target="_blank" rel="noopener noreferrer">
            github.com/ecce0
          </a>
        </li>
        <li>
          <strong>LinkedIn:</strong>{" "}
          <a href="https://linkedin.com/in/ericacollier" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/ericacollier
          </a>
        </li>
        <li>
          <strong>GitHub Portfolio:</strong>{" "}
          <a href="https://ecce0.github.io/portfolio" target="_blank" rel="noopener noreferrer">
            ecce0.github.io/portfolio
          </a>
        </li>
      </ul>

      <p>
        I’m always open to discussing cloud projects, AI development, or relocation tech ideas.
        Let’s connect!
      </p>
    </div>
  )
}

export default Contact
