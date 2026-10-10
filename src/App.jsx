import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import "./App.css";

function Footer() {
  return (
    <footer className="site-footer">
      <a href="/" className="footer-brand">
        POA<span>SHOES</span>
      </a>

      <p>Find your style. Own every step.</p>

      <a
        className="footer-whatsapp"
        href="https://wa.me/2349022276084"
        target="_blank"
        rel="noreferrer"
      >
        Contact us on WhatsApp ↗
      </a>

      <small>© {new Date().getFullYear()} POA SHOES</small>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            success: {
              style: {
                background: "#166534",
                color: "#ffffff",
              },
              iconTheme: {
                primary: "#ffffff",
                secondary: "#166534",
              },
            },
          }}
        />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
