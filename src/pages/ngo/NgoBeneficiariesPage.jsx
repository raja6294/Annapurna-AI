import React from 'react';
import { Users, Heart } from 'lucide-react';

export const NgoBeneficiariesPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Shelter & Beneficiary Registry
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Beneficiary <span className="gradient-text">Community</span>
          </h1>
        </div>
      </div>

      <div className="premium-card p-6 space-y-4 font-mono text-xs">
        <h3 className="font-bold text-foreground text-sm font-sans">Active Shelter Demographics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-muted-foreground block text-[10px]">Registered Beneficiaries</span>
            <strong className="text-foreground text-base font-bold">180 Individuals</strong>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-muted-foreground block text-[10px]">Daily Meal Capacity</span>
            <strong className="text-mossVerified text-base font-bold">150 Meals / Day</strong>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-muted-foreground block text-[10px]">Target Demographic</span>
            <strong className="text-spiceGold text-base font-bold">Women & Children Shelter</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoBeneficiariesPage;
