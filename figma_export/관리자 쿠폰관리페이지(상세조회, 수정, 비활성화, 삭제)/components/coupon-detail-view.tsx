'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from './header'
import {
  Eye,
  Edit,
  Pause,
  Trash2,
  BarChart3,
  Users,
  Calendar,
  DollarSign,
} from 'lucide-react'

export function CouponDetailView() {
  const [couponData] = useState({
    id: '#1000',
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
  })

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

  const usageRate = (couponData.usedQuantity / couponData.totalQuantity) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="mb-2 flex items-center">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-blue-500">
              <Eye className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#8BB5FF]">
              쿠폰 상세 정보
            </h2>
          </div>
          <p className="text-gray-600">
            {couponData.name} 쿠폰의 상세 정보를 확인할 수 있습니다.
          </p>
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
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      쿠폰명
                    </label>
                    <div className="rounded-lg border bg-gray-50 p-3">
                      <span className="font-medium text-gray-900">
                        {couponData.name}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      쿠폰 ID
                    </label>
                    <div className="rounded-lg border bg-gray-50 p-3">
                      <span className="font-mono text-gray-600">
                        {couponData.id}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      할인율
                    </label>
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                      <span className="text-lg font-bold text-red-600">
                        {couponData.discount}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      최소 주문금액
                    </label>
                    <div className="rounded-lg border bg-gray-50 p-3">
                      <span className="font-medium text-gray-900">
                        {couponData.minAmount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      생성일
                    </label>
                    <div className="rounded-lg border bg-gray-50 p-3">
                      <span className="text-gray-900">
                        {couponData.createdDate}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      유효기간
                    </label>
                    <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                      <span className="font-medium text-green-700">
                        {couponData.expiryDate}까지
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰 설명
                  </label>
                  <div className="rounded-lg border bg-gray-50 p-4">
                    <p className="text-gray-700">{couponData.description}</p>
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
                  <Badge className="bg-green-100 text-green-800">활성</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">발행 수량</span>
                  <span className="text-sm font-medium text-gray-900">
                    {couponData.totalQuantity}개
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">사용된 수량</span>
                  <span className="text-sm font-medium text-blue-600">
                    {couponData.usedQuantity}개
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">잔여 수량</span>
                  <span className="text-sm font-medium text-green-600">
                    {couponData.remainingQuantity}개
                  </span>
                </div>
                <div className="pt-2">
                  <div className="mb-1 flex justify-between text-sm text-gray-600">
                    <span>사용률</span>
                    <span>{usageRate}%</span>
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
                    ₩{couponData.totalDiscount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">평균 주문 금액</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₩{couponData.averageOrderAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">일일 평균 사용</span>
                  <span className="text-sm font-medium text-gray-900">
                    {couponData.dailyUsage}개
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
    </div>
  )
}
