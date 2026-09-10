import React, { useState } from 'react';
import { Sliders, ToggleLeft, ToggleRight, Download, Server } from 'lucide-react';
import { MOCK_FEATURE_FLAGS, MOCK_MESSAGE_QUEUES } from '../../data/mockData';
import confetti from 'canvas-confetti';

export const AdminSettingsPage = () => {
  const [featureFlags, setFeatureFlags] = useState(MOCK_FEATURE_FLAGS);

  const toggleFeatureFlag = (id) => {
    setFeatureFlags(prev => prev.map(flag => flag.id === id ? { ...flag, enabled: !flag.enabled } : flag));
  };

  const handleExportEsg = () => {
    confetti({ particleCount: 60 });
    alert("ESG Audit Report (PDF/Excel) downloaded!");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              System Control & Audit Logs
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Platform Governance <span className="gradient-text">Settings</span>
          </h1>
        </div>
      </div>

      <div className="premium-card p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h3 className="font-display font-semibold text-lg text-foreground">Dynamic Feature Flags Control</h3>
          <button onClick={handleExportEsg} className="btn-primary-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export ESG Audit Report</span>
          </button>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {featureFlags.map((ff) => (
            <div key={ff.id} className="p-4 rounded-xl bg-background border border-border flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-spiceGold">{ff.name}</span>
                  <span className="tech-badge">{ff.rolloutRole}</span>
                </div>
                <p className="text-muted-foreground mt-1 font-sans">{ff.description}</p>
              </div>

              <button onClick={() => toggleFeatureFlag(ff.id)}>
                {ff.enabled ? (
                  <ToggleRight className="h-8 w-8 text-mossVerified" />
                ) : (
                  <ToggleLeft className="h-8 w-8 text-muted-foreground" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
