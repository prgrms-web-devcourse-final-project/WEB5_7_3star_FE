import { apiClient, ApiResponse } from './api-client'
import { API_ENDPOINTS } from '@/lib/constants'

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

export interface PaymentMethod {
  id: string
  name: string
  type: 'CARD' | 'BANK_TRANSFER' | 'TOSS_PAY' | 'KAKAO_PAY'
  isDefault: boolean
}

// 결제 생성 API
export async function createPayment(paymentData: CreatePaymentRequest): Promise<
  ApiResponse<{
    paymentId: string
    paymentUrl?: string
    paymentData?: Record<string, unknown>
  }>
> {
  return apiClient.post<
    ApiResponse<{
      paymentId: string
      paymentUrl?: string
      paymentData?: Record<string, unknown>
    }>
  >(API_ENDPOINTS.PAYMENTS.CREATE, paymentData)
}

// 결제 상세 조회 API
export async function getPayment(
  paymentId: string,
): Promise<ApiResponse<Payment>> {
  return apiClient.get<ApiResponse<Payment>>(
    API_ENDPOINTS.PAYMENTS.DETAIL(paymentId),
  )
}

// 결제 목록 조회 API
export async function getPayments(
  page?: number,
  limit?: number,
): Promise<ApiResponse<PaymentListResponse>> {
  const params = new URLSearchParams()
  if (page) params.append('page', page.toString())
  if (limit) params.append('limit', limit.toString())

  const queryString = params.toString()
  const endpoint = queryString
    ? `${API_ENDPOINTS.PAYMENTS.CREATE}?${queryString}`
    : API_ENDPOINTS.PAYMENTS.CREATE

  return apiClient.get<ApiResponse<PaymentListResponse>>(endpoint)
}

// 결제 취소 API
export async function cancelPayment(
  paymentId: string,
  reason?: string,
): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>(
    API_ENDPOINTS.PAYMENTS.CANCEL(paymentId),
    {
      reason,
    },
  )
}

// 결제 환불 API
export async function refundPayment(
  paymentId: string,
  reason?: string,
): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>(`/payments/${paymentId}/refund`, {
    reason,
  })
}

// 결제 수단 목록 조회 API
export async function getPaymentMethods(): Promise<
  ApiResponse<PaymentMethod[]>
> {
  return apiClient.get<ApiResponse<PaymentMethod[]>>('/payment-methods')
}

// 결제 수단 추가 API
export async function addPaymentMethod(paymentMethod: {
  type: 'CARD' | 'BANK_TRANSFER' | 'TOSS_PAY' | 'KAKAO_PAY'
  data: Record<string, unknown>
}): Promise<ApiResponse<PaymentMethod>> {
  return apiClient.post<ApiResponse<PaymentMethod>>(
    '/payment-methods',
    paymentMethod,
  )
}

// 결제 수단 삭제 API
export async function deletePaymentMethod(
  methodId: string,
): Promise<ApiResponse<null>> {
  return apiClient.delete<ApiResponse<null>>(`/payment-methods/${methodId}`)
}

// 결제 수단 기본 설정 API
export async function setDefaultPaymentMethod(
  methodId: string,
): Promise<ApiResponse<null>> {
  return apiClient.patch<ApiResponse<null>>(
    `/payment-methods/${methodId}/default`,
  )
}

// 결제 완료 확인 API (웹훅 처리용)
export async function confirmPayment(
  paymentId: string,
  paymentData: Record<string, unknown>,
): Promise<ApiResponse<Payment>> {
  return apiClient.post<ApiResponse<Payment>>(
    `/payments/${paymentId}/confirm`,
    paymentData,
  )
}
