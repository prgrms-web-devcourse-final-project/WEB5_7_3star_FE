'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Calendar,
  DollarSign,
  Edit,
  Pause,
  Trash2,
  Users,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Container from '@/components/Container'

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
  activationDate: string
  expiryDate: string
  couponType: string
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
    activationDate: '2024년 1월 8일',
    expiryDate: '2024년 12월 31일',
    couponType: '일반쿠폰',
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
    activationDate: '2024년 1월 7일',
    expiryDate: '2024년 11월 30일',
    couponType: 'VIP쿠폰',
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
    activationDate: '2024년 1월 6일',
    expiryDate: '2024년 1월 15일',
    couponType: '특가쿠폰',
    status: 'expired',
    description:
      '주말에만 사용 가능한 특가 쿠폰입니다. 20% 할인 혜택을 제공하며, 최소 주문금액 30,000원 이상 구매 시 사용 가능합니다.',
    totalDiscount: 120000,
    averageOrderAmount: 75000,
    dailyUsage: 15.0,
  },
]

export default function CouponDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [coupon, setCoupon] = useState<Coupon | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 실제로는 API 호출을 통해 쿠폰 데이터를 가져옴
    const foundCoupon = dummyCoupons.find((c) => c.id === params.id)
    if (foundCoupon) {
      setCoupon(foundCoupon)
    }
    setLoading(false)
  }, [params.id])

  const usageRate = coupon
    ? (coupon.usedQuantity / coupon.totalQuantity) * 100
    : 0

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

  const handleEdit = () => {
    // 쿠폰 수정 페이지로 이동
    router.push(`/admin/coupon/${coupon?.id}/edit`)
  }

  const handleDeactivate = () => {
    // 쿠폰 비활성화 로직
    console.log('쿠폰 비활성화:', coupon?.id)
  }

  const handleDelete = () => {
    // 쿠폰 삭제 로직
    console.log('쿠폰 삭제:', coupon?.id)
    router.push('/admin/coupon')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#8BB5FF]"></div>
          <p className="mt-4 text-gray-600">쿠폰 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!coupon) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            쿠폰을 찾을 수 없습니다
          </h2>
          <p className="mb-6 text-gray-600">
            요청하신 쿠폰이 존재하지 않거나 삭제되었습니다.
          </p>
          <Button onClick={() => router.push('/admin/coupon')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            쿠폰 목록으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Container size="lg">
      <PageHeader
        title="쿠폰 상세 정보"
        subtitle={`${coupon.name} 쿠폰의 상세 정보를 확인할 수 있습니다.`}
        align="left"
        right={
          <Button
            onClick={() => router.push('/admin/coupon')}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Button>
        }
      />

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
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="font-medium text-gray-900">
                      {coupon.name}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰 ID
                  </label>
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="font-mono text-gray-600">{coupon.id}</span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    할인율 또는 할인금액
                  </label>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <span className="text-lg font-bold text-red-600">
                      {coupon.discount}%
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    최소 주문금액
                  </label>
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="font-medium text-gray-900">
                      {coupon.minAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰 활성화 날짜
                  </label>
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="text-gray-900">
                      {coupon.activationDate}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    유효기간
                  </label>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                    <span className="font-medium text-green-700">
                      {coupon.expiryDate}까지
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰 종류
                  </label>
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="text-gray-900">{coupon.couponType}</span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰 생성일
                  </label>
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="text-gray-900">{coupon.createdDate}</span>
                  </div>
                </div>
              </div>
              {/* <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  쿠폰 설명
                </label>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-gray-700">{coupon.description}</p>
                </div>
              </div> */}
            </CardContent>
          </Card>

          {/* 사용 내역 */}
          {/* <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
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
          </Card> */}
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
          {/* <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
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
          </Card> */}

          {/* 액션 버튼들 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardContent className="space-y-3 p-6">
              <Button
                onClick={handleEdit}
                className="h-9 cursor-pointer gap-2 rounded border border-gray-200 bg-gray-100 px-4 py-1 font-medium text-gray-800 hover:bg-gray-200"
              >
                <Edit className="mr-1 h-4 w-4" />
                쿠폰 수정
              </Button>
              {/* <Button
                onClick={handleDeactivate}
                className="h-9 cursor-pointer gap-2 rounded border border-orange-100 bg-orange-50 px-4 py-1 font-medium text-orange-700 hover:bg-orange-100"
              >
                <Pause className="mr-1 h-4 w-4" />
                쿠폰 비활성화
              </Button> */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="h-9 cursor-pointer gap-2 rounded border border-red-100 bg-red-50 px-4 py-1 font-medium text-red-700 hover:bg-red-100">
                    <Trash2 className="mr-1 h-4 w-4" />
                    쿠폰 삭제
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>쿠폰 삭제 확인</AlertDialogTitle>
                    <AlertDialogDescription>
                      정말로 &quot;{coupon.name}&quot; 쿠폰을 삭제하시겠습니까?
                      이 작업은 되돌릴 수 없습니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      삭제
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
