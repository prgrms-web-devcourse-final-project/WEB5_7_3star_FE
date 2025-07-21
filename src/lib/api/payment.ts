import { apiClient, ApiResponse } from './api-client'

// 결제 관련 타입 정의 - Swagger에 결제 API가 없으므로 임시 타입 정의
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

// 결제 관련 API - Swagger에 없으므로 임시 구현
// TODO: 백엔드에서 결제 API 추가 필요

// 결제 생성 API
export async function createPayment(paymentData: CreatePaymentRequest): Promise<
  ApiResponse<{
    paymentId: string
    paymentUrl?: string
    paymentData?: Record<string, unknown>
  }>
> {
  // 임시 구현 - 실제 API가 없으므로 에러 발생
  throw new Error('결제 API가 아직 구현되지 않았습니다.')
}

// 결제 상세 조회 API
export async function getPayment(
  paymentId: string,
): Promise<ApiResponse<Payment>> {
  // 임시 구현 - 실제 API가 없으므로 에러 발생
  throw new Error('결제 API가 아직 구현되지 않았습니다.')
}

// 결제 목록 조회 API
export async function getPayments(
  page?: number,
  limit?: number,
): Promise<ApiResponse<PaymentListResponse>> {
  // 임시 구현 - 실제 API가 없으므로 에러 발생
  throw new Error('결제 API가 아직 구현되지 않았습니다.')
}

// 결제 취소 API
export async function cancelPayment(
  paymentId: string,
  reason?: string,
): Promise<ApiResponse<null>> {
  // 임시 구현 - 실제 API가 없으므로 에러 발생
  throw new Error('결제 API가 아직 구현되지 않았습니다.')
}
