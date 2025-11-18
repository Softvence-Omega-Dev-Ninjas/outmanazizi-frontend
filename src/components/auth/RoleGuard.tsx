'use client'

import { useAuth } from '@/context/AuthContext'

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
  fallback?: React.ReactNode
}

export function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { userRole, isAuthenticated } = useAuth()

  if (!isAuthenticated || !userRole || !allowedRoles.includes(userRole)) {
    return fallback || null
  }

  return <>{children}</>
}

interface AdminOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AdminOnly({ children, fallback }: AdminOnlyProps) {
  return (
    <RoleGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']} fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function SuperAdminOnly({ children, fallback }: AdminOnlyProps) {
  return (
    <RoleGuard allowedRoles={['SUPER_ADMIN']} fallback={fallback}>
      {children}
    </RoleGuard>
  )
}