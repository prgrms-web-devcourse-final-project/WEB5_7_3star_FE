'use client'

import { Ban, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function PaymentCancelSuccess() {
  const lessonInfo = {
    title: '요가 기초반 - 몸과 마음의 균형',
    instructor: '김요가',
    date: '2024년 1월 15일',
    time: '오후 2:00 - 3:00',
    location: '강남구 요가스튜디오',
    price: 25000,
    cancelReason: '개인 일정 변경',
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* 취소 아이콘 */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
              <Ban className="h-12 w-12 text-yellow-600" />
            </div>

            {/* 제목 */}
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              결제가 취소되었습니다
            </h1>
            <p className="mb-8 text-gray-600">
              결제가 성공적으로 취소되었습니다.
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
                  <span className="font-medium text-gray-700">환불 금액</span>
                  <span className="text-lg font-bold text-green-600">
                    {lessonInfo.price.toLocaleString()}원
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  취소 사유: {lessonInfo.cancelReason}
                </div>
              </div>
            </div>

            {/* 환불 안내 */}
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <h4 className="font-medium text-green-900">환불 처리 안내</h4>
              </div>
              <p className="text-sm text-green-700">
                • 환불은 3-5일 내에 처리됩니다
                <br />
                • 결제 수단에 따라 환불 시점이 다를 수 있습니다
                <br />• 환불 내역은 마이페이지에서 확인 가능합니다
              </p>
            </div>

            {/* 추가 안내 */}
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium text-blue-900">취소 정책</h4>
              </div>
              <p className="text-sm text-blue-700">
                • 레슨 24시간 전까지 취소 가능
                <br />
                • 24시간 이내 취소 시 수수료 발생
                <br />• 레슨 시작 후 취소 불가
              </p>
            </div>

            {/* 버튼들 */}
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 text-white hover:from-blue-600 hover:to-purple-700"
              >
                <Link href="/mypage">마이페이지로 이동</Link>
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
              <p>• 환불 문의는 고객센터로 연락해주세요</p>
              <p>• 다른 레슨을 찾아보세요</p>
              <p>• 취소 정책을 확인해주세요</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
