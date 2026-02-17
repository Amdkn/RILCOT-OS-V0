import React, { useState } from 'react';
import { Icons } from '../components/Icons';
import { Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Programme Alpha 2024',
    description: 'Développement d\'une plateforme éducative pour les jeunes en zones rurales.',
    lead: 'Alain Martin',
    progress: 75,
    beneficiaries: 1250,
    sdg: 4,
    status: 'execution'
  },
  {
    id: '2',
    title: 'Initiative Eau Propre',
    description: 'Installation de systèmes de filtration d\'eau dans les communautés isolées.',
    lead: 'Sarah Dubois',
    progress: 40,
    beneficiaries: 580,
    sdg: 6,
    status: 'execution'
  },
  {
    id: '3',
    title: 'Projet Énergie Solaire',
    description: 'Fournir un accès à l\'énergie renouvelable pour les centres de santé.',
    lead: 'Jean Lambert',
    progress: 95,
    beneficiaries: 3100,
    sdg: 7,
    status: 'execution'
  }
];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'idea' | 'scoping' | 'execution'>('all');

  return (
    <div className="p-4 space-y-4 pb-24">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900">Portefeuille de Projets</h1>
        <Icons.Search className="text-slate-400" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {['Tous', 'Idée', 'Cadrage', 'Exécution'].map((tab, idx) => {
          const key = idx === 0 ? 'all' : idx === 1 ? 'idea' : idx === 2 ? 'scoping' : 'execution';
          const isActive = filter === key;
          return (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-4">
        {MOCK_PROJECTS.map((project) => (
          <div key={project.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg text-slate-900 mb-2">{project.title}</h3>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">{project.description}</p>
            
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <Icons.Users size={14} />
              <span>Project Lead: {project.lead}</span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>Progression</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-50">
              <div>
                <div className="text-xs text-slate-400">Bénéficiaires atteints</div>
                <div className="text-sm font-bold text-slate-900">{project.beneficiaries.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">ODD alignés</div>
                <div className="text-sm font-bold text-slate-900">{project.sdg}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};