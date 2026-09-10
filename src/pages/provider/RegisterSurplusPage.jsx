import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Sparkles, Box, Thermometer, Info, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../lib/api';
import FoodImageUploader from '../../components/FoodImageUploader';
import FreshnessResult from '../../components/FreshnessResult';

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
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  // AI Assessment State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [foodId, setFoodId] = useState(null);
  const [error, setError] = useState(null);
  const [tempSlider, setTempSlider] = useState(65);

  const handleRunAiAnalysis = async () => {
    if (uploadedImageUrls.length === 0) {
      setError('Please upload at least one food photo first.');
      return;
    }

    setIsAnalyzing(true);
    setAiResult(null);
    setError(null);

    try {
      const analysisPayload = {
        imageUrls: uploadedImageUrls,
        foodName,
        category,
        storageMethod: storageCondition,
      };

      const assessment = await api.analyzeFoodImages(analysisPayload);
      setAiResult(assessment.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    if (!aiResult || !foodId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      if (!foodId) {
        const formData = new FormData();
        formData.append('foodName', foodName);
        formData.append('category', category);
        formData.append('foodType', category.includes('Non-Vegetarian') ? 'NON_VEGETARIAN' : 'VEGETARIAN');
        formData.append('quantityKg', quantityKg);
        formData.append('numberOfPortions', Math.round(Number(quantityKg) * 2));
        formData.append('preparedAt', new Date(Date.now() - 90 * 60000).toISOString());
        formData.append('surplusAt', new Date(Date.now() - 60 * 60000).toISOString());
        formData.append('storageMethod', storageCondition);
        formData.append('storageTemperature', tempSlider);
        formData.append('packagingCondition', 'Good');
        formData.append('handlingInformation', 'Maintained in thermal storage');
        // If images were uploaded directly through the API, pass the URLs
        formData.append('imageUrls', JSON.stringify(uploadedImageUrls));

        const created = await api.createFood(formData);
        const newFoodId = created.data._id;
        setFoodId(newFoodId);
        
        // Immediately make it available after creation
        await api.makeFoodAvailable(newFoodId);
      } else {
        await api.makeFoodAvailable(foodId);
      }

      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });

      if (onAddNewListing) {
        onAddNewListing({
          id: foodId,
          foodName,
          category,
          quantityKg: Number(quantityKg),
          portions: Math.round(Number(quantityKg) * 2),
          freshnessScore: aiResult.freshnessScore,
          status: 'Live',
        });
      }

      navigate('/provider/deliveries');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
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

            <FoodImageUploader
              onUploadedUrls={(urls) => setUploadedImageUrls(urls)}
              onUploadComplete={(urls) => {
                // Keep URLs updated, allow manual run of AI analysis
                setUploadedImageUrls(urls);
              }}
            />

            <button
              type="button"
              onClick={handleRunAiAnalysis}
              disabled={isAnalyzing || uploadedImageUrls.length === 0}
              className="btn-primary-gold mt-6 w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs mb-4">
                  {error}
                </div>
              )}

              {aiResult && (
                <div className="space-y-4">
                  <FreshnessResult result={aiResult} />

                  <button
                    onClick={handleSubmitDonation}
                    disabled={isSubmitting || aiResult.riskLevel === 'Critical' || aiResult.riskLevel === 'High'}
                    className="btn-primary-gold w-full mt-4 py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Publishing...' : 'MAKE FOOD AVAILABLE — Track Pickup'}</span>
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
