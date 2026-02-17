import React, { useState } from 'react';
import { Icons } from '../components/Icons';

interface SettingsProps {
  onNavigate: (screen: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const [imgUrl, setImgUrl] = useState('https://picsum.photos/seed/user1/100/100');

  return (
    <div className="p-4 pb-24">
      <h1 className="text-xl font-bold text-slate-900 mb-6">Réglages</h1>
      
      {/* Dynamic Image Section */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <h2 className="font-bold text-slate-900 mb-4">Profil & Avatar</h2>
        <div className="flex items-center gap-4 mb-4">
           <img src={imgUrl} alt="Preview" className="w-16 h-16 rounded-full border-2 border-slate-100 object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')} />
           <div className="flex-1">
             <label className="text-xs font-semibold text-slate-500 mb-1 block">URL de l'image (Lien dynamique HTML)</label>
             <div className="flex gap-2">
               <input 
                 type="text" 
                 value={imgUrl} 
                 onChange={(e) => setImgUrl(e.target.value)}
                 placeholder="https://..."
                 className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
               />
             </div>
             <p className="text-[10px] text-slate-400 mt-1">Collez une URL d'image pour mettre à jour l'aperçu instantanément.</p>
           </div>
        </div>
      </section>

      {/* App Info & Navigation */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
        <button onClick={() => onNavigate('roadmap')} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-left transition-colors">
           <div className="flex items-center gap-3">
             <div className="bg-purple-100 text-purple-600 p-2 rounded-lg"><Icons.MapPin size={20} /></div>
             <div>
                <span className="font-medium text-slate-700 block">Roadmap Produit</span>
                <span className="text-xs text-slate-400">Voir les prochaines évolutions</span>
             </div>
           </div>
           <Icons.ChevronRight size={18} className="text-slate-400" />
        </button>
        
         <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-left transition-colors">
           <div className="flex items-center gap-3">
             <div className="bg-slate-100 text-slate-600 p-2 rounded-lg"><Icons.ShieldCheck size={20} /></div>
             <span className="font-medium text-slate-700">Confidentialité & Données</span>
           </div>
           <Icons.ChevronRight size={18} className="text-slate-400" />
        </button>
      </section>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-400">RILCOT OS v0.1.0 (MVP)</p>
      </div>
    </div>
  );
};