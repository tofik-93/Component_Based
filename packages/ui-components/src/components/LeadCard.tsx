import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@salesflow/utils";

export interface LeadCardProps {
  name: string;
  status: "new" | "contacted" | "qualified" | "converted";
  email: string;
  company: string;
  value?: number;
  lastContact?: string;
}

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-green-100 text-green-800",
  converted: "bg-purple-100 text-purple-800",
};

export const LeadCard: React.FC<LeadCardProps> = ({
  name,
  status,
  email,
  company,
  value,
  lastContact,
}) => {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{company}</p>
          </div>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600">{email}</p>
        {value && (
          <p className="text-sm font-medium mt-2">
            Value: {formatCurrency(value)}
          </p>
        )}
      </CardContent>
      {lastContact && (
        <CardFooter className="pt-2 text-xs text-gray-500">
          Last contact: {lastContact}
        </CardFooter>
      )}
    </Card>
  );
};
