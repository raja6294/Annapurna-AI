import React from 'react';
import { Factory, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const ProviderAnalyticsPage = () => {
  const forecastData = [
    { day: 'Mon', predictedSurplusKg: 45, actualSurplusKg: 42 },
    { day: 'Tue', predictedSurplusKg: 60, actualSurplusKg: 58 },
    { day: 'Wed', predictedSurplusKg: 35, actualSurplusKg: 38 },
    { day: 'Thu', predictedSurplusKg: 80, actualSurplusKg: 75 },
    { day: 'Fri', predictedSurplusKg: 95, actualSurplusKg: 90 },
    { day: 'Sat', predictedSurplusKg: 110, actualSurplusKg: 115 },
    { day: 'Sun', predictedSurplusKg: 70, actualSurplusKg: 68 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
              LightGBM Time-Series Model
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Upstream Industrial <span className="gradient-text">Surplus Forecast</span>
          </h1>
        </div>
      </div>

      <div className="premium-card p-6 space-y-6">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D8D2C5" />
              <XAxis dataKey="day" stroke="#5A544A" fontSize={12} />
              <YAxis stroke="#5A544A" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#14261E', color: '#EDE8DE', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="predictedSurplusKg" stroke="#B98A2E" strokeWidth={3} fill="#B98A2E" fillOpacity={0.2} />
              <Area type="monotone" dataKey="actualSurplusKg" stroke="#3F6B4A" strokeWidth={2} fill="#3F6B4A" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-muted-foreground block">Predicted Weekly Surplus</span>
            <strong className="text-foreground text-sm font-bold">485 kg Expected</strong>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-muted-foreground block">Machine Downtime Impact</span>
            <strong className="text-spiceGold text-sm font-bold">11.2 Hours Total</strong>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-muted-foreground block">Prevention Action Plan</span>
            <strong className="text-mossVerified text-sm font-bold">Auto-Schedule NGO Pickups</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderAnalyticsPage;
