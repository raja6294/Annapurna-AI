import React, { useState } from 'react';
import { Award, Upload, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProviderSettingsPage = () => {
  const [badgeStatus, setBadgeStatus] = useState('Verified Provider');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
              Organization Profile
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Provider Organization <span className="gradient-text">Settings</span>
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto premium-card p-6 space-y-6">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <Award className="h-5 w-5 text-spiceGold" />
          Verified Provider Trust Badge
        </h3>
        <p className="text-xs text-muted-foreground">
          Optional FSSAI / GST license upload to build high trust ratings with partner NGOs.
        </p>

        <div className="space-y-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-spiceGold/10 border border-spiceGold/30 text-spiceGold font-bold flex items-center justify-between">
            <span>Status: {badgeStatus}</span>
            <CheckCircle2 className="h-5 w-5 text-mossVerified" />
          </div>

          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
            <Upload className="h-8 w-8 text-spiceGold mx-auto mb-2" />
            <p className="font-semibold text-foreground">Upload FSSAI License or GST Certificate (PDF/JPG)</p>
          </div>

          <button
            onClick={() => {
              setBadgeStatus('Verified Provider');
              confetti({ particleCount: 50 });
              alert("Business credentials uploaded. Verified Provider badge active.");
            }}
            className="btn-primary-gold w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs"
          >
            Apply for Verified Provider Badge
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderSettingsPage;
