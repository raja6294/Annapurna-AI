import React, { useState } from 'react';
import { Truck, CheckCircle2, MapPin, Clock, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export const NgoDeliveriesPage = () => {
  const steps = [
    { label: "Donation Accepted", desc: "Provider Notified" },
    { label: "Pickup Scheduled", desc: "Driver Assigned" },
    { label: "In Transit", desc: "EN-402 (22m ETA)" },
    { label: "Arriving", desc: "Near Shelter" },
    { label: "Delivered", desc: "Receipt Signed" },
    { label: "Distributed", desc: "Beneficiaries Served" }
  ];

  const [currentStep, setCurrentStep] = useState(2); // "In Transit"

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Live Shipment Stepper
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Incoming Food <span className="gradient-text">Delivery</span>
          </h1>
        </div>
      </div>

      {/* Overview Info Card */}
      <div className="p-6 rounded-2xl bg-card border border-border grid grid-cols-2 lg:grid-cols-6 gap-4 font-mono text-xs">
        <div>
          <span className="text-muted-foreground block text-[10px]">Food Provider</span>
          <strong className="text-foreground font-sans font-bold text-sm">Taj Grand Kitchens</strong>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px]">Food Item</span>
          <strong className="text-foreground font-sans text-sm">Paneer Butter Masala + Rice</strong>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px]">Quantity</span>
          <strong className="text-foreground text-sm font-bold">50 kg</strong>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px]">Pickup Time</span>
          <strong className="text-foreground text-sm font-bold">1:30 PM</strong>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px]">ETA</span>
          <strong className="text-spiceGold text-sm font-bold">22 minutes</strong>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px]">Distance</span>
          <strong className="text-foreground text-sm font-bold">4.2 km</strong>
        </div>
      </div>

      {/* Status Stepper */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-6">
          Delivery Status Lifecycle
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStep;
            const isCurrent = idx === currentStep;
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
    </div>
  );
};

export default NgoDeliveriesPage;
