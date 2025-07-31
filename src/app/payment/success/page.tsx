'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  AlertTriangle,
  Loader2,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
} from 'lucide-react'
import Container from '@/components/Container'

interface PaymentInfo {
  paymentMethod?: string
  payPrice?: number
  startAt?: string
  endAt?: string
  city?: string
  district?: string
  dong?: string
  addressDetail?: string
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentKey = searchParams.get('paymentKey')
      const orderId = searchParams.get('orderId')
      const amount = searchParams.get('amount')

      console.log('confirm payload:', {
        paymentKey,
        orderId,
        amount: +(amount || '0'),
      })

      if (!paymentKey || !orderId || !amount) {
        setError('결제 정보가 올바르지 않습니다.')
        setLoading(false)
        return
      }

      try {
        // 1. 결제 검증
        const verifyResponse = await fetch(
          '/api/proxy/api/v1/payments/verifyAmount',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId,
              amount: +amount,
            }),
            credentials: 'include',
          },
        )

        if (!verifyResponse.ok) {
          // 에러메시지 확인
          const errorData = await verifyResponse.json()
          console.error('결제 검증 에러:', errorData)
          throw new Error('결제 검증에 실패했습니다.')
        }

        // 2. 결제 승인
        const confirmResponse = await fetch(
          '/api/proxy/api/v1/payments/confirm',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentKey,
              orderId,
              amount: parseInt(amount),
            }),
            credentials: 'include',
          },
        )

        if (!confirmResponse.ok) {
          throw new Error('결제 승인에 실패했습니다.')
        }

        const responseData = await confirmResponse.json()
        if (responseData && responseData.data) {
          setPaymentInfo(responseData.data)
        }
        setLoading(false)
      } catch (error) {
        console.error('결제 확인 실패', error)
        setError('결제 확인 중 오류가 발생했습니다.')
        setLoading(false)
      }
    }

    confirmPayment()
  }, [searchParams])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <Container size="lg">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="text-lg text-gray-600">결제를 확인하는 중...</span>
          </div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="lg">
        <div className="py-20 text-center">
          <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            결제 확인 실패
          </h2>
          <p className="mb-6 text-gray-600">{error}</p>
          <Button onClick={() => router.push('/mypage/applications')}>
            신청 레슨 현황으로 돌아가기
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container size="lg">
      <div className="py-12">
        {/* 성공 메시지 */}
        <div className="mb-8 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            ✅ 결제 성공
          </h1>
          <p className="text-lg text-gray-600">
            결제가 성공적으로 처리되었습니다.
          </p>
        </div>

        {/* 결제 상세 정보 */}
        {paymentInfo && (
          <Card className="mx-auto max-w-2xl border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                📄 결제 상세 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-800">결제 수단</div>
                    <div className="text-sm text-gray-600">
                      {paymentInfo.paymentMethod}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-800">결제 금액</div>
                    <div className="text-lg font-bold text-green-600">
                      {paymentInfo.payPrice?.toLocaleString()}원
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-800">수업 시작</div>
                    <div className="text-sm text-gray-600">
                      {paymentInfo.startAt
                        ? formatDate(paymentInfo.startAt)
                        : '정보 없음'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-gray-800">수업 종료</div>
                    <div className="text-sm text-gray-600">
                      {paymentInfo.endAt
                        ? formatDate(paymentInfo.endAt)
                        : '정보 없음'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-800">수업 장소</div>
                    <div className="text-sm text-gray-600">
                      {paymentInfo.city &&
                      paymentInfo.district &&
                      paymentInfo.dong
                        ? `${paymentInfo.city} ${paymentInfo.district} ${paymentInfo.dong}`
                        : '정보 없음'}
                    </div>
                    {paymentInfo.addressDetail && (
                      <div className="mt-1 text-sm text-gray-500">
                        {paymentInfo.addressDetail}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 액션 버튼 */}
        <div className="mt-8 space-y-4 text-center">
          <Button
            onClick={() => router.push('/mypage/applications')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            신청 레슨 현황 보기
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="ml-4"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </Container>
  )
}

function LoadingFallback() {
  return (
    <Container size="lg">
      <div className="py-20 text-center">
        <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="text-lg text-gray-600">페이지를 불러오는 중...</p>
      </div>
    </Container>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
