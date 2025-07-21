'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  fallback?: React.ReactNode
}

export function ProtectedRoute({
  children,
  redirectTo = '/login',
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo])

  // 로딩 중일 때
  if (isLoading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>인증 상태를 확인하는 중...</span>
          </div>
        </div>
      )
    )
  }

  // 인증되지 않은 경우
  if (!isAuthenticated) {
    return null // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>
}

// 관리자 전용 보호 컴포넌트 (props로 관리자 여부 확인)
export function AdminRoute({
  children,
  redirectTo = '/login',
  fallback,
  isAdmin = false,
}: ProtectedRouteProps & { isAdmin?: boolean }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo)
      } else if (!isAdmin) {
        router.push('/')
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo, isAdmin])

  // 로딩 중일 때
  if (isLoading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>권한을 확인하는 중...</span>
          </div>
        </div>
      )
    )
  }

  // 인증되지 않았거나 관리자가 아닌 경우
  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return <>{children}</>
}

// 강사 전용 보호 컴포넌트 (props로 강사 여부 확인)
export function InstructorRoute({
  children,
  redirectTo = '/login',
  fallback,
  isInstructor = false,
  isAdmin = false,
}: ProtectedRouteProps & { isInstructor?: boolean; isAdmin?: boolean }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo)
      } else if (!isInstructor && !isAdmin) {
        router.push('/')
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo, isInstructor, isAdmin])

  // 로딩 중일 때
  if (isLoading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>권한을 확인하는 중...</span>
          </div>
        </div>
      )
    )
  }

  // 인증되지 않았거나 강사/관리자가 아닌 경우
  if (!isAuthenticated || (!isInstructor && !isAdmin)) {
    return null
  }

  return <>{children}</>
}
