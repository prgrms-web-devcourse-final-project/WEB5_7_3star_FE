'use client'

import type React from 'react'
import { useState } from 'react'
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
import { Separator } from '@/components/ui/separator'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '', general: '' })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = { email: '', password: '', general: '' }

    if (!email) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!validateEmail(email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요'
    } else if (password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다'
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({ email: '', password: '', general: '' })

    // 실제로는 서버에 로그인 요청
    setTimeout(() => {
      // 데모용 로그인 검증
      if (email === 'demo@example.com' && password === '123456') {
        alert('로그인 성공! 홈페이지로 이동합니다.')
        window.location.href = '/'
      } else {
        setErrors({
          email: '',
          password: '',
          general: '이메일 또는 비밀번호가 올바르지 않습니다',
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} 로그인 기능은 데모에서 지원하지 않습니다`)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30 p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
          <CardHeader className="pb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-2xl font-bold text-transparent">
              운동메이트 로그인
            </CardTitle>
            <CardDescription className="text-gray-600">
              계정에 로그인하여 레슨을 예약하세요
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

            {/* 데모 안내 */}
            <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">데모 계정</p>
                <p>이메일: demo@example.com</p>
                <p>비밀번호: 123456</p>
              </div>
            </div>

            {/* 로그인 폼 */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  이메일
                </Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#8BB5FF]'}`}
                  />
                </div>
                {errors.email && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="cursor-pointer text-sm text-gray-600"
                  >
                    로그인 상태 유지
                  </Label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm text-[#8BB5FF] transition-colors hover:text-[#7AA8FF]"
                >
                  비밀번호 찾기
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#7AA8FF] hover:to-[#B8A8F5] hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">
                  또는
                </span>
              </div>
            </div>

            {/* 소셜 로그인 */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('카카오')}
                className="w-full border-yellow-400 bg-yellow-400 py-3 font-semibold text-yellow-900 transition-all duration-300 hover:bg-yellow-500"
              >
                <div className="mr-2 h-5 w-5 rounded bg-yellow-900"></div>
                카카오로 로그인
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('네이버')}
                className="w-full border-green-500 bg-green-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-600"
              >
                <div className="mr-2 h-5 w-5 rounded bg-white"></div>
                네이버로 로그인
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('구글')}
                className="w-full border-gray-300 bg-white py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50"
              >
                <div className="mr-2 h-5 w-5 rounded bg-blue-500"></div>
                구글로 로그인
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                계정이 없으신가요?{' '}
                <Link
                  href="/auth/register"
                  className="font-medium text-[#8BB5FF] transition-colors hover:text-[#7AA8FF]"
                >
                  회원가입
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
