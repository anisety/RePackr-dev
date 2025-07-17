import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Package, AlertTriangle, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [moveProgress, setMoveProgress] = useState(0);
  const [daysUntilMove, setDaysUntilMove] = useState('');
  const [stats, setStats] = useState([
    { label: 'Boxes Packed', value: '', icon: Package },
    { label: 'Tasks Complete', value: '', icon: CheckCircle },
    { label: 'Pending Items', value: '', icon: AlertTriangle },
    { label: 'Days Remaining', value: '', icon: Calendar }
  ]);
  const [activity, setActivity] = useState([]);
  const [newActivity, setNewActivity] = useState('');

  // Animation helpers
  const [showWelcome, setShowWelcome] = useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Animated Welcome Section */}
      {showWelcome ? (
        <div className="flex items-center justify-center h-40 animate-fade-in">
          <div className="text-center">
            <TrendingUp className="mx-auto mb-4 animate-bounce text-blue-500" style={{ fontSize: 48 }} />
            <h2 className="text-3xl font-extrabold text-blue-700 animate-pulse">Welcome to MoveFlow!</h2>
            <p className="text-blue-400 mt-2 animate-fade-in">Your moving dashboard is loading...</p>
          </div>
        </div>
      ) : (
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-lg animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 animate-slide-in">Welcome!</h2>
                <p className="text-blue-100 mb-4 animate-fade-in">
                  Enter your move progress and days until move:
                </p>
                <div className="flex gap-4 mb-2">
                  <input type="number" min={0} max={100} value={moveProgress} onChange={e => setMoveProgress(Number(e.target.value))} className="border rounded px-2 py-1 text-black" placeholder="Progress %" />
                  <input type="text" value={daysUntilMove} onChange={e => setDaysUntilMove(e.target.value)} className="border rounded px-2 py-1 text-black" placeholder="Days Until Move" />
                </div>
                <div className="relative w-full max-w-md">
                  <Progress value={moveProgress} className="w-full bg-blue-500/30 animate-progress" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-bold animate-fade-in">{moveProgress}%</span>
                </div>
              </div>
              <TrendingUp className="w-16 h-16 text-blue-200 animate-bounce" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats - editable, animated */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gray-100 animate-pop">
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
                    className="border rounded px-2 py-1 text-black animate-fade-in"
                    placeholder={stat.label}
                  />
                </div>
                <div className="text-right text-xs text-gray-500 animate-fade-in">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity - user driven, animated */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <input
              type="text"
              value={newActivity}
              onChange={e => setNewActivity(e.target.value)}
              className="border rounded px-2 py-1 w-full mb-2 animate-fade-in"
              placeholder="Add new activity..."
            />
            <Button onClick={() => {
              if (newActivity) {
                setActivity([...activity, newActivity]);
                setNewActivity('');
              }
            }} className="animate-pop">Add Activity</Button>
            <ul className="mt-4 space-y-1">
              {activity.map((act, i) => (
                <li key={i} className="text-gray-700 animate-fade-in">{act}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
