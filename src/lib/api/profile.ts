import type { components } from '../../types/swagger-generated'
import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants'

// 타입 별칭 정의
export type ProfileResponse = components['schemas']['ProfileResponseDto']
export type ProfileDetailResponse =
  components['schemas']['ProfileDetailResponseDto']
export type ProfileUpdateRequest =
  components['schemas']['ProfileUpdateRequestDto']

// API 응답 타입
export type ProfileApiResponse =
  components['schemas']['BaseResponseProfileResponseDto']
export type ProfileDetailApiResponse =
  components['schemas']['BaseResponseProfileDetailResponseDto']

/**
 * 프로필 수정 API
 * @param profileData 수정할 프로필 데이터
 * @returns 수정된 프로필 정보
 */
export async function updateProfile(
  profileData: ProfileUpdateRequest,
): Promise<ProfileApiResponse> {
  return apiClient.patch<ProfileApiResponse>(
    API_ENDPOINTS.USERS.PROFILE,
    profileData,
  )
}

/**
 * 특정 사용자 프로필 상세 조회 API
 * @param userId 사용자 ID
 * @returns 프로필 상세 정보
 */
export async function getProfileDetail(
  userId: string,
): Promise<ProfileDetailApiResponse> {
  return apiClient.get<ProfileDetailApiResponse>(
    `${API_ENDPOINTS.USERS.PROFILE}/${userId}`,
  )
}

/**
 * 현재 사용자 프로필 조회 API
 * @returns 현재 사용자 프로필 정보
 */
export async function getCurrentUserProfile(): Promise<ProfileApiResponse> {
  return apiClient.get<ProfileApiResponse>(API_ENDPOINTS.USERS.PROFILE)
}

/**
 * S3를 통한 프로필 이미지 업로드 API
 * @param file 업로드할 이미지 파일
 * @returns 업로드된 이미지 URL
 */
export async function uploadProfileImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<string>(
    '/api/v1/test/s3/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return response
}

// TODO: Swagger에 비밀번호 변경 API가 없음 - 백엔드에서 추가 필요
/**
 * 비밀번호 변경 API (Swagger에 없음 - 임시 구현)
 * @param currentPassword 현재 비밀번호
 * @param newPassword 새 비밀번호
 * @returns 성공 여부
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<{ success: boolean }> {
  // TODO: 실제 API 구현 필요
  console.warn(
    '비밀번호 변경 API가 Swagger에 없습니다. 백엔드에서 추가해주세요.',
  )
  return Promise.resolve({ success: true })
}

// 기존 함수명과 호환성을 위한 별칭
export const updateUserProfile = updateProfile
