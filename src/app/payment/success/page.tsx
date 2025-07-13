'use client'

import {
  CheckCircle,
  Calendar,
  MapPin,
  Clock,
  User,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function PaymentSuccess() {
  const lessonInfo = {
    title: '요가 기초반 - 몸과 마음의 균형',
    instructor: '김요가',
    date: '2024년 1월 15일',
    time: '오후 2:00 - 3:00',
    location: '강남구 요가스튜디오',
    price: 25000,
    paymentMethod: '카카오페이',
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-lg">
        <Card className="border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* 성공 아이콘 */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* 제목 */}
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              결제가 완료되었습니다!
            </h1>
            <p className="mb-8 text-gray-600">
              레슨 예약이 성공적으로 처리되었습니다.
            </p>

            {/* 레슨 정보 */}
            <div className="mb-6 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 font-semibold text-gray-900">
                {lessonInfo.title}
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">
                    강사: {lessonInfo.instructor}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">날짜: {lessonInfo.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">시간: {lessonInfo.time}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">
                    장소: {lessonInfo.location}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">결제 금액</span>
                  <span className="text-lg font-bold text-green-600">
                    {lessonInfo.price.toLocaleString()}원
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  결제수단: {lessonInfo.paymentMethod}
                </div>
              </div>
            </div>

            {/* 안내 메시지 */}
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h4 className="mb-2 font-medium text-blue-900">
                📧 확인 이메일이 발송되었습니다
              </h4>
              <p className="text-sm text-blue-700">
                레슨 상세 정보와 준비사항을 이메일로 확인하실 수 있습니다.
              </p>
            </div>

            {/* 버튼들 */}
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 py-3 text-white hover:from-green-600 hover:to-blue-700"
              >
                <Link href="/mypage">
                  마이페이지로 이동
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/landing">홈으로 돌아가기</Link>
              </Button>
            </div>

            {/* 추가 안내 */}
            <div className="mt-6 space-y-1 text-xs text-gray-500">
              <p>• 레슨 24시간 전까지 취소 가능합니다</p>
              <p>• 문의사항은 고객센터로 연락해주세요</p>
              <p>• 레슨 전 준비사항을 확인해주세요</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
