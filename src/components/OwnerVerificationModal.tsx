import React, { useState } from 'react';
import { X, CheckCircle2, Clock, AlertTriangle, ShieldCheck, ShieldAlert, FileText, Check } from 'lucide-react';
import { VERIFICATION_CHECKLIST, BUSINESS_INFO } from '../data/automotiveData';

interface OwnerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerVerificationModal: React.FC<OwnerVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [checklist, setChecklist] = useState(
    VERIFICATION_CHECKLIST.map((item) => ({ ...item, confirmedByOwner: item.status === 'VERIFIED' }))
  );

  if (!isOpen) return null;

  const toggleCheck = (idx: number) => {
    setChecklist((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, confirmedByOwner: !c.confirmedByOwner } : c))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0f1118] border border-amber-500/40 p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 border-b border-white/10 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Pre-Publish Verification Governance</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
              OWNER PRE-PUBLISH AUDIT & VERIFICATION
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Per client guidelines, all business claims, service offerings, review metrics, and hours
              are categorized transparently. Check items off as they are validated by shop management.
            </p>
          </div>

          {/* Quick Summary Pill Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                Verified Facts
              </span>
              <p className="text-sm font-bold text-white mt-0.5">Name, Address & Phone</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                Proposed Catalog
              </span>
              <p className="text-sm font-bold text-white mt-0.5">8 Standard Services</p>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30">
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block">
                External Sync
              </span>
              <p className="text-sm font-bold text-white mt-0.5">Google Places API Pending</p>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Audit Checklist (Click to Toggle Approval)
            </h4>

            {checklist.map((item, idx) => (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  item.confirmedByOwner
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
                    : 'bg-[#08090c] border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        item.status === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : item.status === 'PROPOSED'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-sm font-semibold text-white">{item.item}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">{item.source}</p>
                </div>

                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    item.confirmedByOwner
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'border-white/20 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Guidelines Note */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 text-xs text-slate-400 leading-relaxed space-y-1.5">
            <p className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strict Anti-Fabrication Guarantee</span>
            </p>
            <p>
              This website does not fabricate customer names, star testimonials, staff certifications,
              awards, or guarantees. All figures and copy comply with truthful advertising guidelines.
            </p>
          </div>

          {/* Footer Action */}
          <div className="pt-2 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Close Verification Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
