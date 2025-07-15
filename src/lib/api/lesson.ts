import type { components } from '../../types/swagger-generated'
import { API_ENDPOINTS } from '../constants'
import { apiClient } from './api-client'

// 타입 별칭 정의
export type LessonSearchParams = {
  page?: number
  limit?: number
  category: string
  search?: string
  city: string
  district: string
  dong: string
}

export type LessonSearchResponse =
  components['schemas']['LessonSearchResponseDto']
export type LessonDetailResponse =
  components['schemas']['LessonDetailResponseDto']
export type LessonCreateRequest =
  components['schemas']['LessonCreateRequestDto']
export type LessonResponse = components['schemas']['LessonResponseDto']
export type LessonApplicationResponse =
  components['schemas']['LessonApplicationResponseDto']
export type ApplicationActionRequest =
  components['schemas']['ApplicationActionRequestDto']
export type ApplicationProcessResponse =
  components['schemas']['ApplicationProcessResponseDto']

// API 응답 타입
export type LessonSearchApiResponse =
  components['schemas']['BaseResponseLessonSearchListResponseDto']
export type LessonDetailApiResponse =
  components['schemas']['BaseResponseLessonDetailResponseDto']
export type LessonCreateApiResponse =
  components['schemas']['BaseResponseLessonResponseDto']
export type LessonApplicationApiResponse =
  components['schemas']['BaseResponseLessonApplicationResponseDto']
export type ApplicationProcessApiResponse =
  components['schemas']['BaseResponseApplicationProcessResponseDto']
export type VoidApiResponse = components['schemas']['BaseResponseVoid']

/**
 * 레슨 목록 조회
 * @param params 검색 파라미터
 * @returns 레슨 목록과 총 개수
 */
export const getLessons = async (
  params: LessonSearchParams,
): Promise<LessonSearchApiResponse> => {
  const searchParams = new URLSearchParams()

  // 필수 파라미터
  searchParams.append('category', params.category)
  searchParams.append('city', params.city)
  searchParams.append('district', params.district)
  searchParams.append('dong', params.dong)

  // 선택 파라미터
  if (params.page) {
    searchParams.append('page', params.page.toString())
  }
  if (params.limit) {
    searchParams.append('limit', params.limit.toString())
  }
  if (params.search) {
    searchParams.append('search', params.search)
  }

  const response = await apiClient.get<LessonSearchApiResponse>(
    `${API_ENDPOINTS.LESSONS.LIST}?${searchParams.toString()}`,
  )

  return response
}

/**
 * 레슨 상세 조회
 * @param id 레슨 ID
 * @returns 레슨 상세 정보
 */
export const getLessonDetail = async (
  id: string,
): Promise<LessonDetailApiResponse> => {
  const response = await apiClient.get<LessonDetailApiResponse>(
    API_ENDPOINTS.LESSONS.DETAIL(id),
  )
  return response
}

/**
 * 레슨 생성
 * @param lessonData 레슨 생성 데이터
 * @returns 생성된 레슨 정보
 */
export const createLesson = async (
  lessonData: LessonCreateRequest,
): Promise<LessonCreateApiResponse> => {
  const response = await apiClient.post<LessonCreateApiResponse>(
    API_ENDPOINTS.LESSONS.CREATE,
    lessonData,
  )
  return response
}

/**
 * 레슨 수정
 * @param id 레슨 ID
 * @param lessonData 레슨 수정 데이터
 * @returns 수정된 레슨 정보
 */
export const updateLesson = async (
  id: string,
  lessonData: Partial<LessonCreateRequest>,
): Promise<LessonCreateApiResponse> => {
  const response = await apiClient.put<LessonCreateApiResponse>(
    API_ENDPOINTS.LESSONS.UPDATE(id),
    lessonData,
  )
  return response
}

/**
 * 레슨 삭제
 * @param id 레슨 ID
 * @returns 삭제 결과
 */
export const deleteLesson = async (id: string): Promise<VoidApiResponse> => {
  const response = await apiClient.delete<VoidApiResponse>(
    API_ENDPOINTS.LESSONS.DELETE(id),
  )
  return response
}

/**
 * 레슨 신청
 * @param id 레슨 ID
 * @returns 신청 결과
 */
export const applyLesson = async (
  id: string,
): Promise<LessonApplicationApiResponse> => {
  const response = await apiClient.post<LessonApplicationApiResponse>(
    API_ENDPOINTS.LESSONS.APPLY(id),
  )
  return response
}

/**
 * 레슨 신청 취소
 * @param id 레슨 ID
 * @returns 취소 결과
 */
export const cancelLessonApplication = async (
  id: string,
): Promise<VoidApiResponse> => {
  const response = await apiClient.delete<VoidApiResponse>(
    API_ENDPOINTS.LESSONS.CANCEL_APPLICATION(id),
  )
  return response
}

/**
 * 내 레슨 신청 목록 조회
 * @param params 조회 파라미터
 * @returns 내 레슨 신청 목록
 */
export const getMyLessonApplications = async (
  params: {
    page?: number
    limit?: number
    status?: string
  } = {},
): Promise<
  components['schemas']['BaseResponseMyLessonApplicationListResponseDto']
> => {
  const searchParams = new URLSearchParams()

  if (params.page) {
    searchParams.append('page', params.page.toString())
  }
  if (params.limit) {
    searchParams.append('limit', params.limit.toString())
  }
  if (params.status) {
    searchParams.append('status', params.status)
  }

  const response = await apiClient.get<
    components['schemas']['BaseResponseMyLessonApplicationListResponseDto']
  >(`${API_ENDPOINTS.LESSONS.MY_APPLICATIONS}?${searchParams.toString()}`)
  return response
}

/**
 * 레슨 신청 처리 (승인/거절)
 * @param applicationId 신청 ID
 * @param action 처리 액션
 * @returns 처리 결과
 */
export const processLessonApplication = async (
  applicationId: string,
  action: 'APPROVED' | 'DENIED',
): Promise<ApplicationProcessApiResponse> => {
  const response = await apiClient.post<ApplicationProcessApiResponse>(
    API_ENDPOINTS.LESSONS.PROCESS_APPLICATION(applicationId),
    { action },
  )
  return response
}
