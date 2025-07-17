import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Package, AlertTriangle, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // Interactive dashboard state
  const [moveProgress, setMoveProgress] = React.useState(0);
  const [daysUntilMove, setDaysUntilMove] = React.useState('');
  const [stats, setStats] = React.useState([
    { label: 'Boxes Packed', value: '', icon: Package },
    { label: 'Tasks Complete', value: '', icon: CheckCircle },
    { label: 'Pending Items', value: '', icon: AlertTriangle },
    { label: 'Days Remaining', value: '', icon: Calendar }
  ]);
  const [activity, setActivity] = React.useState([]);
  const [newActivity, setNewActivity] = React.useState('');

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
            </div>
          </div>
        </CardContent>
      </Card>
// ...existing code...

        {/* Quick Stats - editable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-gray-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={e => {
                        const newStats = [...stats];
                        newStats[index].value = e.target.value;
                        setStats(newStats);
                      }}
                      className="border rounded px-2 py-1 text-black"
                      placeholder={stat.label}
                    />
                  </div>
                  <div className="text-right text-xs text-gray-500">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity - user driven */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <input
                type="text"
                value={newActivity}
                onChange={e => setNewActivity(e.target.value)}
                className="border rounded px-2 py-1 w-full mb-2"
                placeholder="Add new activity..."
              />
              <Button onClick={() => {
                if (newActivity) {
                  setActivity([...activity, newActivity]);
                  setNewActivity('');
                }
              }}>Add Activity</Button>
              <ul className="mt-4 space-y-1">
                {activity.map((act, i) => (
                  <li key={i} className="text-gray-700">{act}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}

export default Dashboard;
