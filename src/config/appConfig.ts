// This file contains dynamic config for the app layout
export const appConfig = {
  appName: 'RePackr',
  destination: 'Aurora, IL', // This can be changed or fetched from API
  tabs: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'Home',
      component: 'Dashboard',
    },
    {
      id: 'move-details',
      label: 'Move Details',
      icon: 'Package',
      component: 'MoveDetails',
    },
    {
      id: 'boxes-inventory',
      label: 'Boxes & Inventory',
      icon: 'Package',
      component: 'BoxesInventory',
    },
    {
      id: 'checklist-timeline',
      label: 'Checklist & Timeline',
      icon: 'ClipboardList',
      component: 'ChecklistTimeline',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      component: 'SettingsIntegrations',
    },
  ],
};
