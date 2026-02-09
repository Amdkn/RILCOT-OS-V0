import React, { useState, useEffect } from 'react';
import { Icons } from '../components/Icons';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface SettingsProps {
  onNavigate: (screen: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const { user, signOut } = useAuth();
  const [imgUrl, setImgUrl] = useState('https://picsum.photos/seed/user1/100/100');
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setImgUrl(user.user_metadata?.avatar_url || 'https://picsum.photos/seed/user1/100/100');
      setFullName(user.user_metadata?.full_name || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        avatar_url: imgUrl,
        full_name: fullName,
      }
    });

    if (error) {
      console.error('Error updating profile:', error);
      // Ideally show a toast here
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    // onNavigate('login'); // handled by PrivateRoute in App.tsx potentially, or we force it here
    // The App component might not automatically redirect if currentScreen is 'settings' which became private.
    // But since session becomes null, PrivateRoute will render Login.
  };

  return (
    <div className="p-4 pb-24">
      <h1 className="text-xl font-bold text-slate-900 mb-6">Réglages</h1>

      {/* Profile Section */}
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
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-500 mb-1 block">Nom complet</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-500 mb-1 block">Email</label>
          <input
            type="text"
            value={user?.email || ''}
            disabled
            className="w-full text-sm p-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
          />
        </div>

        <button
          onClick={handleUpdateProfile}
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-70"
        >
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
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

        <button onClick={handleLogout} className="w-full p-4 flex items-center justify-between hover:bg-red-50 text-left transition-colors group">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 text-red-600 p-2 rounded-lg group-hover:bg-red-200 transition-colors"><Icons.LogOut size={20} /></div>
            <span className="font-medium text-red-600">Se déconnecter</span>
          </div>
        </button>
      </section>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-400">RILCOT OS v0.2.0 (Phase 2)</p>
      </div>
    </div>
  );
};
