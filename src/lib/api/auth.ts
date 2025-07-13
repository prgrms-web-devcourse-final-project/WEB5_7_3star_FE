import { apiClient, ApiResponse } from './api-client'

// 인증 관련 타입 정의
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  id: number
  email: string
  nickname: string
}

export interface SignupRequest {
  email: string
  password: string
  nickname: string
  phoneNumber?: string
}

export interface SignupResponse {
  id: number
  email: string
  nickname: string
  role: string
  createdAt: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface EmailVerificationRequest {
  email: string
}

export interface EmailVerificationResponse {
  email: string
  expirationMinutes: number
}

export interface EmailVerificationCheckRequest {
  email: string
  verificationCode: string
}

export interface NicknameCheckRequest {
  nickname: string
}

import { API_ENDPOINTS } from '@/lib/constants'

// 로그인 API
export async function login(
  credentials: LoginRequest,
): Promise<ApiResponse<LoginResponse>> {
  return apiClient.post<ApiResponse<LoginResponse>>(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials,
  )
}

// 회원가입 API
export async function signup(
  userData: SignupRequest,
): Promise<ApiResponse<SignupResponse>> {
  return apiClient.post<ApiResponse<SignupResponse>>(
    API_ENDPOINTS.AUTH.REGISTER,
    userData,
  )
}

// 로그아웃 API
export async function logout(): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.LOGOUT)
}

// 비밀번호 찾기 API
export async function forgotPassword(
  email: string,
): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
    email,
  })
}

// 비밀번호 재설정 API
export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
    token,
    newPassword,
  })
}

// 비밀번호 변경 API (인증 컨텍스트)
export async function changeAuthPassword(
  currentPassword: string,
  newPassword: string,
): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>('/auth/change-password', {
    currentPassword,
    newPassword,
  })
}

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

// 이메일 인증 코드 발송 API
export async function sendEmailVerification(
  email: string,
): Promise<ApiResponse<EmailVerificationResponse>> {
  return apiClient.post<ApiResponse<EmailVerificationResponse>>(
    API_ENDPOINTS.AUTH.VERIFY_EMAIL_SEND,
    { email },
  )
}

// 이메일 인증 코드 확인 API
export async function checkEmailVerification(
  email: string,
  verificationCode: string,
): Promise<ApiResponse<Record<string, never>>> {
  return apiClient.post<ApiResponse<Record<string, never>>>(
    API_ENDPOINTS.AUTH.VERIFY_EMAIL_CHECK,
    { email, verificationCode },
  )
}

// 닉네임 중복 확인 API
export async function checkNicknameAvailability(
  nickname: string,
): Promise<ApiResponse<Record<string, never>>> {
  return apiClient.post<ApiResponse<Record<string, never>>>(
    API_ENDPOINTS.AUTH.VERIFY_NICKNAME_CHECK,
    { nickname },
  )
}
