import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Sparkles, CheckCircle2, Clock, MapPin, AlertTriangle, ShieldCheck, ArrowRight, RefreshCw, Box, Thermometer, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegisterSurplusPage = ({ listings, onAddNewListing }) => {
  const navigate = useNavigate();

  // Registration Form State
  const [foodName, setFoodName] = useState('Fresh Paneer Butter Masala & Steamed Rice');
  const [category, setCategory] = useState('Cooked Meals (Vegetarian)');
  const [quantityKg, setQuantityKg] = useState(50);
  const [prepTime, setPrepTime] = useState('1.5 hours ago (12:30 PM)');
  const [storageCondition, setStorageCondition] = useState('Insulated Thermal Cases');
  const [location, setLocation] = useState('Vasant Kunj, South Delhi');
  const [allergens, setAllergens] = useState(['Dairy', 'Nuts']);
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80'
  ]);

  // AI Assessment State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [tempSlider, setTempSlider] = useState(65);
  const [storageTimeHours, setStorageTimeHours] = useState(2);

  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setAiResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      const calculatedWindow = Math.max(1.5, Math.min(8.0, (80 - tempSlider * 0.3 - storageTimeHours * 8) / 10)).toFixed(1);
      const isUrgent = calculatedWindow < 2.5;

      setAiResult({
        detectedFood: "Paneer Butter Masala with Steamed Basmati Rice",
        confidence: 94.2,
        isVeg: true,
        freshnessScore: isUrgent ? 64 : 94,
        visualCondition: isUrgent ? "Consume Soon (Thermal Depletion)" : "Good",
        recommendation: "Recommended for further verification",
        estimatedWindowHours: 4.17, // 4h 10m
        urgency: isUrgent ? "warning" : "fresh",
        spoiledFlag: false,
        matchedNgo: {
          id: "NGO-101",
          name: "Hope Welfare Centre",
          distanceKm: 4.2,
          travelMinutes: 22,
          capacityAvailable: 150,
          matchScore: 96
        }
      });
    }, 1500);
  };

  const handleSubmitDonation = (e) => {
    e.preventDefault();
    if (!aiResult) return;

    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });

    const newListing = {
      id: `FOOD-2026-00${listings.length + 1}`,
      providerName: "Taj Grand Kitchens & Banquet",
      providerType: "Institutional Kitchen",
      providerBadge: "Verified Provider",
      foodName,
      category,
      quantityKg: Number(quantityKg),
      portions: Math.round(Number(quantityKg) * 2),
      prepTime,
      storageCondition,
      temperatureC: Number(tempSlider),
      location,
      lat: 28.6250,
      lng: 77.2100,
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
    navigate('/provider/deliveries');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="section-pill-badge mb-2 inline-flex">
            <span className="h-2 w-2 rounded-full bg-spiceGold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-spiceGold font-semibold">
              Surplus Registration & AI Vision
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Register Surplus & <span className="gradient-text font-semibold">AI Quality Intelligence</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-4 rounded-xl bg-mossVerified/10 border border-mossVerified/30 text-mossVerified dark:text-emerald-400 text-xs flex items-center gap-3">
            <Info className="h-5 w-5 shrink-0 text-mossVerified" />
            <span>
              <strong>Zero-Friction Onboarding:</strong> No mandatory FSSAI friction to post listings. Post surplus meals freely to feed community beneficiaries.
            </span>
          </div>

          <div className="premium-card p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
              <Box className="h-5 w-5 text-spiceGold" />
              1. Surplus Food & Preparation Details
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-muted-foreground mb-1">Food Item Name</label>
                <input
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted-foreground mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold focus:outline-none font-sans"
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
                    className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold focus:outline-none"
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
                    className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-muted-foreground mb-1">Storage Condition</label>
                  <input
                    type="text"
                    value={storageCondition}
                    onChange={(e) => setStorageCondition(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Thermometer className="h-4 w-4 text-spiceGold" /> Container Sensor Temp:
                  </span>
                  <span className="text-spiceGold font-bold">{tempSlider} °C</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={tempSlider}
                  onChange={(e) => setTempSlider(Number(e.target.value))}
                  className="w-full accent-spiceGold cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="premium-card p-6">
            <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
              <Camera className="h-5 w-5 text-spiceGold" />
              2. Food Image Upload & AI Quality Scanner
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Upload multiple images for visual AI freshness assessment.
            </p>

            <div className="border-2 border-dashed border-spiceGold/40 rounded-2xl p-6 text-center bg-spiceGold/5 hover:bg-spiceGold/10 transition-all cursor-pointer">
              <Upload className="h-8 w-8 text-spiceGold mx-auto mb-2" />
              <p className="text-xs font-semibold text-foreground">Click to Upload Food Photos (Multiple Supported)</p>
              <p className="text-[11px] text-muted-foreground font-mono mt-1">Simulated YOLOv8 Vision Inference</p>
            </div>

            <div className="mt-4 flex items-center gap-3">
              {photos.map((p, idx) => (
                <div key={idx} className="relative h-16 w-20 rounded-xl overflow-hidden border-2 border-spiceGold shadow-sm">
                  <img src={p} alt="Food angle" className="h-full w-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-spiceGold text-[9px] font-mono text-center text-pineCanopy font-bold py-0.5">
                    Photo {idx + 1}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleRunAiAnalysis}
              disabled={isAnalyzing}
              className="btn-primary-gold mt-6 w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Executing Neural Vision Assessment...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>RUN AI FRESHNESS ASSESSMENT</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Results Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="gradient-border-card">
            <div className="h-full w-full rounded-[calc(1rem-2px)] bg-card p-6">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-spiceGold" />
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    ANNAPURNA AI VISION
                  </h3>
                </div>
                <span className="tech-badge">Neural Scan</span>
              </div>

              {!aiResult && !isAnalyzing && (
                <div className="py-12 text-center text-muted-foreground text-xs font-mono space-y-2">
                  <Camera className="h-10 w-10 text-muted-foreground/40 mx-auto" />
                  <p>Click <strong className="text-spiceGold">"RUN AI FRESHNESS ASSESSMENT"</strong> to inspect food photo.</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="py-12 text-center space-y-3">
                  <div className="h-12 w-12 border-4 border-spiceGold border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-mono text-spiceGold">Running vision confidence scoring & thermal window analysis...</p>
                </div>
              )}

              {aiResult && (
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-spiceGold/10 border border-spiceGold/30">
                    <span className="text-[10px] text-muted-foreground block">Detected Food</span>
                    <strong className="text-base text-foreground font-bold font-sans block mb-1">{aiResult.detectedFood}</strong>
                    <div className="grid grid-cols-2 gap-2 text-[11px] mt-2 border-t border-spiceGold/20 pt-2">
                      <div>Food Type: <strong className="text-mossVerified">Vegetarian</strong></div>
                      <div>Confidence: <strong className="text-spiceGold">{aiResult.confidence}%</strong></div>
                      <div>Visual Condition: <strong className="text-mossVerified">{aiResult.visualCondition}</strong></div>
                      <div>Window: <strong className="text-spiceGold">4h 10m</strong></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border space-y-1">
                    <span className="text-muted-foreground block">Redistribution Status:</span>
                    <strong className="text-mossVerified font-bold text-xs">{aiResult.recommendation}</strong>
                  </div>

                  {/* Mandatory Safety Disclaimer */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-[11px] leading-relaxed">
                    <p className="font-bold flex items-center gap-1.5 mb-0.5">
                      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" /> Safety Disclaimer
                    </p>
                    AI provides a preliminary visual assessment and does not certify food safety or microbiological safety.
                  </div>

                  <button
                    onClick={handleSubmitDonation}
                    className="btn-primary-gold w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>MAKE FOOD AVAILABLE — Track Pickup</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSurplusPage;
