/**
 * FreshnessResult.jsx
 * Displays structured AI freshness assessment results.
 * Shows demo mode banner when isDemo=true.
 * Always shows safety disclaimer — never hides it.
 */

import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, Info, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const QUALITY_COLORS = {
  Excellent: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
  Good: 'text-mossVerified bg-mossVerified/10 border-mossVerified/30',
  Fair: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  Poor: 'text-red-500 bg-red-500/10 border-red-500/30',
};

const RISK_COLORS = {
  Low: 'text-mossVerified bg-mossVerified/10 border-mossVerified/30',
  Medium: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  High: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
  Critical: 'text-red-600 bg-red-600/10 border-red-600/30',
};

const ScoreBar = ({ score }) => {
  const color =
    score >= 85 ? '#3F6B4A' :
    score >= 65 ? '#B98A2E' :
    score >= 45 ? '#d97706' : '#8C3B2E';

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-muted-foreground">Freshness Score</span>
        <strong style={{ color }} className="text-sm">{score} / 100</strong>
      </div>
      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const FreshnessResult = ({ result }) => {
  if (!result) return null;

  const {
    foodType,
    freshnessScore,
    quality,
    confidence,
    riskLevel,
    visualFindings = [],
    recommendation,
    manualInspectionRequired,
    disclaimer,
    isDemo,
    demoMessage,
    provider,
  } = result;

  const qualityClass = QUALITY_COLORS[quality] || QUALITY_COLORS.Fair;
  const riskClass = RISK_COLORS[riskLevel] || RISK_COLORS.Medium;
  const confidencePercent = Math.round((confidence || 0) * 100);
  const lowConfidence = confidencePercent < 70;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 font-mono text-xs"
    >
      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-800 dark:text-amber-300 text-[11px]">
          <p className="font-bold flex items-center gap-1.5 mb-1">
            <Info className="h-4 w-4 shrink-0" />
            DEMO MODE — No AI Key Configured
          </p>
          <p className="leading-relaxed">{demoMessage || 'Results are simulated. Add GEMINI_API_KEY to backend/.env for real analysis.'}</p>
        </div>
      )}

      {/* Scan complete banner */}
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-mossVerified/10">
          <CheckCircle2 className="h-4 w-4 text-mossVerified" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-mossVerified uppercase tracking-wider">
            {isDemo ? 'Demo Scan Complete' : 'Neural Scan Complete'}
          </p>
          {!isDemo && (
            <p className="text-[10px] text-muted-foreground">
              Powered by {provider || 'Gemini 1.5 Flash'} — Visual Assessment Only
            </p>
          )}
        </div>
      </div>

      {/* Food Type */}
      <div className="p-4 rounded-xl bg-spiceGold/10 border border-spiceGold/30">
        <span className="text-[10px] text-muted-foreground block">Detected Food Item</span>
        <strong className="text-sm text-foreground font-bold font-sans block mb-2">{foodType}</strong>

        {/* Score Bar */}
        <ScoreBar score={freshnessScore} />

        {/* Grid: Quality, Confidence, Risk */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-spiceGold/20 text-[11px]">
          <div>
            <span className="text-muted-foreground block mb-0.5">Quality</span>
            <span className={`px-1.5 py-0.5 rounded-md border font-bold text-[10px] ${qualityClass}`}>
              {quality}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-0.5">Confidence</span>
            <strong className={lowConfidence ? 'text-amber-500' : 'text-spiceGold'}>
              {confidencePercent}%
            </strong>
          </div>
          <div>
            <span className="text-muted-foreground block mb-0.5">Risk Level</span>
            <span className={`px-1.5 py-0.5 rounded-md border font-bold text-[10px] ${riskClass}`}>
              {riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Low Confidence Warning */}
      {lowConfidence && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px]">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
          <span>Low confidence ({confidencePercent}%) — Manual inspection is strongly recommended before redistribution.</span>
        </div>
      )}

      {/* Visual Findings */}
      {visualFindings.length > 0 && (
        <div className="p-4 rounded-xl bg-card border border-border space-y-2">
          <span className="text-muted-foreground block text-[11px] font-semibold uppercase tracking-wider">
            Visual Findings
          </span>
          <ul className="space-y-1.5">
            {visualFindings.map((finding, i) => (
              <li key={i} className="flex items-start gap-2 text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-mossVerified shrink-0 mt-0.5" />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendation */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <span className="text-muted-foreground block mb-1 text-[11px] font-semibold uppercase tracking-wider">
          Recommendation
        </span>
        <p className={`leading-relaxed ${manualInspectionRequired ? 'text-amber-700 dark:text-amber-400' : 'text-foreground'}`}>
          {recommendation}
        </p>
        {manualInspectionRequired && (
          <p className="mt-1.5 text-[11px] font-bold text-amber-600 flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" />
            Manual inspection required before redistribution.
          </p>
        )}
      </div>

      {/* Safety Disclaimer — always shown */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-[11px] leading-relaxed">
        <p className="font-bold flex items-center gap-1.5 mb-0.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
          Mandatory Safety Disclaimer
        </p>
        {disclaimer || 'AI visual assessment is ASSISTIVE only and does not certify food safety, microbiological safety, or fitness for human consumption. Manual inspection by a qualified person is required.'}
      </div>
    </motion.div>
  );
};

export default FreshnessResult;
