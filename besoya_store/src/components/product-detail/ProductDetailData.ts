interface ExtendedProductData {
  seller: string;
  soldCount: string;
  description: string;
  highlights: string[];
  specs: string[][];
  variations?: { label: string; price: number }[];
  reviews: { name: string; date: string; rating: number; title: string; body: string; verified: boolean; images?: string[] }[];
  ratingBars: { stars: number; pct: number }[];
  images: string[];
}

export const EXTENDED_PRODUCT_DATA: Record<number, ExtendedProductData> & { default: ExtendedProductData } = {
  1: {
    seller: "CoolBreeze Official",
    soldCount: "2.4k",
    description: `Stay cool all year round with the CoolBreeze Split Air Conditioner. Built with inverter technology for energy efficiency, this unit adapts its compressor speed to maintain the desired temperature without constantly turning on and off — saving up to 50% on electricity bills.`,
    highlights: [
      "5-star energy rating — saves up to 50% on electricity",
      "Wi-Fi enabled — control from anywhere via the app",
      "Auto-clean function keeps the unit hygienic",
      "4-way air swing for uniform cooling",
      "Copper condenser coils for durability & efficiency",
      "Turbo cool mode reaches set temperature 30% faster",
    ],
    specs: [
      ["Brand", "CoolBreeze"],
      ["Model", "CB-INV-1.5T-5S"],
      ["Capacity", "1.5 Ton"],
      ["Energy Rating", "5 Star (BEE 2024)"],
      ["Compressor", "Rotary Inverter"],
      ["Refrigerant", "R32 (Eco-friendly)"],
      ["Noise Level (Indoor)", "28 dB"],
      ["Wi-Fi", "Yes — Android & iOS"],
      ["Auto Clean", "Yes"],
      ["Warranty", "1 Yr Product, 5 Yr Compressor"],
      ["Colour", "White"],
      ["Weight", "10.2 kg (Indoor Unit)"],
    ],
    variations: [
      { label: "1 Ton",   price: 32000 },
      { label: "1.5 Ton", price: 42000 },
      { label: "2 Ton",   price: 55000 },
    ],
    reviews: [
      { name: "Anita Sharma", date: "12 Feb 2025", rating: 5, title: "Best AC I've ever owned!", body: "Cooling is absolutely fantastic. My room went from 38°C to 22°C in under 20 minutes. The Wi-Fi control is a lifesaver — I start cooling the room before I even get home. Highly recommended.", verified: true },
      { name: "Rahul Menon",  date: "04 Jan 2025", rating: 4, title: "Great product, installation took time", body: "The AC itself is brilliant — whisper quiet and cools incredibly fast. Had to wait a bit for the installation team but once up it's been flawless. Star deducted for scheduling delays.", verified: true },
      { name: "Priya Joshi",  date: "29 Dec 2024", rating: 5, title: "Worth every rupee", body: "Bought the 2 Ton variant for my large living room. Even on peak summer days it handles the room perfectly. Electricity bill has actually gone down compared to my old non-inverter unit.", verified: false },
    ],
    ratingBars: [
      { stars: 5, pct: 68 },
      { stars: 4, pct: 20 },
      { stars: 3, pct: 7  },
      { stars: 2, pct: 3  },
      { stars: 1, pct: 2  },
    ],
    images: ["🏠", "❄️", "🌬️", "📱"],
  },
  default: {
    seller: "Besoya Verified Seller",
    soldCount: "1.2k",
    description: `A premium quality product brought to you by one of Besoya's top-rated sellers. Carefully designed and tested to meet the highest standards of quality and durability. Every unit goes through strict quality checks before shipping.`,
    highlights: [
      "Premium build quality with durable materials",
      "Tested and certified by quality assurance team",
      "Fast dispatch — ships within 24 hours",
      "Easy 30-day return policy",
      "Genuine product with manufacturer warranty",
      "Packed securely to avoid damage during transit",
    ],
    specs: [
      ["Brand",    "Besoya Select"],
      ["Category", "Premium"],
      ["Warranty", "1 Year Manufacturer Warranty"],
      ["Returns",  "30 Days Easy Return"],
      ["Dispatch", "Within 24 Hours"],
      ["Shipping", "Free Above ₹5,000"],
    ],
    variations: undefined,
    reviews: [
      { name: "Kavya R",        date: "10 Mar 2025", rating: 5, title: "Absolutely love it!", body: "Exactly as described. The quality is top notch and delivery was super fast. Would definitely order again from Besoya.", verified: true },
      { name: "Suresh Pillai", date: "22 Feb 2025", rating: 4, title: "Good product, prompt delivery", body: "The product is solid and well-made. Packaging was excellent, not a scratch on it. Minor quibble with the instruction manual being only in English but otherwise great.", verified: true },
      { name: "Nandini K",     date: "18 Jan 2025", rating: 5, title: "Exceeded expectations", body: "I was a little hesitant ordering online but this completely changed my mind. Premium quality, arrived ahead of schedule, and the customer support was very helpful.", verified: false },
    ],
    ratingBars: [
      { stars: 5, pct: 62 },
      { stars: 4, pct: 22 },
      { stars: 3, pct: 10 },
      { stars: 2, pct: 4  },
      { stars: 1, pct: 2  },
    ],
    images: ["📦", "⭐", "🚚", "✅"],
  },
};