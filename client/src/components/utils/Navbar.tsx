import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 text-base-content shadow-lg border-b border-base-300 m-0 p-0 fixed top-0 left-0 w-full z-50">
      <div className="flex-1 px-4">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-l font-bold text-primary-content"
        >
          Relo.AI.App
        </Link>
      </div>

      <div className="flex-none">
        <ul className="flex items-center justify-center gap-3 px-4">
          <li>
            <Link
              to="/"
              className="btn btn-sm btn-soft btn-circle btn-neutral px-3 py-2"
            >
              H
            </Link>
          </li>
          <li>
            <Link
              to="/raleigh"
              className="btn btn-sm btn-soft btn-circle btn-error px-3 py-2"
            >
              RDU
            </Link>
          </li>
          <li>
            <Link
              to="/washingtondc"
              className="btn btn-sm btn-soft btn-circle btn-accent px-3 py-2"
            >
              DCA
            </Link>
          </li>
          <li>
            <Link
              to="/ai"
              className="btn btn-sm btn-soft btn-circle btn-info px-3 py-2"
            >
              AI
            </Link>
          </li>
          <li>
            <Link
              to="/resume"
              className="btn btn-sm btn-soft btn-circle btn-success px-3 py-2"
            >
              R
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="btn btn-sm btn-soft btn-circle btn-warning px-3 py-2"
            >
              @
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
