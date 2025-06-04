"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const NavBar = ({ searchQuery, setSearchQuery }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BuyEasyShop
        </Link>

        <div className="search-container desktop-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`menu-container ${menuOpen ? "open" : ""}`}>
          <div className="mobile-menu">
            <div className="search-container mobile-search">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <Link to="/about" className="menu-item" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/contact" className="menu-item" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
