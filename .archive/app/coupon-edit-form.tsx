'use client'

import type React from 'react'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Header } from './header'
import { Edit, AlertTriangle, Info, Settings } from 'lucide-react'

export function CouponEditForm() {
  const [formData, setFormData] = useState({
    name: '신규회원 특별할인',
    id: '#1000',
    discount: 30,
    minAmount: 50000,
    quantity: 100,
    expiryDate: '2024-12-31',
    description:
      '신규 회원을 위한 특별 할인 쿠폰입니다. 첫 구매 시 30% 할인 혜택을 제공하며, 최소 주문금액 50,000원 이상 구매 시 사용 가능합니다.',
    status: 'active',
    allowDuplicate: false,
    autoExpire: true,
  })

  const [changes, setChanges] = useState({
    name: false,
    quantity: false,
    expiryDate: false,
    status: false,
  })

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setChanges((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('쿠폰이 성공적으로 수정되었습니다!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <Header />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="mb-2 flex items-center">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-green-500">
              <Edit className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#8BB5FF]">쿠폰 수정</h2>
          </div>
          <p className="text-gray-600">
            {formData.name} 쿠폰의 정보를 수정할 수 있습니다.
          </p>
        </div>

        {/* 수정 알림 */}
        <Alert className="mb-6 border-yellow-200 bg-yellow-50/80 backdrop-blur-sm">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <p className="font-medium">수정 시 주의사항</p>
            <p className="text-sm">
              이미 사용된 쿠폰의 할인율과 최소주문금액은 변경할 수 없습니다.
              유효기간과 수량만 수정 가능합니다.
            </p>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Edit className="mr-2 h-5 w-5 text-green-600" />
                기본 정보 수정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">쿠폰명</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="id">쿠폰 ID</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    readOnly
                    className="mt-2 cursor-not-allowed bg-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="discount">
                    할인율 (%)
                    <span className="ml-1 text-xs text-red-600">
                      * 수정 불가
                    </span>
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    disabled
                    className="mt-2 cursor-not-allowed bg-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="minAmount">
                    최소 주문금액 (원)
                    <span className="ml-1 text-xs text-red-600">
                      * 수정 불가
                    </span>
                  </Label>
                  <Input
                    id="minAmount"
                    type="number"
                    value={formData.minAmount}
                    disabled
                    className="mt-2 cursor-not-allowed bg-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">발행 수량</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    min={50}
                    onChange={(e) =>
                      handleInputChange(
                        'quantity',
                        Number.parseInt(e.target.value),
                      )
                    }
                    className="mt-2"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    현재 50개가 사용되었으므로 최소 50개 이상이어야 합니다.
                  </p>
                </div>

                <div>
                  <Label htmlFor="expiryDate">유효기간</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    min="2024-01-11"
                    onChange={(e) =>
                      handleInputChange('expiryDate', e.target.value)
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="description">쿠폰 설명</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  className="mt-2 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* 상태 설정 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Settings className="mr-2 h-5 w-5 text-green-600" />
                상태 설정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">쿠폰 상태</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange('status', value)
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">활성</SelectItem>
                      <SelectItem value="inactive">비활성</SelectItem>
                      <SelectItem value="expired">만료</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoExpire"
                    checked={formData.autoExpire}
                    onCheckedChange={(checked) =>
                      handleInputChange('autoExpire', checked)
                    }
                  />
                  <Label htmlFor="autoExpire">
                    유효기간 만료 시 자동 비활성화
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 변경 내역 미리보기 */}
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <h4 className="mb-2 font-semibold text-blue-800">
                변경 내역 미리보기
              </h4>
              <div className="space-y-1 text-sm text-blue-700">
                <div className="flex justify-between">
                  <span>쿠폰명:</span>
                  <span>{changes.name ? '변경됨' : '변경 없음'}</span>
                </div>
                <div className="flex justify-between">
                  <span>발행 수량:</span>
                  <span>{changes.quantity ? '변경됨' : '변경 없음'}</span>
                </div>
                <div className="flex justify-between">
                  <span>유효기간:</span>
                  <span>{changes.expiryDate ? '변경됨' : '변경 없음'}</span>
                </div>
                <div className="flex justify-between">
                  <span>상태:</span>
                  <span className="text-green-600">
                    {changes.status ? '변경됨' : '활성 유지'}
                  </span>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {/* 버튼들 */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              취소
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5]"
            >
              수정 완료
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
