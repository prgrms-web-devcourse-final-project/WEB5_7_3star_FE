import { components } from '@/types/swagger-generated'
import { apiClient } from './api-client'

// 스웨거 스키마 기반 타입 정의
export interface PaymentRequestDto {
  lessonId: number
  userCouponId?: number
}

export interface PaymentResponseDto {
  orderId?: string
  lessonTitle?: string
  originPrice?: number
  payPrice?: number
  paymentMethod?: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'TOSS_PAYMENT'
  expiredAt?: string
}

export interface ConfirmPaymentRequestDto {
  amount?: number
  orderId: string
  paymentKey: string
}

export interface SuccessfulPaymentResponseDto {
  addressDetail?: string
  startAt?: string
  endAt?: string
  payPrice?: number
  city?: string
  district?: string
  dong?: string
  paymentMethod?: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'TOSS_PAYMENT'
}

export interface CancelPaymentRequestDto {
  orderId: string
  cancelReason: string
}

export interface CancelPaymentResponseDto {
  lessonName?: string
  cancelReason?: string
  startAt?: string
  endAt?: string
  paymentCancelledAt?: string
  payPrice?: number
  refundableAmount?: number
}

export interface SaveAmountRequestDto {
  orderId?: string
  amount?: number
}

export interface PaymentCancelHistoryResponseDto {
  lessonTitle?: string
  paymentCancelledAt?: string
  lessonStartAt?: string
  lessonEndAt?: string
  paymentMethod?: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'TOSS_PAYMENT'
  city?: string
  district?: string
  dong?: string
  payPrice?: number
  refundPrice?: number
  paymentStatus?:
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED'
  orderId?: string
  detailAddress?: string
  cancelReason?: string
}

/**
 * 결제 준비
 */
export const preparePayment = async (
  paymentData: PaymentRequestDto,
): Promise<PaymentResponseDto> => {
  try {
    console.log('결제 준비 시작:', paymentData)
    console.log('요청 데이터 상세:', {
      lessonId: paymentData.lessonId,
      userCouponId: paymentData.userCouponId,
      lessonIdType: typeof paymentData.lessonId,
      userCouponIdType: typeof paymentData.userCouponId,
    })

    const response = await fetch('/api/proxy/api/v1/payments/prepare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
      credentials: 'include',
    })

    console.log('결제 준비 응답 상태:', response.status, response.statusText)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('결제 준비 에러 응답:', errorData)
      throw new Error(errorData.message || `결제 준비 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('결제 준비 성공:', result)
    return result
  } catch (error) {
    console.error('Error preparing payment:', error)
    throw error
  }
}

/**
 * 결제 내역 세션에 저장
 */
export const saveAmount = async (
  amountData: SaveAmountRequestDto,
): Promise<any> => {
  try {
    console.log('결제 내역 저장 시작:', amountData)

    const response = await fetch('/api/proxy/api/v1/payments/saveAmount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(amountData),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `결제 내역 저장 실패: ${response.status}`,
      )
    }

    return response.json()
  } catch (error) {
    console.error('Error saving payment amount:', error)
    throw error
  }
}

/**
 * 결제 내역 세션에 담긴 값 확인
 */
export const verifyAmount = async (
  verifyData: SaveAmountRequestDto,
): Promise<any> => {
  try {
    console.log('결제 내역 확인 시작:', verifyData)

    const response = await fetch('/api/proxy/api/v1/payments/verifyAmount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verifyData),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `결제 내역 확인 실패: ${response.status}`,
      )
    }

    return response.json()
  } catch (error) {
    console.error('Error verifying payment amount:', error)
    throw error
  }
}

/**
 * 토스페이 결제 승인
 */
export const confirmPayment = async (
  confirmData: ConfirmPaymentRequestDto,
): Promise<any> => {
  try {
    console.log('토스페이 결제 승인 시작:', confirmData)

    const response = await fetch('/api/proxy/api/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(confirmData),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `결제 승인 실패: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error confirming payment:', error)
    throw error
  }
}

/**
 * 토스페이 결제 취소
 */
export const cancelPayment = async (
  cancelData: CancelPaymentRequestDto,
): Promise<any> => {
  try {
    console.log('토스페이 결제 취소 시작:', cancelData)

    const response = await fetch('/api/proxy/api/v1/payments/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cancelData),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `결제 취소 실패: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error canceling payment:', error)
    throw error
  }
}

/**
 * 완료된 결제 내역 조회
 */
export const getPaymentSuccess = async (
  params: {
    page?: number
    limit?: number
  } = {},
): Promise<any> => {
  try {
    const searchParams = new URLSearchParams()

    if (params.page) {
      searchParams.append('page', params.page.toString())
    }
    if (params.limit) {
      searchParams.append('limit', params.limit.toString())
    }

    const url = `/api/proxy/api/v1/payments/view/success`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `결제 내역 조회 실패: ${response.status}`,
      )
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching payment success:', error)
    throw error
  }
}

/**
 * 결제 취소 목록 조회
 */
export const getPaymentCancel = async (
  params: {
    page?: number
    limit?: number
  } = {},
): Promise<any> => {
  try {
    const searchParams = new URLSearchParams()

    if (params.page) {
      searchParams.append('page', params.page.toString())
    }
    if (params.limit) {
      searchParams.append('limit', params.limit.toString())
    }

    const url = `/api/proxy/api/v1/payments/view/cancel?${searchParams.toString()}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `결제 취소 목록 조회 실패: ${response.status}`,
      )
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching payment cancel:', error)
    throw error
  }
}

// 스웨거에 없는 API들은 제거
// getPaymentDetail과 tossWebhook은 스웨거에 정의되지 않음

// 기존 함수들은 deprecated로 표시하지만 유지
export async function createPayment(paymentData: any): Promise<any> {
  console.warn('createPayment is deprecated, use preparePayment instead')
  throw new Error(
    '결제 API가 업데이트되었습니다. preparePayment를 사용해주세요.',
  )
}

export async function getPayment(paymentId: string): Promise<any> {
  console.warn('getPayment is deprecated, use getPaymentSuccess instead')
  throw new Error(
    '결제 API가 업데이트되었습니다. getPaymentSuccess를 사용해주세요.',
  )
}

export async function getPayments(page?: number, limit?: number): Promise<any> {
  console.warn('getPayments is deprecated, use getPaymentSuccess instead')
  throw new Error(
    '결제 API가 업데이트되었습니다. getPaymentSuccess를 사용해주세요.',
  )
}
