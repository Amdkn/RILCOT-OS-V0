import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Icons } from '../components/Icons';

const DATA = [
  { name: 'Executed', value: 75, color: '#1d4ed8' }, // blue-700
  { name: 'Remaining', value: 25, color: '#e2e8f0' }, // slate-200
];

export const Finance: React.FC = () => {
  return (
    <div className="p-4 pb-24">
       <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-slate-900">Finance Overview</h1>
        <Icons.Bell className="text-slate-400" />
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 flex flex-col items-center relative">
        <h2 className="text-slate-900 font-bold mb-4 self-start">Annual Budget Summary</h2>
        <div className="w-48 h-48 relative">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-3xl font-bold text-slate-800">75%</span>
             <span className="text-xs text-slate-400 uppercase">Executed</span>
          </div>
        </div>

        <div className="w-full space-y-3 mt-6">
           <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
             <div className="text-xs text-slate-500 mb-1">Allocated Budget</div>
             <div className="text-xl font-bold text-slate-900">€100,000</div>
           </div>
           <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
             <div className="text-xs text-slate-500 mb-1">Total Expenses</div>
             <div className="text-xl font-bold text-slate-900">€75,000</div>
           </div>
           <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
             <div className="text-xs text-slate-500 mb-1">Remaining Balance</div>
             <div className="text-xl font-bold text-slate-900">€25,000</div>
           </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <div className="flex justify-between items-end mb-2">
            <div>
                 <h3 className="font-bold text-slate-900">Donations & Grants</h3>
                 <p className="text-xs text-slate-500 mt-1">Total Received</p>
                 <div className="text-2xl font-bold text-green-600 mt-1">€15,250</div>
            </div>
            <button className="bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-lg">
                View Details
            </button>
        </div>
      </div>

      <h3 className="font-bold text-lg text-slate-900 mb-3">Recent Financial Reports</h3>
      <div className="space-y-3">
        {[
            { title: "Rapport Mensuel - Mai 2024", date: "May 31, 2024", size: "1.2MB" },
            { title: "Q1 2024 Financial Summary", date: "April 15, 2024", size: "3.5MB" },
            { title: "Annual Report 2023", date: "February 28, 2024", size: "10.8MB" },
        ].map((file, i) => (
             <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <Icons.FileText size={20} />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-slate-800 text-sm">{file.title}</div>
                    <div className="text-xs text-slate-400">{file.date} - {file.size}</div>
                </div>
                <Icons.Download className="text-slate-400" size={20} />
             </div>
        ))}
      </div>
    </div>
  );
};