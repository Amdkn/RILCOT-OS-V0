import React from 'react';
import { Icons } from '../components/Icons';
import { Member } from '../types';

const MEMBERS: Member[] = [
  { id: '1', name: 'Jean Dupont', role: 'Président', status: 'Actif', avatar: 'https://picsum.photos/seed/m1/100/100' },
  { id: '2', name: 'Marie Curie', role: "Membre d'Honneur", status: 'En attente', avatar: 'https://picsum.photos/seed/m2/100/100' },
  { id: '3', name: 'Pierre Martin', role: 'Membre Fondateur', status: 'Actif', avatar: 'https://picsum.photos/seed/m3/100/100' },
  { id: '4', name: 'Sophie Dubois', role: 'Membre Effectif', status: 'Suspendu', avatar: 'https://picsum.photos/seed/m4/100/100' },
  { id: '5', name: 'Lucas Bernard', role: 'Membre Effectif', status: 'Actif', avatar: 'https://picsum.photos/seed/m5/100/100' },
  { id: '6', name: 'Chloé Petit', role: 'Membre Effectif', status: 'Actif', avatar: 'https://picsum.photos/seed/m6/100/100' },
];

const StatusBadge = ({ status }: { status: Member['status'] }) => {
  const styles = {
    'Actif': 'bg-green-100 text-green-700',
    'En attente': 'bg-yellow-100 text-yellow-700',
    'Suspendu': 'bg-red-100 text-red-700'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

export const Directory: React.FC = () => {
  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Annuaire des Membres</h1>
        <button>
            <Icons.Settings className="text-slate-400" />
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Icons.Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher un membre..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
          />
        </div>
        <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600">
          <Icons.Filter size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {MEMBERS.map((member) => (
          <div key={member.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <StatusBadge status={member.status} />
              </div>
              <p className="text-sm text-slate-500">{member.role}</p>
            </div>
            <Icons.ChevronRight className="text-slate-300" size={18} />
          </div>
        ))}
      </div>
    </div>
  );
};