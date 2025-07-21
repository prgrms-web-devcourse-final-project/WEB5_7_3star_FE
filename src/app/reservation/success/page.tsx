'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  Calendar,
  MapPin,
  Clock,
  User,
  FileText,
  Home,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

// 더미 예약 성공 데이터
const dummyReservation = {
  id: 'RES001',
  lesson: {
    title: '요가 기초반 - 몸과 마음의 균형',
    instructor: {
      name: '김요가',
      avatar: '',
    },
    category: '요가',
    location: '강남구 요가스튜디오',
    date: '2024-01-15',
    time: '오후 2:00 - 3:30',
    price: 25000,
  },
  paymentMethod: '카카오페이',
  paymentDate: '2024-01-10 14:30',
  status: 'confirmed',
}

export default function ReservationSuccessPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString() + '원'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-[#D4E3FF]/20 to-[#E1D8FB]/20">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Card className="border-0 bg-white/90 text-center shadow-2xl backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="mb-2 text-3xl text-green-600">
              예약 완료!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              레슨 예약이 성공적으로 완료되었습니다
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 p-8">
            {/* 예약 정보 */}
            <div className="space-y-4 rounded-xl bg-gradient-to-r from-[#D4E3FF]/50 to-[#E1D8FB]/50 p-6">
              <h3 className="text-left text-lg font-semibold text-gray-800">
                예약 정보
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white">
                    {dummyReservation.lesson.category.charAt(0)}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-800">
                      {dummyReservation.lesson.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {dummyReservation.lesson.instructor.name} 강사
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#8BB5FF]" />
                    <span className="text-gray-700">
                      {formatDate(dummyReservation.lesson.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#8BB5FF]" />
                    <span className="text-gray-700">
                      {dummyReservation.lesson.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#8BB5FF]" />
                    <span className="text-gray-700">
                      {dummyReservation.lesson.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 결제 정보 */}
            <div className="rounded-xl bg-gradient-to-r from-[#E1D8FB]/50 to-[#D4E3FF]/50 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">결제 금액</span>
                <span className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text font-semibold text-transparent">
                  {formatPrice(dummyReservation.lesson.price)}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm text-gray-600">결제 방법</span>
                <span className="text-sm text-gray-700">
                  {dummyReservation.paymentMethod}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm text-gray-600">결제 일시</span>
                <span className="text-sm text-gray-700">
                  {dummyReservation.paymentDate}
                </span>
              </div>
            </div>

            {/* 예약 상태 */}
            <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4">
              <div className="flex items-center justify-center gap-2">
                <Badge className="border-0 bg-green-100 text-green-700">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  예약 확정
                </Badge>
                <span className="text-sm text-green-700">
                  예약이 성공적으로 확정되었습니다
                </span>
              </div>
            </div>

            {/* 참고사항 */}
            <div className="space-y-2 rounded-xl bg-gradient-to-r from-[#D4E3FF]/30 to-[#E1D8FB]/30 p-4 text-left text-sm text-gray-600">
              <p className="flex items-center gap-2 font-medium text-gray-800">
                <FileText className="h-4 w-4" />
                참고사항
              </p>
              <div className="space-y-1">
                <p>• 레슨 시작 24시간 전까지 무료 취소 가능</p>
                <p>• 예약 확인서는 마이페이지에서 확인 가능</p>
                <p>• 문의사항은 고객센터로 연락주세요</p>
                <p>• 레슨 전날 SMS로 알림을 보내드립니다</p>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="space-y-4">
              <Link href="/mypage/applications" className="w-full">
                <Button className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:from-[#7AA8FF] hover:to-[#B8A8F5] hover:shadow-xl">
                  <FileText className="mr-2 h-5 w-5" />
                  예약 내역 보기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-2 border-[#D4E3FF] bg-transparent py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20"
                >
                  <Home className="mr-2 h-5 w-5" />
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>

            {/* 추가 정보 */}
            <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-800">
                <User className="h-4 w-4" />
                다음 단계
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 레슨 전날까지 강사님과 연락을 주고받을 수 있습니다</p>
                <p>• 레슨 장소에 10분 전 도착해주세요</p>
                <p>• 편안한 복장으로 참여해주세요</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
