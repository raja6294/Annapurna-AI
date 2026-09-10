const API_BASE = import.meta.env.VITE_API_URL || '/api';

const getToken = () => {
  try {
    const raw = localStorage.getItem('annapurna_auth');
    if (!raw) return null;
    return JSON.parse(raw).token;
  } catch {
    return null;
  }
};

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = { ...options.headers };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  } catch (err) {
    // Network-level error (backend unreachable)
    if (err instanceof TypeError) {
      throw new Error(
        'Cannot connect to the backend server. Make sure it is running on port 5000 (cd backend && npm run dev).'
      );
    }
    throw err;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
};

export const api = {
  // Auth
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (payload) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  getMe: () => request('/auth/me'),
  logout: () => request('/auth/logout', { method: 'POST' }),

  // Provider
  getProviderDashboard: () => request('/provider/dashboard'),
  getProviderPickups: () => request('/provider/pickups'),
  getProviderPickup: (id) => request(`/provider/pickups/${id}`),

  // Foods
  createFood: (formData) =>
    request('/foods', { method: 'POST', body: formData }),
  getMyFoods: () => request('/foods/my'),
  getFood: (id) => request(`/foods/${id}`),
  makeFoodAvailable: (id) =>
    request(`/foods/${id}/available`, { method: 'PATCH' }),

  // AI Assessment (existing — by food listing ID)
  assessFood: (foodId) =>
    request(`/ai/assess/${foodId}`, { method: 'POST' }),

  // Food Image Scanning (new — direct image upload + Gemini analysis)
  uploadFoodImages: (formData) =>
    request('/food-scans/upload', { method: 'POST', body: formData }),
  analyzeFoodImages: (payload) =>
    request('/food-scans/analyze', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Matching
  getMatches: (foodId) => request(`/matching/food/${foodId}`),

  // NGO
  getNgoDashboard: () => request('/ngo/dashboard'),
  getFoodOpportunities: () => request('/ngo/food-opportunities'),
  acceptOffer: (foodId, quantityAccepted) =>
    request(`/offers/${foodId}/accept`, {
      method: 'POST',
      body: JSON.stringify({ quantityAccepted }),
    }),
  getNgoDistributions: () => request('/ngo/distribution'),
  updateDistribution: (id, payload) =>
    request(`/ngo/distribution/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  // Pickups
  confirmHandover: (pickupId) =>
    request(`/pickups/${pickupId}/handover`, { method: 'POST' }),
  updatePickupStatus: (pickupId, payload) =>
    request(`/pickups/${pickupId}/status`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
  getPickupRoute: (pickupId) => request(`/pickups/${pickupId}/route`),
  getPickupLiveLocation: (pickupId) => request(`/pickups/${pickupId}/live-location`),

  // Admin
  getAdminDashboard: () => request('/admin/dashboard'),
  getAdminProviders: () => request('/admin/providers'),
  getAdminNgos: () => request('/admin/ngos'),
  getAdminFoods: () => request('/admin/foods'),
  getAdminOffers: () => request('/admin/offers'),
  getAdminPickups: () => request('/admin/pickups'),
  getAdminAnalytics: () => request('/admin/analytics'),
  updateNgoVerification: (ngoId, verificationStatus) =>
    request(`/admin/ngos/${ngoId}/verification`, {
      method: 'PATCH',
      body: JSON.stringify({ verificationStatus }),
    }),

  // Notifications
  getNotifications: () => request('/notifications'),
};

export default api;
