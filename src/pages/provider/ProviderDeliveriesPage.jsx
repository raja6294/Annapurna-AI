import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck, MapPin, Clock, CheckCircle2, Package, PhoneCall,
  Navigation, AlertTriangle, ArrowRight, ChevronRight, Activity,
  HeartHandshake, ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Pickup status step machine
const PICKUP_STEPS = [
  { id: 'ngo_accepted',    label: 'NGO Accepted',     desc: 'NGO has accepted your food' },
  { id: 'ngo_on_the_way', label: 'NGO On The Way',   desc: 'NGO team is heading to your location' },
  { id: 'ngo_arrived',    label: 'NGO Arrived',       desc: 'NGO team has arrived at your premises' },
  { id: 'handover',       label: 'Handover',          desc: 'Confirming food handover' },
  { id: 'completed',      label: 'Pickup Completed',  desc: 'Food successfully received by NGO' },
];

const MOCK_ACCEPTANCE = {
  food:         'Paneer Butter Masala',
  quantity:     '50 kg',
  portions:     200,
  ngoName:      'Akshaya Shelter Foundation',
  ngoContact:   '+91 98765 43210',
  distanceKm:   4.2,
  travelMin:    22,
  route:        'Via NH 48 — Fastest Route (4.2 km)',
  window:       '3h 45m remaining',
  redistScore:  87,
};

export const ProviderDeliveriesPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 0-indexed into PICKUP_STEPS
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStepData = PICKUP_STEPS[currentStep];
  const isLastStep = currentStep === PICKUP_STEPS.length - 1;

  const handleAdvanceStep = () => {
    if (isLastStep) {
      setIsCompleted(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const getStepActionLabel = () => {
    switch (currentStep) {
      case 1: return 'NGO En Route — Waiting for Arrival';
      case 2: return 'CONFIRM NGO ARRIVED';
      case 3: return 'CONFIRM HANDOVER COMPLETE';
      case 4: return 'MARK PICKUP COMPLETED';
      default: return null;
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
              Live Pickup Tracker
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Pickup &amp; <span className="gradient-text">Delivery</span>
          </h1>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            Track NGO acceptance, live route and handover confirmation for your donated food.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-mossVerified/10 border border-mossVerified/30 text-mossVerified font-mono text-xs font-bold">
          <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
          <span>1 Active Pickup</span>
        </div>
      </div>

      {/* Completion Screen */}
      {isCompleted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-2xl bg-mossVerified/10 border border-mossVerified/30 text-center space-y-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mossVerified text-white mx-auto shadow-md">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-foreground">Pickup Completed!</h2>
          <p className="text-xs font-mono text-muted-foreground">
            50 kg of Paneer Butter Masala has been successfully handed over to Akshaya Shelter Foundation.
            <br />Impact logged. 200 beneficiaries will be served.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => { setCurrentStep(0); setIsCompleted(false); }}
              className="btn-primary-gold px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md"
            >
              Register New Surplus
            </button>
            <button
              onClick={() => navigate('/provider/register-surplus')}
              className="px-5 py-3 rounded-xl border border-border text-foreground hover:bg-muted font-mono font-bold text-xs"
            >
              Back to Register Surplus
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: NGO Acceptance Card + Status Stepper */}
          <div className="lg:col-span-5 space-y-6">

            {/* NGO Accepted Banner */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-mossVerified/10 border-2 border-mossVerified/40 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mossVerified text-white shadow-sm">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-mossVerified font-bold uppercase tracking-widest block">
                    NGO Accepted Your Food
                  </span>
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    {MOCK_ACCEPTANCE.ngoName}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-background border border-border">
                  <span className="text-[10px] text-muted-foreground block">Food</span>
                  <strong className="text-foreground">{MOCK_ACCEPTANCE.food}</strong>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border">
                  <span className="text-[10px] text-muted-foreground block">Quantity</span>
                  <strong className="text-foreground">{MOCK_ACCEPTANCE.quantity}</strong>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border">
                  <span className="text-[10px] text-muted-foreground block">Distance</span>
                  <strong className="text-foreground">{MOCK_ACCEPTANCE.distanceKm} km</strong>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border">
                  <span className="text-[10px] text-muted-foreground block">ETA</span>
                  <strong className="text-spiceGold">{MOCK_ACCEPTANCE.travelMin} minutes</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-background border border-border text-xs font-mono flex items-center gap-2">
                <PhoneCall className="h-3.5 w-3.5 text-spiceGold shrink-0" />
                <span className="text-muted-foreground">NGO Contact:</span>
                <strong className="text-foreground">{MOCK_ACCEPTANCE.ngoContact}</strong>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 text-xs font-mono flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span className="text-amber-800 dark:text-amber-300">
                  Redistribution window: <strong>{MOCK_ACCEPTANCE.window}</strong>
                </span>
              </div>
            </motion.div>

            {/* Status Stepper */}
            <div className="premium-card p-6">
              <h3 className="font-semibold text-base text-foreground mb-5 flex items-center gap-2">
                <Activity className="h-4 w-4 text-spiceGold" />
                Pickup Status
              </h3>

              <div className="space-y-3">
                {PICKUP_STEPS.map((step, idx) => {
                  const isDone    = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div key={step.id} className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-spiceGold text-pineCanopy ring-4 ring-spiceGold/25 scale-110'
                            : isDone
                            ? 'bg-mossVerified text-white'
                            : 'bg-muted text-muted-foreground border border-border'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${isCurrent ? 'text-spiceGold' : isDone ? 'text-mossVerified' : 'text-muted-foreground'}`}>
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-[11px] text-muted-foreground font-mono">{step.desc}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <AnimatePresence mode="wait">
                {currentStep >= 2 && (
                  <motion.button
                    key={currentStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={handleAdvanceStep}
                    className="mt-6 w-full btn-primary-gold py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{getStepActionLabel()}</span>
                  </motion.button>
                )}
                {currentStep === 1 && (
                  <motion.div
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 w-full py-4 rounded-xl border-2 border-dashed border-spiceGold/40 flex items-center justify-center gap-2 text-spiceGold font-mono text-xs font-bold"
                  >
                    <Truck className="h-4 w-4 animate-bounce" />
                    <span>NGO En Route — Waiting for Arrival</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Route Map Visual */}
          <div className="lg:col-span-7 space-y-6">

            {/* Route Visualization */}
            <div className="rounded-2xl bg-pineCanopy overflow-hidden relative min-h-[400px] p-6 text-white shadow-xl flex flex-col justify-between">
              <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(185,138,46,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              />

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between font-mono text-xs mb-6">
                <div className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-1.5 border border-spiceGold/40">
                  <Navigation className="h-3.5 w-3.5 text-spiceGold" />
                  <span>{MOCK_ACCEPTANCE.route}</span>
                </div>
                <span className="text-spiceGold font-bold">{MOCK_ACCEPTANCE.distanceKm} km</span>
              </div>

              {/* NGO → Provider Flow Diagram */}
              <div className="relative z-10 flex flex-col items-center gap-0 my-4">
                {/* NGO */}
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mossVerified text-white shadow-lg ring-4 ring-mossVerified/30">
                    <HeartHandshake className="h-7 w-7" />
                  </div>
                  <div className="mt-2 px-4 py-1.5 rounded-xl bg-black/40 border border-mossVerified/40 text-xs font-mono text-center">
                    <p className="font-bold text-mossVerified">{MOCK_ACCEPTANCE.ngoName}</p>
                    <p className="text-slate-300 text-[10px]">NGO Receiver</p>
                  </div>
                </div>

                {/* Arrow with ETA */}
                <div className="flex flex-col items-center py-4 gap-1">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowDown className="h-5 w-5 text-spiceGold" />
                  </motion.div>
                  <div className="px-4 py-2 rounded-xl bg-spiceGold/20 border border-spiceGold/40 text-center">
                    <p className="text-spiceGold font-bold text-xs font-mono">{MOCK_ACCEPTANCE.travelMin} minutes ETA</p>
                    <p className="text-slate-300 text-[10px] font-mono">{MOCK_ACCEPTANCE.distanceKm} km via fastest route</p>
                  </div>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  >
                    <ArrowDown className="h-5 w-5 text-spiceGold" />
                  </motion.div>
                </div>

                {/* Provider */}
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-spiceGold text-pineCanopy shadow-lg ring-4 ring-spiceGold/30">
                    <MapPin className="h-7 w-7" />
                  </div>
                  <div className="mt-2 px-4 py-1.5 rounded-xl bg-black/40 border border-spiceGold/40 text-xs font-mono text-center">
                    <p className="font-bold text-spiceGold">Taj Grand Kitchens &amp; Banquet</p>
                    <p className="text-slate-300 text-[10px]">Your Location — Pickup Point</p>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[11px]">Distance</span>
                  <strong className="text-white">{MOCK_ACCEPTANCE.distanceKm} km</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Travel ETA</span>
                  <strong className="text-spiceGold">{MOCK_ACCEPTANCE.travelMin} minutes</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Redistrib. Window</span>
                  <strong className="text-emerald-400">{MOCK_ACCEPTANCE.window}</strong>
                </div>
              </div>
            </div>

            {/* Food Summary Card */}
            <div className="premium-card p-6">
              <h3 className="font-semibold text-base text-foreground mb-4 flex items-center gap-2">
                <Package className="h-4 w-4 text-spiceGold" />
                Food Being Donated
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-[10px] text-muted-foreground block">Food</span>
                  <strong className="text-foreground text-sm">{MOCK_ACCEPTANCE.food}</strong>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-[10px] text-muted-foreground block">Quantity</span>
                  <strong className="text-foreground text-sm">{MOCK_ACCEPTANCE.quantity}</strong>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-[10px] text-muted-foreground block">Portions</span>
                  <strong className="text-mossVerified text-sm">{MOCK_ACCEPTANCE.portions}</strong>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-[10px] text-muted-foreground block">AI Score</span>
                  <strong className="text-spiceGold text-sm">{MOCK_ACCEPTANCE.redistScore}%</strong>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 text-xs font-mono">
                <p className="font-bold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" /> Important
                </p>
                <p className="text-amber-700 dark:text-amber-400 leading-relaxed">
                  Please ensure all food containers are sealed, labelled, and ready at the pickup point. 
                  Maintain temperature standards until the NGO team arrives.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ProviderDeliveriesPage;
