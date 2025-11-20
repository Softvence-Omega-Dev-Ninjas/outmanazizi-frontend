'use client'

import { useAuth } from '@/context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'ADMIN' | 'SUPER_ADMIN' | 'SERVICE_PROVIDER' | 'CONSUMER'
  allowedRoles?: string[]
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  allowedRoles = [] 
}: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useAuth()

  // Proxy.ts handles redirects, just check auth here
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Check role requirements
  if (requiredRole && userRole !== requiredRole) {
    return null
  }

  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    return null
  }

  return <>{children}</>
}