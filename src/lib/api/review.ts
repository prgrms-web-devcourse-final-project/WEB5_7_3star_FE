import type { components } from '@/types/swagger-generated'
import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants'

// 타입 별칭 정의
export type ReviewCreateRequest =
  components['schemas']['ReviewCreateRequestDto']
export type ReviewCreateResponse =
  components['schemas']['ReviewCreateResponseDto']
export type ReviewViewResponse = components['schemas']['ReviewViewResponseDto']

// API 응답 타입
export type ReviewCreateApiResponse =
  components['schemas']['BaseResponseReviewCreateResponseDto']
export type ReviewPageApiResponse = any

// 최적화된 페이징 응답 타입
export interface OptimizedPaginationResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    totalCount: number // limit까지만 세는 값
    hasNext: boolean // 다음 구간이 있는지 여부
  }
}

/**
 * 리뷰 작성
 * @param lessonId 레슨 ID
 * @param reviewData 리뷰 데이터
 * @returns 작성된 리뷰 정보
 */
export const createReview = async (
  lessonId: string,
  reviewData: ReviewCreateRequest,
): Promise<ReviewCreateApiResponse> => {
  const response = await apiClient.post<ReviewCreateApiResponse>(
    API_ENDPOINTS.REVIEWS.CREATE(lessonId),
    reviewData,
  )
  return response.data
}

/**
 * 사용자 리뷰 목록 조회 (해당 사용자가 받은 리뷰)
 * @param userId 사용자 ID
 * @param page 페이지 번호
 * @param pageSize 페이지 크기
 * @returns 리뷰 목록
 */
export const getUserReviews = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<any> => {
  try {
    const searchParams = new URLSearchParams()
    searchParams.append('page', page.toString())
    searchParams.append('pageSize', pageSize.toString())

    // 프로필 관련 엔드포인트로 변경
    const response = await fetch(
      `/api/proxy/api/v1/profiles/${userId}/reviews?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      console.warn(
        `사용자 리뷰 조회 실패 (${response.status}): API가 구현되지 않았을 수 있습니다.`,
      )
      // 400/404 에러인 경우 빈 배열 반환 (API 미구현 대응)
      if (response.status === 400 || response.status === 404) {
        return {
          data: {
            reviews: [],
          },
        }
      }
      throw new Error(`사용자 리뷰 조회 실패: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('사용자 리뷰 조회 에러:', error)
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

/**
 * 레슨별 리뷰 목록 조회
 * @param lessonId 레슨 ID
 * @param page 페이지 번호
 * @param pageSize 페이지 크기
 * @returns 리뷰 목록
 */
export const getLessonReviews = async (
  lessonId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<any> => {
  const searchParams = new URLSearchParams()
  searchParams.append('page', page.toString())
  searchParams.append('pageSize', pageSize.toString())

  try {
    const response = await fetch(
      `/api/proxy/api/v1/lessons/${lessonId}/reviews?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      throw new Error(`레슨 리뷰 조회 실패: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('레슨 리뷰 조회 에러:', error)
    throw error
  }
}
