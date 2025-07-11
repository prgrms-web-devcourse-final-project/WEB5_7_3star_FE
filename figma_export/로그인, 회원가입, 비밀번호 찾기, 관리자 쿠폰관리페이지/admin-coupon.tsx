"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Tag, Eye, Edit, Trash2, Download, CheckCircle, Clock, BarChart3, DollarSign } from "lucide-react"

interface Coupon {
  id: string
  name: string
  discountRate: number
  quantity: number
  usedQuantity: number
  minAmount: number
  expiryDate: string
  status: "active" | "expired" | "pending"
  usageCount: number
  createdDate: string
  description: string
}

export default function AdminCoupon() {
  const [activeTab, setActiveTab] = useState<"create" | "list" | "stats">("create")
  const [formData, setFormData] = useState({
    couponName: "",
    quantity: "",
    discountRate: "",
    minAmount: "",
    expiryDate: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // 샘플 쿠폰 데이터
  const sampleCoupons: Coupon[] = [
    {
      id: "1",
      name: "신규회원 특별할인",
      discountRate: 30,
      quantity: 100,
      usedQuantity: 50,
      minAmount: 50000,
      expiryDate: "2024-12-31",
      status: "active",
      usageCount: 25,
      createdDate: "2024-01-08",
      description: "신규 회원을 위한 특별 할인 쿠폰",
    },
    {
      id: "2",
      name: "VIP 회원 전용",
      discountRate: 25,
      quantity: 50,
      usedQuantity: 15,
      minAmount: 100000,
      expiryDate: "2024-11-30",
      status: "active",
      usageCount: 35,
      createdDate: "2024-01-07",
      description: "VIP 회원만 사용 가능한 프리미엄 쿠폰",
    },
    {
      id: "3",
      name: "주말 특가 쿠폰",
      discountRate: 20,
      quantity: 200,
      usedQuantity: 200,
      minAmount: 30000,
      expiryDate: "2024-01-15",
      status: "expired",
      usageCount: 200,
      createdDate: "2024-01-06",
      description: "주말 한정 특가 할인 쿠폰",
    },
    {
      id: "4",
      name: "생일축하 쿠폰",
      discountRate: 15,
      quantity: 100,
      usedQuantity: 25,
      minAmount: 20000,
      expiryDate: "2024-01-10",
      status: "pending",
      usageCount: 75,
      createdDate: "2024-01-05",
      description: "생일 축하 특별 할인 쿠폰",
    },
  ]

  const showError = (field: string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }))
  }

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
      newErrors.couponName = "쿠폰 이름을 입력해주세요"
      isValid = false
    }

    if (!formData.quantity || Number.parseInt(formData.quantity) < 1) {
      newErrors.quantity = "발행 수량을 입력해주세요"
      isValid = false
    }

    if (
      !formData.discountRate ||
      Number.parseInt(formData.discountRate) < 1 ||
      Number.parseInt(formData.discountRate) > 100
    ) {
      newErrors.discountRate = "할인율을 1-100% 사이로 입력해주세요"
      isValid = false
    }

    if (!formData.minAmount || Number.parseInt(formData.minAmount) < 0) {
      newErrors.minAmount = "최소 주문금액을 입력해주세요"
      isValid = false
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "유효기간을 선택해주세요"
      isValid = false
    } else {
      const today = new Date()
      const expiryDate = new Date(formData.expiryDate)
      if (expiryDate <= today) {
        newErrors.expiryDate = "유효기간은 오늘 이후 날짜여야 합니다"
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
      alert("쿠폰이 성공적으로 생성되었습니다!")
      setFormData({
        couponName: "",
        quantity: "",
        discountRate: "",
        minAmount: "",
        expiryDate: "",
        description: "",
      })
      setIsLoading(false)
      setActiveTab("list")
    }, 2000)
  }

  const resetForm = () => {
    setFormData({
      couponName: "",
      quantity: "",
      discountRate: "",
      minAmount: "",
      expiryDate: "",
      description: "",
    })
    setErrors({})
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">활성</span>
      case "expired":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">종료</span>
      case "pending":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">곧 만료</span>
      default:
        return null
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount) + "원"
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-3">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                운동메이트 관리자
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">관리자님, 안녕하세요!</span>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                ← 홈으로
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded flex items-center justify-center mr-2">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              쿠폰 관리
            </h2>
          </div>
          <p className="text-gray-600">쿠폰을 생성하고 관리할 수 있습니다.</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("create")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "create"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:text-gray-800"
              }`}
            >
              쿠폰 등록
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "list"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:text-gray-800"
              }`}
            >
              쿠폰 생성
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "stats"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:text-gray-800"
              }`}
            >
              유저별 조회
            </button>
          </div>
        </div>

        {/* 쿠폰 생성 섹션 */}
        {activeTab === "create" && (
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="flex items-center text-gray-900">
                <Plus className="w-5 h-5 mr-2" />새 쿠폰 생성
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 쿠폰 이름 */}
                  <div className="space-y-2">
                    <Label htmlFor="couponName">쿠폰 이름</Label>
                    <Input
                      id="couponName"
                      type="text"
                      placeholder="예: 신규회원 특별할인"
                      value={formData.couponName}
                      onChange={(e) => handleInputChange("couponName", e.target.value)}
                      className={`transition-all duration-200 ${errors.couponName ? "border-red-500" : "focus:border-blue-400"}`}
                    />
                    {errors.couponName && <p className="text-sm text-red-600">{errors.couponName}</p>}
                  </div>

                  {/* 발행 수량 */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">발행 수량</Label>
                    <div className="relative">
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="100"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                        className={`pr-8 transition-all duration-200 ${errors.quantity ? "border-red-500" : "focus:border-blue-400"}`}
                      />
                      <span className="absolute right-3 top-2 text-sm text-gray-500">개</span>
                    </div>
                    {errors.quantity && <p className="text-sm text-red-600">{errors.quantity}</p>}
                  </div>

                  {/* 할인율 */}
                  <div className="space-y-2">
                    <Label htmlFor="discountRate">할인율 (%)</Label>
                    <div className="relative">
                      <Input
                        id="discountRate"
                        type="number"
                        placeholder="30"
                        min="1"
                        max="100"
                        value={formData.discountRate}
                        onChange={(e) => handleInputChange("discountRate", e.target.value)}
                        className={`pr-8 transition-all duration-200 ${errors.discountRate ? "border-red-500" : "focus:border-blue-400"}`}
                      />
                      <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
                    </div>
                    {errors.discountRate && <p className="text-sm text-red-600">{errors.discountRate}</p>}
                  </div>

                  {/* 최소 주문금액 */}
                  <div className="space-y-2">
                    <Label htmlFor="minAmount">최소 주문금액 (원)</Label>
                    <div className="relative">
                      <Input
                        id="minAmount"
                        type="number"
                        placeholder="50000"
                        min="0"
                        value={formData.minAmount}
                        onChange={(e) => handleInputChange("minAmount", e.target.value)}
                        className={`pr-8 transition-all duration-200 ${errors.minAmount ? "border-red-500" : "focus:border-blue-400"}`}
                      />
                      <span className="absolute right-3 top-2 text-sm text-gray-500">원</span>
                    </div>
                    {errors.minAmount && <p className="text-sm text-red-600">{errors.minAmount}</p>}
                  </div>

                  {/* 유효기간 */}
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">유효기간</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      min={today}
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      className={`transition-all duration-200 ${errors.expiryDate ? "border-red-500" : "focus:border-blue-400"}`}
                    />
                    {errors.expiryDate && <p className="text-sm text-red-600">{errors.expiryDate}</p>}
                  </div>

                  {/* 쿠폰 설명 */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">쿠폰 설명</Label>
                    <Textarea
                      id="description"
                      rows={3}
                      placeholder="쿠폰에 대한 설명을 입력하세요"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="resize-none transition-all duration-200 focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                  <Button type="button" variant="outline" onClick={resetForm} className="text-gray-700 bg-transparent">
                    취소
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        생성 중...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        쿠폰 생성
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* 쿠폰 목록 섹션 */}
        {activeTab === "list" && (
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-gray-900">
                  <Tag className="w-5 h-5 mr-2" />
                  최근 생성된 쿠폰
                </CardTitle>
                <Button variant="outline" size="sm" className="flex items-center bg-transparent">
                  <Download className="w-4 h-4 mr-1" />
                  내보내기
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        쿠폰명
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        할인율
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        수량
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        최소주문금액
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        유효기간
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        상태
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        사용횟수
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        생성일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        액션
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleCoupons.map((coupon) => (
                      <tr key={coupon.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                          {coupon.discountRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {coupon.usedQuantity}/{coupon.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(coupon.minAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{coupon.expiryDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(coupon.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                          {coupon.usageCount}회
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{coupon.createdDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors" title="보기">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800 transition-colors" title="수정">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition-colors" title="삭제">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 통계 섹션 */}
        {activeTab === "stats" && (
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="flex items-center text-gray-900">
                <BarChart3 className="w-5 h-5 mr-2" />
                쿠폰 사용 통계
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <Tag className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">총 쿠폰 수</p>
                      <p className="text-2xl font-bold text-blue-800">24</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600">활성 쿠폰</p>
                      <p className="text-2xl font-bold text-green-800">18</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-yellow-600">사용된 쿠폰</p>
                      <p className="text-2xl font-bold text-yellow-800">335</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">총 할인액</p>
                      <p className="text-2xl font-bold text-purple-800">₩2.1M</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
