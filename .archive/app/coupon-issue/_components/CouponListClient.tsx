'use client'

import { useState } from 'react'
import { Coupon, UserCoupon } from '@/types/coupon'
import CouponCard from './CouponCard'

interface CouponListClientProps {
  availableCoupons: Coupon[]
  userCoupons: UserCoupon[]
}

export default function CouponListClient({
  availableCoupons,
}: CouponListClientProps) {
  // 발급 완료(OWNED) 쿠폰은 리스트에서 제외
  const filteredCoupons = availableCoupons.filter(
    (coupon) => coupon.ownedStatus !== 'OWNED',
  )
  const [coupons, setCoupons] = useState(filteredCoupons)

  const handleIssueSuccess = (couponId: number) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.couponId === couponId
          ? { ...coupon, ownedStatus: 'OWNED' as const }
          : coupon,
      ),
    )
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.couponId}
          coupon={coupon}
          onIssueSuccess={() => handleIssueSuccess(coupon.couponId)}
        />
      ))}
    </div>
  )
}
