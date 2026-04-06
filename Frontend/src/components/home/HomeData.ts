export type { Product } from "../../services/productService";

export const CATEGORIES = [
  { id: "all", label: "All", emoji: "🛍️" },
  { id: "Women", label: "Women", emoji: "👗" },
  { id: "Men", label: "Men", emoji: "👔" },
  { id: "kids", label: "Kids", emoji: "🧸" },
  { id: "Wellness", label: "Wellness", emoji: "🧴" },
  { id: "Decor", label: "Decor", emoji: "🪔" },
  { id: "Kitchen", label: "Kitchen", emoji: "🍳" },
  { id: "Gadgets", label: "Gadgets", emoji: "🔌" },
  { id: "Auto", label: "Auto", emoji: "🚗" },
  { id: "Accessories", label: "Accessories", emoji: "👜" },
  { id: "Gifts", label: "Gifts", emoji: "🎁" },
  { id: "Footwear", label: "Footwear", emoji: "👠" },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

export const FILTER_CHIPS = ["Under ₹1,000", "Under ₹5,000", "4★ & Above", "In Stock Only"];
