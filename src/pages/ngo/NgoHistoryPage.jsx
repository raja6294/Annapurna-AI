import React from 'react';
import { History, CheckCircle2 } from 'lucide-react';

export const NgoHistoryPage = () => {
  const history = [
    { id: 'CLAIM-101', food: 'Paneer Butter Masala & Rice', provider: 'Taj Grand Kitchens', quantity: '50 kg', date: 'Today', status: 'Distributed' },
    { id: 'CLAIM-102', food: 'Vegetable Biryani', provider: 'Oberoi Catering', quantity: '30 kg', date: 'Yesterday', status: 'Distributed' },
    { id: 'CLAIM-103', food: 'Fresh Spinach & Tomatoes', provider: 'Green Valley Harvest', quantity: '120 kg', date: '3 days ago', status: 'Distributed' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Received Logs
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Food Claim <span className="gradient-text">History</span>
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between font-mono text-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-spiceGold">{item.id}</span>
                <span className="text-muted-foreground">• {item.date}</span>
              </div>
              <h4 className="font-bold text-foreground text-sm font-sans">{item.food}</h4>
              <p className="text-muted-foreground">Provider: {item.provider} ({item.quantity})</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-mossVerified/10 text-mossVerified font-bold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NgoHistoryPage;
