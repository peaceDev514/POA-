import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import "./Home.css";

const categories = [
  {
    name: "Formal Shoes",
    description: "Make every occasion count.",
    image: products.find((p) => p.category === "Formal Shoes")?.image,
  },
  {
    name: "Palms",
    description: "Relaxed style, effortless comfort.",
    image: products.find((p) => p.category === "Palms")?.image,
  },
  {
    name: "Sandals",
    description: "Easy-going style for every day.",
    image: products.find((p) => p.category === "Sandals")?.image,
  },
  {
    name: "Loafers",
    description: "Smart style for every occasion.",
    image: products.find((p) => p.category === "Loafers")?.image,
  },
  {
    name: "Slides",
    description: "Simple comfort for casual days.",
    image: products.find((p) => p.category === "Slides")?.image,
  },
];

const benefits = [
  {
    Icon: ShieldCheck,
    title: "Quality first",
    text: "Footwear selected with attention to detail.",
  },
  {
    Icon: Truck,
    title: "Delivery options",
    text: "Ask us about delivery to your location.",
  },
  {
    Icon: Headphones,
    title: "Personal assistance",
    text: "Get help choosing a size and style.",
  },
];

function ProductCard({ product, onAdd }) {
  const handleAddToCart = () => {
    onAdd(product);
    toast.success("Added to cart successfully!");
  };

  return (
    <article className="poa-product-card">
      <Link
        to={`/shop?search=${encodeURIComponent(product.name)}`}
        className="poa-product-image"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {product.tag && (
          <span className="poa-product-tag">
            {product.tag}
          </span>
        )}

        <span className="poa-product-view">
          View product <ArrowUpRight size={16} />
        </span>
      </Link>

      <div className="poa-product-details">
        <div>
          <p className="poa-product-category">
            {product.category}
          </p>

          <h3>{product.name}</h3>
        </div>

        <span className="poa-price-enquiry">
          Contact for more info
        </span>
      </div>

      <button
        className="poa-product-add"
        type="button"
        onClick={handleAddToCart}
      >
        Add to cart <span>+</span>
      </button>
    </article>
  );
}

export default function Home() {
  const { addToCart } = useCart();

  const featured = products
    .filter((product) => product.featured)
    .slice(0, 5);

  const openWhatsApp = () => {
    const message =
      "Hello POA SHOES, I would like to enquire about your available footwear, prices, sizes, and availability.";

    window.open(
      `https://wa.me/2349022276084?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="poa-home">
      {/* HERO SECTION */}
      <section className="poa-hero" id="home">
        <div className="poa-hero-image">
          <img
            src="/images/shoes/shoe-01.jpg"
            alt="Featured footwear from POA SHOES"
            fetchPriority="high"
          />
        </div>

        <div className="poa-hero-shade" />

        <div className="poa-hero-content">
          <div className="poa-hero-kicker">
            <span className="poa-status-dot" />
            STYLE THAT MOVES WITH YOU
          </div>

          <h1>
            Make every
            <br />
            step <em>count.</em>
          </h1>

          <p className="poa-hero-description">
            Discover footwear that brings together confidence,
            comfort and unmistakable style.
          </p>

          <div className="poa-hero-actions">
            <Link to="/shop" className="poa-button-light">
              Explore the collection <ArrowUpRight size={18} />
            </Link>

            <button
              className="poa-button-outline"
              type="button"
              onClick={openWhatsApp}
            >
              Talk to us <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="poa-hero-bottom">
            <span>FOOTWEAR FOR YOUR EVERYDAY</span>

            <a href="#featured">
              DISCOVER <ArrowDownRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="poa-marquee">
        <div className="poa-marquee-track">
          {[0, 1].map((key) => (
            <div className="poa-marquee-group" key={key}>
              <span>OWN YOUR STYLE</span>
              <i>✳</i>

              <span>COMFORT IN EVERY STEP</span>
              <i>✳</i>

              <span>FIND YOUR PERFECT PAIR</span>
              <i>✳</i>

              <span>POA SHOES</span>
              <i>✳</i>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="poa-intro" id="about">
        <div className="poa-section-number">
          01 / THE BRAND
        </div>

        <div className="poa-intro-heading">
          <p className="poa-eyebrow">
            MORE THAN JUST SHOES
          </p>

          <h2>
            Your style.
            <br />
            <em>Your statement.</em>
          </h2>
        </div>

        <div className="poa-intro-copy">
          <p>
            The right pair does more than complete an outfit.
            It helps you show up with confidence, wherever
            the day takes you.
          </p>

          <p>
            Explore the POA SHOES collection and find footwear
            that fits your lifestyle and personal style.
          </p>

          <Link to="/shop" className="poa-text-link">
            Discover the collection <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="poa-featured" id="featured">
        <div className="poa-section-heading">
          <div>
            <p className="poa-eyebrow">
              02 / HANDPICKED FOR YOU
            </p>

            <h2>
              The <em>favourites.</em>
            </h2>

            <p className="poa-heading-description">
              A few styles to get you started.
            </p>
          </div>

          <Link to="/shop" className="poa-outline-link">
            Shop all shoes <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="poa-products-grid">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={(item) => addToCart(item, "")}
            />
          ))}
        </div>

        <div className="poa-featured-bottom">
          <span>FIND YOUR FIT. FIND YOUR STYLE.</span>

          <Link to="/shop">
            Explore all collections <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="poa-categories" id="collection">
        <div className="poa-section-heading">
          <div>
            <p className="poa-eyebrow">
              03 / EXPLORE BY STYLE
            </p>

            <h2>
              Find your <em>kind.</em>
            </h2>
          </div>

          <p className="poa-categories-intro">
            Different days. Different plans.
            <br />
            Find a pair for every moment.
          </p>
        </div>

        <div className="poa-category-grid">
          {categories.map((category, index) => (
            <Link
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              className="poa-category-card"
              key={category.name}
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />
              )}

              <div className="poa-category-overlay" />

              <span className="poa-category-number">
                0{index + 1}
              </span>

              <div className="poa-category-content">
                <p>{category.description}</p>
                <h3>{category.name}</h3>
              </div>

              <span className="poa-category-arrow">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          ))}
        </div>

        <p className="poa-category-note">
          More styles are waiting for you in the full collection.
        </p>
      </section>

      {/* CRAFTSMANSHIP / BRAND STORY */}
      <section className="poa-story" id="craft">
        <div className="poa-story-visual">
          <img
            src="/images/shoes/shoe-04.jpg"
            alt="A closer look at POA SHOES footwear"
            loading="lazy"
          />

          <div className="poa-story-image-label">
            <span>POA</span>
            <span>SHOES</span>
          </div>

          <span className="poa-story-caption">
            STYLE IN EVERY DETAIL
          </span>
        </div>

        <div className="poa-story-copy">
          <p className="poa-eyebrow">
            04 / THE POA APPROACH
          </p>

          <h2>
            Details make
            <br />
            the <em>difference.</em>
          </h2>

          <p>
            Great footwear starts with the details: the look,
            the finish, the fit and how it works with your
            everyday life.
          </p>

          <p>
            Whether you are dressing up or keeping things casual,
            we want to help you find a pair that feels right.
          </p>

          <button
            className="poa-story-button"
            type="button"
            onClick={openWhatsApp}
          >
            Ask us about our collection <ArrowUpRight size={18} />
          </button>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="poa-benefits">
        <div className="poa-benefits-heading">
          <p className="poa-eyebrow">
            05 / THE POA EXPERIENCE
          </p>

          <h2>
            Made easier <em>for you.</em>
          </h2>
        </div>

        <div className="poa-benefits-grid">
          {benefits.map(({ Icon, title, text }, index) => (
            <article className="poa-benefit" key={title}>
              <div className="poa-benefit-top">
                <span>0{index + 1}</span>
                <Icon size={25} strokeWidth={1.5} />
              </div>

              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="poa-final-cta" id="contact">
        <div className="poa-final-content">
          <p className="poa-eyebrow">
            YOUR NEXT PAIR AWAITS
          </p>

          <h2>
            Ready to make
            <br />
            a <em>statement?</em>
          </h2>

          <p>
            Explore the collection or message us for help
            with styles, sizes, prices and availability.
          </p>

          <div className="poa-final-actions">
            <Link to="/shop" className="poa-final-shop">
              Shop the collection <ArrowUpRight size={18} />
            </Link>

            <button
              type="button"
              className="poa-final-whatsapp"
              onClick={openWhatsApp}
            >
              Order on WhatsApp <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
