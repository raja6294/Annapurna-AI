import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { api } from '../../lib/api';

export const NgoOpportunitiesPage = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claimingId, setClaimingId] = useState(null);

  const [filterFoodType, setFilterFoodType] = useState('All');
  const [filterQuantity, setFilterQuantity] = useState('All');
  const [filterDistance, setFilterDistance] = useState('All');
  const [filterUrgency, setFilterUrgency] = useState('All');
  const [filterMatchScore, setFilterMatchScore] = useState('All');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getFoodOpportunities();
        setOpportunities(res.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = opportunities.filter((opp) => {
    if (filterFoodType !== 'All' && !opp.foodType?.includes(filterFoodType.toUpperCase().replace('-', '_'))) {
      if (filterFoodType === 'Vegetarian' && opp.foodType !== 'VEGETARIAN') return false;
    }
    if (filterUrgency !== 'All' && opp.urgency !== filterUrgency) return false;
    if (filterMatchScore !== 'All' && (opp.matchScore || 0) < Number(filterMatchScore)) return false;
    if (filterDistance === 'lt5' && (opp.distance || 999) >= 5) return false;
    if (filterQuantity === '25-50' && (opp.quantityKg < 25 || opp.quantityKg > 50)) return false;
    return true;
  });

  const handleClaim = async (foodId) => {
    setClaimingId(foodId);
    setError(null);
    try {
      await api.acceptOffer(foodId);
      navigate('/ngo/incoming');
    } catch (err) {
      setError(err.message);
    } finally {
      setClaimingId(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground font-mono text-sm">Loading food opportunities...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Surplus Redistribution Directory
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Available Food <span className="gradient-text">Opportunities</span>
          </h1>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-sm">{error}</div>
      )}

      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <Filter className="h-4 w-4 text-spiceGold" />
          <span>Filter Opportunities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[10px] text-muted-foreground mb-1">Food Type</label>
            <select value={filterFoodType} onChange={(e) => setFilterFoodType(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground">
              <option value="All">All Types</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-muted-foreground mb-1">Quantity</label>
            <select value={filterQuantity} onChange={(e) => setFilterQuantity(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground">
              <option value="All">All Quantities</option>
              <option value="25-50">25–50 kg</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-muted-foreground mb-1">Distance</label>
            <select value={filterDistance} onChange={(e) => setFilterDistance(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground">
              <option value="All">Any Distance</option>
              <option value="lt5">&lt;5 km</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-muted-foreground mb-1">Urgency</label>
            <select value={filterUrgency} onChange={(e) => setFilterUrgency(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground">
              <option value="All">All Urgency</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-muted-foreground mb-1">Match Score</label>
            <select value={filterMatchScore} onChange={(e) => setFilterMatchScore(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground">
              <option value="All">All Scores</option>
              <option value="90">90%+</option>
              <option value="80">80%+</option>
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground font-mono text-sm border border-dashed border-border rounded-2xl">
          No available food opportunities right now. Check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((opp) => (
            <div key={opp.foodId} className="premium-card p-6 flex flex-col justify-between border-2 border-border hover:border-spiceGold transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="tech-badge">{opp.listingId || opp.foodId}</span>
                  <span className="px-3 py-1 rounded-full bg-spiceGold/10 text-spiceGold font-mono text-xs font-bold">
                    {opp.matchScore || 0}% Requirement Match
                  </span>
                </div>

                <h3 className="font-display font-semibold text-xl text-foreground mb-1">🍛 {opp.foodName}</h3>
                <p className="text-xs text-muted-foreground font-mono mb-4">
                  Food Provider: <strong>{opp.providerName}</strong> ({opp.city})
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-muted-foreground mb-6">
                  <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                    <span className="text-[10px] block text-muted-foreground">Available Quantity</span>
                    <strong className="text-foreground text-sm font-bold">{opp.quantityKg} kg</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                    <span className="text-[10px] block text-muted-foreground">Redistribution Window</span>
                    <strong className="text-spiceGold text-sm font-bold">{opp.remainingWindow}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                    <span className="text-[10px] block text-muted-foreground">Distance</span>
                    <strong className="text-foreground">{opp.distance} km</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                    <span className="text-[10px] block text-muted-foreground">Estimated Travel</span>
                    <strong className="text-foreground">{opp.estimatedTravelTime}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <button
                  onClick={() => alert(`Redistributability Score: ${opp.redistributabilityScore}\nUrgency: ${opp.urgency}`)}
                  className="flex-1 py-3 rounded-xl border border-border text-foreground hover:bg-muted font-mono font-bold text-xs"
                >
                  VIEW DETAILS
                </button>
                <button
                  onClick={() => handleClaim(opp.foodId)}
                  disabled={claimingId === opp.foodId}
                  className="flex-1 btn-primary-gold py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm disabled:opacity-50"
                >
                  {claimingId === opp.foodId ? 'CLAIMING...' : 'CLAIM FOOD'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NgoOpportunitiesPage;
