import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, HeartHandshake, ShieldCheck, ArrowRight, CheckCircle2, Lock, Sparkles, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage = ({ onOpenAuthModal }) => {
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    onOpenAuthModal(role);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background text-foreground flex flex-col justify-between py-8 sm:py-12">
      
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-spiceGold/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="section-container">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="section-pill-badge mb-6 inline-flex shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] font-semibold text-spiceGold">
              SIH 2026 • Problem Statement ID #26234
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-foreground leading-[1.08] tracking-tight mb-4">
            Annapurna <span className="gradient-text font-semibold">AI Platform</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed font-sans max-w-2xl mx-auto mb-2">
            Predict, detect, connect, and redistribute surplus food seamlessly. Select your access role below to enter your dedicated portal.
          </p>
        </div>

        {/* 3 Prominent System Role Selection Cards */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-semibold text-foreground mb-1">
              Select Your Access Role
            </h2>
            <p className="text-xs text-muted-foreground font-mono">
              Role-Based Access Control (RBAC) • Simulated JWT Auth Prototype
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Role 1: Food Provider */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleRoleClick('provider')}
              className="premium-card p-8 flex flex-col justify-between border-2 border-border hover:border-spiceGold/60 cursor-pointer group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pineCanopy text-spiceGold group-hover:scale-110 transition-transform shadow-md">
                    <UtensilsCrossed className="h-7 w-7" />
                  </div>
                  <span className="tech-badge">Zero Friction</span>
                </div>

                <span className="font-mono text-xs text-spiceGold font-bold uppercase tracking-wider block mb-1">
                  Role 01
                </span>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2 group-hover:text-spiceGold transition-colors">
                  Food Provider Portal
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed font-sans mb-6">
                  For restaurants, hotels, caterers, institutional kitchens, & food processing units. Post surplus listings, run visual AI quality detection, & forecast upstream waste.
                </p>

                <div className="space-y-2 text-xs font-mono text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-mossVerified" />
                    <span>No mandatory FSSAI friction to list</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-mossVerified" />
                    <span>Visual AI quality & thermal score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-mossVerified" />
                    <span>Upstream demand forecasting</span>
                  </div>
                </div>
              </div>

              <button className="btn-primary-gold w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
                <span>Enter Provider Portal</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Role 2: NGO Receiver */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleRoleClick('ngo')}
              className="premium-card p-8 flex flex-col justify-between border-2 border-border hover:border-spiceGold/60 cursor-pointer group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pineCanopy text-mossVerified group-hover:scale-110 transition-transform shadow-md">
                    <HeartHandshake className="h-7 w-7" />
                  </div>
                  <span className="tech-badge">Security Gated</span>
                </div>

                <span className="font-mono text-xs text-mossVerified font-bold uppercase tracking-wider block mb-1">
                  Role 02
                </span>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2 group-hover:text-spiceGold transition-colors">
                  NGO Receiver Portal
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed font-sans mb-6">
                  For verified NGOs, shelters, & community kitchens. Discover nearby available food on an interactive Leaflet map, view AI match scores, & claim food for beneficiaries.
                </p>

                <div className="space-y-2 text-xs font-mono text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-amber-600" />
                    <span>Document verification security gate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-mossVerified" />
                    <span>Interactive Leaflet map & radius filter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-mossVerified" />
                    <span>Weighted AI match score breakdown</span>
                  </div>
                </div>
              </div>

              <button className="btn-primary-gold w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
                <span>Enter NGO Portal</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Role 3: Admin Governance */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleRoleClick('admin')}
              className="premium-card p-8 flex flex-col justify-between border-2 border-border hover:border-spiceGold/60 cursor-pointer group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pineCanopy text-spiceGold group-hover:scale-110 transition-transform shadow-md">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <span className="tech-badge">MoFPI Ops</span>
                </div>

                <span className="font-mono text-xs text-spiceGold font-bold uppercase tracking-wider block mb-1">
                  Role 03
                </span>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2 group-hover:text-spiceGold transition-colors">
                  Admin Governance Portal
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed font-sans mb-6">
                  For platform operators & MoFPI moderators. Audit NGO credentials (12A/80G/FCRA), moderate listings, inspect BullMQ worker queues, & export ESG reports.
                </p>

                <div className="space-y-2 text-xs font-mono text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-mossVerified" />
                    <span>NGO document verification approval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-mossVerified" />
                    <span>BullMQ message queue pipeline monitor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-mossVerified" />
                    <span>ESG PDF/Excel audit report generator</span>
                  </div>
                </div>
              </div>

              <button className="btn-primary-gold w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
                <span>Enter Admin Portal</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
};
