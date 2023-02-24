import React from 'react'
import { Link } from 'react-router-dom';

//Style CSS
import "../../css/Footer.css";

export const Footer = () => {
    return (
        <div className="footerContainer">
            <p className="descripcion">App maded by <b>David Arcos Melgarejo</b>,<Link to={"https://github.com/DavidRT12RT"} target="_blank">Github</Link></p>
        </div>
    )
}
