import React from 'react';
import { Icons } from '../components/Icons';

export const Calendar: React.FC = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = [24, 25, 26, 27, 28, 29, 30]; // Mock week
  const todayIndex = 2; // 26th

  return (
    <div className="p-4 pb-24 h-full relative">
      <div className="flex justify-between items-center mb-6">
        <Icons.Settings className="text-slate-800" size={24} />
        <h1 className="text-lg font-bold text-slate-900">Agenda</h1>
        <button className="text-blue-600 font-medium text-sm">Today</button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">October 2024</h2>
        <div className="flex justify-between text-center px-2">
          {days.map((d, i) => (
             <div key={i} className="flex flex-col gap-3 items-center">
                 <span className="text-xs text-slate-400 font-medium">{d}</span>
                 <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${i === todayIndex ? 'bg-blue-800 text-white shadow-md' : 'text-slate-600'}`}>
                    {dates[i]}
                 </div>
                 {i === 6 && <div className="w-1 h-1 bg-teal-500 rounded-full mt-1"></div>}
                 {i === todayIndex && <div className="w-1 h-1 bg-orange-500 rounded-full mt-1"></div>}
             </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
            <h3 className="font-bold text-slate-800 mb-3">Tuesday, October 26</h3>
            <div className="space-y-3">
                 <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4">
                    <div className="text-center min-w-[50px] border-r border-slate-100 pr-4 flex flex-col justify-center">
                        <div className="font-bold text-slate-900">10:00</div>
                        <div className="text-xs text-slate-400">AM</div>
                    </div>
                    <div>
                        <div className="font-bold text-slate-800 mb-1">AG Ordinaire</div>
                        <div className="text-xs text-slate-500 mb-2">Conference Room 1</div>
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-md">Gouvernance</span>
                    </div>
                 </div>

                 <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4">
                    <div className="text-center min-w-[50px] border-r border-slate-100 pr-4 flex flex-col justify-center">
                        <div className="font-bold text-slate-900">14:00</div>
                        <div className="text-xs text-slate-400">PM</div>
                    </div>
                    <div className="border-l-4 border-teal-500 pl-3 -ml-4"> {/* Special indicator style */}
                        <div className="font-bold text-slate-800 mb-1">Weekly Pulse - Project Phoenix</div>
                        <a href="#" className="text-xs text-blue-600 font-medium mb-2 block">Join Meeting</a>
                        <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-1 rounded-md">Projet</span>
                    </div>
                 </div>
            </div>
        </div>

        <div>
            <h3 className="font-bold text-slate-800 mb-3">Wednesday, October 27</h3>
            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                <Icons.Calendar className="text-slate-300 mb-3" size={48} />
                <div className="font-bold text-slate-700">No events scheduled</div>
                <div className="text-xs text-slate-400">Enjoy your day!</div>
            </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-orange-500 rounded-full shadow-lg shadow-orange-200 text-white flex items-center justify-center hover:scale-105 transition-transform">
        <Icons.Plus size={28} />
      </button>
    </div>
  );
};
