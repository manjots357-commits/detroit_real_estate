import React from 'react';
import { Phone, MapPin, Gauge, ShieldAlert, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/automotiveData';

interface FooterProps {
  onOpenVerificationModal: () => void;
  onRequestAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVerificationModal,
  onRequestAppointment,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/10 text-slate-400 text-xs">
      {/* Upper Footer Zone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Wordmark */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center">
                <Gauge className="w-4 h-4 text-red-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-base tracking-tight text-white uppercase">
                  DETROIT
                </span>
                <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase -mt-0.5">
                  COMPLETE AUTO REPAIR
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Precision automotive repair, diagnostics, and routine maintenance for Detroit motorists.
              Quality components and clear communication.
            </p>

            <button
              onClick={onOpenVerificationModal}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-mono text-[11px] underline underline-offset-2 transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Owner Pre-Publish Audit Status</span>
            </button>
          </div>

          {/* Col 2: Navigation Mirror */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-wider text-xs font-bold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home & Overview
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services Catalog
                </a>
              </li>
              <li>
                <a href="#diagnostic-bay" className="hover:text-white transition-colors">
                  3D Interactive Diagnostic Bay
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Ratings & Feedback
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Location & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Facility Details */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-wider text-xs font-bold text-white">
              Verified Location
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">{BUSINESS_INFO.address.street}</p>
                  <p className="text-slate-400">
                    {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={BUSINESS_INFO.phone.dial}
                  className="font-mono font-bold text-white hover:text-red-400 transition-colors"
                >
                  {BUSINESS_INFO.phone.display}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Action */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-wider text-xs font-bold text-white">
              Schedule Service
            </h4>
            <p className="text-xs text-slate-400">
              Ready to service your vehicle? Submit an appointment request online or call our shop desk.
            </p>
            <button
              onClick={onRequestAppointment}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
            >
              Request Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/5 bg-[#030406] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400 space-y-0.5 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Detroit Complete Auto Repair. All rights reserved.
            </p>
            <p className="text-slate-400">
              Pre-release concept for business verification. Do not publish or contact business without approval.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs font-mono"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
