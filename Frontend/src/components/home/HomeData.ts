export type { Product } from "../../services/productService";

export const CATEGORIES = [
  { id: "all",         label: "All",          emoji: "🛍️" },
  { id: "electronics", label: "Electronics",  emoji: "📱" },
  { id: "appliances",  label: "Appliances",   emoji: "❄️" },
  { id: "fashion",     label: "Fashion",      emoji: "👗" },
  { id: "footwear",    label: "Footwear",     emoji: "👟" },
  { id: "furniture",   label: "Furniture",    emoji: "🪑" },
  { id: "kitchen",     label: "Kitchen",      emoji: "🍳" },
  { id: "beauty",      label: "Beauty",       emoji: "💄" },
  { id: "sports",      label: "Sports",       emoji: "🏋️" },
  { id: "books",       label: "Books",        emoji: "📚" },
  { id: "toys",        label: "Toys & Kids",  emoji: "🧸" },
  { id: "grocery",     label: "Grocery",      emoji: "🛒" },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

export const FILTER_CHIPS = ["Under ₹1,000", "Under ₹5,000", "4★ & Above", "In Stock Only"];
