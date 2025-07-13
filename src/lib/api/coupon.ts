import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants'
import type {
  IssueCouponResponse,
  MyCouponsResponse,
  MyCouponsParams,
  AvailableCouponsResponse,
  AvailableCouponsParams,
  IssuableCouponsResponse,
} from '../../types'

/**
 * 쿠폰 발급
 * @param couponId 쿠폰 ID
 * @returns 발급된 쿠폰 정보
 */
export const issueCoupon = async (
  couponId: string,
): Promise<IssueCouponResponse['data']> => {
  const response = await apiClient.post<IssueCouponResponse>(
    API_ENDPOINTS.COUPONS.ISSUE(couponId),
    {},
  )

  return response.data
}

/**
 * 내 쿠폰 목록 조회
 * @param params 조회 파라미터
 * @returns 내 쿠폰 목록
 */
export const getMyCoupons = async (
  params?: MyCouponsParams,
): Promise<MyCouponsResponse> => {
  const searchParams = new URLSearchParams()

  // 선택 파라미터
  if (params?.status) {
    searchParams.append('status', params.status)
  }

  const response = await apiClient.get<MyCouponsResponse>(
    `${API_ENDPOINTS.COUPONS.MY_COUPONS}?${searchParams.toString()}`,
  )

  return response
}

/**
 * 사용 가능한 쿠폰 조회 (결제 시 사용)
 * @param userId 사용자 ID
 * @param couponId 쿠폰 ID
 * @param params 조회 파라미터
 * @returns 사용 가능한 쿠폰 정보
 */
export const getAvailableCoupon = async (
  userId: string,
  couponId: string,
  params: AvailableCouponsParams,
): Promise<AvailableCouponsResponse> => {
  const searchParams = new URLSearchParams()

  // 필수 파라미터
  searchParams.append('status', params.status)

  // 선택 파라미터
  if (params.expired !== undefined) {
    searchParams.append('expired', params.expired.toString())
  }

  const response = await apiClient.get<AvailableCouponsResponse>(
    `${API_ENDPOINTS.COUPONS.AVAILABLE_COUPONS(userId, couponId)}?${searchParams.toString()}`,
  )

  return response
}

/**
 * 발급 가능한 쿠폰 목록 조회
 * @returns 발급 가능한 쿠폰 목록
 */
export const getIssuableCoupons =
  async (): Promise<IssuableCouponsResponse> => {
    const response = await apiClient.get<IssuableCouponsResponse>(
      API_ENDPOINTS.COUPONS.LIST,
    )

    return response
  }
