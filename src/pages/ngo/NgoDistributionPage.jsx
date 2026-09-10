import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Users, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NgoDistributionPage = () => {
  const navigate = useNavigate();

  const [foodReceived, setFoodReceived] = useState(50);
  const [foodDistributed, setFoodDistributed] = useState(48);
  const [remaining, setRemaining] = useState(2);
  const [beneficiaries, setBeneficiaries] = useState(120);

  const handleConfirmDistribution = (e) => {
    e.preventDefault();
    confetti({ particleCount: 75, spread: 65 });
    alert("Food distribution confirmed! Community impact metrics logged successfully.");
    navigate('/ngo/impact');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Post-Delivery Community Log
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Food <span className="gradient-text">Distribution</span>
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto premium-card p-6">
        <form onSubmit={handleConfirmDistribution} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <span className="text-muted-foreground block text-[10px]">Food Received</span>
              <strong className="text-foreground text-sm font-bold">{foodReceived} kg</strong>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <span className="text-muted-foreground block text-[10px]">Food Distributed</span>
              <strong className="text-mossVerified text-sm font-bold">{foodDistributed} kg</strong>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <span className="text-muted-foreground block text-[10px]">Remaining Stock</span>
              <strong className="text-spiceGold text-sm font-bold">{remaining} kg</strong>
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground mb-1">Beneficiaries Served</label>
            <input
              type="number"
              value={beneficiaries}
              onChange={(e) => setBeneficiaries(Number(e.target.value))}
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold"
            />
          </div>

          <div>
            <label className="block text-muted-foreground mb-1">Distribution Date & Time</label>
            <input
              type="text"
              defaultValue="Today, 3:30 PM"
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground"
            />
          </div>

          <button
            type="submit"
            className="btn-primary-gold w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md mt-4 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>CONFIRM DISTRIBUTION</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NgoDistributionPage;
