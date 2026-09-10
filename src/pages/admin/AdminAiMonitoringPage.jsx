import React from 'react';
import { Sparkles, Cpu, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const AdminAiMonitoringPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Neural Telemetry
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            AI Intelligence <span className="gradient-text">Monitor</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">AI Assessments Today</span>
          <strong className="text-2xl font-display font-semibold text-foreground">142</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Average Confidence</span>
          <strong className="text-2xl font-display font-semibold text-mossVerified">94.8%</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Manual Verification Cases</span>
          <strong className="text-2xl font-display font-semibold text-amber-500">4</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Not Recommended Cases</span>
          <strong className="text-2xl font-display font-semibold text-brickUrgency">2</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Active Matching Operations</span>
          <strong className="text-2xl font-display font-semibold text-foreground">38</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Successful Matches</span>
          <strong className="text-2xl font-display font-semibold text-mossVerified">1,380</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Failed Matches</span>
          <strong className="text-2xl font-display font-semibold text-brickUrgency">1</strong>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-[10px] text-muted-foreground block">Average Matching Time</span>
          <strong className="text-2xl font-display font-semibold text-spiceGold">1.2s</strong>
        </div>
      </div>
    </div>
  );
};

export default AdminAiMonitoringPage;
