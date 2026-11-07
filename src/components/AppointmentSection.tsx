import React from 'react';
import { Calendar, Phone, Clock, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';
import { BUSINESS_INFO, PROPOSED_SERVICES } from '../data/automotiveData';

interface AppointmentSectionProps {
  onOpenModal: (serviceId?: string) => void;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="appointment" className="relative py-20 bg-[#090b10] border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#121520] via-[#0d0f16] to-[#08090d] border border-white/15 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>Fast Service Intake</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight leading-tight">
                SCHEDULE YOUR VEHICLE SERVICE TODAY
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Whether you need computer diagnostics, brake pad replacement, laser wheel alignment,
                or a seasonal oil service, our team is dedicated to getting you back on Detroit roads safely.
              </p>

              {/* Direct Info Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-mono text-slate-400 block">Direct Telephone</span>
                    <a
                      href={BUSINESS_INFO.phone.dial}
                      className="font-bold text-white hover:text-red-400 font-mono text-sm"
                    >
                      {BUSINESS_INFO.phone.display}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-mono text-slate-400 block">Detroit Facility</span>
                    <span className="text-white font-medium">{BUSINESS_INFO.address.street}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onOpenModal()}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded-xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>REQUEST AN APPOINTMENT</span>
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href={BUSINESS_INFO.phone.dial}
                  className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-bold text-base rounded-xl border border-white/15 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5 text-red-500" />
                  <span>CALL THE SHOP</span>
                </a>
              </div>
            </div>

            {/* Right Card Column: Quick Service Catalog Preview */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Quick Service Selection
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono">Proposed Offerings</span>
                </div>

                <div className="space-y-2">
                  {PROPOSED_SERVICES.slice(0, 4).map((service) => (
                    <button
                      key={service.id}
                      onClick={() => onOpenModal(service.id)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-red-500/40 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-semibold text-white group-hover:text-red-400 transition-colors block">
                          {service.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Est. {service.estimatedTime}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-red-500 transition-colors" />
                    </button>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 pt-1 text-center">
                  Need another repair? Click Request Appointment to specify any issue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
