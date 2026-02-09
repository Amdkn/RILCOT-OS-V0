import React from 'react';
import { Icons } from '../components/Icons';

export const Roadmap: React.FC = () => {
  const phases = [
    {
      id: 1,
      title: "Phase 1: MVP (Actuel)",
      status: "completed",
      items: ["Interface UI/UX Responsive", "Navigation fluide", "Vues statiques (Projets, Finances)", "Prototype interactif"]
    },
    {
      id: 2,
      title: "Phase 2: Données & Auth",
      status: "current",
      items: ["Authentification sécurisée", "Base de données (Supabase)", "Profils membres dynamiques", "Upload de documents"]
    },
    {
      id: 3,
      title: "Phase 3: Opérations",
      status: "upcoming",
      items: ["Paiement cotisations (Stripe)", "Gestion de projets (CRUD)", "Fils de discussion", "Notifications"]
    },
    {
      id: 4,
      title: "Phase 4: Intelligence",
      status: "upcoming",
      items: ["Carte universitaire interactive", "Chat temps réel", "Analytics avancés", "Assistant IA"]
    }
  ];

  return (
    <div className="p-4 pb-24">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Roadmap Produit</h1>
      </div>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {phases.map((phase) => (
          <div key={phase.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 shadow-sm shrink-0 z-10 ${
                phase.status === 'completed' ? 'bg-green-500 text-white' :
                phase.status === 'current' ? 'bg-blue-600 text-white' : 'bg-slate-200'
            }`}>
              {phase.status === 'completed' ? <Icons.ShieldCheck size={18} /> : 
               phase.status === 'current' ? <div className="w-3 h-3 bg-white rounded-full animate-pulse" /> : 
               <div className="w-3 h-3 bg-slate-400 rounded-full" />}
            </div>
            
            <div className="w-[calc(100%-3.5rem)] ml-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="font-bold text-slate-900">{phase.title}</h3>
                 <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
                   phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                   phase.status === 'current' ? 'bg-blue-100 text-blue-700' :
                   'bg-slate-100 text-slate-500'
                 }`}>{phase.status === 'completed' ? 'Terminé' : phase.status === 'current' ? 'En cours' : 'À venir'}</span>
               </div>
               <ul className="space-y-2">
                 {phase.items.map((item, i) => (
                   <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                     <span className={`mt-1.5 block w-1 h-1 rounded-full ${phase.status === 'upcoming' ? 'bg-slate-300' : 'bg-blue-400'}`} />
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
