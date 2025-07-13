import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants'
import type { RankingsResponse, RankingsParams } from '../../types'

/**
 * 트레이너 랭킹 조회
 * @param params 조회 파라미터
 * @returns 트레이너 랭킹 목록
 */
export const getRankings = async (
  params: RankingsParams,
): Promise<RankingsResponse> => {
  const searchParams = new URLSearchParams()

  // 필수 파라미터
  searchParams.append('category', params.category)

  // 선택 파라미터
  if (params.limit) {
    searchParams.append('limit', params.limit.toString())
  }

  const response = await apiClient.get<RankingsResponse>(
    `${API_ENDPOINTS.RANKINGS.LIST}?${searchParams.toString()}`,
  )

  return response
}
