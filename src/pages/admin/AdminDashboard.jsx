import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Building2, Users, Utensils, Gift, Truck, Globe, Eye, ArrowRight, Activity } from 'lucide-react';

export const AdminDashboard = ({ ngos, listings }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Main Header & Elevated Access Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              MoFPI Operations & Super Governance
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Platform <span className="gradient-text">Overview</span>
          </h1>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            System-wide monitoring, NGO credential verification (12A/80G/FCRA), & AI engine oversight.
          </p>
        </div>

        {/* Elevated Permission Environment View Controls */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-card border border-border text-xs font-mono shadow-sm">
          <span className="text-[10px] text-muted-foreground px-2">Elevated Inspection:</span>
          <button
            onClick={() => navigate('/provider/dashboard')}
            className="btn-primary-gold px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>VIEW PROVIDER ENVIRONMENT</span>
          </button>

          <button
            onClick={() => navigate('/ngo/dashboard')}
            className="px-3 py-2 rounded-xl bg-mossVerified text-white font-bold text-xs flex items-center gap-1.5 hover:opacity-90"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>VIEW NGO ENVIRONMENT</span>
          </button>
        </div>
      </div>

      {/* 8 Top Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Registered Providers</span>
          <strong className="text-2xl font-display font-semibold text-foreground">148</strong>
          <span className="text-[10px] text-mossVerified block mt-1">48 Active today</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Registered NGOs</span>
          <strong className="text-2xl font-display font-semibold text-foreground">96</strong>
          <span className="text-[10px] text-mossVerified block mt-1">92 Verified</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Active Food Listings</span>
          <strong className="text-2xl font-display font-semibold text-spiceGold">74</strong>
          <span className="text-[10px] text-spiceGold block mt-1">Live on network</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Food Available</span>
          <strong className="text-2xl font-display font-semibold text-foreground">3,280 kg</strong>
          <span className="text-[10px] text-mossVerified block mt-1">Available for claim</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Active Donations</span>
          <strong className="text-2xl font-display font-semibold text-foreground">42</strong>
          <span className="text-[10px] text-mossVerified block mt-1">Lifecycle active</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Deliveries In Transit</span>
          <strong className="text-2xl font-display font-semibold text-spiceGold">18</strong>
          <span className="text-[10px] text-spiceGold block mt-1">Live GPS routing</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Food Redistributed</span>
          <strong className="text-2xl font-display font-semibold text-mossVerified">28.4 Tons</strong>
          <span className="text-[10px] text-mossVerified block mt-1">Cumulative</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Beneficiaries Reached</span>
          <strong className="text-2xl font-display font-semibold text-mossVerified">52,800</strong>
          <span className="text-[10px] text-mossVerified block mt-1">Nutritious meals</span>
        </div>
      </div>

      {/* Quick Governance Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('/admin/providers')}
          className="premium-card p-6 border-2 border-border hover:border-spiceGold cursor-pointer group shadow-sm"
        >
          <Building2 className="h-8 w-8 text-spiceGold mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-display font-semibold text-lg text-foreground mb-1">Provider Management</h4>
          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
            Monitor registered institutional kitchens, hotels, caterers, & inspect active surplus food listings.
          </p>
        </div>

        <div
          onClick={() => navigate('/admin/ngos')}
          className="premium-card p-6 border-2 border-border hover:border-spiceGold cursor-pointer group shadow-sm"
        >
          <Users className="h-8 w-8 text-mossVerified mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-display font-semibold text-lg text-foreground mb-1">NGO Management & Verification</h4>
          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
            Audit institutional credentials (12A/80G/FCRA/Reg Cert) & grant food claim privileges.
          </p>
        </div>

        <div
          onClick={() => navigate('/admin/deliveries')}
          className="premium-card p-6 border-2 border-border hover:border-spiceGold cursor-pointer group shadow-sm"
        >
          <Globe className="h-8 w-8 text-spiceGold mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-display font-semibold text-lg text-foreground mb-1">Annapurna AI Network Map</h4>
          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
            Interactive map displaying Providers 🍲, NGOs 🤝, and active delivery routes 🚚 across the country.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
