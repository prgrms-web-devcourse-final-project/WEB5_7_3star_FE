'use client'

import { useState, useEffect, use } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Ticket, X, Check, Zap, CreditCard, Loader2 } from 'lucide-react'
import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import { getLessonDetail } from '@/lib/api/profile'
import { getAvailableCoupons, getMyCoupons } from '@/lib/api/coupon'
import { preparePayment } from '@/lib/api/payment'
import { useAuth } from '@/hooks/useAuth'

interface Coupon {
  couponId: number
  couponName: string
  discountPrice: string
  minOrderPrice: number
  expirationDate: string
  ownedStatus: 'OWNED' | 'NOT_OWNED' | 'EXPIRED'
  quantity?: number
  category: 'OPEN_RUN' | 'NORMAL'
  openTime?: string
}

interface LessonDetail {
  id?: number
  lessonName?: string
  description?: string
  lessonLeader?: number
  lessonLeaderName?: string
  profileIntro?: string
  profileImage?: string
  likeCount?: number
  reviewCount?: number
  rating?: number
  category?: string
  price?: number
  maxParticipants?: number
  currentParticipants?: number
  status?: string
  startAt?: string
  endAt?: string
  openTime?: string
  openRun?: boolean
  city?: string
  district?: string
  dong?: string
  ri?: string
  addressDetail?: string
  createdAt?: string
  updatedAt?: string
  lessonImages?: string[]
}

export default function PaymentCheckout({
  params,
}: {
  params: Promise<{ lessonId: string }>
}) {
  const { lessonId } = use(params)
  const router = useRouter()
  console.log(lessonId)
  const { user } = useAuth()

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tossReady, setTossReady] = useState(false)

  const [lessonDetail, setLessonDetail] = useState<LessonDetail | null>(null)
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([])
  const [myCoupons, setMyCoupons] = useState<Coupon[]>([])

  // 토스페이먼츠 SDK 로드 상태 확인
  useEffect(() => {
    const checkTossSDK = () => {
      if (typeof window !== 'undefined' && (window as any).TossPayments) {
        setTossReady(true)
        return true
      }
      return false
    }

    // 즉시 확인
    if (checkTossSDK()) return

    // 주기적으로 확인
    const interval = setInterval(() => {
      if (checkTossSDK()) {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // 레슨 상세 정보 로드
  const loadLessonDetail = async () => {
    try {
      const response = await getLessonDetail(lessonId)
      if (response.data) {
        setLessonDetail(response.data)
      }
    } catch (err) {
      console.error('레슨 정보 로딩 에러:', err)
      setError('레슨 정보를 불러오는 중 오류가 발생했습니다.')
    }
  }

  // 발급 가능한 쿠폰 로드
  const loadAvailableCoupons = async () => {
    try {
      const response = await getAvailableCoupons()
      if (response.data?.coupons) {
        setAvailableCoupons(response.data.coupons)
      }
    } catch (err) {
      console.error('발급 가능한 쿠폰 로딩 에러:', err)
    }
  }

  // 내 쿠폰 로드
  const loadMyCoupons = async () => {
    try {
      const response = await getMyCoupons()
      if (response.data?.userCoupons) {
        setMyCoupons(response.data.userCoupons)
      }
    } catch (err) {
      console.error('내 쿠폰 로딩 에러:', err)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await Promise.all([
        loadLessonDetail(),
        // loadAvailableCoupons(),
        // loadMyCoupons(),
      ])
      setIsLoading(false)
    }

    if (lessonId) {
      loadData()
    }
  }, [lessonId])

  // 사용 가능한 쿠폰 필터링 (내가 보유한 쿠폰 + 발급 가능한 쿠폰)
  const usableCoupons = [
    ...myCoupons.filter((coupon) => coupon.ownedStatus === 'OWNED'),
    ...availableCoupons.filter((coupon) => coupon.ownedStatus === 'NOT_OWNED'),
  ]

  const originalAmount = lessonDetail?.price || 0

  const calculateDiscount = (coupon: Coupon) => {
    if (!lessonDetail) return 0

    // discountPrice가 "10%" 형태인지 "1000원" 형태인지 확인
    const discountText = coupon.discountPrice
    let discountAmount = 0

    if (discountText.includes('%')) {
      // 퍼센트 할인
      const discountPercent = parseInt(discountText.replace('%', ''))
      discountAmount = Math.floor(originalAmount * (discountPercent / 100))
    } else if (discountText.includes('원')) {
      // 금액 할인
      discountAmount = parseInt(discountText.replace('원', ''))
    } else {
      // 숫자만 있는 경우 금액으로 처리
      discountAmount = parseInt(discountText)
    }

    return Math.min(discountAmount, originalAmount)
  }

  const finalAmount = selectedCoupon
    ? originalAmount - calculateDiscount(selectedCoupon)
    : originalAmount

  const handleCouponSelect = (coupon: Coupon) => {
    if (originalAmount < coupon.minOrderPrice) {
      alert(
        `최소 주문금액 ${coupon.minOrderPrice.toLocaleString()}원을 충족하지 않아 이 쿠폰을 사용할 수 없습니다.`,
      )
      return
    }
    setSelectedCoupon(coupon)
    setIsModalOpen(false)
  }

  const handleCouponRemove = () => {
    setSelectedCoupon(null)
  }

  const handlePayment = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!lessonDetail) {
      alert('레슨 정보를 불러올 수 없습니다.')
      return
    }

    if (!tossReady) {
      alert(
        '토스페이먼츠 SDK가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.',
      )
      return
    }

    setIsProcessing(true)
    try {
      const paymentData = {
        lessonId: +lessonId,
        userCouponId: null,
      }

      const response = await preparePayment(paymentData as any)
      const data = (response as any).data as any

      if (data && data.orderId && data.payPrice) {
        // 1. 결제 금액 저장
        await fetch('/api/proxy/api/v1/payments/saveAmount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: data.orderId,
            amount: data.payPrice,
          }),
          credentials: 'include',
        })

        // 2. 토스페이먼츠 결제 시작
        const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
        const tossPayments = (window as any).TossPayments(clientKey)

        tossPayments.requestPayment('카드', {
          amount: data.payPrice,
          orderId: data.orderId,
          orderName: data.lessonTitle || lessonDetail.lessonName || '레슨 예약',
          successUrl: `${window.location.origin}/payment/success`,
          failUrl: `${window.location.origin}/payment/failed`,
        })
      } else {
        alert('결제 준비에 실패했습니다.')
      }
    } catch (err) {
      console.error('결제 준비 에러:', err)
      alert('결제 준비 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <Container size="lg">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>결제 정보를 불러오는 중...</span>
          </div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="lg">
        <div className="py-20 text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <Button onClick={() => window.location.reload()}>다시 시도</Button>
        </div>
      </Container>
    )
  }

  if (!lessonDetail) {
    return (
      <Container size="lg">
        <div className="py-20 text-center">
          <p className="text-gray-500">레슨 정보를 찾을 수 없습니다.</p>
        </div>
      </Container>
    )
  }

  if (lessonDetail.price === 0) {
    return (
      <Container size="lg">
        <div className="py-20 text-center">
          <p className="text-gray-500">레슨 가격이 0원입니다.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container size="lg">
      <PageHeader
        title="결제하기"
        subtitle="안전하고 간편한 결제로 레슨을 예약하세요"
        align="center"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 주문 정보 */}
        <div className="space-y-6">
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle>주문 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4 rounded-lg bg-gray-50 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#8BB5FF]/20">
                  <Zap className="h-8 w-8 text-[#8BB5FF]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {lessonDetail.lessonName || '레슨명 없음'}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {lessonDetail.startAt
                      ? `${new Date(lessonDetail.startAt).toLocaleDateString('ko-KR')} ${new Date(lessonDetail.startAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`
                      : '날짜 정보 없음'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {lessonDetail.addressDetail || '주소 정보 없음'}
                  </p>
                  <div className="mt-2 text-right">
                    <span className="text-lg font-bold text-gray-900">
                      {lessonDetail.price
                        ? `${lessonDetail.price.toLocaleString()}원`
                        : '가격 정보 없음'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">레슨 가격</span>
                  <span className="font-medium">
                    {lessonDetail.price?.toLocaleString()}원
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">수수료</span>
                  <span className="font-medium text-green-600">무료</span>
                </div> */}
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>총 결제금액</span>
                  <span className="text-[#8BB5FF]">
                    {originalAmount.toLocaleString()}원
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 결제 요약 */}
        <div className="space-y-6">
          <Card className="sticky top-4 border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle>결제 요약</CardTitle>
            </CardHeader>
            <CardContent>
              {/* 쿠폰 선택 섹션 */}
              {/* <div className="mb-6 rounded-lg border border-dashed border-gray-300 bg-gradient-to-r from-[#D4E3FF]/50 to-[#E1D8FB]/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <Ticket className="mr-2 h-5 w-5 text-[#8BB5FF]" />
                    <span className="font-medium text-gray-900">쿠폰 할인</span>
                  </div>
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-sm font-medium text-[#8BB5FF] hover:text-[#7AA8FF]"
                      >
                        {selectedCoupon ? '쿠폰 변경' : '쿠폰 선택'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>사용 가능한 쿠폰</DialogTitle>
                      </DialogHeader>
                      <div className="max-h-96 space-y-4 overflow-y-auto">
                        {usableCoupons.length === 0 ? (
                          <div className="py-8 text-center text-gray-500">
                            사용 가능한 쿠폰이 없습니다
                          </div>
                        ) : (
                          usableCoupons.map((coupon) => {
                            const isUsable =
                              originalAmount >= coupon.minOrderPrice
                            return (
                              <div
                                key={coupon.couponId}
                                onClick={() =>
                                  isUsable && handleCouponSelect(coupon)
                                }
                                className={`cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
                                  isUsable
                                    ? 'border-gray-200 hover:border-[#8BB5FF] hover:bg-blue-50'
                                    : 'cursor-not-allowed border-gray-200 bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                                      <span className="text-sm font-bold text-white">
                                        {coupon.discountPrice}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">
                                        {coupon.couponName}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {coupon.discountPrice} 할인
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        최소 주문금액:{' '}
                                        {coupon.minOrderPrice.toLocaleString()}
                                        원
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        만료일:{' '}
                                        {new Date(
                                          coupon.expirationDate,
                                        ).toLocaleDateString('ko-KR')}
                                      </div>
                                    </div>
                                  </div>
                                  {isUsable ? (
                                    <Check className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <X className="h-5 w-5 text-gray-400" />
                                  )}
                                </div>
                              </div>
                            )
                          })
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {selectedCoupon ? (
                  <div className="rounded-lg border border-green-200 bg-white p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          {selectedCoupon.couponName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedCoupon.discountPrice} 할인 적용
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCouponRemove}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    사용 가능한 쿠폰이 없습니다
                  </div>
                )}
              </div> */}

              {/* 결제 금액 계산 */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">레슨 가격</span>
                  <span>{originalAmount.toLocaleString()}원</span>
                </div>
                {selectedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">쿠폰 할인</span>
                    <span className="text-green-600">
                      -{calculateDiscount(selectedCoupon).toLocaleString()}원
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">수수료</span>
                  <span className="text-green-600">무료</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold">
                  <span>최종 결제금액</span>
                  <span className="text-[#8BB5FF]">
                    {finalAmount.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* 결제 버튼 */}
              <Button
                className="mt-6 w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#7AA8FF] hover:to-[#B8A8F5] hover:shadow-xl"
                onClick={handlePayment}
                disabled={isProcessing || !tossReady}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    결제 준비 중...
                  </>
                ) : !tossReady ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    SDK 로드 중...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    {finalAmount.toLocaleString()}원 결제하기
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
