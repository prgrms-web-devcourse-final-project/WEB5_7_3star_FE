import { useState, useCallback } from 'react'
import { checkAuthStatus, isAuthenticated, login } from '@/lib/api/auth'
import type { LoginResponse, LoginRequest } from '@/lib/api/auth'

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
    } catch (error) {
      console.error('Auth check failed:', error)
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : '인증 확인 실패',
      })
    }
  }, [])

  const loginUser = useCallback(async (credentials: LoginRequest) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

      const result = await login(credentials)

      if (result.data) {
        setAuthState({
          isAuthenticated: true,
          user: result.data,
          isLoading: false,
          error: null,
        })

        return { success: true, data: result.data }
      } else {
        throw new Error('로그인 응답에 사용자 정보가 없습니다.')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : '로그인 실패',
      })
      return {
        success: false,
        error: error instanceof Error ? error.message : '로그인 실패',
      }
    }
  }, [])

  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    })
  }, [])

  return {
    ...authState,
    checkAuth,
    loginUser,
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
