"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Clock, KeyRound } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "reset">("email") // 단계: 이메일 입력 -> 비밀번호 재설정
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    general: "",
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 에러 메시지 초기화
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleEmailVerification = async () => {
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "이메일을 입력해주세요" }))
      return
    }

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "올바른 이메일 형식이 아닙니다" }))
      return
    }

    setEmailVerificationSent(true)
    setErrors((prev) => ({ ...prev, email: "" }))

    // 실제로는 이메일 인증 API 호출
    setTimeout(() => {
      setEmailVerified(true)
      setStep("reset")
    }, 3000) // 시뮬레이션을 위한 3초 딜레이
  }

  const validatePasswordForm = () => {
    const newErrors = {
      email: "",
      newPassword: "",
      confirmPassword: "",
      general: "",
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "새 비밀번호를 입력해주세요"
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "비밀번호는 8자 이상이어야 합니다"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요"
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다"
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => !error)
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePasswordForm()) return

    setIsLoading(true)
    setErrors((prev) => ({ ...prev, general: "" }))

    // 실제로는 서버에 비밀번호 재설정 요청
    setTimeout(() => {
      alert("비밀번호가 성공적으로 변경되었습니다! 로그인 페이지로 이동합니다.")
      window.location.href = "/login"
      setIsLoading(false)
    }, 2000)
  }

  const handleSocialReset = (provider: string) => {
    alert(`${provider} 계정의 비밀번호는 해당 플랫폼에서 재설정해주세요`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] rounded-full flex items-center justify-center mb-4 shadow-lg">
              <KeyRound className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-transparent">
              {step === "email" ? "비밀번호 찾기" : "비밀번호 재설정"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {step === "email"
                ? "가입하신 이메일로 인증을 받아 비밀번호를 재설정하세요"
                : "새로운 비밀번호를 설정해주세요"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 일반 오류 메시지 */}
            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">{errors.general}</span>
              </div>
            )}

            {step === "email" ? (
              // 이메일 인증 단계
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    이메일
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="가입하신 이메일을 입력하세요"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`pl-10 ${errors.email ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-[#8BB5FF]"}`}
                      />
                      {emailVerified && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={handleEmailVerification}
                      disabled={emailVerificationSent || emailVerified}
                      className="whitespace-nowrap bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-white border-0 hover:from-[#7AA8FF] hover:to-[#B8A8F5] disabled:opacity-50"
                    >
                      {emailVerified ? "인증완료" : emailVerificationSent ? "전송됨" : "인증"}
                    </Button>
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                  {emailVerificationSent && !emailVerified && (
                    <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium">인증 이메일이 발송되었습니다</p>
                        <p>이메일을 확인하고 인증을 완료해주세요</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 다른 방법으로 찾기 */}
                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-2 text-sm text-gray-500">다른 방법으로 찾기</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialReset("카카오")}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-400 py-3 font-semibold transition-all duration-300"
                  >
                    <div className="w-5 h-5 bg-yellow-900 rounded mr-2"></div>
                    카카오 계정으로 찾기
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialReset("구글")}
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 border-gray-300 py-3 font-semibold transition-all duration-300"
                  >
                    <div className="w-5 h-5 bg-red-500 rounded-full mr-2"></div>
                    구글 계정으로 찾기
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialReset("네이버")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white border-green-500 py-3 font-semibold transition-all duration-300"
                  >
                    <div className="w-5 h-5 bg-white rounded mr-2"></div>
                    네이버 계정으로 찾기
                  </Button>
                </div>
              </div>
            ) : (
              // 비밀번호 재설정 단계
              <form onSubmit={handlePasswordReset} className="space-y-4">
                {/* 인증 완료 알림 */}
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="text-sm text-green-700">
                    <p className="font-medium">이메일 인증이 완료되었습니다</p>
                    <p>{formData.email}</p>
                  </div>
                </div>

                {/* 새 비밀번호 */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                    새 비밀번호
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="새 비밀번호를 입력하세요 (8자 이상)"
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange("newPassword", e.target.value)}
                      className={`pl-10 pr-10 ${errors.newPassword ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-[#8BB5FF]"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* 새 비밀번호 확인 */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    새 비밀번호 확인
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="새 비밀번호를 다시 입력하세요"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-[#8BB5FF]"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                      <CheckCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* 비밀번호 재설정 버튼 */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] hover:from-[#7AA8FF] hover:to-[#B8A8F5] text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? "비밀번호 변경 중..." : "비밀번호 변경"}
                </Button>
              </form>
            )}

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                비밀번호가 기억나셨나요?{" "}
                <Link href="/login" className="text-[#8BB5FF] hover:text-[#7AA8FF] font-medium transition-colors">
                  로그인
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
