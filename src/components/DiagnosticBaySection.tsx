import React from 'react';
import { Vehicle3DViewer } from './Vehicle3DViewer';
import { Sparkles, Cpu, ShieldCheck, Activity, Terminal } from 'lucide-react';

interface DiagnosticBaySectionProps {
  onSelectService: (serviceId: string) => void;
}

export const DiagnosticBaySection: React.FC<DiagnosticBaySectionProps> = ({ onSelectService }) => {
  return (
    <section id="diagnostic-bay" className="relative py-20 bg-[#060709] border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3 pb-8">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-sky-500 inline-block" />
            <span className="text-xs uppercase font-bold tracking-widest text-sky-400 font-mono">
              3D VEHICLE INSPECTION BAY
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            EXPLORE VEHICLE SYSTEMS IN REAL-TIME 3D
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Rotate the chassis, examine powertrain and suspension geometry, or switch into
            Diagnostic X-Ray scan mode to visualize critical vehicle subsystems before arriving at our shop.
          </p>
        </div>

        {/* 3D Viewer Element */}
        <Vehicle3DViewer onSelectService={onSelectService} />

        {/* Feature Highlights Grid */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#0d0f15] border border-white/5 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-950/40 text-red-400 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider">OBD-II Computer Scanning</p>
              <p className="text-slate-400 mt-1 leading-normal">
                Live sensor readout and freeze-frame diagnostics to identify electrical and engine misfires.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0d0f15] border border-white/5 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sky-950/40 text-sky-400 shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider">Laser 4-Wheel Geometry</p>
              <p className="text-slate-400 mt-1 leading-normal">
                Computer-guided toe, camber, and caster realignment to protect tires and steering dynamics.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0d0f15] border border-white/5 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-950/40 text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider">Hydraulic & Braking Safety</p>
              <p className="text-slate-400 mt-1 leading-normal">
                Micro-caliper pad thickness measurements, rotor runout checks, and ABS circuit tests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
