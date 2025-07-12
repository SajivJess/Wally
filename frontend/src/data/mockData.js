// Mock data for Walmart SmartCommerce+ app
export const mockUser = {
  name: "Raj",
  location: "Chennai",
  points: 2450,
  savingsThisMonth: 1320
};

export const smartBundles = [
  {
    id: "bundle-1",
    name: "Healthy Breakfast Pack",
    price: 399,
    originalPrice: 459,
    savings: 60,
    items: 5,
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=200&fit=crop"
  },
  {
    id: "bundle-2", 
    name: "Rainy Day Essentials",
    price: 599,
    originalPrice: 699,
    savings: 100,
    items: 7,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop"
  },
  {
    id: "bundle-3",
    name: "Back-to-College Kit", 
    price: 899,
    originalPrice: 1099,
    savings: 200,
    items: 8,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop"
  }
];

export const trendingProducts = [
  {
    id: "prod-1",
    name: "Masala Maggi",
    price: 120,
    originalPrice: 150,
    discount: "20% off",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=150&fit=crop"
  },
  {
    id: "prod-2",
    name: "Bluetooth Neckband",
    price: 799,
    originalPrice: 999,
    discount: "₹200 off",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=150&fit=crop"
  },
  {
    id: "prod-3",
    name: "Organic Face Wash",
    price: 299,
    originalPrice: 349,
    discount: "15% off", 
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=150&fit=crop"
  }
];

export const loyaltyMissions = [
  {
    id: "mission-1",
    title: "Buy 2 new snacks",
    reward: "+100 points",
    progress: 0,
    target: 2,
    type: "snacks"
  },
  {
    id: "mission-2", 
    title: "Try 1 new brand",
    reward: "Cashback unlocked",
    progress: 0,
    target: 1,
    type: "brands"
  },
  {
    id: "mission-3",
    title: "Buy from 3 different categories", 
    reward: "Spin unlocked",
    progress: 1,
    target: 3,
    type: "categories"
  }
];

export const mealPlans = {
  "Weight Loss": {
    monday: ["Oats", "Grilled Chicken Salad", "Green Tea"],
    tuesday: ["Smoothie Bowl", "Quinoa Bowl", "Herbal Tea"],
    wednesday: ["Avocado Toast", "Fish Curry", "Lemon Water"],
    cost: 450,
    calories: 1200
  },
  "Family Dinners": {
    monday: ["Pancakes", "Veg Biryani", "Milk"],
    tuesday: ["Poha", "Dal Chawal", "Lassi"], 
    wednesday: ["Sandwich", "Chicken Curry", "Chai"],
    cost: 680,
    calories: 1800
  },
  "High Protein": {
    monday: ["Protein Shake", "Grilled Fish", "Nuts"],
    tuesday: ["Egg Sandwich", "Chicken Breast", "Protein Bar"],
    wednesday: ["Greek Yogurt", "Lentil Curry", "Almonds"],
    cost: 520,
    calories: 1600
  }
};

export const refillAlerts = [
  {
    id: "refill-1",
    product: "Baby Wipes",
    daysLeft: 3,
    discount: "₹20 Off",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=150&fit=crop"
  },
  {
    id: "refill-2",
    product: "Detergent Powder", 
    daysLeft: 5,
    discount: "₹50 Off",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop"
  }
];

export const smartTips = [
  {
    id: "tip-1",
    title: "Switch to Walmart brand detergent",
    savings: "₹75/month",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop"
  },
  {
    id: "tip-2",
    title: "Buy groceries in bulk",
    savings: "₹120/month", 
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=150&fit=crop"
  }
];

export const exclusiveDrops = [
  {
    id: "drop-1",
    title: "Organic Wellness Bundle",
    price: 899,
    originalPrice: 1299,
    earlyAccess: true,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop"
  }
];

export const rouletteRewards = [
  "10% Off Next Order",
  "Free Delivery", 
  "₹50 Cashback",
  "2x Points",
  "₹100 Off ₹500",
  "Free Sample Box",
  "Weekend Special",
  "Spin Again!"
];