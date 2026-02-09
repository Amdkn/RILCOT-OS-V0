import React, { useState } from 'react';
import { Icons } from './components/Icons';
import { Dashboard } from './screens/Dashboard';
import { Projects } from './screens/Projects';
import { Governance } from './screens/Governance';
import { Directory } from './screens/Directory';
import { Membership } from './screens/Membership';
import { Finance } from './screens/Finance';
import { University } from './screens/University';
import { Calendar } from './screens/Calendar';
import { Settings } from './screens/Settings';
// import { Roadmap } from './screens/Roadmap';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type Screen = 'dashboard' | 'projects' | 'governance' | 'directory' | 'membership' | 'finance' | 'university' | 'calendar' | 'settings' | 'roadmap' | 'login' | 'register';

const PrivateRoute = ({ children, onNavigate }: { children: React.ReactNode, onNavigate: (screen: string) => void }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return <Login onNavigate={onNavigate} />;
  }

  return <>{children}</>;
};

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const { session } = useAuth();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login': return <Login onNavigate={(s) => setCurrentScreen(s as Screen)} />;
      case 'register': return <Register onNavigate={(s) => setCurrentScreen(s as Screen)} />;

      // Private Routes
      case 'dashboard': return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><Dashboard onNavigate={(s) => setCurrentScreen(s as Screen)} userName={session?.user?.user_metadata?.full_name || 'Membre'} /></PrivateRoute>;
      case 'projects': return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><Projects /></PrivateRoute>;
      case 'governance': return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><Governance /></PrivateRoute>;
      case 'directory': return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><Directory /></PrivateRoute>;
      case 'membership': return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><Membership /></PrivateRoute>;
      case 'finance': return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><Finance /></PrivateRoute>;
      case 'university': return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><University /></PrivateRoute>;
      case 'calendar': return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><Calendar /></PrivateRoute>;
      case 'settings': return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><Settings onNavigate={(s) => setCurrentScreen(s as Screen)} /></PrivateRoute>;
      // case 'roadmap': return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><Roadmap /></PrivateRoute>;
      default: return <PrivateRoute onNavigate={(s) => setCurrentScreen(s as Screen)}><Dashboard onNavigate={(s) => setCurrentScreen(s as Screen)} userName={session?.user?.user_metadata?.full_name || 'Membre'} /></PrivateRoute>;
    }
  };

  const NavItem = ({ icon: Icon, label, screen }: { icon: any, label: string, screen: Screen }) => {
    if (!Icon) return null; // Safety check
    const isActive = currentScreen === screen || (screen === 'dashboard' && !['directory', 'calendar', 'settings', 'roadmap'].includes(currentScreen));
    return (
      <button
        onClick={() => setCurrentScreen(screen)}
        className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`}
      >
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="mb-1" />
        <span className="text-[10px] font-medium">{label}</span>
      </button>
    );
  };

  // Hide chrome (header/footer) on auth screens
  const isAuthScreen = currentScreen === 'login' || currentScreen === 'register' || !session;

  return (
    <div className="min-h-screen bg-slate-50 max-w-md mx-auto shadow-2xl relative overflow-hidden">

      {/* Back button logic (only for internal navigation, not from dashboard) */}
      {!isAuthScreen && currentScreen !== 'dashboard' && !['directory', 'calendar', 'settings'].includes(currentScreen) && (
        <button
          onClick={() => setCurrentScreen('settings')}
          className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Icons.Home size={20} />
        </button>
      )}

      {/* Main Content Area */}
      <main className="h-screen overflow-y-auto no-scrollbar">
        {session ? renderScreen() : (currentScreen === 'register' ? <Register onNavigate={(s) => setCurrentScreen(s as Screen)} /> : <Login onNavigate={(s) => setCurrentScreen(s as Screen)} />)}
      </main>

      {/* Bottom Navigation (Hidden on Auth Screens) */}
      {!isAuthScreen && (
        <nav className="absolute bottom-0 w-full bg-white border-t border-slate-200 px-2 pb-safe pt-2 flex justify-between items-center z-50">
          <NavItem icon={Icons.Home} label="Accueil" screen="dashboard" />
          <NavItem icon={Icons.Calendar} label="Agenda" screen="calendar" />
          <NavItem icon={Icons.Users} label="Annuaire" screen="directory" />
          <NavItem icon={Icons.Settings} label="Réglages" screen="settings" />
        </nav>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}