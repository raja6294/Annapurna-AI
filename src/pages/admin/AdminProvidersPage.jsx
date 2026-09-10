import React from 'react';
import { Building2, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminProvidersPage = () => {
  const providers = [
    { name: 'Taj Grand Kitchens & Banquet', location: 'Connaught Place, Central Delhi', activeFood: 5, donations: 42, status: 'Active' },
    { name: 'Apex Food Processing Canteen', location: 'Okhla Industrial Area, New Delhi', activeFood: 3, donations: 28, status: 'Active' },
    { name: 'Green Valley Organic Harvest', location: 'Azadpur Mandi, North Delhi', activeFood: 4, donations: 36, status: 'Active' },
    { name: 'Oberoi Catering Services', location: 'Karol Bagh, Central Delhi', activeFood: 2, donations: 19, status: 'Active' },
    { name: 'ABC Caterers & Banquets', location: 'Salt Lake, Kolkata', activeFood: 3, donations: 28, status: 'Active' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
              MoFPI Operations
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Provider <span className="gradient-text">Management</span>
          </h1>
        </div>
      </div>

      <div className="premium-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase text-[10px]">
                <th className="py-3 px-3">Provider Name</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3 text-right">Active Food</th>
                <th className="py-3 px-3 text-right">Donations Completed</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground">
              {providers.map((p) => (
                <tr key={p.name} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3 font-sans font-bold">{p.name}</td>
                  <td className="py-3 px-3 text-muted-foreground">{p.location}</td>
                  <td className="py-3 px-3 text-right font-bold text-spiceGold">{p.activeFood}</td>
                  <td className="py-3 px-3 text-right font-bold">{p.donations}</td>
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-mossVerified/10 text-mossVerified font-bold">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => alert(`Inspecting ${p.name} activity logs and active listings...`)}
                      className="px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted font-mono font-bold text-[11px]"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProvidersPage;
