import { useState, useCallback } from 'react'
import { checkAuthStatus, isAuthenticated } from '@/lib/api/auth'
import type { LoginResponse } from '@/lib/api/auth'

interface AuthState {
  isAuthenticated: boolean
  user: LoginResponse | null
  isLoading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  })

  const checkAuth = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

      const result = await checkAuthStatus()

      setAuthState({
        isAuthenticated: result.isAuthenticated,
        user: result.user,
        isLoading: false,
        error: result.error || null,
      })

      // 로컬 스토리지 동기화
      if (result.isAuthenticated && result.user) {
        localStorage.setItem('user', JSON.stringify(result.user))
      } else {
        localStorage.removeItem('user')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : '인증 확인 실패',
      })
      localStorage.removeItem('user')
    }
  }, [])

  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    })
    localStorage.removeItem('user')
  }, [])

  return {
    ...authState,
    checkAuth,
    logout,
  }
}

// 간단한 로그인 상태 확인 훅
export function useIsAuthenticated() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true)
      const authenticated = await isAuthenticated()
      setIsAuth(authenticated)
    } catch (error) {
      setIsAuth(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isAuthenticated: isAuth, isLoading, checkAuth }
}
