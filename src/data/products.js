const shoeTypes = [
  {
    category: "Formal Shoes",
    sizes: ["39", "40", "41", "42", "43", "44"],
  },
  {
    category: "Palms",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
  },
  {
    category: "Sandals",
    sizes: ["39", "40", "41", "42", "43", "44"],
  },
  {
    category: "Loafers",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
  },
  {
    category: "Slides",
    sizes: ["39", "40", "41", "42", "43", "44"],
  },
];

const products = Array.from({ length: 92 }, (_, index) => {
  const type = shoeTypes[index % shoeTypes.length];

  return {
    id: `shoe-${String(index + 1).padStart(2, "0")}`,
    name: type.category,
    category: type.category,
    image: `/images/shoes/shoe-${String(index + 1).padStart(2, "0")}.jpg`,
    sizes: type.sizes,
    description: `Explore ${type.category} from POA SHOES.`,
    featured: index < 5,
    tag: index === 0 ? "BESTSELLER" : index === 3 ? "FEATURED" : "",
  };
});

export const categories = [
  "All Shoes",
  ...shoeTypes.map((type) => type.category),
];

export default products;
