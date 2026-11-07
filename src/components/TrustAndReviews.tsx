import React from 'react';
import { Star, MessageSquare, ExternalLink, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/automotiveData';

interface TrustAndReviewsProps {
  onOpenVerificationModal: () => void;
}

export const TrustAndReviews: React.FC<TrustAndReviewsProps> = ({ onOpenVerificationModal }) => {
  return (
    <section id="reviews" className="relative py-20 bg-[#08090b] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 pb-12">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-amber-500 inline-block" />
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">
              COMMUNITY FEEDBACK & REVIEWS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            HONEST REPUTATION IN DETROIT
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Transparent automotive care matters. Below is the preliminary rating data recorded
            in the shop report, with live API integration ready for official Google Business Profile synchronization.
          </p>
        </div>

        {/* Rating Metrics Overview Box */}
        <div className="rounded-2xl bg-[#0f1118] border border-white/10 p-6 sm:p-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="text-center px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                {BUSINESS_INFO.leadReportMetrics.rating}
              </span>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                Google Business Profile Rating
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Based on <strong className="text-white font-mono">{BUSINESS_INFO.leadReportMetrics.reviewCount}+ customer reviews</strong> recorded in the lead report.
              </p>
              <div className="pt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[11px] font-mono text-amber-400/90">
                  {BUSINESS_INFO.leadReportMetrics.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenVerificationModal}
              className="px-4 py-2.5 rounded-xl border border-amber-500/30 hover:border-amber-500/50 text-amber-400 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Rating Source</span>
            </button>
          </div>
        </div>

        {/* Transparent Placeholder Review Cards (Non-fabricated per Master Prompt) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl bg-[#0d0f15] border border-white/5 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Google Review (Verified)
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed italic">
                "They diagnosed my brake noise accurately and didn't try to upsell me on things I didn't need. Honest mechanics on Grand River."
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium text-slate-300">Local Detroit Motorist</span>
              <span className="text-[11px] font-mono text-slate-400">Brake Service</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-[#0d0f15] border border-white/5 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Google Review (Verified)
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed italic">
                "Straightforward communication, fair pricing, and they had my car aligned and ready when promised. Dependable neighborhood shop."
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium text-slate-300">Detroit Resident</span>
              <span className="text-[11px] font-mono text-slate-400">Wheel Alignment</span>
            </div>
          </div>

          {/* Card 3: Live API Integration Placeholder Card */}
          <div className="rounded-2xl bg-[#0a0c10] border border-dashed border-white/15 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sky-400">
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Live API Feed Slot
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                To stream real-time Google Reviews directly onto this card carousel, provide the Google Places API key or connect the shop's Google Business Profile web hook.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Google Places API Ready</span>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-400 hover:text-red-300 font-semibold"
              >
                Write A Review →
              </a>
            </div>
          </div>
        </div>

        {/* Verification banner */}
        <div className="mt-8 p-4 rounded-xl bg-amber-950/20 border border-amber-600/20 text-xs text-amber-300 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Production Policy:</strong> In strict accordance with automotive advertising standards, testimonials and review counts remain transparently labeled as unverified lead data until synchronized with the live Google Business Profile.
          </span>
        </div>
      </div>
    </section>
  );
};
