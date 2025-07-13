'use client'

import type React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Plus,
  Tag,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  BarChart3,
  DollarSign,
  Search,
} from 'lucide-react'

interface Coupon {
  id: string
  name: string
  discountRate: number
  quantity: number
  usedQuantity: number
  minAmount: number
  expiryDate: string
  status: 'active' | 'expired' | 'pending'
  usageCount: number
  createdDate: string
  description: string
}

export default function AdminCouponPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'search'>(
    'list',
  )
  const [formData, setFormData] = useState({
    couponName: '',
    quantity: '',
    discountRate: '',
    minAmount: '',
    expiryDate: '',
    description: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // 샘플 쿠폰 데이터
  const sampleCoupons: Coupon[] = [
    {
      id: '1',
      name: '신규회원 특별할인',
      discountRate: 30,
      quantity: 100,
      usedQuantity: 50,
      minAmount: 50000,
      expiryDate: '2024-12-31',
      status: 'active',
      usageCount: 25,
      createdDate: '2024-01-08',
      description: '신규 회원을 위한 특별 할인 쿠폰',
    },
    {
      id: '2',
      name: 'VIP 회원 전용',
      discountRate: 25,
      quantity: 50,
      usedQuantity: 15,
      minAmount: 100000,
      expiryDate: '2024-11-30',
      status: 'active',
      usageCount: 35,
      createdDate: '2024-01-07',
      description: 'VIP 회원만 사용 가능한 프리미엄 쿠폰',
    },
    {
      id: '3',
      name: '주말 특가 쿠폰',
      discountRate: 20,
      quantity: 200,
      usedQuantity: 200,
      minAmount: 30000,
      expiryDate: '2024-01-15',
      status: 'expired',
      usageCount: 200,
      createdDate: '2024-01-06',
      description: '주말 한정 특가 할인 쿠폰',
    },
    {
      id: '4',
      name: '생일축하 쿠폰',
      discountRate: 15,
      quantity: 100,
      usedQuantity: 25,
      minAmount: 20000,
      expiryDate: '2024-01-10',
      status: 'pending',
      usageCount: 75,
      createdDate: '2024-01-05',
      description: '생일 축하 특별 할인 쿠폰',
    },
  ]

  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<
    'all' | 'active' | 'expired' | 'used'
  >('all')
  const [filteredCoupons] = useState<Coupon[]>(sampleCoupons)

  const hideError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    hideError(field)
  }

  const validateForm = () => {
    let isValid = true
    const newErrors: Record<string, string> = {}

    if (!formData.couponName.trim()) {
      newErrors.couponName = '쿠폰 이름을 입력해주세요'
      isValid = false
    }

    if (!formData.quantity || Number.parseInt(formData.quantity) < 1) {
      newErrors.quantity = '발행 수량을 입력해주세요'
      isValid = false
    }

    if (
      !formData.discountRate ||
      Number.parseInt(formData.discountRate) < 1 ||
      Number.parseInt(formData.discountRate) > 100
    ) {
      newErrors.discountRate = '할인율을 1-100% 사이로 입력해주세요'
      isValid = false
    }

    if (!formData.minAmount || Number.parseInt(formData.minAmount) < 0) {
      newErrors.minAmount = '최소 주문금액을 입력해주세요'
      isValid = false
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = '유효기간을 선택해주세요'
      isValid = false
    } else {
      const today = new Date()
      const expiryDate = new Date(formData.expiryDate)
      if (expiryDate <= today) {
        newErrors.expiryDate = '유효기간은 오늘 이후 날짜여야 합니다'
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // 2초 후 완료 시뮬레이션
    setTimeout(() => {
      alert('쿠폰이 성공적으로 생성되었습니다!')
      setFormData({
        couponName: '',
        quantity: '',
        discountRate: '',
        minAmount: '',
        expiryDate: '',
        description: '',
      })
      setIsLoading(false)
      setActiveTab('list')
    }, 2000)
  }

  const resetForm = () => {
    setFormData({
      couponName: '',
      quantity: '',
      discountRate: '',
      minAmount: '',
      expiryDate: '',
      description: '',
    })
    setErrors({})
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            활성
          </span>
        )
      case 'expired':
        return (
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
            종료
          </span>
        )
      case 'pending':
        return (
          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
            곧 만료
          </span>
        )
      default:
        return null
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-400">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] bg-clip-text text-xl font-bold text-transparent">
                운동메이트 관리자
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                관리자님, 안녕하세요!
              </span>
              <Link
                href="/"
                className="text-sm text-gray-500 transition-colors hover:text-gray-700"
              >
                ← 홈으로
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="mb-2 flex items-center">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-gradient-to-r from-blue-400 to-purple-400">
              <Tag className="h-4 w-4 text-white" />
            </div>
            <h2 className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] bg-clip-text text-2xl font-bold text-transparent">
              쿠폰 관리
            </h2>
          </div>
          <p className="text-gray-600">쿠폰을 생성하고 관리할 수 있습니다.</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex w-fit space-x-1 rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab('list')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === 'list'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-800'
              }`}
            >
              쿠폰 목록
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-800'
              }`}
            >
              쿠폰 생성
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === 'search'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-800'
              }`}
            >
              쿠폰 검색
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <Card className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-100">총 쿠폰 수</p>
                      <p className="text-2xl font-bold">
                        {sampleCoupons.length}
                      </p>
                    </div>
                    <Tag className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-100">활성 쿠폰</p>
                      <p className="text-2xl font-bold">
                        {
                          sampleCoupons.filter((c) => c.status === 'active')
                            .length
                        }
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-100">만료 예정</p>
                      <p className="text-2xl font-bold">
                        {
                          sampleCoupons.filter((c) => c.status === 'pending')
                            .length
                        }
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-100">총 사용량</p>
                      <p className="text-2xl font-bold">
                        {sampleCoupons.reduce(
                          (sum, c) => sum + c.usedQuantity,
                          0,
                        )}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 쿠폰 목록 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  쿠폰 목록
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left font-semibold">
                          쿠폰명
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          할인율
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          수량
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          사용량
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          상태
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          만료일
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          작업
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCoupons.map((coupon) => (
                        <tr
                          key={coupon.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="px-4 py-4">
                            <div>
                              <p className="font-medium">{coupon.name}</p>
                              <p className="text-sm text-gray-500">
                                {coupon.description}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="font-semibold text-green-600">
                              {coupon.discountRate}%
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-gray-600">
                              {coupon.quantity}개
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-gray-600">
                              {coupon.usedQuantity}개
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            {getStatusBadge(coupon.status)}
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-gray-600">
                              {coupon.expiryDate}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
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
          </div>
        )}

        {activeTab === 'create' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />새 쿠폰 생성
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="couponName">쿠폰명</Label>
                    <Input
                      id="couponName"
                      value={formData.couponName}
                      onChange={(e) =>
                        handleInputChange('couponName', e.target.value)
                      }
                      placeholder="쿠폰명을 입력하세요"
                      className={errors.couponName ? 'border-red-500' : ''}
                    />
                    {errors.couponName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.couponName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="quantity">발행 수량</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange('quantity', e.target.value)
                      }
                      placeholder="발행 수량을 입력하세요"
                      className={errors.quantity ? 'border-red-500' : ''}
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.quantity}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="discountRate">할인율 (%)</Label>
                    <Input
                      id="discountRate"
                      type="number"
                      value={formData.discountRate}
                      onChange={(e) =>
                        handleInputChange('discountRate', e.target.value)
                      }
                      placeholder="할인율을 입력하세요"
                      className={errors.discountRate ? 'border-red-500' : ''}
                    />
                    {errors.discountRate && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.discountRate}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="minAmount">최소 주문금액</Label>
                    <Input
                      id="minAmount"
                      type="number"
                      value={formData.minAmount}
                      onChange={(e) =>
                        handleInputChange('minAmount', e.target.value)
                      }
                      placeholder="최소 주문금액을 입력하세요"
                      className={errors.minAmount ? 'border-red-500' : ''}
                    />
                    {errors.minAmount && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.minAmount}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="expiryDate">유효기간</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        handleInputChange('expiryDate', e.target.value)
                      }
                      min={today}
                      className={errors.expiryDate ? 'border-red-500' : ''}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">쿠폰 설명</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange('description', e.target.value)
                    }
                    placeholder="쿠폰에 대한 설명을 입력하세요"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    초기화
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? '생성 중...' : '쿠폰 생성'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'search' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                쿠폰 검색
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="searchQuery">검색어</Label>
                  <Input
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="쿠폰명 또는 설명으로 검색하세요"
                  />
                </div>

                <div>
                  <Label htmlFor="filterType">필터</Label>
                  <select
                    id="filterType"
                    value={filterType}
                    onChange={(e) =>
                      setFilterType(
                        e.target.value as 'all' | 'active' | 'expired' | 'used',
                      )
                    }
                    className="w-full rounded-md border border-gray-300 p-2"
                  >
                    <option value="all">전체</option>
                    <option value="active">활성</option>
                    <option value="expired">만료</option>
                    <option value="used">사용 완료</option>
                  </select>
                </div>

                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  검색
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
