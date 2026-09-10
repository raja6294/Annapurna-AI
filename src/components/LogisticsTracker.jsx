import React, { useState } from 'react';
import { Route, Navigation, Clock, CheckCircle2, MapPin, Truck, AlertCircle, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const LogisticsTracker = ({ activeListing }) => {
  const listing = activeListing || {
    id: "FOOD-2026-001",
    providerName: "Taj Grand Kitchens & Banquet",
    foodName: "Fresh Veg Pulao & Paneer Curry",
    quantityKg: 65,
    location: "Connaught Place",
    matchedNgo: {
      name: "Akshaya Shelter Foundation",
      location: "Karol Bagh",
      distanceKm: 3.2,
      travelMinutes: 14
    }
  };

  const steps = [
    { label: "Draft", desc: "Listed by Provider" },
    { label: "AI Assessed", desc: "94.8% Visual Conf." },
    { label: "Matched", desc: "Akshaya Shelter" },
    { label: "Accepted", desc: "Verified NGO" },
    { label: "In Transit", desc: "Driver EN-402" },
    { label: "Delivered", desc: "Receipt Verified" },
    { label: "Completed", desc: "Impact Logged" }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(4); // "In Transit"

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="section-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-border mb-8">
          <div>
            <div className="section-pill-badge mb-2 inline-flex">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                Time-Aware Logistics Route Optimizer
              </span>
            </div>
            <h2 className="text-3xl font-display text-foreground">
              Real-Time Route <span className="gradient-text font-semibold">Tracking & Dispatch</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span className="tech-badge">Listing ID: {listing.id}</span>
            <span className="flex items-center gap-1.5 text-mossVerified font-bold bg-mossVerified/10 px-3 py-1.5 rounded-full border border-mossVerified/20">
              <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" /> Live In Transit
            </span>
          </div>
        </div>

        {/* State Machine Stepper */}
        <div className="mb-10 p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-6">
            State Machine Lifecycle Workflow
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {steps.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div key={step.label} className="flex flex-col items-center text-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl font-mono text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-spiceGold text-pineCanopy ring-4 ring-spiceGold/30 scale-110'
                        : isCompleted
                        ? 'bg-pineCanopy text-milledStone'
                        : 'bg-muted text-muted-foreground border border-border'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                  </div>
                  <span className={`mt-2 text-xs font-semibold ${isCurrent ? 'text-spiceGold' : 'text-foreground'}`}>
                    {step.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono mt-0.5">
                    {step.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Route Vector Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 rounded-2xl border border-border bg-pineCanopy overflow-hidden relative min-h-[420px] p-6 text-milledStone shadow-xl flex flex-col justify-between">
            <div className="absolute inset-0 dot-pattern-dark opacity-30 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 rounded-full bg-pineCanopy/90 px-4 py-1.5 border border-spiceGold/40">
                <Navigation className="h-3.5 w-3.5 text-spiceGold" />
                <span>OSRM Optimization Score: <strong className="text-spiceGold">98 / 100</strong></span>
              </div>
              <span className="text-slate-300">Time-Aware Path Feasibility</span>
            </div>

            <div className="relative my-8 h-48 w-full flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" fill="none">
                <path d="M 80,100 C 200,30 400,170 520,100" stroke="#B98A2E" strokeWidth="3" strokeDasharray="8 8" />
              </svg>

              <div className="absolute left-[10%] top-[40%] flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-spiceGold text-pineCanopy font-bold">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="mt-2 text-xs font-mono font-bold text-white bg-pineCanopy/90 px-2.5 py-1 rounded-md border border-spiceGold/40">
                  {listing.providerName}
                </span>
              </div>

              <motion.div
                animate={{ x: [0, 180, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[40%] top-[25%] flex flex-col items-center z-20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-spiceGold text-pineCanopy shadow-lg ring-4 ring-spiceGold/30">
                  <Truck className="h-6 w-6" />
                </div>
                <span className="mt-1 font-mono text-[10px] bg-pineCanopy text-spiceGold px-2 py-0.5 rounded-full font-bold border border-spiceGold/40">
                  EN-402 (14m ETA)
                </span>
              </motion.div>

              <div className="absolute right-[10%] top-[40%] flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mossVerified text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="mt-2 text-xs font-mono font-bold text-white bg-pineCanopy/90 px-2.5 py-1 rounded-md border border-mossVerified/40">
                  {listing.matchedNgo.name}
                </span>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-pineCanopy-light text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[11px]">Distance</span>
                <strong className="text-white text-sm">{listing.matchedNgo.distanceKm} km</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Travel ETA</span>
                <strong className="text-spiceGold text-sm">{listing.matchedNgo.travelMinutes} Minutes</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Remaining Window</span>
                <strong className="text-emerald-400 text-sm">4 Hours 15 Mins</strong>
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="premium-card p-6">
              <h3 className="font-semibold text-base text-foreground mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                Logistics Dispatch Summary
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-muted-foreground block text-[11px]">Assigned Driver</span>
                  <strong className="text-foreground text-sm font-semibold">Ramesh Verma (DL-1C-9042)</strong>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-muted-foreground block text-[11px]">Temperature Monitor</span>
                  <strong className="text-mossVerified text-sm font-semibold">62°C (Optimal Thermal State)</strong>
                </div>

                <div className="p-3 rounded-xl bg-spiceGold/10 border border-spiceGold/30 text-pineCanopy dark:text-spiceGold">
                  <p className="font-semibold text-xs mb-1">Path Feasibility Guaranteed</p>
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    Calculated route time (14m) is comfortably inside remaining safe redistribution window (4h 15m).
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
