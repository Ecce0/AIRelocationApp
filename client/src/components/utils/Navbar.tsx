import React from 'react'
import { Link } from 'react-router-dom'

const navRoutes = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'RDU', path: '/raleigh' },
    { name: 'DMV', path: '/washington-dc'},
    { name: 'AI', path: '/ai' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' }
    

]

const Navbar = () => {
    return (
        <>
         <div>The Relo AI App</div>
         <div>
            <li>
                <div>
                    {navRoutes.map((route) => (
                        <Link key={route.name} to={route.path} >
                            {route.name}
                        </Link>
                    ))}
                </div>
            </li>
         </div>
        </>
    )
}

export default Navbar