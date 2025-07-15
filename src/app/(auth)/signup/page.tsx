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
import Container from '@/components/Container'
import {
  signup,
  sendEmailVerification,
  checkEmailVerification,
  checkNicknameAvailability,
} from '@/lib/api/auth'
import type { SignupRequest } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<SignupRequest>({
    email: '',
    nickname: '',
    password: '',
  })

  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
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
      const timer = setTimeout(async () => {
        try {
          // 실제 API 호출
          const response = await fetch(
            '/api/proxy/api/v1/users/verify/check-nickname',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nickname: formData.nickname }),
            },
          )

          if (response.ok) {
            setNicknameStatus('available')
          } else {
            setNicknameStatus('unavailable')
          }
        } catch (error) {
          console.error('닉네임 체크 에러:', error)
          setNicknameStatus('unavailable')
        }
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

  const handleInputChange = (field: keyof SignupRequest, value: string) => {
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

    try {
      // 일반 프록시를 통해 이메일 인증 API 호출
      const response = await fetch(
        '/api/proxy/api/v1/users/verify/email-send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          email:
            data.error || data.message || '이메일 인증 발송에 실패했습니다',
        }))
        setEmailVerificationSent(false)
      }
    } catch (error) {
      console.error('Email verification error:', error)
      setErrors((prev) => ({
        ...prev,
        email: '이메일 인증 발송 중 오류가 발생했습니다',
      }))
      setEmailVerificationSent(false)
    }
  }

  const handleEmailVerificationCheck = async () => {
    if (!verificationCode) {
      setErrors((prev) => ({ ...prev, email: '인증 코드를 입력해주세요' }))
      return
    }

    try {
      const response = await fetch(
        '/api/proxy/api/v1/users/verify/email-check',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            verificationCode: verificationCode,
          }),
        },
      )

      const data = await response.json()

      if (response.ok) {
        setEmailVerified(true)
        setErrors((prev) => ({ ...prev, email: '' }))
      } else {
        setErrors((prev) => ({
          ...prev,
          email: data.error || data.message || '인증 코드가 올바르지 않습니다',
        }))
      }
    } catch (error) {
      console.error('Email verification check error:', error)
      setErrors((prev) => ({
        ...prev,
        email: '인증 코드 확인 중 오류가 발생했습니다',
      }))
    }
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

    if (!confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요'
    } else if (formData.password !== confirmPassword) {
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

    try {
      const response = await signup(formData)

      if (response.status === 200 || response.status === 201) {
        alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.')
        router.push('/login')
      } else {
        setErrors((prev) => ({
          ...prev,
          general: response.message || '회원가입에 실패했습니다',
        }))
      }
    } catch (error) {
      console.error('Signup error:', error)
      setErrors((prev) => ({
        ...prev,
        general: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container size="sm">
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
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
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
                  disabled={emailVerified}
                  className="h-full border-0 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] whitespace-nowrap text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5] disabled:opacity-50"
                >
                  {emailVerified
                    ? '인증완료'
                    : emailVerificationSent
                      ? '재발송'
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
                <div className="space-y-3">
                  <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-700">
                      인증 이메일이 발송되었습니다. 이메일을 확인하여 인증
                      코드를 입력해주세요.
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      인증 코드
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="6자리 인증 코드를 입력하세요"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="flex-1"
                        maxLength={6}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleEmailVerificationCheck}
                        disabled={
                          !verificationCode || verificationCode.length < 6
                        }
                        className="border-0 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5] disabled:opacity-50"
                      >
                        확인
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      인증 코드는 5분 후 만료됩니다.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 닉네임 */}
            <div className="space-y-2">
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
                {nicknameStatus === 'available' && (
                  <CheckCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-green-500" />
                )}
                {nicknameStatus === 'unavailable' && (
                  <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-red-500" />
                )}
                {nicknameStatus === 'checking' && (
                  <Clock className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-blue-500" />
                )}
              </div>
              {errors.nickname && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.nickname}
                </p>
              )}
              {nicknameStatus === 'available' && (
                <p className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  사용 가능한 닉네임입니다
                </p>
              )}
              {nicknameStatus === 'unavailable' && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  이미 사용 중인 닉네임입니다
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="space-y-2">
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
                  placeholder="비밀번호를 입력하세요"
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
            <div className="space-y-2">
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

            {/* 이용약관 동의 */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                />
                <Label
                  htmlFor="terms"
                  className="cursor-pointer text-sm text-gray-700"
                >
                  <span className="text-[#8BB5FF]">이용약관</span> 및{' '}
                  <span className="text-[#8BB5FF]">개인정보처리방침</span>에
                  동의합니다
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

          <div className="border-t pt-4 text-center">
            <p className="mb-3 text-sm text-gray-600">
              이미 계정이 있으신가요?
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full border-2 border-[#D4E3FF] bg-transparent text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20"
            >
              <Link href="/login">로그인</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
