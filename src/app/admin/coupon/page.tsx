'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Calendar,
  Users,
  Gift,
  Settings,
} from 'lucide-react'

interface Coupon {
  id: string
  name: string
  discount: string
  minAmount: number
  maxDiscount: number
  startDate: string
  endDate: string
  status: 'active' | 'inactive' | 'expired'
  usageCount: number
  maxUsage: number
  description: string
}

export default function AdminCouponPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      name: '신규 회원 환영 쿠폰',
      discount: '50%',
      minAmount: 10000,
      maxDiscount: 5000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      usageCount: 45,
      maxUsage: 100,
      description: '신규 회원을 위한 특별 할인 쿠폰입니다.',
    },
    {
      id: '2',
      name: '주말 특가 쿠폰',
      discount: '3000원',
      minAmount: 50000,
      maxDiscount: 3000,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'active',
      usageCount: 23,
      maxUsage: 50,
      description: '주말에만 사용 가능한 특별 할인 쿠폰입니다.',
    },
    {
      id: '3',
      name: 'VIP 회원 특별 쿠폰',
      discount: '25%',
      minAmount: 100000,
      maxDiscount: 25000,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'inactive',
      usageCount: 12,
      maxUsage: 30,
      description: 'VIP 회원을 위한 프리미엄 할인 쿠폰입니다.',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">활성</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">비활성</Badge>
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">만료</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || coupon.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDeleteCoupon = (id: string) => {
    if (confirm('정말로 이 쿠폰을 삭제하시겠습니까?')) {
      setCoupons(coupons.filter((coupon) => coupon.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === id
          ? {
              ...coupon,
              status: coupon.status === 'active' ? 'inactive' : 'active',
            }
          : coupon,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">쿠폰 관리</h1>
            <p className="mt-2 text-gray-600">쿠폰을 생성하고 관리하세요</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                쿠폰 생성
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>새 쿠폰 생성</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">쿠폰명</Label>
                  <Input id="name" placeholder="쿠폰명을 입력하세요" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discount">할인율/금액</Label>
                    <Input id="discount" placeholder="예: 50% 또는 5000원" />
                  </div>
                  <div>
                    <Label htmlFor="minAmount">최소 주문금액</Label>
                    <Input id="minAmount" type="number" placeholder="10000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">시작일</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">종료일</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">설명</Label>
                  <Input
                    id="description"
                    placeholder="쿠폰에 대한 설명을 입력하세요"
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">생성</Button>
                  <Button variant="outline" className="flex-1">
                    취소
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 필터 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Label htmlFor="search">검색</Label>
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="search"
                    placeholder="쿠폰명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Label htmlFor="status">상태</Label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="all">전체</option>
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                  <option value="expired">만료</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 쿠폰 목록 */}
        <div className="grid gap-6">
          {filteredCoupons.map((coupon) => (
            <Card key={coupon.id} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          {coupon.name}
                        </h3>
                        <p className="mb-3 text-sm text-gray-600">
                          {coupon.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {coupon.startDate} ~ {coupon.endDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {coupon.usageCount}/{coupon.maxUsage} 사용
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(coupon.status)}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>쿠폰 관리</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2">
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                상세보기
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                수정
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => handleToggleStatus(coupon.id)}
                              >
                                <Settings className="mr-2 h-4 w-4" />
                                {coupon.status === 'active'
                                  ? '비활성화'
                                  : '활성화'}
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteCoupon(coupon.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                삭제
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="rounded-lg bg-blue-50 p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <Gift className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">
                            할인
                          </span>
                        </div>
                        <p className="text-lg font-bold text-blue-600">
                          {coupon.discount}
                        </p>
                      </div>
                      <div className="rounded-lg bg-green-50 p-3">
                        <div className="mb-1 text-sm font-medium text-green-900">
                          최소 주문금액
                        </div>
                        <p className="text-lg font-bold text-green-600">
                          {coupon.minAmount.toLocaleString()}원
                        </p>
                      </div>
                      <div className="rounded-lg bg-purple-50 p-3">
                        <div className="mb-1 text-sm font-medium text-purple-900">
                          최대 할인
                        </div>
                        <p className="text-lg font-bold text-purple-600">
                          {coupon.maxDiscount.toLocaleString()}원
                        </p>
                      </div>
                      <div className="rounded-lg bg-orange-50 p-3">
                        <div className="mb-1 text-sm font-medium text-orange-900">
                          사용률
                        </div>
                        <p className="text-lg font-bold text-orange-600">
                          {Math.round(
                            (coupon.usageCount / coupon.maxUsage) * 100,
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCoupons.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Gift className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                쿠폰이 없습니다
              </h3>
              <p className="text-gray-600">새로운 쿠폰을 생성해보세요</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
