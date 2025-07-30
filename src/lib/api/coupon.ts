import type { components } from '../../types/swagger-generated'

// 쿠폰 타입 정의
export interface Coupon {
  couponId: number
  couponName: string
  discountPrice: string
  minOrderPrice: number
  expirationDate: string
  ownedStatus: 'NOT_OWNED' | 'OWNED' | 'EXPIRED'
  quantity: number
  category: 'OPEN_RUN' | 'NORMAL'
  openTime: string
}

export interface MyCoupon {
  couponId: number
  couponName: string
  discountPrice: string
  minOrderPrice: number
  expirationDate: string
  ownedStatus: 'NOT_OWNED' | 'OWNED' | 'EXPIRED'
  quantity: number
  category: 'OPEN_RUN' | 'NORMAL'
  openTime: string
}

export interface CouponListResponse {
  coupons: Coupon[]
  totalCount?: number
}

export interface MyCouponListResponse {
  userCoupons: MyCoupon[]
}

// API 응답 타입
export interface CouponListApiResponse {
  status?: number
  message?: string
  data?: CouponListResponse
}

export interface MyCouponListApiResponse {
  status?: number
  message?: string
  data?: MyCouponListResponse
}

export interface VoidApiResponse {
  status?: number
  message?: string
  data?: any
}

export interface AdminCouponListWithCount {
  coupons: components['schemas']['CouponListItemDto'][]
  count: number
}

/**
 * 발급 가능한 쿠폰 목록 조회
 */
export const getAvailableCoupons = async (): Promise<CouponListApiResponse> => {
  try {
    console.log('발급 가능한 쿠폰 목록 조회 시작')

    const response = await fetch('/api/proxy/api/v1/coupons', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    console.log('쿠폰 목록 조회 응답:', {
      status: response.status,
      statusText: response.statusText,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('쿠폰 목록 조회 에러:', errorData)
      throw new Error(
        errorData.message || `쿠폰 목록 조회 실패: ${response.status}`,
      )
    }

    const data = await response.json()
    console.log('쿠폰 목록 조회 성공:', data)
    return data
  } catch (error) {
    console.error('쿠폰 목록 조회 실패:', error)
    throw error
  }
}

/**
 * 내 쿠폰 목록 조회
 */
export const getMyCoupons = async (): Promise<MyCouponListApiResponse> => {
  try {
    console.log('내 쿠폰 목록 조회 시작')

    const response = await fetch('/api/proxy/api/v1/coupons/my-coupons', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    console.log('내 쿠폰 목록 조회 응답:', {
      status: response.status,
      statusText: response.statusText,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('내 쿠폰 목록 조회 에러:', errorData)
      throw new Error(
        errorData.message || `내 쿠폰 목록 조회 실패: ${response.status}`,
      )
    }

    const data = await response.json()
    console.log('내 쿠폰 목록 조회 성공:', data)
    return data
  } catch (error) {
    console.error('내 쿠폰 목록 조회 실패:', error)
    throw error
  }
}

/**
 * 쿠폰 발급
 */
export const issueCoupon = async (
  couponId: string,
): Promise<VoidApiResponse> => {
  try {
    console.log('쿠폰 발급 시작:', couponId)

    const response = await fetch(`/api/proxy/api/v1/coupons/${couponId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    console.log('쿠폰 발급 응답:', {
      status: response.status,
      statusText: response.statusText,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('쿠폰 발급 에러:', errorData)
      throw new Error(errorData.message || `쿠폰 발급 실패: ${response.status}`)
    }

    const data = await response.json()
    console.log('쿠폰 발급 성공:', data)
    return data
  } catch (error) {
    console.error('쿠폰 발급 실패:', error)
    throw error
  }
}

/**
 * 쿠폰 사용 (특정 사용자용)
 */
export const useCoupon = async (
  userId: string,
  couponId: string,
): Promise<VoidApiResponse> => {
  try {
    console.log('쿠폰 사용 시작:', { userId, couponId })

    const response = await fetch(
      `/api/proxy/api/v1/coupons/${userId}/use/${couponId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    console.log('쿠폰 사용 응답:', {
      status: response.status,
      statusText: response.statusText,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('쿠폰 사용 에러:', errorData)
      throw new Error(errorData.message || `쿠폰 사용 실패: ${response.status}`)
    }

    const data = await response.json()
    console.log('쿠폰 사용 성공:', data)
    return data
  } catch (error) {
    console.error('쿠폰 사용 실패:', error)
    throw error
  }
}

/**
 * 관리자 쿠폰 생성
 */
export const createAdminCoupon = async (
  couponData: components['schemas']['CouponCreateRequestDto'],
): Promise<components['schemas']['CouponCreateResponseDto']> => {
  try {
    const response = await fetch('/api/proxy/api/v1/admin/coupons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(couponData),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('관리자 쿠폰 생성 에러:', errorData)
      throw new Error(
        errorData.message || `관리자 쿠폰 생성 실패: ${response.status}`,
      )
    }

    return response.json()
  } catch (error) {
    console.error('관리자 쿠폰 생성 실패:', error)
    throw error
  }
}

/**
 * 관리자 쿠폰 목록 조회
 */
export const getAdminCoupons = async (
  page: number = 1,
  pageSize: number = 10,
): Promise<AdminCouponListWithCount> => {
  try {
    const url = `/api/proxy/api/v1/admin/coupons?page=${page}&pageSize=${pageSize}`
    console.log('관리자 쿠폰 목록 조회 URL:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    console.log('관리자 쿠폰 목록 조회 응답:', {
      status: response.status,
      statusText: response.statusText,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('관리자 쿠폰 목록 조회 에러:', errorData)
      throw new Error(
        errorData.message || `관리자 쿠폰 목록 조회 실패: ${response.status}`,
      )
    }

    const data = await response.json()
    console.log('관리자 쿠폰 목록 조회 성공:', data)
    console.log('응답 구조 디버그:', {
      data: data.data,
      count: data.count,
      coupons: data.data?.coupons,
      couponsLength: data.data?.coupons?.length,
    })

    return {
      coupons: data.data?.coupons || [],
      count: data.count || 0,
    }
  } catch (error) {
    console.error('관리자 쿠폰 목록 조회 실패:', error)
    throw error
  }
}

/**
 * 관리자 쿠폰 상세 조회
 */
export const getAdminCouponDetail = async (couponId: string): Promise<any> => {
  try {
    console.log('관리자 쿠폰 상세 조회 시작:', couponId)

    const response = await fetch(
      `/api/proxy/api/v1/admin/coupons/${couponId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    console.log('관리자 쿠폰 상세 조회 응답:', {
      status: response.status,
      statusText: response.statusText,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('관리자 쿠폰 상세 조회 에러:', errorData)
      throw new Error(
        errorData.message || `관리자 쿠폰 상세 조회 실패: ${response.status}`,
      )
    }

    const data = await response.json()
    console.log('관리자 쿠폰 상세 조회 성공:', data)
    return data
  } catch (error) {
    console.error('관리자 쿠폰 상세 조회 실패:', error)
    throw error
  }
}

/**
 * 관리자 쿠폰 수정
 */
export const updateAdminCoupon = async (
  couponId: string,
  couponData: any,
): Promise<VoidApiResponse> => {
  try {
    console.log('관리자 쿠폰 수정 시작:', { couponId, couponData })

    const response = await fetch(
      `/api/proxy/api/v1/admin/coupons/${couponId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData),
        credentials: 'include',
      },
    )

    console.log('관리자 쿠폰 수정 응답:', {
      status: response.status,
      statusText: response.statusText,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('관리자 쿠폰 수정 에러:', errorData)
      throw new Error(
        errorData.message || `관리자 쿠폰 수정 실패: ${response.status}`,
      )
    }

    const data = await response.json()
    console.log('관리자 쿠폰 수정 성공:', data)
    return data
  } catch (error) {
    console.error('관리자 쿠폰 수정 실패:', error)
    throw error
  }
}

/**
 * 관리자 쿠폰 삭제
 */
export const deleteAdminCoupon = async (
  couponId: string,
): Promise<components['schemas']['CouponDeleteResponseDto']> => {
  try {
    console.log('관리자 쿠폰 삭제 시작:', couponId)

    const response = await fetch(
      `/api/proxy/api/v1/admin/coupons/${couponId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    console.log('관리자 쿠폰 삭제 응답:', {
      status: response.status,
      statusText: response.statusText,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('관리자 쿠폰 삭제 에러:', errorData)
      throw new Error(
        errorData.message || `관리자 쿠폰 삭제 실패: ${response.status}`,
      )
    }

    const data = await response.json()
    console.log('관리자 쿠폰 삭제 성공:', data)
    return data
  } catch (error) {
    console.error('관리자 쿠폰 삭제 실패:', error)
    throw error
  }
}
