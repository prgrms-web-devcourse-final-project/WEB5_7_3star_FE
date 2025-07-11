'use client'

import { useState } from 'react'
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
import { Ticket, X, Zap, CreditCard } from 'lucide-react'

interface Coupon {
  id: string
  name: string
  discount: number
  minAmount: number
  maxDiscount: number
  usable: boolean
}

export default function PaymentPage() {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('kakao')

  const originalAmount = 25000
  const coupons: Coupon[] = [
    {
      id: 'new-member',
      name: '신규회원 특별할인',
      discount: 30,
      minAmount: 50000,
      maxDiscount: 10000,
      usable: false,
    },
    {
      id: 'first-lesson',
      name: '첫 레슨 할인',
      discount: 30,
      minAmount: 20000,
      maxDiscount: 7500,
      usable: true,
    },
    {
      id: 'weekend-special',
      name: '주말 특가',
      discount: 20,
      minAmount: 30000,
      maxDiscount: 5000,
      usable: false,
    },
  ]

  const calculateDiscount = (coupon: Coupon) => {
    if (!coupon.usable) return 0
    return Math.min(
      originalAmount * (coupon.discount / 100),
      coupon.maxDiscount,
    )
  }

  const finalAmount = selectedCoupon
    ? originalAmount - calculateDiscount(selectedCoupon)
    : originalAmount

  const handleCouponSelect = (coupon: Coupon) => {
    if (!coupon.usable) {
      alert('최소 주문금액을 충족하지 않아 이 쿠폰을 사용할 수 없습니다.')
      return
    }
    setSelectedCoupon(coupon)
    setIsModalOpen(false)
  }

  const handleCouponRemove = () => {
    setSelectedCoupon(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-500">
          <span>홈</span> / <span>레슨</span> /{' '}
          <span className="text-gray-900">결제</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-[#8BB5FF]">결제하기</h2>
          <p className="text-gray-600">
            안전하고 간편한 결제로 레슨을 예약하세요
          </p>
        </div>

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
                      요가 기초반 - 몸과 마음의 균형
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      2024년 1월 15일 오후 2:00
                    </p>
                    <p className="text-sm text-gray-600">강남구 요가스튜디오</p>
                    <div className="mt-2 text-right">
                      <span className="text-lg font-bold text-gray-900">
                        25,000원
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">레슨 가격</span>
                    <span className="font-medium">25,000원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">수수료</span>
                    <span className="font-medium text-green-600">무료</span>
                  </div>
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

            {/* 결제 방법 */}
            <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
              <CardHeader>
                <CardTitle>결제 방법</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 rounded-lg border border-yellow-300 bg-yellow-50 p-3">
                    <RadioGroupItem value="kakao" id="kakao" />
                    <Label
                      htmlFor="kakao"
                      className="flex cursor-pointer items-center"
                    >
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded bg-yellow-400">
                        <span className="text-xs font-bold text-white">K</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          카카오페이
                        </div>
                        <div className="text-sm text-gray-600">
                          간편하고 안전한 결제
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                    <RadioGroupItem value="toss" id="toss" />
                    <Label
                      htmlFor="toss"
                      className="flex cursor-pointer items-center"
                    >
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded bg-blue-500">
                        <span className="text-xs font-bold text-white">T</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          토스페이
                        </div>
                        <div className="text-sm text-gray-600">
                          빠르고 간편한 결제
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <Label
                      htmlFor="card"
                      className="flex cursor-pointer items-center"
                    >
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded bg-gray-600">
                        <CreditCard className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          신용카드
                        </div>
                        <div className="text-sm text-gray-600">
                          안전한 카드 결제
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* 쿠폰 및 결제 버튼 */}
          <div className="space-y-6">
            {/* 쿠폰 선택 */}
            <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  쿠폰 사용
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCoupon ? (
                  <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
                    <div>
                      <p className="font-medium text-green-800">
                        {selectedCoupon.name}
                      </p>
                      <p className="text-sm text-green-600">
                        {selectedCoupon.discount}% 할인
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCouponRemove}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Ticket className="mr-2 h-4 w-4" />
                        쿠폰 선택
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>사용 가능한 쿠폰</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        {coupons.map((coupon) => (
                          <div
                            key={coupon.id}
                            className={`flex items-center justify-between rounded-lg border p-3 ${
                              coupon.usable
                                ? 'border-green-200 bg-green-50'
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div>
                              <p className="font-medium">{coupon.name}</p>
                              <p className="text-sm text-gray-600">
                                {coupon.discount}% 할인 (최대{' '}
                                {coupon.maxDiscount.toLocaleString()}원)
                              </p>
                              {!coupon.usable && (
                                <p className="text-xs text-red-600">
                                  최소 주문금액{' '}
                                  {coupon.minAmount.toLocaleString()}원
                                </p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleCouponSelect(coupon)}
                              disabled={!coupon.usable}
                              className={
                                coupon.usable
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-gray-400'
                              }
                            >
                              {coupon.usable ? '사용' : '불가'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>

            {/* 최종 결제 정보 */}
            <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
              <CardHeader>
                <CardTitle>최종 결제 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">레슨 가격</span>
                    <span className="font-medium">
                      {originalAmount.toLocaleString()}원
                    </span>
                  </div>
                  {selectedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>쿠폰 할인</span>
                      <span>
                        -{calculateDiscount(selectedCoupon).toLocaleString()}원
                      </span>
                    </div>
                  )}
                  <hr className="my-4" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>최종 결제금액</span>
                    <span className="text-[#8BB5FF]">
                      {finalAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      이용약관 및 개인정보처리방침에 동의합니다
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" />
                    <Label htmlFor="marketing" className="text-sm">
                      마케팅 정보 수신에 동의합니다 (선택)
                    </Label>
                  </div>
                </div>

                <Button className="mt-6 w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-white hover:from-[#7AA4FF] hover:to-[#B3A4F6]">
                  {finalAmount.toLocaleString()}원 결제하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
