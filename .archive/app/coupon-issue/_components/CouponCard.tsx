'use client'

import { Gift, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Coupon } from '@/types/coupon'
import { issueCoupon } from '@/lib/api/coupon'

interface CouponCardProps {
  coupon: Coupon
  onIssueSuccess: () => void
}

export default function CouponCard({
  coupon,
  onIssueSuccess,
}: CouponCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getTimeRemaining = (targetDate: string) => {
    const target = new Date(targetDate).getTime()
    const now = currentTime.getTime()
    const difference = target - now
    if (difference <= 0) return null
    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const isUpcoming = coupon.openTime && new Date(coupon.openTime) > currentTime
  const timeRemaining =
    isUpcoming && coupon.openTime ? getTimeRemaining(coupon.openTime) : null
  const isActive = !isUpcoming && coupon.ownedStatus === 'NOT_OWNED'

  const handleIssueCoupon = async () => {
    if (!isActive || isLoading) return
    setIsLoading(true)
    setError(null)
    try {
      await issueCoupon(coupon.couponId)
      onIssueSuccess()
    } catch {
      setError('쿠폰 발급에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  // 스타일 분기
  const cardBase =
    'rounded-2xl border p-6 transition-all duration-300 flex flex-col h-full'
  const cardGray = 'border-gray-200 bg-gray-50 text-gray-500'
  const iconGray = 'bg-gray-200 text-gray-500'
  const titleGray = 'text-gray-700'
  const discountGray = 'text-gray-700'
  const dateGray = 'text-gray-400'

  return (
    <div
      className={`${cardBase} ${isUpcoming ? cardGray : 'group border-gray-100 bg-white hover:shadow-xl'}`}
    >
      <div className="mb-4">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${isUpcoming ? iconGray : 'bg-gradient-to-br from-blue-200 to-purple-200 text-gray-700 transition-transform group-hover:scale-110'}`}
        >
          <Gift
            className={`h-6 w-6 ${isUpcoming ? 'text-gray-500' : 'text-gray-700'}`}
          />
        </div>
        <h3
          className={`mb-4 text-xl font-bold ${isUpcoming ? titleGray : 'text-gray-900'}`}
        >
          {coupon.couponName}
        </h3>
        <div className="mb-6 flex items-center justify-center">
          <span
            className={`text-3xl font-bold ${isUpcoming ? discountGray : 'text-blue-600'}`}
          >
            {coupon.discountPrice} 할인
          </span>
        </div>
        <div
          className={`mb-4 text-center text-sm ${isUpcoming ? dateGray : 'text-gray-500'}`}
        >
          유효기간: {new Date(coupon.expirationDate).toLocaleDateString()}까지
        </div>
        {error && (
          <div className="mb-4 text-center text-sm text-red-500">{error}</div>
        )}
      </div>
      <div className="mt-auto">
        {isUpcoming ? (
          <div className="mt-8 w-full rounded-xl bg-gray-200 py-3 text-center font-semibold text-gray-500">
            <Clock className="mr-2 inline-block h-5 w-5 align-middle" />
            오픈 예정 {timeRemaining ? timeRemaining : '00:00:00'}
          </div>
        ) : (
          <button
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-200 to-purple-200 py-3 font-semibold text-gray-700 transition-opacity hover:opacity-90"
            disabled={!isActive || isLoading}
            onClick={handleIssueCoupon}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-transparent"></div>
                발급 중...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Gift className="h-5 w-5" />
                쿠폰 받기
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
