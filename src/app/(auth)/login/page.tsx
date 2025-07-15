'use client'

import Container from '@/components/Container'
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
import { AlertCircle, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'
import { useState } from 'react'
import { login } from '@/lib/api/auth'
import type { LoginRequest, LoginResponse } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '', general: '' })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = { email: '', password: '', general: '' }

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요'
    } else if (formData.password.length < 6) {
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

    try {
      const response = await login(formData)

      // 로그인 성공 시 처리
      if (response.data) {
        // 사용자 정보만 저장 (토큰 없음)
        const userData = {
          id: response.data.id,
          email: response.data.email,
          nickname: response.data.nickname,
        }

        // 토큰 없이 사용자 정보만 저장
        localStorage.setItem('user', JSON.stringify(userData))

        // 페이지 새로고침하여 헤더 즉시 업데이트
        window.location.href = '/'
      } else {
        throw new Error('로그인 응답에 사용자 정보가 없습니다.')
      }
    } catch (error) {
      console.error('Login error:', error)

      // 에러 타입에 따른 메시지 설정
      let errorMessage = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'

      if (error instanceof Error) {
        if (error.message.includes('네트워크 연결에 실패했습니다')) {
          errorMessage =
            '서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.'
        } else if (error.message.includes('CORS')) {
          errorMessage = '브라우저 보안 정책으로 인해 요청이 차단되었습니다.'
        } else {
          errorMessage = error.message
        }
      }

      setErrors({
        email: '',
        password: '',
        general: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof LoginRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 에러 메시지 초기화
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
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
            TrainUs 로그인
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
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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

            {/* <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-[#8BB5FF] transition-colors hover:text-[#7AA8FF]"
              >
                비밀번호 찾기
              </Link>
            </div> */}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#7AA8FF] hover:to-[#B8A8F5] hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="border-t pt-4 text-center">
            <p className="mb-3 text-sm text-gray-600">
              아직 계정이 없으신가요?
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full border-2 border-[#D4E3FF] bg-transparent text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D4E3FF]/20 hover:to-[#E1D8FB]/20"
            >
              <Link href="/signup">회원가입</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
