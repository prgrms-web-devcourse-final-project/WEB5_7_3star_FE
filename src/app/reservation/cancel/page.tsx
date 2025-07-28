'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  Calendar,
  Clock,
  MapPin,
  User,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Heart,
  AlertCircle,
  MoreHorizontal,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'

// 더미 예약 데이터
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
  status: 'confirmed',
  paymentMethod: '카카오페이 (카드)',
  cardInfo: '신한카드 ****-****-****-1234',
  paymentDate: '2024-01-10',
}

const cancelReasons = [
  {
    value: 'schedule',
    title: '일정 변경',
    description: '개인 일정이 변경되어 참석이 어려워졌습니다',
    icon: Calendar,
  },
  {
    value: 'health',
    title: '건강상 이유',
    description: '몸이 아프거나 건강상 문제로 참석이 어렵습니다',
    icon: Heart,
  },
  {
    value: 'emergency',
    title: '긴급 상황',
    description: '예상치 못한 긴급한 상황이 발생했습니다',
    icon: AlertCircle,
  },
  {
    value: 'other',
    title: '기타',
    description: '위에 해당하지 않는 다른 사유입니다',
    icon: MoreHorizontal,
  },
]

export default function ReservationCancelPage() {
  const [selectedReason, setSelectedReason] = useState('')
  const [detailReason, setDetailReason] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeDataProcessing, setAgreeDataProcessing] = useState(false)

  const handleCancel = () => {
    if (!selectedReason || !agreeTerms || !agreeDataProcessing) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    const confirmMessage = `정말로 예약을 취소하시겠습니까?

• 취소 후에는 되돌릴 수 없습니다
• 환불은 영업일 기준 3-5일 소요됩니다
• 레슨 참여가 불가능해집니다`

    if (!confirm(confirmMessage)) {
      return
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number) => {
    return price >= 10000
      ? `${(price / 10000).toFixed(0)}만원`
      : `${price.toLocaleString()}원`
  }

  const isFormValid = selectedReason && agreeTerms && agreeDataProcessing

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <div className="container mx-auto w-full max-w-5xl px-4 py-12">
        {/* 브레드크럼 */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            홈
          </Link>
          <span>/</span>
          <Link href="/mypage/applications" className="hover:text-blue-600">
            신청레슨 현황
          </Link>
          <span>/</span>
          <span>예약 취소</span>
        </nav>

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">예약 취소</h1>
          <p className="text-lg text-gray-600">
            레슨 예약을 취소하고 환불을 신청하세요
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 메인 콘텐츠 */}
          <div className="space-y-6 lg:col-span-2">
            {/* 취소 안내 */}
            <Card className="border-2 border-orange-100 bg-orange-50 shadow-xs">
              <CardHeader className="border-b-2 border-orange-100">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-orange-800">
                  <AlertTriangle className="h-5 w-5" />
                  예약 취소 안내
                </CardTitle>
                <CardDescription className="text-orange-700">
                  취소 전 아래 내용을 반드시 확인해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm text-orange-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>레슨 시작 24시간 전까지만 무료 취소 가능</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>환불 처리는 영업일 기준 3-5일 소요</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>결제 수단으로 환불 (카드 승인 취소)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>취소 완료 후 SMS/이메일로 알림 발송</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 레슨 정보 */}
            <Card className="border-2 border-gray-100 shadow-xs">
              <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
                <CardTitle className="text-xl font-bold text-gray-800">
                  취소할 레슨 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white">
                    레슨
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2 text-lg font-bold text-gray-800">
                      {dummyReservation.lesson.title}
                    </h4>
                    <div className="grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-600" />
                        {dummyReservation.lesson.instructor.name} 강사
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        {formatDate(dummyReservation.lesson.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-600" />
                        {dummyReservation.lesson.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange-600" />
                        {dummyReservation.lesson.location}
                      </div>
                    </div>
                  </div>
                  <Badge className="border-0 bg-green-100 text-green-700">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    결제완료
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* 취소 사유 */}
            <Card className="border-2 border-gray-100 shadow-xs">
              <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
                <CardTitle className="text-xl font-bold text-gray-800">
                  취소 사유
                </CardTitle>
                <CardDescription>
                  취소 사유를 선택해주세요 (필수)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <RadioGroup
                  value={selectedReason}
                  onValueChange={setSelectedReason}
                  className="space-y-3"
                >
                  {cancelReasons.map((reason) => (
                    <div
                      key={reason.value}
                      className="flex items-center space-x-3"
                    >
                      <RadioGroupItem value={reason.value} id={reason.value} />
                      <Label
                        htmlFor={reason.value}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-start gap-3 rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-blue-300">
                          <div className="rounded-lg bg-blue-50 p-2">
                            <reason.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {reason.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {reason.description}
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* 상세 사유 입력 */}
                <div className="mt-6 space-y-2">
                  <Label
                    htmlFor="detailReason"
                    className="text-sm font-medium text-gray-700"
                  >
                    상세 사유 (선택)
                  </Label>
                  <Textarea
                    id="detailReason"
                    placeholder="취소 사유를 자세히 설명해주세요. (최대 500자)"
                    value={detailReason}
                    onChange={(e) => setDetailReason(e.target.value)}
                    maxLength={500}
                    rows={4}
                    className="border-2 border-gray-200 focus:border-blue-600"
                  />
                  <div className="text-right text-sm text-gray-500">
                    {detailReason.length}/500자
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 환불 정보 */}
            <Card className="border-2 border-gray-100 shadow-xs">
              <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
                <CardTitle className="text-xl font-bold text-gray-800">
                  환불 정보
                </CardTitle>
                <CardDescription>
                  카드 결제 시 자동으로 승인 취소됩니다
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {dummyReservation.paymentMethod}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {dummyReservation.cardInfo}
                    </p>
                    <p className="mt-1 text-sm text-blue-600">
                      환불 예상 시간: 즉시~영업일 기준 3일
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 약관 동의 */}
            <Card className="border-2 border-gray-100 shadow-xs">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="cancelTerms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) =>
                        setAgreeTerms(checked as boolean)
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="cancelTerms"
                      className="cursor-pointer text-sm"
                    >
                      취소 및 환불 정책에 동의합니다 (필수)
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataProcessing"
                      checked={agreeDataProcessing}
                      onCheckedChange={(checked) =>
                        setAgreeDataProcessing(checked as boolean)
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="dataProcessing"
                      className="cursor-pointer text-sm"
                    >
                      개인정보 처리 및 환불 처리를 위한 정보 이용에 동의합니다
                      (필수)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-2 border-gray-100 shadow-xs">
              <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
                <CardTitle className="text-xl font-bold text-gray-800">
                  취소 요약
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* 환불 요약 */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">원래 결제금액</span>
                      <span className="font-semibold">
                        {formatPrice(dummyReservation.lesson.price)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">취소 수수료</span>
                      <span className="font-semibold text-green-600">무료</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>환불 예정 금액</span>
                      <span className="text-blue-600">
                        {formatPrice(dummyReservation.lesson.price)}
                      </span>
                    </div>
                  </div>

                  {/* 처리 일정 */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">처리 일정</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">취소 신청</div>
                          <div className="text-xs text-gray-500">즉시</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">취소 승인</div>
                          <div className="text-xs text-gray-500">
                            1시간 이내
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">환불 완료</div>
                          <div className="text-xs text-gray-500">
                            영업일 3-5일
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={handleCancel}
                      disabled={!isFormValid}
                      className="h-12 w-full bg-gradient-to-r from-red-600 to-orange-600 font-semibold text-white shadow-xs transition-all duration-200 hover:from-red-700 hover:to-orange-700 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      예약 취소 신청하기
                    </Button>

                    <Link href="/mypage/applications">
                      <Button
                        variant="outline"
                        className="h-12 w-full border-2 border-gray-200 font-semibold text-gray-700 hover:border-gray-300"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        돌아가기
                      </Button>
                    </Link>

                    <p className="text-center text-xs text-gray-500">
                      취소 신청 후에는 변경이 불가능합니다
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
