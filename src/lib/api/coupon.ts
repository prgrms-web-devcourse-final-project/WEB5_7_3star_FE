import type { components } from '../../types/swagger-generated'
import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants'

// 타입 별칭 정의
export type CouponResponse = components['schemas']['CouponResponseDto']
export type UserCouponResponse = components['schemas']['UserCouponResponseDto']
export type CreateUserCouponResponse =
  components['schemas']['CreateUserCouponResponseDto']

// API 응답 타입
export type CouponsApiResponse =
  components['schemas']['BaseResponseCouponPageResponseDto']
export type UserCouponsApiResponse =
  components['schemas']['BaseResponseUserCouponPageResponseDto']
export type CreateUserCouponApiResponse =
  components['schemas']['BaseResponseCreateUserCouponResponseDto']

/**
 * 쿠폰 목록 조회
 * @returns 쿠폰 목록
 */
export const getCoupons = async (): Promise<CouponsApiResponse> => {
  const response = await apiClient.get<CouponsApiResponse>(
    API_ENDPOINTS.COUPONS.LIST,
  )
  return response
}

/**
 * 내 쿠폰 목록 조회
 * @param status 쿠폰 상태 필터
 * @returns 내 쿠폰 목록
 */
export const getMyCoupons = async (
  status?: 'ACTIVE' | 'INACTIVE',
): Promise<UserCouponsApiResponse> => {
  const searchParams = new URLSearchParams()

  if (status) {
    searchParams.append('status', status)
  }

  const response = await apiClient.get<UserCouponsApiResponse>(
    `${API_ENDPOINTS.COUPONS.MY_COUPONS}?${searchParams.toString()}`,
  )
  return response
}

/**
 * 쿠폰 발급
 * @param couponId 쿠폰 ID
 * @returns 발급 결과
 */
export const issueCoupon = async (
  couponId: string,
): Promise<CreateUserCouponApiResponse> => {
  const response = await apiClient.post<CreateUserCouponApiResponse>(
    API_ENDPOINTS.COUPONS.ISSUE(couponId),
  )
  return response
}
