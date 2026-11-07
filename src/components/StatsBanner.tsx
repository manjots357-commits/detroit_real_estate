import React from 'react';
import { Star, MessageSquare, Wrench, Shield, CheckCircle2, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/automotiveData';

interface StatsBannerProps {
  onOpenVerificationModal?: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = () => {
  return (
    <div id="stats-and-services" className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel-elevated rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/10 backdrop-blur-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {/* Metric 1: 4.5+ Rating */}
          <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:px-4">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  4.5+
                </span>
                <span className="text-amber-400 text-xs font-mono">★</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">Google Rating</p>
            </div>
          </div>

          {/* Metric 2: 433+ Customer Reviews */}
          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  433+
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">Customer Reviews</p>
            </div>
          </div>

          {/* Metric 3: Complete Auto Solutions */}
          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Complete
              </div>
              <p className="text-xs text-slate-300 font-medium">Auto Solutions</p>
            </div>
          </div>

          {/* Metric 4: Detroit's Trusted Repair Shop */}
          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Detroit's
              </div>
              <p className="text-xs text-slate-300 font-medium">Trusted Repair Shop</p>
            </div>
          </div>
        </div>

        {/* Clean Live Production Sub-strip */}
        <div className="mt-3.5 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Serving Northwest Detroit and surrounding areas with honest diagnostics, brakes, alignment, and full mechanical care.</span>
          </div>
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View Google Profile & Directions</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
