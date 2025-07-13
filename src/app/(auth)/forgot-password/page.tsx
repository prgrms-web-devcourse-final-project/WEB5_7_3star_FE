'use client'

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
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { forgotPassword } from '@/lib/api/auth'
import type { ForgotPasswordRequest } from '@/lib/api/auth'

export default function ForgotPassword() {
  const [formData, setFormData] = useState<ForgotPasswordRequest>({
    email: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email) {
      setError('이메일을 입력해주세요')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('올바른 이메일 형식이 아닙니다')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await forgotPassword(formData.email)

      if (response.status === 'success') {
        setIsSubmitted(true)
      } else {
        setError(
          response.message || '비밀번호 재설정 이메일 발송에 실패했습니다',
        )
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      setError('비밀번호 재설정 이메일 발송 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (value: string) => {
    setFormData({ email: value })
    if (error) {
      setError('')
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30 p-4">
        <div className="w-full max-w-lg">
          <Card className="border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              {/* 성공 아이콘 */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              {/* 제목 */}
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                이메일이 발송되었습니다
              </h1>
              <p className="mb-6 text-gray-600">
                비밀번호 재설정 링크가 <strong>{formData.email}</strong>로
                발송되었습니다.
              </p>

              {/* 안내 메시지 */}
              <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 font-medium text-blue-900">
                  📧 이메일을 확인해주세요
                </h4>
                <p className="text-sm text-blue-700">
                  • 스팸 메일함도 확인해보세요
                  <br />
                  • 링크는 24시간 동안 유효합니다
                  <br />• 이메일이 오지 않으면 다시 시도해주세요
                </p>
              </div>

              {/* 버튼들 */}
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ email: '' })
                  }}
                  className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] py-3 text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5]"
                >
                  다시 시도하기
                </Button>

                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">로그인으로 돌아가기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30 p-4">
      <div className="w-full max-w-lg">
        <Card className="border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
          <CardHeader className="pb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-2xl font-bold text-transparent">
              비밀번호 찾기
            </CardTitle>
            <CardDescription className="text-gray-600">
              가입한 이메일 주소를 입력하면 비밀번호 재설정 링크를 보내드립니다
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 오류 메시지 */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {/* 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  이메일 주소
                </Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="가입한 이메일을 입력하세요"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#7AA8FF] hover:to-[#B8A8F5] hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? '처리 중...' : '비밀번호 재설정 이메일 보내기'}
              </Button>
            </form>

            <div className="border-t pt-4 text-center">
              <p className="text-sm text-gray-600">
                계정을 기억하셨나요?{' '}
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
            className="flex items-center justify-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
