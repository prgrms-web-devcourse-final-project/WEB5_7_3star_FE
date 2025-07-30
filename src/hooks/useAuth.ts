import { useState, useCallback, useEffect } from 'react'
import {
  checkAuthStatus,
  getCurrentUser,
  isAuthenticated,
  login,
} from '@/lib/api/auth'
import type {
  LoginResponse,
  LoginRequest,
  UserInfoResponse,
} from '@/lib/api/auth'

interface AuthState {
  isAuthenticated: boolean
  user: UserInfoResponse | null
  isLoading: boolean
  error: string | null
}

// 로컬 스토리지 키
const AUTH_STORAGE_KEY = 'trainus_auth_state'

// 로컬 스토리지에서 인증 상태 불러오기
const loadAuthState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    }
  }

  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      const state = {
        ...parsed,
        isLoading: false, // 새로고침 시 로딩 상태는 false로 시작
      }
      return state
    }
  } catch (error) {
    console.error('Failed to load auth state from localStorage:', error)
  }

  return {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  }
}

// 로컬 스토리지에 인증 상태 저장
const saveAuthState = (state: AuthState) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save auth state to localStorage:', error)
  }
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(loadAuthState)

  useEffect(() => {
    console.log('authState', authState)
  }, [authState])

  const checkAuth = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

      const result = await checkAuthStatus()

      const newState = {
        isAuthenticated: result.isAuthenticated,
        user: result.user,
        isLoading: false,
        error: result.error || null,
      }

      setAuthState(newState)
      saveAuthState(newState)
    } catch (error) {
      console.error('Auth check failed:', error)
      const newState = {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : '인증 확인 실패',
      }
      setAuthState(newState)
      saveAuthState(newState)
    }
  }, [])

  const loginUser = useCallback(async (credentials: LoginRequest) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

      const result = await login(credentials)
      const user = await getCurrentUser()

      if (!user.data) {
        throw new Error('로그인 응답에 사용자 정보가 없습니다.')
      }

      if (result.data) {
        const newState = {
          isAuthenticated: true,
          user: user.data,
          isLoading: false,
          error: null,
        }

        setAuthState(newState)
        saveAuthState(newState)

        // 로그인 시간 기록 (현재 시간 + 2초 지연)
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'last_login_time',
            (Date.now() + 2000).toString(),
          )
        }

        return { success: true, data: result.data }
      } else {
        throw new Error('로그인 응답에 사용자 정보가 없습니다.')
      }
    } catch (error) {
      console.error('Login failed:', error)
      const newState = {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : '로그인 실패',
      }
      setAuthState(newState)
      saveAuthState(newState)
      return {
        success: false,
        error: error instanceof Error ? error.message : '로그인 실패',
      }
    }
  }, [])

  const logout = useCallback(() => {
    const newState = {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    }
    setAuthState(newState)
    saveAuthState(newState)

    // 로컬 스토리지에서 인증 상태 완전 제거
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      localStorage.removeItem('last_login_time')
    }
  }, [])

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    // 저장된 인증 상태가 있으면 서버에 확인 요청
    if (authState.isAuthenticated && authState.user) {
      // 로그인 직후가 아닌 경우에만 서버 확인
      const now = Date.now()
      const lastLoginTime = localStorage.getItem('last_login_time')

      if (!lastLoginTime || now - parseInt(lastLoginTime) > 5000) {
        checkAuth()
      }
    } else {
      // 저장된 인증 상태가 없으면 서버에서 확인
      checkAuth()
    }
  }, []) // checkAuth는 의존성 배열에 포함하지 않음

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
