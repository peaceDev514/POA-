import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
          aria-label="POA Shoes & Co. Home"
        >
          <img
            src="/images/shoes/poa-shoes-logo.jpg"
            alt="POA Shoes & Co. logo"
            className="navbar-logo-image"
          />

          <span className="navbar-brand-name">
            POA Shoes &amp; Co.
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/shop">Collection</Link>
          <Link to="/#about">About</Link>
          <Link to="/#craft">Craftsmanship</Link>
          <Link to="/#contact">Contact</Link>
        </nav>

        <div className="navbar-actions">
          <Link
            to="/cart"
            className="navbar-cart"
            onClick={closeMenu}
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <ShoppingBag size={21} />

            <span className="navbar-cart-label">
              Cart
            </span>

            <span className="navbar-cart-count">
              {cartCount}
            </span>
          </Link>

          {/* Desktop Order Now */}
          <a href="/#contact" className="navbar-cta">
            Order Now
          </a>
        </div>

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

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/shop" onClick={closeMenu}>
          Collection
        </Link>

        <Link to="/#about" onClick={closeMenu}>
          About
        </Link>

        <Link to="/#craft" onClick={closeMenu}>
          Craftsmanship
        </Link>

        <Link to="/#contact" onClick={closeMenu}>
          Contact
        </Link>

        <Link
          to="/cart"
          className="mobile-cart-link"
          onClick={closeMenu}
        >
          <ShoppingBag size={19} />
          Cart ({cartCount})
        </Link>

        {/* Mobile Order Now */}
        <a
          href="/#contact"
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
