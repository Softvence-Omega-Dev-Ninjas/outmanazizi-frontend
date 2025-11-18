'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
  const { isAuthenticated, userRole, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Check specific role requirement
    if (requiredRole && userRole !== requiredRole) {
      router.push('/login')
      return
    }

    // Check allowed roles
    if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
      router.push('/login')
      return
    }
  }, [isAuthenticated, userRole, requiredRole, allowedRoles, router])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}