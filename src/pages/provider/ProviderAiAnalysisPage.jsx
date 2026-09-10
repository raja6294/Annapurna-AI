import React from 'react';
import { Sparkles, Camera, AlertTriangle, CheckCircle2, ShieldCheck, Thermometer } from 'lucide-react';

export const ProviderAiAnalysisPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
              Neural Inspection Diagnostics
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            ANNAPURNA AI <span className="gradient-text">VISION</span>
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="premium-card p-6 space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-spiceGold" />
              <div>
                <h3 className="font-bold text-foreground text-sm font-sans">Visual Assessment Results</h3>
                <p className="text-muted-foreground text-[11px]">Model: YOLOv8 + MobileNetV2 Thermal Fusion</p>
              </div>
            </div>
            <span className="tech-badge">94% Confidence</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <span className="text-muted-foreground block text-[10px]">Detected Food</span>
              <strong className="text-foreground text-sm font-sans font-bold">Paneer Butter Masala</strong>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <span className="text-muted-foreground block text-[10px]">Food Type</span>
              <strong className="text-mossVerified text-sm font-sans font-bold">Vegetarian</strong>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <span className="text-muted-foreground block text-[10px]">Visual Condition</span>
              <strong className="text-mossVerified text-sm font-sans font-bold">Good</strong>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <span className="text-muted-foreground block text-[10px]">Estimated Redistribution Window</span>
              <strong className="text-spiceGold text-sm font-sans font-bold">4h 10m</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border space-y-1">
            <span className="text-muted-foreground block">Redistribution Status</span>
            <strong className="text-mossVerified font-bold text-sm">Recommended for further verification</strong>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 leading-relaxed font-sans">
            <h4 className="font-bold text-xs flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" /> Safety Disclaimer
            </h4>
            <p className="text-xs">
              AI provides a preliminary visual assessment and does not certify food safety or microbiological safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderAiAnalysisPage;
