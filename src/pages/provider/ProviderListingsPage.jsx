import React from 'react';
import { ArrowRight, Utensils, Clock, CheckCircle2, MapPin } from 'lucide-react';

export const ProviderListingsPage = ({ listings, onSelectListing }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
              Taj Grand Kitchens & Banquet
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            My Food <span className="gradient-text">Listings</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div key={item.id} className="premium-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="tech-badge">{item.id}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-mossVerified/10 text-mossVerified text-xs font-bold font-mono">
                  {item.status}
                </span>
              </div>

              <h3 className="font-semibold text-lg text-foreground mb-1">{item.foodName}</h3>
              <p className="text-xs text-muted-foreground mb-3">{item.providerName}</p>

              <div className="space-y-1.5 text-xs text-muted-foreground font-mono mb-4">
                <p>Quantity: <strong className="text-foreground">{item.quantityKg} kg ({item.portions} meals)</strong></p>
                <p>Location: {item.location}</p>
                <p>Freshness Window: <strong className="text-spiceGold">{item.freshnessWindowHours}h Remaining</strong></p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-spiceGold">
              <span>Matched NGO: {item.matchedNgo?.name || 'Hope Welfare Centre'}</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderListingsPage;
