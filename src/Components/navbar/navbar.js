import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

export default function Navbar() {
    const Navbar = useRef(null);

    const mb = () => {
        Navbar.current.classList.toggle('toggle');
    }

    let location = useLocation();

    return (
        <>
            <div className="navbar flex">
                <div className="navbar-items">
                    <div id="menubtn" onClick={mb}></div>
                    <div id="logo"></div>
                    <div id="title">iNotebook</div>
                </div>
                <nav className="navbar-items">
                    <ul id="links-1">
                        <i style={{padding: '0 1vw 0 1vw'}} className={location.pathname==="/" ? "active" : ""}><Link to="/">Home</Link></i>
                        <i style={{padding: '0 1vw 0 1vw'}} className={location.pathname==="/about" ? "active" : ""}><Link to="/about">About</Link></i>
                        <i style={{padding: '0 1vw 0 1vw'}} className={location.pathname==="/contact" ? "active" : ""}><Link to="/signin">Signin</Link></i>
                    </ul>
                    <div id="searchbar">
                        Search : <input name="query" type="text" style={{width: '90px', opacity: '100%'}}/>
                    </div>
                </nav>
                <nav id="links-2" className="navbar-items toggle" ref={Navbar}>
                    <i style={{padding: '0 2vw 0 2vw'}} className={location.pathname==="/" ? "active" : ""}><Link to="/">Home</Link></i>
                    <i style={{padding: '0 2vw 0 2vw'}} className={location.pathname==="/about" ? "active" : ""}><Link to="/about">About</Link></i>
                    <i style={{padding: '0 2vw 0 2vw'}} className={location.pathname==="/contact" ? "active" : ""}><Link to="/signin">Signin</Link></i>
                </nav>
            </div>
        </>
    )
}

