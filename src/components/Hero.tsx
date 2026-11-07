import React, { useState } from 'react';
import { Calendar, Phone, ShieldCheck, Users, Wrench, Award, ChevronDown, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/automotiveData';

interface HeroProps {
  onRequestAppointment: () => void;
  onExplore3DBay: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestAppointment, onExplore3DBay }) => {
  const [imgSrc, setImgSrc] = useState(
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=2400&q=85'
  );

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0a0a0a]">
      {/* Background Clean High-Resolution Automotive Photograph (Zero Text/Mockups) */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgSrc}
          onError={() => {
            // High-res fallback if primary Unsplash connection stutters
            setImgSrc('https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=2400&q=85');
          }}
          alt="Modern automotive repair shop with technician servicing vehicle"
          className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] scale-100"
          referrerPolicy="no-referrer"
        />

        {/* User-Specified Dark Gradient Overlay: linear-gradient(to right, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.6) 100%) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.6) 100%)',
          }}
        />

        {/* Ambient Top and Bottom Dark Fades for smooth section transitions */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#08090b] via-[#08090b]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#08090b]/70 to-transparent pointer-events-none" />

        {/* Subtle controlled electric red & blue ambient flares */}
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Hero Content Area - Cleanly Aligned to Left Edge of Main Navbar Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-12 flex-1 flex flex-col justify-center items-start text-left">
        <div className="w-full max-w-2xl space-y-6 text-left">
          {/* Location Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>20650 Grand River Ave, Detroit · Professional Auto Care</span>
          </div>

          {/* Master Headline */}
          <div className="space-y-1.5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] text-white">
              KEEPING DETROIT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-500">
                ON THE ROAD
              </span>
            </h1>
            <p className="font-display text-xl sm:text-2xl text-slate-300 font-bold uppercase tracking-wide pt-1">
              PRECISION. PERFORMANCE. PEACE OF MIND.
            </p>
          </div>

          {/* Supporting Proposition */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-normal">
            Automotive care built around confidence, quality, and dependable service.
            From computer engine diagnostics to precision brake repair, laser wheel alignment,
            and complete scheduled maintenance.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onRequestAppointment}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded-xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>REQUEST AN APPOINTMENT</span>
            </button>

            <a
              href={BUSINESS_INFO.phone.dial}
              className="px-6 py-3.5 bg-neutral-900/85 hover:bg-neutral-800 text-white font-bold text-base rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-md transition-all flex items-center justify-center gap-2.5 group"
            >
              <Phone className="w-5 h-5 text-red-500 transition-transform group-hover:scale-110" />
              <span>CALL THE SHOP</span>
            </a>
          </div>

          {/* 3D Interactive Feature Callout */}
          <div className="pt-1">
            <button
              onClick={onExplore3DBay}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-sky-300 transition-colors group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
              <span className="underline underline-offset-4">Or launch Interactive 3D Vehicle Inspection Bay</span>
            </button>
          </div>

          {/* Styled Bottom Trust Bar (Semi-transparent dark bar with blur & top border) */}
          <div className="pt-4 w-full max-w-2xl">
            <div
              style={{
                background: 'rgba(20, 20, 20, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              className="rounded-2xl p-3 sm:py-3.5 sm:px-4 border border-white/10 border-t border-t-white/25 shadow-2xl"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-600/15 border border-red-500/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="font-semibold text-slate-100 whitespace-nowrap">Reliable Service</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-600/15 border border-red-500/30 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="font-semibold text-slate-100 whitespace-nowrap">Experienced Technicians</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-600/15 border border-red-500/30 flex items-center justify-center shrink-0">
                    <Wrench className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="font-semibold text-slate-100 whitespace-nowrap">Quality Parts</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-600/15 border border-red-500/30 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="font-semibold text-slate-100 whitespace-nowrap">Customer Focused</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 w-full flex justify-center pb-3">
        <a
          href="#stats-and-services"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors group"
          aria-label="Scroll down to view services and details"
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 group-hover:text-slate-200">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-red-500" />
        </a>
      </div>
    </section>
  );
};
