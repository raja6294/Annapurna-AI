import React from 'react';
import { Camera, BrainCircuit, Hourglass, Target, Route, BarChart3, ArrowRight, ShieldCheck, Factory } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks = ({ onSelectStep }) => {
  const steps = [
    {
      num: "01",
      title: "1. PREDICT (Demand & Surplus)",
      icon: Factory,
      desc: "Time-series forecasting models (LightGBM/Prophet) predict kitchen & industrial processing unit overproduction & machine downtime surplus before waste happens.",
      badge: "Prevention Layer"
    },
    {
      num: "02",
      title: "2. DETECT (AI Quality & Window)",
      icon: BrainCircuit,
      desc: "Computer vision detects food category, tags visual condition, and calculates safe thermal redistribution window with radial depletion rings.",
      badge: "Vision AI + Thermal"
    },
    {
      num: "03",
      title: "3. CONNECT (Weighted Matching)",
      icon: Target,
      desc: "Weighted scoring matches surplus to verified NGOs using Proximity, Capacity Fit, Urgency, and Recipient Reliability metrics.",
      badge: "Weighted Score Engine"
    },
    {
      num: "04",
      title: "4. DELIVER (Smart Logistics)",
      icon: Route,
      desc: "Calculates optimal pickup & dispatch routes prioritizing remaining safe consumption time over raw distance alone.",
      badge: "OSRM Route Optimizer"
    }
  ];

  return (
    <section className="py-20 bg-card border-y border-border relative">
      
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 dot-pattern-light opacity-50 pointer-events-none" />

      <div className="section-container relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-pill-badge mb-4 inline-flex">
            <span className="h-2.5 w-2.5 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] font-semibold text-spiceGold">
              End-to-End System Architecture
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-foreground leading-tight mb-4">
            The <span className="gradient-text">Predict → Detect → Connect → Deliver</span> Pipeline
          </h2>
          <p className="text-muted-foreground text-base font-sans">
            Addressing institutional & industrial food waste at scale — from predictive prevention to verified redistribution.
          </p>
        </div>

        {/* 4 Core Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="premium-card p-6 flex flex-col justify-between group cursor-pointer"
                onClick={() => onSelectStep && onSelectStep(step)}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4 font-mono">
                    <span className="text-xl font-bold text-spiceGold">{step.num}</span>
                    <span className="tech-badge">{step.badge}</span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pineCanopy text-spiceGold group-hover:bg-spiceGold group-hover:text-pineCanopy transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-base text-foreground group-hover:text-spiceGold transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-spiceGold">
                  <span>Explore Workflow</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
