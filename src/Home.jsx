import "./Home.css";
import Shoe from "./assets/shoe.jpg";
import Shoe1 from "./assets/shoe1.jpg";
import Shoe2 from "./assets/shoe2.jpg";
import Shoe3 from "./assets/shoe3.jpg";
import Shoe4 from "./assets/shoe4.jpg";

const WHATSAPP_NUMBER = "2348158026303";

const openWhatsApp = (message) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
};

const Home = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="home">
      {/* ================= HERO ================= */}
      <section className="poa-hero" id="home">
        <div className="hero-background">
          <img
            src="/images/hero-shoe.jpg"
            alt="POA SHOES footwear"
          />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-inner">
          <div className="hero-topline">
            <span>HANDCRAFTED FOOTWEAR</span>
            <span>MADE IN NIGERIA</span>
          </div>

          <div className="hero-main">
            <p className="hero-small-text">
              STEP INTO SOMETHING DIFFERENT
            </p>

            <h1>
              Walk
              <span>with purpose.</span>
            </h1>

            <p className="hero-description">
              Thoughtfully crafted footwear designed to bring
              comfort, confidence and timeless style to every step.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => scrollToSection("collection")}
              >
                Explore Collection
                <span>↗</span>
              </button>

              <button
                className="outline-button"
                onClick={() =>
                  openWhatsApp(
                    "Hello POA SHOES, I'm interested in your footwear collection."
                  )
                }
              >
                Talk to us
                <span>↗</span>
              </button>
            </div>
          </div>

          <div className="hero-bottom">
            <span>POA SHOES</span>

            <div className="hero-scroll">
              <span></span>
              <p>SCROLL TO EXPLORE</p>
            </div>

            <span>EST. 2026</span>
          </div>
        </div>
      </section>

      {/* ================= BRAND MARQUEE ================= */}
      <section className="poa-marquee">
        <div className="marquee-track">
          <span>QUALITY FOOTWEAR</span>
          <i>✦</i>
          <span>HANDCRAFTED WITH CARE</span>
          <i>✦</i>
          <span>MADE FOR EVERY STEP</span>
          <i>✦</i>
          <span>NATIONWIDE DELIVERY</span>
          <i>✦</i>

          <span>QUALITY FOOTWEAR</span>
          <i>✦</i>
          <span>HANDCRAFTED WITH CARE</span>
          <i>✦</i>
          <span>MADE FOR EVERY STEP</span>
          <i>✦</i>
          <span>NATIONWIDE DELIVERY</span>
          <i>✦</i>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="poa-intro" id="about">
        <div className="intro-number">01</div>

        <div className="intro-title">
          <p>THE POA STORY</p>

          <h2>
            More than
            <em> footwear.</em>
          </h2>
        </div>

        <div className="intro-text">
          <p>
            At POA SHOES, we believe what you wear on your feet
            should say something about you.
          </p>

          <p>
            That's why every pair is thoughtfully selected and
            crafted with a focus on comfort, quality and style.
          </p>

          <button
            className="line-button"
            onClick={() => scrollToSection("craft")}
          >
            Discover our story
            <span>↗</span>
          </button>
        </div>
      </section>

      {/* ================= COLLECTION ================= */}
      <section className="poa-collection" id="collection">
        <div className="collection-header">
          <div>
            <p className="section-kicker">02 — COLLECTION</p>

            <h2>
              Made to
              <em> move.</em>
            </h2>
          </div>

          <button
            className="line-button"
            onClick={() =>
              openWhatsApp(
                "Hello POA SHOES, I'd like to see your available footwear collection."
              )
            }
          >
            See what's available
            <span>↗</span>
          </button>
        </div>

        <div className="shoe-grid">
          {/* Shoe 1 */}
          <article className="shoe-card shoe-card-featured">
            <div className="shoe-image">
              <img
                src={Shoe}
                alt="POA SHOES featured footwear"
              />

              <div className="shoe-index">01</div>

              <button
                className="image-button"
                onClick={() =>
                  openWhatsApp(
                    "Hello POA SHOES, I'm interested in the featured shoe I saw on your website."
                  )
                }
              >
                Enquire <span>↗</span>
              </button>
            </div>

            <div className="shoe-details">
              <div>
                <h3>Signature</h3>
                <p>POA Collection</p>
              </div>

              <span>01</span>
            </div>
          </article>

          {/* Shoe 2 */}
          <article className="shoe-card">
            <div className="shoe-image">
              <img
                src={Shoe1}
                alt="POA SHOES footwear"
              />

              <div className="shoe-index">02</div>

              <button
                className="image-button"
                onClick={() =>
                  openWhatsApp(
                    "Hello POA SHOES, I'm interested in this shoe. Please send me more details."
                  )
                }
              >
                Enquire <span>↗</span>
              </button>
            </div>

            <div className="shoe-details">
              <div>
                <h3>Classic</h3>
                <p>Everyday Collection</p>
              </div>

              <span>02</span>
            </div>
          </article>

          {/* Shoe 3 */}
          <article className="shoe-card">
            <div className="shoe-image">
              <img
                src={Shoe2}
                alt="POA SHOES premium footwear"
              />

              <div className="shoe-index">03</div>

              <button
                className="image-button"
                onClick={() =>
                  openWhatsApp(
                    "Hello POA SHOES, I'm interested in this pair. Please send me more details."
                  )
                }
              >
                Enquire <span>↗</span>
              </button>
            </div>

            <div className="shoe-details">
              <div>
                <h3>Heritage</h3>
                <p>Signature Collection</p>
              </div>

              <span>03</span>
            </div>
          </article>
        </div>
      </section>

      {/* ================= IMAGE STORY ================= */}
      <section className="poa-story" id="craft">
        <div className="story-image">
          <img
            src={Shoe3}
            alt="POA SHOES craftsmanship"
          />

          <div className="story-image-text">
            <span>POA</span>
            <span>CRAFT</span>
          </div>
        </div>

        <div className="story-content">
          <p className="section-kicker">03 — OUR CRAFT</p>

          <h2>
            Details
            <br />
            <em>matter.</em>
          </h2>

          <p>
            We pay attention to the details that make a pair
            special—from the materials and finish to the way
            each pair feels when you put it on.
          </p>

          <p>
            Because good footwear shouldn't just look good.
            It should feel like it belongs to you.
          </p>

          <button
            className="dark-line-button"
            onClick={() =>
              openWhatsApp(
                "Hello POA SHOES, I'd like to know more about your footwear."
              )
            }
          >
            Speak with POA SHOES
            <span>↗</span>
          </button>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="poa-values">
        <div className="values-header">
          <p className="section-kicker">04 — WHY POA</p>

          <h2>
            Built around
            <em> you.</em>
          </h2>
        </div>

        <div className="values-list">
          <div className="value">
            <span>01</span>

            <div>
              <h3>Quality</h3>
              <p>
                We believe every pair should be worth the step.
              </p>
            </div>
          </div>

          <div className="value">
            <span>02</span>

            <div>
              <h3>Comfort</h3>
              <p>
                Designed for real life, from your first step
                to your last.
              </p>
            </div>
          </div>

          <div className="value">
            <span>03</span>

            <div>
              <h3>Style</h3>
              <p>
                Clean, confident designs that never need to
                shout.
              </p>
            </div>
          </div>

          <div className="value">
            <span>04</span>

            <div>
              <h3>Reliability</h3>
              <p>
                Quality footwear and service you can count on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="poa-final-cta" id="contact">
        <div className="cta-number">05</div>

        <div className="final-cta-content">
          <p className="section-kicker">LET'S GET YOU SORTED</p>

          <h2>
            Your next pair
            <br />
            <em>starts here.</em>
          </h2>

          <p>
            Tell us what you're looking for and we'll help you
            find the right pair.
          </p>

          <button
            className="final-button"
            onClick={() =>
              openWhatsApp(
                "Hello POA SHOES, I'd like to make an enquiry about your footwear."
              )
            }
          >
            Get in touch on WhatsApp
            <span>↗</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
