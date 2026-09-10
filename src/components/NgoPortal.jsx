import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, XCircle, Clock, MapPin, Users, Utensils, ShieldCheck, ArrowRight, PlusCircle, AlertTriangle, Star, Map as MapIcon, ListFilter, ShieldAlert, Upload } from 'lucide-react';
import { MapView } from './MapView';
import confetti from 'canvas-confetti';

export const NgoPortal = ({ listings, ngos, onAcceptOffer, onDeclineOffer, activeNgo, setActiveNgo }) => {
  const [ngoTab, setNgoTab] = useState('map'); // 'map' | 'list' | 'requirements' | 'my_verification'
  const [selectedNgo, setSelectedNgo] = useState(activeNgo || ngos[0]);
  
  // Feedback Modal State
  const [showFeedbackModal, setShowFeedbackModal] = useState(null); // listingId or null
  const [ratingStars, setRatingStars] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('Food was piping hot, excellent packaging, and delivered well within the safety window!');

  const isVerified = selectedNgo.verificationStatus === 'verified';

  const handleAccept = (listingId) => {
    if (!isVerified) {
      alert("Security Check: Your NGO account is pending document verification by Admin. You cannot claim listings until verified.");
      return;
    }
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    onAcceptOffer(listingId);
    setShowFeedbackModal(listingId);
  };

  const handleSubmitFeedback = () => {
    alert("Feedback & Quality Rating logged successfully! Thank you for maintaining ecosystem trust.");
    setShowFeedbackModal(null);
  };

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="section-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-border mb-8">
          <div>
            <div className="section-pill-badge mb-2 inline-flex">
              <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                NGO & Welfare Receiver Portal
              </span>
            </div>
            <h2 className="text-3xl font-display text-foreground">
              Discover, Claim & <span className="gradient-text">Redistribute Surplus</span>
            </h2>
          </div>

          {/* Tab Controls */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-card p-1.5 border border-border text-xs font-semibold">
            <button
              onClick={() => setNgoTab('map')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                ngoTab === 'map' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MapIcon className="h-3.5 w-3.5" />
              <span>Interactive Map View</span>
            </button>
            <button
              onClick={() => setNgoTab('list')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                ngoTab === 'list' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ListFilter className="h-3.5 w-3.5" />
              <span>Listings Grid ({listings.length})</span>
            </button>
            <button
              onClick={() => setNgoTab('requirements')}
              className={`px-4 py-2 rounded-lg transition-all ${
                ngoTab === 'requirements' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Post Demand Need
            </button>
            <button
              onClick={() => setNgoTab('my_verification')}
              className={`px-4 py-2 rounded-lg transition-all ${
                ngoTab === 'my_verification' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Verification Documents
            </button>
          </div>
        </div>

        {/* Selected NGO Identity & Verification Security Gate Banner */}
        <div className="mb-8 p-5 rounded-2xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mossVerified/10 text-mossVerified font-bold">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground text-lg">{selectedNgo.name}</h3>
                {isVerified ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-mossVerified/10 text-mossVerified font-mono text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Verified NGO
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 font-mono text-xs font-bold flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Pending Verification Gate
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                {selectedNgo.category} • {selectedNgo.location} • Beneficiaries: {selectedNgo.beneficiariesCount}
              </p>
            </div>
          </div>

          {/* Quick NGO Identity Selector for Judges */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">Switch NGO Profile:</span>
            <select
              value={selectedNgo.id}
              onChange={(e) => {
                const found = ngos.find(n => n.id === e.target.value);
                if (found) setSelectedNgo(found);
              }}
              className="bg-background text-foreground text-xs font-mono px-3 py-1.5 rounded-xl border border-border focus:ring-1 focus:ring-accent"
            >
              {ngos.map(n => (
                <option key={n.id} value={n.id}>
                  {n.name} ({n.verificationStatus})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Unverified Security Gate Alert */}
        {!isVerified && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs leading-relaxed flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm font-display mb-0.5">Verification Gate Active</h4>
              <p>
                Your account is currently sitting in <strong className="font-mono">pending_verification</strong>. You can browse live map listings, but food claiming is locked until Admin approves your 12A/80G/FCRA credentials. Click <strong>"Verification Documents"</strong> above to view or update files.
              </p>
            </div>
          </div>
        )}

        {/* 1. Interactive Map View */}
        {ngoTab === 'map' && (
          <div className="space-y-6">
            <MapView listings={listings} onClaimListing={handleAccept} isNgoVerified={isVerified} />
          </div>
        )}

        {/* 2. Listings Grid View */}
        {ngoTab === 'list' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {listings.map((item) => {
              const ringColor = item.urgencyLevel === 'fresh' ? 'freshness-ring-fresh' : item.urgencyLevel === 'warning' ? 'freshness-ring-warning' : 'freshness-ring-urgent';
              return (
                <div key={item.id} className="premium-card p-6 flex flex-col justify-between">
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="tech-badge">{item.id}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-mono font-bold">
                        AI Match Score: {item.matchedNgo?.matchScore || 96}/100
                      </span>
                    </div>

                    {/* Image & Title with Radial Ring */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`relative h-20 w-20 rounded-2xl overflow-hidden border-4 ${ringColor} shrink-0 shadow-sm`}>
                        <img src={item.photos?.[0]} alt="Food thumbnail" className="h-full w-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground text-[8px] font-mono text-center font-bold">
                          {item.freshnessScore}% Fresh
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-foreground leading-tight mb-1">{item.foodName}</h4>
                        <p className="text-xs text-muted-foreground font-sans mb-1">Provider: <strong>{item.providerName}</strong> ({item.location})</p>
                        <span className="inline-flex items-center gap-1 text-[11px] text-mossVerified font-mono font-semibold">
                          <CheckCircle2 className="h-3 w-3" /> {item.aiResult?.confidence || 94.8}% Vision Verified
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Urgency Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-muted/40 border border-border">
                        <span className="text-muted-foreground block text-[10px]">Quantity</span>
                        <strong className="text-foreground text-sm font-bold">{item.quantityKg} kg ({item.portions} meals)</strong>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <span className="text-amber-700 dark:text-amber-400 block text-[10px] flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> Expiry Window
                        </span>
                        <strong className="text-amber-700 dark:text-amber-300 text-sm font-bold">
                          {item.freshnessWindowHours || 4.5} Hours
                        </strong>
                      </div>
                    </div>

                    {/* AI Scoring Function Breakdown */}
                    <div className="p-3.5 rounded-xl bg-background border border-border mb-4 text-xs space-y-1.5 font-mono text-muted-foreground">
                      <span className="font-bold text-accent text-[11px] block">Matching Scoring Engine Breakdown:</span>
                      <div className="flex justify-between"><span>Proximity Score:</span><span className="text-foreground">{item.matchedNgo?.scoreBreakdown?.proximity || 28}/30</span></div>
                      <div className="flex justify-between"><span>Capacity Fit:</span><span className="text-foreground">{item.matchedNgo?.scoreBreakdown?.capacity || 25}/25</span></div>
                      <div className="flex justify-between"><span>Time Urgency:</span><span className="text-foreground">{item.matchedNgo?.scoreBreakdown?.urgency || 24}/25</span></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border flex items-center gap-3">
                    <button
                      onClick={() => handleAccept(item.id)}
                      disabled={!isVerified || item.status === 'Accepted' || item.status === 'In Transit'}
                      className={`flex-1 py-3 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all ${
                        item.status === 'Accepted' || item.status === 'In Transit'
                          ? 'bg-mossVerified text-white cursor-default'
                          : isVerified
                          ? 'btn-primary-gold shadow-accent'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>
                        {!isVerified
                          ? '🔒 Verification Gate Locked'
                          : item.status === 'Accepted'
                          ? 'Claimed — Driver En Route'
                          : 'Claim Food Listing'}
                      </span>
                    </button>

                    <button
                      onClick={() => onDeclineOffer(item.id)}
                      className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground text-xs font-semibold"
                    >
                      Decline
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* 3. Post Requirements Demand */}
        {ngoTab === 'requirements' && (
          <div className="max-w-2xl mx-auto premium-card p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-accent" />
              Broadcast Surplus Demand Requirement
            </h3>
            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-muted-foreground mb-1">Required Category</label>
                <select className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-accent focus:outline-none font-sans">
                  <option>Cooked Meals (Vegetarian)</option>
                  <option>Cooked Meals (Non-Vegetarian)</option>
                  <option>Raw Produce / Vegetables</option>
                  <option>Bakery & Snacks</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground mb-1">Target Beneficiaries (Meals Needed)</label>
                <input type="number" defaultValue={180} className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-accent" />
              </div>

              <button
                onClick={() => alert("Requirement broadcasted to AI matching engine!")}
                className="btn-primary-gold w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs"
              >
                Broadcast Requirement to Provider Network
              </button>
            </div>
          </div>
        )}

        {/* 4. Verification Documents View */}
        {ngoTab === 'my_verification' && (
          <div className="max-w-2xl mx-auto premium-card p-6 space-y-6">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent" />
              NGO Registration & Tax Verification Status
            </h3>

            <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 font-mono text-xs space-y-1">
              <p>Account Status: <strong className="text-foreground uppercase">{selectedNgo.verificationStatus}</strong></p>
              <p className="text-muted-foreground">Submitted At: {selectedNgo.documentsSubmitted?.submittedAt || '2026-09-01'}</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-background border border-border flex justify-between">
                <span>1. Registration Cert:</span>
                <strong>{selectedNgo.documentsSubmitted?.regCert || 'Uploaded.pdf'}</strong>
              </div>
              <div className="p-3 rounded-xl bg-background border border-border flex justify-between">
                <span>2. 12A/80G Exemption:</span>
                <strong>{selectedNgo.documentsSubmitted?.tax12A || 'Uploaded.pdf'}</strong>
              </div>
              <div className="p-3 rounded-xl bg-background border border-border flex justify-between">
                <span>3. Address Proof:</span>
                <strong>{selectedNgo.documentsSubmitted?.addressProof || 'Uploaded.pdf'}</strong>
              </div>
            </div>

            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center text-xs">
              <Upload className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="font-semibold text-foreground">Re-upload Updated Certificates (PDF/JPG)</p>
            </div>
          </div>
        )}

      </div>

      {/* Food Quality Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h4 className="font-display font-semibold text-lg text-foreground">Receipt Confirmed — Rate Food Quality</h4>
            <p className="text-xs text-muted-foreground">Your feedback updates the Provider's reliability rating score.</p>
            
            <div className="flex items-center gap-2 justify-center py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRatingStars(star)}
                  className={`h-7 w-7 cursor-pointer transition-transform hover:scale-110 ${
                    star <= ratingStars ? 'text-amber-500 fill-amber-500' : 'text-border'
                  }`}
                />
              ))}
            </div>

            <textarea
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              className="w-full h-24 p-3 rounded-xl border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-accent"
              placeholder="Leave feedback on packaging, temperature, and freshness..."
            />

            <button onClick={handleSubmitFeedback} className="btn-primary-gold w-full py-3 rounded-xl font-bold text-xs">
              Submit Quality Rating & Log Impact
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
