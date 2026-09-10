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

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

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

  // AI
  assessFood: (foodId) =>
    request(`/ai/assess/${foodId}`, { method: 'POST' }),

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
