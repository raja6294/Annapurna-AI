import React from 'react';
import { Globe, Heart, ShieldCheck, Award } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';

export const NgoImpactPage = () => {
  const chartData = [
    { month: 'Jan', receivedKg: 620, distributedKg: 600, beneficiaries: 1100 },
    { month: 'Feb', receivedKg: 780, distributedKg: 750, beneficiaries: 1400 },
    { month: 'Mar', receivedKg: 910, distributedKg: 880, beneficiaries: 1650 },
    { month: 'Apr', receivedKg: 1050, distributedKg: 1010, beneficiaries: 1900 },
    { month: 'May', receivedKg: 1460, distributedKg: 1410, beneficiaries: 2370 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Hope Welfare Centre
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            NGO Community <span className="gradient-text">Impact Dashboard</span>
          </h1>
        </div>
      </div>

      {/* 5 Core Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Food Received</span>
          <strong className="text-2xl font-display font-semibold text-foreground">4,820 kg</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Food Distributed</span>
          <strong className="text-2xl font-display font-semibold text-mossVerified">4,650 kg</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Beneficiaries Served</span>
          <strong className="text-2xl font-display font-semibold text-spiceGold">8,420</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Donations Completed</span>
          <strong className="text-2xl font-display font-semibold text-foreground">182</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm col-span-2 lg:col-span-1">
          <span className="text-[10px] text-muted-foreground block">Food Waste Prevented</span>
          <strong className="text-2xl font-display font-semibold text-spiceGold">4.8 tons</strong>
        </div>
      </div>

      {/* Chart */}
      <div className="premium-card p-6 space-y-4">
        <div className="flex items-center justify-between font-mono text-xs">
          <h3 className="font-bold text-foreground text-sm font-sans">Monthly Food Received vs Distributed (kg)</h3>
          <span className="tech-badge">2026 Impact</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D8D2C5" />
              <XAxis dataKey="month" stroke="#5A544A" fontSize={12} />
              <YAxis stroke="#5A544A" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#14261E', color: '#EDE8DE', borderRadius: '12px' }} />
              <Bar dataKey="receivedKg" fill="#B98A2E" radius={[6, 6, 0, 0]} />
              <Bar dataKey="distributedKg" fill="#3F6B4A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default NgoImpactPage;
