import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Navigation,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/automotiveData';

interface ContactSectionProps {
  onOpenVerificationModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenVerificationModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 bg-[#06070a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 pb-12">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-red-500 inline-block" />
            <span className="text-xs uppercase font-bold tracking-widest text-red-400 font-mono">
              SHOP LOCATION & CONTACT
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            VISIT OUR GRAND RIVER FACILITY
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Conveniently situated on Grand River Avenue in Northwest Detroit. Call ahead,
            request directions, or send a quick service inquiry below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location Info & Preliminary Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Address Card */}
            <div className="p-6 rounded-2xl bg-[#0e1017] border border-white/10 space-y-5 shadow-xl">
              <div className="space-y-1">
                <span className="text-xs font-mono text-red-400 uppercase tracking-widest">
                  Verified Address
                </span>
                <h3 className="text-xl font-bold uppercase text-white tracking-tight">
                  Detroit Complete Auto Repair
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{BUSINESS_INFO.address.street}</p>
                    <p className="text-slate-400">
                      {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}
                    </p>
                    <span className="text-xs font-mono text-slate-400">Northwest Detroit · Grand River Corridor</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Phone className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Direct Telephone</span>
                    <a
                      href={BUSINESS_INFO.phone.dial}
                      className="text-base font-bold text-white hover:text-red-400 transition-colors font-mono"
                    >
                      {BUSINESS_INFO.phone.display}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={BUSINESS_INFO.phone.dial}
                  className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phone.clean}</span>
                </a>

                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-sky-400" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Business Hours Card (with Owner Verification Disclosure) */}
            <div className="p-6 rounded-2xl bg-[#0e1017] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-white uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>Operating Schedule</span>
                </div>
                <button
                  onClick={onOpenVerificationModal}
                  className="text-[11px] font-mono text-amber-400 hover:text-amber-300 underline"
                >
                  Proposed Schedule
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {BUSINESS_INFO.proposedHours.map((schedule, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-slate-300">{schedule.days}</span>
                    <span className="font-mono text-white font-semibold">{schedule.hours}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-600/20 text-[11px] text-amber-300/90 flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Schedule Notice:</strong> Hours shown represent typical repair shop operations and will be locked upon owner confirmation.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Preview + Quick Message */}
          <div className="lg:col-span-7 space-y-6">
            {/* Styled Map Embed Box */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c0e14] shadow-xl">
              <div className="p-4 bg-[#11131a] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Navigation className="w-4 h-4 text-red-500" />
                  <span>Map Location: <strong>20650 Grand River Ave, Detroit</strong></span>
                </div>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-mono"
                >
                  <span>Open Full Google Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Responsive Google Maps Embed with fallback */}
              <div className="relative w-full h-64 sm:h-80 bg-neutral-900">
                <iframe
                  title="Detroit Complete Auto Repair Location Map"
                  src="https://maps.google.com/maps?q=20650+Grand+River+Ave,+Detroit,+MI+48219&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter invert-[0.9] hue-rotate-180 contrast-[1.1] opacity-90"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Location Pin Badge */}
                <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-xs pointer-events-none">
                  <div className="flex items-center gap-2 font-bold text-white uppercase">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Detroit Complete Auto Repair</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5 font-mono">Grand River Ave & West McNichols Area</p>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="p-6 rounded-2xl bg-[#0e1017] border border-white/10 shadow-xl space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  Have A Quick Question?
                </h3>
                <p className="text-xs text-slate-400">
                  Send a brief message to our shop desk or call us directly at {BUSINESS_INFO.phone.display}.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500 font-mono"
                    />
                  </div>

                  <textarea
                    rows={2}
                    required
                    placeholder="How can we help your vehicle?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-slate-400">
                      Standard demo intake form
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl border border-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-red-500" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold">Inquiry Logged (Demo Submission)</p>
                    <p className="text-emerald-300/80 mt-0.5">
                      For immediate assistance, call the service desk directly at {BUSINESS_INFO.phone.display}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
