import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UtensilsCrossed, ShieldCheck, HeartHandshake, Key, LogOut, Sun, Moon, ArrowLeft, Eye } from 'lucide-react';

export const PortalHeader = ({ currentUser, onLogout, isDark, toggleTheme, adminViewMode, setAdminViewMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = currentUser?.role?.toLowerCase() || 'provider';

  const getRoleBadge = () => {
    if (role === 'provider') {
      return {
        label: '🔑 PROVIDER PORTAL',
        sub: currentUser?.name || 'Taj Grand Kitchens & Banquet',
        bg: 'bg-spiceGold/15 border-spiceGold/40 text-spiceGold'
      };
    }
    if (role === 'ngo') {
      return {
        label: '🤝 NGO RECEIVER PORTAL',
        sub: currentUser?.name || 'Hope Welfare Centre',
        bg: 'bg-mossVerified/15 border-mossVerified/40 text-mossVerified'
      };
    }
    return {
      label: '🛡 ADMIN GOVERNANCE',
      sub: currentUser?.name || 'MoFPI Platform Admin',
      bg: 'bg-pineCanopy/20 border-pineCanopy/40 text-foreground'
    };
  };

  const badge = getRoleBadge();

  return (
    <div className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md transition-all shadow-sm">
      <div className="px-4 sm:px-8 flex h-16 items-center justify-between gap-4">
        
        {/* Left: Brand & Portal Badge */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pineCanopy text-spiceGold shadow-sm group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-foreground hidden sm:inline">
              ANNAPURNA <span className="gradient-text">AI</span>
            </span>
          </Link>

          <span className="h-6 w-px bg-border hidden sm:block" />

          {/* Current Role Badge */}
          <div className={`px-3 py-1 rounded-xl border font-mono text-xs font-bold flex items-center gap-2 ${badge.bg}`}>
            <span>{badge.label}</span>
            <span className="hidden lg:inline text-muted-foreground font-sans font-normal border-l border-border/60 pl-2">
              {badge.sub}
            </span>
          </div>
        </div>

        {/* Center: Admin Environment Monitoring Switch (Admin ONLY) */}
        {role === 'admin' && (
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-card border border-border text-xs font-mono">
            <span className="text-[10px] text-muted-foreground px-2">Admin Monitor:</span>
            <button
              onClick={() => {
                setAdminViewMode && setAdminViewMode('admin');
                navigate('/admin/dashboard');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                location.pathname.startsWith('/admin') ? 'bg-pineCanopy text-spiceGold font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => {
                setAdminViewMode && setAdminViewMode('provider');
                navigate('/provider/dashboard');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                location.pathname.startsWith('/provider') ? 'bg-spiceGold text-pineCanopy font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>View Provider Env</span>
            </button>
            <button
              onClick={() => {
                setAdminViewMode && setAdminViewMode('ngo');
                navigate('/ngo/dashboard');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                location.pathname.startsWith('/ngo') ? 'bg-mossVerified text-white font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>View NGO Env</span>
            </button>
          </div>
        )}

        {/* Right: Controls & Logout */}
        <div className="flex items-center gap-3">
          
          <Link
            to="/"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-mono font-semibold text-foreground transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-spiceGold" />
            <span>Role Gateway</span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-all shadow-sm"
            title="Toggle Light / Dark Mode"
          >
            {isDark ? <Sun className="h-4 w-4 text-spiceGold" /> : <Moon className="h-4 w-4 text-warmCharcoal" />}
          </button>

          {/* User Logout Button */}
          {currentUser && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brickUrgency/40 bg-brickUrgency/10 text-brickUrgency hover:bg-brickUrgency/20 text-xs font-mono font-bold transition-all"
              title="Log Out & Return to Role Selection"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default PortalHeader;
