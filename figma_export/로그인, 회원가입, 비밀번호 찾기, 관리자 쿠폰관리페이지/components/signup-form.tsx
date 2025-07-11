"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, User, Lock, Check, X } from "lucide-react"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)
  const [nicknameStatus, setNicknameStatus] = useState<"checking" | "available" | "unavailable" | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // 닉네임 중복 확인 (디바운스 적용)
  useEffect(() => {
    if (formData.nickname.length >= 2) {
      setNicknameStatus("checking")
      const timer = setTimeout(() => {
        // 실제로는 API 호출을 해야 하지만, 여기서는 시뮬레이션
        const isAvailable = !["admin", "test", "user"].includes(formData.nickname.toLowerCase())
        setNicknameStatus(isAvailable ? "available" : "unavailable")
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setNicknameStatus(null)
    }
  }, [formData.nickname])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 에러 메시지 초기화
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleEmailVerification = async () => {
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "이메일을 입력해주세요." }))
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "올바른 이메일 형식이 아닙니다." }))
      return
    }

    setEmailVerificationSent(true)
    // 실제로는 이메일 인증 API 호출
    setTimeout(() => {
      setEmailVerified(true)
    }, 2000) // 시뮬레이션을 위한 2초 딜레이
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다."
    } else if (!emailVerified) {
      newErrors.email = "이메일 인증을 완료해주세요."
    }

    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요."
    } else if (formData.nickname.length < 2) {
      newErrors.nickname = "닉네임은 2자 이상이어야 합니다."
    } else if (nicknameStatus === "unavailable") {
      newErrors.nickname = "사용할 수 없는 닉네임입니다."
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요."
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다."
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요."
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다."
    }

    if (!agreeTerms) {
      newErrors.terms = "이용약관 및 개인정보처리방침에 동의해주세요."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("회원가입 데이터:", formData)
      alert("회원가입이 완료되었습니다!")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
        <CardDescription>새로운 계정을 만들어보세요</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 */}
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                />
                {emailVerified && <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleEmailVerification}
                disabled={emailVerificationSent || emailVerified}
                className="whitespace-nowrap bg-transparent"
              >
                {emailVerified ? "인증완료" : emailVerificationSent ? "전송됨" : "인증"}
              </Button>
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            {emailVerificationSent && !emailVerified && (
              <p className="text-sm text-blue-600">인증 이메일이 발송되었습니다. 확인해주세요.</p>
            )}
          </div>

          {/* 닉네임 */}
          <div className="space-y-2">
            <Label htmlFor="nickname">닉네임</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                value={formData.nickname}
                onChange={(e) => handleInputChange("nickname", e.target.value)}
                className="pl-10"
              />
              {nicknameStatus === "available" && <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />}
              {nicknameStatus === "unavailable" && <X className="absolute right-3 top-3 h-4 w-4 text-red-500" />}
            </div>
            {errors.nickname && <p className="text-sm text-red-500">{errors.nickname}</p>}
            {nicknameStatus === "checking" && <p className="text-sm text-gray-500">닉네임 중복 확인 중...</p>}
            {nicknameStatus === "available" && <p className="text-sm text-green-600">사용 가능한 닉네임입니다.</p>}
            {nicknameStatus === "unavailable" && <p className="text-sm text-red-500">사용할 수 없는 닉네임입니다.</p>}
          </div>

          {/* 비밀번호 */}
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <Check className="absolute right-10 top-3 h-4 w-4 text-green-500" />
              )}
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* 약관 동의 */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                <span className="text-blue-600 underline cursor-pointer">이용약관</span> 및{" "}
                <span className="text-blue-600 underline cursor-pointer">개인정보처리방침</span>에 동의합니다.
              </Label>
            </div>
            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
          </div>

          {/* 회원가입 버튼 */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!agreeTerms || nicknameStatus !== "available" || !emailVerified}
          >
            회원가입
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          이미 계정이 있으신가요? <button className="text-blue-600 hover:underline">로그인</button>
        </div>
      </CardContent>
    </Card>
  )
}
