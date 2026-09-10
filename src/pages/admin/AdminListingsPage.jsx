import React, { useState } from 'react';
import { Utensils, Filter, CheckCircle2 } from 'lucide-react';

export const AdminListingsPage = ({ listings }) => {
  const [filterProvider, setFilterProvider] = useState('All');
  const [filterFoodType, setFilterFoodType] = useState('All');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Ecosystem Inventory Monitor
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Food Listing <span className="gradient-text">Monitor</span>
          </h1>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-card border border-border flex flex-wrap items-center gap-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-spiceGold" />
          <span>Filters:</span>
        </div>
        <select value={filterFoodType} onChange={(e) => setFilterFoodType(e.target.value)} className="h-9 px-3 rounded-xl border border-border bg-background">
          <option value="All">All Food Types</option>
          <option value="Cooked Meals">Cooked Meals</option>
          <option value="Raw Produce">Raw Produce</option>
          <option value="Bakery">Bakery & Snacks</option>
        </select>
      </div>

      <div className="space-y-4">
        {listings.map((item) => (
          <div key={item.id} className="p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-spiceGold">{item.id}</span>
                <span className="text-muted-foreground">• {item.category}</span>
              </div>
              <h4 className="font-bold text-foreground text-sm font-sans">{item.foodName}</h4>
              <p className="text-muted-foreground">{item.providerName} • {item.location} ({item.quantityKg} kg)</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-2.5 py-0.5 rounded-full bg-mossVerified/10 text-mossVerified font-bold">
                AI Status: {item.freshnessScore}% Fresh
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-spiceGold/10 text-spiceGold font-bold">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminListingsPage;
