import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-transparent mb-4">
            운동메이트 결제 시스템
          </h1>
          <p className="text-lg text-gray-600">와이어프레임 데모 페이지</p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-indigo-100/60 to-purple-100/60 rounded-t-lg">
              <CardTitle className="text-lg text-indigo-800">🔐 로그인</CardTitle>
              <CardDescription className="text-indigo-700">이메일/비밀번호 로그인 및 소셜 로그인</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/login">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40 rounded-t-lg">
              <CardTitle className="text-lg text-gray-800">레슨 상세</CardTitle>
              <CardDescription className="text-gray-600">레슨 정보 및 신청</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/lesson/1">
                <Button className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#A5C7FF] hover:from-[#7AA8FF] hover:to-[#94BAFF] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-[#D4E3FF]/20 to-[#E1D8FB]/20 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">📋 신청레슨 현황</CardTitle>
              <CardDescription className="text-gray-600">승인/대기/거절 상태 확인</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/mypage/applications">
                <Button className="w-full bg-gradient-to-r from-[#C4B5F7] to-[#D4C7F9] hover:from-[#B8A8F5] hover:to-[#C8BBF7] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40 rounded-t-lg">
              <CardTitle className="text-lg text-gray-800">결제 정보 입력</CardTitle>
              <CardDescription className="text-gray-600">카카오페이/토스페이 결제</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/payment/checkout">
                <Button className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] hover:from-[#7AA8FF] hover:to-[#B8A8F5] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40 rounded-t-lg">
              <CardTitle className="text-lg text-gray-800">결제 완료</CardTitle>
              <CardDescription className="text-gray-600">결제 성공 확인 페이지</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/payment/success">
                <Button className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#A5C7FF] hover:from-[#7AA8FF] hover:to-[#94BAFF] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40 rounded-t-lg">
              <CardTitle className="text-lg text-gray-800">결제 내역</CardTitle>
              <CardDescription className="text-gray-600">마이페이지 - 과거 결제 기록</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/mypage/payments">
                <Button className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#A5C7FF] hover:from-[#7AA8FF] hover:to-[#94BAFF] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40 rounded-t-lg">
              <CardTitle className="text-lg text-gray-800">결제 실패</CardTitle>
              <CardDescription className="text-gray-600">결제 실패 페이지</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/payment/failed">
                <Button className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#A5C7FF] hover:from-[#7AA8FF] hover:to-[#94BAFF] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-red-100/60 to-rose-100/60 rounded-t-lg">
              <CardTitle className="text-lg text-red-800">🚫 결제 취소</CardTitle>
              <CardDescription className="text-red-700">레슨 예약 취소 및 환불 신청</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/payment/cancel">
                <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-green-100/60 to-emerald-100/60 rounded-t-lg">
              <CardTitle className="text-lg text-green-800">📅 예약 취소</CardTitle>
              <CardDescription className="text-green-700">무료 레슨 예약 취소 (환불 없음)</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/reservation/cancel">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-[#D4E3FF]/50 to-[#E1D8FB]/50 rounded-2xl border border-[#D4E3FF]/30 backdrop-blur-sm">
          <h3 className="font-semibold text-gray-800 mb-3 text-lg">🎯 취소를 원하시면:</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            <strong>유료 레슨</strong>: "결제 취소" 페이지에서 환불과 함께 취소하실 수 있습니다.
            <br />
            <strong>무료 레슨</strong>: "예약 취소" 페이지에서 간단히 예약만 취소하실 수 있습니다.
            <br />
            또는 "결제 내역" 및 "신청레슨 현황" 페이지에서도 개별 취소가 가능합니다.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/payment/cancel">
              <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                유료 레슨 결제 취소
              </Button>
            </Link>
            <Link href="/reservation/cancel">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                무료 레슨 예약 취소
              </Button>
            </Link>
            <Link href="/mypage/applications">
              <Button className="bg-gradient-to-r from-[#C4B5F7] to-[#D4C7F9] hover:from-[#B8A8F5] hover:to-[#C8BBF7] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                신청레슨 현황 바로가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
