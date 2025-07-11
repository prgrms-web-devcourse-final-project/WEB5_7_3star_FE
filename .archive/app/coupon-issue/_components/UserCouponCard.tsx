'use client'

import { CheckCircle } from 'lucide-react'
import { UserCoupon } from '@/types/coupon'

interface UserCouponCardProps {
  coupon: UserCoupon
}

export default function UserCouponCard({ coupon }: UserCouponCardProps) {
  const isUsed = coupon.status === 'INACTIVE'

  // 스타일 분기
  const cardColor = isUsed
    ? 'border-gray-200 bg-gray-50'
    : 'border-green-200 bg-green-50'
  const iconColor = isUsed
    ? 'bg-gray-200 text-gray-500'
    : 'bg-green-200 text-green-700'
  const titleColor = isUsed ? 'text-gray-700' : 'text-gray-900'
  const discountColor = isUsed ? 'text-gray-700' : 'text-green-600'
  const dateColor = 'text-gray-500'
  const buttonColor = isUsed
    ? 'bg-gray-200 text-gray-500'
    : 'bg-green-200 text-gray-700'
  const buttonText = isUsed ? '사용 완료' : '발급 완료'

  return (
    <div
      className={`flex h-full flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${cardColor}`}
    >
      <div>
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${iconColor}`}
        >
          <CheckCircle
            className={`h-6 w-6 ${isUsed ? 'text-gray-500' : 'text-green-700'}`}
          />
        </div>
        <h3 className={`mb-4 text-xl font-bold ${titleColor}`}>
          {coupon.couponName}
        </h3>
        <div className="mb-6 flex items-center justify-center">
          <span className={`text-3xl font-bold ${discountColor}`}>
            {coupon.discountPrice} 할인
          </span>
        </div>
        <div className={`mb-2 text-center text-sm ${dateColor}`}>
          유효기간: {new Date(coupon.expirationDate).toLocaleDateString()}까지
        </div>
        {isUsed && coupon.useDate && (
          <div className={`mb-2 text-center text-sm ${dateColor}`}>
            사용일: {new Date(coupon.useDate).toLocaleDateString()}
          </div>
        )}
      </div>
      <button
        className={`w-full rounded-xl py-3 font-semibold transition-opacity ${buttonColor} mt-8`}
        disabled
      >
        {buttonText}
      </button>
    </div>
  )
}
