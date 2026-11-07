import React from 'react';
import { Shield, Wrench, Eye, CheckCircle2, ShieldAlert } from 'lucide-react';
import { BUSINESS_INFO } from '../data/automotiveData';

interface AboutSectionProps {
  onOpenVerificationModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenVerificationModal }) => {
  return (
    <section id="about" className="relative py-20 bg-[#090b10] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual & Workshop Focus */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80"
                alt="Detroit Complete Auto Repair technician at work"
                className="w-full h-80 sm:h-96 object-cover object-center filter brightness-90 contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                <p className="font-display text-lg font-bold text-white uppercase tracking-tight">
                  Grand River Avenue Facility
                </p>
                <p className="text-xs text-slate-300 font-mono">
                  20650 Grand River Ave, Detroit, MI 48219
                </p>
              </div>
            </div>

            {/* Accent badge */}
            <div className="hidden sm:block absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-neutral-900 border border-red-500/40 shadow-xl text-xs font-mono text-red-400">
              <span>Detroit Automotive Standard</span>
            </div>
          </div>

          {/* Right Column: Compelling Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-red-500 inline-block" />
                <span className="text-xs uppercase font-bold tracking-widest text-red-400 font-mono">
                  OUR PHILOSOPHY & CRAFT
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                BUILT ON HONEST CARE & MECHANICAL CONFIDENCE
              </h2>
            </div>

            <p className="text-base text-slate-300 leading-relaxed">
              In Detroit—the city that put the world on wheels—drivers recognize real craftsmanship.
              At Detroit Complete Auto Repair, our philosophy is anchored in clear communication,
              honest diagnostic isolation, and respectful service before a single wrench turns.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              We understand that vehicle issues can be stressful and disruptive. That is why we explain
              what is happening under your hood in plain terms, prioritize urgent safety items from
              elective maintenance, and never proceed without your informed authorization.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0f1118] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-red-500 font-bold text-sm uppercase">
                  <Eye className="w-4 h-4" />
                  <span>No Blind Estimates</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clear, upfront estimates detailing parts and labor prior to commencing repairs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f1118] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase">
                  <Wrench className="w-4 h-4" />
                  <span>Modern Diagnostic Scope</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Precision computer scanners and sensors to eliminate costly guesswork.
                </p>
              </div>
            </div>

            {/* Transparency Note on Certifications per prompt rules */}
            <div className="p-4 rounded-xl bg-neutral-900/90 border border-white/10 text-xs text-slate-400 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-300 uppercase font-semibold">
                  Credentials & Shop History Notice
                </span>
                <button
                  onClick={onOpenVerificationModal}
                  className="text-amber-400 hover:text-amber-300 font-mono underline"
                >
                  Verify Status
                </button>
              </div>
              <p className="text-slate-400 leading-normal">
                To maintain complete truth in advertising, specific technician certification credentials (such as ASE or manufacturer badges), shop founding dates, and warranty term lengths are reserved as owner-approved placeholders until validated by management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
