
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Home, Package, ClipboardList, Settings } from 'lucide-react';
import Dashboard from '../tabs/Dashboard';
import MoveDetails from '../tabs/MoveDetails';
import BoxesInventory from '../tabs/BoxesInventory';
import ChecklistTimeline from '../tabs/ChecklistTimeline';
import SettingsIntegrations from '../tabs/SettingsIntegrations';

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home,
      component: Dashboard 
    },
    { 
      id: 'move-details', 
      label: 'Move Details', 
      icon: Package,
      component: MoveDetails 
    },
    { 
      id: 'boxes-inventory', 
      label: 'Boxes & Inventory', 
      icon: Package,
      component: BoxesInventory 
    },
    { 
      id: 'checklist-timeline', 
      label: 'Checklist & Timeline', 
      icon: ClipboardList,
      component: ChecklistTimeline 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      component: SettingsIntegrations 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">RePackr</h1>
            </div>
            <div className="hidden sm:block text-sm text-gray-600">
              Moving to: <span className="font-medium text-gray-900">Aurora, IL</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8 bg-white/60 backdrop-blur-sm border border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
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

          {tabs.map((tab) => {
            const Component = tab.component;
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
