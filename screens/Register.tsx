import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Icons } from '../components/Icons';

export const Register: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 1. Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        if (authData.user) {
            // 2. Create profile entry (if separate table exists, otherwise metadata is enough for MVP)
            // For Phase 1/2 transition, we rely on auth metadata or handle profile creation later.
            // Assuming 'profiles' table triggers exist or we insert manually here.

            // Navigate to dashboard or email confirmation page
            onNavigate('dashboard');
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <button
                        onClick={() => onNavigate('login')}
                        className="absolute top-6 left-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                        <Icons.ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-bold text-slate-900">Créer un compte</h1>
                    <p className="text-slate-500 mt-2">Rejoignez l'écosystème RILCOT</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-start gap-2">
                        <Icons.AlertCircle size={16} className="mt-0.5 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                                placeholder="Jean Dupont"
                                required
                            />
                            <Icons.User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                                placeholder="votre@email.com"
                                required
                            />
                            <Icons.Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                            <Icons.Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">6 caractères minimum</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                S'inscrire
                                <Icons.Sparkles size={18} />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-xs text-slate-400 text-center mt-6">
                    En vous inscrivant, vous acceptez nos <a href="#" className="underline hover:text-slate-600">Conditions Générales</a> et notre <a href="#" className="underline hover:text-slate-600">Politique de Confidentialité</a>.
                </p>
            </div>
        </div>
    );
};
