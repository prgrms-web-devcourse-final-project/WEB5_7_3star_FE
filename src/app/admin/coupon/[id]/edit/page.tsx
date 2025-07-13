'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, X, AlertTriangle } from 'lucide-react'
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

export default function CouponEditPage() {
  const params = useParams()
  const router = useRouter()
  const [coupon, setCoupon] = useState<Coupon | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    discount: '',
    minAmount: '',
    totalQuantity: '',
    expiryDate: '',
    description: '',
    status: 'active' as 'active' | 'inactive' | 'expired',
  })

  useEffect(() => {
    // 실제로는 API 호출을 통해 쿠폰 데이터를 가져옴
    const foundCoupon = dummyCoupons.find((c) => c.id === params.id)
    if (foundCoupon) {
      setCoupon(foundCoupon)
      setFormData({
        name: foundCoupon.name,
        discount: foundCoupon.discount.toString(),
        minAmount: foundCoupon.minAmount.toString(),
        totalQuantity: foundCoupon.totalQuantity.toString(),
        expiryDate: foundCoupon.expiryDate,
        description: foundCoupon.description,
        status: foundCoupon.status,
      })
    }
    setLoading(false)
  }, [params.id])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 쿠폰 수정 로직
    console.log('쿠폰 수정:', formData)
    // 성공 시 상세 페이지로 이동
    router.push(`/admin/coupon/${params.id}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#8BB5FF]"></div>
          <p className="mt-4 text-gray-600">쿠폰 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!coupon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center">
              <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-blue-500">
                <Save className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#8BB5FF]">쿠폰 수정</h2>
            </div>
            <p className="text-gray-600">
              {coupon.name} 쿠폰의 정보를 수정할 수 있습니다.
            </p>
          </div>
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <X className="mr-2 h-4 w-4" />
                  취소
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>변경사항 취소</AlertDialogTitle>
                  <AlertDialogDescription>
                    변경사항이 저장되지 않습니다. 정말로 나가시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>계속 편집</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => router.push(`/admin/coupon/${params.id}`)}
                  >
                    나가기
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* 수정 폼 */}
        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Save className="mr-2 h-5 w-5 text-blue-600" />
              쿠폰 정보 수정
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
                    onChange={(e) => handleInputChange('name', e.target.value)}
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
                      handleInputChange('discount', e.target.value)
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
                      handleInputChange('minAmount', e.target.value)
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
                      handleInputChange('totalQuantity', e.target.value)
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
                      handleInputChange('expiryDate', e.target.value)
                    }
                    className="h-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-400/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="status"
                    className="text-sm font-medium text-gray-700"
                  >
                    상태
                  </Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange('status', e.target.value)
                    }
                    className="h-12 w-full rounded-md border-2 border-gray-200 bg-white/80 px-3 py-2 backdrop-blur-sm transition-all duration-200 focus:border-[#8BB5FF] focus:bg-white focus:ring-2 focus:ring-[#8BB5FF]/20 focus:outline-none"
                  >
                    <option value="active">활성</option>
                    <option value="inactive">비활성</option>
                    <option value="expired">만료</option>
                  </select>
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
                    handleInputChange('description', e.target.value)
                  }
                  placeholder="쿠폰에 대한 설명을 입력하세요"
                  rows={4}
                  className="resize-none border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-[#8BB5FF] focus:bg-white focus:ring-2 focus:ring-[#8BB5FF]/20"
                />
              </div>

              {/* 읽기 전용 정보 */}
              <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-6 backdrop-blur-sm">
                <h3 className="mb-4 font-semibold text-gray-700">
                  읽기 전용 정보
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500">쿠폰 ID</Label>
                    <div className="text-sm font-medium text-gray-900">
                      {coupon.id}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500">생성일</Label>
                    <div className="text-sm font-medium text-gray-900">
                      {coupon.createdDate}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500">사용된 수량</Label>
                    <div className="text-sm font-medium text-blue-600">
                      {coupon.usedQuantity}개
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-gray-50"
                    >
                      <X className="mr-2 h-4 w-4" />
                      취소
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>변경사항 취소</AlertDialogTitle>
                      <AlertDialogDescription>
                        변경사항이 저장되지 않습니다. 정말로 나가시겠습니까?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>계속 편집</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          router.push(`/admin/coupon/${params.id}`)
                        }
                      >
                        나가기
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  type="submit"
                  className="h-12 bg-gradient-to-r from-green-500 to-green-600 shadow-lg transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-xl"
                >
                  <Save className="mr-2 h-4 w-4" />
                  저장
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
