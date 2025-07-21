import type { components } from '../../types/swagger-generated'
import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants'

// 타입 별칭 정의
export type CommentResponse = components['schemas']['CommentResponseDto']
export type CommentCreateRequest =
  components['schemas']['CommentCreateRequestDto']

// API 응답 타입
export type CommentApiResponse =
  components['schemas']['BaseResponseCommentResponseDto']
export type CommentPageApiResponse =
  components['schemas']['BaseResponseCommentPageResponseDto']
export type VoidApiResponse = components['schemas']['BaseResponseVoid']

/**
 * 댓글 목록 조회
 * @param lessonId 레슨 ID
 * @param page 페이지 번호
 * @param pageSize 페이지 크기
 * @returns 댓글 목록
 */
export const getComments = async (
  lessonId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<CommentPageApiResponse> => {
  const searchParams = new URLSearchParams()
  searchParams.append('page', page.toString())
  searchParams.append('pageSize', pageSize.toString())

  const response = await apiClient.get<CommentPageApiResponse>(
    `${API_ENDPOINTS.COMMENTS.LIST(lessonId)}?${searchParams.toString()}`,
  )
  return response
}

/**
 * 댓글 작성
 * @param lessonId 레슨 ID
 * @param commentData 댓글 데이터
 * @returns 작성된 댓글 정보
 */
export const createComment = async (
  lessonId: string,
  commentData: CommentCreateRequest,
): Promise<CommentApiResponse> => {
  const response = await apiClient.post<CommentApiResponse>(
    API_ENDPOINTS.COMMENTS.CREATE(lessonId),
    commentData,
  )
  return response
}

/**
 * 댓글 삭제
 * @param commentId 댓글 ID
 * @returns 삭제 결과
 */
export const deleteComment = async (
  commentId: string,
): Promise<VoidApiResponse> => {
  const response = await apiClient.delete<VoidApiResponse>(
    API_ENDPOINTS.COMMENTS.DELETE(commentId),
  )
  return response
}
