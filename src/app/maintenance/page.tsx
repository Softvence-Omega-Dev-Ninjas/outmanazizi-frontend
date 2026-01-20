"use client";

import { Button } from "@/components/ui/button";
import { Wrench, RefreshCw } from "lucide-react";

export default function Maintenance() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="flex justify-center">
          <Wrench className="h-16 w-16 text-orange-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Under Maintenance</h1>
          <p className="text-muted-foreground">
            We're currently performing scheduled maintenance. Please check back soon.
          </p>
        </div>
        <Button onClick={() => window.location.reload()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Page
        </Button>
      </div>
    </div>
  );
}