import { apiClient, ApiResponse } from './api-client'

// 결제 관련 타입 정의
export interface Payment {
  id: string
  lessonId: number
  lessonName: string
  userId: number
  amount: number
  originalAmount: number
  discountAmount: number
  paymentMethod: 'CARD' | 'BANK_TRANSFER' | 'TOSS_PAY' | 'KAKAO_PAY'
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED'
  createdAt: string
  completedAt?: string
  cancelledAt?: string
}

export interface CreatePaymentRequest {
  lessonId: number
  paymentMethod: 'CARD' | 'BANK_TRANSFER' | 'TOSS_PAY' | 'KAKAO_PAY'
  couponId?: number
}

export interface PaymentListResponse {
  payments: Payment[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    limit: number
  }
}

/**
 * 결제 준비
 */
export const preparePayment = async (paymentData: any): Promise<any> => {
  try {
    console.log('결제 준비 시작:', paymentData)

    const response = await fetch('/api/proxy/api/v1/payments/prepare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `결제 준비 실패: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error preparing payment:', error)
    throw error
  }
}

/**
 * 결제 내역 세션에 저장
 */
export const saveAmount = async (amountData: any): Promise<any> => {
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
export const verifyAmount = async (verifyData: any): Promise<any> => {
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
export const confirmPayment = async (confirmData: any): Promise<any> => {
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
export const cancelPayment = async (cancelData: any): Promise<any> => {
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

    const url = `/api/proxy/api/v1/payments/view/success?${searchParams.toString()}`

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

/**
 * 결제 상세 조회
 */
export const getPaymentDetail = async (paymentKey: string): Promise<any> => {
  try {
    const response = await fetch(`/api/proxy/api/v1/payments/${paymentKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `결제 상세 조회 실패: ${response.status}`,
      )
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching payment detail:', error)
    throw error
  }
}

/**
 * 토스페이 웹훅
 */
export const tossWebhook = async (webhookData: any): Promise<any> => {
  try {
    console.log('토스페이 웹훅 시작:', webhookData)

    const response = await fetch('/api/proxy/api/v1/payments/webhook/toss', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `토스페이 웹훅 실패: ${response.status}`,
      )
    }

    return response.json()
  } catch (error) {
    console.error('Error processing toss webhook:', error)
    throw error
  }
}

// 기존 함수들은 deprecated로 표시하지만 유지
export async function createPayment(paymentData: CreatePaymentRequest): Promise<
  ApiResponse<{
    paymentId: string
    paymentUrl?: string
    paymentData?: Record<string, unknown>
  }>
> {
  console.warn('createPayment is deprecated, use preparePayment instead')
  throw new Error(
    '결제 API가 업데이트되었습니다. preparePayment를 사용해주세요.',
  )
}

export async function getPayment(
  paymentId: string,
): Promise<ApiResponse<Payment>> {
  console.warn('getPayment is deprecated, use getPaymentDetail instead')
  throw new Error(
    '결제 API가 업데이트되었습니다. getPaymentDetail을 사용해주세요.',
  )
}

export async function getPayments(
  page?: number,
  limit?: number,
): Promise<ApiResponse<PaymentListResponse>> {
  console.warn('getPayments is deprecated, use getPaymentSuccess instead')
  throw new Error(
    '결제 API가 업데이트되었습니다. getPaymentSuccess를 사용해주세요.',
  )
}
