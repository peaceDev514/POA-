import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  ArrowUpRight,
  X,
  SlidersHorizontal,
} from "lucide-react";

import products, { categories } from "../data/products";
import { useCart } from "../context/CartContext";
import "./Shop.css";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, cartCount } = useCart();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    categories.includes(searchParams.get("category"))
      ? searchParams.get("category")
      : "All Shoes"
  );

  const [sort, setSort] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesCategory =
        category === "All Shoes" ||
        product.category === category;

      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [search, category, sort]);

  const updateSearch = (value) => {
    setSearch(value);

    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("search", value);
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const updateCategory = (value) => {
    setCategory(value);

    const nextParams = new URLSearchParams(searchParams);

    if (value !== "All Shoes") {
      nextParams.set("category", value);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const openSizeSelector = (product) => {
    setSelectedProduct(product);
    setSelectedSize("");
    setNotice("");
  };

  const confirmAddToCart = () => {
    if (!selectedProduct) return;

    if (selectedProduct.sizes?.length && !selectedSize) {
      setNotice("Please select a shoe size first.");
      return;
    }

    addToCart(selectedProduct, selectedSize);
    setNotice(`${selectedProduct.name} added to your cart.`);
    setSelectedProduct(null);
    setSelectedSize("");
  };

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div className="shop-hero-inner">
          <p className="shop-eyebrow">
            THE POA COLLECTION
          </p>

          <h1>
            Find your
            <br />
            <em>next favourite.</em>
          </h1>

          <p>
            Explore the collection and find the pair that
            fits your style.
          </p>

          <div className="shop-hero-bottom">
            <span>SHOES FOR EVERY OCCASION</span>

            <Link to="/cart">
              <ShoppingBag size={18} />
              View cart ({cartCount})
            </Link>
          </div>
        </div>
      </section>

      <section className="shop-content">
        <div className="shop-toolbar">
          <div className="shop-search">
            <Search size={19} />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                updateSearch(event.target.value)
              }
              placeholder="Search shoes, sandals, loafers..."
              aria-label="Search products"
            />

            {search && (
              <button
                type="button"
                onClick={() => updateSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <label className="shop-sort">
            <SlidersHorizontal size={17} />

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
              aria-label="Sort products"
            >
              <option value="featured">Recommended</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
        </div>

        <div className="shop-category-filter">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "selected" : ""}
              onClick={() => updateCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="shop-results-bar">
          <div>
            <p className="shop-eyebrow">
              SHOP THE COLLECTION
            </p>

            <h2>{category}</h2>
          </div>

          <span>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "product"
              : "products"}
          </span>
        </div>

        {notice && (
          <div className="shop-notice" role="status">
            <span>{notice}</span>

            <button
              type="button"
              onClick={() => setNotice("")}
            >
              Dismiss
            </button>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="shop-empty">
            <Search size={35} />

            <h2>No shoes found</h2>

            <p>
              Try a different search or choose another category.
            </p>

            <button
              type="button"
              onClick={() => {
                updateSearch("");
                updateCategory("All Shoes");
              }}
            >
              Show all shoes
            </button>
          </div>
        ) : (
          <div className="shop-grid">
            {filteredProducts.map((product) => (
              <article
                className="shop-product"
                key={product.id}
              >
                <Link
                  to={`/shop?search=${encodeURIComponent(
                    product.name
                  )}`}
                  className="shop-product-image"
                  aria-label={`Search for ${product.name}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />

                  {product.tag && (
                    <span className="shop-product-tag">
                      {product.tag}
                    </span>
                  )}
                </Link>

                <div className="shop-product-info">
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>

                  <div className="shop-product-bottom">
                    <span className="shop-price-enquiry">
                      Contact us for more info
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        openSizeSelector(product)
                      }
                      aria-label={`Choose size for ${product.name}`}
                    >
                      <ShoppingBag size={17} />
                      Enquire
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {selectedProduct && (
        <div
          className="size-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProduct(null);
              setNotice("");
            }
          }}
        >
          <section
            className="size-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-modal-title"
          >
            <button
              type="button"
              className="size-modal-close"
              onClick={() => {
                setSelectedProduct(null);
                setNotice("");
              }}
              aria-label="Close size selector"
            >
              <X size={21} />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <p className="shop-eyebrow">
              {selectedProduct.category}
            </p>

            <h2 id="size-modal-title">
              {selectedProduct.name}
            </h2>

            <p className="shop-price-enquiry">
              Contact us on WhatsApp for pricing.
            </p>

            <p className="size-modal-label">
              Choose your size
            </p>

            <div className="size-options">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={
                    selectedSize === size ? "selected" : ""
                  }
                  onClick={() => {
                    setSelectedSize(size);
                    setNotice("");
                  }}
                >
                  {size}
                </button>
              ))}
            </div>

            {notice && (
              <p className="size-modal-error" role="alert">
                {notice}
              </p>
            )}

            <button
              type="button"
              className="size-modal-add"
              onClick={confirmAddToCart}
            >
              Add to cart <ArrowUpRight size={18} />
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
