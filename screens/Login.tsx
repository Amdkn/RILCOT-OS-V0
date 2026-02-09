import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Icons } from '../components/Icons';

export const Login: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            // Auth state change will be picked up by AuthContext
            // Navigation handled by PrivateRoute or redundant here
            onNavigate('dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                        <Icons.Layers className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">RILCOT OS</h1>
                    <p className="text-slate-500 mt-2">Connectez-vous à votre espace membre</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-start gap-2">
                        <Icons.AlertCircle size={16} className="mt-0.5 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
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
                            />
                            <Icons.Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        </div>
                        <button type="button" className="text-xs text-blue-600 font-medium mt-2 hover:underline">
                            Mot de passe oublié ?
                        </button>
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
                                Se connecter
                                <Icons.ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-600">
                        Pas encore de compte ?{' '}
                        <button onClick={() => onNavigate('register')} className="text-blue-600 font-bold hover:underline">
                            Créer un compte
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
