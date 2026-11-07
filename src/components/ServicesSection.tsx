import React, { useState } from 'react';
import { PROPOSED_SERVICES } from '../data/automotiveData';
import { ServiceItem } from '../types';
import {
  Cpu,
  Disc,
  Target,
  ShieldCheck,
  Wrench,
  Zap,
  Activity,
  Cog,
  ChevronRight,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  X,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
  onOpenVerificationModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenVerificationModal,
}) => {
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);
  const [showAllServices, setShowAllServices] = useState(false);

  const displayedServices = showAllServices ? PROPOSED_SERVICES : PROPOSED_SERVICES.slice(0, 6);

  // Icon mapping
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-red-500" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-red-500" />;
      case 'Target':
        return <Target className="w-5 h-5 text-red-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-red-500" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-red-500" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-red-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-red-500" />;
      case 'Cog':
        return <Cog className="w-5 h-5 text-red-500" />;
      default:
        return <Wrench className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section id="services" className="relative py-20 bg-[#08090b] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-500 inline-block" />
              <span className="text-xs uppercase font-bold tracking-widest text-red-400">
                OUR SERVICES
              </span>
              <span className="text-slate-600">·</span>
              <button
                onClick={onOpenVerificationModal}
                className="text-[11px] text-amber-400/80 hover:text-amber-300 underline font-mono transition-colors"
              >
                (Proposed Catalog — Verify With Owner)
              </button>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
              COMPLETE AUTO CARE
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Comprehensive repair, diagnostic testing, and routine maintenance for Detroit drivers.
              Click any category to review diagnostic scope and schedule.
            </p>
          </div>

          <button
            onClick={() => setShowAllServices(!showAllServices)}
            className="inline-flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-400 uppercase tracking-wider transition-colors group self-start md:self-auto cursor-pointer"
          >
            <span>{showAllServices ? 'SHOW LESS SERVICES' : 'VIEW ALL SERVICES'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Services Grid (6 cards matching mockup visual rhythm) */}
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setActiveServiceModal(service)}
              className="group relative rounded-2xl bg-[#0f1118] border border-white/10 hover:border-red-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/20 cursor-pointer overflow-hidden"
            >
              {/* Subtle top subtle rim lighting on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500 transition-all duration-500" />

              <div className="space-y-4">
                {/* Header: Icon + Category */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:border-red-500/40 group-hover:bg-red-950/20 transition-colors">
                    {renderIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">
                  {service.name}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                  {service.shortDesc}
                </p>

                {/* Common signs snippet */}
                <div className="pt-2 text-xs text-slate-400 space-y-1">
                  <span className="font-mono text-[11px] text-slate-300 block">Common Indicators:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.commonSigns.slice(0, 2).map((sign, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-white/5 px-2 py-0.5 rounded text-slate-300 border border-white/5"
                      >
                        {sign}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom footer bar with action trigger */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                <span className="font-mono text-[11px] text-slate-400">
                  Est. {service.estimatedTime}
                </span>

                <div className="flex items-center gap-1 text-red-500 group-hover:text-red-400 font-bold uppercase tracking-wider">
                  <span>Details & Book</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Notice footer */}
        <div className="mt-10 p-4 rounded-xl bg-[#0e1017] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>
              <strong>Owner Notice:</strong> Service categories reflect standard comprehensive automotive shop capabilities and are awaiting formal owner verification prior to commercial release.
            </span>
          </div>
          <button
            onClick={onOpenVerificationModal}
            className="text-amber-400 hover:text-amber-300 font-mono underline underline-offset-2 shrink-0 cursor-pointer"
          >
            View Verification Status
          </button>
        </div>
      </div>

      {/* In-Depth Service Detail Modal */}
      {activeServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0f1118] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setActiveServiceModal(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center justify-center">
                  {renderIcon(activeServiceModal.icon)}
                </div>
                <div>
                  <div className="text-xs font-mono text-red-400 uppercase tracking-widest">
                    {activeServiceModal.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
                    {activeServiceModal.name}
                  </h3>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-600/30 text-amber-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Owner Verification Marker:</strong> This proposed service offering is currently undergoing shop management verification.
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono pb-1">
                  Service Scope & Technical Description
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {activeServiceModal.fullDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-900 border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>Estimated Completion</span>
                  </div>
                  <p className="text-base font-semibold text-white">
                    {activeServiceModal.estimatedTime}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900 border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Recommended Cadence</span>
                  </div>
                  <p className="text-base font-semibold text-white">
                    {activeServiceModal.recommendedInterval}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono pb-2">
                  When To Schedule This Service
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {activeServiceModal.commonSigns.map((sign, i) => (
                    <li key={i} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <button
                  onClick={() => setActiveServiceModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-slate-300 text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = activeServiceModal.id;
                    setActiveServiceModal(null);
                    onSelectServiceForBooking(id);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Appointment for This Service</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
