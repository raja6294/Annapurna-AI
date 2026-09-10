import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HeartHandshake, Utensils, CheckCircle2, Clock, MapPin, Search, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import { api } from '../../lib/api';

export const NgoDashboard = ({ listings, onClaimFood }) => {
  const navigate = useNavigate();
  const [featuredOpportunities, setFeaturedOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claimingId, setClaimingId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getFoodOpportunities();
        // Get top 3 matching opportunities
        const opportunities = (res.data || []).slice(0, 3).map((opp) => ({
          id: opp.foodId || opp.listingId,
          title: opp.foodName,
          provider: opp.providerName || 'Unknown Provider',
          quantity: `${opp.quantityKg} kg`,
          foodType: opp.foodType || 'Vegetarian',
          prepTime: opp.preparedAt ? new Date(opp.preparedAt).toLocaleString() : 'Unknown',
          storage: opp.category || 'Standard Storage',
          window: opp.remainingWindow || 'Calculating...',
          distance: `${opp.distance || 0} km`,
          travel: `${opp.estimatedTravelTime || '0'} minutes`,
          matchScore: opp.matchScore || 0,
          urgency: opp.urgency === 'fresh' ? 'LOW' : opp.urgency === 'warning' ? 'MEDIUM' : 'HIGH',
        }));
        setFeaturedOpportunities(opportunities);
      } catch (err) {
        setError(err.message);
        setFeaturedOpportunities([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-sm">{error}</div>
      )}

      {/* Top 5 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Available Food Opportunities</span>
          <strong className="text-2xl font-display font-semibold text-foreground">{featuredOpportunities.length}</strong>
          <span className="text-[10px] text-mossVerified block mt-1">In your area</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Total Available Quantity</span>
          <strong className="text-2xl font-display font-semibold text-foreground">
            {featuredOpportunities.reduce((sum, opp) => sum + parseInt(opp.quantity), 0)} kg
          </strong>
          <span className="text-[10px] text-spiceGold block mt-1">~{Math.round(featuredOpportunities.reduce((sum, opp) => sum + parseInt(opp.quantity), 0) * 2)} meals</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[11px] text-muted-foreground block">Top Match Score</span>
          <strong className="text-2xl font-display font-semibold text-spiceGold">
            {Math.max(...featuredOpportunities.map(o => o.matchScore), 0)}%
          </strong>
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

        {loading ? (
          <div className="p-12 text-center text-muted-foreground font-mono text-sm">
            Loading food opportunities...
          </div>
        ) : featuredOpportunities.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground font-mono text-sm border border-dashed border-border rounded-2xl">
            No food opportunities available right now. Check back soon!
          </div>
        ) : (
          /* Opportunity Cards Grid */
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
                    onClick={() => navigate('/ngo/food-opportunities')}
                    className="flex-1 btn-primary-gold py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm"
                  >
                    CLAIM FOOD
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NgoDashboard;
