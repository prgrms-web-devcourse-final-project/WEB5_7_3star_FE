import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">결제 실패</CardTitle>
            <CardDescription>결제 처리 중 문제가 발생했습니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 실패 사유 */}
            <div className="bg-red-50 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-red-800 mb-2">실패 사유</h3>
              <p className="text-sm text-red-700">결제 승인이 거절되었습니다. 카드 한도나 잔액을 확인해주세요.</p>
            </div>

            {/* 주문 정보 */}
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-2">주문 정보</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>레슨: 요가 기초반 - 몸과 마음의 균형</p>
                <p>날짜: 2024년 1월 15일 오후 2:00</p>
                <p>금액: 25,000원</p>
              </div>
            </div>

            {/* 해결 방법 */}
            <div className="bg-blue-50 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-blue-800 mb-2">해결 방법</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 카드 정보를 다시 확인해주세요</li>
                <li>• 다른 결제 방법을 시도해보세요</li>
                <li>• 카드사에 문의해보세요</li>
              </ul>
            </div>

            {/* 버튼들 */}
            <div className="space-y-3">
              <Link href="/payment/checkout" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  다시 결제하기
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  <Home className="h-4 w-4 mr-2" />
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>

            {/* 고객센터 */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">문제가 계속 발생하시나요?</p>
              <Button variant="link" className="text-blue-600 p-0">
                고객센터 문의하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
