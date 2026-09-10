import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake, CheckCircle2, Clock, MapPin, Truck, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NgoIncomingPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isClaimed, setIsClaimed] = useState(false);

  const handleConfirmClaim = () => {
    setIsClaimed(true);
    setIsModalOpen(false);
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Donation Claims
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Claim Food <span className="gradient-text">Donation</span>
          </h1>
        </div>
      </div>

      {isClaimed && (
        <div className="p-6 rounded-2xl bg-mossVerified/10 border border-mossVerified/30 text-mossVerified space-y-3 font-mono text-xs shadow-md">
          <div className="flex items-center gap-2 text-base font-bold font-display">
            <CheckCircle2 className="h-6 w-6 text-mossVerified" />
            <span>Donation Accepted</span>
          </div>
          <div className="space-y-1 text-foreground">
            <p>✓ Provider Notified</p>
            <p>✓ Pickup Created</p>
            <p>✓ Logistics Optimizer Activated</p>
          </div>
          <button
            onClick={() => navigate('/ngo/deliveries')}
            className="btn-primary-gold px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider mt-2 flex items-center gap-2"
          >
            <Truck className="h-4 w-4" />
            <span>Track Live Shipment Stepper</span>
          </button>
        </div>
      )}

      {!isClaimed && (
        <div className="p-8 rounded-2xl bg-card border border-border text-center space-y-4">
          <p className="text-xs font-mono text-muted-foreground">Select an opportunity to claim food for your shelter.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary-gold px-6 py-3 rounded-xl font-bold text-xs">
            Open Claim Confirmation Modal
          </button>
        </div>
      )}

      {/* Claim Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-display font-semibold text-xl text-foreground">Claim Food Donation?</h3>
                <span className="tech-badge">NGO Claim Gate</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs text-muted-foreground mt-4">
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Food Item:</span>
                  <strong className="text-foreground font-sans text-sm">Paneer Butter Masala + Rice</strong>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Quantity:</span>
                  <strong className="text-foreground text-sm">50 kg</strong>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Provider:</span>
                  <strong className="text-foreground font-sans">Taj Grand Kitchens & Banquet</strong>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Distance:</span>
                  <strong className="text-foreground">4.2 km</strong>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Estimated Travel:</span>
                  <strong className="text-foreground">22 minutes</strong>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span>Redistribution Window:</span>
                  <strong className="text-spiceGold">4h 10m</strong>
                </div>
                <div className="flex justify-between">
                  <span>Match Score:</span>
                  <strong className="text-mossVerified text-sm">96%</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleConfirmClaim}
                className="btn-primary-gold flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider"
              >
                CONFIRM CLAIM
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-3.5 rounded-xl border border-border text-muted-foreground hover:text-foreground font-mono font-bold text-xs"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NgoIncomingPage;
