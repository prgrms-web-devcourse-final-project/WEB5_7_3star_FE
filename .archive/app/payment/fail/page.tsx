import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { XCircle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function PaymentFailedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-4 w-full max-w-md">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">결제 실패</CardTitle>
            <CardDescription>결제 처리 중 문제가 발생했습니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 실패 사유 */}
            <div className="rounded-lg bg-red-50 p-4 text-left">
              <h3 className="mb-2 font-semibold text-red-800">실패 사유</h3>
              <p className="text-sm text-red-700">
                결제 승인이 거절되었습니다. 카드 한도나 잔액을 확인해주세요.
              </p>
            </div>

            {/* 주문 정보 */}
            <div className="rounded-lg bg-gray-50 p-4 text-left">
              <h3 className="mb-2 font-semibold">주문 정보</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>레슨: 요가 기초반 - 몸과 마음의 균형</p>
                <p>날짜: 2024년 1월 15일 오후 2:00</p>
                <p>금액: 25,000원</p>
              </div>
            </div>

            {/* 해결 방법 */}
            <div className="rounded-lg bg-blue-50 p-4 text-left">
              <h3 className="mb-2 font-semibold text-blue-800">해결 방법</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 카드 정보를 다시 확인해주세요</li>
                <li>• 다른 결제 방법을 시도해보세요</li>
                <li>• 카드사에 문의해보세요</li>
              </ul>
            </div>

            {/* 버튼들 */}
            <div className="space-y-3">
              <Link href="/payment/checkout" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  다시 결제하기
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  <Home className="mr-2 h-4 w-4" />
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>

            {/* 고객센터 */}
            <div className="border-t pt-4 text-center">
              <p className="mb-2 text-sm text-gray-600">
                문제가 계속 발생하시나요?
              </p>
              <Button variant="outline" className="p-0 text-blue-600">
                고객센터 문의하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
