export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  estimatedTime: string;
  commonSigns: string[];
  recommendedInterval: string;
  status: 'Proposed - Pending Owner Confirmation' | 'Verified Service';
  icon: string;
  imageUrl?: string;
}

export interface DiagnosticHotspot {
  id: string;
  title: string;
  system: string;
  position: [number, number, number];
  description: string;
  symptoms: string[];
  recommendedServiceId: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email?: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  serviceId: string;
  preferredDate: string;
  preferredTimeSlot: 'morning' | 'afternoon' | 'anytime';
  symptomsOrNotes: string;
}

export interface SymptomGuideItem {
  id: string;
  title: string;
  category: string;
  commonSymptoms: string;
  potentialIssue: string;
  urgency: 'Critical Safety' | 'Prompt Attention' | 'Preventive';
  targetServiceId: string;
}
