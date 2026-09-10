import React from 'react';
import { MapView } from '../../components/MapView';
import { Globe, MapPin, Truck, HeartHandshake, Utensils } from 'lucide-react';

export const AdminDeliveriesPage = ({ listings }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              National Dispatch Network
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Annapurna AI <span className="gradient-text">Network Map</span>
          </h1>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            Displaying 🍲 Providers, 🤝 NGOs, and 🚚 Active Deliveries across high-demand and high-surplus clusters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 font-mono text-xs mb-4">
        <div className="p-3 rounded-xl bg-card border border-border flex items-center gap-3">
          <div className="text-xl">🍲</div>
          <div><span className="text-muted-foreground block text-[10px]">Providers</span><strong className="text-foreground text-sm">148 Active</strong></div>
        </div>
        <div className="p-3 rounded-xl bg-card border border-border flex items-center gap-3">
          <div className="text-xl">🤝</div>
          <div><span className="text-muted-foreground block text-[10px]">NGO Receivers</span><strong className="text-foreground text-sm">96 Verified</strong></div>
        </div>
        <div className="p-3 rounded-xl bg-card border border-border flex items-center gap-3">
          <div className="text-xl">🚚</div>
          <div><span className="text-muted-foreground block text-[10px]">Active Deliveries</span><strong className="text-spiceGold text-sm">18 In Transit</strong></div>
        </div>
        <div className="p-3 rounded-xl bg-card border border-border flex items-center gap-3">
          <div className="text-xl">📍</div>
          <div><span className="text-muted-foreground block text-[10px]">Cluster Status</span><strong className="text-mossVerified text-sm">High Surplus Area</strong></div>
        </div>
      </div>

      <MapView listings={listings} isNgoVerified={true} />
    </div>
  );
};

export default AdminDeliveriesPage;
