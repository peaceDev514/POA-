import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo" onClick={closeMenu}>
          POA<span>SHOES</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#home">Home</a>
          <a href="#collection">Collection</a>
          <a href="#about">About</a>
          <a href="#craft">Craftsmanship</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Desktop CTA */}
        <a href="#contact" className="navbar-cta">
          Order Now
        </a>

        {/* Mobile Menu Button */}
        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <a href="#home" onClick={closeMenu}>
          Home
        </a>

        <a href="#collection" onClick={closeMenu}>
          Collection
        </a>

        <a href="#about" onClick={closeMenu}>
          About
        </a>

        <a href="#craft" onClick={closeMenu}>
          Craftsmanship
        </a>

        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>

        <a href="#contact" className="mobile-cta" onClick={closeMenu}>
          Order Now
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
