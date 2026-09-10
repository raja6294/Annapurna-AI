import { api } from './api';

export const MOCK_USERS = {
  provider: {
    email: 'provider@tajkitchens.com',
    password: 'password123',
    role: 'provider',
  },
  ngo: {
    email: 'ngo@akshayashelter.org',
    password: 'password123',
    role: 'ngo',
  },
  ngo_unverified: {
    email: 'janseva.delhi@gmail.com',
    password: 'password123',
    role: 'ngo',
  },
  admin: {
    email: 'admin@mofpi.gov.in',
    password: 'password123',
    role: 'admin',
  },
};

const formatUser = (user, profile) => ({
  id: user.id || user._id,
  email: user.email,
  name: user.name,
  role: user.role?.toLowerCase(),
  phone: user.phone,
  profile,
  verificationStatus: profile?.verificationStatus?.toLowerCase() || 'verified',
  location: profile?.address || profile?.city,
  providerType: profile?.organizationType,
  ngoType: profile?.organizationName,
  badge: profile?.verificationStatus === 'VERIFIED' ? 'Verified Provider' : 'Standard',
});

export const authenticateUser = async (email, password) => {
  try {
    const response = await api.login(email, password);
    const { token, user } = response.data;
    const sessionData = {
      token,
      user: formatUser(user, user.profile),
    };
    localStorage.setItem('annapurna_auth', JSON.stringify(sessionData));
    return sessionData;
  } catch (error) {
    // fetch() throws TypeError "Failed to fetch" on ECONNREFUSED / offline backend
    const isNetworkError =
      error instanceof TypeError ||
      error.message?.includes('Failed to fetch') ||
      error.message?.includes('NetworkError') ||
      error.message?.includes('ECONNREFUSED') ||
      error.message?.includes('Load failed');
    if (isNetworkError) {
      const mockKey = Object.keys(MOCK_USERS).find(
        (key) => MOCK_USERS[key].email.toLowerCase() === email.toLowerCase() && MOCK_USERS[key].password === password
      );
      if (mockKey) {
        const MOCK_NAMES = {
          provider: 'Taj Grand Kitchens & Banquet',
          ngo: 'Akshaya Shelter Foundation',
          ngo_unverified: 'Jan Seva Society (Unverified)',
          admin: 'MoFPI Platform Admin',
        };
        const mockUser = {
          id: `mock_${mockKey}`,
          email: MOCK_USERS[mockKey].email,
          name: MOCK_NAMES[mockKey] || mockKey,
          role: MOCK_USERS[mockKey].role,
          phone: '+91 99999 99999',
          profile: {
            organizationName: MOCK_NAMES[mockKey] || mockKey,
            organizationType: mockKey === 'provider' ? 'Institutional Kitchen' : undefined,
            verificationStatus: mockKey === 'ngo_unverified' ? 'PENDING' : 'VERIFIED',
            address: 'New Delhi',
          },
        };
        const sessionData = {
          token: `mock_token_${mockKey}`,
          user: formatUser(mockUser, mockUser.profile),
        };
        localStorage.setItem('annapurna_auth', JSON.stringify(sessionData));
        return sessionData;
      }
    }
    throw error;
  }
};

export const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem('annapurna_auth');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setStoredAuth = (sessionData) => {
  localStorage.setItem('annapurna_auth', JSON.stringify(sessionData));
};

export const clearStoredAuth = () => {
  localStorage.removeItem('annapurna_auth');
};

export const refreshAuth = async () => {
  try {
    const response = await api.getMe();
    const session = getStoredAuth();
    if (session?.token) {
      const updated = {
        token: session.token,
        user: formatUser(response.data, response.data.profile),
      };
      setStoredAuth(updated);
      return updated;
    }
    return null;
  } catch (error) {
    const session = getStoredAuth();
    if (session?.token?.startsWith('mock_token_')) {
      return session;
    }
    return null;
  }
};
