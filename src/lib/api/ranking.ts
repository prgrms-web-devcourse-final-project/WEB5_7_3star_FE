import type { components } from '../../types/swagger-generated'
import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants'

// 타입 별칭 정의
export type RankingsParams = {
  category: string
  limit?: number
}

export type RankingResponse = components['schemas']['RankingResponseDto']

// API 응답 타입
export type RankingsApiResponse =
  components['schemas']['BaseResponseListRankingResponseDto']

/**
 * 트레이너 랭킹 조회
 * @param params 조회 파라미터
 * @returns 트레이너 랭킹 목록
 */
export const getRankings = async (
  params: RankingsParams,
): Promise<RankingsApiResponse> => {
  const searchParams = new URLSearchParams()

  // 필수 파라미터
  searchParams.append('category', params.category)

  // 선택 파라미터
  if (params.limit) {
    searchParams.append('limit', params.limit.toString())
  }

  const response = await apiClient.get<RankingsApiResponse>(
    `${API_ENDPOINTS.RANKINGS.LIST}?${searchParams.toString()}`,
  )

  return response
}
