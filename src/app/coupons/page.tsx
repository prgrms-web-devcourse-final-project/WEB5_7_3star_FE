'use client'

import Container from '@/components/Container'
import { CheckCircle, Gift } from 'lucide-react'
import { useEffect, useState } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import { Coupon, MyCoupon } from '@/lib/api/coupon'
import { formatDate } from '@/lib/utils'

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [myCoupons, setMyCoupons] = useState<MyCoupon[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const fetchMyCoupons = async () => {
    try {
      const response = await fetch('/api/proxy/api/v1/coupons/my-coupons', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        alert((await response.json()).message ?? 'Failed to fetch my coupons')
        throw new Error(
          (await response.json()).message ?? 'Failed to fetch my coupons',
        )
      }

      const data = await response.json()
      setMyCoupons(data.data?.userCoupons || [])
    } catch (error) {
      console.error('Failed to fetch my coupons:', error)
    }
  }

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/proxy/api/v1/coupons', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch coupons')
      }

      const data = await response.json()
      setCoupons(data.data?.coupons || [])
    } catch (error) {
      console.error('Failed to fetch coupons:', error)
    }
  }

  useEffect(() => {
    fetchCoupons()
    fetchMyCoupons()
  }, [])

  // 남은 시간 계산 함수
  const getTimeRemaining = (targetDate: string) => {
    const target = new Date(targetDate).getTime()
    const now = currentTime.getTime()
    const difference = target - now

    if (difference <= 0) {
      return null // 시간이 지났음
    }

    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  // 현재 시간을 기준으로 미래 시간 계산
  const now = new Date()
  const in30Minutes = new Date(now.getTime() + 30 * 60 * 1000) // 30분 후
  const in2Hours = new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2시간 후
  const in1Day = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 1일 후

  const issueCoupon = async (couponId: number) => {
    try {
      const response = await fetch(`/api/proxy/api/v1/coupons/${couponId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ couponId }),
      })

      if (!response.ok) {
        alert((await response.json()).message ?? '쿠폰 발급에 실패했습니다.')
        throw new Error('Failed to issue coupon')
      }

      const data = await response.json()
      alert('쿠폰 발급에 성공했습니다.')
      fetchCoupons()
      fetchMyCoupons()
    } catch (error) {
      console.error('Failed to issue coupon:', error)
    }
  }

  return (
    <Container size="lg">
      <PageHeader
        title="쿠폰 발급 센터"
        subtitle="다양한 할인 혜택을 받아보세요. 매일 새로운 쿠폰이 준비되어 있습니다."
        align="center"
        left={
          <div className="mb-6 inline-block rounded-full bg-purple-200 px-4 py-2 text-sm font-medium text-gray-700">
            🎁 쿠폰 센터
          </div>
        }
      />

      {/* 모든 쿠폰 (오픈 예정 + 받을 수 있는 쿠폰) */}
      <section className="mb-16">
        <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold text-gray-900">
          <Gift className="h-8 w-8 text-blue-500" />
          쿠폰 목록
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {coupons?.map((coupon) => {
            const isUpcoming = coupon.openTime && coupon.expirationDate
            const timeRemaining = isUpcoming
              ? getTimeRemaining(coupon.openTime!)
              : null
            const isActive = !isUpcoming || timeRemaining === null

            return (
              <div
                key={coupon.couponId}
                className={`rounded-2xl border p-6 transition-all duration-300 ${
                  isActive
                    ? 'group cursor-pointer border-gray-100 bg-white hover:shadow-xl'
                    : 'border-gray-200 bg-gray-50 opacity-75'
                }`}
              >
                <div className="mb-4">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-200 to-purple-200 transition-transform group-hover:scale-110'
                        : 'bg-gradient-to-br from-gray-300 to-gray-400'
                    }`}
                  >
                    <Gift
                      className={`h-6 w-6 ${isActive ? 'text-gray-700' : 'text-gray-600'}`}
                    />
                  </div>
                  <h3
                    className={`mb-4 text-xl font-bold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}
                  >
                    {coupon.couponName}
                  </h3>
                  <div className="mb-6 flex items-center justify-center">
                    <span
                      className={`text-3xl font-bold ${isActive ? 'text-blue-600' : 'text-gray-700'}`}
                    >
                      {coupon.discountPrice} 할인
                    </span>
                  </div>
                  {coupon.expirationDate && (
                    <div className="mb-4 text-center text-sm text-gray-500">
                      유효기간: {coupon.expirationDate}까지
                    </div>
                  )}
                  <button
                    className={`w-full rounded-xl py-3 font-semibold transition-opacity ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-200 to-purple-200 text-gray-700 hover:opacity-90'
                        : 'cursor-not-allowed bg-gray-300 text-gray-600'
                    }`}
                    disabled={!isActive}
                    onClick={() => {
                      if (isActive) {
                        issueCoupon(coupon.couponId)
                      }
                    }}
                  >
                    {isActive
                      ? '쿠폰 받기'
                      : `오픈 예정 ${timeRemaining || '00:00:00'}`}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 발급 완료한 쿠폰 */}
      <section>
        <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold text-gray-900">
          <CheckCircle className="h-8 w-8 text-green-500" />
          발급 완료한 쿠폰
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {myCoupons.map((myCoupon) => (
            <div
              key={myCoupon.couponId}
              className="relative rounded-2xl border border-green-200 bg-green-50 p-6"
            >
              <div className="absolute top-4 right-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="mb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-200 to-green-300">
                  <Gift className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-green-900">
                  {myCoupon.couponName}
                </h3>
                <div className="mb-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">
                    {myCoupon.discountPrice} 할인
                  </span>
                </div>
                <div className="mb-4 text-center text-sm text-green-600">
                  유효기간: {formatDate(myCoupon.expirationDate)}까지
                </div>
                <button className="w-full cursor-not-allowed rounded-xl bg-green-300 py-3 font-semibold text-green-800">
                  발급 완료
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}
