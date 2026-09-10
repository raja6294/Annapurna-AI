import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HeartHandshake, Utensils, CheckCircle2, Clock, MapPin, Search, ArrowRight, ShieldCheck, Filter } from 'lucide-react';

export const NgoDashboard = ({ listings, onClaimFood }) => {
  const navigate = useNavigate();

  const featuredOpportunities = [
    {
      id: 'FOOD-2026-001',
      title: 'Paneer Butter Masala + Steamed Rice',
      provider: 'Taj Grand Kitchens & Banquet',
      quantity: '50 kg',
      foodType: 'Vegetarian',
      prepTime: '1.5 hours ago',
      storage: 'Insulated Thermal Cases',
      window: '4h 10m',
      distance: '4.2 km',
      travel: '22 minutes',
      matchScore: 96,
      urgency: 'HIGH',
    },
    {
      id: 'FOOD-2026-002',
      title: 'Vegetable Pulao & Dal Makhani',
      provider: 'Apex Food Processing Canteen',
      quantity: '80 kg',
      foodType: 'Vegetarian',
      prepTime: '2 hours ago',
      storage: 'Stainless Steel Hot Boxes',
      window: '3h 40m',
      distance: '6.8 km',
      travel: '28 minutes',
      matchScore: 91,
      urgency: 'HIGH',
    },
    {
      id: 'FOOD-2026-003',
      title: 'Dal + Rice & Assorted Roti',
      provider: 'Oberoi Catering Services',
      quantity: '35 kg',
      foodType: 'Vegetarian',
      prepTime: '1 hour ago',
      storage: 'Chilled Insulated Trays',
      window: '5h 15m',
      distance: '2.4 km',
      travel: '12 minutes',
      matchScore: 87,
      urgency: 'MEDIUM',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main Header Title & Subheading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Hope Welfare Centre
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Food Opportunities <span className="gradient-text">Near You</span>
          </h1>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            Find surplus food that matches your current community needs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/ngo/requirements')}
            className="btn-primary-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm"
          >
            <span>+ Post Food Need</span>
          </button>
        </div>
      </div>

      {/* Top 5 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Available Food Opportunities</span>
          <strong className="text-2xl font-display font-semibold text-foreground">24</strong>
          <span className="text-[10px] text-mossVerified block mt-1">In 10 km radius</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Total Available Quantity</span>
          <strong className="text-2xl font-display font-semibold text-foreground">1,240 kg</strong>
          <span className="text-[10px] text-spiceGold block mt-1">~2,480 meals</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Matching Your Requirements</span>
          <strong className="text-2xl font-display font-semibold text-spiceGold">8</strong>
          <span className="text-[10px] text-spiceGold block mt-1">High compatibility</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Incoming Donations</span>
          <strong className="text-2xl font-display font-semibold text-foreground">5</strong>
          <span className="text-[10px] text-mossVerified block mt-1">Driver en route</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm col-span-2 lg:col-span-1">
          <span className="text-[11px] text-muted-foreground block">Beneficiaries Supported</span>
          <strong className="text-2xl font-display font-semibold text-mossVerified">680</strong>
          <span className="text-[10px] text-mossVerified block mt-1">Active shelter meals</span>
        </div>
      </div>

      {/* Food Opportunities Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-semibold text-foreground">
            Top Matched Food Opportunities
          </h2>
          <Link to="/ngo/food-opportunities" className="text-xs font-mono font-bold text-spiceGold hover:underline flex items-center gap-1">
            <span>Browse All Opportunities</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Opportunity Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opp) => (
            <div key={opp.id} className="premium-card p-6 flex flex-col justify-between border-2 border-border hover:border-spiceGold transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-spiceGold/10 text-spiceGold font-mono text-xs font-bold">
                    Match: {opp.matchScore}%
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brickUrgency/10 text-brickUrgency font-mono text-[10px] font-bold">
                    {opp.urgency} URGENCY
                  </span>
                </div>

                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  🍛 {opp.title}
                </h3>
                <p className="text-xs text-muted-foreground font-mono mb-4">
                  Provider: <strong>{opp.provider}</strong>
                </p>

                <div className="space-y-2 font-mono text-xs text-muted-foreground mb-6">
                  <div className="flex justify-between border-b border-border/60 pb-1.5">
                    <span>Available Quantity:</span>
                    <strong className="text-foreground">{opp.quantity}</strong>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-1.5">
                    <span>Food Type:</span>
                    <strong className="text-mossVerified">{opp.foodType}</strong>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-1.5">
                    <span>Prepared:</span>
                    <span>{opp.prepTime}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-1.5">
                    <span>Storage:</span>
                    <span>{opp.storage}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-1.5">
                    <span>Redistribution Window:</span>
                    <strong className="text-spiceGold">{opp.window}</strong>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-1.5">
                    <span>Distance:</span>
                    <strong className="text-foreground">{opp.distance}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Travel:</span>
                    <span>{opp.travel}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => navigate('/ngo/food-opportunities')}
                  className="flex-1 py-3 rounded-xl border border-border text-foreground hover:bg-muted font-mono font-bold text-xs"
                >
                  VIEW DETAILS
                </button>
                <button
                  onClick={() => navigate('/ngo/incoming')}
                  className="flex-1 btn-primary-gold py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  CLAIM FOOD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NgoDashboard;
