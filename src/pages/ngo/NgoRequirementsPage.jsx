import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, PlusCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NgoRequirementsPage = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState('Cooked Meals (Vegetarian)');
  const [foodType, setFoodType] = useState('Cooked Vegetarian Meals');
  const [requiredKg, setRequiredKg] = useState(100);
  const [beneficiaries, setBeneficiaries] = useState(250);
  const [requiredBy, setRequiredBy] = useState('Today, 7:00 PM');
  const [urgency, setUrgency] = useState('High');
  const [storageCapacity, setStorageCapacity] = useState('Insulated Hot Storage Available');
  const [maxDistance, setMaxDistance] = useState('10 km');

  const handlePostRequirement = (e) => {
    e.preventDefault();
    confetti({ particleCount: 60, spread: 60 });
    alert("Requirement posted! ANNAPURNA AI matching engine is scanning available provider listings.");
    navigate('/ngo/requests');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Broadcast Demand
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            My Food <span className="gradient-text">Requirements</span>
          </h1>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            Specify your shelter's active food needs to get automatically matched with providers.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto premium-card p-6">
        <form onSubmit={handlePostRequirement} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-muted-foreground mb-1">Food Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold font-sans"
            >
              <option>Cooked Meals (Vegetarian)</option>
              <option>Cooked Meals (Non-Vegetarian)</option>
              <option>Raw Produce / Vegetables</option>
              <option>Bakery & Snacks</option>
            </select>
          </div>

          <div>
            <label className="block text-muted-foreground mb-1">Food Type Details</label>
            <input
              type="text"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground mb-1">Required Quantity (kg)</label>
              <input
                type="number"
                value={requiredKg}
                onChange={(e) => setRequiredKg(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold"
              />
            </div>

            <div>
              <label className="block text-muted-foreground mb-1">Number of Beneficiaries</label>
              <input
                type="number"
                value={beneficiaries}
                onChange={(e) => setBeneficiaries(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground mb-1">Required By</label>
              <input
                type="text"
                value={requiredBy}
                onChange={(e) => setRequiredBy(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold"
              />
            </div>

            <div>
              <label className="block text-muted-foreground mb-1">Urgency Level</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold font-sans"
              >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground mb-1">Storage Capacity</label>
              <input
                type="text"
                value={storageCapacity}
                onChange={(e) => setStorageCapacity(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold"
              />
            </div>

            <div>
              <label className="block text-muted-foreground mb-1">Maximum Distance</label>
              <input
                type="text"
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary-gold w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md mt-4"
          >
            POST REQUIREMENT
          </button>
        </form>
      </div>
    </div>
  );
};

export default NgoRequirementsPage;
