import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { UtensilsCrossed, Sun, Moon, ArrowLeft, Key, LogOut, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export const Navbar = ({ currentUser, onOpenAuthModal, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isLandingPage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-all shadow-sm">
      <div className="section-container flex h-20 items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pineCanopy text-spiceGold shadow-md border border-spiceGold/30 group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                ANNAPURNA <span className="gradient-text font-semibold">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-spiceGold/40 bg-spiceGold/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-spiceGold">
                <Award className="h-3 w-3" /> SIH 2026 #26234
              </span>
            </div>
            <p className="hidden md:block text-xs text-muted-foreground font-sans font-medium">
              Smart Food Waste Reduction & Redistribution Platform
            </p>
          </div>
        </Link>

        {/* Portal View Back Navigation (Shown only inside Portal pages, NOT on Landing Page!) */}
        {!isLandingPage && (
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-mono font-semibold text-foreground transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-spiceGold" />
              <span>Back to Role Gateway</span>
            </Link>

            <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-spiceGold/10 text-spiceGold border border-spiceGold/30 uppercase">
              {location.pathname.replace('/', '')} Portal
            </span>
          </div>
        )}

        {/* Right Action Controls: ONLY Theme Toggle (Light/Dark Mode) + JWT Auth */}
        <div className="flex items-center gap-3">
          
          {/* JWT Auth Profile Status (Inside Portals or Header) */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-card border border-border p-1.5 rounded-xl text-xs font-mono shadow-sm">
              <div className="px-2.5 py-1 rounded-lg bg-spiceGold/15 border border-spiceGold/30 text-pineCanopy dark:text-spiceGold font-bold flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 text-spiceGold" />
                <span className="capitalize">{currentUser.role}</span>
              </div>
              <span className="hidden xl:inline text-foreground font-semibold font-sans px-1">
                {currentUser.name}
              </span>
              <button
                onClick={onLogout}
                className="p-1.5 text-muted-foreground hover:text-brickUrgency hover:bg-muted rounded-lg transition-colors"
                title="Log Out & Clear Session"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : !isLandingPage && (
            <button
              onClick={() => onOpenAuthModal('provider')}
              className="btn-primary-gold flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono shadow-sm"
            >
              <Key className="h-3.5 w-3.5" />
              <span>JWT Login</span>
            </button>
          )}

          {/* Theme Toggle Button (Light/Dark Mode) — Primary control requested by user */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-all shadow-sm"
            title="Toggle Light / Dark Mode"
          >
            {isDark ? <Sun className="h-4 w-4 text-spiceGold" /> : <Moon className="h-4 w-4 text-warmCharcoal" />}
          </button>

        </div>

      </div>
    </header>
  );
};
