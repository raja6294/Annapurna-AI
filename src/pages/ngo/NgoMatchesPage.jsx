import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const NgoMatchesPage = () => {
  const navigate = useNavigate();

  const matches = [
    { rank: 1, provider: 'Taj Grand Kitchens & Banquet', food: 'Paneer Butter Masala & Rice', matchScore: 96, quantity: '50 kg', distance: '4.2 km' },
    { rank: 2, provider: 'City Banquet Hall', food: 'Vegetable Pulao & Curry', matchScore: 91, quantity: '60 kg', distance: '5.8 km' },
    { rank: 3, provider: 'Green Leaf Caterers', food: 'Dal Makhani & Roti', matchScore: 84, quantity: '40 kg', distance: '7.1 km' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-mossVerified animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Requirement Matching Engine
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            My <span className="gradient-text">Matches</span>
          </h1>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            Food opportunities automatically matched to your posted requirement (100 kg Vegetarian Meals).
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {matches.map((item) => (
          <div key={item.rank} className="p-6 rounded-2xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-spiceGold/10 text-spiceGold font-bold">
                  Rank #{item.rank}
                </span>
                <span className="text-mossVerified font-bold">Match Score: {item.matchScore}%</span>
              </div>
              <h4 className="text-lg font-display font-semibold text-foreground">{item.provider}</h4>
              <p className="text-muted-foreground font-sans">{item.food} • {item.quantity} • {item.distance} away</p>
            </div>

            <button
              onClick={() => navigate('/ngo/incoming')}
              className="btn-primary-gold px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>CLAIM MATCHED FOOD</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NgoMatchesPage;
