export type Product = {
  id: number;
  name: string;
  category: string;
  emoji: string;
  badge?: string | null;
  badgeType?: string | null;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  inStock: number;
};

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

export const PRODUCTS: Product[] = [
  { id: 1, name: "Split Air Conditioner – 1.5 Ton", category: "appliances", emoji: "❄️", badge: "HOT", badgeType: "hot", price: 42000, originalPrice: 55000, discount: 24, rating: 4.4, reviews: 1284, inStock: 14 },
  { id: 2, name: "Wireless Noise-Cancelling Headphones", category: "electronics", emoji: "🎧", badge: "SALE", badgeType: "sale", price: 2999, originalPrice: 5999, discount: 50, rating: 4.7, reviews: 3892, inStock: 42 },
  { id: 3, name: "Lightweight Running Shoes", category: "footwear", emoji: "👟", badge: "NEW", badgeType: "new", price: 2499, originalPrice: 3299, discount: 24, rating: 4.3, reviews: 762, inStock: 3 },
  { id: 4, name: "6-Seater Dining Table Set", category: "furniture", emoji: "🪑", badge: null, badgeType: null, price: 18500, originalPrice: 24000, discount: 23, rating: 4.1, reviews: 210, inStock: 5 },
  { id: 5, name: "Fully Automatic Washing Machine 8kg", category: "appliances", emoji: "🫧", badge: null, badgeType: null, price: 24500, originalPrice: 32000, discount: 23, rating: 4.5, reviews: 968, inStock: 8 },
  { id: 6, name: "Portable Bluetooth Speaker Pro", category: "electronics", emoji: "🔊", badge: "SALE", badgeType: "sale", price: 4999, originalPrice: 7999, discount: 38, rating: 4.6, reviews: 2190, inStock: 22 },
  { id: 7, name: "Men's Formal Oxford Shoes", category: "footwear", emoji: "👞", badge: null, badgeType: null, price: 1899, originalPrice: 2999, discount: 37, rating: 4.2, reviews: 488, inStock: 0 },
  { id: 8, name: "Smart 4K LED TV 55\"", category: "electronics", emoji: "📺", badge: "HOT", badgeType: "hot", price: 38999, originalPrice: 55000, discount: 29, rating: 4.5, reviews: 1740, inStock: 11 },
  { id: 9, name: "Non-Stick Cookware Set 5-piece", category: "kitchen", emoji: "🍳", badge: "NEW", badgeType: "new", price: 1299, originalPrice: 2100, discount: 38, rating: 4.3, reviews: 630, inStock: 35 },
  { id: 10, name: "Women's Floral Kurti", category: "fashion", emoji: "👗", badge: null, badgeType: null, price: 699, originalPrice: 1199, discount: 42, rating: 4.1, reviews: 1920, inStock: 80 },
  { id: 11, name: "Ergonomic Laptop Stand – Aluminium", category: "electronics", emoji: "💻", badge: null, badgeType: null, price: 1299, originalPrice: 1799, discount: 28, rating: 4.4, reviews: 540, inStock: 18 },
  { id: 12, name: "Kids' LEGO Creator Set 450 pcs", category: "toys", emoji: "🧸", badge: "NEW", badgeType: "new", price: 2199, originalPrice: 3299, discount: 33, rating: 4.8, reviews: 322, inStock: 16 },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

export const FILTER_CHIPS = ["Under ₹1,000", "Under ₹5,000", "4★ & Above", "In Stock Only"];
