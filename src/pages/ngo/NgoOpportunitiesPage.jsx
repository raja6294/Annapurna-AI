import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, CheckCircle2, Clock, MapPin, HeartHandshake, ShieldAlert } from 'lucide-react';

export const NgoOpportunitiesPage = ({ listings }) => {
  const navigate = useNavigate();

  // Filters State
  const [filterFoodType, setFilterFoodType] = useState('All');
  const [filterQuantity, setFilterQuantity] = useState('All');
  const [filterDistance, setFilterDistance] = useState('All');
  const [filterUrgency, setFilterUrgency] = useState('All');
  const [filterMatchScore, setFilterMatchScore] = useState('All');

  const opportunities = [
    {
      id: 'FOOD-2026-001',
      title: 'Paneer Butter Masala + Steamed Rice',
      provider: 'Taj Grand Kitchens & Banquet',
      quantityKg: 50,
      foodType: 'Vegetarian',
      prepTime: '1.5 hours ago',
      storage: 'Insulated Thermal Cases',
      window: '4h 10m',
      distanceKm: 4.2,
      travelTime: '22 minutes',
      matchScore: 96,
      urgency: 'HIGH',
      location: 'Connaught Place, Central Delhi'
    },
    {
      id: 'FOOD-2026-002',
      title: 'Vegetable Pulao & Dal Makhani',
      provider: 'Apex Food Processing Canteen',
      quantityKg: 80,
      foodType: 'Vegetarian',
      prepTime: '3.5 hours ago',
      storage: 'Stainless Steel Hot Boxes',
      window: '1h 50m',
      distanceKm: 6.8,
      travelTime: '28 minutes',
      matchScore: 91,
      urgency: 'CRITICAL',
      location: 'Okhla Industrial Area, New Delhi'
    },
    {
      id: 'FOOD-2026-003',
      title: 'Fresh Surplus Tomatoes & Spinach',
      provider: 'Green Valley Organic Harvest',
      quantityKg: 120,
      foodType: 'Raw Produce',
      prepTime: 'Harvested 08:00 AM',
      storage: 'Ventilated Produce Crates',
      window: '24h 00m',
      distanceKm: 2.4,
      travelTime: '12 minutes',
      matchScore: 87,
      urgency: 'LOW',
      location: 'Azadpur Mandi, North Delhi'
    },
    {
      id: 'FOOD-2026-004',
      title: 'Steamed Vegetable Dumplings (Momos)',
      provider: 'Oberoi Catering Services',
      quantityKg: 35,
      foodType: 'Bakery & Snacks',
      prepTime: '2 hours ago',
      storage: 'Chilled Insulated Tray',
      window: '3h 12m',
      distanceKm: 1.5,
      travelTime: '8 minutes',
      matchScore: 98,
      urgency: 'HIGH',
      location: 'Karol Bagh, Central Delhi'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
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

      {/* Filter Controls Bar */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <Filter className="h-4 w-4 text-spiceGold" />
          <span>Filter Opportunities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[10px] text-muted-foreground mb-1">Food Type</label>
            <select
              value={filterFoodType}
              onChange={(e) => setFilterFoodType(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground"
            >
              <option value="All">All Types</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Bakery">Bakery & Snacks</option>
              <option value="Raw Produce">Raw Produce</option>
              <option value="Cooked Meals">Cooked Meals</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-muted-foreground mb-1">Quantity</label>
            <select
              value={filterQuantity}
              onChange={(e) => setFilterQuantity(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground"
            >
              <option value="All">All Quantities</option>
              <option value="lt10">&lt;10 kg</option>
              <option value="10-25">10–25 kg</option>
              <option value="25-50">25–50 kg</option>
              <option value="gt50">50+ kg</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-muted-foreground mb-1">Distance</label>
            <select
              value={filterDistance}
              onChange={(e) => setFilterDistance(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground"
            >
              <option value="All">Any Distance</option>
              <option value="lt2">&lt;2 km</option>
              <option value="lt5">&lt;5 km</option>
              <option value="lt10">&lt;10 km</option>
              <option value="lt20">&lt;20 km</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-muted-foreground mb-1">Urgency</label>
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground"
            >
              <option value="All">All Urgency</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-muted-foreground mb-1">Match Score</label>
            <select
              value={filterMatchScore}
              onChange={(e) => setFilterMatchScore(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground"
            >
              <option value="All">All Scores</option>
              <option value="90">90%+</option>
              <option value="80">80%+</option>
              <option value="70">70%+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {opportunities.map((opp) => (
          <div key={opp.id} className="premium-card p-6 flex flex-col justify-between border-2 border-border hover:border-spiceGold transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="tech-badge">{opp.id}</span>
                <span className="px-3 py-1 rounded-full bg-spiceGold/10 text-spiceGold font-mono text-xs font-bold">
                  {opp.matchScore}% Requirement Match
                </span>
              </div>

              <h3 className="font-display font-semibold text-xl text-foreground mb-1">🍛 {opp.title}</h3>
              <p className="text-xs text-muted-foreground font-mono mb-4">Food Provider: <strong>{opp.provider}</strong> ({opp.location})</p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-muted-foreground mb-6">
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                  <span className="text-[10px] block text-muted-foreground">Available Quantity</span>
                  <strong className="text-foreground text-sm font-bold">{opp.quantityKg} kg</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                  <span className="text-[10px] block text-muted-foreground">Redistribution Window</span>
                  <strong className="text-spiceGold text-sm font-bold">{opp.window}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                  <span className="text-[10px] block text-muted-foreground">Distance</span>
                  <strong className="text-foreground">{opp.distanceKm} km</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                  <span className="text-[10px] block text-muted-foreground">Estimated Travel</span>
                  <strong className="text-foreground">{opp.travelTime}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => alert(`Details for ${opp.title}: Storage: ${opp.storage}, Prepared: ${opp.prepTime}`)}
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
  );
};

export default NgoOpportunitiesPage;
