'use client'

import { XCircle, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function PaymentFailed() {
  const lessonInfo = {
    title: '요가 기초반 - 몸과 마음의 균형',
    instructor: '김요가',
    date: '2024년 1월 15일',
    time: '오후 2:00 - 3:00',
    location: '강남구 요가스튜디오',
    price: 25000,
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* 실패 아이콘 */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>

            {/* 제목 */}
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              결제가 실패했습니다
            </h1>
            <p className="mb-8 text-gray-600">
              결제 처리 중 문제가 발생했습니다. 다시 시도해주세요.
            </p>

            {/* 레슨 정보 */}
            <div className="mb-6 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 font-semibold text-gray-900">
                {lessonInfo.title}
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">강사:</span>
                  <span className="font-medium">{lessonInfo.instructor}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-600">날짜:</span>
                  <span className="font-medium">{lessonInfo.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-600">시간:</span>
                  <span className="font-medium">{lessonInfo.time}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-600">장소:</span>
                  <span className="font-medium">{lessonInfo.location}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">결제 금액</span>
                  <span className="text-lg font-bold text-red-600">
                    {lessonInfo.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 오류 안내 */}
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <h4 className="font-medium text-red-900">결제 실패 원인</h4>
              </div>
              <p className="text-sm text-red-700">
                • 잔액 부족
                <br />
                • 카드 한도 초과
                <br />
                • 네트워크 오류
                <br />• 결제 수단 오류
              </p>
            </div>

            {/* 버튼들 */}
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-red-500 to-orange-600 py-3 text-white hover:from-red-600 hover:to-orange-700"
              >
                <Link href="/payment/checkout">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  다시 결제하기
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/landing">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  홈으로 돌아가기
                </Link>
              </Button>
            </div>

            {/* 추가 안내 */}
            <div className="mt-6 space-y-1 text-xs text-gray-500">
              <p>• 결제 문제가 지속되면 고객센터로 문의해주세요</p>
              <p>• 카드사에서 결제 거부 시 카드사로 문의하세요</p>
              <p>• 다른 결제 수단을 사용해보세요</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
