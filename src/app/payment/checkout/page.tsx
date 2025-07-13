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
import { Ticket, X, Check, Zap, CreditCard } from 'lucide-react'
import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'

interface Coupon {
  id: string
  name: string
  discount: number
  minAmount: number
  maxDiscount: number
  usable: boolean
}

export default function PaymentCheckout() {
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
                      <div className="font-medium text-gray-900">토스페이</div>
                      <div className="text-sm text-gray-600">
                        빠르고 간편한 결제
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* 약관 동의 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms1" defaultChecked />
                  <Label htmlFor="terms1" className="text-sm">
                    결제 서비스 이용약관에 동의합니다 (필수)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms2" defaultChecked />
                  <Label htmlFor="terms2" className="text-sm">
                    개인정보 수집 및 이용에 동의합니다 (필수)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms3" defaultChecked />
                  <Label htmlFor="terms3" className="text-sm">
                    레슨 취소 및 환불 정책에 동의합니다 (필수)
                  </Label>
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
              <div className="mb-6 rounded-lg border border-dashed border-gray-300 bg-gradient-to-r from-[#D4E3FF]/50 to-[#E1D8FB]/50 p-4">
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
                        {coupons.map((coupon) => (
                          <div
                            key={coupon.id}
                            onClick={() => handleCouponSelect(coupon)}
                            className={`cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
                              coupon.usable
                                ? 'border-gray-200 hover:border-[#8BB5FF] hover:bg-blue-50'
                                : 'cursor-not-allowed border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={`mr-3 flex h-12 w-12 items-center justify-center rounded-lg ${
                                    coupon.id === 'new-member'
                                      ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                      : coupon.id === 'first-lesson'
                                        ? 'bg-gradient-to-r from-green-500 to-teal-500'
                                        : 'bg-gradient-to-r from-orange-500 to-red-500'
                                  }`}
                                >
                                  <span className="text-sm font-bold text-white">
                                    {coupon.discount}%
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {coupon.name}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {coupon.discount}% 할인 (최대{' '}
                                    {coupon.maxDiscount.toLocaleString()}원)
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    최소 주문금액:{' '}
                                    {coupon.minAmount.toLocaleString()}원
                                  </div>
                                </div>
                              </div>
                              {coupon.usable ? (
                                <Check className="h-5 w-5 text-green-500" />
                              ) : (
                                <X className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {selectedCoupon ? (
                  <div className="rounded-lg border border-green-200 bg-white p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          {selectedCoupon.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedCoupon.discount}% 할인 적용
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
              </div>

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
              <Button className="mt-6 w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#7AA8FF] hover:to-[#B8A8F5] hover:shadow-xl">
                <CreditCard className="mr-2 h-5 w-5" />
                {finalAmount.toLocaleString()}원 결제하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
