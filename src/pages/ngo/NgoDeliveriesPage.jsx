import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle2, MapPin, Clock, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../lib/api';

const PICKUP_STEPS = [
  { id: 'ngo_accepted',    label: 'Claim Accepted',   desc: 'You accepted the donation' },
  { id: 'ngo_on_the_way',  label: 'On The Way',       desc: 'Heading to provider' },
  { id: 'ngo_arrived',     label: 'Arrived',          desc: 'At provider location' },
  { id: 'handover',        label: 'Handover',         desc: 'Awaiting provider confirmation' },
  { id: 'completed',       label: 'Completed',        desc: 'Food received successfully' },
];

const STATUS_TO_STEP = {
  'NGO_ACCEPTED': 0,
  'NOT_STARTED': 0, // Fallback
  'NGO_ON_THE_WAY': 1,
  'ARRIVED': 2,
  'HANDOVER_PENDING': 3,
  'HANDED_OVER': 3,
  'COMPLETED': 4,
};

export const NgoDeliveriesPage = () => {
  const [pickup, setPickup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await api.getNgoDashboard();
      const active = (res.data?.upcomingPickups || []).find((p) => p.status !== 'COMPLETED' && p.status !== 'CANCELLED');
      setPickup(active || null);
      
      if (active) {
        const step = STATUS_TO_STEP[active.status] ?? 0;
        setCurrentStep(step);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (newStatus) => {
    if (!pickup?._id) return;
    setIsUpdating(true);
    try {
      await api.updatePickupStatus(pickup._id, { status: newStatus });
      await fetchDashboard();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground font-mono text-sm">Loading active deliveries...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Live Shipment Stepper
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Incoming Food <span className="gradient-text">Delivery</span>
          </h1>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-sm">{error}</div>
      )}

      {!pickup ? (
        <div className="p-12 text-center text-muted-foreground font-mono text-sm border border-dashed border-border rounded-2xl">
          No active incoming deliveries. Claim food from the opportunities page.
        </div>
      ) : (
        <>
          {/* Overview Info Card */}
          <div className="p-6 rounded-2xl bg-card border border-border grid grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
            <div>
              <span className="text-muted-foreground block text-[10px]">Pickup Status</span>
              <strong className="text-foreground font-sans font-bold text-sm">{PICKUP_STEPS[currentStep]?.label || 'Unknown'}</strong>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px]">Quantity Remaining</span>
              <strong className="text-foreground text-sm font-bold">{pickup.distanceRemaining || 0} km</strong>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px]">ETA</span>
              <strong className="text-spiceGold text-sm font-bold">{pickup.etaMinutes || 0} minutes</strong>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px]">Started</span>
              <strong className="text-foreground text-sm font-bold">{pickup.startedAt ? new Date(pickup.startedAt).toLocaleTimeString() : 'Not Started'}</strong>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px]">Destination Address</span>
              <strong className="text-foreground text-sm font-bold truncate block">{pickup.destinationLocation?.address || 'Unknown'}</strong>
            </div>
          </div>

          {/* Status Stepper */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-6">
              Delivery Status Lifecycle
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {PICKUP_STEPS.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={step.id} className="flex flex-col items-center text-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl font-mono text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-spiceGold text-pineCanopy ring-4 ring-spiceGold/30 scale-110'
                          : isCompleted
                          ? 'bg-pineCanopy text-milledStone'
                          : 'bg-muted text-muted-foreground border border-border'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                    </div>
                    <span className={`mt-2 text-xs font-semibold ${isCurrent ? 'text-spiceGold' : 'text-foreground'}`}>
                      {step.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      {step.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center border-t border-border pt-6">
              {currentStep === 0 && (
                <button
                  onClick={() => handleUpdateStatus('NGO_ON_THE_WAY')}
                  disabled={isUpdating}
                  className="btn-primary-gold px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md disabled:opacity-50"
                >
                  START ROUTE / ON THE WAY
                </button>
              )}
              {currentStep === 1 && (
                <button
                  onClick={() => handleUpdateStatus('ARRIVED')}
                  disabled={isUpdating}
                  className="btn-primary-gold px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md disabled:opacity-50"
                >
                  CONFIRM ARRIVED AT PROVIDER
                </button>
              )}
              {currentStep === 2 && (
                <div className="py-3 px-8 rounded-xl border border-spiceGold/40 bg-spiceGold/10 text-spiceGold font-mono text-xs font-bold">
                  Awaiting Provider to confirm Handover...
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NgoDeliveriesPage;
