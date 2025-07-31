'use client'

import { CheckCircle, ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Container from '@/components/Container'
import { useRouter } from 'next/navigation'

export default function PaymentCancelSuccessPage() {
  const router = useRouter()

  return (
    <Container size="lg">
      <div className="py-20 text-center">
        <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-500" />
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          ✅ 결제 취소 완료
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          결제가 성공적으로 취소되었습니다.
        </p>

        <div className="mx-auto mb-8 max-w-md rounded-lg border border-green-200 bg-green-50 p-6">
          <h3 className="mb-4 font-semibold text-green-800">처리 안내</h3>
          <div className="space-y-2 text-sm text-green-700">
            <p>• 환불 처리는 영업일 기준 3-5일 소요됩니다</p>
            <p>• 결제 수단으로 환불됩니다 (카드 승인 취소)</p>
            <p>• 취소 완료 알림이 SMS/이메일로 발송됩니다</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push('/mypage/applications')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            신청 레슨 현황 보기
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
