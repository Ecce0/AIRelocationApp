import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/raleigh', label: 'Raleigh' },
  { path: '/washington-dc', label: 'Washington DC' },
  { path: '/compare', label: 'Compare' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="flex items-center justify-between bg-black text-white px-6 py-3 shadow-lg">
      <h1 className="text-xl font-bold tracking-wide">Relo.AI.App</h1>
      <ul className="flex space-x-6">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`hover:text-emerald-400 transition ${
                location.pathname === link.path ? 'text-emerald-400' : ''
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
