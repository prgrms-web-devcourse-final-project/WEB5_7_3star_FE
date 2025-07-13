'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)
  const [nicknameStatus, setNicknameStatus] = useState<
    'checking' | 'available' | 'unavailable' | null
  >(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    terms: '',
    general: '',
  })

  // 닉네임 중복 확인 (디바운스 적용)
  useEffect(() => {
    if (formData.nickname.length >= 2) {
      setNicknameStatus('checking')
      const timer = setTimeout(() => {
        // 실제로는 API 호출을 해야 하지만, 여기서는 시뮬레이션
        const unavailableNicknames = [
          'admin',
          'test',
          'user',
          'TrainUs',
          '관리자',
        ]
        const isAvailable = !unavailableNicknames.includes(
          formData.nickname.toLowerCase(),
        )
        setNicknameStatus(isAvailable ? 'available' : 'unavailable')
      }, 800)

      return () => clearTimeout(timer)
    } else {
      setNicknameStatus(null)
    }
  }, [formData.nickname])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 에러 메시지 초기화
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleEmailVerification = async () => {
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: '이메일을 입력해주세요' }))
      return
    }

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: '올바른 이메일 형식이 아닙니다' }))
      return
    }

    setEmailVerificationSent(true)
    setErrors((prev) => ({ ...prev, email: '' }))

    // 실제로는 이메일 인증 API 호출
    setTimeout(() => {
      setEmailVerified(true)
    }, 3000) // 시뮬레이션을 위한 3초 딜레이
  }

  const validateForm = () => {
    const newErrors = {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      terms: '',
      general: '',
    }

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    } else if (!emailVerified) {
      newErrors.email = '이메일 인증을 완료해주세요'
    }

    if (!formData.nickname) {
      newErrors.nickname = '닉네임을 입력해주세요'
    } else if (formData.nickname.length < 2) {
      newErrors.nickname = '닉네임은 2자 이상이어야 합니다'
    } else if (nicknameStatus === 'unavailable') {
      newErrors.nickname = '사용할 수 없는 닉네임입니다'
    } else if (nicknameStatus !== 'available') {
      newErrors.nickname = '닉네임 중복 확인을 완료해주세요'
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요'
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다'
    }

    if (!agreeTerms) {
      newErrors.terms = '이용약관 및 개인정보처리방침에 동의해주세요'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => !error)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrors((prev) => ({ ...prev, general: '' }))

    // 실제로는 서버에 회원가입 요청
    setTimeout(() => {
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.')
      window.location.href = '/login'
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30 p-4">
      <div className="mx-auto w-full max-w-lg">
        <Card className="border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
          <CardHeader className="pb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-2xl font-bold text-transparent">
              TrainUs 회원가입
            </CardTitle>
            <CardDescription className="text-gray-600">
              새로운 계정을 만들어 레슨을 시작하세요
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 일반 오류 메시지 */}
            {errors.general && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">{errors.general}</span>
              </div>
            )}

            {/* 회원가입 폼 */}
            <form onSubmit={handleSignup} className="space-y-6">
              {/* 이메일 */}
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  이메일
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className={`pl-10 ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#8BB5FF]'}`}
                    />
                    {emailVerified && (
                      <CheckCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-green-500" />
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEmailVerification}
                    disabled={emailVerificationSent || emailVerified}
                    className="border-0 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] whitespace-nowrap text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5] disabled:opacity-50"
                  >
                    {emailVerified
                      ? '인증완료'
                      : emailVerificationSent
                        ? '전송됨'
                        : '인증'}
                  </Button>
                </div>
                {errors.email && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
                {emailVerificationSent && !emailVerified && (
                  <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-700">
                      인증 이메일이 발송되었습니다. 확인해주세요.
                    </span>
                  </div>
                )}
              </div>

              {/* 닉네임 */}
              <div className="space-y-3">
                <Label
                  htmlFor="nickname"
                  className="text-sm font-medium text-gray-700"
                >
                  닉네임
                </Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    value={formData.nickname}
                    onChange={(e) =>
                      handleInputChange('nickname', e.target.value)
                    }
                    className={`pl-10 ${errors.nickname ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#8BB5FF]'}`}
                  />
                  {nicknameStatus === 'checking' && (
                    <Clock className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform animate-spin text-gray-400" />
                  )}
                  {nicknameStatus === 'available' && (
                    <CheckCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-green-500" />
                  )}
                  {nicknameStatus === 'unavailable' && (
                    <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-red-500" />
                  )}
                </div>
                {errors.nickname && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.nickname}
                  </p>
                )}
              </div>

              {/* 비밀번호 */}
              <div className="space-y-3">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  비밀번호
                </Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요 (8자 이상)"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    className={`pr-10 pl-10 ${errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#8BB5FF]'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div className="space-y-3">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  비밀번호 확인
                </Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 다시 입력하세요"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
                    className={`pr-10 pl-10 ${errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#8BB5FF]'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* 약관 동의 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) =>
                      setAgreeTerms(checked === true)
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="cursor-pointer text-sm text-gray-600"
                  >
                    이용약관 및 개인정보처리방침에 동의합니다
                  </Label>
                </div>
                {errors.terms && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.terms}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#7AA8FF] hover:to-[#B8A8F5] hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? '회원가입 중...' : '회원가입'}
              </Button>
            </form>

            {/* OAuth 회원가입 (주석처리) */}
            {/*
            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">
                  또는
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignup('카카오')}
                className="w-full border-yellow-400 bg-yellow-400 py-3 font-semibold text-yellow-900 transition-all duration-300 hover:bg-yellow-500"
              >
                <div className="mr-2 h-5 w-5 rounded bg-yellow-900"></div>
                카카오로 회원가입
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignup('구글')}
                className="w-full border-gray-300 bg-white py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50"
              >
                <div className="mr-2 h-5 w-5 rounded-full bg-red-500"></div>
                구글로 회원가입
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignup('네이버')}
                className="w-full border-green-500 bg-green-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-600"
              >
                <div className="mr-2 h-5 w-5 rounded bg-white"></div>
                네이버로 회원가입
              </Button>
            </div>
            */}

            <div className="border-t pt-4 text-center">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link
                  href="/login"
                  className="font-medium text-[#8BB5FF] transition-colors hover:text-[#7AA8FF]"
                >
                  로그인
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition-colors hover:text-gray-700"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
