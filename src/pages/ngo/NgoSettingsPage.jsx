import React from 'react';
import { ShieldCheck, Upload, CheckCircle2 } from 'lucide-react';

export const NgoSettingsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Organization Verification
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            NGO Verification & <span className="gradient-text">Settings</span>
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto premium-card p-6 space-y-6">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-mossVerified" />
          NGO Credentials & 12A/80G Verification
        </h3>

        <div className="p-4 rounded-xl bg-mossVerified/10 border border-mossVerified/30 font-mono text-xs space-y-1">
          <p>Account Verification Status: <strong className="text-mossVerified font-bold">VERIFIED NGO</strong></p>
          <p className="text-muted-foreground">Verification Date: 2026-09-01</p>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-background border border-border flex justify-between">
            <span>Registration Certificate:</span>
            <strong>NGO-REG-DEL-2021-884.pdf</strong>
          </div>
          <div className="p-3 rounded-xl bg-background border border-border flex justify-between">
            <span>12A / 80G Tax Exemption:</span>
            <strong>12A-AACTA9921E.pdf</strong>
          </div>
          <div className="p-3 rounded-xl bg-background border border-border flex justify-between">
            <span>Address Proof:</span>
            <strong>UTILITY-BILL-2026.pdf</strong>
          </div>
        </div>

        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center text-xs">
          <Upload className="h-8 w-8 text-spiceGold mx-auto mb-2" />
          <p className="font-semibold text-foreground">Upload Updated Institutional Certificates (PDF/JPG)</p>
        </div>
      </div>
    </div>
  );
};

export default NgoSettingsPage;
