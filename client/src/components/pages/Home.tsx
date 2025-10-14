import React from 'react';
import { Link } from 'react-router-dom';

const links = [
    {
        title: "About tRA",
        nav: "/about"
    },
    {
        title: "Raleigh, NC",
        nav: "/raleigh"
    },
    { 
        title: "Washington, DC",
        nav: "/washington-dc"
    },
    {
        title: "Relocation + AI",
        nav: "/relocation-ai"
    },
    { 
        title: "Resume",
        nav: "/resume"
    },
    {
        title: "Contact",
        nav: "/contact"
    }
]

const Home = () => {
    return (
        <>
        <div>
    <h1>The Relocation App</h1>
    <h3>By E. Collier</h3>
    <p>An AI assistance app created for transients, nomads, and the wanderer
        who seeks to transition from one US city to
        another. 
    </p></div>
    <div>
        <ul>
            {links.map((link, key) => (
                <li key={key}>
                    <Link to={`${link.nav}`}>{link.title}</Link>
                </li>
            ))}
        </ul>
    </div>
    </>
    )
}

export default Home;