import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShieldAlert, Award, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16 text-foreground font-sans">
      <div className="section-container">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-border">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pineCanopy text-spiceGold border border-spiceGold/30 shadow-md">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">
                ANNAPURNA <span className="gradient-text font-semibold">AI</span>
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              AI-Powered Smart Food-Waste Reduction and Sustainable Redistribution Ecosystem for institutional kitchens and food processing units.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-spiceGold/40 bg-spiceGold/10 px-3 py-1 text-xs font-mono text-spiceGold font-semibold">
              <Award className="h-3.5 w-3.5" /> Smart India Hackathon 2026 • PS #26234
            </div>
          </div>

          {/* Portal Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-xs flex flex-col">
            <h4 className="font-mono uppercase tracking-wider font-semibold text-muted-foreground mb-4">
              System Routes
            </h4>
            <Link to="/" className="hover:text-spiceGold transition-colors mb-2">
              Role Gateway Selection
            </Link>
            <Link to="/provider" className="hover:text-spiceGold transition-colors mb-2">
              Food Provider Portal (No Friction)
            </Link>
            <Link to="/ngo" className="hover:text-spiceGold transition-colors mb-2">
              NGO Receiver Portal (Map View)
            </Link>
            <Link to="/admin" className="hover:text-spiceGold transition-colors mb-2">
              Admin Governance & Verification Gate
            </Link>
            <Link to="/logistics" className="hover:text-spiceGold transition-colors mb-2">
              Logistics & Route Optimizer
            </Link>
            <Link to="/impact" className="hover:text-spiceGold transition-colors">
              ESG & Sustainability Analytics
            </Link>
          </div>

          {/* Regulatory & Security Framework (4 cols) */}
          <div className="md:col-span-4 space-y-3 text-xs text-muted-foreground">
            <h4 className="font-mono uppercase tracking-wider font-semibold text-muted-foreground mb-4">
              Safety & Regulatory Framework
            </h4>
            <p className="leading-relaxed font-sans">
              Aligned with FAO Global Food Losses, UNEP Food Waste Index Report 2024, FSSAI Regulations, and UN Sustainable Development Goal 12.3.
            </p>
            <div className="p-3 rounded-xl bg-muted/50 border border-border text-[11px] leading-tight flex items-start gap-2 text-foreground font-mono">
              <ShieldAlert className="h-4 w-4 text-brickUrgency shrink-0 mt-0.5" />
              <span>
                <strong>Asymmetric Security Model:</strong> Providers list friction-free. Receiver NGOs undergo strict document verification before claiming food.
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <p>© 2026 ANNAPURNA AI • Team Mutton Biriyani • All Rights Reserved</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-spiceGold fill-spiceGold" /> for SIH 2026
          </p>
        </div>

      </div>
    </footer>
  );
};
