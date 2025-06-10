"use client";

import { useState } from "react";
import Link from "next/link";

interface NavBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ searchQuery, setSearchQuery }) => {


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          BuyEasyShop
        </Link>

        <div className="search ">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="hamburger" >
        <Link href="#footer" className="menu-item">
              About
            </Link>
            <Link href="tel:+998334503084" className="menu-item">
              Contact
            </Link>
        </div>

        
      </div>
    </nav>
  );
};

export default NavBar;
