import React from 'react';
import { Gift, CheckCircle2, HeartHandshake } from 'lucide-react';

export const ProviderDonationsPage = () => {
  const mockDonations = [
    { id: 'DON-901', item: 'Paneer Butter Masala & Rice', ngo: 'Hope Welfare Centre', quantity: '50 kg', date: 'Today, 2:15 PM', status: 'Completed' },
    { id: 'DON-902', item: 'Steamed Rice & Dal', ngo: 'Akshaya Shelter Foundation', quantity: '30 kg', date: 'Yesterday', status: 'Completed' },
    { id: 'DON-903', item: 'Assorted Roti & Vegetable Curry', ngo: 'Care Community Kitchen', quantity: '45 kg', date: '2 days ago', status: 'Completed' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
              Donation History
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Completed <span className="gradient-text">Donations</span>
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        {mockDonations.map((don) => (
          <div key={don.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between font-mono text-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-spiceGold">{don.id}</span>
                <span className="text-muted-foreground">• {don.date}</span>
              </div>
              <h4 className="font-bold text-foreground text-sm font-sans">{don.item}</h4>
              <p className="text-muted-foreground">Recipient NGO: <strong className="text-foreground">{don.ngo}</strong> ({don.quantity})</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-mossVerified/10 text-mossVerified font-bold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> {don.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderDonationsPage;
