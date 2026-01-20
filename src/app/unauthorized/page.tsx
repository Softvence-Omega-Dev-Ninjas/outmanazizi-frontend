import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Home, LogIn } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="flex justify-center">
          <Shield className="h-16 w-16 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page. Please login with proper credentials.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/" className="gap-2">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/login" className="gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}