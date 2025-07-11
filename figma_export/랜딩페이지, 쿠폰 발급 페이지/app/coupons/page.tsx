"use client"

import { CheckCircle, Gift, Settings, User, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

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

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
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
      title: "신규 회원 환영 쿠폰",
      discount: "50%",
      openDate: in30Minutes.toISOString(), // 30분 후 오픈
      validUntil: "2024-02-15",
      isUpcoming: true,
    },
    {
      id: 2,
      title: "주말 특가 쿠폰",
      discount: "3000원",
      openDate: in2Hours.toISOString(), // 2시간 후 오픈
      validUntil: "2024-02-10",
      isUpcoming: true,
    },
    {
      id: 3,
      title: "VIP 회원 특별 쿠폰",
      discount: "5000원",
      openDate: in1Day.toISOString(), // 1일 후 오픈
      validUntil: "2024-03-01",
      isUpcoming: true,
    },
    {
      id: 4,
      title: "일일 출석 쿠폰",
      discount: "10%",
      validUntil: "2024-02-01",
      isUpcoming: false,
    },
    {
      id: 5,
      title: "친구 추천 쿠폰",
      discount: "2000원",
      validUntil: "2024-01-31",
      isUpcoming: false,
    },
    {
      id: 6,
      title: "레슨 완주 축하 쿠폰",
      discount: "25%",
      validUntil: "2024-02-15",
      isUpcoming: false,
    },
  ]

  const completedCoupons = [
    {
      id: 7,
      title: "신년 특별 쿠폰",
      discount: "4000원",
      receivedDate: "2024-01-01",
      validUntil: "2024-01-31",
    },
    {
      id: 8,
      title: "첫 구매 감사 쿠폰",
      discount: "15%",
      receivedDate: "2023-12-28",
      validUntil: "2024-01-15",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg flex items-center justify-center text-gray-700 font-bold text-sm">
                T
              </div>
              <span className="text-2xl font-bold text-gray-900">TrainUs</span>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🎁 쿠폰 센터
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">쿠폰</span>{" "}
            발급 센터
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            다양한 할인 혜택을 받아보세요. 매일 새로운 쿠폰이 준비되어 있습니다.
          </p>
        </div>

        {/* 모든 쿠폰 (오픈 예정 + 받을 수 있는 쿠폰) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Gift className="w-8 h-8 text-blue-500" />
            쿠폰 목록
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {allCoupons.map((coupon) => {
              const isUpcoming = coupon.isUpcoming && coupon.openDate
              const timeRemaining = isUpcoming ? getTimeRemaining(coupon.openDate!) : null
              const isActive = !isUpcoming || timeRemaining === null

              return (
                <div
                  key={coupon.id}
                  className={`border rounded-2xl p-6 transition-all duration-300 ${
                    isActive
                      ? "bg-white border-gray-100 hover:shadow-xl cursor-pointer group"
                      : "bg-gray-50 border-gray-200 opacity-75"
                  }`}
                >
                  <div className="mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        isActive
                          ? "bg-gradient-to-br from-blue-200 to-purple-200 group-hover:scale-110 transition-transform"
                          : "bg-gradient-to-br from-gray-300 to-gray-400"
                      }`}
                    >
                      <Gift className={`w-6 h-6 ${isActive ? "text-gray-700" : "text-gray-600"}`} />
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${isActive ? "text-gray-900" : "text-gray-700"}`}>
                      {coupon.title}
                    </h3>
                    <div className="flex items-center justify-center mb-6">
                      <span className={`text-3xl font-bold ${isActive ? "text-blue-600" : "text-gray-700"}`}>
                        {coupon.discount} 할인
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-4 text-center">유효기간: {coupon.validUntil}까지</div>
                    <button
                      className={`w-full font-semibold py-3 rounded-xl transition-opacity ${
                        isActive
                          ? "bg-gradient-to-r from-blue-200 to-purple-200 text-gray-700 hover:opacity-90"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                      disabled={!isActive}
                    >
                      {isActive ? "쿠폰 받기" : `오픈 예정 ${timeRemaining || "00:00:00"}`}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 발급 완료한 쿠폰 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            발급 완료한 쿠폰
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {completedCoupons.map((coupon) => (
              <div key={coupon.id} className="bg-green-50 border border-green-200 rounded-2xl p-6 relative">
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-xl flex items-center justify-center mb-4">
                    <Gift className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-4">{coupon.title}</h3>
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-green-600">{coupon.discount} 할인</span>
                  </div>
                  <div className="text-sm text-green-600 mb-2 text-center">받은 날짜: {coupon.receivedDate}</div>
                  <div className="text-sm text-green-600 mb-4 text-center">유효기간: {coupon.validUntil}까지</div>
                  <button className="w-full bg-green-300 text-green-800 font-semibold py-3 rounded-xl cursor-not-allowed">
                    발급 완료
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg flex items-center justify-center text-gray-700 font-bold text-xs">
                T
              </div>
              <span className="text-lg font-bold">TrainUs</span>
            </div>
            <div className="text-gray-400 text-sm">© 2024 TrainUs. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
