'use client'

import { Gift } from 'lucide-react'

interface UserCoupon {
  id: number
  couponId: number
  couponName: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minOrderAmount: number
  expirationDate: string
  status: 'active' | 'used' | 'expired'
  issuedAt: string
  usedAt?: string
}

interface CouponsSectionProps {
  coupons: UserCoupon[]
}

export default function CouponsSection({ coupons }: CouponsSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'used':
        return 'bg-gray-100 text-gray-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '사용 가능'
      case 'used':
        return '사용 완료'
      case 'expired':
        return '만료됨'
      default:
        return '알 수 없음'
    }
  }

  return (
    <div className="service-card">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-100">
          <Gift className="h-4 w-4 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">내 쿠폰</h2>
      </div>

      <div className="space-y-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">{coupon.couponName}</h3>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(coupon.status)}`}
              >
                {getStatusText(coupon.status)}
              </span>
            </div>
            <div className="mb-2 flex items-center gap-4">
              <span className="text-lg font-bold text-blue-600">
                {coupon.discountType === 'percentage'
                  ? `${coupon.discountValue}%`
                  : `${coupon.discountValue.toLocaleString()}원`}{' '}
                할인
              </span>
              <span className="text-sm text-gray-500">
                최소 주문 {coupon.minOrderAmount.toLocaleString()}원
              </span>
            </div>
            <div className="text-sm text-gray-500">
              유효기간: {coupon.expirationDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
