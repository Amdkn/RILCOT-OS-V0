import React, { useState } from 'react';
import { Icons } from '../components/Icons';

export const Membership: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img src="https://picsum.photos/seed/jean/80/80" alt="Avatar" className="w-12 h-12 rounded-full" />
        <div>
          <h1 className="font-bold text-slate-900">Jean Dupont</h1>
          <p className="text-sm text-slate-500">Membre potentiel</p>
        </div>
        <div className="ml-auto">
          <Icons.Bell className="text-slate-400" />
        </div>
      </div>

      {/* Stepper */}
      <div className="flex mb-6 border-b border-slate-200">
        <button className={`flex-1 pb-3 text-sm font-medium border-b-2 ${step === 1 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}>Demande</button>
        <button className="flex-1 pb-3 text-sm font-medium text-slate-400 border-b-2 border-transparent">Paiement</button>
        <button className="flex-1 pb-3 text-sm font-medium text-slate-400 border-b-2 border-transparent">Statut</button>
      </div>

      <div className="space-y-6">
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="font-bold text-lg mb-4">Identité</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Prénom</label>
              <input type="text" defaultValue="Jean" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Nom</label>
              <input type="text" defaultValue="Dupont" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Date de naissance</label>
              <div className="relative">
                <input type="text" placeholder="mm/dd/yyyy" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                <Icons.Calendar className="absolute right-3 top-3 text-slate-400" size={20} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="font-bold text-lg mb-4">Contact</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Adresse e-mail</label>
              <input type="email" defaultValue="jean.dupont@email.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Téléphone</label>
              <input type="tel" defaultValue="+33 6 12 34 56 78" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="font-bold text-lg mb-4">Motivation</h2>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Vos motivations pour rejoindre RILCOT</label>
            <textarea rows={4} placeholder="Expliquez brièvement pourquoi vous souhaitez devenir membre..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
          </div>
        </section>

        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-transform flex items-center justify-center gap-2">
          Soumettre ma demande
          <Icons.ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
