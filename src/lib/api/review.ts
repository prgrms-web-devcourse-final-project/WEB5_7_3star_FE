import type { components } from '../../types/swagger-generated'
import { apiClient } from './api-client'

// 타입 별칭 정의
export type ReviewCreateRequest =
  components['schemas']['ReviewCreateRequestDto']
export type ReviewCreateResponse =
  components['schemas']['ReviewCreateResponseDto']
export type ReviewViewResponse = components['schemas']['ReviewViewResponseDto']

// API 응답 타입
export type ReviewCreateApiResponse =
  components['schemas']['BaseResponseReviewCreateResponseDto']
export type ReviewPageApiResponse =
  components['schemas']['BaseResponseReviewPageResponseDto']

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
    `/api/v1/reviews/${lessonId}`,
    reviewData,
  )
  return response
}

/**
 * 사용자 리뷰 목록 조회
 * @param userId 사용자 ID
 * @param page 페이지 번호
 * @param pageSize 페이지 크기
 * @returns 리뷰 목록
 */
export const getUserReviews = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<ReviewPageApiResponse> => {
  const searchParams = new URLSearchParams()
  searchParams.append('page', page.toString())
  searchParams.append('pageSize', pageSize.toString())

  const response = await apiClient.get<ReviewPageApiResponse>(
    `/api/v1/reviews/${userId}?${searchParams.toString()}`,
  )
  return response
}
