import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UtensilsCrossed, PlusCircle, ArrowRight, Sparkles, CheckCircle2, Clock, MapPin, TrendingUp, AlertTriangle, ShieldCheck, Box } from 'lucide-react';

export const ProviderDashboard = ({ listings, onSelectListing }) => {
  const navigate = useNavigate();

  const mockTableData = [
    { id: 'FOOD-2026-001', name: 'Paneer Butter Masala', quantity: '50 kg', aiStatus: 'Good (94%)', match: '3 NGOs', status: 'Available', window: '4h 10m' },
    { id: 'FOOD-2026-002', name: 'Steamed Rice', quantity: '30 kg', aiStatus: 'Good (96%)', match: '2 NGOs', status: 'Matched', window: '5h 30m' },
    { id: 'FOOD-2026-003', name: 'Vegetable Curry', quantity: '20 kg', aiStatus: 'Review (82%)', match: '1 NGO', status: 'Pending', window: '2h 15m' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
              Taj Grand Kitchens & Banquet
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Food Provider <span className="gradient-text">Executive Dashboard</span>
          </h1>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            Real-time surplus management, neural vision quality inspection, & NGO recipient matching.
          </p>
        </div>

        <button
          onClick={() => navigate('/provider/register-surplus')}
          className="btn-primary-gold px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Register Surplus Food</span>
        </button>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Surplus Available</span>
          <strong className="text-2xl font-display font-semibold text-foreground">50 kg</strong>
          <span className="text-[10px] text-spiceGold block mt-1">Ready for pickup</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Active Listings</span>
          <strong className="text-2xl font-display font-semibold text-foreground">12</strong>
          <span className="text-[10px] text-mossVerified block mt-1">Live on network</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Pending Matches</span>
          <strong className="text-2xl font-display font-semibold text-amber-500">4</strong>
          <span className="text-[10px] text-muted-foreground block mt-1">NGOs reviewing</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Redistributed</span>
          <strong className="text-2xl font-display font-semibold text-mossVerified">1,280 kg</strong>
          <span className="text-[10px] text-mossVerified block mt-1">This month</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Donations Completed</span>
          <strong className="text-2xl font-display font-semibold text-foreground">84</strong>
          <span className="text-[10px] text-mossVerified block mt-1">100% verified</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Waste Avoided</span>
          <strong className="text-2xl font-display font-semibold text-spiceGold">1.28 tons</strong>
          <span className="text-[10px] text-spiceGold block mt-1">CO₂ reduced</span>
        </div>
      </div>

      {/* Recent Food Listings Table */}
      <div className="premium-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">Recent Food Listings</h3>
            <p className="text-xs text-muted-foreground font-mono">Live surplus items submitted from your kitchen</p>
          </div>
          <Link to="/provider/food-listings" className="text-xs font-mono font-bold text-spiceGold hover:underline flex items-center gap-1">
            <span>View All Listings ({listings.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase text-[10px]">
                <th className="py-3 px-3">Listing ID</th>
                <th className="py-3 px-3">Food Item</th>
                <th className="py-3 px-3 text-right">Quantity</th>
                <th className="py-3 px-3">AI Quality Status</th>
                <th className="py-3 px-3">Redistribution Window</th>
                <th className="py-3 px-3">Matched Recipient</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground">
              {mockTableData.map((row) => (
                <tr key={row.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-spiceGold">{row.id}</td>
                  <td className="py-3 px-3 font-sans font-semibold">{row.name}</td>
                  <td className="py-3 px-3 text-right font-bold">{row.quantity}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-mossVerified/10 text-mossVerified font-bold">
                      ✓ {row.aiStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-amber-600 dark:text-amber-400 font-bold">{row.window}</td>
                  <td className="py-3 px-3">{row.match}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-spiceGold/10 text-spiceGold font-bold">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('/provider/register-surplus')}
          className="premium-card p-6 border-2 border-border hover:border-spiceGold cursor-pointer group shadow-md"
        >
          <PlusCircle className="h-8 w-8 text-spiceGold mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-display font-semibold text-lg text-foreground mb-1">1. Register Surplus Food</h4>
          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
            Post surplus meals, select preparation time, set container temperature sensor data, & trigger AI assessment.
          </p>
        </div>

        <div
          onClick={() => navigate('/provider/matches')}
          className="premium-card p-6 border-2 border-border hover:border-spiceGold cursor-pointer group shadow-md"
        >
          <Sparkles className="h-8 w-8 text-mossVerified mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-display font-semibold text-lg text-foreground mb-1">2. AI Recipient Matching</h4>
          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
            View multi-factor NGO recommendations based on proximity, capacity, urgency, and compatibility.
          </p>
        </div>

        <div
          onClick={() => navigate('/provider/analytics')}
          className="premium-card p-6 border-2 border-border hover:border-spiceGold cursor-pointer group shadow-md"
        >
          <TrendingUp className="h-8 w-8 text-spiceGold mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-display font-semibold text-lg text-foreground mb-1">3. Upstream Industrial Forecast</h4>
          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
            Predict kitchen and processing unit overproduction raw material loss with LightGBM time-series ML models.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
