import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-[#D4E3FF]/20 to-[#E1D8FB]/20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl text-green-600 mb-2">결제 완료!</CardTitle>
            <CardDescription className="text-lg text-gray-600">레슨 예약이 성공적으로 완료되었습니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="bg-gradient-to-r from-[#D4E3FF]/50 to-[#E1D8FB]/50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-left text-lg text-gray-800">예약 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#8BB5FF]" />
                  <span className="text-gray-700">2024년 1월 15일</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#8BB5FF]" />
                  <span className="text-gray-700">오후 2:00 - 3:30</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#8BB5FF]" />
                  <span className="text-gray-700">강남구 요가스튜디오</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#E1D8FB]/50 to-[#D4E3FF]/50 rounded-xl p-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">결제 금액</span>
                <span className="font-semibold bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-transparent">
                  25,000원
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-600">결제 방법</span>
                <span className="text-sm text-gray-700">카카오페이</span>
              </div>
            </div>

            <div className="text-left space-y-2 text-sm text-gray-600 bg-gradient-to-r from-[#D4E3FF]/30 to-[#E1D8FB]/30 p-4 rounded-xl">
              <p className="font-medium text-gray-800">📋 참고사항</p>
              <p>• 레슨 시작 24시간 전까지 무료 취소 가능</p>
              <p>• 예약 확인서는 마이페이지에서 확인 가능</p>
              <p>• 문의사항은 고객센터로 연락주세요</p>
            </div>

            <div className="space-y-4">
              <Link href="/mypage/payments" className="w-full">
                <Button className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] hover:from-[#7AA8FF] hover:to-[#B8A8F5] py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  결제 내역 보기
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button
                  variant="outline"
                  className="w-full py-4 text-lg font-semibold border-2 border-[#D4E3FF] hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20 bg-transparent text-gray-700 transition-all duration-300"
                >
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
