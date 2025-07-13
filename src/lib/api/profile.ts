import { apiClient, ApiResponse } from './api-client'
import { API_ENDPOINTS } from '@/lib/constants'

// 프로필 관련 타입 정의
export interface UserProfile {
  userId: number
  nickname: string
  profileImage?: string
  intro?: string
  reviewCount: number
  rating: number
}

export interface UpdateProfileRequest {
  profileImage?: string | null // null이면 기본이미지
  intro?: string
}

export interface UpdateProfileResponse {
  profileImage?: string
  intro?: string
}

// 사용자 프로필 조회 API
export async function getUserProfile(
  userId: number,
): Promise<ApiResponse<UserProfile>> {
  return apiClient.get<ApiResponse<UserProfile>>(
    `${API_ENDPOINTS.USERS.PROFILE}/${userId}`,
  )
}

// 현재 사용자 프로필 조회 API
export async function getCurrentUserProfile(): Promise<
  ApiResponse<UserProfile>
> {
  return apiClient.get<ApiResponse<UserProfile>>(API_ENDPOINTS.USERS.PROFILE)
}

// 프로필 수정 API
export async function updateUserProfile(
  profileData: UpdateProfileRequest,
): Promise<ApiResponse<UpdateProfileResponse>> {
  return apiClient.patch<ApiResponse<UpdateProfileResponse>>(
    API_ENDPOINTS.USERS.UPDATE_PROFILE,
    profileData,
  )
}

// 비밀번호 변경 API
export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>('/users/change-password', {
    currentPassword,
    newPassword,
  })
}

// 프로필 이미지 업로드 API
export async function uploadProfileImage(
  file: File,
): Promise<ApiResponse<{ imageUrl: string }>> {
  const formData = new FormData()
  formData.append('image', file)

  return apiClient.post<ApiResponse<{ imageUrl: string }>>(
    '/users/profile/image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}

// 계정 삭제 API
export async function deleteAccount(
  password: string,
): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>('/users/account/delete', {
    password,
  })
}
