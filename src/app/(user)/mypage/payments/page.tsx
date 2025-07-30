'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  CheckCircle,
  RefreshCcw,
  Loader2,
} from 'lucide-react'
import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import { getPaymentSuccess, getPaymentCancel } from '@/lib/api/payment'
import { OptimizedPagination } from '@/components/ui/pagination'

interface Payment {
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

interface Refund {
  id: string
  lessonName: string
  originalAmount: number
  refundAmount: number
  refundDate: string
  status: 'REFUNDED' | 'PENDING'
  reason: string
}

export default function MyPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [refunds, setRefunds] = useState<Refund[]>([])
  const [paymentsTotalCount, setPaymentsTotalCount] = useState(0)
  const [refundsTotalCount, setRefundsTotalCount] = useState(0)
  const [paymentsCurrentPage, setPaymentsCurrentPage] = useState(1)
  const [refundsCurrentPage, setRefundsCurrentPage] = useState(1)
  const [isLoadingPayments, setIsLoadingPayments] = useState(true)
  const [isLoadingRefunds, setIsLoadingRefunds] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pageSize = 10

  const fetchPayments = async (page: number = 1) => {
    try {
      setIsLoadingPayments(true)
      setError(null)

      const response = await getPaymentSuccess({
        page,
        limit: pageSize,
      })

      if (response.data && response.data.payments) {
        setPayments(response.data.payments)
        setPaymentsTotalCount(response.count || 0)
      } else {
        setPayments([])
        setPaymentsTotalCount(0)
      }
    } catch (err) {
      console.error('결제 내역 로딩 에러:', err)
      setError(
        `결제 내역을 불러오는 중 오류가 발생했습니다: ${err instanceof Error ? err.message : String(err)}`,
      )
      setPayments([])
      setPaymentsTotalCount(0)
    } finally {
      setIsLoadingPayments(false)
    }
  }

  const fetchRefunds = async (page: number = 1) => {
    try {
      setIsLoadingRefunds(true)
      setError(null)

      const response = await getPaymentCancel({
        page,
        limit: pageSize,
      })

      if (response.data && response.data.refunds) {
        setRefunds(response.data.refunds)
        setRefundsTotalCount(response.count || 0)
      } else {
        setRefunds([])
        setRefundsTotalCount(0)
      }
    } catch (err) {
      console.error('환불 내역 로딩 에러:', err)
      setError(
        `환불 내역을 불러오는 중 오류가 발생했습니다: ${err instanceof Error ? err.message : String(err)}`,
      )
      setRefunds([])
      setRefundsTotalCount(0)
    } finally {
      setIsLoadingRefunds(false)
    }
  }

  const handlePaymentsPageChange = (page: number) => {
    setPaymentsCurrentPage(page)
    fetchPayments(page)
  }

  const handleRefundsPageChange = (page: number) => {
    setRefundsCurrentPage(page)
    fetchRefunds(page)
  }

  useEffect(() => {
    fetchPayments(paymentsCurrentPage)
  }, [paymentsCurrentPage])

  useEffect(() => {
    fetchRefunds(refundsCurrentPage)
  }, [refundsCurrentPage])

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'CARD':
        return '신용카드'
      case 'BANK_TRANSFER':
        return '계좌이체'
      case 'TOSS_PAY':
        return '토스페이'
      case 'KAKAO_PAY':
        return '카카오페이'
      default:
        return method
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return '결제완료'
      case 'PENDING':
        return '대기중'
      case 'FAILED':
        return '실패'
      case 'CANCELLED':
        return '취소됨'
      case 'REFUNDED':
        return '환불됨'
      default:
        return status
    }
  }

  return (
    <Container size="lg">
      <PageHeader
        title="결제 내역"
        subtitle="결제 내역을 확인할 수 있습니다."
        align="left"
      />
      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList className="mb-8 flex w-full items-center overflow-hidden rounded-xl bg-gray-100 p-0 shadow-sm">
          <TabsTrigger
            value="payments"
            className="flex h-12 flex-1 items-center justify-center rounded-none border-none bg-white text-base font-medium text-gray-700 shadow-none transition-colors focus:outline-none data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-500"
          >
            결제 내역
          </TabsTrigger>
          <TabsTrigger
            value="refunds"
            className="flex h-12 flex-1 items-center justify-center rounded-none border-none bg-gray-100 text-base font-medium text-gray-500 shadow-none transition-colors focus:outline-none data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-500"
          >
            환불 내역
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="space-y-8">
          {isLoadingPayments ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>결제 내역을 불러오는 중...</span>
              </div>
            </div>
          ) : payments.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-500">결제 내역이 없습니다.</p>
            </div>
          ) : (
            <>
              {payments.map((payment) => (
                <div key={payment.id} className="relative">
                  {/* 상태 뱃지 우측상단 */}
                  <div className="absolute top-6 right-8 z-20 flex items-center gap-1">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700 shadow">
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                  <div className="relative rounded-xl bg-gradient-to-br from-[#f5f6fa] to-[#e9eafc] p-6 shadow-lg">
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-bold text-gray-900">
                        {payment.lessonName}
                      </div>
                      <div className="text-sm text-gray-500">
                        결제일 :{' '}
                        {new Date(payment.createdAt).toLocaleDateString(
                          'ko-KR',
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {getPaymentMethodText(payment.paymentMethod)}
                      </span>
                    </div>
                    <div className="mt-6 flex items-end justify-between">
                      <div>
                        <div className="text-xs text-gray-500">레슨 가격</div>
                        <div className="text-primary text-2xl font-bold">
                          {payment.amount.toLocaleString()}원
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* 영수증 보기 버튼 */}
                        <Button className="text-primary rounded-lg bg-[#e3e7fd] px-4 py-2 font-semibold shadow-sm hover:bg-[#d1d8fa]">
                          영수증보기
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* 결제 내역 페이지네이션 */}
              {paymentsTotalCount > pageSize && (
                <div className="mt-8">
                  <OptimizedPagination
                    currentPage={paymentsCurrentPage}
                    pageSize={pageSize}
                    totalCount={paymentsTotalCount}
                    movablePageCount={10}
                    onPageChange={handlePaymentsPageChange}
                  />
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="refunds" className="space-y-8">
          {isLoadingRefunds ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>환불 내역을 불러오는 중...</span>
              </div>
            </div>
          ) : refunds.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-500">환불 내역이 없습니다.</p>
            </div>
          ) : (
            <>
              {refunds.map((refund) => (
                <div key={refund.id} className="relative">
                  {/* 상태 뱃지 우측상단 */}
                  <div className="absolute top-6 right-8 z-20 flex items-center gap-1">
                    {refund.status === 'REFUNDED' ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <RefreshCcw className="h-5 w-5 text-blue-400" />
                    )}
                    <span
                      className={`rounded-full px-4 py-1 text-sm font-semibold shadow ${refund.status === 'REFUNDED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                    >
                      {refund.status === 'REFUNDED' ? '환불 완료' : '환불 대기'}
                    </span>
                  </div>
                  <div className="relative rounded-xl bg-gradient-to-br from-[#f5f6fa] to-[#e9eafc] p-6 shadow-lg">
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-bold text-gray-900">
                        {refund.lessonName}
                      </div>
                      <div className="text-sm text-gray-500">
                        환불일:{' '}
                        {new Date(refund.refundDate).toLocaleDateString(
                          'ko-KR',
                        )}
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-6 text-sm">
                      <div>
                        <div className="text-gray-500">
                          원래 결제 금액 :{' '}
                          <span className="font-semibold text-gray-700">
                            {refund.originalAmount.toLocaleString()}원
                          </span>
                        </div>
                        <div className="mt-2 text-gray-500">
                          환불 사유 :{' '}
                          <span className="font-semibold text-gray-700">
                            {refund.reason}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-end">
                        <div className="text-xs text-gray-500">환불금액</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {refund.refundAmount.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* 환불 내역 페이지네이션 */}
              {refundsTotalCount > pageSize && (
                <div className="mt-8">
                  <OptimizedPagination
                    currentPage={refundsCurrentPage}
                    pageSize={pageSize}
                    totalCount={refundsTotalCount}
                    movablePageCount={10}
                    onPageChange={handleRefundsPageChange}
                  />
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </Container>
  )
}
