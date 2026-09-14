export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  weight: string;
  roast: string;
  description: string;
  notes: string[];
  altitude: string;
  process: string;
  emoji: string;
  color: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    category: "Single Origin",
    price: 24.99,
    weight: "250g",
    roast: "Light",
    description: "A luminous cup with floral aromatics and bright citrus acidity. This washed Ethiopian showcases the terroir of the Yirgacheffe region with remarkable clarity and elegance.",
    notes: ["Jasmine", "Bergamot", "Peach", "Honey"],
    altitude: "1,900 - 2,200m",
    process: "Washed",
    emoji: "☕",
    color: "#e8c9a0"
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    category: "Single Origin",
    price: 21.99,
    weight: "250g",
    roast: "Medium",
    description: "Velvety and balanced with a rich caramel sweetness. Grown in the volcanic soils of Huila, this coffee delivers a perfectly rounded cup with lingering chocolate finish.",
    notes: ["Caramel", "Dark Chocolate", "Walnut", "Red Apple"],
    altitude: "1,500 - 1,800m",
    process: "Washed",
    emoji: "🫘",
    color: "#c8875a"
  },
  {
    id: 3,
    name: "Midnight Blend",
    origin: "Brazil & Indonesia",
    category: "Blend",
    price: 19.99,
    weight: "250g",
    roast: "Dark",
    description: "A bold, full-bodied blend crafted for those who prefer intensity. Brazilian Santos meets Sumatran Mandheling for a smoky, earthy cup with bittersweet chocolate depth.",
    notes: ["Dark Chocolate", "Cedar", "Tobacco", "Molasses"],
    altitude: "800 - 1,200m",
    process: "Natural / Wet-Hulled",
    emoji: "🌑",
    color: "#4a2c2a"
  },
  {
    id: 4,
    name: "Kenya AA Nyeri",
    origin: "Kenya",
    category: "Single Origin",
    price: 28.99,
    weight: "250g",
    roast: "Light-Medium",
    description: "Electric and complex with sparkling blackcurrant acidity. This AA grade from Nyeri county delivers an unforgettable cup that bursts with juicy fruit and wine-like qualities.",
    notes: ["Blackcurrant", "Grapefruit", "Tomato", "Brown Sugar"],
    altitude: "1,700 - 2,000m",
    process: "Washed",
    emoji: "🍇",
    color: "#8b3a62"
  },
  {
    id: 5,
    name: "Morning Ritual Blend",
    origin: "Guatemala & Ethiopia",
    category: "Blend",
    price: 22.99,
    weight: "250g",
    roast: "Medium",
    description: "Your perfect morning companion. This blend combines the chocolate richness of Guatemalan Antigua with the bright florals of Ethiopian Sidamo for a balanced, uplifting cup.",
    notes: ["Cocoa", "Orange Blossom", "Almond", "Vanilla"],
    altitude: "1,400 - 1,900m",
    process: "Washed / Natural",
    emoji: "🌅",
    color: "#d4a574"
  },
  {
    id: 6,
    name: "Panama Geisha Reserve",
    origin: "Panama",
    category: "Reserve",
    price: 49.99,
    weight: "150g",
    roast: "Light",
    description: "The crown jewel of specialty coffee. This rare Geisha varietal from Boquete delivers an ethereal cup with extraordinary complexity — tea-like body, explosive florals, and a finish that lingers like a dream.",
    notes: ["Rose", "Mango", "Champagne", "Honeysuckle"],
    altitude: "1,600 - 1,800m",
    process: "Natural",
    emoji: "👑",
    color: "#d4a574"
  }
];

export const categories = ["All", "Single Origin", "Blend", "Reserve"];

export const roastLevels = ["All", "Light", "Light-Medium", "Medium", "Dark"];
