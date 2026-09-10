import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthModal } from './components/AuthModal';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Footer } from './components/Footer';

// Provider Pages (only the 2 portal features per spec)
import RegisterSurplusPage from './pages/provider/RegisterSurplusPage';
import ProviderDeliveriesPage from './pages/provider/ProviderDeliveriesPage';

// NGO Pages
import NgoDashboard from './pages/ngo/NgoDashboard';
import NgoOpportunitiesPage from './pages/ngo/NgoOpportunitiesPage';
import NgoRequirementsPage from './pages/ngo/NgoRequirementsPage';
import NgoMatchesPage from './pages/ngo/NgoMatchesPage';
import NgoIncomingPage from './pages/ngo/NgoIncomingPage';
import NgoDeliveriesPage from './pages/ngo/NgoDeliveriesPage';
import NgoDistributionPage from './pages/ngo/NgoDistributionPage';
import NgoHistoryPage from './pages/ngo/NgoHistoryPage';
import NgoBeneficiariesPage from './pages/ngo/NgoBeneficiariesPage';
import NgoImpactPage from './pages/ngo/NgoImpactPage';
import NgoSettingsPage from './pages/ngo/NgoSettingsPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProvidersPage from './pages/admin/AdminProvidersPage';
import AdminNgosPage from './pages/admin/AdminNgosPage';
import AdminListingsPage from './pages/admin/AdminListingsPage';
import AdminDonationsPage from './pages/admin/AdminDonationsPage';
import AdminDeliveriesPage from './pages/admin/AdminDeliveriesPage';
import AdminAiMonitoringPage from './pages/admin/AdminAiMonitoringPage';
import AdminMatchingPage from './pages/admin/AdminMatchingPage';
import AdminImpactPage from './pages/admin/AdminImpactPage';
import AdminAuditLogsPage from './pages/admin/AdminAuditLogsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Data & Auth Helpers
import { INITIAL_LISTINGS, MOCK_NGOS, SYSTEM_STATS } from './data/mockData';
import { getStoredAuth, clearStoredAuth, authenticateUser } from './lib/auth';

const AppContent = () => {
  const navigate = useNavigate();

  // Central Auth Session
  const [authSession, setAuthSession] = useState(() => getStoredAuth());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [targetAuthRole, setTargetAuthRole] = useState('provider');

  // Shared Data State
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [ngos, setNgos] = useState(MOCK_NGOS);
  const [stats, setStats] = useState(SYSTEM_STATS);
  const [selectedListing, setSelectedListing] = useState(INITIAL_LISTINGS[0]);

  // Auth Handlers
  const handleOpenAuthModal = (role = 'provider') => {
    setTargetAuthRole(role);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (sessionData) => {
    setAuthSession(sessionData);
    setIsAuthModalOpen(false);

    const userRole = sessionData.user?.role?.toLowerCase();
    if (userRole === 'admin') navigate('/admin/dashboard');
    else if (userRole === 'ngo') navigate('/ngo/dashboard');
    else navigate('/provider/register-surplus');
  };

  const handleLogout = () => {
    clearStoredAuth();
    setAuthSession(null);
    navigate('/');
  };

  const currentUser = authSession?.user;

  // Add listing handler
  const handleAddNewListing = (newListing) => {
    setListings([newListing, ...listings]);
    setSelectedListing(newListing);
    setStats((prev) => ({
      ...prev,
      totalFoodRescuedKg: prev.totalFoodRescuedKg + newListing.quantityKg,
      totalMealsServed: prev.totalMealsServed + newListing.portions,
      co2PreventedKg: prev.co2PreventedKg + Math.round(newListing.quantityKg * 2.5),
      methanePreventedKg: prev.methanePreventedKg + Math.round(newListing.quantityKg * 0.3),
    }));
  };

  const handleApproveNgo = (ngoId) => {
    setNgos(
      ngos.map((ngo) =>
        ngo.id === ngoId ? { ...ngo, verificationStatus: 'verified' } : ngo
      )
    );
  };

  const handleRejectNgo = (ngoId) => {
    setNgos(
      ngos.map((ngo) =>
        ngo.id === ngoId ? { ...ngo, verificationStatus: 'rejected' } : ngo
      )
    );
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col justify-between">
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialRole={targetAuthRole}
      />

      <main className="flex-grow">
        <Routes>
          {/* 1. ROLE GATEWAY LANDING PAGE */}
          <Route
            path="/"
            element={<LandingPage onOpenAuthModal={handleOpenAuthModal} />}
          />
          <Route
            path="/role-selection"
            element={<LandingPage onOpenAuthModal={handleOpenAuthModal} />}
          />

          {/* 2. FOOD PROVIDER PORTAL ROUTES */}
          <Route
            path="/provider"
            element={<Navigate to="/provider/register-surplus" replace />}
          />
          <Route
            path="/provider/*"
            element={
              <ProtectedRoute currentUser={currentUser} allowedRoles={['provider']}>
                <DashboardLayout currentUser={currentUser} onLogout={handleLogout} role="provider">
                  <Routes>
                    {/* Provider ONLY has 2 features per spec: Register Surplus + Pickup & Delivery */}
                    <Route path="register-surplus" element={<RegisterSurplusPage listings={listings} onAddNewListing={handleAddNewListing} />} />
                    <Route path="deliveries" element={<ProviderDeliveriesPage />} />
                    {/* Catch-all: redirect any unrecognised provider sub-route to register-surplus */}
                    <Route path="*" element={<Navigate to="/provider/register-surplus" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* 3. NGO RECEIVER PORTAL ROUTES */}
          <Route
            path="/ngo"
            element={<Navigate to="/ngo/dashboard" replace />}
          />
          <Route
            path="/ngo/*"
            element={
              <ProtectedRoute currentUser={currentUser} allowedRoles={['ngo']}>
                <DashboardLayout currentUser={currentUser} onLogout={handleLogout} role="ngo">
                  <Routes>
                    <Route path="dashboard" element={<NgoDashboard listings={listings} />} />
                    <Route path="food-opportunities" element={<NgoOpportunitiesPage listings={listings} />} />
                    <Route path="requirements" element={<NgoRequirementsPage />} />
                    <Route path="requests" element={<NgoMatchesPage />} />
                    <Route path="incoming" element={<NgoIncomingPage />} />
                    <Route path="deliveries" element={<NgoDeliveriesPage />} />
                    <Route path="distribution" element={<NgoDistributionPage />} />
                    <Route path="history" element={<NgoHistoryPage />} />
                    <Route path="beneficiaries" element={<NgoBeneficiariesPage />} />
                    <Route path="impact" element={<NgoImpactPage />} />
                    <Route path="settings" element={<NgoSettingsPage />} />
                    <Route path="*" element={<Navigate to="/ngo/dashboard" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* 4. ADMIN GOVERNANCE PORTAL ROUTES */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute currentUser={currentUser} allowedRoles={['admin']}>
                <DashboardLayout currentUser={currentUser} onLogout={handleLogout} role="admin">
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard ngos={ngos} listings={listings} />} />
                    <Route path="providers" element={<AdminProvidersPage />} />
                    <Route path="ngos" element={<AdminNgosPage ngos={ngos} setNgos={setNgos} onApproveNgo={handleApproveNgo} onRejectNgo={handleRejectNgo} />} />
                    <Route path="food-listings" element={<AdminListingsPage listings={listings} />} />
                    <Route path="donations" element={<AdminDonationsPage />} />
                    <Route path="deliveries" element={<AdminDeliveriesPage listings={listings} />} />
                    <Route path="ai-monitoring" element={<AdminAiMonitoringPage />} />
                    <Route path="matching" element={<AdminMatchingPage />} />
                    <Route path="analytics" element={<AdminImpactPage stats={stats} />} />
                    <Route path="impact" element={<AdminImpactPage stats={stats} />} />
                    <Route path="audit-logs" element={<AdminAuditLogsPage />} />
                    <Route path="settings" element={<AdminSettingsPage />} />
                    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* FALLBACK ROUTE */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer on Landing Page */}
      <Footer />
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
