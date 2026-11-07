import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, MapPin, Gauge, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/automotiveData';

interface NavbarProps {
  onRequestAppointment: () => void;
  onOpenVerificationModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRequestAppointment,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: '3D Bay', href: '#diagnostic-bay' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08090bd9] backdrop-blur-xl border-b border-white/10 transition-colors">
      {/* Top pre-header utility strip with verified address & live business hours */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-[#0e1017] border-b border-white/5 text-xs text-slate-400">
        <div className="flex items-center gap-6">
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>{BUSINESS_INFO.address.fullFormatted}</span>
          </a>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">Full-Service Domestic & Import Automotive Specialist</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-red-500" />
            <span className="font-mono text-[11px] text-slate-200">Mon – Sat: 8:00 AM – 6:00 PM</span>
          </div>
          <span className="text-slate-600">·</span>
          <a
            href={BUSINESS_INFO.phone.dial}
            className="flex items-center gap-1.5 text-white font-semibold hover:text-red-400 transition-colors"
          >
            <Phone className="w-3 h-3 text-red-500" />
            <span className="font-mono tabular-nums">{BUSINESS_INFO.phone.display}</span>
          </a>
        </div>
      </div>

      {/* Main 3-Zone Top Navigation Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <a href="#hero" className="flex items-center gap-3 shrink-0 group">
          {/* Stylized Detroit Speedometer Emblem */}
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/15 flex items-center justify-center shadow-lg group-hover:border-red-500/50 transition-colors">
            <Gauge className="w-5 h-5 text-red-500" />
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#08090b]" />
          </div>

          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-white uppercase group-hover:text-red-400 transition-colors">
              DETROIT
            </span>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase -mt-1">
              COMPLETE AUTO REPAIR
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline hover:underline-offset-4 decoration-red-500 decoration-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Quick Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={BUSINESS_INFO.phone.dial}
            className="hidden sm:flex md:hidden lg:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-mono px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span>{BUSINESS_INFO.phone.clean}</span>
          </a>

          <button
            onClick={onRequestAppointment}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Request Appointment</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0e14] border-b border-white/10 px-5 py-5 space-y-4 animate-in fade-in slide-in-from-top duration-150">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-white py-1.5 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={BUSINESS_INFO.phone.dial}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/15 text-white font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>Call Shop: {BUSINESS_INFO.phone.display}</span>
            </a>

            <div className="flex items-center justify-center gap-2 py-2 rounded-lg bg-neutral-900 border border-white/10 text-slate-300 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
