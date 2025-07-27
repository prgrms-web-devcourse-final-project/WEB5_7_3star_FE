'use client'

import { useState, useEffect } from 'react'
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
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getLessonDetail } from '@/lib/api/profile'

interface ReservationData {
  id: string
  lessonId: string
  lessonName: string
  instructorNickname: string
  startAt: string
  endAt: string
  price: number
  city?: string
  district?: string
  dong?: string
  addressDetail?: string
  category?: string
  status: string
  paymentMethod?: string
  paymentDate?: string
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

export default function ReservationCancelClient() {
  const [reservation, setReservation] = useState<ReservationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedReason, setSelectedReason] = useState('')
  const [detailReason, setDetailReason] = useState('')
  const [confirmChecked, setConfirmChecked] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const searchParams = useSearchParams()
  const lessonId = searchParams.get('lessonId')
  const reservationId = searchParams.get('reservationId')

  useEffect(() => {
    if (lessonId) {
      fetchReservationData()
    } else {
      setError('예약 정보를 찾을 수 없습니다.')
      setIsLoading(false)
    }
  }, [lessonId])

  const fetchReservationData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await getLessonDetail(lessonId!)
      if (response.data) {
        const lesson = response.data
        setReservation({
          id: reservationId || 'RES_' + Date.now(),
          lessonId: lesson.id?.toString() || lessonId!,
          lessonName: lesson.lessonName || '레슨',
          instructorNickname: lesson.lessonLeaderName || '강사',
          startAt: lesson.startAt || new Date().toISOString(),
          endAt: lesson.endAt || new Date().toISOString(),
          price: lesson.price || 0,
          city: lesson.city,
          district: lesson.district,
          dong: lesson.dong,
          addressDetail: lesson.addressDetail,
          category: lesson.category,
          status: 'confirmed',
          paymentMethod: searchParams.get('paymentMethod') || '카드 결제',
          paymentDate: new Date().toLocaleString('ko-KR'),
        })
      } else {
        setError('레슨 정보를 불러올 수 없습니다.')
      }
    } catch (err) {
      console.error('예약 정보 로딩 에러:', err)
      setError('예약 정보를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      })
    } catch {
      return dateString
    }
  }

  const formatTime = (startAt: string, endAt: string) => {
    try {
      const start = new Date(startAt)
      const end = new Date(endAt)
      return `${start.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`
    } catch {
      return '시간 정보 없음'
    }
  }

  const handleCancel = async () => {
    if (!selectedReason || !confirmChecked) {
      alert('취소 사유를 선택하고 확인사항에 동의해주세요.')
      return
    }

    setIsCancelling(true)
    try {
      // TODO: 예약 취소 API 호출
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert('예약이 취소되었습니다.')
      window.location.href = '/mypage/applications'
    } catch (err) {
      alert('예약 취소 중 오류가 발생했습니다.')
    } finally {
      setIsCancelling(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="flex h-full items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>예약 정보를 확인하는 중...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !reservation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <AlertTriangle className="mx-auto mb-6 h-16 w-16 text-red-600" />
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              예약 정보 오류
            </h1>
            <p className="mb-6 text-gray-600">
              {error || '예약 정보를 불러올 수 없습니다.'}
            </p>
            <Link href="/mypage/applications">
              <Button>신청 현황으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl">
          {/* 헤더 */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">예약 취소</h1>
            <p className="text-lg text-gray-600">
              정말로 예약을 취소하시겠습니까?
            </p>
          </div>

          {/* 예약 정보 카드 */}
          <Card className="mb-8 border-2 border-red-200 shadow-lg">
            <CardHeader className="border-b border-red-100 bg-red-50">
              <CardTitle className="flex items-center gap-2 text-xl text-red-800">
                <CreditCard className="h-5 w-5" />
                취소할 예약 정보
              </CardTitle>
              <CardDescription className="text-red-600">
                예약 번호: {reservation.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {reservation.lessonName}
                </h3>

                <div className="grid gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{reservation.instructorNickname} 강사</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(reservation.startAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {formatTime(reservation.startAt, reservation.endAt)}
                    </span>
                  </div>
                  {(reservation.city || reservation.addressDetail) && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {reservation.city && reservation.district
                          ? `${reservation.city} ${reservation.district} ${reservation.dong || ''}`.trim()
                          : reservation.addressDetail}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>결제 금액</span>
                    <span className="text-red-600">
                      {reservation.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 취소 사유 선택 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>취소 사유 선택</CardTitle>
              <CardDescription>
                취소 사유를 선택해주세요. (환불 정책에 영향을 줄 수 있습니다)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedReason}
                onValueChange={setSelectedReason}
              >
                <div className="space-y-4">
                  {cancelReasons.map((reason) => {
                    const IconComponent = reason.icon
                    return (
                      <div
                        key={reason.value}
                        className="flex items-start space-x-3"
                      >
                        <RadioGroupItem
                          value={reason.value}
                          id={reason.value}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={reason.value}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-gray-50">
                            <IconComponent className="h-5 w-5 text-gray-600" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {reason.title}
                              </div>
                              <div className="text-sm text-gray-600">
                                {reason.description}
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </RadioGroup>

              {selectedReason && (
                <div className="mt-6">
                  <Label
                    htmlFor="detail-reason"
                    className="text-sm font-medium"
                  >
                    상세 사유 (선택사항)
                  </Label>
                  <Textarea
                    id="detail-reason"
                    placeholder="추가적인 취소 사유를 입력해주세요..."
                    value={detailReason}
                    onChange={(e) => setDetailReason(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 취소 조건 및 주의사항 */}
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <h4 className="mb-3 font-semibold text-orange-900">
                📋 취소 및 환불 안내
              </h4>
              <ul className="space-y-2 text-sm text-orange-800">
                <li>• 레슨 시작 24시간 전: 100% 환불</li>
                <li>• 레슨 시작 12시간 전: 50% 환불</li>
                <li>• 레슨 시작 12시간 이내: 환불 불가</li>
                <li>• 환불은 3-5영업일 내에 처리됩니다</li>
                <li>• 카드 결제의 경우 승인 취소로 진행됩니다</li>
              </ul>
            </CardContent>
          </Card>

          {/* 확인 체크박스 */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="confirm"
                  checked={confirmChecked}
                  onCheckedChange={(checked) =>
                    setConfirmChecked(checked as boolean)
                  }
                />
                <Label htmlFor="confirm" className="text-sm">
                  위의 취소 및 환불 정책을 확인했으며, 예약을 취소하는 것에
                  동의합니다.
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex gap-4">
            <Link href="/mypage/applications" className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                돌아가기
              </Button>
            </Link>
            <Button
              onClick={handleCancel}
              disabled={!selectedReason || !confirmChecked || isCancelling}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isCancelling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  취소 처리 중...
                </>
              ) : (
                <>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  예약 취소하기
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
