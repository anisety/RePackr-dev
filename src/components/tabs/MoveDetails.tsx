// Cleaned up: Only interactive fields, valid JSX

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Users } from "lucide-react";

const MoveDetails = () => {
  const [moveData, setMoveData] = useState({
    contactPerson: "",
    contactPhone: "",
    numberOfMovers: ""
  });
  const [isEditing, setIsEditing] = useState(true);

  const updateField = (field: string, value: string) => {
    setMoveData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              value={moveData.contactPerson}
              onChange={(e) => updateField("contactPerson", e.target.value)}
              className="mt-1"
              placeholder="Enter contact person"
            />
          </div>
          <div>
            <Label htmlFor="contactPhone">Phone Number</Label>
            <Input
              id="contactPhone"
              value={moveData.contactPhone}
              onChange={(e) => updateField("contactPhone", e.target.value)}
              className="mt-1"
              placeholder="Enter phone number"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Moving Team</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="numberOfMovers">Team Size</Label>
            <Input
              id="numberOfMovers"
              value={moveData.numberOfMovers}
              onChange={(e) => updateField("numberOfMovers", e.target.value)}
              className="mt-1"
              placeholder="Enter number of movers"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoveDetails;
// Removed duplicate and leftover code
