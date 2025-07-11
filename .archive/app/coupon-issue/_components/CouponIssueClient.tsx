'use client'

import { useState, useEffect } from 'react'
import { Gift, CheckCircle } from 'lucide-react'

interface Coupon {
  id: number
  title: string
  discount: string
  openDate?: Date
  validUntil: string
  isUpcoming: boolean
}

interface CompletedCoupon {
  id: number
  title: string
  discount: string
  receivedDate: string
  validUntil: string
}

export default function CouponIssueClient() {
  const [allCoupons, setAllCoupons] = useState<Coupon[]>([])
  const [completedCoupons, setCompletedCoupons] = useState<CompletedCoupon[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // 쿠폰 데이터 초기화
  useEffect(() => {
    const now = new Date()
    const in30Minutes = new Date(now.getTime() + 30 * 60 * 1000)
    const in2Hours = new Date(now.getTime() + 2 * 60 * 60 * 1000)
    const in1Day = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const coupons: Coupon[] = [
      {
        id: 1,
        title: '신규 회원 환영 쿠폰',
        discount: '50%',
        openDate: in30Minutes,
        validUntil: '2024-02-15',
        isUpcoming: true,
      },
      {
        id: 2,
        title: '주말 특가 쿠폰',
        discount: '3000원',
        openDate: in2Hours,
        validUntil: '2024-02-10',
        isUpcoming: true,
      },
      {
        id: 3,
        title: 'VIP 회원 특별 쿠폰',
        discount: '5000원',
        openDate: in1Day,
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

    const completed: CompletedCoupon[] = [
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

    setAllCoupons(coupons)
    setCompletedCoupons(completed)
  }, [])

  // 1초마다 현재 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // 남은 시간 계산 함수
  const getTimeRemaining = (targetDate: Date) => {
    const now = currentTime.getTime()
    const target = targetDate.getTime()
    const difference = target - now

    if (difference <= 0) {
      return null
    }

    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleIssueCoupon = async (couponId: number) => {
    setIsLoading(couponId)

    // 실제 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 쿠폰 발급 처리
    const coupon = allCoupons.find((c) => c.id === couponId)
    if (coupon) {
      const newCompletedCoupon: CompletedCoupon = {
        id: Date.now(),
        title: coupon.title,
        discount: coupon.discount,
        receivedDate: new Date().toISOString().split('T')[0],
        validUntil: coupon.validUntil,
      }

      setCompletedCoupons((prev) => [...prev, newCompletedCoupon])
      setAllCoupons((prev) => prev.filter((c) => c.id !== couponId))
    }

    setIsLoading(null)
  }

  const createCouponCard = (coupon: Coupon) => {
    const isUpcoming = coupon.isUpcoming && coupon.openDate
    const timeRemaining = isUpcoming ? getTimeRemaining(coupon.openDate!) : null
    const isActive = !isUpcoming || timeRemaining === null

    return (
      <div
        key={coupon.id}
        className={`coupon-card ${isActive ? 'active' : 'inactive'}`}
      >
        <div
          className={`coupon-icon ${isActive ? 'icon-active' : 'icon-inactive'}`}
        >
          <Gift className={`icon ${isActive ? '' : 'icon-inactive'}`} />
        </div>
        <h3 className={`coupon-title ${isActive ? 'active' : 'inactive'}`}>
          {coupon.title}
        </h3>
        <div className="coupon-discount">
          <span className={`discount-text ${isActive ? 'active' : 'inactive'}`}>
            {coupon.discount} 할인
          </span>
        </div>
        <div className="coupon-validity">유효기간: {coupon.validUntil}까지</div>
        <button
          className={`coupon-btn ${isActive ? 'btn-active' : 'btn-inactive'}`}
          disabled={!isActive || isLoading === coupon.id}
          onClick={() => handleIssueCoupon(coupon.id)}
        >
          {isLoading === coupon.id ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              발급 중...
            </div>
          ) : isActive ? (
            '쿠폰 받기'
          ) : (
            `오픈 예정 ${timeRemaining || '00:00:00'}`
          )}
        </button>
      </div>
    )
  }

  const createCompletedCouponCard = (coupon: CompletedCoupon) => {
    return (
      <div key={coupon.id} className="coupon-card completed">
        <CheckCircle className="check-icon" />
        <div className="coupon-icon icon-completed">
          <Gift className="icon icon-completed" />
        </div>
        <h3 className="coupon-title completed">{coupon.title}</h3>
        <div className="coupon-discount">
          <span className="discount-text completed">
            {coupon.discount} 할인
          </span>
        </div>
        <div className="coupon-validity completed">
          받은 날짜: {coupon.receivedDate}
        </div>
        <div className="coupon-validity completed">
          유효기간: {coupon.validUntil}까지
        </div>
        <button className="coupon-btn btn-completed" disabled>
          발급 완료
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* 쿠폰 목록 */}
      <section className="section">
        <h2 className="section-title">
          <Gift className="section-icon" />
          쿠폰 목록
        </h2>
        <div className="coupon-grid">{allCoupons.map(createCouponCard)}</div>
      </section>

      {/* 발급 완료한 쿠폰 */}
      {completedCoupons.length > 0 && (
        <section className="section">
          <h2 className="section-title">
            <CheckCircle className="section-icon section-icon-green" />
            발급 완료한 쿠폰
          </h2>
          <div className="coupon-grid">
            {completedCoupons.map(createCompletedCouponCard)}
          </div>
        </section>
      )}
    </div>
  )
}
