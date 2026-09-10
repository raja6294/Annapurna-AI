import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, MapPin, Activity, CheckCircle2, HeartHandshake, Zap, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = ({ onExploreProvider, onExploreNgo, onExploreAdmin }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-background">
      
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spiceGold/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="section-container">
        
        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            
            {/* Section Badge Pattern */}
            <div className="section-pill-badge mb-6 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-spiceGold animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] font-semibold text-spiceGold">
                Smart India Hackathon 2026 • PS ID #26234
              </span>
            </div>

            {/* Display Headline in Fraunces Serif */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-foreground leading-[1.08] tracking-tight mb-6">
              Predict. Detect.{' '}
              <span className="gradient-text">
                Connect. Deliver.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8 font-sans">
              Annapurna AI combines computer vision freshness scoring, asymmetric role security gates, weighted matching intelligence, and time-aware smart logistics to prevent institutional food waste and redistribute meals safely.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreProvider}
                className="btn-primary-gold w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-sm font-bold tracking-wide shadow-md group"
              >
                <span>Donate Surplus Food</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreNgo}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-border bg-card text-foreground hover:border-spiceGold/40 hover:bg-spiceGold/5 font-medium text-sm transition-all"
              >
                <HeartHandshake className="h-4 w-4 text-spiceGold" />
                <span>NGO Receiver Portal</span>
              </button>

              <button
                onClick={onExploreAdmin}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-border bg-pineCanopy text-milledStone hover:bg-pineCanopy/90 font-mono text-xs font-semibold transition-all"
              >
                <ShieldCheck className="h-4 w-4 text-spiceGold" />
                <span>Admin Governance</span>
              </button>
            </div>

            {/* Key Differentiators Banner */}
            <div className="pt-6 border-t border-border/70 w-full grid grid-cols-3 gap-4 font-mono">
              <div>
                <div className="flex items-center gap-1 text-spiceGold font-display text-xl font-bold">
                  <Zap className="h-4 w-4" />
                  <span>98.4%</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Weighted AI Match</p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-mossVerified font-display text-xl font-bold">
                  <Clock className="h-4 w-4" />
                  <span>26 mins</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Time-Aware Delivery</p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-pineCanopy dark:text-milledStone font-display text-xl font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>14,850 kg</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Diverted Waste</p>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Hero Live Map Fragment Animation (Section 16 requirement!) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            
            {/* Outer Decorative Glow Ring */}
            <div className="absolute inset-0 m-auto h-[400px] w-[400px] rounded-full border border-dashed border-spiceGold/30 animate-spin-slow pointer-events-none" />

            {/* Live Map Fragment Container */}
            <div className="relative w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-2xl z-10">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border mb-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-mossVerified animate-pulse" />
                  <span className="font-bold text-foreground">Live Map Intelligence</span>
                </div>
                <span className="tech-badge">Delhi-NCR Grid</span>
              </div>

              {/* Simulated Map Pins shifting from Grey to Spice Gold */}
              <div className="relative h-56 w-full rounded-xl bg-pineCanopy overflow-hidden p-4 text-milledStone dot-pattern-dark flex flex-col justify-between border border-spiceGold/30">
                
                {/* SVG Polyline Animation */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" fill="none">
                  <path d="M 60,140 Q 180,40 340,120" stroke="#B98A2E" strokeWidth="2.5" strokeDasharray="6 6" />
                </svg>

                {/* Node Pin 1: Provider */}
                <div className="relative z-10 flex items-center gap-2 bg-pineCanopy/90 p-2 rounded-lg border border-spiceGold/30 max-w-[200px]">
                  <div className="h-7 w-7 rounded-full bg-spiceGold text-pineCanopy font-bold flex items-center justify-center text-xs">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="font-mono text-[10px]">
                    <p className="font-bold text-white">Taj Grand Kitchens</p>
                    <p className="text-spiceGold">65kg Surplus (Fresh)</p>
                  </div>
                </div>

                {/* Shifting Animated Match Indicator */}
                <motion.div 
                  animate={{ x: [0, 140, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 self-center bg-spiceGold text-pineCanopy px-2.5 py-1 rounded-full font-mono text-[10px] font-bold shadow-md"
                >
                  Matching AI Score: 96/100
                </motion.div>

                {/* Node Pin 2: Matched NGO */}
                <div className="relative z-10 flex items-center gap-2 bg-pineCanopy/90 p-2 rounded-lg border border-mossVerified/40 max-w-[220px] self-end">
                  <div className="h-7 w-7 rounded-full bg-mossVerified text-white font-bold flex items-center justify-center text-xs">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <div className="font-mono text-[10px]">
                    <p className="font-bold text-white">Akshaya Shelter NGO</p>
                    <p className="text-emerald-400">Verified Recipient</p>
                  </div>
                </div>

              </div>

              {/* Bottom Card Summary */}
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">Radial Depletion Ring:</span>
                <span className="font-bold text-spiceGold">4h 30m Window Remaining</span>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
