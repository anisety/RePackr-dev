
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Package, Plus, Search, Filter, Star, AlertTriangle } from 'lucide-react';

const BoxesInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRoom, setFilterRoom] = useState('all');
  const [isAddingBox, setIsAddingBox] = useState(false);

  const [boxes, setBoxes] = useState([
    {
      id: 'BOX-001',
      label: 'Kitchen Essentials',
      room: 'Kitchen',
      contents: ['Plates', 'Cups', 'Utensils', 'Can opener'],
      priority: 'high',
      packed: true,
      weight: 'Medium',
      fragile: false,
      notes: 'First day essentials'
    },
    {
      id: 'BOX-002',
      label: 'Living Room Books',
      room: 'Living Room',
      contents: ['Fiction books', 'Magazines', 'Photo albums'],
      priority: 'low',
      packed: true,
      weight: 'Heavy',
      fragile: false,
      notes: ''
    },
    {
      id: 'BOX-003',
      label: 'Bedroom Linens',
      room: 'Bedroom',
      contents: ['Sheets', 'Pillowcases', 'Blankets', 'Towels'],
      priority: 'medium',
      packed: false,
      weight: 'Light',
      fragile: false,
      notes: 'Pack last - using until move day'
    },
    {
      id: 'BOX-004',
      label: 'Fragile Dinnerware',
      room: 'Kitchen',
      contents: ['China plates', 'Wine glasses', 'Crystal vase'],
      priority: 'high',
      packed: true,
      weight: 'Medium',
      fragile: true,
      notes: 'Handle with extreme care'
    }
  ]);

  const rooms = ['Kitchen', 'Living Room', 'Bedroom', 'Bathroom', 'Office', 'Garage'];
  const totalBoxes = boxes.length;
  const packedBoxes = boxes.filter(box => box.packed).length;
  const packingProgress = (packedBoxes / totalBoxes) * 100;

  const filteredBoxes = boxes.filter(box => {
    const matchesSearch = box.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         box.contents.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRoom = filterRoom === 'all' || box.room === filterRoom;
    return matchesSearch && matchesRoom;
  });

  const toggleBoxPacked = (boxId: string) => {
    setBoxes(boxes.map(box => 
      box.id === boxId ? { ...box, packed: !box.packed } : box
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Boxes & Inventory</h2>
          <p className="text-gray-600 mt-1">Track your packing progress and manage your belongings</p>
        </div>
        
        <Dialog open={isAddingBox} onOpenChange={setIsAddingBox}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add New Box</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Box</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="boxLabel">Box Label</Label>
                <Input id="boxLabel" placeholder="e.g., Kitchen Essentials" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="boxRoom">Room</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(room => (
                      <SelectItem key={room} value={room}>{room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="boxContents">Contents</Label>
                <Textarea 
                  id="boxContents" 
                  placeholder="List the items in this box..."
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="flex space-x-4">
                <Button onClick={() => setIsAddingBox(false)} className="flex-1">
                  Add Box
                </Button>
                <Button variant="outline" onClick={() => setIsAddingBox(false)} className="flex-1">
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
              <h3 className="text-lg font-semibold text-gray-900">Packing Progress</h3>
              <p className="text-gray-600">{packedBoxes} of {totalBoxes} boxes packed</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{Math.round(packingProgress)}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
          <Progress value={packingProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search boxes or contents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="sm:w-48">
              <Select value={filterRoom} onValueChange={setFilterRoom}>
                <SelectTrigger>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  {rooms.map(room => (
                    <SelectItem key={room} value={room}>{room}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBoxes.map((box) => (
          <Card key={box.id} className={`hover:shadow-lg transition-shadow duration-200 ${box.packed ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Package className={`w-5 h-5 ${box.packed ? 'text-green-600' : 'text-gray-400'}`} />
                  <div>
                    <CardTitle className="text-lg">{box.label}</CardTitle>
                    <p className="text-sm text-gray-600">{box.id}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  {box.fragile && (
                    <div className="relative">
                      <AlertTriangle className="w-4 h-4 text-orange-500" aria-label="Fragile item" />
                    </div>
                  )}
                  {box.priority === 'high' && (
                    <div className="relative">
                      <Star className="w-4 h-4 text-yellow-500" aria-label="High priority" />
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{box.room}</Badge>
                <Badge className={getPriorityColor(box.priority)}>
                  {box.priority} priority
                </Badge>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contents:</h4>
                <div className="flex flex-wrap gap-1">
                  {box.contents.slice(0, 3).map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                  {box.contents.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{box.contents.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Weight: {box.weight}</span>
                {box.packed && (
                  <Badge className="bg-green-600 text-white">✓ Packed</Badge>
                )}
              </div>

              {box.notes && (
                <div className="p-2 bg-blue-50 rounded text-sm text-blue-800">
                  <strong>Note:</strong> {box.notes}
                </div>
              )}

              <Button
                onClick={() => toggleBoxPacked(box.id)}
                variant={box.packed ? "outline" : "default"}
                className="w-full"
              >
                {box.packed ? 'Mark as Unpacked' : 'Mark as Packed'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBoxes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No boxes found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first box'}
            </p>
            <Dialog open={isAddingBox} onOpenChange={setIsAddingBox}>
              <DialogTrigger asChild>
                <Button>Add Your First Box</Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BoxesInventory;
