'use client'

import { CreditCard, Calendar } from 'lucide-react'

interface Payment {
  id: number
  lessonId: number
  lessonName: string
  amount: number
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  paymentMethod: string
  paidAt: string
}

interface PaymentsSectionProps {
  payments: Payment[]
}

export default function PaymentsSection({ payments }: PaymentsSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      case 'REFUNDED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return '완료'
      case 'PENDING':
        return '대기 중'
      case 'FAILED':
        return '실패'
      case 'REFUNDED':
        return '환불됨'
      default:
        return '알 수 없음'
    }
  }

  return (
    <div className="service-card">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100">
          <CreditCard className="h-4 w-4 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">결제 내역</h2>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">
                {payment.lessonName}
              </h3>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(payment.status)}`}
              >
                {getStatusText(payment.status)}
              </span>
            </div>
            <div className="mb-2 flex items-center gap-4">
              <span className="text-lg font-bold text-gray-900">
                {payment.amount.toLocaleString()}원
              </span>
              <span className="text-sm text-gray-500">
                {payment.paymentMethod}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {payment.paidAt}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
