'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react'
import Container from '@/components/Container'
import { Suspense } from 'react'

function PaymentFailedContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const errorCode = searchParams.get('errorCode')
  const errorMessage = searchParams.get('errorMessage')

  const getErrorMessage = () => {
    if (errorMessage) return errorMessage

    switch (errorCode) {
      case 'PAY_PROCESS_CANCELED':
        return '결제가 취소되었습니다.'
      case 'PAY_PROCESS_ABORTED':
        return '결제가 중단되었습니다.'
      case 'INVALID_CARD':
        return '유효하지 않은 카드입니다.'
      case 'INSUFFICIENT_FUNDS':
        return '잔액이 부족합니다.'
      case 'CARD_EXPIRED':
        return '만료된 카드입니다.'
      default:
        return '결제 처리 중 오류가 발생했습니다.'
    }
  }

  return (
    <Container size="lg">
      <div className="py-20 text-center">
        <AlertTriangle className="mx-auto mb-6 h-16 w-16 text-red-500" />
        <h1 className="mb-4 text-3xl font-bold text-gray-800">❌ 결제 실패</h1>
        <p className="mb-8 text-lg text-gray-600">{getErrorMessage()}</p>

        <div className="space-y-4">
          <Button
            onClick={() => router.back()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전 페이지로 돌아가기
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="ml-4"
          >
            <Home className="mr-2 h-4 w-4" />
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

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentFailedContent />
    </Suspense>
  )
}
