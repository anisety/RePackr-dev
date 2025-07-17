
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, User, Bell, Mail, Smartphone, Calendar, ExternalLink, Shield, Settings as SettingsIcon, AlertTriangle, CreditCard } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SettingsProps {
  user?: string | null;
  moveInfo?: { name: string; origin: string; destination: string } | null;
}

const SettingsIntegrations: React.FC<SettingsProps> = ({ user, moveInfo }) => {
  // Profile settings are now handled in login/signup modal
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    reminders: true
  });
  const integrations = [
    {
      name: 'Google Calendar',
      description: 'Sync moving tasks and deadlines',
      connected: true,
      icon: Calendar,
    },
    {
      name: 'Gmail',
      description: 'Import confirmations and receipts',
      connected: true,
      icon: Mail,
    },
    {
      name: 'Google Maps',
      description: 'Route planning and location services',
      connected: false,
      icon: ExternalLink,
    },
    {
      name: 'Banking/Payment',
      description: 'Track moving expenses',
      connected: false,
      icon: CreditCard,
    }
  ];
  const toggleNotification = (type: string) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };
  return (
    <div className="space-y-8">
      {/* Header, Account Info, Move Info, and all cards below */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings & Integrations</h2>
        <p className="text-gray-600 mt-1">Customize your experience and connect your accounts</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Account Info</h3>
        {user ? (
          <div className="bg-white rounded shadow p-4 mb-4">
            <div className="mb-2"><span className="font-medium">Username:</span> {user}</div>
          </div>
        ) : (
          <div className="text-gray-500">Not logged in.</div>
        )}
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Move Info</h3>
        {moveInfo ? (
          <div className="bg-white rounded shadow p-4">
            <div className="mb-2"><span className="font-medium">Name:</span> {moveInfo.name}</div>
            <div className="mb-2"><span className="font-medium">Moving From:</span> {moveInfo.origin}</div>
            <div className="mb-2"><span className="font-medium">Moving To:</span> {moveInfo.destination}</div>
          </div>
        ) : (
          <div className="text-gray-500">No move info available.</div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-green-600" />
              <span>Notification Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={() => toggleNotification('email')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-4 h-4 text-gray-600" />
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-gray-600">Get text message updates</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={() => toggleNotification('sms')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Browser notifications</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={() => toggleNotification('push')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <Label>Task Reminders</Label>
                    <p className="text-sm text-gray-600">Deadline notifications</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.reminders}
                  onCheckedChange={() => toggleNotification('reminders')}
                />
              </div>
            </div>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                We recommend keeping email notifications enabled to stay updated on important moving deadlines.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
      {/* Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5 text-purple-600" />
            <span>Connected Services</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              return (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {integration.connected ? (
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            Disconnect
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" className="flex items-center space-x-1">
                          <span>Connect</span>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < integrations.length - 1 && <Separator className="my-4" />}
                </React.Fragment>
              );
            })}
          </div>
        </CardContent>
      </Card>
      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-orange-600" />
            <span>Privacy & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Change Password</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Two-Factor Auth</span>
            </Button>
          </div>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your data is encrypted and secure. We never share your personal information with third parties without your consent.
            </AlertDescription>
          </Alert>
          <div className="pt-4 border-t">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <h4 className="font-medium text-gray-900">Export Your Data</h4>
                <p className="text-sm text-gray-600">Download all your moving data</p>
              </div>
              <Button variant="outline">Download Data</Button>
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <h4 className="font-medium text-red-900">Delete Account</h4>
                <p className="text-sm text-gray-600">Permanently remove your account and data</p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsIntegrations;
