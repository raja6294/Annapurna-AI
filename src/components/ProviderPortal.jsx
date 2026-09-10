import React, { useState } from 'react';
import { Camera, Upload, Sparkles, CheckCircle2, Clock, MapPin, AlertTriangle, ShieldCheck, ArrowRight, RefreshCw, Layers, Award, Thermometer, Box, TrendingUp, Factory, AlertCircle, Check, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import confetti from 'canvas-confetti';

export const ProviderPortal = ({ listings, onAddNewListing, onSelectListing }) => {
  const [providerTab, setProviderTab] = useState('register'); // 'register' | 'listings' | 'forecasting' | 'verified_badge'
  
  // Registration Form State
  const [foodName, setFoodName] = useState('Fresh Paneer Butter Masala & Steamed Rice');
  const [category, setCategory] = useState('Cooked Meals (Vegetarian)');
  const [quantityKg, setQuantityKg] = useState(50);
  const [prepTime, setPrepTime] = useState('1.5 hours ago (12:30 PM)');
  const [storageCondition, setStorageCondition] = useState('Insulated Thermal Cases');
  const [temperatureC, setTemperatureC] = useState(65);
  const [location, setLocation] = useState('Vasant Kunj, South Delhi');
  const [allergens, setAllergens] = useState(['Dairy', 'Nuts']);
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80'
  ]);
  
  // Optional Verified Badge Upload State
  const [badgeProofUploaded, setBadgeProofUploaded] = useState(false);
  const [badgeStatus, setBadgeStatus] = useState('Verified Provider'); // 'Standard Provider' | 'Verified Provider'

  // AI Assessment State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Expiry Risk Calculator slider (IoT Simulation)
  const [tempSlider, setTempSlider] = useState(65);
  const [storageTimeHours, setStorageTimeHours] = useState(2);

  // Demand Forecasting Data (Industrial Food Processing Unit Surplus)
  const forecastData = [
    { day: 'Mon', predictedSurplusKg: 45, actualSurplusKg: 42, machineDowntimeHrs: 0.5 },
    { day: 'Tue', predictedSurplusKg: 60, actualSurplusKg: 58, machineDowntimeHrs: 1.2 },
    { day: 'Wed', predictedSurplusKg: 35, actualSurplusKg: 38, machineDowntimeHrs: 0.2 },
    { day: 'Thu', predictedSurplusKg: 80, actualSurplusKg: 75, machineDowntimeHrs: 2.1 },
    { day: 'Fri', predictedSurplusKg: 95, actualSurplusKg: 90, machineDowntimeHrs: 2.8 },
    { day: 'Sat', predictedSurplusKg: 110, actualSurplusKg: 115, machineDowntimeHrs: 3.4 },
    { day: 'Sun', predictedSurplusKg: 70, actualSurplusKg: 68, machineDowntimeHrs: 1.0 }
  ];

  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setAiResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Calculate dynamic freshness score & ring
      const calculatedWindow = Math.max(1.5, Math.min(8.0, (80 - tempSlider * 0.3 - storageTimeHours * 8) / 10)).toFixed(1);
      const isUrgent = calculatedWindow < 2.5;

      setAiResult({
        detectedFood: "Cottage Cheese Curry with White Basmati Rice",
        confidence: 96.4,
        isVeg: true,
        freshnessScore: isUrgent ? 64 : 94,
        visualCondition: isUrgent ? "Consume Soon (Thermal Depletion)" : "Fresh & Safe",
        recommendation: isUrgent ? "Priority Dispatch Recommended" : "Recommended for Immediate Redistribution",
        estimatedWindowHours: Number(calculatedWindow),
        urgency: isUrgent ? "warning" : "fresh",
        spoiledFlag: false,
        matchedNgo: {
          id: "NGO-101",
          name: "Akshaya Shelter Foundation",
          distanceKm: 2.8,
          travelMinutes: 12,
          capacityAvailable: 150,
          matchScore: 97
        }
      });
    }, 1600);
  };

  const handleSubmitDonation = (e) => {
    e.preventDefault();
    if (!aiResult) return;

    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });

    const newListing = {
      id: `FOOD-2026-00${listings.length + 1}`,
      providerName: "Royal Spice Banquets & Catering",
      providerType: "Institutional Kitchen",
      providerBadge: badgeStatus,
      foodName,
      category,
      quantityKg: Number(quantityKg),
      portions: Math.round(Number(quantityKg) * 2),
      prepTime,
      storageCondition,
      temperatureC: Number(tempSlider),
      location,
      lat: 28.6250 + (Math.random() - 0.5) * 0.05,
      lng: 77.2100 + (Math.random() - 0.5) * 0.05,
      status: "Live",
      freshnessScore: aiResult.freshnessScore,
      freshnessWindowHours: aiResult.estimatedWindowHours,
      urgencyLevel: aiResult.urgency,
      allergens,
      photos,
      aiResult,
      matchedNgo: aiResult.matchedNgo
    };

    onAddNewListing(newListing);
    setProviderTab('listings');
  };

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="section-container">
        
        {/* Top Banner & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-border mb-8">
          <div>
            <div className="section-pill-badge mb-2 inline-flex">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                Food Provider Portal (No Gate Friction)
              </span>
            </div>
            <h2 className="text-3xl font-display text-foreground">
              Register Surplus & <span className="gradient-text font-semibold">AI Quality Intelligence</span>
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-card p-1.5 border border-border text-xs font-semibold">
            <button
              onClick={() => setProviderTab('register')}
              className={`px-4 py-2 rounded-lg transition-all ${
                providerTab === 'register' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              + Create Food Listing
            </button>
            <button
              onClick={() => setProviderTab('listings')}
              className={`px-4 py-2 rounded-lg transition-all ${
                providerTab === 'listings' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Active Listings ({listings.length})
            </button>
            <button
              onClick={() => setProviderTab('forecasting')}
              className={`px-4 py-2 rounded-lg transition-all ${
                providerTab === 'forecasting' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Industrial Demand Forecast
            </button>
            <button
              onClick={() => setProviderTab('verified_badge')}
              className={`px-4 py-2 rounded-lg transition-all ${
                providerTab === 'verified_badge' ? 'bg-accent text-white shadow-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Verified Badge ({badgeStatus})
            </button>
          </div>
        </div>

        {/* 1. Register Food Listing Form */}
        {providerTab === 'register' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Asymmetric Onboarding Note */}
              <div className="p-4 rounded-xl bg-mossVerified/10 border border-mossVerified/30 text-mossVerified dark:text-emerald-400 text-xs flex items-center gap-3">
                <Info className="h-5 w-5 shrink-0 text-mossVerified" />
                <span>
                  <strong>Zero-Friction Onboarding:</strong> No FSSAI or mandatory KYC required to post listings. Giving food away is friction-free; verified badges are optional for higher trust.
                </span>
              </div>

              {/* Form Card */}
              <div className="premium-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Box className="h-5 w-5 text-accent" />
                  1. Surplus Food & Preparation Details
                </h3>

                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-muted-foreground mb-1">Food Item Name & Menu</label>
                    <input
                      type="text"
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted-foreground mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-accent focus:outline-none font-sans"
                      >
                        <option>Cooked Meals (Vegetarian)</option>
                        <option>Cooked Meals (Non-Vegetarian)</option>
                        <option>Raw Produce</option>
                        <option>Bakery & Snacks</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-muted-foreground mb-1">Quantity (kg)</label>
                      <input
                        type="number"
                        value={quantityKg}
                        onChange={(e) => setQuantityKg(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted-foreground mb-1">Preparation Time</label>
                      <input
                        type="text"
                        value={prepTime}
                        onChange={(e) => setPrepTime(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-muted-foreground mb-1">Storage Condition</label>
                      <input
                        type="text"
                        value={storageCondition}
                        onChange={(e) => setStorageCondition(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Thermal State Simulator */}
                  <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-foreground">
                        <Thermometer className="h-4 w-4 text-accent" /> Container Sensor Temp:
                      </span>
                      <span className="text-accent font-bold">{tempSlider} °C</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={tempSlider}
                      onChange={(e) => setTempSlider(Number(e.target.value))}
                      className="w-full accent-accent cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>Chilled (10°C)</span>
                      <span>Optimal Warm (65°C)</span>
                      <span>High Temp (90°C)</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Photos & AI Inspection Box */}
              <div className="premium-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-accent" />
                  2. Food Image Upload & AI Quality Scanner
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  AI scans uploaded photos to flag spoiled food and tag freshness condition automatically.
                </p>

                <div className="border-2 border-dashed border-accent/40 rounded-2xl p-6 text-center bg-accent/5 hover:bg-accent/10 transition-all cursor-pointer">
                  <Upload className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="text-xs font-semibold text-foreground">Click to Select Food Photos (1-5 Images)</p>
                  <p className="text-[11px] text-muted-foreground font-mono mt-1">Simulated YOLOv8 Vision Inference</p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {photos.map((p, idx) => (
                    <div key={idx} className="relative h-16 w-20 rounded-xl overflow-hidden border-2 border-accent shadow-sm">
                      <img src={p} alt="Food angle" className="h-full w-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-accent text-[9px] font-mono text-center text-white py-0.5">
                        Angle {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleRunAiAnalysis}
                  disabled={isAnalyzing}
                  className="btn-primary-gold mt-6 w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-accent"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Executing Neural Vision & Spoilage AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Run AI Freshness Assessment & Matching</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* AI Results & Match Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="gradient-border-card">
                <div className="h-full w-full rounded-[calc(1rem-2px)] bg-card p-6">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      <h3 className="font-display font-semibold text-lg text-foreground">
                        AI Vision & Window Analysis
                      </h3>
                    </div>
                    <span className="tech-badge">MobileNetV2</span>
                  </div>

                  {!aiResult && !isAnalyzing && (
                    <div className="py-12 text-center text-muted-foreground text-xs font-mono space-y-2">
                      <Camera className="h-10 w-10 text-muted-foreground/40 mx-auto" />
                      <p>Fill food details and click <strong className="text-accent">"Run AI Freshness Assessment"</strong> to run model.</p>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="py-12 text-center space-y-3">
                      <div className="h-12 w-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs font-mono text-accent">Analyzing visual texture, thermal dissipation & freshness ring...</p>
                    </div>
                  )}

                  {aiResult && (
                    <div className="space-y-4">
                      
                      {/* Detected Food & Ring */}
                      <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-mono text-muted-foreground">Detected Food Category</span>
                          <h4 className="font-bold text-sm text-foreground">{aiResult.detectedFood}</h4>
                          <span className="text-xs text-mossVerified font-mono font-semibold">
                            ✓ {aiResult.confidence}% Vision Confidence
                          </span>
                        </div>

                        {/* Dynamic Radial Freshness Ring Indicator */}
                        <div className="relative flex items-center justify-center h-16 w-16 rounded-full border-4 border-accent text-center font-mono font-bold text-xs text-foreground bg-background shadow-inner">
                          {aiResult.freshnessScore}%
                        </div>
                      </div>

                      {/* Expiry Risk Window */}
                      <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono text-muted-foreground">Estimated Window:</span>
                          <strong className="text-accent font-bold text-sm">{aiResult.estimatedWindowHours} Hours Remaining</strong>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Model computed window from prep time, {tempSlider}°C temp sensor data & thermal insulation.
                        </p>
                      </div>

                      {/* Matched NGO Score */}
                      <div className="p-4 rounded-xl bg-card border border-border shadow-sm space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-accent font-bold">Top NGO Match:</span>
                          <span className="font-mono text-xs font-bold text-mossVerified">Score: {aiResult.matchedNgo.matchScore}/100</span>
                        </div>
                        <h4 className="font-semibold text-foreground text-sm">{aiResult.matchedNgo.name}</h4>
                        <p className="text-xs text-muted-foreground font-mono">
                          {aiResult.matchedNgo.distanceKm} km away • {aiResult.matchedNgo.travelMinutes} mins travel
                        </p>
                      </div>

                      {/* Final Submit Action */}
                      <button
                        onClick={handleSubmitDonation}
                        className="btn-primary-gold w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-accent"
                      >
                        <span>Publish Donation Offer to Map</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>

                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. Active Listings Grid */}
        {providerTab === 'listings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item) => (
              <div key={item.id} className="premium-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="tech-badge">{item.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-mossVerified/10 text-mossVerified text-xs font-bold font-mono">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg text-foreground mb-1">{item.foodName}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{item.providerName}</p>

                  <div className="space-y-1.5 text-xs text-muted-foreground font-mono mb-4">
                    <p>Quantity: <strong className="text-foreground">{item.quantityKg} kg ({item.portions} meals)</strong></p>
                    <p>Location: {item.location}</p>
                    <p>Freshness Window: <strong className="text-accent">{item.freshnessWindowHours}h Remaining</strong></p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-accent">
                  <span>Matched NGO: {item.matchedNgo?.name || 'Akshaya Shelter'}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Industrial Kitchen & Processing Unit Demand Forecast */}
        {providerTab === 'forecasting' && (
          <div className="space-y-8">
            <div className="premium-card p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Factory className="h-5 w-5 text-accent" />
                    <h3 className="font-display font-semibold text-xl text-foreground">
                      Upstream Industrial Surplus & Waste Forecasting
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    Time-series ML model (LightGBM/Prophet) predicting kitchen & processing unit raw material loss, machine downtime, & overproduction surplus.
                  </p>
                </div>
                <span className="tech-badge">LightGBM Forecast Engine</span>
              </div>

              {/* Chart */}
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D8D2C5" />
                    <XAxis dataKey="day" stroke="#5A544A" fontSize={12} />
                    <YAxis stroke="#5A544A" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#14261E', color: '#EDE8DE', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="predictedSurplusKg" stroke="#B98A2E" strokeWidth={3} fill="#B98A2E" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="actualSurplusKg" stroke="#3F6B4A" strokeWidth={2} fill="#3F6B4A" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-muted-foreground block">Predicted Weekly Surplus</span>
                  <strong className="text-foreground text-sm font-bold">485 kg Expected</strong>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-muted-foreground block">Machine Downtime Impact</span>
                  <strong className="text-accent text-sm font-bold">11.2 Hours Total</strong>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-muted-foreground block">Prevention Action Plan</span>
                  <strong className="text-mossVerified text-sm font-bold">Auto-Schedule NGO Pickups</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Optional Verified Provider Badge */}
        {providerTab === 'verified_badge' && (
          <div className="max-w-2xl mx-auto premium-card p-6">
            <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Upload Business Proof for "Verified Provider" Badge
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Optional badge upload for high-volume partners to build NGO trust. Note: This is an optional trust badge, NOT an onboarding gate.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-accent font-bold flex items-center justify-between">
                <span>Current Status: {badgeStatus}</span>
                <CheckCircle2 className="h-5 w-5 text-mossVerified" />
              </div>

              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                <Upload className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="font-semibold text-foreground">Upload FSSAI License or GST Certificate (PDF/JPG)</p>
                <p className="text-[11px] text-muted-foreground mt-1">Builds NGO trust for large volume donations</p>
              </div>

              <button
                onClick={() => {
                  setBadgeProofUploaded(true);
                  setBadgeStatus('Verified Provider');
                  confetti({ particleCount: 50 });
                  alert("Business proof submitted! Verified Provider Badge active.");
                }}
                className="btn-primary-pine w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs"
              >
                Apply for Verified Provider Badge
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
