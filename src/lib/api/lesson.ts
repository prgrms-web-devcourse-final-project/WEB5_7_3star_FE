import type {
  ApiLesson,
  ApiLessonDetail,
  ApiResponse,
  CreatedLessonsParams,
  CreatedLessonsResponse,
  CreateLessonRequest,
  CreateLessonResponse,
  LessonApplicantsParams,
  LessonApplicantsResponse,
  LessonApplication,
  LessonApplicationResponse,
  LessonListResponse,
  LessonParticipantsParams,
  LessonParticipantsResponse,
  LessonSearchParams,
  LessonSummary,
  LessonSummaryResponse,
  MyLessonApplicationsParams,
  MyLessonApplicationsResponse,
  ProcessApplicationResponse,
} from '../../types'
import { API_ENDPOINTS } from '../constants'
import { apiClient } from './api-client'

/**
 * 레슨 목록 조회
 * @param params 검색 파라미터
 * @returns 레슨 목록과 총 개수
 */
export const getLessons = async (
  params: LessonSearchParams,
): Promise<LessonListResponse> => {
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

  const response = await apiClient.get<LessonListResponse>(
    `${API_ENDPOINTS.LESSONS.LIST}?${searchParams.toString()}`,
  )

  return response
}

/**
 * 레슨 신청자 목록 조회
 * @param lessonId 레슨 ID
 * @param params 조회 파라미터
 * @returns 레슨 신청자 목록
 */
export const getLessonApplicants = async (
  lessonId: string,
  params?: LessonApplicantsParams,
): Promise<LessonApplicantsResponse> => {
  const searchParams = new URLSearchParams()

  // 선택 파라미터
  if (params?.page) {
    searchParams.append('page', params.page.toString())
  }
  if (params?.limit) {
    searchParams.append('limit', params.limit.toString())
  }
  if (params?.status) {
    searchParams.append('status', params.status)
  }

  const response = await apiClient.get<LessonApplicantsResponse>(
    `${API_ENDPOINTS.LESSONS.APPLICANTS(lessonId)}?${searchParams.toString()}`,
  )

  return response
}

/**
 * 레슨 신청 승인/거절
 * @param applicationId 신청 ID
 * @param action 승인 또는 거절
 * @returns 처리 결과
 */
export const processLessonApplication = async (
  applicationId: string,
  action: 'APPROVED' | 'DENIED',
): Promise<ProcessApplicationResponse['data']> => {
  const response = await apiClient.put<ProcessApplicationResponse>(
    API_ENDPOINTS.LESSONS.PROCESS_APPLICATION(applicationId),
    { action },
  )

  return response.data
}

/**
 * 레슨 참가자 목록 조회
 * @param lessonId 레슨 ID
 * @param params 조회 파라미터
 * @returns 레슨 참가자 목록
 */
export const getLessonParticipants = async (
  lessonId: string,
  params?: LessonParticipantsParams,
): Promise<LessonParticipantsResponse> => {
  const searchParams = new URLSearchParams()

  // 선택 파라미터
  if (params?.page) {
    searchParams.append('page', params.page.toString())
  }
  if (params?.limit) {
    searchParams.append('limit', params.limit.toString())
  }

  const response = await apiClient.get<LessonParticipantsResponse>(
    `${API_ENDPOINTS.LESSONS.PARTICIPANTS(lessonId)}?${searchParams.toString()}`,
  )

  return response
}

/**
 * 개설한 레슨 목록 조회
 * @param userId 사용자 ID
 * @param params 조회 파라미터
 * @returns 개설한 레슨 목록
 */
export const getCreatedLessons = async (
  userId: string,
  params?: CreatedLessonsParams,
): Promise<CreatedLessonsResponse> => {
  const searchParams = new URLSearchParams()

  // 선택 파라미터
  if (params?.page) {
    searchParams.append('page', params.page.toString())
  }
  if (params?.limit) {
    searchParams.append('limit', params.limit.toString())
  }
  if (params?.status) {
    searchParams.append('status', params.status)
  }

  const response = await apiClient.get<CreatedLessonsResponse>(
    `${API_ENDPOINTS.LESSONS.CREATED_LESSONS(userId)}?${searchParams.toString()}`,
  )

  return response
}

/**
 * 레슨 간략 조회
 * @param id 레슨 ID
 * @returns 레슨 간략 정보
 */
export const getLessonSummary = async (id: string): Promise<LessonSummary> => {
  const response = await apiClient.get<LessonSummaryResponse>(
    API_ENDPOINTS.LESSONS.SUMMARY(id),
  )

  return response.data
}

/**
 * 레슨 상세 조회
 * @param id 레슨 ID
 * @returns 레슨 상세 정보
 */
export const getLessonDetail = async (id: string): Promise<ApiLessonDetail> => {
  const response = await apiClient.get<ApiResponse<ApiLessonDetail>>(
    API_ENDPOINTS.LESSONS.DETAIL(id),
  )

  return response.data
}

/**
 * 레슨 등록
 * @param lessonData 레슨 등록 데이터
 * @returns 등록된 레슨 정보
 */
export const createLesson = async (
  lessonData: CreateLessonRequest,
): Promise<CreateLessonResponse['data']> => {
  const response = await apiClient.post<CreateLessonResponse>(
    API_ENDPOINTS.LESSONS.CREATE,
    lessonData,
  )

  return response.data
}

/**
 * 레슨 수정
 * @param id 레슨 ID
 * @param lessonData 수정할 레슨 데이터
 * @returns 수정된 레슨 정보
 */
export const updateLesson = async (
  id: string,
  lessonData: Partial<ApiLesson>,
): Promise<ApiLesson> => {
  const response = await apiClient.put<ApiResponse<ApiLesson>>(
    API_ENDPOINTS.LESSONS.UPDATE(id),
    lessonData,
  )

  return response.data
}

/**
 * 레슨 삭제
 * @param id 레슨 ID
 * @returns 삭제 성공 여부
 */
export const deleteLesson = async (id: string): Promise<boolean> => {
  await apiClient.delete(API_ENDPOINTS.LESSONS.DELETE(id))
  return true
}

/**
 * 레슨 신청
 * @param id 레슨 ID
 * @returns 레슨 신청 결과
 */
export const applyLesson = async (id: string): Promise<LessonApplication> => {
  const response = await apiClient.post<LessonApplicationResponse>(
    API_ENDPOINTS.LESSONS.APPLY(id),
  )

  return response.data
}

/**
 * 레슨 신청 취소
 * @param id 레슨 ID
 * @returns 취소 성공 여부
 */
export const cancelLessonApplication = async (id: string): Promise<boolean> => {
  await apiClient.delete(API_ENDPOINTS.LESSONS.CANCEL_APPLICATION(id))
  return true
}

/**
 * 내 레슨 신청 목록 조회
 * @param params 조회 파라미터
 * @returns 내 레슨 신청 목록
 */
export const getMyLessonApplications = async (
  params?: MyLessonApplicationsParams,
): Promise<MyLessonApplicationsResponse> => {
  const searchParams = new URLSearchParams()

  // 선택 파라미터
  if (params?.page) {
    searchParams.append('page', params.page.toString())
  }
  if (params?.limit) {
    searchParams.append('limit', params.limit.toString())
  }
  if (params?.status) {
    searchParams.append('status', params.status)
  }

  const response = await apiClient.get<MyLessonApplicationsResponse>(
    `${API_ENDPOINTS.LESSONS.MY_APPLICATIONS}?${searchParams.toString()}`,
  )

  return response
}
