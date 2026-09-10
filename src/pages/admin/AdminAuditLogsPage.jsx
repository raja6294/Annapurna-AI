import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const AdminAuditLogsPage = () => {
  const logs = [
    { time: '14:22:05', event: 'NGO_VERIFICATION_APPROVED', user: 'admin@mofpi.gov.in', target: 'Hope Welfare Centre' },
    { time: '13:45:12', event: 'SURPLUS_LISTING_CREATED', user: 'provider@tajkitchens.com', target: 'FOOD-2026-001 (50kg)' },
    { time: '12:10:40', event: 'MATCH_SCORE_COMPUTED', user: 'AI_WORKER_ENGINE', target: 'Score 96% -> Hope Welfare' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Security Trail
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            System Audit <span className="gradient-text">Logs</span>
          </h1>
        </div>
      </div>

      <div className="premium-card p-6 space-y-3 font-mono text-xs">
        {logs.map((l, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-background border border-border flex justify-between">
            <span className="text-spiceGold font-bold">{l.time}</span>
            <span className="text-foreground font-bold">{l.event}</span>
            <span className="text-muted-foreground">{l.user}</span>
            <span className="text-mossVerified">{l.target}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAuditLogsPage;
