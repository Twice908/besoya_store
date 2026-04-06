export type { Product } from "../../services/productService";

export const CATEGORIES = [
  { id: "all", label: "All", emoji: "🛍️" },
  { id: "womens_fashion", label: "Women", emoji: "👗" },
  { id: "mens_fashion", label: "Men", emoji: "👔" },
  { id: "kids", label: "Kids", emoji: "🧸" },
  { id: "personal_care_wellness", label: "Wellness", emoji: "🧴" },
  { id: "home_decor", label: "Decor", emoji: "🪔" },
  { id: "kitchen_essentials", label: "Kitchen", emoji: "🍳" },
  { id: "electric_gadgets", label: "Gadgets", emoji: "🔌" },
  { id: "car_accessories", label: "Auto", emoji: "🚗" },
  { id: "fashion_accessories", label: "Accessories", emoji: "👜" },
  { id: "gifts_novelty", label: "Gifts", emoji: "🎁" },
  { id: "footwear_beauty", label: "Footwear", emoji: "👠" },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

export const FILTER_CHIPS = ["Under ₹1,000", "Under ₹5,000", "4★ & Above", "In Stock Only"];
