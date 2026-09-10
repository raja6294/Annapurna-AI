export const INITIAL_LISTINGS = [
  {
    id: "FOOD-2026-001",
    providerName: "Taj Grand Kitchens & Banquet",
    providerType: "Institutional Kitchen / Hotel",
    providerBadge: "Verified Provider",
    foodName: "Fresh Veg Pulao & Paneer Butter Masala",
    category: "Cooked Meals (Vegetarian)",
    quantityKg: 65,
    portions: 130,
    prepTime: "1.5 hours ago (12:30 PM)",
    storageCondition: "Insulated Thermal Containers",
    temperatureC: 62,
    location: "Connaught Place, Central Delhi",
    lat: 28.6315,
    lng: 77.2167,
    status: "Live",
    freshnessScore: 92, // 0-100%
    freshnessWindowHours: 4.5,
    urgencyLevel: "fresh", // 'fresh' (>3.5h), 'warning' (2-3.5h), 'urgent' (<2h)
    allergens: ["Dairy", "Nuts"],
    photos: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80"
    ],
    aiResult: {
      detectedFood: "Vegetable Biryani / Pulao with Cottage Cheese Gravy",
      confidence: 94.8,
      isVeg: true,
      visualCondition: "Fresh & Optimal",
      recommendation: "Recommended for Immediate Redistribution",
      estimatedWindowHours: 4.5,
      urgency: "Good Window",
      spoiledFlag: false
    },
    matchedNgo: {
      id: "NGO-101",
      name: "Akshaya Shelter Foundation",
      distanceKm: 3.2,
      travelMinutes: 14,
      capacityAvailable: 150,
      matchScore: 96,
      scoreBreakdown: {
        proximity: 28, // max 30
        capacity: 25,  // max 25
        urgency: 24,   // max 25
        reliability: 19 // max 20
      }
    }
  },
  {
    id: "FOOD-2026-002",
    providerName: "Apex Food Processing Canteen",
    providerType: "Food Processing Unit",
    providerBadge: "Standard Provider",
    foodName: "Assorted Wheat Flatbreads (Roti) & Dal Makhani",
    category: "Cooked Meals (Vegetarian)",
    quantityKg: 40,
    portions: 90,
    prepTime: "3.5 hours ago (11:00 AM)",
    storageCondition: "Stainless Steel Hot Boxes",
    temperatureC: 54,
    location: "Okhla Industrial Area, New Delhi",
    lat: 28.5355,
    lng: 77.2682,
    status: "Live",
    freshnessScore: 68,
    freshnessWindowHours: 1.8,
    urgencyLevel: "urgent",
    allergens: ["Gluten"],
    photos: [
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80"
    ],
    aiResult: {
      detectedFood: "Whole Wheat Roti & Creamy Lentil Stew",
      confidence: 91.2,
      isVeg: true,
      visualCondition: "Consume Soon",
      recommendation: "Priority Pickup Required (High Urgency)",
      estimatedWindowHours: 1.8,
      urgency: "Urgent Window",
      spoiledFlag: false
    },
    matchedNgo: {
      id: "NGO-102",
      name: "Hope Community Kitchen",
      distanceKm: 4.8,
      travelMinutes: 22,
      capacityAvailable: 100,
      matchScore: 91,
      scoreBreakdown: {
        proximity: 22,
        capacity: 25,
        urgency: 25,
        reliability: 19
      }
    }
  },
  {
    id: "FOOD-2026-003",
    providerName: "Green Valley Organic Harvest",
    providerType: "Agricultural Supplier / Processing",
    providerBadge: "Verified Provider",
    foodName: "Fresh Surplus Tomatoes & Seasonal Spinach",
    category: "Raw Produce",
    quantityKg: 120,
    portions: 300,
    prepTime: "Harvested Today (08:00 AM)",
    storageCondition: "Ventilated Produce Crates",
    temperatureC: 22,
    location: "Azadpur Mandi, North Delhi",
    lat: 28.7180,
    lng: 77.1770,
    status: "Live",
    freshnessScore: 96,
    freshnessWindowHours: 24.0,
    urgencyLevel: "fresh",
    allergens: [],
    photos: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80"
    ],
    aiResult: {
      detectedFood: "Raw Tomatoes & Leafy Spinach",
      confidence: 97.4,
      isVeg: true,
      visualCondition: "Fresh / Unprocessed",
      recommendation: "Recommended for Raw Distribution or Processing",
      estimatedWindowHours: 24.0,
      urgency: "Good Window",
      spoiledFlag: false
    },
    matchedNgo: {
      id: "NGO-103",
      name: "Rotary Meals & Welfare Centre",
      distanceKm: 6.1,
      travelMinutes: 28,
      capacityAvailable: 250,
      matchScore: 89,
      scoreBreakdown: {
        proximity: 20,
        capacity: 25,
        urgency: 24,
        reliability: 20
      }
    }
  },
  {
    id: "FOOD-2026-004",
    providerName: "Oberoi Catering Services",
    providerType: "Institutional Caterer",
    providerBadge: "Verified Provider",
    foodName: "Steamed Vegetable Dumplings (Momos) & Chutney",
    category: "Bakery & Snacks",
    quantityKg: 30,
    portions: 120,
    prepTime: "2 hours ago (12:00 PM)",
    storageCondition: "Chilled Insulated Tray",
    temperatureC: 18,
    location: "Karol Bagh, Central Delhi",
    lat: 28.6517,
    lng: 77.1906,
    status: "Live",
    freshnessScore: 82,
    freshnessWindowHours: 3.2,
    urgencyLevel: "warning",
    allergens: ["Gluten", "Soy"],
    photos: [
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80"
    ],
    aiResult: {
      detectedFood: "Steamed Vegetable Dumplings",
      confidence: 95.1,
      isVeg: true,
      visualCondition: "Good Condition",
      recommendation: "Recommended for Redistribution within 3 hours",
      estimatedWindowHours: 3.2,
      urgency: "Consume Soon",
      spoiledFlag: false
    },
    matchedNgo: {
      id: "NGO-101",
      name: "Akshaya Shelter Foundation",
      distanceKm: 1.5,
      travelMinutes: 8,
      capacityAvailable: 150,
      matchScore: 98,
      scoreBreakdown: {
        proximity: 30,
        capacity: 25,
        urgency: 23,
        reliability: 20
      }
    }
  }
];

export const MOCK_NGOS = [
  {
    id: "NGO-101",
    name: "Akshaya Shelter Foundation",
    category: "Children & Women Welfare Centre",
    contactPerson: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "contact@akshayashelter.org",
    location: "Karol Bagh, New Delhi",
    lat: 28.6510,
    lng: 77.1920,
    beneficiariesCount: 180,
    capacityAvailable: 150,
    preferredCategories: ["Cooked Meals (Vegetarian)", "Bakery & Snacks"],
    storageFacilities: ["Insulated Warm Storage", "Commercial Refrigerator"],
    urgencyLevel: "High Need",
    verificationStatus: "verified", // 'verified' | 'pending_verification' | 'rejected'
    documentsSubmitted: {
      regCert: "NGO-REG-DEL-2021-884.pdf",
      tax12A: "12A-AACTA9921E.pdf",
      fcraProof: "FCRA-DEL-041920.pdf",
      addressProof: "UTILITY-BILL-2026.pdf",
      submittedAt: "2026-09-01"
    },
    pastPickupRate: 98.5
  },
  {
    id: "NGO-102",
    name: "Hope Community Kitchen",
    category: "Community Dining Hall",
    contactPerson: "Rajesh Kumar",
    phone: "+91 98112 34567",
    email: "info@hopekitchen.org",
    location: "Lajpat Nagar, New Delhi",
    lat: 28.5677,
    lng: 77.2433,
    beneficiariesCount: 120,
    capacityAvailable: 100,
    preferredCategories: ["Cooked Meals (Vegetarian)", "Raw Produce"],
    storageFacilities: ["Cold Room", "Food Warmer"],
    urgencyLevel: "Immediate",
    verificationStatus: "verified",
    documentsSubmitted: {
      regCert: "NGO-REG-DEL-2019-332.pdf",
      tax12A: "12A-BCTAA4410P.pdf",
      fcraProof: "FCRA-DEL-012944.pdf",
      addressProof: "RENT-AGREEMENT-2026.pdf",
      submittedAt: "2026-08-15"
    },
    pastPickupRate: 96.0
  },
  {
    id: "NGO-103",
    name: "Rotary Meals & Welfare Centre",
    category: "Disaster & Elder Care Relief",
    contactPerson: "Dr. Ananya Roy",
    phone: "+91 97171 88990",
    email: "ananya@rotarymeals.org",
    location: "Civil Lines, North Delhi",
    lat: 28.6814,
    lng: 77.2229,
    beneficiariesCount: 250,
    capacityAvailable: 250,
    preferredCategories: ["Raw Produce", "Cooked Meals (Vegetarian)", "Bakery & Snacks"],
    storageFacilities: ["Walk-in Chiller", "Dry Grocery Pantry"],
    urgencyLevel: "Medium Need",
    verificationStatus: "verified",
    documentsSubmitted: {
      regCert: "NGO-REG-DEL-2018-109.pdf",
      tax12A: "12A-CCRAA1109R.pdf",
      fcraProof: "FCRA-DEL-099412.pdf",
      addressProof: "GOVT-LEASE-2025.pdf",
      submittedAt: "2026-07-20"
    },
    pastPickupRate: 99.1
  },
  {
    id: "NGO-104",
    name: "Jan Seva Community Shelter (NEW)",
    category: "Urban Homeless Shelter",
    contactPerson: "Vikramjit Singh",
    phone: "+91 99990 12345",
    email: "janseva.delhi@gmail.com",
    location: "Yamuna Pushta, East Delhi",
    lat: 28.6410,
    lng: 77.2580,
    beneficiariesCount: 210,
    capacityAvailable: 180,
    preferredCategories: ["Cooked Meals (Vegetarian)", "Raw Produce"],
    storageFacilities: ["Basic Thermal Boxes"],
    urgencyLevel: "Critical Need",
    verificationStatus: "pending_verification", // Security Gate Demo!
    documentsSubmitted: {
      regCert: "JANSEVA-REG-2026-DRAFT.pdf",
      tax12A: "12A-APPLIED-RECEIPT.pdf",
      fcraProof: "NOT_APPLICABLE",
      addressProof: "MUNICIPAL-PERMISSION-2026.pdf",
      submittedAt: "2026-09-09"
    },
    pastPickupRate: 100.0
  }
];

export const SYSTEM_STATS = {
  totalFoodRescuedKg: 14850,
  totalMealsServed: 29700,
  co2PreventedKg: 37125,
  methanePreventedKg: 4455,
  activeProviders: 48,
  partnerNgos: 32,
  successfulMatchesPct: 98.4,
  avgDeliveryTimeMinutes: 26,
};

export const MOCK_MESSAGE_QUEUES = [
  { name: "ai-quality", active: 2, completed: 1420, failed: 3, producer: "Core API", consumer: "FastAPI AI Worker" },
  { name: "matching", active: 1, completed: 1380, failed: 1, producer: "Listing Gateway", consumer: "Weighted Ranker Worker" },
  { name: "notifications", active: 4, completed: 4820, failed: 8, producer: "Match Engine", consumer: "Socket.io & SMS Worker" },
  { name: "route-optimization", active: 0, completed: 890, failed: 0, producer: "Claim Event", consumer: "OSRM Logistics Worker" },
  { name: "demand-forecast", active: 0, completed: 124, failed: 0, producer: "Cron Scheduler", consumer: "LightGBM Forecast Worker" }
];

export const MOCK_FEATURE_FLAGS = [
  { id: "ff-01", name: "ai_freshness_visual_ring", enabled: true, rolloutRole: "All Roles", description: "Displays dynamic radial depletion ring around food images" },
  { id: "ff-02", name: "auto_assign_critical_urgency", enabled: true, rolloutRole: "NGO & Admin", description: "Auto-assigns listings with <2h expiry window to top matched NGO" },
  { id: "ff-03", name: "industrial_waste_forecasting", enabled: true, rolloutRole: "Provider & Admin", description: "Predicts food processing unit raw material loss and machine downtime surplus" },
  { id: "ff-04", name: "esg_compliance_export", enabled: true, rolloutRole: "Admin & Provider", description: "Generates CSR/ESG audit reports under Indian Companies Act Sec 135" }
];
