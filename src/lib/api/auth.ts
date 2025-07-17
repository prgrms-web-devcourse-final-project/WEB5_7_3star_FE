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

// API 응답 타입
export type LoginApiResponse =
  components['schemas']['BaseResponseLoginResponseDto']
export type SignupApiResponse =
  components['schemas']['BaseResponseSignupResponseDto']
export type EmailSendApiResponse =
  components['schemas']['BaseResponseEmailSendResponseDto']
export type VoidApiResponse = components['schemas']['BaseResponseVoid']

// 비밀번호 찾기 관련 타입
export type ForgotPasswordRequest = {
  email: string
}

export type ForgotPasswordResponse = {
  status: string
  message?: string
}

import { API_ENDPOINTS } from '@/lib/constants'

// 로그인 API - Next.js API 라우트를 통해 프록시
export async function login(
  credentials: LoginRequest,
): Promise<LoginApiResponse> {
  // Next.js API 라우트를 통해 요청
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '로그인에 실패했습니다.')
  }

  return response.json()
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

// 비밀번호 찾기 API
export async function forgotPassword(
  email: string,
): Promise<ForgotPasswordResponse> {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email },
    )
    return response
  } catch (error) {
    console.error('Forgot password error:', error)
    throw new Error('비밀번호 재설정 이메일 발송에 실패했습니다.')
  }
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

// 현재 사용자 정보 조회 API
export async function getCurrentUser(): Promise<ApiResponse<LoginResponse>> {
  return apiClient.get<ApiResponse<LoginResponse>>('/auth/me')
}
