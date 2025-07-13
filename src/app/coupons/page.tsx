'use client'

import { CheckCircle, Gift, Settings, User, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function CouponsPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
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

  // 모든 쿠폰 데이터 (오픈 예정 + 받을 수 있는 쿠폰)
  const allCoupons = [
    {
      id: 1,
      title: '신규 회원 환영 쿠폰',
      discount: '50%',
      openDate: in30Minutes.toISOString(), // 30분 후 오픈
      validUntil: '2024-02-15',
      isUpcoming: true,
    },
    {
      id: 2,
      title: '주말 특가 쿠폰',
      discount: '3000원',
      openDate: in2Hours.toISOString(), // 2시간 후 오픈
      validUntil: '2024-02-10',
      isUpcoming: true,
    },
    {
      id: 3,
      title: 'VIP 회원 특별 쿠폰',
      discount: '5000원',
      openDate: in1Day.toISOString(), // 1일 후 오픈
      validUntil: '2024-03-01',
      isUpcoming: true,
    },
    {
      id: 4,
      title: '일일 출석 쿠폰',
      discount: '10%',
      validUntil: '2024-02-01',
      isUpcoming: false,
    },
    {
      id: 5,
      title: '친구 추천 쿠폰',
      discount: '2000원',
      validUntil: '2024-01-31',
      isUpcoming: false,
    },
    {
      id: 6,
      title: '레슨 완주 축하 쿠폰',
      discount: '25%',
      validUntil: '2024-02-15',
      isUpcoming: false,
    },
  ]

  const completedCoupons = [
    {
      id: 7,
      title: '신년 특별 쿠폰',
      discount: '4000원',
      receivedDate: '2024-01-01',
      validUntil: '2024-01-31',
    },
    {
      id: 8,
      title: '첫 구매 감사 쿠폰',
      discount: '15%',
      receivedDate: '2023-12-28',
      validUntil: '2024-01-15',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="mb-16 text-center">
        <div className="mb-6 inline-block rounded-full bg-purple-200 px-4 py-2 text-sm font-medium text-gray-700">
          🎁 쿠폰 센터
        </div>
        <h1 className="mb-6 text-5xl leading-tight font-extrabold text-gray-900">
          <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            쿠폰
          </span>{' '}
          발급 센터
        </h1>
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
          다양한 할인 혜택을 받아보세요. 매일 새로운 쿠폰이 준비되어 있습니다.
        </p>
      </div>

      {/* 모든 쿠폰 (오픈 예정 + 받을 수 있는 쿠폰) */}
      <section className="mb-16">
        <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold text-gray-900">
          <Gift className="h-8 w-8 text-blue-500" />
          쿠폰 목록
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {allCoupons.map((coupon) => {
            const isUpcoming = coupon.isUpcoming && coupon.openDate
            const timeRemaining = isUpcoming
              ? getTimeRemaining(coupon.openDate!)
              : null
            const isActive = !isUpcoming || timeRemaining === null

            return (
              <div
                key={coupon.id}
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
                    {coupon.title}
                  </h3>
                  <div className="mb-6 flex items-center justify-center">
                    <span
                      className={`text-3xl font-bold ${isActive ? 'text-blue-600' : 'text-gray-700'}`}
                    >
                      {coupon.discount} 할인
                    </span>
                  </div>
                  <div className="mb-4 text-center text-sm text-gray-500">
                    유효기간: {coupon.validUntil}까지
                  </div>
                  <button
                    className={`w-full rounded-xl py-3 font-semibold transition-opacity ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-200 to-purple-200 text-gray-700 hover:opacity-90'
                        : 'cursor-not-allowed bg-gray-300 text-gray-600'
                    }`}
                    disabled={!isActive}
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
          {completedCoupons.map((coupon) => (
            <div
              key={coupon.id}
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
                  {coupon.title}
                </h3>
                <div className="mb-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">
                    {coupon.discount} 할인
                  </span>
                </div>
                <div className="mb-2 text-center text-sm text-green-600">
                  받은 날짜: {coupon.receivedDate}
                </div>
                <div className="mb-4 text-center text-sm text-green-600">
                  유효기간: {coupon.validUntil}까지
                </div>
                <button className="w-full cursor-not-allowed rounded-xl bg-green-300 py-3 font-semibold text-green-800">
                  발급 완료
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
