import type { components } from '../../types/swagger-generated'
import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants'

// 타입 별칭 정의
export type ProfileResponse = components['schemas']['ProfileResponseDto']
export type ProfileDetailResponse =
  components['schemas']['ProfileDetailResponseDto']
export type ProfileUpdateRequest =
  components['schemas']['IntroUpdateRequestDto']
export type CreatedLesson = components['schemas']['CreatedLessonDto']
export type LessonDetailResponse =
  components['schemas']['LessonDetailResponseDto']
export type MyLessonApplication =
  components['schemas']['MyLessonApplicationResponseDto']

// API 응답 타입
export type ProfileApiResponse =
  components['schemas']['BaseResponseIntroUpdateResponseDto']
export type ProfileDetailApiResponse =
  components['schemas']['BaseResponseProfileDetailResponseDto']
export type CreatedLessonListApiResponse =
  components['schemas']['PagedResponseCreatedLessonListWrapperDto']
export type LessonDetailApiResponse =
  components['schemas']['BaseResponseLessonDetailResponseDto']

/**
 * 프로필 수정 API
 * @param profileData 수정할 프로필 데이터
 * @returns 수정된 프로필 정보
 */
export async function updateProfile(
  profileData: ProfileUpdateRequest,
): Promise<ProfileApiResponse> {
  console.log('프로필 수정 요청 데이터:', profileData)

  // 프록시를 통한 요청으로 다시 변경
  const response = await fetch('/api/proxy/api/v1/profiles/intro', {
    method: 'PATCH',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', // CSRF 보호를 위해 추가
    },
    body: JSON.stringify(profileData),
    credentials: 'include',
  })

  console.log('프로필 수정 응답:', {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.log('프로필 수정 에러 데이터:', errorData)
    throw new Error(`프로필 수정 실패: ${errorData.message || response.status}`)
  }

  const data = await response.json()
  console.log('프로필 수정 성공 데이터:', data)
  return data
}

/**
 * 특정 사용자 프로필 상세 조회 API
 * @param userId 사용자 ID
 * @returns 프로필 상세 정보
 */
export async function getProfileDetail(
  userId: number,
): Promise<ProfileDetailApiResponse> {
  // Next.js API 라우트를 통해 프록시
  const response = await fetch(`/api/proxy/api/v1/profiles/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 쿠키 포함
  })

  console.log('프로필 상세 조회 응답:', {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.log('프로필 상세 조회 에러 데이터:', errorData)
    throw new Error(
      errorData.message || '프로필 정보를 불러오는데 실패했습니다.',
    )
  }

  // 204 No Content인 경우 빈 응답 처리
  if (response.status === 204) {
    console.log('프로필 상세 조회: 204 No Content')
    return {
      status: 204,
      message: 'No Content',
      data: undefined,
    } as ProfileDetailApiResponse
  }

  // 응답이 비어있는 경우 처리
  if (response.status === 200 && !response.body) {
    console.log('프로필 상세 조회: 빈 응답')
    return {
      status: 200,
      message: 'Empty response',
      data: undefined,
    } as ProfileDetailApiResponse
  }

  const data = await response.json()
  console.log('프로필 상세 조회 성공 데이터:', data)
  return data
}

/**
 * 현재 사용자 프로필 조회 API
 * @returns 현재 사용자 프로필 정보
 */
export async function getCurrentUserProfile(): Promise<ProfileDetailApiResponse> {
  // 먼저 현재 사용자 ID를 가져옴
  const currentUserResponse = await fetch('/api/proxy/api/v1/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  console.log('현재 사용자 정보 응답:', {
    status: currentUserResponse.status,
    statusText: currentUserResponse.statusText,
    url: currentUserResponse.url,
  })

  if (!currentUserResponse.ok) {
    const errorData = await currentUserResponse.json().catch(() => ({}))
    console.log('현재 사용자 정보 에러:', errorData)
    throw new Error('현재 사용자 정보를 가져올 수 없습니다.')
  }

  const currentUserData = await currentUserResponse.json()
  console.log('현재 사용자 데이터:', currentUserData)

  const userId = currentUserData.data?.userId

  if (!userId) {
    throw new Error('사용자 ID를 찾을 수 없습니다.')
  }

  console.log('사용자 ID:', userId)

  // 현재 사용자의 프로필 상세 정보를 가져옴
  return getProfileDetail(userId.toString())
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
      credentials: 'include', // 쿠키 포함
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

  const response = await fetch('/api/proxy/api/v1/test/s3/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  if (!response.ok) {
    console.log('이미지 업로드 에러 데이터:', response.status)
    throw new Error('이미지 업로드에 실패했습니다.')
  }

  const imageUrl = await response.text() // 응답이 단순 문자열(URL)
  return imageUrl
}

/**
 * 비밀번호 변경 API
 * @param currentPassword 현재 비밀번호
 * @param newPassword 새 비밀번호
 * @param confirmPassword 새 비밀번호 확인
 * @returns 성공 여부
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
): Promise<{ success: boolean }> {
  const response = await fetch('/api/proxy/api/v1/users/password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
      confirmPassword,
    }),
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || '비밀번호 변경에 실패했습니다.')
  }

  const data = await response.json()
  return { success: true }
}

// 기존 함수명과 호환성을 위한 별칭
export const updateUserProfile = updateProfile

// 사용자 리뷰 조회 API
export const getUserReviews = async (userId: string) => {
  try {
    // 프로필 관련 엔드포인트로 변경 - 해당 사용자가 받은 리뷰 조회
    const response = await fetch(
      `/api/proxy/api/v1/reviews/${userId}?page=1&pageSize=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      // 400/404 에러인 경우 빈 배열 반환 (API 미구현 대응)
      if (response.status === 400 || response.status === 404) {
        return {
          data: {
            reviews: [],
          },
        }
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching user reviews:', error)
    // API가 구현되지 않은 경우 빈 배열 반환
    if (error instanceof Error && error.message.includes('400')) {
      console.warn(
        '사용자 리뷰 API가 아직 구현되지 않았습니다. 빈 목록을 반환합니다.',
      )
      return {
        data: {
          reviews: [],
        },
      }
    }
    throw error
  }
}

// 레슨 상세 조회 API
export const getLessonDetail = async (
  lessonId: string | number,
): Promise<LessonDetailApiResponse> => {
  try {
    const baseUrl =
      typeof window === 'undefined'
        ? process.env.NEXT_PUBLIC_SITE_URL || 'https://trainus.vercel.app'
        : ''

    const response = await fetch(
      `${baseUrl}/api/proxy/api/v1/lessons/${lessonId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    console.log('레슨 상세 조회 응답:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('레슨 상세 조회 에러 데이터:', errorData)
      throw new Error(
        `레슨 상세 조회 실패: ${errorData.message || response.status}`,
      )
    }

    const data = await response.json()
    console.log('레슨 상세 조회 성공 데이터:', data)
    return data
  } catch (error) {
    console.error('Error fetching lesson detail:', error)
    throw error
  }
}

// 레슨 생성 API
export const createLesson = async (lessonData: any) => {
  try {
    console.log('레슨 생성 요청 데이터:', lessonData)

    const response = await fetch('/api/proxy/api/v1/lessons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData),
      credentials: 'include',
    })

    console.log('레슨 생성 응답:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('레슨 생성 에러 데이터:', errorData)
      throw new Error(`레슨 생성 실패: ${errorData.message || response.status}`)
    }

    const data = await response.json()
    console.log('레슨 생성 성공 데이터:', data)
    return data
  } catch (error) {
    console.error('Error creating lesson:', error)
    throw error
  }
}

// 레슨 삭제 API
export const deleteLesson = async (lessonId: string) => {
  try {
    const response = await fetch(`/api/proxy/api/v1/lessons/${lessonId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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

// 레슨 신청 API
export const applyLesson = async (lessonId: string | number) => {
  try {
    console.log('레슨 신청 요청, 레슨 ID:', lessonId)

    const response = await fetch(
      `/api/proxy/api/v1/lessons/${lessonId}/application`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    console.log('레슨 신청 응답:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('레슨 신청 에러 데이터:', errorData)
      throw new Error(`레슨 신청 실패: ${errorData.message || response.status}`)
    }

    const data = await response.json()
    console.log('레슨 신청 성공 데이터:', data)
    return data
  } catch (error) {
    console.error('Error applying to lesson:', error)
    throw error
  }
}

// 레슨 신청 취소 API
export const cancelLessonApplication = async (lessonId: string | number) => {
  try {
    console.log('레슨 신청 취소 요청, 레슨 ID:', lessonId)

    const response = await fetch(
      `/api/proxy/api/v1/lessons/${lessonId}/cancel`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    console.log('레슨 신청 취소 응답:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('레슨 신청 취소 에러 데이터:', errorData)
      throw new Error(
        `레슨 신청 취소 실패: ${errorData.message || response.status}`,
      )
    }

    const data = await response.json()
    console.log('레슨 신청 취소 성공 데이터:', data)
    return data
  } catch (error) {
    console.error('Error canceling lesson application:', error)
    throw error
  }
}

// 강사용 API 함수들

// 레슨 신청자 목록 조회 (강사용)
export const getLessonApplications = async (lessonId: string) => {
  try {
    const response = await fetch(
      `/api/proxy/api/v1/lessons/${lessonId}/applications`,
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
      `/api/proxy/api/v1/lessons/applications/${lessonApplicationId}`,
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
      `/api/proxy/api/v1/lessons/${lessonId}/participants`,
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
export const getInstructorCreatedLessons = async (userId: number) => {
  try {
    const response = await fetch(
      `/api/proxy/api/v1/lessons/${userId}/created-lessons`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
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
    const response = await fetch('/api/proxy/api/v1/rankings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
    const response = await fetch(`/api/proxy/api/v1/rankings/${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
    const response = await fetch(`/api/proxy/api/v1/reviews/${lessonId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
      credentials: 'include',
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
export const updateProfileImage = async (url: string | null) => {
  try {
    const response = await fetch('/api/proxy/api/v1/profiles/image', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profileImage: url
          ? 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          : null,
      }),
      credentials: 'include',
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
    const response = await fetch('/api/proxy/api/v1/lessons/my-applications', {
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
