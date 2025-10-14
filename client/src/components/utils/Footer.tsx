import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <>
          <div>E. Collier copyright 2025</div>
          <div>
            <li>
                <a href="">
                    <FaGithub />
                </a>
            </li>
            <li>
                <a href="">
                    <FaLinkedin />
                </a>
            </li>
          </div>
        </>
    )
}

export default Footer;