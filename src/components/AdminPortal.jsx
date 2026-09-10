import React, { useState } from 'react';
import { ShieldCheck, UserCheck, AlertTriangle, MapPin, Activity, FileSpreadsheet, Download, RefreshCw, Server, ToggleLeft, ToggleRight, CheckCircle2, XCircle, Search, Eye, Filter } from 'lucide-react';
import { MapView } from './MapView';
import { MOCK_MESSAGE_QUEUES, MOCK_FEATURE_FLAGS } from '../data/mockData';
import confetti from 'canvas-confetti';

export const AdminPortal = ({ ngos, setNgos, listings, onApproveNgo, onRejectNgo }) => {
  const [adminTab, setAdminTab] = useState('verification'); // 'verification' | 'moderation' | 'queues' | 'feature_flags' | 'analytics'
  const [featureFlags, setFeatureFlags] = useState(MOCK_FEATURE_FLAGS);
  const [isExportingEsg, setIsExportingEsg] = useState(false);
  const [selectedDocModal, setSelectedDocModal] = useState(null);

  const toggleFeatureFlag = (id) => {
    setFeatureFlags(prev => prev.map(flag => flag.id === id ? { ...flag, enabled: !flag.enabled } : flag));
  };

  const handleExportEsg = () => {
    setIsExportingEsg(true);
    setTimeout(() => {
      setIsExportingEsg(false);
      confetti({ particleCount: 60, spread: 60 });
      alert("ESG & Sustainability Audit Report (PDF/Excel) downloaded successfully! Formatted per Indian Companies Act Sec 135 & FAO SDG 12.3 framework.");
    }, 1500);
  };

  const pendingNgos = ngos.filter(n => n.verificationStatus === 'pending_verification');
  const verifiedNgos = ngos.filter(n => n.verificationStatus === 'verified');

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="section-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-border mb-8">
          <div>
            <div className="section-pill-badge mb-2 inline-flex">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                MoFPI & Platform Moderator Operations
              </span>
            </div>
            <h2 className="text-3xl font-display text-foreground">
              Admin Governance & <span className="gradient-text">Verification Gate</span>
            </h2>
          </div>

          {/* Admin Navigation Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-card p-1.5 border border-border text-xs font-semibold">
            <button
              onClick={() => setAdminTab('verification')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                adminTab === 'verification' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              NGO Security Verification Gate ({pendingNgos.length})
            </button>
            <button
              onClick={() => setAdminTab('moderation')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                adminTab === 'moderation' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Listings Moderation
            </button>
            <button
              onClick={() => setAdminTab('queues')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                adminTab === 'queues' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Message Queue Architecture
            </button>
            <button
              onClick={() => setAdminTab('feature_flags')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                adminTab === 'feature_flags' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Feature Flags
            </button>
          </div>
        </div>

        {/* 1. Mandatory NGO Document Verification Gate */}
        {adminTab === 'verification' && (
          <div className="space-y-8">
            
            {/* System Security Notice Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs leading-relaxed flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm font-display mb-0.5">Asymmetric Risk Control System</h4>
                <p>
                  Providers can list surplus food freely (low fraud risk), but <strong>NGOs MUST undergo document verification (12A, 80G, FCRA, Reg Cert)</strong> before claiming any listing. This prevents unauthorized reselling and guarantees food reaches genuine beneficiaries.
                </p>
              </div>
            </div>

            {/* Pending Verification Section */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                Pending Verification Requests ({pendingNgos.length})
              </h3>

              {pendingNgos.length === 0 ? (
                <div className="p-8 rounded-2xl bg-card border border-border text-center text-muted-foreground text-xs font-mono">
                  All submitted NGO registration requests have been verified cleanly.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {pendingNgos.map((ngo) => (
                    <div key={ngo.id} className="premium-card p-6 border-l-4 border-l-amber-500">
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="tech-badge">{ngo.id}</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold font-mono">
                              Pending Admin Audit
                            </span>
                          </div>
                          <h4 className="text-xl font-display font-semibold text-foreground">{ngo.name}</h4>
                          <p className="text-xs text-muted-foreground">{ngo.category} • {ngo.location}</p>
                        </div>

                        <div className="text-right font-mono text-xs">
                          <span className="text-muted-foreground block">Declared Capacity</span>
                          <strong className="text-foreground text-sm font-bold">{ngo.capacityAvailable} Meals / Day</strong>
                        </div>
                      </div>

                      {/* Submitted Documents Grid */}
                      <div className="mb-6">
                        <h5 className="font-mono text-xs text-muted-foreground uppercase mb-3">Submitted Institutional Credentials:</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          
                          <div className="p-3 rounded-xl bg-background border border-border text-xs flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-muted-foreground block">Registration Cert</span>
                              <span className="font-mono text-foreground font-semibold">{ngo.documentsSubmitted.regCert}</span>
                            </div>
                            <Eye className="h-4 w-4 text-accent cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedDocModal(ngo.documentsSubmitted.regCert)} />
                          </div>

                          <div className="p-3 rounded-xl bg-background border border-border text-xs flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-muted-foreground block">12A / 80G Tax Cert</span>
                              <span className="font-mono text-foreground font-semibold">{ngo.documentsSubmitted.tax12A}</span>
                            </div>
                            <Eye className="h-4 w-4 text-accent cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedDocModal(ngo.documentsSubmitted.tax12A)} />
                          </div>

                          <div className="p-3 rounded-xl bg-background border border-border text-xs flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-muted-foreground block">FCRA Compliance</span>
                              <span className="font-mono text-foreground font-semibold">{ngo.documentsSubmitted.fcraProof}</span>
                            </div>
                            <Eye className="h-4 w-4 text-accent cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedDocModal(ngo.documentsSubmitted.fcraProof)} />
                          </div>

                          <div className="p-3 rounded-xl bg-background border border-border text-xs flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-muted-foreground block">Address / Premises</span>
                              <span className="font-mono text-foreground font-semibold">{ngo.documentsSubmitted.addressProof}</span>
                            </div>
                            <Eye className="h-4 w-4 text-accent cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedDocModal(ngo.documentsSubmitted.addressProof)} />
                          </div>

                        </div>
                      </div>

                      {/* Verification Action Buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onApproveNgo(ngo.id)}
                          className="btn-primary-pine px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span>Approve Credentials & Grant Claim Privileges</span>
                        </button>

                        <button
                          onClick={() => onRejectNgo(ngo.id)}
                          className="px-5 py-3 rounded-xl border border-brickUrgency text-brickUrgency hover:bg-brickUrgency/10 text-xs font-semibold"
                        >
                          Reject / Request Re-upload
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Verified NGOs Roster */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">
                Verified Active Receiver Organizations ({verifiedNgos.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {verifiedNgos.map(ngo => (
                  <div key={ngo.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-foreground">{ngo.name}</h4>
                      <p className="text-[11px] text-muted-foreground">{ngo.location}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-mossVerified bg-mossVerified/10 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. Listings Moderation & Live Regional Heatmap */}
        {adminTab === 'moderation' && (
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Live Ecosystem Geographic Overview & Listing Audit
              </h3>
              <MapView listings={listings} isNgoVerified={true} />
            </div>

            {/* Flagged Food Listings Audit */}
            <div className="premium-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">
                AI Automated Listing Quality Audit
              </h3>

              <div className="space-y-4">
                {listings.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-background border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.photos?.[0]} alt="Food" className="h-12 w-12 rounded-lg object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-accent">{item.id}</span>
                          <span className="text-muted-foreground font-mono">{item.category}</span>
                        </div>
                        <h4 className="font-semibold text-foreground text-sm">{item.foodName}</h4>
                        <p className="text-[11px] text-muted-foreground">{item.providerName} • {item.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 font-mono">
                      <div>
                        <span className="text-muted-foreground block text-[10px]">AI Freshness Score</span>
                        <strong className="text-mossVerified font-bold">{item.aiResult?.confidence}% Conf.</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px]">Status</span>
                        <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-bold">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. BullMQ Message Queue & Microservices Monitor */}
        {adminTab === 'queues' && (
          <div className="space-y-8">
            
            <div className="p-6 rounded-2xl bg-slateCustom-900 text-white shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                  <Server className="h-6 w-6 text-spiceGold" />
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white">BullMQ + Redis Worker Pipeline</h3>
                    <p className="text-xs text-slate-400 font-mono">Decoupled async workers for AI vision, matching, and notifications</p>
                  </div>
                </div>
                <span className="tech-badge">In-Memory Redis Pub/Sub</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_MESSAGE_QUEUES.map((q) => (
                  <div key={q.name} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <span className="font-bold text-spiceGold">{q.name}</span>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-300 text-[11px]">
                      <div className="flex justify-between"><span>Producer:</span><span className="text-white">{q.producer}</span></div>
                      <div className="flex justify-between"><span>Consumer:</span><span className="text-white">{q.consumer}</span></div>
                      <div className="flex justify-between"><span>Jobs Active:</span><strong className="text-spiceGold">{q.active}</strong></div>
                      <div className="flex justify-between"><span>Completed:</span><strong className="text-emerald-400">{q.completed}</strong></div>
                      <div className="flex justify-between"><span>Failed Retries:</span><span className="text-slate-400">{q.failed}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 4. Dynamic Feature Flags Management Table */}
        {adminTab === 'feature_flags' && (
          <div className="space-y-8">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground">System Feature Flags Control</h3>
                  <p className="text-xs text-muted-foreground font-mono">Enable or disable module rollouts in real time without redeploying</p>
                </div>
                <button
                  onClick={handleExportEsg}
                  disabled={isExportingEsg}
                  className="btn-primary-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span>{isExportingEsg ? 'Generating PDF...' : 'Export ESG Audit Report'}</span>
                </button>
              </div>

              <div className="space-y-4">
                {featureFlags.map((ff) => (
                  <div key={ff.id} className="p-4 rounded-xl bg-background border border-border flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-accent">{ff.name}</span>
                        <span className="tech-badge">{ff.rolloutRole}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{ff.description}</p>
                    </div>

                    <button
                      onClick={() => toggleFeatureFlag(ff.id)}
                      className="text-accent hover:scale-110 transition-transform"
                    >
                      {ff.enabled ? (
                        <ToggleRight className="h-8 w-8 text-mossVerified" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Document Modal View */}
      {selectedDocModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h4 className="font-mono font-bold text-sm text-foreground">Credential File Viewer</h4>
              <button onClick={() => setSelectedDocModal(null)} className="text-muted-foreground hover:text-foreground font-mono">✕ Close</button>
            </div>
            <div className="p-6 rounded-xl bg-muted/40 text-center font-mono text-xs text-muted-foreground space-y-2">
              <ShieldCheck className="h-10 w-10 text-mossVerified mx-auto" />
              <p className="font-bold text-foreground text-sm">{selectedDocModal}</p>
              <p>Cryptographically Verified Audit Hash:</p>
              <span className="text-[10px] break-all text-accent bg-background p-2 rounded block">0x8f9a2e3b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f</span>
            </div>
            <button onClick={() => setSelectedDocModal(null)} className="btn-primary-pine w-full py-2.5 rounded-xl font-bold text-xs">
              Close Document Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
