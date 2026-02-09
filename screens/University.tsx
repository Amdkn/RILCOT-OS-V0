import React from 'react';
import { Icons } from '../components/Icons';

export const University: React.FC = () => {
  return (
    <div className="p-4 pb-24">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Réseau Universitaire</h1>
        <Icons.Bell className="text-slate-400" />
      </div>

       <div className="flex gap-2 mb-6">
        <button className="flex-1 py-2 bg-blue-800 text-white rounded-lg text-sm font-medium">Vue Carte</button>
        <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium">Vue Liste</button>
      </div>

      {/* Map Placeholder */}
      <div className="w-full h-48 bg-blue-100 rounded-2xl mb-6 overflow-hidden relative border border-blue-200">
         <img src="https://picsum.photos/seed/map/600/300" alt="Map" className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
         <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-blue-900 shadow-sm">
                Interactive Map Loading...
            </span>
         </div>
      </div>

      <h2 className="font-bold text-lg text-slate-900 mb-3">Feuilles de Route Campus</h2>
      <div className="space-y-3 mb-8">
        {[3, 4].map(q => (
             <button key={q} className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                    <Icons.FileText size={20} />
                </div>
                <div className="text-left flex-1 font-semibold text-slate-800 text-sm">Plan du {q}ème trimestre 2024</div>
                <Icons.ChevronRight className="text-slate-300" size={18} />
             </button>
        ))}
      </div>

      <h2 className="font-bold text-lg text-slate-900 mb-3">Kits d'essaimage</h2>
      <div className="grid gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg"><Icons.Users size={20}/></div>
                <h3 className="font-bold text-slate-800">Kit Création de Club</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">Ressources pour lancer un nouveau club sur votre campus.</p>
            <button className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                <Icons.Download size={16} /> Télécharger
            </button>
        </div>

         <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg"><Icons.Megaphone size={20}/></div>
                <h3 className="font-bold text-slate-800">Kit Organisation Événement</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">Guides et modèles pour organiser des événements réussis.</p>
            <button className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                <Icons.Download size={16} /> Télécharger
            </button>
        </div>
      </div>
      
       <h2 className="font-bold text-lg text-slate-900 mt-8 mb-3">Annuaire des Points Focaux</h2>
       <div className="space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                <img src="https://picsum.photos/seed/pf1/50/50" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                    <div className="text-sm font-bold">Jeanne Dupont</div>
                    <div className="text-xs text-slate-500">Université de Lyon</div>
                </div>
                 <button className="bg-blue-50 p-2 rounded-full text-blue-600"><Icons.MessageSquare size={16}/></button>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                <img src="https://picsum.photos/seed/pf2/50/50" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                    <div className="text-sm font-bold">Marc Petit</div>
                    <div className="text-xs text-slate-500">Sorbonne Université</div>
                </div>
                 <button className="bg-blue-50 p-2 rounded-full text-blue-600"><Icons.MessageSquare size={16}/></button>
            </div>
       </div>

    </div>
  );
};
