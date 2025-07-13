'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Calendar,
  DollarSign,
  Edit,
  Eye,
  Pause,
  Plus,
  Search,
  Trash2,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const badgeActive =
  'inline-flex items-center gap-1 rounded-full bg-[#E6F9F0] text-[#22C55E] px-3 py-1 text-xs font-bold border border-[#B6F2D6]'
const badgeExpired =
  'inline-flex items-center gap-1 rounded-full bg-[#FFF0F0] text-[#FF3B30] px-3 py-1 text-xs font-bold border border-[#FFD6D6]'

// 피그마 스타일용 색상/클래스
const bgMain = 'bg-[#F8FAFD] min-h-screen py-10'
const cardClass = 'rounded-2xl shadow-lg bg-white border-0'
const tabWrap = 'flex gap-2 bg-[#F2F4FA] rounded-xl p-1 w-fit mb-8'
const tabBtn = 'px-6 py-2 rounded-lg font-bold transition text-base'
const tabActive =
  'bg-gradient-to-r from-[#A7BFFF] to-[#E1D8FB] text-[#7B61FF] shadow'
const tabInactive = 'text-[#B0B8C1] hover:bg-[#E3E8FF]'
const inputClass =
  'rounded-xl border border-[#E3E8FF] bg-white shadow-sm px-4 py-3 text-base w-full placeholder:text-[#B0B8C1] focus:border-[#8BB5FF] focus:ring-2 focus:ring-[#8BB5FF]/20 focus:bg-white transition'
// 버튼 스타일 축소
const btnMain =
  'rounded-xl bg-[#E3E8FF] text-[#7B61FF] font-medium shadow px-4 py-2 text-sm hover:bg-[#A7BFFF] transition flex items-center gap-2'

// 쿠폰 타입 정의
interface Coupon {
  id: string
  name: string
  discount: number
  minAmount: number
  totalQuantity: number
  usedQuantity: number
  remainingQuantity: number
  createdDate: string
  expiryDate: string
  status: 'active' | 'inactive' | 'expired'
  description: string
  totalDiscount: number
  averageOrderAmount: number
  dailyUsage: number
}

// 더미 데이터
const dummyCoupons: Coupon[] = [
  {
    id: '1000',
    name: '신규회원 특별할인',
    discount: 30,
    minAmount: 50000,
    totalQuantity: 100,
    usedQuantity: 50,
    remainingQuantity: 50,
    createdDate: '2024년 1월 8일',
    expiryDate: '2024년 12월 31일',
    status: 'active',
    description:
      '신규 회원을 위한 특별 할인 쿠폰입니다. 첫 구매 시 30% 할인 혜택을 제공하며, 최소 주문금액 50,000원 이상 구매 시 사용 가능합니다.',
    totalDiscount: 79500,
    averageOrderAmount: 88333,
    dailyUsage: 2.5,
  },
  {
    id: '1001',
    name: 'VIP 회원 전용',
    discount: 25,
    minAmount: 100000,
    totalQuantity: 50,
    usedQuantity: 15,
    remainingQuantity: 35,
    createdDate: '2024년 1월 7일',
    expiryDate: '2024년 11월 30일',
    status: 'active',
    description:
      'VIP 회원을 위한 전용 할인 쿠폰입니다. 25% 할인 혜택을 제공하며, 최소 주문금액 100,000원 이상 구매 시 사용 가능합니다.',
    totalDiscount: 45000,
    averageOrderAmount: 120000,
    dailyUsage: 1.2,
  },
  {
    id: '1002',
    name: '주말 특가 쿠폰',
    discount: 20,
    minAmount: 30000,
    totalQuantity: 200,
    usedQuantity: 200,
    remainingQuantity: 0,
    createdDate: '2024년 1월 6일',
    expiryDate: '2024년 1월 15일',
    status: 'expired',
    description:
      '주말에만 사용 가능한 특가 쿠폰입니다. 20% 할인 혜택을 제공하며, 최소 주문금액 30,000원 이상 구매 시 사용 가능합니다.',
    totalDiscount: 120000,
    averageOrderAmount: 75000,
    dailyUsage: 15.0,
  },
]

// 쿠폰 상세 보기 컴포넌트
function CouponDetailView({
  coupon,
  onBack,
}: {
  coupon: Coupon
  onBack: () => void
}) {
  const usageRate = (coupon.usedQuantity / coupon.totalQuantity) * 100

  const usageHistory = [
    {
      user: '김철수',
      date: '2024-01-10',
      orderAmount: 80000,
      discountAmount: 24000,
    },
    {
      user: '이영희',
      date: '2024-01-09',
      orderAmount: 120000,
      discountAmount: 36000,
    },
    {
      user: '박민수',
      date: '2024-01-08',
      orderAmount: 65000,
      discountAmount: 19500,
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-blue-500">
              <Eye className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#8BB5FF]">
              쿠폰 상세 정보
            </h2>
          </div>
          <p className="text-gray-600">
            {coupon.name} 쿠폰의 상세 정보를 확인할 수 있습니다.
          </p>
        </div>
        <Button onClick={onBack} variant="outline">
          ← 목록으로 돌아가기
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 메인 정보 */}
        <div className="space-y-6 lg:col-span-2">
          {/* 기본 정보 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰명
                  </Label>
                  <div className="rounded-lg border bg-gray-50 p-3">
                    <span className="font-medium text-gray-900">
                      {coupon.name}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰 ID
                  </Label>
                  <div className="rounded-lg border bg-gray-50 p-3">
                    <span className="font-mono text-gray-600">{coupon.id}</span>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    할인율
                  </Label>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <span className="text-lg font-bold text-red-600">
                      {coupon.discount}%
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    최소 주문금액
                  </Label>
                  <div className="rounded-lg border bg-gray-50 p-3">
                    <span className="font-medium text-gray-900">
                      {coupon.minAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    생성일
                  </Label>
                  <div className="rounded-lg border bg-gray-50 p-3">
                    <span className="text-gray-900">{coupon.createdDate}</span>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    유효기간
                  </Label>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                    <span className="font-medium text-green-700">
                      {coupon.expiryDate}까지
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Label className="mb-2 block text-sm font-medium text-gray-700">
                  쿠폰 설명
                </Label>
                <div className="rounded-lg border bg-gray-50 p-4">
                  <p className="text-gray-700">{coupon.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 사용 내역 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                최근 사용 내역
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        사용자
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        사용일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        주문금액
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        할인금액
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {usageHistory.map((usage, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                          {usage.user}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                          {usage.date}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                          {usage.orderAmount.toLocaleString()}원
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-red-600">
                          -{usage.discountAmount.toLocaleString()}원
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 상태 정보 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Calendar className="mr-2 h-5 w-5 text-green-600" />
                현재 상태
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">상태</span>
                <Badge
                  className={
                    coupon.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : coupon.status === 'inactive'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                  }
                >
                  {coupon.status === 'active'
                    ? '활성'
                    : coupon.status === 'inactive'
                      ? '비활성'
                      : '만료'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">발행 수량</span>
                <span className="text-sm font-medium text-gray-900">
                  {coupon.totalQuantity}개
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">사용된 수량</span>
                <span className="text-sm font-medium text-blue-600">
                  {coupon.usedQuantity}개
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">잔여 수량</span>
                <span className="text-sm font-medium text-green-600">
                  {coupon.remainingQuantity}개
                </span>
              </div>
              <div className="pt-2">
                <div className="mb-1 flex justify-between text-sm text-gray-600">
                  <span>사용률</span>
                  <span>{usageRate.toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${usageRate}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 통계 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <DollarSign className="mr-2 h-5 w-5 text-purple-600" />
                사용 통계
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">총 할인 금액</span>
                <span className="text-sm font-bold text-red-600">
                  ₩{coupon.totalDiscount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">평균 주문 금액</span>
                <span className="text-sm font-medium text-gray-900">
                  ₩{coupon.averageOrderAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">일일 평균 사용</span>
                <span className="text-sm font-medium text-gray-900">
                  {coupon.dailyUsage}개
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼들 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardContent className="space-y-3 p-6">
              <Button className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] hover:from-blue-600 hover:to-blue-700">
                <Edit className="mr-2 h-4 w-4" />
                쿠폰 수정
              </Button>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <Pause className="mr-2 h-4 w-4" />
                쿠폰 비활성화
              </Button>
              <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                쿠폰 삭제
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// 쿠폰 생성 폼 컴포넌트
function CouponCreateForm() {
  const [formData, setFormData] = useState({
    name: '',
    discount: '',
    minAmount: '',
    totalQuantity: '',
    expiryDate: '',
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 쿠폰 생성 로직
    console.log('쿠폰 생성:', formData)
  }

  return (
    <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900">
          <Plus className="mr-2 h-5 w-5 text-green-600" />새 쿠폰 생성
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                쿠폰명
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="쿠폰명을 입력하세요"
                className="h-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-[#8BB5FF] focus:bg-white focus:ring-2 focus:ring-[#8BB5FF]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="discount"
                className="text-sm font-medium text-gray-700"
              >
                할인율 (%)
              </Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: e.target.value })
                }
                placeholder="할인율을 입력하세요"
                min="1"
                max="100"
                className="h-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-400/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="minAmount"
                className="text-sm font-medium text-gray-700"
              >
                최소 주문금액
              </Label>
              <Input
                id="minAmount"
                type="number"
                value={formData.minAmount}
                onChange={(e) =>
                  setFormData({ ...formData, minAmount: e.target.value })
                }
                placeholder="최소 주문금액을 입력하세요"
                className="h-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-[#8BB5FF] focus:bg-white focus:ring-2 focus:ring-[#8BB5FF]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="totalQuantity"
                className="text-sm font-medium text-gray-700"
              >
                발행 수량
              </Label>
              <Input
                id="totalQuantity"
                type="number"
                value={formData.totalQuantity}
                onChange={(e) =>
                  setFormData({ ...formData, totalQuantity: e.target.value })
                }
                placeholder="발행 수량을 입력하세요"
                className="h-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-[#8BB5FF] focus:bg-white focus:ring-2 focus:ring-[#8BB5FF]/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="expiryDate"
                className="text-sm font-medium text-gray-700"
              >
                유효기간
              </Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="h-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-400/20"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              쿠폰 설명
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="쿠폰에 대한 설명을 입력하세요"
              rows={4}
              className="resize-none border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-[#8BB5FF] focus:bg-white focus:ring-2 focus:ring-[#8BB5FF]/20"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="h-12 bg-gradient-to-r from-green-500 to-green-600 shadow-lg transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-xl"
            >
              <Plus className="mr-2 h-4 w-4" />
              쿠폰 생성
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// 쿠폰 목록 컴포넌트
function CouponList({
  coupons,
  onDetail,
}: {
  coupons: Coupon[]
  onDetail: (coupon: Coupon) => void
}) {
  return (
    <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-gray-900">
          <div className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
            쿠폰 목록
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="쿠폰 검색..."
                className="h-12 w-64 border-2 border-gray-200 bg-white/80 pl-10 backdrop-blur-sm transition-all duration-200 focus:border-[#8BB5FF] focus:bg-white focus:ring-2 focus:ring-[#8BB5FF]/20"
              />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  쿠폰명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  할인율
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  수량
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  최소주문금액
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  유효기간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {coupon.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-red-600">
                    {coupon.discount}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {coupon.usedQuantity}/{coupon.totalQuantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {coupon.minAmount.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {coupon.expiryDate}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge
                      className={
                        coupon.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : coupon.status === 'inactive'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-red-100 text-red-800'
                      }
                    >
                      {coupon.status === 'active'
                        ? '활성'
                        : coupon.status === 'inactive'
                          ? '비활성'
                          : '만료'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDetail(coupon)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// 메인 페이지 컴포넌트
export default function CouponAdminPage() {
  const [tab, setTab] = useState<'list' | 'create' | 'search'>('list')
  const [search, setSearch] = useState('')
  const [statusTab, setStatusTab] = useState<
    'all' | 'active' | 'used' | 'expired'
  >('all')
  const [coupons] = useState<Coupon[]>(dummyCoupons)

  // 검색/필터링
  const filtered = coupons.filter((c) => {
    const match = c.name.includes(search) || c.description.includes(search)
    if (statusTab === 'all') return match
    if (statusTab === 'active') return c.status === 'active' && match
    if (statusTab === 'expired') return c.status === 'expired' && match
    if (statusTab === 'used') return c.usedQuantity > 0 && match
    return match
  })

  // 통계
  const totalCount = coupons.length
  const activeCount = coupons.filter((c) => c.status === 'active').length
  const usedCount = coupons.reduce((sum, c) => sum + c.usedQuantity, 0)
  const totalDiscount = coupons.reduce((sum, c) => sum + c.totalDiscount, 0)

  // 탭 UI
  const TabBar = (
    <div className={tabWrap}>
      <button
        className={cn(tabBtn, tab === 'list' ? tabActive : tabInactive)}
        onClick={() => setTab('list')}
      >
        쿠폰 목록
      </button>
      <button
        className={cn(tabBtn, tab === 'create' ? tabActive : tabInactive)}
        onClick={() => setTab('create')}
      >
        쿠폰 생성
      </button>
      <button
        className={cn(tabBtn, tab === 'search' ? tabActive : tabInactive)}
        onClick={() => setTab('search')}
      >
        쿠폰 조회
      </button>
    </div>
  )

  // 상단 타이틀/설명
  const Header = (
    <div className="mb-8">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[#A7BFFF] to-[#E1D8FB]">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-7h2v2h-2v-2zm0-8h2v6h-2V5z"
              fill="#7B61FF"
            />
          </svg>
        </span>
        <h1 className="text-2xl font-bold text-[#7B61FF]">쿠폰 관리</h1>
      </div>
      <p className="text-gray-500">쿠폰을 생성하고 관리할 수 있습니다.</p>
    </div>
  )

  // 쿠폰 목록 테이블
  function CouponList({
    coupons,
    onDetail,
  }: {
    coupons: Coupon[]
    onDetail: (coupon: Coupon) => void
  }) {
    return (
      <div className={cardClass + ' p-8'}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center text-lg">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm2 0v10h12V7H6zm2 2h8v2H8V9zm0 4h5v2H8v-2z"
                  fill="#7B61FF"
                />
              </svg>
            </span>
            <span className="text-lg font-bold text-gray-900">
              최근 생성된 쿠폰
            </span>
          </div>
          <button className={btnMain}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                d="M5 20h14a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14-8V7a2 2 0 00-2-2H7a2 2 0 00-2 2v5m14 0H5m14 0a2 2 0 01-2 2H7a2 2 0 01-2-2"
                stroke="#7B61FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            내보내기
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-base">
            <thead>
              <tr className="border-b-2 border-[#E3E8FF] bg-[#F6F7FB] text-sm font-medium text-[#7B61FF]">
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  쿠폰명
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  할인율
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  수량
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  최소주문금액
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  유효기간
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  상태
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  사용횟수
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  생성일
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  액션
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr
                  key={c.id}
                  className="border-b text-sm font-normal last:border-0 hover:bg-[#F0F4FF]"
                >
                  <td className="px-4 py-2 font-normal whitespace-nowrap text-gray-900">
                    {c.name}
                  </td>
                  <td className="px-4 py-2 font-medium whitespace-nowrap text-[#FF3B30]">
                    {c.discount}%
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {c.usedQuantity}/{c.totalQuantity}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {c.minAmount.toLocaleString()}원
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {c.expiryDate}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {c.status === 'active' ? (
                      <span className={badgeActive + ' text-xs font-medium'}>
                        활성
                      </span>
                    ) : (
                      <span className={badgeExpired + ' text-xs font-medium'}>
                        종료
                      </span>
                    )}
                  </td>
                  <td className="cursor-pointer px-4 py-2 font-bold whitespace-nowrap text-[#2563eb] underline">
                    {c.usedQuantity}회
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {c.createdDate}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <button
                        className="rounded-full border border-gray-200 bg-white p-2 shadow transition hover:bg-[#F6F7FB]"
                        title="상세보기"
                        onClick={() => onDetail(c)}
                      >
                        <Eye className="h-5 w-5 text-[#7B61FF]" />
                      </button>
                      <button
                        className="rounded-full border border-gray-200 bg-white p-2 shadow transition hover:bg-[#F6F7FB]"
                        title="수정"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-full border border-gray-200 bg-white p-2 shadow transition hover:bg-[#FFF0F0]"
                        title="삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // 쿠폰 생성 폼 (피그마 스타일)
  function CouponCreateForm() {
    const [formData, setFormData] = useState({
      name: '',
      discount: '',
      minAmount: '',
      totalQuantity: '',
      expiryDate: '',
      description: '',
    })
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // 쿠폰 생성 로직
      console.log('쿠폰 생성:', formData)
    }
    return (
      <div className={cardClass + ' p-8'}>
        <div className="mb-4 flex items-center gap-2 text-lg font-bold">
          <span className="text-xl text-[#7B61FF]">+</span> 새 쿠폰 생성
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                쿠폰 이름
              </label>
              <div className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="예: 신규회원 특별할인"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                발행 수량
              </label>
              <div className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="100"
                  value={formData.totalQuantity}
                  onChange={(e) =>
                    setFormData({ ...formData, totalQuantity: e.target.value })
                  }
                />
                <span className="font-bold text-[#B0B8C1]">개</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                할인율 (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="30"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
                />
                <span className="font-bold text-[#B0B8C1]">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                최소 주문금액 (원)
              </label>
              <div className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="50000"
                  value={formData.minAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, minAmount: e.target.value })
                  }
                />
                <span className="font-bold text-[#B0B8C1]">원</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                유효기간
              </label>
              <div className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="yyyy-mm-dd"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#7B61FF]">
              쿠폰 설명
            </label>
            <textarea
              className={inputClass + ' resize-none'}
              placeholder="쿠폰에 대한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className={
                btnMain + ' bg-[#F2F4FA] text-[#7B61FF] hover:bg-[#E3E8FF]'
              }
            >
              취소
            </button>
            <button
              type="submit"
              className={
                btnMain +
                ' bg-gradient-to-r from-[#A7BFFF] to-[#E1D8FB] text-[#7B61FF]'
              }
            >
              + 쿠폰 생성
            </button>
          </div>
        </form>
      </div>
    )
  }

  // 쿠폰 조회 탭
  const CouponSearchTab = (
    <>
      {/* 검색 인풋 */}
      <div className={cardClass + ' mb-6 flex flex-col gap-4 p-6'}>
        <div className="flex items-center gap-2">
          <span className="text-lg text-[#7B61FF]">
            <Search />
          </span>
          <input
            className={inputClass + ' max-w-xl'}
            placeholder="쿠폰명, 사용자명으로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={btnMain + ' ml-2 px-8'}>검색</button>
        </div>
      </div>
      {/* 통계 카드 */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="flex flex-col items-center rounded-2xl bg-[#EEF3FF] p-6 shadow">
          <span className="text-2xl font-bold text-[#7B61FF]">
            {totalCount}
          </span>
          <span className="mt-1 text-xs font-bold text-[#7B61FF]">
            총 쿠폰 수
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-[#E6F9F0] p-6 shadow">
          <span className="text-2xl font-bold text-[#22C55E]">
            {activeCount}
          </span>
          <span className="mt-1 text-xs font-bold text-[#22C55E]">
            활성 쿠폰
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-[#FFF9E3] p-6 shadow">
          <span className="text-2xl font-bold text-[#F59E42]">{usedCount}</span>
          <span className="mt-1 text-xs font-bold text-[#F59E42]">
            사용된 쿠폰
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-[#F3EEFF] p-6 shadow">
          <span className="text-2xl font-bold text-[#A78BFA]">
            ₩{(totalDiscount / 10000).toFixed(1)}만
          </span>
          <span className="mt-1 text-xs font-bold text-[#A78BFA]">
            총 할인액
          </span>
        </div>
      </div>
      {/* 상태별 탭/필터 */}
      <div className="mb-4 flex gap-2">
        <button
          className={cn(tabBtn, statusTab === 'all' ? tabActive : tabInactive)}
          onClick={() => setStatusTab('all')}
        >
          전체 쿠폰
        </button>
        <button
          className={cn(
            tabBtn,
            statusTab === 'active' ? tabActive : tabInactive,
          )}
          onClick={() => setStatusTab('active')}
        >
          활성 쿠폰
        </button>
        <button
          className={cn(tabBtn, statusTab === 'used' ? tabActive : tabInactive)}
          onClick={() => setStatusTab('used')}
        >
          사용된 쿠폰
        </button>
        <button
          className={cn(
            tabBtn,
            statusTab === 'expired' ? tabActive : tabInactive,
          )}
          onClick={() => setStatusTab('expired')}
        >
          종료 쿠폰
        </button>
        <div className="flex-1" />
        <button className={btnMain + ' px-4'}>내보내기</button>
      </div>
      {/* 결과 테이블 */}
      <div className={cardClass + ' overflow-x-auto p-0'}>
        <table className="w-full border-separate border-spacing-0 text-base">
          <thead>
            <tr className="border-b-2 border-[#E3E8FF] bg-[#F6F7FB] text-sm font-bold text-[#7B61FF]">
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                쿠폰명
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                할인율
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                수량
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                최소주문금액
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                유효기간
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                상태
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                사용횟수
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                생성일
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                액션
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-gray-400">
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr
                  key={c.id}
                  className="rounded-2xl border-b border-[#E3E8FF] bg-white transition last:border-0 hover:scale-[1.01] hover:shadow-lg"
                >
                  <td className="px-4 py-3 align-middle font-semibold whitespace-nowrap text-gray-900">
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm font-bold whitespace-nowrap text-[#FF3B30]">
                    {c.discount}%
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.usedQuantity}/{c.totalQuantity}
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.minAmount.toLocaleString()}원
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.expiryDate}
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    {c.status === 'active' ? (
                      <span className={badgeActive}>
                        <span>활</span>
                        <span>성</span>
                      </span>
                    ) : (
                      <span className={badgeExpired}>
                        <span>종</span>
                        <span>료</span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    <Link
                      href={'/admin/coupon/' + c.id}
                      className="font-bold text-[#2563eb] underline hover:text-[#7B61FF]"
                    >
                      {c.usedQuantity}회
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.createdDate}
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={'/admin/coupon/' + c.id}
                        className="rounded-full border border-[#E3E8FF] bg-white p-2 shadow transition hover:bg-[#F6F7FB]"
                        title="상세보기"
                      >
                        <Eye className="h-5 w-5 text-[#7B61FF]" />
                      </Link>
                      <Link
                        href={`/admin/coupon/${c.id}/edit`}
                        className="rounded-full border border-[#E3E8FF] bg-white p-2 shadow transition hover:bg-[#F6F7FB]"
                        title="수정"
                      >
                        <Edit className="h-5 w-5 text-[#22C55E]" />
                      </Link>
                      <button
                        onClick={() => alert('삭제 기능 구현 필요')}
                        className="rounded-full border border-[#E3E8FF] bg-white p-2 shadow transition hover:bg-[#FFF0F0]"
                        title="삭제"
                      >
                        <Trash2 className="h-5 w-5 text-[#FF3B30]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )

  return (
    <div className={bgMain}>
      <div className="mx-auto max-w-6xl px-4">
        {Header}
        {TabBar}
        {tab === 'list' && <CouponList coupons={coupons} onDetail={() => {}} />}
        {tab === 'create' && <CouponCreateForm />}
        {tab === 'search' && CouponSearchTab}
      </div>
    </div>
  )
}
