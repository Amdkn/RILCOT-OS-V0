import React from 'react';
import { Icons } from '../components/Icons';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  userName: string;
}

const MenuGridItem = ({ icon: Icon, label, onClick, color = "bg-blue-100 text-blue-600" }: { icon: any, label: string, onClick: () => void, color?: string }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 aspect-square"
  >
    <div className={`p-3 rounded-full mb-3 ${color}`}>
      <Icon size={24} />
    </div>
    <span className="text-xs font-medium text-center text-slate-700 leading-tight">{label}</span>
  </button>
);

const StatCard = ({ label, value, sub, trend }: { label: string, value: string, sub?: string, trend?: string }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
    <div className="text-sm text-slate-500 mb-1">{label}</div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    {sub && <div className={`text-xs mt-2 ${trend === 'positive' ? 'text-green-600' : 'text-slate-400'}`}>{sub}</div>}
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, userName }) => {
  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/seed/user1/100/100" alt="Profile" className="w-12 h-12 rounded-full border-2 border-orange-200" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Bonjour, {userName}!</h1>
            <p className="text-sm text-slate-500">Bienvenue sur RILCOT OS</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600">
          <Icons.Bell size={24} />
        </button>
      </div>

      {/* Quick Stats Widget (Scrollable) */}
      <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
        <div className="min-w-[160px]">
          <StatCard label="Membres actifs" value="1,204" sub="+5.2%" trend="positive" />
        </div>
        <div className="min-w-[160px]">
          <StatCard label="Projets en cours" value="28" sub="+2 ce mois" trend="positive" />
        </div>
        <div className="min-w-[160px]">
          <StatCard label="Budget" value="76%" sub="-1.5% vs N-1" />
        </div>
      </div>

      {/* Main Grid Navigation */}
      <div className="grid grid-cols-3 gap-3">
        <MenuGridItem icon={Icons.UserPlus} label="Adhésions" onClick={() => onNavigate('membership')} />
        <MenuGridItem icon={Icons.Building} label="Gouvernance" onClick={() => onNavigate('governance')} />
        <MenuGridItem icon={Icons.PiggyBank} label="Finances" onClick={() => onNavigate('finance')} />
        
        <MenuGridItem icon={Icons.FolderOpen} label="Projets" onClick={() => onNavigate('projects')} />
        <MenuGridItem icon={Icons.GraduationCap} label="Réseau Univ." onClick={() => onNavigate('university')} />
        <MenuGridItem icon={Icons.Megaphone} label="Recherche" onClick={() => {}} />
        
        <MenuGridItem icon={Icons.MessageSquare} label="Comms" onClick={() => {}} />
        <MenuGridItem icon={Icons.Briefcase} label="Talents" onClick={() => {}} />
        <MenuGridItem icon={Icons.ShieldCheck} label="Qualité" onClick={() => {}} />
      </div>

      {/* Upcoming Events Teaser */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">Événements à venir</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50">
          <button onClick={() => onNavigate('calendar')} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-left">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Icons.Users size={20} />
              </div>
              <div>
                <div className="font-semibold text-slate-800">Réunion du Conseil</div>
                <div className="text-xs text-slate-500">Aujourd'hui, 14:00 - Virtuel</div>
              </div>
            </div>
            <Icons.ChevronRight size={16} className="text-slate-400" />
          </button>
           <button onClick={() => onNavigate('calendar')} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-left">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <Icons.MapPin size={20} />
              </div>
              <div>
                <div className="font-semibold text-slate-800">Séminaire annuel</div>
                <div className="text-xs text-slate-500">25 Oct, 09:00 - Centre de Congrès</div>
              </div>
            </div>
            <Icons.ChevronRight size={16} className="text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
