import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { ServicesSection } from './components/ServicesSection';
import { DiagnosticBaySection } from './components/DiagnosticBaySection';
import { SymptomChecker } from './components/SymptomChecker';
import { AboutSection } from './components/AboutSection';
import { TrustAndReviews } from './components/TrustAndReviews';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { OwnerVerificationModal } from './components/OwnerVerificationModal';

export default function App() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  const handleOpenAppointment = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsAppointmentModalOpen(true);
  };

  const handleExplore3DBay = () => {
    const el = document.getElementById('diagnostic-bay');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090b] text-[#e2e6ed] flex flex-col font-sans selection:bg-red-600/30 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        onRequestAppointment={() => handleOpenAppointment()}
        onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Full Cinematic Hero Section */}
        <Hero
          onRequestAppointment={() => handleOpenAppointment()}
          onExplore3DBay={handleExplore3DBay}
        />

        {/* Stats Glass Banner */}
        <StatsBanner onOpenVerificationModal={() => setIsVerificationModalOpen(true)} />

        {/* Services Section */}
        <ServicesSection
          onSelectServiceForBooking={(serviceId) => handleOpenAppointment(serviceId)}
          onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
        />

        {/* Interactive 3D Vehicle Diagnostic Bay */}
        <DiagnosticBaySection
          onSelectService={(serviceId) => handleOpenAppointment(serviceId)}
        />

        {/* Driver Symptom Troubleshooter */}
        <SymptomChecker
          onSelectService={(serviceId) => handleOpenAppointment(serviceId)}
        />

        {/* About & Craft Section */}
        <AboutSection onOpenVerificationModal={() => setIsVerificationModalOpen(true)} />

        {/* Trust & Community Feedback */}
        <TrustAndReviews onOpenVerificationModal={() => setIsVerificationModalOpen(true)} />

        {/* Appointment Scheduling Section */}
        <AppointmentSection onOpenModal={(serviceId) => handleOpenAppointment(serviceId)} />

        {/* Location, Contact & Map Section */}
        <ContactSection onOpenVerificationModal={() => setIsVerificationModalOpen(true)} />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
        onRequestAppointment={() => handleOpenAppointment()}
      />

      {/* Modals */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        preSelectedServiceId={selectedServiceId}
      />

      <OwnerVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />
    </div>
  );
}
