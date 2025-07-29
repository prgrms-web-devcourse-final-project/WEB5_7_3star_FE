import type { components } from '../../types/swagger-generated'
import { apiClient, BaseApiResponse } from './api-client'

// 타입 별칭 정의
export type LoginRequest = components['schemas']['LoginRequestDto']
export type LoginResponse = components['schemas']['LoginResponseDto'] & {
  role?: string
}
export type SignupRequest = components['schemas']['SignupRequestDto']
export type SignupResponse = components['schemas']['SignupResponseDto']
export type EmailSendRequest = components['schemas']['EmailSendRequestDto']
export type EmailSendResponse = components['schemas']['EmailSendResponseDto']
export type EmailVerification = components['schemas']['EmailVerificationDto']
export type NicknameCheckRequest =
  components['schemas']['NicknameCheckRequestDto']
export type UserInfoResponse = components['schemas']['UserInfoResponseDto'] & {
  role?: string
}

// API 응답 타입
export type LoginApiResponse =
  components['schemas']['BaseResponseLoginResponseDto']
export type SignupApiResponse =
  components['schemas']['BaseResponseSignupResponseDto']
export type EmailSendApiResponse =
  components['schemas']['BaseResponseEmailSendResponseDto']
export type VoidApiResponse = components['schemas']['BaseResponseVoid']
export type UserInfoApiResponse =
  components['schemas']['BaseResponseUserInfoResponseDto']

// 비밀번호 찾기 관련 타입
export type ForgotPasswordRequest = {
  email: string
}

export type ForgotPasswordResponse = {
  status: string
  message?: string
}

import { API_ENDPOINTS } from '@/lib/constants'

// 로그인 API - Next.js API 라우트를 통해 프록시 (쿠키 전달 포함)
export async function login(
  credentials: LoginRequest,
): Promise<LoginApiResponse> {
  // Next.js API 라우트를 통해 요청 (쿠키 전달 포함)
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  const result = await response.json()
  console.log('로그인 응답:', {
    status: response.status,
    statusText: response.statusText,
    data: result,
  })

  if (!response.ok) {
    // 에러 메시지 추출
    let errorMessage = '로그인에 실패했습니다.'
    if (result && result.message) {
      errorMessage = result.message
    } else if (result && typeof result === 'string') {
      errorMessage = result
    }
    throw new Error(errorMessage)
  }

  // 로그인 성공 시 사용자 정보를 로컬 스토리지에 저장
  if (result.data) {
    console.log('로그인 성공, 사용자 정보:', result.data)
  }

  return result
}

// 회원가입 API - Next.js API 라우트를 통해 프록시
export async function signup(
  userData: SignupRequest,
): Promise<SignupApiResponse> {
  // Next.js API 라우트를 통해 요청
  const response = await fetch('/api/proxy/api/v1/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  const data = await response.json()
  console.log('회원가입 응답:', {
    status: response.status,
    statusText: response.statusText,
    data: data,
    url: response.url,
  })

  if (!response.ok) {
    console.log('회원가입 에러 데이터:', data)
    // 에러 메시지 추출
    let errorMessage = '회원가입에 실패했습니다.'
    if (data && data.message) {
      errorMessage = data.message
    } else if (data && typeof data === 'string') {
      errorMessage = data
    }
    throw new Error(errorMessage)
  }

  return data
}

// 회원탈퇴 API
export async function withdraw(): Promise<VoidApiResponse> {
  try {
    console.log('회원탈퇴 요청 시작')

    const response = await fetch('/api/proxy/api/v1/users/withdraw', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 쿠키 포함
    })

    console.log('회원탈퇴 응답:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('회원탈퇴 에러 데이터:', errorData)
      throw new Error(errorData.message || '회원탈퇴에 실패했습니다.')
    }

    const data = await response.json()
    console.log('회원탈퇴 성공 데이터:', data)

    // 로컬 스토리지 정리
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    }

    return data
  } catch (error) {
    console.error('회원탈퇴 에러:', error)
    throw error
  }
}

// 로그아웃 API
export async function logout(): Promise<VoidApiResponse> {
  return apiClient.post<VoidApiResponse>(API_ENDPOINTS.AUTH.LOGOUT)
}

/**
 * 비밀번호 찾기 API
 * @param email 이메일
 * @returns 비밀번호 재설정 결과
 */
export const forgotPassword = async (email: string): Promise<any> => {
  // TODO: 비밀번호 찾기 API 구현
  console.log('비밀번호 찾기 요청:', email)
  throw new Error('비밀번호 찾기 API가 아직 구현되지 않았습니다.')
}

// 이메일 인증 코드 발송 API
export async function sendEmailVerification(
  emailData: EmailSendRequest,
): Promise<EmailSendApiResponse> {
  try {
    console.log('이메일 인증 요청:', emailData)
    const response = await apiClient.post<EmailSendApiResponse>(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL_SEND,
      emailData,
    )
    console.log('이메일 인증 응답:', response)
    return response.data
  } catch (error) {
    console.error('이메일 인증 에러:', error)
    throw error
  }
}

// 이메일 인증 코드 확인 API
export async function confirmEmailVerification(
  verificationData: EmailVerification,
): Promise<VoidApiResponse> {
  return apiClient.post<VoidApiResponse>(
    API_ENDPOINTS.AUTH.VERIFY_EMAIL_CHECK,
    verificationData,
  )
}

// 이메일 인증 코드 확인 API (별칭)
export const checkEmailVerification = confirmEmailVerification

// 닉네임 중복 확인 API
export async function checkNickname(
  nicknameData: NicknameCheckRequest,
): Promise<VoidApiResponse> {
  return apiClient.post<VoidApiResponse>(
    API_ENDPOINTS.AUTH.VERIFY_NICKNAME_CHECK,
    nicknameData,
  )
}

// 닉네임 중복 확인 API (별칭)
export const checkNicknameAvailability = checkNickname

// 토큰 갱신 API
export async function refreshToken(): Promise<
  BaseApiResponse<{ accessToken: string }>
> {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    throw new Error('Refresh token not found')
  }

  const response = await apiClient.post<
    BaseApiResponse<{ accessToken: string }>
  >('/auth/refresh', {
    refreshToken,
  })
  return response.data
}

// 직접 백엔드 API 테스트 함수
export async function testDirectApi(): Promise<any> {
  console.log('직접 백엔드 API 테스트 호출')

  try {
    const response = await fetch('/api/direct-test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const result = await response.json()
    console.log('직접 API 테스트 결과:', result)
    return result
  } catch (error) {
    console.error('직접 API 테스트 에러:', error)
    throw error
  }
}

// 현재 사용자 정보 조회 API - 스웨거와 동일한 방식으로 백엔드 호출
export async function getCurrentUser(): Promise<UserInfoApiResponse> {
  try {
    // 스웨거와 정확히 동일한 방식으로 백엔드 API 호출
    const response = await fetch('/api/proxy/api/v1/users/me', {
      method: 'GET',
      headers: {
        accept: '*/*', // 스웨거와 동일
      },
      credentials: 'include', // 쿠키 포함
    })

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // 로그인 안한 상태로 처리 - 콘솔 로그만 출력하고 null 반환하는 특별한 에러
        throw new Error('UNAUTHENTICATED')
      }
      throw new Error(`사용자 정보 조회 실패: ${response.status}`)
    }

    const result = await response.json()

    if (!result.data) {
      throw new Error('사용자 정보가 없습니다.')
    }

    return result
  } catch (error) {
    console.error('getCurrentUser 에러:', error)
    throw error
  }
}

// 로그인 상태 확인 함수 - 백엔드 API만 사용
export async function checkAuthStatus(): Promise<{
  isAuthenticated: boolean
  user: LoginResponse | null
  error?: string
}> {
  try {
    const response = await getCurrentUser()

    // UserInfoResponse를 LoginResponse로 변환
    const user: LoginResponse = {
      id: response.data?.userId,
      email: '', // UserInfoResponse에는 email이 없으므로 빈 문자열
      nickname: response.data?.nickname || '',
    }

    return {
      isAuthenticated: true,
      user,
    }
  } catch (error) {
    console.error('Auth status check error:', error)

    // 에러 메시지 추출
    let errorMessage = '인증 확인 실패'

    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'object' && error !== null) {
      // API 응답 에러 객체 처리
      const apiError = error as any
      if (apiError.message) {
        errorMessage = apiError.message
      } else if (apiError.error) {
        errorMessage = apiError.error
      }
    }

    // 인증되지 않은 상태는 정상적인 로그아웃 상태로 처리
    if (
      errorMessage.includes('401') ||
      errorMessage.includes('403') ||
      errorMessage.includes('인증이 필요') ||
      errorMessage.includes('접근 권한') ||
      errorMessage === 'UNAUTHENTICATED'
    ) {
      return {
        isAuthenticated: false,
        user: null,
      }
    }

    return {
      isAuthenticated: false,
      user: null,
      error: errorMessage,
    }
  }
}

// 로그인 상태 확인 (간단 버전)
export async function isAuthenticated(): Promise<boolean> {
  try {
    await getCurrentUser()
    return true
  } catch (error) {
    return false
  }
}
