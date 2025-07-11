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
  CheckCircle,
  Heart,
  AlertTriangle,
  MoreHorizontal,
  XCircle,
  Info,
} from "lucide-react"
import Link from "next/link"

export default function ReservationCancelPage() {
  const [cancelReason, setCancelReason] = useState("")
  const [detailReason, setDetailReason] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const isFormValid = cancelReason && termsAccepted

  const handleCancellation = async () => {
    if (!isFormValid) return

    const confirmMessage = `정말로 예약을 취소하시겠습니까?

• 취소 후에는 되돌릴 수 없습니다
• 레슨 참여가 불가능해집니다
• 다시 신청하려면 재신청이 필요합니다`

    if (!confirm(confirmMessage)) return

    setIsProcessing(true)

    // 실제로는 서버에 취소 요청
    setTimeout(() => {
      alert("예약 취소가 완료되었습니다!")
      window.location.href = "/mypage/applications"
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
                  href="/mypage/applications"
                  className="text-gray-600 hover:text-[#8BB5FF] transition-colors duration-200"
                >
                  신청레슨 현황
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">예약 취소</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* 페이지 제목 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-transparent mb-3">
            예약 취소
          </h1>
          <p className="text-gray-600">무료 레슨 예약을 취소하세요</p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 취소 폼 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 취소 안내 */}
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader className="bg-gradient-to-r from-blue-100/60 to-indigo-100/60 rounded-t-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <Info className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-blue-800">예약 취소 안내</CardTitle>
                    <CardDescription className="text-blue-700">무료 레슨 예약 취소 시 참고사항입니다</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-100/50 rounded-lg border-l-4 border-blue-400">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800 font-medium">레슨 시작 1시간 전까지 취소 가능</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-100/50 rounded-lg border-l-4 border-blue-400">
                    <XCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800 font-medium">취소 후 재신청 시 다시 승인 과정 필요</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-100/50 rounded-lg border-l-4 border-blue-400">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800 font-medium">무료 레슨이므로 환불 절차는 없습니다</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-100/50 rounded-lg border-l-4 border-blue-400">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800 font-medium">취소 완료 후 SMS/이메일로 알림 발송</span>
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
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">요가 중급반 - 몸과 마음의 균형</h4>
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-2">
                      <CheckCircle className="h-4 w-4" />
                      승인완료
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                      무료
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
                          <AlertTriangle className="h-5 w-5" />
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
                      <RadioGroupItem value="dissatisfaction" id="dissatisfaction" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] rounded-lg flex items-center justify-center text-white">
                          <XCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <Label
                            htmlFor="dissatisfaction"
                            className="text-base font-medium text-gray-800 cursor-pointer"
                          >
                            레슨 내용 불만족
                          </Label>
                          <p className="text-sm text-gray-600">레슨 내용이나 강사에 대한 불만족</p>
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
                    placeholder="취소 사유를 자세히 설명해주세요. (최대 300자)"
                    value={detailReason}
                    onChange={(e) => setDetailReason(e.target.value)}
                    maxLength={300}
                    rows={3}
                    className="resize-none"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">{detailReason.length}/300자</div>
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
                      예약 취소 정책에 동의합니다 (필수)
                      <br />
                      <span className="text-xs text-gray-500">
                        • 취소 후 재신청 시 다시 승인 과정이 필요합니다
                        <br />• 레슨 시작 1시간 전까지만 취소 가능합니다
                      </span>
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
                <CardTitle className="text-gray-800">예약 취소 요약</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">레슨 유형</span>
                    <span className="text-green-600 font-medium">무료 레슨</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">취소 수수료</span>
                    <span className="text-green-600 font-medium">없음</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">환불 금액</span>
                    <span className="text-gray-600">해당 없음</span>
                  </div>
                  <Separator />
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <p className="text-green-700 font-medium">무료 레슨이므로</p>
                    <p className="text-green-700 font-medium">환불 절차가 없습니다</p>
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
                        <p className="text-sm font-medium text-gray-700">취소 완료</p>
                        <p className="text-xs text-gray-500">즉시 처리</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">알림 발송</p>
                        <p className="text-xs text-gray-500">취소 후 즉시</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCancellation}
                  disabled={!isFormValid || isProcessing}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {isProcessing ? "취소 처리 중..." : "예약 취소하기"}
                </Button>

                <Link href="/mypage/applications" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full py-4 text-lg font-semibold border-2 border-[#D4E3FF] hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20 bg-transparent text-gray-700 transition-all duration-300"
                  >
                    돌아가기
                  </Button>
                </Link>

                <p className="text-center text-xs text-gray-500 mt-4 italic">취소 후에는 재신청이 필요합니다</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
