import { apiClient, ApiResponse } from './api-client'
import { API_ENDPOINTS } from '@/lib/constants'

// 댓글 관련 타입 정의
export interface Comment {
  id: number
  lessonId: number
  userId: number
  content: string
  parentCommentId?: number | null
  deleted: boolean
  createdAt: string
}

export interface CreateCommentRequest {
  content: string
  parentCommentId?: number | null
}

export interface CommentListResponse {
  comments: Comment[]
  pagination?: {
    currentPage: number
    totalPages: number
    totalCount: number
    limit: number
  }
}

// 댓글 등록 API
export async function createComment(
  lessonId: number,
  commentData: CreateCommentRequest,
): Promise<ApiResponse<Comment>> {
  return apiClient.post<ApiResponse<Comment>>(
    API_ENDPOINTS.COMMENTS.CREATE(lessonId.toString()),
    commentData,
  )
}

// 댓글 목록 조회 API
export async function getComments(
  lessonId: number,
  page?: number,
  limit?: number,
): Promise<ApiResponse<CommentListResponse>> {
  const params = new URLSearchParams()
  if (page) params.append('page', page.toString())
  if (limit) params.append('limit', limit.toString())

  const queryString = params.toString()
  const endpoint = queryString
    ? `${API_ENDPOINTS.COMMENTS.CREATE(lessonId.toString())}?${queryString}`
    : API_ENDPOINTS.COMMENTS.CREATE(lessonId.toString())

  return apiClient.get<ApiResponse<CommentListResponse>>(endpoint)
}

// 댓글 수정 API
export async function updateComment(
  commentId: number,
  content: string,
): Promise<ApiResponse<Comment>> {
  return apiClient.patch<ApiResponse<Comment>>(
    `/api/v1/comments/${commentId}`,
    { content },
  )
}

// 댓글 삭제 API
export async function deleteComment(
  commentId: number,
): Promise<ApiResponse<Record<string, never>>> {
  return apiClient.delete<ApiResponse<Record<string, never>>>(
    API_ENDPOINTS.COMMENTS.DELETE(commentId.toString()),
  )
}
