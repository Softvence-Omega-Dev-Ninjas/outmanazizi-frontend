"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/shared/dashboard/sidebar";
import { Navbar } from "@/components/shared/dashboard/navbar";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
      <div className="h-screen flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 border-r/20 bg-white">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:pl-72 overflow-x-hidden">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
