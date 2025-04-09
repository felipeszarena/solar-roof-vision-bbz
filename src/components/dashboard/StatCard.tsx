
import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
}

const StatCard = ({ title, value, change }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
