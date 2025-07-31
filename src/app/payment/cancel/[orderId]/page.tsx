'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  CreditCard,
  CheckCircle,
  Heart,
  AlertTriangle,
  MoreHorizontal,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import { getPaymentSuccess, cancelPayment } from '@/lib/api/payment'

interface PaymentDetail {
  orderId?: string
  lessonTitle?: string
  lessonStartAt?: string
  lessonEndAt?: string
  city?: string
  district?: string
  dong?: string
  detailAddress?: string
  payPrice?: number
  paymentMethod?: string
  paymentStatus?: string
  paymentApprovedAt?: string
}

export default function PaymentCancelPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string

  const [paymentDetail, setPaymentDetail] = useState<PaymentDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancelReason, setCancelReason] = useState('')
  const [detailReason, setDetailReason] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const isFormValid = cancelReason && termsAccepted && dataProcessingAccepted

  // 결제 상세 정보 로드
  useEffect(() => {
    const loadPaymentDetail = async () => {
      try {
        // 전체 결제내역을 가져와서 해당 orderId 찾기
        const response = await getPaymentSuccess({ page: 1, limit: 100 })

        if (response && response.data && response.data.successHistory) {
          const targetPayment = response.data.successHistory.find(
            (payment: any) => payment.orderId === orderId,
          )

          if (targetPayment) {
            setPaymentDetail(targetPayment)
          } else {
            setError('해당 주문을 찾을 수 없습니다.')
          }
        } else {
          setError('결제 정보를 불러올 수 없습니다.')
        }
      } catch (err) {
        console.error('결제 정보 로딩 에러:', err)
        setError('결제 정보를 불러올 수 없습니다.')
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      loadPaymentDetail()
    }
  }, [orderId])

  const handleConfirmCancel = async () => {
    if (!paymentDetail) {
      alert('결제 정보가 없습니다.')
      return
    }

    setIsProcessing(true)
    try {
      const cancelData = {
        orderId: paymentDetail.orderId || orderId,
        cancelReason: cancelReason + (detailReason ? ` - ${detailReason}` : ''),
      }

      await cancelPayment(cancelData)

      alert('결제가 성공적으로 취소되었습니다.')
      router.push('/payment/cancel/success')
    } catch (error) {
      console.error('결제 취소 실패:', error)
      alert('결제 취소에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <Container size="lg">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="text-lg text-gray-600">
              결제 정보를 불러오는 중...
            </span>
          </div>
        </div>
      </Container>
    )
  }

  if (error || !paymentDetail) {
    return (
      <Container size="lg">
        <div className="py-20 text-center">
          <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            결제 정보를 찾을 수 없습니다
          </h2>
          <p className="mb-6 text-gray-600">{error}</p>
          <Button onClick={() => router.push('/mypage/applications')}>
            신청 레슨 현황으로 돌아가기
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container size="lg">
      <PageHeader
        title="결제 취소"
        subtitle="레슨 예약을 취소하고 환불을 신청하세요"
        align="center"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 메인 취소 폼 */}
        <div className="space-y-6 lg:col-span-2">
          {/* 취소 안내 */}
          <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-orange-100/60 to-amber-100/60">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-orange-800">
                    결제 취소 안내
                  </CardTitle>
                  <CardDescription className="text-orange-700">
                    취소 전 아래 내용을 반드시 확인해주세요
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border-l-4 border-orange-400 bg-orange-100/50 p-3">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800">
                    레슨 시작 24시간 전까지만 무료 취소 가능
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border-l-4 border-orange-400 bg-orange-100/50 p-3">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800">
                    환불 처리는 영업일 기준 3-5일 소요
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border-l-4 border-orange-400 bg-orange-100/50 p-3">
                  <CreditCard className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800">
                    결제 수단으로 환불 (카드 승인 취소)
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border-l-4 border-orange-400 bg-orange-100/50 p-3">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800">
                    취소 완료 후 SMS/이메일로 알림 발송
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 레슨 정보 */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40">
              <CardTitle className="text-gray-800">취소할 레슨 정보</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex gap-4 rounded-lg border border-[#D4E3FF] bg-gradient-to-r from-[#D4E3FF]/30 to-[#E1D8FB]/30 p-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4E3FF] to-[#E1D8FB] font-medium text-white shadow-sm">
                  레슨
                </div>
                <div className="flex-1">
                  <h4 className="mb-2 text-xl font-semibold text-nowrap text-gray-800">
                    {paymentDetail.lessonTitle || '레슨명 없음'}
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#8BB5FF]" />
                      <span className="text-nowrap text-gray-700">
                        {paymentDetail.city &&
                        paymentDetail.district &&
                        paymentDetail.dong
                          ? `${paymentDetail.city} ${paymentDetail.district} ${paymentDetail.dong}`
                          : paymentDetail.detailAddress || '주소 정보 없음'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#8BB5FF]" />
                      <span className="text-gray-700">
                        {paymentDetail.lessonStartAt
                          ? formatDate(paymentDetail.lessonStartAt)
                          : '날짜 정보 없음'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#8BB5FF]" />
                      <span className="text-gray-700">
                        {paymentDetail.lessonStartAt &&
                        paymentDetail.lessonEndAt
                          ? `${formatTime(paymentDetail.lessonStartAt)} - ${formatTime(paymentDetail.lessonEndAt)}`
                          : '시간 정보 없음'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-[#8BB5FF]" />
                      <span className="text-gray-700">
                        {paymentDetail.paymentMethod || '결제 수단'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    결제완료
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 취소 사유 */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40">
              <CardTitle className="text-gray-800">취소 사유</CardTitle>
              <CardDescription className="text-gray-600">
                취소 사유를 선택해주세요 (필수)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <RadioGroup
                value={cancelReason}
                onValueChange={setCancelReason}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-all duration-200 hover:border-[#8BB5FF] hover:bg-gray-50">
                  <RadioGroupItem value="schedule" id="schedule" />
                  <Label htmlFor="schedule" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">일정 변경</h4>
                        <p className="text-sm text-gray-600">
                          개인 일정이 변경되어 참석이 어려워졌습니다
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-all duration-200 hover:border-[#8BB5FF] hover:bg-gray-50">
                  <RadioGroupItem value="health" id="health" />
                  <Label htmlFor="health" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                        <Heart className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          건강상의 이유
                        </h4>
                        <p className="text-sm text-gray-600">
                          건강상의 문제로 참석이 어려워졌습니다
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-all duration-200 hover:border-[#8BB5FF] hover:bg-gray-50">
                  <RadioGroupItem value="location" id="location" />
                  <Label htmlFor="location" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">장소 변경</h4>
                        <p className="text-sm text-gray-600">
                          레슨 장소가 변경되어 참석이 어려워졌습니다
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-all duration-200 hover:border-[#8BB5FF] hover:bg-gray-50">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                        <MoreHorizontal className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">기타</h4>
                        <p className="text-sm text-gray-600">
                          위에 해당하지 않는 다른 사유입니다
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {/* 상세 사유 입력 */}
              <div className="mt-6">
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
                  className="mt-2 border-2 border-gray-200 focus:border-[#8BB5FF]"
                />
                <div className="mt-1 text-right text-sm text-gray-500">
                  {detailReason.length}/500자
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 환불 정보 */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40">
              <CardTitle className="text-gray-800">환불 정보</CardTitle>
              <CardDescription className="text-gray-600">
                카드 결제 시 자동으로 승인 취소됩니다
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 rounded-lg border border-[#D4E3FF] bg-gradient-to-r from-[#D4E3FF]/30 to-[#E1D8FB]/30 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#8BB5FF] text-white">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {paymentDetail.paymentMethod || '결제 수단'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    결제 금액: {paymentDetail.payPrice?.toLocaleString()}원
                  </p>
                  <p className="text-sm font-medium text-[#8BB5FF]">
                    환불 예상 시간: 즉시~영업일 기준 3일
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 약관 동의 */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40">
              <CardTitle className="text-gray-800">약관 동의</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="cancelTerms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) =>
                      setTermsAccepted(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="cancelTerms"
                    className="cursor-pointer text-sm"
                  >
                    <span className="font-medium text-gray-800">
                      결제 취소 약관에 동의합니다
                    </span>
                    <p className="mt-1 text-gray-600">
                      취소 신청 후에는 변경이 불가능하며, 환불은 영업일 기준
                      3-5일 소요됩니다.
                    </p>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="dataProcessing"
                    checked={dataProcessingAccepted}
                    onCheckedChange={(checked) =>
                      setDataProcessingAccepted(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="dataProcessing"
                    className="cursor-pointer text-sm"
                  >
                    <span className="font-medium text-gray-800">
                      개인정보 처리에 동의합니다
                    </span>
                    <p className="mt-1 text-gray-600">
                      취소 처리 및 환불을 위해 필요한 개인정보 처리에
                      동의합니다.
                    </p>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 border-0 bg-white/90 shadow-xl backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40">
              <CardTitle className="text-gray-800">취소 요약</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">원래 결제금액</span>
                  <span className="text-gray-800">
                    {paymentDetail.payPrice?.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">취소 수수료</span>
                  <span className="font-medium text-green-600">무료</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-800">환불 예정 금액</span>
                  <span className="text-xl text-red-600">
                    {paymentDetail.payPrice?.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* 처리 일정 */}
              <div className="mb-6">
                <h4 className="mb-4 font-semibold text-gray-800">처리 일정</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-[#8BB5FF]"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        취소 신청
                      </p>
                      <p className="text-xs text-gray-500">즉시</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        취소 승인
                      </p>
                      <p className="text-xs text-gray-500">1시간 이내</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        환불 완료
                      </p>
                      <p className="text-xs text-gray-500">영업일 3-5일</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleConfirmCancel}
                disabled={!isFormValid || isProcessing}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? '취소 처리 중...' : '결제 취소 신청하기'}
              </Button>

              <div className="mt-4">
                <Link href="/mypage/applications" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#D4E3FF] bg-transparent py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20"
                  >
                    돌아가기
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-center text-xs text-gray-500 italic">
                취소 신청 후에는 변경이 불가능합니다
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
