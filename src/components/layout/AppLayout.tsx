
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Home, Package, ClipboardList, Settings } from 'lucide-react';
import Dashboard from '../tabs/Dashboard';
import MoveDetails from '../tabs/MoveDetails';
import BoxesInventory from '../tabs/BoxesInventory';
import ChecklistTimeline from '../tabs/ChecklistTimeline';
import SettingsIntegrations from '../tabs/SettingsIntegrations';
import { appConfig as defaultConfig } from '@/config/appConfig';
import WelcomeOnboarding from './WelcomeOnboarding';
import Navbar from './Navbar';


const iconMap: Record<string, React.ElementType> = {
  Home,
  Package,
  ClipboardList,
  Settings,
};

const componentMap: Record<string, React.ElementType> = {
  Dashboard,
  MoveDetails,
  BoxesInventory,
  ChecklistTimeline,
  SettingsIntegrations,
};

const AppLayout = () => {
  const [moveInfo, setMoveInfo] = useState<{ name: string; origin: string; destination: string } | null>(null);
  const [activeTab, setActiveTab] = useState(defaultConfig.tabs[0]?.id || 'dashboard');
  const [user, setUser] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState<'login' | 'signup' | null>(null);

  if (!moveInfo) {
    return <WelcomeOnboarding onComplete={setMoveInfo} />;
  }

  // Fill config with user info
  const appConfig = {
    ...defaultConfig,
    appName: moveInfo.name ? `${moveInfo.name}'s Move` : defaultConfig.appName,
    destination: moveInfo.destination,
    origin: moveInfo.origin,
  };

  // Simple login/signup modal
  const handleAuth = (type: 'login' | 'signup') => {
    setShowAuth(type);
  };
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = (e.target as HTMLFormElement);
    const username = (form.elements.namedItem('username') as HTMLInputElement)?.value;
    if (username) {
      setUser(username);
      setShowAuth(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar
        onLogin={() => handleAuth('login')}
        onSignup={() => handleAuth('signup')}
        user={user || undefined}
      />

      {showAuth && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm" onSubmit={handleAuthSubmit}>
            <h2 className="text-xl font-bold mb-4 text-center">{showAuth === 'login' ? 'Log In' : 'Sign Up'}</h2>
            <input name="username" placeholder="Enter your name" className="w-full border rounded px-3 py-2 mb-4" required />
            {showAuth === 'signup' && (
              <>
                <input name="email" type="email" placeholder="Email" className="w-full border rounded px-3 py-2 mb-4" required />
                <input name="phone" type="tel" placeholder="Phone Number" className="w-full border rounded px-3 py-2 mb-4" />
                <input name="timezone" placeholder="Timezone" className="w-full border rounded px-3 py-2 mb-4" />
              </>
            )}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Continue</button>
            <button type="button" className="w-full mt-2 text-gray-500" onClick={() => setShowAuth(null)}>Cancel</button>
          </form>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{appConfig.appName}</h1>
              <div className="text-gray-600 text-sm">Moving from <span className="font-medium text-gray-900">{appConfig.origin}</span> to <span className="font-medium text-gray-900">{appConfig.destination}</span></div>
            </div>
            {user && <div className="text-gray-700 text-sm">Logged in as <span className="font-semibold">{user}</span></div>}
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8 bg-white/60 backdrop-blur-sm border border-gray-200">
            {appConfig.tabs.map((tab) => {
              const Icon = iconMap[tab.icon] || Package;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {appConfig.tabs.map((tab) => {
            let Component = componentMap[tab.component] || Dashboard;
            // Pass user info to Settings tab
            if (tab.id === 'settings') {
              Component = (props: any) => <SettingsIntegrations user={user} moveInfo={moveInfo} {...props} />;
            }
            return (
              <TabsContent
                key={tab.id}
                value={tab.id}
                className="mt-0 animate-in fade-in-50 duration-200"
              >
                <Component />
              </TabsContent>
            );
          })}
        </Tabs>
      </main>
    </div>
  );
};

export default AppLayout;
