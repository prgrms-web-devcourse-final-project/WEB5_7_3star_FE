import type { components } from '../../types/swagger-generated'
import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants'

// 타입 별칭 정의
export type ProfileResponse = components['schemas']['ProfileResponseDto']
export type ProfileDetailResponse =
  components['schemas']['ProfileDetailResponseDto']
export type ProfileUpdateRequest =
  components['schemas']['ProfileUpdateRequestDto']
export type CreatedLesson = components['schemas']['CreatedLessonDto']

// API 응답 타입
export type ProfileApiResponse =
  components['schemas']['BaseResponseProfileResponseDto']
export type ProfileDetailApiResponse =
  components['schemas']['BaseResponseProfileDetailResponseDto']
export type CreatedLessonListApiResponse =
  components['schemas']['BaseResponseCreatedLessonListResponseDto']

/**
 * 프로필 수정 API
 * @param profileData 수정할 프로필 데이터
 * @returns 수정된 프로필 정보
 */
export async function updateProfile(
  profileData: ProfileUpdateRequest,
): Promise<ProfileApiResponse> {
  return apiClient.patch<ProfileApiResponse>(
    API_ENDPOINTS.PROFILES.UPDATE,
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
  // Next.js API 라우트를 통해 프록시
  const response = await fetch(`/api/proxy/api/v1/profiles/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  console.log('프로필 상세 조회 응답:', {
    status: response.status,
    statusText: response.statusText,
    data: data,
    url: response.url,
  })

  if (!response.ok) {
    console.log('프로필 상세 조회 에러 데이터:', data)
    throw new Error(data.message || '프로필 정보를 불러오는데 실패했습니다.')
  }

  return data
}

/**
 * 현재 사용자 프로필 조회 API
 * @returns 현재 사용자 프로필 정보
 */
export async function getCurrentUserProfile(): Promise<ProfileApiResponse> {
  return apiClient.get<ProfileApiResponse>(API_ENDPOINTS.PROFILES.UPDATE)
}

/**
 * 사용자가 개설한 레슨 목록 조회 API
 * @param userId 사용자 ID
 * @param page 페이지 번호 (기본값: 1)
 * @param limit 페이지당 항목 수 (기본값: 10)
 * @param status 레슨 상태 필터 (선택사항)
 * @returns 개설한 레슨 목록
 */
export async function getCreatedLessons(
  userId: string,
  page: number = 1,
  limit: number = 10,
  status?: string,
): Promise<CreatedLessonListApiResponse> {
  // Next.js API 라우트를 통해 프록시
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  if (status) {
    params.append('status', status)
  }

  const response = await fetch(
    `/api/proxy/api/v1/lessons/${userId}/created-lessons?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const data = await response.json()
  console.log('개설한 레슨 목록 응답:', {
    status: response.status,
    statusText: response.statusText,
    data: data,
    url: response.url,
  })

  if (!response.ok) {
    console.log('개설한 레슨 목록 에러 데이터:', data)
    throw new Error(data.message || '레슨 목록을 불러오는데 실패했습니다.')
  }

  return data
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

// 사용자 리뷰 조회 API
export const getUserReviews = async (userId: string) => {
  try {
    const response = await fetch(`/api/proxy/reviews/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching user reviews:', error)
    throw error
  }
}

// 레슨 생성 API
export const createLesson = async (lessonData: any) => {
  try {
    const response = await fetch('/api/proxy/lessons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating lesson:', error)
    throw error
  }
}

// 레슨 삭제 API
export const deleteLesson = async (lessonId: string) => {
  try {
    const response = await fetch(`/api/proxy/lessons/${lessonId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error deleting lesson:', error)
    throw error
  }
}

// 강사용 API 함수들

// 레슨 신청자 목록 조회 (강사용)
export const getLessonApplications = async (lessonId: string) => {
  try {
    const response = await fetch(
      `/api/proxy/lessons/${lessonId}/applications`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching lesson applications:', error)
    throw error
  }
}

// 레슨 신청 승인/거절 (강사용)
export const approveRejectApplication = async (
  lessonApplicationId: string,
  action: 'APPROVE' | 'REJECT',
) => {
  try {
    const response = await fetch(
      `/api/proxy/lessons/applications/${lessonApplicationId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
        credentials: 'include',
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error approving/rejecting application:', error)
    throw error
  }
}

// 레슨 참가자 목록 조회 (강사용)
export const getLessonParticipants = async (lessonId: string) => {
  try {
    const response = await fetch(
      `/api/proxy/lessons/${lessonId}/participants`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching lesson participants:', error)
    throw error
  }
}

// 개설한 레슨 목록 (강사용)
export const getInstructorCreatedLessons = async (userId: string) => {
  try {
    const response = await fetch(
      `/api/proxy/lessons/${userId}/created-lessons`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching created lessons:', error)
    throw error
  }
}

// 전체 랭킹 조회 API
export const getOverallRankings = async () => {
  try {
    const response = await fetch('/api/proxy/rankings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching overall rankings:', error)
    throw error
  }
}

// 카테고리별 랭킹 조회 API
export const getCategoryRankings = async (category: string) => {
  try {
    const response = await fetch(`/api/proxy/rankings/${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching category rankings:', error)
    throw error
  }
}

// 리뷰 작성 API
export const createReview = async (lessonId: string, reviewData: any) => {
  try {
    const response = await fetch(`/api/proxy/reviews/${lessonId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating review:', error)
    throw error
  }
}

// 프로필 이미지 수정 API
export const updateProfileImage = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch('/api/proxy/profiles/image', {
      method: 'PATCH',
      body: formData,
      // Content-Type은 브라우저가 자동으로 설정하므로 제거
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating profile image:', error)
    throw error
  }
}

// 사용자 신청 레슨 조회 API
export const getUserApplications = async () => {
  try {
    const response = await fetch('/api/proxy/applications', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // 쿠키를 포함한 요청
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching user applications:', error)
    throw error
  }
}
