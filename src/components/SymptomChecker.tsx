import React, { useState } from 'react';
import { SYMPTOM_GUIDE } from '../data/automotiveData';
import { SymptomGuideItem } from '../types';
import { Stethoscope, AlertCircle, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

interface SymptomCheckerProps {
  onSelectService: (serviceId: string) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onSelectService }) => {
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomGuideItem>(SYMPTOM_GUIDE[0]);

  const getUrgencyBadge = (urgency: SymptomGuideItem['urgency']) => {
    switch (urgency) {
      case 'Critical Safety':
        return (
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-400 font-semibold">
            Urgent Inspection Recommended
          </span>
        );
      case 'Prompt Attention':
        return (
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 font-semibold">
            Prompt Evaluation Needed
          </span>
        );
      case 'Preventive':
        return (
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/40 text-blue-400 font-semibold">
            Preventive Maintenance
          </span>
        );
    }
  };

  return (
    <section className="py-16 bg-[#08090b] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-2 pb-8">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-red-500 inline-block" />
            <span className="text-xs uppercase font-bold tracking-widest text-red-400 font-mono">
              DRIVER SYMPTOM TROUBLESHOOTER
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            WHAT IS YOUR VEHICLE EXPERIENCING?
          </h2>
          <p className="text-sm text-slate-400">
            Select a common driving symptom below to identify the affected mechanical system and book the appropriate diagnostic check.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Symptoms List (Left Column) */}
          <div className="lg:col-span-5 space-y-2">
            {SYMPTOM_GUIDE.map((item) => {
              const isSelected = selectedSymptom.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSymptom(item)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-neutral-900 border-red-500/60 shadow-lg shadow-red-950/30'
                      : 'bg-[#0e1017] border-white/5 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {item.title}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-red-500 translate-x-1' : 'text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Diagnostic Recommendation Panel (Right Column) */}
          <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-[#10131d] to-[#0c0e14] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  System Diagnostics Focus
                </span>
                {getUrgencyBadge(selectedSymptom.urgency)}
              </div>

              <div>
                <h3 className="text-2xl font-bold uppercase text-white tracking-tight">
                  {selectedSymptom.title}
                </h3>
                <p className="text-sm text-slate-400 font-mono pt-1">
                  System Category: {selectedSymptom.category}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Observed Symptoms
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedSymptom.commonSymptoms}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Probable Mechanical Root Cause
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedSymptom.potentialIssue}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                <span>Recommended Action: </span>
                <span className="text-white font-medium">Professional bay inspection & digital scan</span>
              </div>

              <button
                onClick={() => onSelectService(selectedSymptom.targetServiceId)}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Request Appointment For This Issue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
