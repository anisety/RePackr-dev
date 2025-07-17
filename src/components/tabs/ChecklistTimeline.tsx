
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
  // Start with empty tasks, user adds them interactively
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    timeframe: '',
    text: '',
    priority: 'low',
    notes: '',
  });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('');

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    if (!newTask.text || !newTask.title || !newTask.timeframe) return;
    setTasks([
      ...tasks,
      {
        id: `task-${tasks.length + 1}`,
        title: newTask.title,
        timeframe: newTask.timeframe,
        text: newTask.text,
        priority: newTask.priority,
        notes: newTask.notes,
        completed: false
      }
    ]);
    setNewTask({ title: '', timeframe: '', text: '', priority: 'low', notes: '' });
    setIsAddingTask(false);
  };

  const getTotalTasks = () => tasks.length;
  const getCompletedTasks = () => tasks.filter(task => task.completed).length;

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
            <Label htmlFor="taskTitle">Task Title</Label>
            <Input
              id="taskTitle"
              placeholder="e.g., Schedule carpet cleaning"
              className="mt-1"
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="taskTimeframe">Timeframe</Label>
            <Input
              id="taskTimeframe"
              placeholder="e.g., 2 weeks before move"
              className="mt-1"
              value={newTask.timeframe}
              onChange={e => setNewTask({ ...newTask, timeframe: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="taskText">Task Description</Label>
            <Textarea
              id="taskText"
              placeholder="Describe the task..."
              className="mt-1"
              rows={2}
              value={newTask.text}
              onChange={e => setNewTask({ ...newTask, text: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="taskPriority">Priority</Label>
            <select
              id="taskPriority"
              className="mt-1 border rounded px-2 py-1"
              value={newTask.priority}
              onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <Label htmlFor="taskNotes">Notes (optional)</Label>
            <Textarea
              id="taskNotes"
              placeholder="Any additional details..."
              className="mt-1"
              rows={2}
              value={newTask.notes}
              onChange={e => setNewTask({ ...newTask, notes: e.target.value })}
            />
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleAddTask} className="flex-1">
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

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarDays className="w-5 h-5 text-blue-600" />
                <span>{task.title}</span>
                <Badge variant="outline">{task.timeframe}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg border-l-4 transition-all duration-200 ${
                task.completed
                  ? 'bg-green-50 border-l-green-500 opacity-75'
                  : getPriorityColor(task.priority)
              }`}>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={task.id}
                      className={`cursor-pointer ${
                        task.completed
                          ? 'line-through text-gray-600'
                          : 'text-gray-900 font-medium'
                      }`}
                    >
                      {task.text}
                    </label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant="secondary"
                        className={
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }
                      >
                        {task.priority} priority
                      </Badge>
                      {task.completed && (
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Done
                        </Badge>
                      )}
                    </div>
                    {task.notes && (
                      <div className="mt-2 text-sm text-blue-800 bg-blue-50 rounded p-2">
                        <strong>Note:</strong> {task.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {tasks.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              No tasks yet. Add your first task!
            </CardContent>
          </Card>
        )}
      </div>

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
              {tasks.filter(task => !task.completed && task.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChecklistTimeline;
