import { apiClient, ApiResponse } from './api-client'
import type { components } from '../../types/swagger-generated'

// 타입 별칭 정의
export type LoginRequest = components['schemas']['LoginRequestDto']
export type LoginResponse = components['schemas']['LoginResponseDto']
export type SignupRequest = components['schemas']['SignupRequestDto']
export type SignupResponse = components['schemas']['SignupResponseDto']
export type EmailSendRequest = components['schemas']['EmailSendRequestDto']
export type EmailSendResponse = components['schemas']['EmailSendResponseDto']
export type EmailVerification = components['schemas']['EmailVerificationDto']
export type NicknameCheckRequest =
  components['schemas']['NicknameCheckRequestDto']
export type UserInfoResponse = components['schemas']['UserInfoResponseDto']

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
    localStorage.setItem('user', JSON.stringify(result.data))
    console.log('로그인 성공, 사용자 정보 저장:', result.data)
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

// 로그아웃 API
export async function logout(): Promise<VoidApiResponse> {
  return apiClient.post<VoidApiResponse>(API_ENDPOINTS.AUTH.LOGOUT)
}

// 비밀번호 찾기 API - Swagger에 없으므로 제거
// export async function forgotPassword(
//   email: string,
// ): Promise<ForgotPasswordResponse> {
//   try {
//     const response = await apiClient.post<ForgotPasswordResponse>(
//       API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
//       { email },
//     )
//     return response
//   } catch (error) {
//     console.error('Forgot password error:', error)
//     throw new Error('비밀번호 재설정 이메일 발송에 실패했습니다.')
//   }
// }

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
    return response
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
  ApiResponse<{ accessToken: string }>
> {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    throw new Error('Refresh token not found')
  }

  return apiClient.post<ApiResponse<{ accessToken: string }>>('/auth/refresh', {
    refreshToken,
  })
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
  console.log('getCurrentUser 호출: 스웨거와 동일한 방식으로 백엔드 API 호출')

  try {
    // 스웨거와 정확히 동일한 방식으로 백엔드 API 호출
    const response = await fetch('/api/proxy/api/v1/users/me', {
      method: 'GET',
      headers: {
        accept: '*/*', // 스웨거와 동일
      },
      credentials: 'include', // 쿠키 포함
    })

    console.log(
      'getCurrentUser 응답 상태:',
      response.status,
      response.statusText,
    )
    console.log(
      'getCurrentUser 응답 헤더:',
      Object.fromEntries(response.headers.entries()),
    )

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('인증이 필요합니다. 로그인이 필요합니다.')
      }
      throw new Error(`사용자 정보 조회 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('getCurrentUser 응답 데이터:', result)

    if (!result.data) {
      throw new Error('사용자 정보가 없습니다.')
    }

    return result
  } catch (error) {
    console.error('getCurrentUser 에러:', error)
    throw error
  }
}

// 로그인 상태 확인 함수 - 로컬 스토리지만 사용
export async function checkAuthStatus(): Promise<{
  isAuthenticated: boolean
  user: LoginResponse | null
  error?: string
}> {
  try {
    // 로컬 스토리지에서 사용자 정보 확인
    const userData = localStorage.getItem('user')

    if (!userData) {
      return {
        isAuthenticated: false,
        user: null,
      }
    }

    const user = JSON.parse(userData) as LoginResponse

    return {
      isAuthenticated: true,
      user,
    }
  } catch (error) {
    console.error('Auth status check error:', error)
    localStorage.removeItem('user')

    return {
      isAuthenticated: false,
      user: null,
      error: '사용자 정보가 유효하지 않습니다.',
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
