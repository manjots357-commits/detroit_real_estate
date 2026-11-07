import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, Phone, AlertCircle, Download, Car, Wrench, ShieldAlert } from 'lucide-react';
import { PROPOSED_SERVICES, BUSINESS_INFO } from '../data/automotiveData';
import { AppointmentFormData } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    vehicleYear: new Date().getFullYear().toString(),
    vehicleMake: '',
    vehicleModel: '',
    serviceId: preSelectedServiceId || PROPOSED_SERVICES[0].id,
    preferredDate: '',
    preferredTimeSlot: 'morning',
    symptomsOrNotes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    referenceCode: string;
    details: AppointmentFormData;
  } | null>(null);

  // Update pre-selected service when modal opens or prop changes
  useEffect(() => {
    if (preSelectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preSelectedServiceId }));
    }
  }, [preSelectedServiceId]);

  if (!isOpen) return null;

  // Format phone number nicely as user types (e.g. (313) 534-3400)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    } else if (raw.length > 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit US phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.vehicleMake.trim()) {
      newErrors.vehicleMake = 'Please specify vehicle make';
    }

    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = 'Please specify vehicle model';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please choose a preferred service date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network submission delay
    setTimeout(() => {
      const randomCode = 'DET-' + Math.floor(10000 + Math.random() * 90000);
      setSubmissionResult({
        success: true,
        referenceCode: randomCode,
        details: { ...formData },
      });
      setIsSubmitting(false);
    }, 600);
  };

  // Generate .ics calendar download for the user's records
  const handleDownloadCalendar = () => {
    if (!submissionResult) return;
    const dateStr = submissionResult.details.preferredDate.replace(/-/g, '');
    const serviceName =
      PROPOSED_SERVICES.find((s) => s.id === submissionResult.details.serviceId)?.name ||
      'Automotive Service';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Detroit Complete Auto Repair//Appointment//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Auto Repair Appointment: ${serviceName}`,
      `DESCRIPTION:Appointment request with Detroit Complete Auto Repair for ${submissionResult.details.vehicleYear} ${submissionResult.details.vehicleMake} ${submissionResult.details.vehicleModel}. Ref: ${submissionResult.referenceCode}`,
      `LOCATION:${BUSINESS_INFO.address.fullFormatted}`,
      `DTSTART:${dateStr}T130000Z`,
      `DTEND:${dateStr}T150000Z`,
      'STATUS:TENTATIVE',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Detroit_Auto_Repair_${submissionResult.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0f1118] border border-white/15 p-5 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submissionResult ? (
          <div>
            {/* Modal Header */}
            <div className="space-y-1 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                  Detroit Complete Auto Repair Service Request
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
                REQUEST AN APPOINTMENT
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Provide your vehicle details and preferred time window. Our technicians will review and confirm.
              </p>
            </div>

            {/* Demo Notice Banner (Mandatory per Master Prompt) */}
            <div className="my-4 p-3 rounded-xl bg-neutral-900 border border-white/10 text-xs text-slate-300 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Demonstration Submission Flow: </span>
                <span>
                  This concept interface demonstrates customer intake validation. Live calendar dispatch and automated SMS confirmations require connecting to shop management software (e.g. ShopMonkey / Mitchell1).
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              {/* Row 1: Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-1.5">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(313) 534-3400"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors font-mono"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Optional Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-1.5">
                  Email Address <span className="text-slate-500 lowercase">(optional for digital inspection report)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Vehicle Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-1.5">
                    Vehicle Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.vehicleYear}
                    onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                  >
                    {Array.from({ length: 35 }, (_, i) => new Date().getFullYear() - i).map(
                      (yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-1.5">
                    Make <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.vehicleMake}
                    onChange={(e) => {
                      setFormData({ ...formData, vehicleMake: e.target.value });
                      if (errors.vehicleMake) setErrors({ ...errors, vehicleMake: '' });
                    }}
                    placeholder="e.g. Ford, Chevy, Dodge"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                  />
                  {errors.vehicleMake && (
                    <p className="text-xs text-red-400 mt-1">{errors.vehicleMake}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-1.5">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.vehicleModel}
                    onChange={(e) => {
                      setFormData({ ...formData, vehicleModel: e.target.value });
                      if (errors.vehicleModel) setErrors({ ...errors, vehicleModel: '' });
                    }}
                    placeholder="e.g. F-150, Malibu, Charger"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                  />
                  {errors.vehicleModel && (
                    <p className="text-xs text-red-400 mt-1">{errors.vehicleModel}</p>
                  )}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-1.5">
                  Requested Service <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                >
                  {PROPOSED_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                  <option value="other">Other Diagnostic / Not Sure</option>
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-1.5">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => {
                      setFormData({ ...formData, preferredDate: e.target.value });
                      if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-red-400 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-1.5">
                    Time Window
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'morning', label: 'Morning (8-12)' },
                      { id: 'afternoon', label: 'Afternoon (12-5)' },
                      { id: 'anytime', label: 'Drop Off' },
                    ].map((slot) => (
                      <button
                        type="button"
                        key={slot.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            preferredTimeSlot: slot.id as AppointmentFormData['preferredTimeSlot'],
                          })
                        }
                        className={`py-2 px-2 text-[11px] font-medium rounded-lg border text-center transition-colors ${
                          formData.preferredTimeSlot === slot.id
                            ? 'bg-red-600 text-white border-red-500'
                            : 'bg-[#08090c] text-slate-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-1.5">
                  Additional Notes or Symptoms <span className="text-slate-500 lowercase">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.symptomsOrNotes}
                  onChange={(e) => setFormData({ ...formData, symptomsOrNotes: e.target.value })}
                  placeholder="Describe noises, dashboard lights, or when the problem occurs..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090c] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href={BUSINESS_INFO.phone.dial}
                  className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-red-500" />
                  <span>Prefer to call? {BUSINESS_INFO.phone.display}</span>
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>SUBMIT APPOINTMENT REQUEST</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div className="py-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Request Recorded (Demo Mode)
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
                APPOINTMENT REQUEST LOGGED
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{submissionResult.details.fullName}</strong>.
                Your service intake reference is ready.
              </p>
            </div>

            {/* Reference Box */}
            <div className="p-4 rounded-xl bg-[#08090c] border border-white/10 max-w-md mx-auto text-left space-y-2">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
                <span className="text-slate-400 font-mono">Reference Code:</span>
                <span className="font-mono font-bold text-red-400 text-sm">{submissionResult.referenceCode}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Vehicle:</span>
                <span className="text-white font-medium">
                  {submissionResult.details.vehicleYear} {submissionResult.details.vehicleMake}{' '}
                  {submissionResult.details.vehicleModel}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Service:</span>
                <span className="text-white font-medium">
                  {PROPOSED_SERVICES.find((s) => s.id === submissionResult.details.serviceId)?.name || 'General Repair'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Target Date:</span>
                <span className="text-white font-medium">{submissionResult.details.preferredDate}</span>
              </div>
            </div>

            {/* Backend Integration Requirements Explanation */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/30 text-xs text-amber-200/90 text-left space-y-2 max-w-md mx-auto">
              <p className="font-bold flex items-center gap-1.5 text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Next Step For Production Go-Live:</span>
              </p>
              <p className="leading-relaxed">
                To connect this form to real shop operations, configure an automated backend endpoint (such as Twilio SMS alerts, ShopMonkey / Mitchell1 webhook, or Google Calendar sync).
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/15 hover:border-white/30 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Save To Calendar (.ics)</span>
              </button>

              <a
                href={BUSINESS_INFO.phone.dial}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Shop Directly</span>
              </a>

              <button
                onClick={() => {
                  setSubmissionResult(null);
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
