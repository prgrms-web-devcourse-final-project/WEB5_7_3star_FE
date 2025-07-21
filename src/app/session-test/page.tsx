'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SessionTestPage() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })

  const testSession = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/proxy/session-test', {
        method: 'GET',
        credentials: 'include',
      })

      const data = await response.json()
      setResult(data)
      console.log('Session test result:', data)
    } catch (error) {
      console.error('Session test error:', error)
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/proxy/login-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()
      setResult(data)
      console.log('Login test result:', data)
    } catch (error) {
      console.error('Login test error:', error)
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto space-y-6 p-8">
      <Card>
        <CardHeader>
          <CardTitle>세션 상태 테스트</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testSession} disabled={isLoading}>
            {isLoading ? '테스트 중...' : '세션 상태 확인'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>로그인 테스트</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <Button
            onClick={testLogin}
            disabled={isLoading || !loginData.email || !loginData.password}
          >
            {isLoading ? '테스트 중...' : '로그인 테스트'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>결과</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="max-h-96 overflow-auto rounded bg-gray-100 p-4 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
