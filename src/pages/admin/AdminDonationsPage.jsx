import React from 'react';
import { Gift, CheckCircle2, ArrowRight } from 'lucide-react';

export const AdminDonationsPage = () => {
  const steps = ['Food Created', 'AI Assessment', 'Matching', 'NGO Claim', 'Pickup', 'Transit', 'Delivery', 'Distribution'];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Donation Audit Trail
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Donation Lifecycle <span className="gradient-text">Monitor</span>
          </h1>
        </div>
      </div>

      <div className="premium-card p-6 space-y-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          Donation State Machine Visualizer
        </h3>

        <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-muted/40 font-mono text-xs text-foreground">
          {steps.map((s, idx) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pineCanopy text-spiceGold font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{s}</span>
              </div>
              {idx < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground hidden lg:block" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDonationsPage;
