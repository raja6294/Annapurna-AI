// Fake JWT Authentication Helper for Annapurna AI Prototype

const JWT_SECRET = "annapurna_sih2026_secret_key_demo";

// Pre-configured mock credentials for the 3 Roles
export const MOCK_USERS = {
  provider: {
    id: "USR-PROV-001",
    email: "provider@tajkitchens.com",
    password: "password123",
    name: "Taj Grand Kitchens & Banquet",
    role: "provider",
    providerType: "Institutional Kitchen / Hotel",
    badge: "Verified Provider",
    location: "Connaught Place, Central Delhi"
  },
  ngo: {
    id: "USR-NGO-101",
    email: "ngo@akshayashelter.org",
    password: "password123",
    name: "Akshaya Shelter Foundation",
    role: "ngo",
    ngoType: "Children & Women Welfare Centre",
    verificationStatus: "verified",
    location: "Karol Bagh, New Delhi"
  },
  ngo_unverified: {
    id: "USR-NGO-104",
    email: "janseva@homelessshelter.org",
    password: "password123",
    name: "Jan Seva Community Shelter (Unverified)",
    role: "ngo",
    ngoType: "Urban Homeless Shelter",
    verificationStatus: "pending_verification",
    location: "Yamuna Pushta, East Delhi"
  },
  admin: {
    id: "USR-ADM-001",
    email: "admin@mofpi.gov.in",
    password: "password123",
    name: "MoFPI Platform Admin",
    role: "admin",
    department: "Ministry of Food Processing Industries",
    clearanceLevel: "Super Moderator"
  }
};

// Base64 helper for fake JWT simulation
const base64UrlEncode = (str) => {
  return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

export const createFakeJwt = (user) => {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    verificationStatus: user.verificationStatus || 'active',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400 // 24 hours
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = base64UrlEncode(`sig_${user.id}_${Date.now()}`);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const authenticateUser = (email, password, selectedRole = 'provider') => {
  let matchedUser = Object.values(MOCK_USERS).find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );

  // Fallback to role preset if email doesn't strictly match
  if (!matchedUser) {
    matchedUser = MOCK_USERS[selectedRole] || MOCK_USERS.provider;
  }

  const token = createFakeJwt(matchedUser);
  const sessionData = {
    token,
    user: matchedUser
  };

  localStorage.setItem('annapurna_auth', JSON.stringify(sessionData));
  return sessionData;
};

export const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem('annapurna_auth');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const setStoredAuth = (sessionData) => {
  localStorage.setItem('annapurna_auth', JSON.stringify(sessionData));
};

export const clearStoredAuth = () => {
  localStorage.removeItem('annapurna_auth');
};
