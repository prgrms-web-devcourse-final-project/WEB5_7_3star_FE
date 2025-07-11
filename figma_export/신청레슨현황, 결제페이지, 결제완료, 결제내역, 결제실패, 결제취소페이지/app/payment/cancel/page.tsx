"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  CreditCard,
  CheckCircle,
  Heart,
  AlertTriangle,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

export default function PaymentCancelPage() {
  const [cancelReason, setCancelReason] = useState("")
  const [detailReason, setDetailReason] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const isFormValid = cancelReason && termsAccepted && dataProcessingAccepted

  const handleCancellation = async () => {
    if (!isFormValid) return

    const confirmMessage = `정말로 결제를 취소하시겠습니까?

• 취소 후에는 되돌릴 수 없습니다
• 환불은 영업일 기준 3-5일 소요됩니다
• 레슨 참여가 불가능해집니다`

    if (!confirm(confirmMessage)) return

    setIsProcessing(true)

    // 실제로는 서버에 취소 요청
    setTimeout(() => {
      alert("결제 취소가 완료되었습니다!")
      window.location.href = "/mypage/payments"
    }, 2000)
  }

  return (
    <div className="bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 브레드크럼 */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-600 hover:text-[#8BB5FF] transition-colors duration-200">
                홈
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  href="/mypage/payments"
                  className="text-gray-600 hover:text-[#8BB5FF] transition-colors duration-200"
                >
                  결제 내역
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">결제 취소</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* 페이지 제목 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-transparent mb-3">
            결제 취소
          </h1>
          <p className="text-gray-600">레슨 예약을 취소하고 환불을 신청하세요</p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 취소 폼 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 취소 안내 */}
            <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
              <CardHeader className="bg-gradient-to-r from-orange-100/60 to-amber-100/60 rounded-t-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-orange-800">결제 취소 안내</CardTitle>
                    <CardDescription className="text-orange-700">
                      취소 전 아래 내용을 반드시 확인해주세요
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-orange-100/50 rounded-lg border-l-4 border-orange-400">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-orange-800 font-medium">레슨 시작 24시간 전까지만 무료 취소 가능</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-100/50 rounded-lg border-l-4 border-orange-400">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="text-orange-800 font-medium">환불 처리는 영업일 기준 3-5일 소요</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-100/50 rounded-lg border-l-4 border-orange-400">
                    <CreditCard className="h-4 w-4 text-orange-600" />
                    <span className="text-orange-800 font-medium">결제 수단으로 환불 (카드 승인 취소)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-100/50 rounded-lg border-l-4 border-orange-400">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-orange-800 font-medium">취소 완료 후 SMS/이메일로 알림 발송</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 레슨 정보 */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40 rounded-t-lg">
                <CardTitle className="text-gray-800">취소할 레슨 정보</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex gap-4 p-4 bg-gradient-to-r from-[#D4E3FF]/30 to-[#E1D8FB]/30 rounded-lg border border-[#D4E3FF]">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#D4E3FF] to-[#E1D8FB] rounded-xl flex items-center justify-center text-white font-medium shadow-sm">
                    레슨
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">요가 기초반 - 몸과 마음의 균형</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-[#8BB5FF]" />
                        <span className="text-gray-700">김요가 강사</span>
                      </div>
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
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <CheckCircle className="h-4 w-4" />
                      결제완료
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 취소 사유 */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40 rounded-t-lg">
                <CardTitle className="text-gray-800">취소 사유</CardTitle>
                <CardDescription className="text-gray-600">취소 사유를 선택해주세요 (필수)</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <RadioGroup value={cancelReason} onValueChange={setCancelReason}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#D4E3FF] hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20 cursor-pointer transition-all duration-200 has-[:checked]:border-[#8BB5FF] has-[:checked]:bg-gradient-to-r has-[:checked]:from-[#D4E3FF]/30 has-[:checked]:to-[#E1D8FB]/30">
                      <RadioGroupItem value="schedule" id="schedule" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] rounded-lg flex items-center justify-center text-white">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="schedule" className="text-base font-medium text-gray-800 cursor-pointer">
                            일정 변경
                          </Label>
                          <p className="text-sm text-gray-600">개인 일정이 변경되어 참석이 어려워졌습니다</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#D4E3FF] hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20 cursor-pointer transition-all duration-200 has-[:checked]:border-[#8BB5FF] has-[:checked]:bg-gradient-to-r has-[:checked]:from-[#D4E3FF]/30 has-[:checked]:to-[#E1D8FB]/30">
                      <RadioGroupItem value="health" id="health" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] rounded-lg flex items-center justify-center text-white">
                          <Heart className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="health" className="text-base font-medium text-gray-800 cursor-pointer">
                            건강상 이유
                          </Label>
                          <p className="text-sm text-gray-600">몸이 아프거나 건강상 문제로 참석이 어렵습니다</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#D4E3FF] hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20 cursor-pointer transition-all duration-200 has-[:checked]:border-[#8BB5FF] has-[:checked]:bg-gradient-to-r has-[:checked]:from-[#D4E3FF]/30 has-[:checked]:to-[#E1D8FB]/30">
                      <RadioGroupItem value="emergency" id="emergency" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] rounded-lg flex items-center justify-center text-white">
                          <AlertCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="emergency" className="text-base font-medium text-gray-800 cursor-pointer">
                            긴급 상황
                          </Label>
                          <p className="text-sm text-gray-600">예상치 못한 긴급한 상황이 발생했습니다</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#D4E3FF] hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20 cursor-pointer transition-all duration-200 has-[:checked]:border-[#8BB5FF] has-[:checked]:bg-gradient-to-r has-[:checked]:from-[#D4E3FF]/30 has-[:checked]:to-[#E1D8FB]/30">
                      <RadioGroupItem value="other" id="other" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] rounded-lg flex items-center justify-center text-white">
                          <MoreHorizontal className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="other" className="text-base font-medium text-gray-800 cursor-pointer">
                            기타
                          </Label>
                          <p className="text-sm text-gray-600">위에 해당하지 않는 다른 사유입니다</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                {/* 상세 사유 입력 */}
                <div className="mt-6">
                  <Label htmlFor="detailReason" className="text-base font-medium text-gray-700 mb-2 block">
                    상세 사유 (선택)
                  </Label>
                  <Textarea
                    id="detailReason"
                    placeholder="취소 사유를 자세히 설명해주세요. (최대 500자)"
                    value={detailReason}
                    onChange={(e) => setDetailReason(e.target.value)}
                    maxLength={500}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">{detailReason.length}/500자</div>
                </div>
              </CardContent>
            </Card>

            {/* 환불 정보 */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40 rounded-t-lg">
                <CardTitle className="text-gray-800">환불 정보</CardTitle>
                <CardDescription className="text-gray-600">카드 결제 시 자동으로 승인 취소됩니다</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#D4E3FF]/30 to-[#E1D8FB]/30 rounded-lg border border-[#D4E3FF]">
                  <div className="w-12 h-12 bg-[#8BB5FF] rounded-lg flex items-center justify-center text-white">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">카카오페이 (카드)</h4>
                    <p className="text-sm text-gray-600">신한카드 ****-****-****-1234</p>
                    <p className="text-sm text-[#8BB5FF] font-medium">환불 예상 시간: 즉시~영업일 기준 3일</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 약관 동의 */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="cancelTerms" checked={termsAccepted} onCheckedChange={setTermsAccepted} />
                    <Label htmlFor="cancelTerms" className="text-sm text-gray-700 cursor-pointer">
                      취소 및 환불 정책에 동의합니다 (필수)
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataProcessing"
                      checked={dataProcessingAccepted}
                      onCheckedChange={setDataProcessingAccepted}
                    />
                    <Label htmlFor="dataProcessing" className="text-sm text-gray-700 cursor-pointer">
                      개인정보 처리 및 환불 처리를 위한 정보 이용에 동의합니다 (필수)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 취소 요약 사이드바 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40 rounded-t-lg">
                <CardTitle className="text-gray-800">취소 요약</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">원래 결제금액</span>
                    <span className="text-gray-800">25,000원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">취소 수수료</span>
                    <span className="text-green-600 font-medium">무료</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-gray-800">환불 예정 금액</span>
                    <span className="text-red-600 text-xl">25,000원</span>
                  </div>
                </div>

                {/* 처리 일정 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-4">처리 일정</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#8BB5FF] rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">취소 신청</p>
                        <p className="text-xs text-gray-500">즉시</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">취소 승인</p>
                        <p className="text-xs text-gray-500">1시간 이내</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">환불 완료</p>
                        <p className="text-xs text-gray-500">영업일 3-5일</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCancellation}
                  disabled={!isFormValid || isProcessing}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "취소 처리 중..." : "결제 취소 신청하기"}
                </Button>

                <div className="mt-4">
                  <Link href="/mypage/payments" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full py-4 text-lg font-semibold border-2 border-[#D4E3FF] hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20 bg-transparent text-gray-700 transition-all duration-300"
                    >
                      돌아가기
                    </Button>
                  </Link>
                </div>

                <p className="text-center text-xs text-gray-500 mt-4 italic">취소 신청 후에는 변경이 불가능합니다</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
