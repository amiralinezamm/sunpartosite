export interface Project {
  id: string;
  title: string;
  category: 'villa' | 'residential' | 'industrial' | 'agriculture';
  categoryLabel: string;
  capacity: string;
  location: string;
  annualGeneration: string;
  description: string;
  image: string;
  specs: {
    panelType: string;
    inverterType: string;
    batteryCapacity?: string;
    completionYear: string;
    purpose: string;
  };
  highlight: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  features: string[];
  equipmentList?: string[];
}

export interface ApplicationCategory {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  suitableCapacity: string;
  keyBenefits: string[];
  idealFor: string;
  savingsInsight: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  projectType: string;
  comment: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TrustMetric {
  value: string | number | null;
  suffix: string;
  title: string;
  subtitle: string;
  iconName?: string;
  display?: string;
  icon?: string;
}
