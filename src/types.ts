export type ThemeId = 'royal' | 'obsidian' | 'ivory' | 'emerald';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  bgClass: string;
  cardBgClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
  accentClass: string; // The prime button/accent color
  accentHoverClass: string;
  borderClass: string;
  tagBgClass: string;
  tagTextClass: string;
  highlightClass: string; // Dynamic highlight accent
}

export interface Specialty {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string; // Lucide icon identifier
  commonDemands: string[];
}

export interface LawyerProfile {
  name: string;
  title: string;
  oab: string;
  bio: string;
  phone: string;
  email: string;
  officeAddress: string;
  officeHours: string;
  specialties: Specialty[];
  avatarUrl: string;
}

export interface BookingForm {
  name: string;
  email: string;
  whatsapp: string;
  specialtyId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  brief: string;
}

export interface SavedBooking extends BookingForm {
  id: string;
  createdAt: string;
  status: 'pending' | 'confirmed';
}
