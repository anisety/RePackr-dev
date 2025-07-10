
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarDays, CheckCircle, Clock, Plus, Calendar, AlertTriangle } from 'lucide-react';

const ChecklistTimeline = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: '8 Weeks Before',
      timeframe: '8+ weeks',
      items: [
        { id: 'task-1', text: 'Research and book moving company', completed: true, priority: 'high' },
        { id: 'task-2', text: 'Create moving binder/folder', completed: true, priority: 'medium' },
        { id: 'task-3', text: 'Start decluttering', completed: false, priority: 'medium' }
      ]
    },
    {
      id: 2,
      title: '6 Weeks Before',
      timeframe: '6 weeks',
      items: [
        { id: 'task-4', text: 'Order moving supplies', completed: true, priority: 'high' },
        { id: 'task-5', text: 'Start using up frozen/perishable food', completed: false, priority: 'low' },
        { id: 'task-6', text: 'Research new area amenities', completed: false, priority: 'low' }
      ]
    },
    {
      id: 3,
      title: '4 Weeks Before',
      timeframe: '4 weeks',
      items: [
        { id: 'task-7', text: 'Notify landlord (if renting)', completed: true, priority: 'high' },
        { id: 'task-8', text: 'Start packing non-essentials', completed: false, priority: 'medium' },
        { id: 'task-9', text: 'Schedule utility transfers', completed: false, priority: 'high' }
      ]
    },
    {
      id: 4,
      title: '2 Weeks Before',
      timeframe: '2 weeks',
      items: [
        { id: 'task-10', text: 'Submit address change forms', completed: false, priority: 'high' },
        { id: 'task-11', text: 'Arrange pet transportation', completed: false, priority: 'medium' },
        { id: 'task-12', text: 'Pack essentials box', completed: false, priority: 'high' }
      ]
    },
    {
      id: 5,
      title: 'Moving Week',
      timeframe: '1 week',
      items: [
        { id: 'task-13', text: 'Confirm moving company details', completed: false, priority: 'high' },
        { id: 'task-14', text: 'Pack suitcase for first few days', completed: false, priority: 'high' },
        { id: 'task-15', text: 'Clean out refrigerator', completed: false, priority: 'medium' }
      ]
    }
  ]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('');

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(section => ({
      ...section,
      items: section.items.map(item =>
        item.id === taskId ? { ...item, completed: !item.completed } : item
      )
    })));
  };

  const getTotalTasks = () => {
    return tasks.reduce((total, section) => total + section.items.length, 0);
  };

  const getCompletedTasks = () => {
    return tasks.reduce((total, section) => 
      total + section.items.filter(item => item.completed).length, 0
    );
  };

  const getProgressForSection = (section) => {
    const completed = section.items.filter(item => item.completed).length;
    return (completed / section.items.length) * 100;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const completedTasks = getCompletedTasks();
  const totalTasks = getTotalTasks();
  const overallProgress = (completedTasks / totalTasks) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Checklist & Timeline</h2>
          <p className="text-gray-600 mt-1">Stay organized with your moving timeline</p>
        </div>
        
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Custom Task</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Custom Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="taskTitle">Task Description</Label>
                <Input id="taskTitle" placeholder="e.g., Schedule carpet cleaning" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="taskNotes">Notes (optional)</Label>
                <Textarea 
                  id="taskNotes" 
                  placeholder="Any additional details..."
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div className="flex space-x-4">
                <Button onClick={() => setIsAddingTask(false)} className="flex-1">
                  Add Task
                </Button>
                <Button variant="outline" onClick={() => setIsAddingTask(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
              <p className="text-gray-600">{completedTasks} of {totalTasks} tasks completed</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{Math.round(overallProgress)}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Timeline Sections */}
      <Accordion type="multiple" defaultValue={['item-0', 'item-1']} className="space-y-4">
        {tasks.map((section, index) => (
          <AccordionItem key={section.id} value={`item-${index}`} className="border-0">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <CalendarDays className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    <Badge variant="outline">{section.timeframe}</Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {section.items.filter(item => item.completed).length}/{section.items.length}
                      </div>
                      <div className="text-xs text-gray-600">tasks</div>
                    </div>
                    <div className="w-16">
                      <Progress value={getProgressForSection(section)} className="h-2" />
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border-l-4 transition-all duration-200 ${
                        item.completed 
                          ? 'bg-green-50 border-l-green-500 opacity-75' 
                          : getPriorityColor(item.priority)
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={item.id}
                          checked={item.completed}
                          onCheckedChange={() => toggleTask(item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={item.id}
                            className={`cursor-pointer ${
                              item.completed 
                                ? 'line-through text-gray-600' 
                                : 'text-gray-900 font-medium'
                            }`}
                          >
                            {item.text}
                          </label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="secondary" 
                              className={
                                item.priority === 'high' ? 'bg-red-100 text-red-800' :
                                item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }
                            >
                              {item.priority} priority
                            </Badge>
                            {item.completed && (
                              <Badge className="bg-green-600 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Done
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{completedTasks}</div>
            <div className="text-sm text-gray-600">Tasks Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalTasks - completedTasks}</div>
            <div className="text-sm text-gray-600">Tasks Remaining</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {tasks.reduce((count, section) => 
                count + section.items.filter(item => !item.completed && item.priority === 'high').length, 0
              )}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChecklistTimeline;
