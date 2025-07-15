import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 상태값을 한글로 변환하는 유틸리티 함수들

/**
 * 레슨 상태를 한글로 변환
 */
export function getLessonStatusText(status: string): string {
  switch (status) {
    case 'RECRUITING':
      return '모집중'
    case 'RECRUITMENT_COMPLETED':
      return '모집완료'
    case 'IN_PROGRESS':
      return '진행중'
    case 'COMPLETED':
      return '완료'
    case 'CANCELLED':
      return '취소'
    default:
      return status
  }
}

/**
 * 레슨 신청 상태를 한글로 변환
 */
export function getApplicationStatusText(status: string): string {
  switch (status) {
    case 'PENDING':
      return '승인대기'
    case 'APPROVED':
      return '승인완료'
    case 'REJECTED':
      return '거절됨'
    case 'CANCELLED':
      return '취소됨'
    default:
      return status
  }
}

/**
 * 쿠폰 상태를 한글로 변환
 */
export function getCouponStatusText(status: string): string {
  switch (status) {
    case 'ACTIVE':
      return '사용가능'
    case 'INACTIVE':
      return '사용완료'
    default:
      return status
  }
}

/**
 * 결제 상태를 한글로 변환
 */
export function getPaymentStatusText(status: string): string {
  switch (status) {
    case 'COMPLETED':
      return '결제완료'
    case 'PENDING':
      return '결제대기'
    case 'FAILED':
      return '결제실패'
    default:
      return status
  }
}

/**
 * 쿠폰 소유 상태를 한글로 변환
 */
export function getOwnedStatusText(status: string): string {
  switch (status) {
    case 'OWNED':
      return '보유중'
    case 'NOT_OWNED':
      return '미보유'
    default:
      return status
  }
}

/**
 * 날짜를 한국어 형식으로 포맷팅
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * 날짜와 시간을 한국어 형식으로 포맷팅
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * 금액을 한국어 형식으로 포맷팅
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString()}원`
}

/**
 * 할인율을 한국어 형식으로 포맷팅
 */
export function formatDiscount(discount: number): string {
  return `${discount}% 할인`
}
