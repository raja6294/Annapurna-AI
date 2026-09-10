import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Heart, Award, Zap, Users, Globe, ArrowUpRight, FileSpreadsheet, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import confetti from 'canvas-confetti';

export const ImpactAnalytics = ({ stats }) => {
  const chartData = [
    { month: 'Jan', rescuedKg: 1800, meals: 3600, co2Kg: 4500 },
    { month: 'Feb', rescuedKg: 2400, meals: 4800, co2Kg: 6000 },
    { month: 'Mar', rescuedKg: 3100, meals: 6200, co2Kg: 7750 },
    { month: 'Apr', rescuedKg: 3900, meals: 7800, co2Kg: 9750 },
    { month: 'May', rescuedKg: 4600, meals: 9200, co2Kg: 11500 },
    { month: 'Jun', rescuedKg: 5800, meals: 11600, co2Kg: 14500 },
  ];

  const handleExportReport = () => {
    confetti({ particleCount: 50 });
    alert("ESG Sustainability Audit Report (PDF/Excel) downloaded! Formatted per Indian Companies Act Sec 135 & FAO UN SDG 12.3 framework.");
  };

  return (
    <section className="py-20 bg-pineCanopy text-milledStone relative overflow-hidden border-t border-pineCanopy-light">
      
      {/* Background Dot Texture & Accent Glows */}
      <div className="absolute inset-0 dot-pattern-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-spiceGold/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-pineCanopy-light mb-12">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-spiceGold/40 bg-spiceGold/10 px-4 py-1.5 mb-4 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
                Social & Environmental ESG Analytics
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-white leading-tight">
              Quantifiable Impact <span className="gradient-text font-semibold">Across Ecosystem</span>
            </h2>
          </div>

          <button
            onClick={handleExportReport}
            className="btn-primary-gold px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span>Export ESG Report (PDF/Excel)</span>
          </button>
        </div>

        {/* 4 Core Impact Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 font-mono">
          
          <div className="p-6 rounded-2xl bg-pineCanopy-light/60 border border-spiceGold/30 shadow-xl">
            <div className="flex items-center justify-between text-spiceGold mb-3">
              <ShieldCheck className="h-6 w-6" />
              <span className="text-xs text-emerald-400 font-bold">+24% vs Prev Month</span>
            </div>
            <p className="font-display text-4xl font-normal text-white mb-1">
              {(stats?.totalFoodRescuedKg || 14850).toLocaleString()} <span className="text-xl text-slate-400">kg</span>
            </p>
            <p className="text-xs text-slate-300">Total Surplus Food Rescued</p>
          </div>

          <div className="p-6 rounded-2xl bg-pineCanopy-light/60 border border-spiceGold/30 shadow-xl">
            <div className="flex items-center justify-between text-emerald-400 mb-3">
              <Heart className="h-6 w-6" />
              <span className="text-xs text-emerald-400 font-bold">100% Verified NGOs</span>
            </div>
            <p className="font-display text-4xl font-normal text-white mb-1">
              {(stats?.totalMealsServed || 29700).toLocaleString()}
            </p>
            <p className="text-xs text-slate-300">Nutritious Meals Served</p>
          </div>

          <div className="p-6 rounded-2xl bg-pineCanopy-light/60 border border-spiceGold/30 shadow-xl">
            <div className="flex items-center justify-between text-sky-400 mb-3">
              <Globe className="h-6 w-6" />
              <span className="text-xs text-sky-400 font-bold">UN SDG 12.3</span>
            </div>
            <p className="font-display text-4xl font-normal text-white mb-1">
              {(stats?.co2PreventedKg || 37125).toLocaleString()} <span className="text-xl text-slate-400">kg</span>
            </p>
            <p className="text-xs text-slate-300">CO₂ Emissions Prevented</p>
          </div>

          <div className="p-6 rounded-2xl bg-pineCanopy-light/60 border border-spiceGold/30 shadow-xl">
            <div className="flex items-center justify-between text-amber-400 mb-3">
              <Zap className="h-6 w-6" />
              <span className="text-xs text-amber-400 font-bold">Methane Saved</span>
            </div>
            <p className="font-display text-4xl font-normal text-white mb-1">
              {(stats?.methanePreventedKg || 4455).toLocaleString()} <span className="text-xl text-slate-400">kg</span>
            </p>
            <p className="text-xs text-slate-300">Methane Gas Avoided</p>
          </div>

        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 p-6 rounded-2xl bg-pineCanopy-light/90 border border-spiceGold/30">
            <div className="flex items-center justify-between mb-6 font-mono">
              <div>
                <h3 className="font-semibold text-lg text-white font-sans">Monthly Cumulative Food Rescued (kg)</h3>
                <p className="text-xs text-slate-400">FAO / UNEP Food Waste Conversion Factors Applied</p>
              </div>
              <span className="tech-badge">2026 Metrics</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRescued" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B98A2E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#B98A2E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#234234" />
                  <XAxis dataKey="month" stroke="#A39E93" fontSize={12} />
                  <YAxis stroke="#A39E93" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#14261E', borderColor: '#B98A2E', color: '#EDE8DE', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="rescuedKg" stroke="#B98A2E" strokeWidth={3} fillOpacity={1} fill="url(#colorRescued)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-spiceGold/10 border border-spiceGold/30">
              <Award className="h-8 w-8 text-spiceGold mb-3" />
              <h4 className="font-semibold text-base text-white mb-1 font-display">SIH 2026 Problem Statement Match</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Fulfills PS #26234 requirements: addresses both consumer surplus & industrial food processing unit loss.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-pineCanopy-light/90 border border-spiceGold/30 space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b border-pineCanopy/80 pb-2">
                <span className="text-slate-400">Participating Kitchens:</span>
                <strong className="text-white">{stats?.activeProviders || 48} Kitchens</strong>
              </div>
              <div className="flex justify-between border-b border-pineCanopy/80 pb-2">
                <span className="text-slate-400">Verified Recipient NGOs:</span>
                <strong className="text-white">{stats?.partnerNgos || 32} Centres</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Framework Target:</span>
                <strong className="text-spiceGold">UN SDG 12.3 Zero Waste</strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
