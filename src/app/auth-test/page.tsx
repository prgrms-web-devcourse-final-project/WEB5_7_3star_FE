'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, User, Shield, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { testDirectApi } from '@/lib/api/auth'

export default function AuthTestPage() {
  const { isAuthenticated, user, isLoading, error, checkAuth, logout } =
    useAuth()
  const [directTestResult, setDirectTestResult] = useState<any>(null)
  const [directTestLoading, setDirectTestLoading] = useState(false)

  // 컴포넌트 마운트 시 한 번만 인증 상태 확인
  useEffect(() => {
    checkAuth()
  }, []) // checkAuth는 의존성 배열에 포함하지 않음

  const handleDirectTest = async () => {
    setDirectTestLoading(true)
    try {
      const result = await testDirectApi()
      setDirectTestResult(result)
    } catch (error) {
      setDirectTestResult({
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setDirectTestLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청
      await fetch('/api/proxy/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('로그아웃 서버 요청 오류:', error)
    }

    // 클라이언트 상태 정리
    logout()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>인증 상태를 확인하는 중...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-6 p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            인증 상태 테스트
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">인증 상태:</span>
            {isAuthenticated ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                로그인됨
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                로그아웃됨
              </Badge>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-700">오류: {error}</span>
            </div>
          )}

          {isAuthenticated && user && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">사용자 정보:</span>
              </div>
              <div className="ml-6 space-y-1 text-sm">
                <div>ID: {user.id}</div>
                <div>이메일: {user.email}</div>
                <div>닉네임: {user.nickname}</div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={checkAuth} variant="outline">
              인증 상태 새로고침
            </Button>
            <Button
              onClick={handleDirectTest}
              variant="outline"
              disabled={directTestLoading}
            >
              {directTestLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  직접 API 테스트 중...
                </>
              ) : (
                '직접 백엔드 API 테스트'
              )}
            </Button>
            {isAuthenticated && (
              <Button onClick={handleLogout} variant="destructive">
                로그아웃
              </Button>
            )}
          </div>

          {directTestResult && (
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
              <h4 className="mb-2 font-medium text-blue-800">
                직접 API 테스트 결과:
              </h4>
              <pre className="overflow-auto text-xs text-blue-700">
                {JSON.stringify(directTestResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API 엔드포인트 테스트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div>
              현재 사용 중인 엔드포인트: <code>/api/v1/users/me</code>
            </div>
            <div>
              프록시 경로: <code>/api/proxy/api/v1/users/me</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
