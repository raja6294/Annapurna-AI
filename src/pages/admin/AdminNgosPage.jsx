import React, { useState } from 'react';
import { Users, ShieldCheck, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminNgosPage = ({ ngos, setNgos, onApproveNgo, onRejectNgo }) => {
  const [selectedDocModal, setSelectedDocModal] = useState(null);

  const ngoList = ngos || [
    { id: 'NGO-101', name: 'Hope Welfare Centre', location: 'Karol Bagh, Central Delhi', requirements: 4, receivedKg: '182 kg', verificationStatus: 'verified' },
    { id: 'NGO-102', name: 'Akshaya Shelter Foundation', location: 'Connaught Place, New Delhi', requirements: 2, receivedKg: '150 kg', verificationStatus: 'verified' },
    { id: 'NGO-103', name: 'Care Community Kitchen', location: 'Lajpat Nagar, South Delhi', requirements: 3, receivedKg: '120 kg', verificationStatus: 'verified' },
    { id: 'NGO-104', name: 'Jan Seva Community Shelter', location: 'Yamuna Pushta, East Delhi', requirements: 5, receivedKg: '0 kg', verificationStatus: 'pending_verification' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              NGO Roster & Credential Verification
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            NGO <span className="gradient-text">Management</span>
          </h1>
        </div>
      </div>

      <div className="premium-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase text-[10px]">
                <th className="py-3 px-3">NGO Name</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3 text-right">Active Requirements</th>
                <th className="py-3 px-3 text-right">Total Food Received</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground">
              {ngoList.map((ngo) => (
                <tr key={ngo.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3 font-sans font-bold">{ngo.name}</td>
                  <td className="py-3 px-3 text-muted-foreground">{ngo.location}</td>
                  <td className="py-3 px-3 text-right font-bold text-spiceGold">{ngo.requirements || 2}</td>
                  <td className="py-3 px-3 text-right font-bold">{ngo.receivedKg || '182 kg'}</td>
                  <td className="py-3 px-3">
                    {ngo.verificationStatus === 'verified' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-mossVerified/10 text-mossVerified font-bold flex items-center gap-1 w-fit">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-bold flex items-center gap-1 w-fit">
                        <AlertTriangle className="h-3 w-3" /> Pending Audit
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    {ngo.verificationStatus === 'pending_verification' ? (
                      <button
                        onClick={() => {
                          onApproveNgo && onApproveNgo(ngo.id);
                          confetti({ particleCount: 50 });
                          alert(`${ngo.name} approved and granted food claim permissions!`);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-mossVerified text-white font-bold text-[11px]"
                      >
                        Verify Org
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedDocModal(ngo.name)}
                        className="px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted font-mono font-bold text-[11px]"
                      >
                        View Audit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDocModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h4 className="font-mono font-bold text-sm text-foreground">NGO 12A/80G Document Verification</h4>
            <div className="p-4 rounded-xl bg-muted/40 font-mono text-xs text-muted-foreground space-y-1">
              <p>Organization: <strong className="text-foreground">{selectedDocModal}</strong></p>
              <p>12A Tax Cert: <strong>12A-AACTA9921E.pdf</strong></p>
              <p>80G Exemption: <strong>80G-DEL-2026.pdf</strong></p>
              <p>FCRA Compliance: <strong>FCRA-VERIFIED</strong></p>
            </div>
            <button onClick={() => setSelectedDocModal(null)} className="btn-primary-gold w-full py-2.5 rounded-xl font-bold text-xs">
              Close Audit Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNgosPage;
