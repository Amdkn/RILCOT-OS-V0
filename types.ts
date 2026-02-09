export interface Project {
  id: string;
  title: string;
  description: string;
  lead: string;
  progress: number;
  beneficiaries: number;
  sdg: number; // Sustainable Development Goal number
  status: 'idea' | 'scoping' | 'execution';
}

export interface Member {
  id: string;
  name: string;
  role: string;
  status: 'Actif' | 'En attente' | 'Suspendu';
  avatar: string;
}

export interface FinanceStat {
  label: string;
  amount: number;
  currency: string;
}

export interface GovernanceItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'budget' | 'regulation' | 'nomination' | 'statute';
}

export interface EventItem {
  id: string;
  time: string;
  title: string;
  location: string;
  type: string;
  day: number;
}
