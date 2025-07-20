import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Package, AlertTriangle, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // Simulate progress for animation
  const [progress, setProgress] = useState(0);
  const [activity, setActivity] = useState([]);

  // Animation helpers
  const [showWelcome, setShowWelcome] = useState(true);
  React.useEffect(() => {
    // No animation, progress stays at 0
    setShowWelcome(false);
    setProgress(0);
  }, []);

  return (
    <div className="flex flex-col gap-10 max-w-3xl mx-auto py-12 px-2">
      {/* Animated Welcome Section with only progress bar */}
      <div className="flex items-center justify-center h-56 animate-fade-in">
        <Card className="w-full max-w-xl bg-gradient-to-r from-blue-700 via-blue-500 to-green-400 text-white border-0 shadow-2xl animate-fade-in">
          <CardContent className="p-10 flex flex-col items-center gap-8">
            <TrendingUp className="w-20 h-20 text-blue-200 animate-bounce" />
            <div className="w-full max-w-md">
              <Progress value={progress} className="w-full bg-blue-500/30 animate-progress h-6 rounded-full" />
              <span className="block text-center text-white font-bold animate-fade-in text-xl mt-2 tracking-widest">{progress}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity - animated */}
      <Card className="animate-fade-in shadow-lg">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <div className="text-gray-400 text-center py-8 animate-fade-in">No recent activity yet.</div>
          ) : (
            <ul className="mt-2 space-y-3">
              {activity.map((act, i) => (
                <li key={i} className="text-gray-700 animate-fade-in bg-gradient-to-r from-blue-100 via-green-100 to-blue-50 rounded px-4 py-3 shadow-sm flex items-center gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                  <span className="font-medium">{act}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
