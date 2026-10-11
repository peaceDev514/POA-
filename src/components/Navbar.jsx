
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { scrollToSection } from "./scrollToSection";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      scrollToSection(location.hash.slice(1));
    }
  }, [location.pathname, location.hash]);

  const goToSection = (id) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSection(id));
      });
      return;
    }

    window.history.replaceState(null, "", `/#${id}`);
    scrollToSection(id);
  };

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
          <a href="/#about" onClick={(e) => {
            e.preventDefault();
            goToSection("about");
          }}>About</a>
          <a href="/#craft" onClick={(e) => {
            e.preventDefault();
            goToSection("craft");
          }}>Craftsmanship</a>
          <a href="/#contact" onClick={(e) => {
            e.preventDefault();
            goToSection("contact");
          }}>Contact</a>
        </nav>

        <div className="navbar-actions">
          <Link
            to="/cart"
            className="navbar-cart"
            onClick={closeMenu}
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <ShoppingBag size={21} />
            <span className="navbar-cart-label">Cart</span>
            <span className="navbar-cart-count">{cartCount}</span>
          </Link>

          <a
            href="/#contact"
            className="navbar-cta"
            onClick={(e) => {
              e.preventDefault();
              goToSection("contact");
            }}
          >
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
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/shop" onClick={closeMenu}>Collection</Link>

        <a href="/#about" onClick={(e) => {
          e.preventDefault();
          goToSection("about");
        }}>About</a>

        <a href="/#craft" onClick={(e) => {
          e.preventDefault();
          goToSection("craft");
        }}>Craftsmanship</a>

        <a href="/#contact" onClick={(e) => {
          e.preventDefault();
          goToSection("contact");
        }}>Contact</a>

        <Link
          to="/cart"
          className="mobile-cart-link"
          onClick={closeMenu}
        >
          <ShoppingBag size={19} />
          Cart ({cartCount})
        </Link>

        <a
          href="/#contact"
          className="mobile-cta"
          onClick={(e) => {
            e.preventDefault();
            goToSection("contact");
          }}
        >
          Order Now
        </a>
      </nav>
    </header>
  );
};

export default Navbar;

