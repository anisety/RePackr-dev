import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Package, AlertTriangle, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const moveProgress = 0;
  const daysUntilMove = 0;

  const quickStats = [
    { label: 'Boxes Packed', value: '', total: '', icon: Package, color: 'blue' },
    { label: 'Tasks Complete', value: '', total: '', icon: CheckCircle, color: 'green' },
    { label: 'Pending Items', value: '', total: null, icon: AlertTriangle, color: 'orange' },
    { label: 'Days Remaining', value: '', total: null, icon: Calendar, color: 'purple' }
  ];

  const recentActivity = [];

  const upcomingTasks = [];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
              <p className="text-blue-100 mb-4">
                Please enter your move details to get started.
              </p>
              <Progress value={moveProgress} className="w-full max-w-md bg-blue-500/30" />
            </div>
            <TrendingUp className="w-16 h-16 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600 border-blue-200',
            green: 'bg-green-100 text-green-600 border-green-200',
            orange: 'bg-orange-100 text-orange-600 border-orange-200',
            purple: 'bg-purple-100 text-purple-600 border-purple-200'
          };

          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}{stat.total && `/${stat.total}`}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
                {stat.total && (
                  <Progress value={(parseInt(stat.value) / parseInt(stat.total)) * 100} className="h-2" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>Upcoming Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => {
                const priorityColors = {
                  high: 'bg-red-100 text-red-800',
                  medium: 'bg-yellow-100 text-yellow-800',
                  low: 'bg-green-100 text-green-800'
                };

                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{task.task}</p>
                      <p className="text-sm text-gray-600">Due: {task.due}</p>
                    </div>
                    <Badge variant="secondary" className={priorityColors[task.priority]}>
                      {task.priority}
                    </Badge>
                  </div>
                );
              })}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
