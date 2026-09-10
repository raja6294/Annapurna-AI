import React, { useState, useEffect } from 'react';
import { Lock, Key, ShieldCheck, UserCheck, HeartHandshake, UtensilsCrossed, Sparkles, ArrowRight, Eye, Check } from 'lucide-react';
import { MOCK_USERS, authenticateUser } from '../lib/auth';

export const AuthModal = ({ isOpen, onClose, onLoginSuccess, initialRole = 'provider' }) => {
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState(MOCK_USERS[initialRole]?.email || 'provider@tajkitchens.com');
  const [password, setPassword] = useState('password123');
  const [showTokenPreview, setShowTokenPreview] = useState(false);
  const [generatedToken, setGeneratedToken] = useState(null);
  // ALL hooks must be declared before any conditional return (React Rules of Hooks)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Re-sync internal state whenever the gateway role button changes
  useEffect(() => {
    const preset = MOCK_USERS[initialRole];
    if (preset) {
      setRole(preset.role);
      setEmail(preset.email);
      setPassword('password123');
      setShowTokenPreview(false);
      setGeneratedToken(null);
    }
  }, [initialRole]);

  if (!isOpen) return null;

  const handlePresetSelect = (presetKey) => {
    const preset = MOCK_USERS[presetKey];
    if (preset) {
      setRole(preset.role);
      setEmail(preset.email);
      setPassword('password123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const session = await authenticateUser(email, password, role);
      setGeneratedToken(session.token);
      setShowTokenPreview(true);
      setTimeout(() => {
        onLoginSuccess(session);
        onClose();
      }, 800);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pineCanopy text-spiceGold border border-spiceGold/30">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                Role Authentication
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                JWT-backed login with PROVIDER / NGO / ADMIN roles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground font-mono text-sm"
          >
            ✕
          </button>
        </div>

        {/* 1-Click Role Presets */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-muted-foreground mb-2">
            Quick Preset Demo Login (Click to Fill):
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => handlePresetSelect('provider')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                email === MOCK_USERS.provider.email
                  ? 'bg-spiceGold/15 border-spiceGold text-pineCanopy font-bold dark:text-spiceGold'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-1.5 font-sans font-semibold text-foreground">
                <UtensilsCrossed className="h-3.5 w-3.5 text-spiceGold" />
                <span>Provider</span>
              </div>
              <span className="text-[10px] text-muted-foreground block truncate">Taj Kitchens</span>
            </button>

            <button
              type="button"
              onClick={() => handlePresetSelect('ngo')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                email === MOCK_USERS.ngo.email
                  ? 'bg-spiceGold/15 border-spiceGold text-pineCanopy font-bold dark:text-spiceGold'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-1.5 font-sans font-semibold text-foreground">
                <HeartHandshake className="h-3.5 w-3.5 text-mossVerified" />
                <span>Verified NGO</span>
              </div>
              <span className="text-[10px] text-muted-foreground block truncate">Akshaya Shelter</span>
            </button>

            <button
              type="button"
              onClick={() => handlePresetSelect('ngo_unverified')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                email === MOCK_USERS.ngo_unverified.email
                  ? 'bg-amber-500/15 border-amber-500 text-amber-900 font-bold dark:text-amber-300'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-1.5 font-sans font-semibold text-foreground">
                <Lock className="h-3.5 w-3.5 text-amber-600" />
                <span>Unverified NGO</span>
              </div>
              <span className="text-[10px] text-muted-foreground block truncate">Jan Seva (Gate Demo)</span>
            </button>

            <button
              type="button"
              onClick={() => handlePresetSelect('admin')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                email === MOCK_USERS.admin.email
                  ? 'bg-spiceGold/15 border-spiceGold text-pineCanopy font-bold dark:text-spiceGold'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-1.5 font-sans font-semibold text-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-spiceGold" />
                <span>Admin Ops</span>
              </div>
              <span className="text-[10px] text-muted-foreground block truncate">MoFPI Moderator</span>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-muted-foreground mb-1">User Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-accent focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-muted-foreground mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-accent focus:outline-none"
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs">
              {error}
            </div>
          )}

          {/* Token Generation Preview */}
          {showTokenPreview && generatedToken && (
            <div className="p-3 rounded-xl bg-pineCanopy text-milledStone border border-spiceGold/40 text-[11px] space-y-1 animate-pulse">
              <span className="text-spiceGold font-bold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Fake JWT Session Token Issued:
              </span>
              <p className="break-all font-mono text-[9px] text-slate-300 bg-black/40 p-2 rounded">
                {generatedToken}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary-gold w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-accent"
          >
            <span>{isLoading ? 'Signing in...' : 'Sign In & Enter Portal'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
