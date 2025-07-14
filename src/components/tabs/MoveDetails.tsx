
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, Truck, Edit3, Save, X } from 'lucide-react';

const MoveDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [moveData, setMoveData] = useState({
    moveDate: '',
    fromAddress: '',
    toAddress: '',
    movingCompany: '',
    truckSize: '',
    estimatedTime: '',
    specialInstructions: '',
    numberOfMovers: '',
    contactPerson: '',
    contactPhone: ''
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your state management system
    console.log('Saving move details:', moveData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const updateField = (field: string, value: string) => {
    setMoveData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Move Details</h2>
          <p className="text-gray-600 mt-1">Manage your moving logistics and timeline</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
              <Edit3 className="w-4 h-4" />
              <span>Edit Details</span>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Move Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Move Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="moveDate">Move Date</Label>
              {isEditing ? (
                <Input
                  id="moveDate"
                  type="date"
                  value={moveData.moveDate}
                  onChange={(e) => updateField('moveDate', e.target.value)}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-3 bg-gray-50 rounded-md flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="font-medium">{new Date(moveData.moveDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="estimatedTime">Estimated Duration</Label>
              {isEditing ? (
                <Input
                  id="estimatedTime"
                  value={moveData.estimatedTime}
                  onChange={(e) => updateField('estimatedTime', e.target.value)}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-3 bg-gray-50 rounded-md flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span>{moveData.estimatedTime}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              {isEditing ? (
                <Textarea
                  id="specialInstructions"
                  value={moveData.specialInstructions}
                  onChange={(e) => updateField('specialInstructions', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              ) : (
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-800">{moveData.specialInstructions}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Addresses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <span>Addresses</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="fromAddress">From Address</Label>
              {isEditing ? (
                <Textarea
                  id="fromAddress"
                  value={moveData.fromAddress}
                  onChange={(e) => updateField('fromAddress', e.target.value)}
                  className="mt-1"
                  rows={2}
                />
              ) : (
                <div className="mt-1 p-3 bg-red-50 rounded-md border-l-4 border-red-500">
                  <div className="flex items-start space-x-2">
                    <Badge variant="destructive" className="mt-1">FROM</Badge>
                    <p className="text-gray-800">{moveData.fromAddress}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="toAddress">To Address</Label>
              {isEditing ? (
                <Textarea
                  id="toAddress"
                  value={moveData.toAddress}
                  onChange={(e) => updateField('toAddress', e.target.value)}
                  className="mt-1"
                  rows={2}
                />
              ) : (
                <div className="mt-1 p-3 bg-green-50 rounded-md border-l-4 border-green-500">
                  <div className="flex items-start space-x-2">
                    <Badge className="mt-1 bg-green-600">TO</Badge>
                    <p className="text-gray-800">{moveData.toAddress}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Moving Company Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-orange-600" />
              <span>Moving Company</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="movingCompany">Company Name</Label>
              {isEditing ? (
                <Input
                  id="movingCompany"
                  value={moveData.movingCompany}
                  onChange={(e) => updateField('movingCompany', e.target.value)}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="font-medium text-gray-900">{moveData.movingCompany}</p>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="truckSize">Truck Size</Label>
              {isEditing ? (
                <Input
                  id="truckSize"
                  value={moveData.truckSize}
                  onChange={(e) => updateField('truckSize', e.target.value)}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-800">{moveData.truckSize}</p>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="contactPerson">Contact Person</Label>
              {isEditing ? (
                <Input
                  id="contactPerson"
                  value={moveData.contactPerson}
                  onChange={(e) => updateField('contactPerson', e.target.value)}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-800">{moveData.contactPerson}</p>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="contactPhone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="contactPhone"
                  value={moveData.contactPhone}
                  onChange={(e) => updateField('contactPhone', e.target.value)}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-800">{moveData.contactPhone}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Team Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>Moving Team</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="numberOfMovers">Team Size</Label>
              {isEditing ? (
                <Input
                  id="numberOfMovers"
                  value={moveData.numberOfMovers}
                  onChange={(e) => updateField('numberOfMovers', e.target.value)}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-3 bg-gray-50 rounded-md flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-800">{moveData.numberOfMovers}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Moving Day Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be present when movers arrive</li>
                <li>• Keep important documents with you</li>
                <li>• Take photos of valuable items</li>
                <li>• Have cash ready for tips</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoveDetails;
