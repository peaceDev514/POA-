
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo and full business name */}
        <a
          href="#home"
          className="navbar-logo"
          onClick={closeMenu}
          aria-label="POA Shoes & Co. Home"
        >
          <img
            src="/poa-shoes-logo.png"
            alt="POA Shoes & Co. logo"
            className="navbar-logo-image"
          />

          <span className="navbar-brand-name">
            POA Shoes &amp; Co.
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#collection">Collection</a>
          <a href="#about">About</a>
          <a href="#craft">Craftsmanship</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="navbar-cta">
          Order Now
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#collection" onClick={closeMenu}>Collection</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#craft" onClick={closeMenu}>Craftsmanship</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>

        <a
          href="#contact"
          className="mobile-cta"
          onClick={closeMenu}
        >
          Order Now
        </a>
      </nav>
    </header>
  );
};

export default Navbar;

