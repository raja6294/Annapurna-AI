import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake, CheckCircle2, MapPin, Clock, ShieldCheck, ArrowRight, Sparkles, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProviderMatchesPage = ({ listings, onSelectListing }) => {
  const navigate = useNavigate();

  const [matchedNgos, setMatchedNgos] = useState([
    {
      id: "NGO-101",
      name: "Hope Welfare Centre",
      matchScore: 96,
      distanceKm: 4.2,
      requiredKg: 40,
      providerKg: 50,
      capacity: "Available (180 meals/day)",
      compatibility: "Excellent (Vegetarian Cooked)",
      travelMinutes: 22,
      windowStatus: "Suitable (4h 10m remaining)",
      urgency: "HIGH",
      location: "Karol Bagh, Central Delhi",
      scoreFactors: { need: 25, compatibility: 25, capacity: 20, distance: 16, urgency: 10 }
    },
    {
      id: "NGO-102",
      name: "Akshaya Shelter Foundation",
      matchScore: 94,
      distanceKm: 3.2,
      requiredKg: 50,
      providerKg: 50,
      capacity: "Available (150 meals/day)",
      compatibility: "Excellent (Vegetarian Cooked)",
      travelMinutes: 14,
      windowStatus: "Suitable (4h 10m remaining)",
      urgency: "HIGH",
      location: "Connaught Place, New Delhi",
      scoreFactors: { need: 24, compatibility: 25, capacity: 20, distance: 17, urgency: 8 }
    },
    {
      id: "NGO-103",
      name: "Care Community Kitchen",
      matchScore: 88,
      distanceKm: 6.5,
      requiredKg: 35,
      providerKg: 50,
      capacity: "Available (120 meals/day)",
      compatibility: "Good (Vegetarian Cooked)",
      travelMinutes: 28,
      windowStatus: "Suitable (4h 10m remaining)",
      urgency: "MEDIUM",
      location: "Lajpat Nagar, South Delhi",
      scoreFactors: { need: 20, compatibility: 23, capacity: 18, distance: 17, urgency: 10 }
    }
  ]);

  const handleOfferDonation = (ngo) => {
    confetti({ particleCount: 75, spread: 60 });
    alert(`Donation Offer dispatched to ${ngo.name}! Pickup & dispatch tracking initiated.`);
    navigate('/provider/deliveries');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
              Multi-Factor AI Scoring Engine
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            AI Recipient <span className="gradient-text font-semibold">Matching</span>
          </h1>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            NGOs are ranked by multi-variable optimization: Need + Compatibility + Quantity + Capacity + Distance + Travel Time + Urgency + Redistribution Window.
          </p>
        </div>
      </div>

      {/* Recommended NGO Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {matchedNgos.map((ngo, idx) => (
          <div key={ngo.id} className="premium-card p-6 flex flex-col justify-between border-2 border-border hover:border-spiceGold transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-mossVerified/10 text-mossVerified text-xs font-mono font-bold">
                  Rank #{idx + 1} Recommendation
                </span>
                <span className="text-xs font-mono font-bold text-spiceGold bg-spiceGold/10 px-3 py-1 rounded-full border border-spiceGold/30">
                  Match Score: {ngo.matchScore}%
                </span>
              </div>

              <h3 className="font-display font-semibold text-xl text-foreground mb-1">{ngo.name}</h3>
              <p className="text-xs text-muted-foreground font-mono mb-4">{ngo.location}</p>

              <div className="space-y-2 font-mono text-xs text-muted-foreground mb-6">
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Distance:</span>
                  <strong className="text-foreground">{ngo.distanceKm} km</strong>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Estimated Travel:</span>
                  <strong className="text-foreground">{ngo.travelMinutes} mins</strong>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Required Quantity:</span>
                  <strong className="text-foreground">{ngo.requiredKg} kg</strong>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Provider Quantity:</span>
                  <strong className="text-foreground">{ngo.providerKg} kg</strong>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Capacity:</span>
                  <strong className="text-mossVerified">{ngo.capacity}</strong>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Food Compatibility:</span>
                  <strong className="text-mossVerified">{ngo.compatibility}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Redistribution Window:</span>
                  <strong className="text-spiceGold">{ngo.windowStatus}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOfferDonation(ngo)}
              className="btn-primary-gold w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Offer Donation</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderMatchesPage;
