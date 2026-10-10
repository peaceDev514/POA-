import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import "./Cart.css";

const WHATSAPP_NUMBER = "2349022276084";

const formatPrice = (price) =>
  `₦${Number(price).toLocaleString("en-NG")}`;

const initialCustomer = {
  name: "",
  phone: "",
  orderType: "Delivery",
  address: "",
  notes: "",
};

export default function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [customer, setCustomer] = useState(initialCustomer);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateCustomer = (event) => {
    const { name, value } = event.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!customer.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!customer.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (customer.phone.replace(/\D/g, "").length < 7) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (
      customer.orderType === "Delivery" &&
      !customer.address.trim()
    ) {
      nextErrors.address = "Please enter your delivery address.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0 || !validateForm()) return;

    const orderLines = cart
      .map((item, index) => {
        const sizeText = item.size ? ` | Size: ${item.size}` : "";

        return (
          `${index + 1}. ${item.name}${sizeText}\n` +
          `   Qty: ${item.quantity} × ${formatPrice(item.price)} = ` +
          `${formatPrice(item.price * item.quantity)}`
        );
      })
      .join("\n\n");

    const message = [
      "Hello POA SHOES, I would like to place an order.",
      "",
      "ORDER DETAILS",
      orderLines,
      "",
      `Total items: ${cartCount}`,
      `Estimated total: ${formatPrice(cartTotal)}`,
      "",
      "CUSTOMER DETAILS",
      `Name: ${customer.name.trim()}`,
      `Phone: ${customer.phone.trim()}`,
      `Order type: ${customer.orderType}`,
      customer.orderType === "Delivery"
        ? `Delivery address: ${customer.address.trim()}`
        : "",
      customer.notes.trim()
        ? `Order notes: ${customer.notes.trim()}`
        : "",
      "",
      "Please confirm product availability, delivery charges and payment instructions.",
    ]
      .filter((line) => line !== "")
      .join("\n");

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setSubmitted(true);

    const newWindow = window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    if (!newWindow) {
      window.location.href = whatsappUrl;
    }
  };

  return (
    <main className="cart-page">
      <section className="cart-page-hero">
        <div className="cart-page-hero-inner">
          <Link to="/shop" className="cart-back-link">
            <ArrowLeft size={17} /> Continue shopping
          </Link>

          <p className="cart-eyebrow">YOUR POA SELECTION</p>

          <h1>
            Your <em>cart.</em>
          </h1>

          <p>
            Review your selection and share your order with us.
          </p>
        </div>
      </section>

      <section className="cart-layout">
        <div className="cart-products-panel">
          <div className="cart-panel-heading">
            <div>
              <p className="cart-eyebrow">YOUR SELECTION</p>
              <h2>Shopping bag</h2>
            </div>

            <span>
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <ShoppingBag size={32} />
              </div>

              <h3>Your cart is waiting.</h3>

              <p>
                You haven't added any shoes yet. Explore our
                collection and find your next favourite pair.
              </p>

              <Link to="/shop" className="cart-primary-link">
                Explore the collection <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-details">
                    <p>{item.category}</p>
                    <h3>{item.name}</h3>

                    {item.size && (
                      <span className="cart-item-size">
                        Size: {item.size}
                      </span>
                    )}

                    <strong>{formatPrice(item.price)}</strong>

                    <div className="cart-quantity">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={15} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-end">
                    <strong>
                      {formatPrice(item.price * item.quantity)}
                    </strong>

                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <Link to="/shop" className="cart-continue-link">
              <ArrowLeft size={16} /> Add more shoes
            </Link>
          )}
        </div>

        <aside className="checkout-panel">
          <div className="checkout-heading">
            <p className="cart-eyebrow">ALMOST THERE</p>
            <h2>Order details</h2>
            <p>
              Fill in your details so POA SHOES can confirm your order.
            </p>
          </div>

          <div className="checkout-summary">
            <div>
              <span>Items</span>
              <strong>{cartCount}</strong>
            </div>

            <div className="checkout-total">
              <span>Estimated total</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>

            <small>
              Delivery charges and final availability will be
              confirmed by POA SHOES.
            </small>
          </div>

          <form className="checkout-form" onSubmit={placeOrder}>
            <label htmlFor="customer-name">Full name *</label>

            <input
              id="customer-name"
              name="name"
              value={customer.name}
              onChange={updateCustomer}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
            />

            {errors.name && (
              <span className="field-error">{errors.name}</span>
            )}

            <label htmlFor="customer-phone">Phone number *</label>

            <input
              id="customer-phone"
              name="phone"
              type="tel"
              value={customer.phone}
              onChange={updateCustomer}
              placeholder="Your phone number"
              autoComplete="tel"
              required
              aria-invalid={Boolean(errors.phone)}
            />

            {errors.phone && (
              <span className="field-error">{errors.phone}</span>
            )}

            <label htmlFor="order-type">Order method *</label>

            <select
              id="order-type"
              name="orderType"
              value={customer.orderType}
              onChange={updateCustomer}
            >
              <option value="Delivery">Delivery</option>
              <option value="Pickup">Pickup</option>
            </select>

            {customer.orderType === "Delivery" && (
              <>
                <label htmlFor="customer-address">
                  Delivery address *
                </label>

                <textarea
                  id="customer-address"
                  name="address"
                  value={customer.address}
                  onChange={updateCustomer}
                  placeholder="Enter your delivery address"
                  rows={3}
                  required
                  aria-invalid={Boolean(errors.address)}
                />

                {errors.address && (
                  <span className="field-error">
                    {errors.address}
                  </span>
                )}
              </>
            )}

            <label htmlFor="order-notes">
              Additional notes (optional)
            </label>

            <textarea
              id="order-notes"
              name="notes"
              value={customer.notes}
              onChange={updateCustomer}
              placeholder="Any extra details about your order?"
              rows={3}
            />

            <button
              type="submit"
              className="checkout-whatsapp-button"
              disabled={cart.length === 0}
            >
              <MessageCircle size={19} />
              Continue to WhatsApp
              <ArrowRight size={18} />
            </button>

            {submitted && (
              <p className="checkout-status" role="status">
                <CheckCircle2 size={17} />
                WhatsApp should open with your order details.
                Please send the message to place the order.
              </p>
            )}

            <p className="checkout-disclaimer">
              Your order isn't confirmed until you send the WhatsApp
              message and POA SHOES confirms availability and payment.
            </p>
          </form>
        </aside>
      </section>
    </main>
  );
}
