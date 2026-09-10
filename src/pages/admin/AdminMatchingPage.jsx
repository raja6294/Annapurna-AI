import React from 'react';
import { Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AdminMatchingPage = () => {
  const scoreFactors = [
    { name: 'Community Need', weight: '25%', desc: 'Current unfulfilled food requirements of shelter' },
    { name: 'Food Compatibility', weight: '25%', desc: 'Dietary preference fit (Veg / Non-Veg / Produce)' },
    { name: 'Capacity Fit', weight: '20%', desc: 'Declared daily meal distribution & storage capacity' },
    { name: 'Proximity & Distance', weight: '15%', desc: 'Geographic distance between provider and NGO' },
    { name: 'Travel Time', weight: '10%', desc: 'Real-time OSRM estimated travel duration' },
    { name: 'Urgency & Window', weight: '5%', desc: 'Remaining thermal safety window for redistribution' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Scoring Weight Pipeline
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Matching Engine <span className="gradient-text">Monitor</span>
          </h1>
        </div>
      </div>

      {/* Matching Pipeline Stepper */}
      <div className="premium-card p-6 space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          Matching Optimization Flow
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-muted/40 font-mono text-xs font-bold text-foreground">
          <span>Food Listing</span>
          <ArrowRight className="h-4 w-4 text-spiceGold" />
          <span>Eligible NGOs</span>
          <ArrowRight className="h-4 w-4 text-spiceGold" />
          <span>Scoring Engine</span>
          <ArrowRight className="h-4 w-4 text-spiceGold" />
          <span>Top Matches</span>
          <ArrowRight className="h-4 w-4 text-spiceGold" />
          <span className="text-mossVerified">Selected Recipient</span>
        </div>
      </div>

      {/* Score Factors Grid */}
      <div className="premium-card p-6 space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          Weighted Scoring Model Factors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {scoreFactors.map((f) => (
            <div key={f.name} className="p-4 rounded-xl bg-background border border-border space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-foreground font-sans text-sm">{f.name}</strong>
                <span className="px-2 py-0.5 rounded-full bg-spiceGold/10 text-spiceGold font-bold">{f.weight}</span>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMatchingPage;
