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

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-green-100/60 to-emerald-100/60 rounded-t-lg">
              <CardTitle className="text-lg text-green-800">📝 회원가입</CardTitle>
              <CardDescription className="text-green-700">이메일 인증, 닉네임 중복확인, 약관동의</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-yellow-100/60 to-orange-100/60 rounded-t-lg">
              <CardTitle className="text-lg text-yellow-800">🔑 비밀번호 찾기</CardTitle>
              <CardDescription className="text-yellow-700">이메일 인증을 통한 비밀번호 재설정</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/forgot-password">
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-orange-100/60 to-red-100/60 rounded-t-lg">
              <CardTitle className="text-lg text-orange-800">🎫 쿠폰 관리</CardTitle>
              <CardDescription className="text-orange-700">관리자 전용 쿠폰 생성 및 관리</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/admin/coupon">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  페이지 보기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
