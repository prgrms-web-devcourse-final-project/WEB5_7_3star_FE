'use client'

import { useState } from 'react'

export default function ApiTestPage() {
  const [testResults, setTestResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addResult = (message: string) => {
    setTestResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ])
  }

  const testApiConnection = async () => {
    setIsLoading(true)
    setTestResults([])

    try {
      addResult('🔍 API 서버 연결 테스트 시작...')

      // 1. Swagger UI 접근 테스트 (프록시를 통한 접근)
      try {
        addResult('📋 Swagger UI 접근 테스트 중...')
        const response = await fetch('/api/proxy/swagger-ui/index.html')
        addResult(`📊 Swagger 응답 상태: ${response.status}`)

        if (response.ok) {
          addResult('✅ Swagger UI 접근 성공')
          addResult(
            '🔗 Swagger UI 링크: http://43.202.206.47:8080/swagger-ui/index.html',
          )
        } else {
          addResult('❌ Swagger UI 접근 실패')
        }
      } catch (error) {
        addResult(`❌ Swagger UI 접근 오류: ${error}`)
      }

      // 2. 이메일 인증 API 테스트 (400 에러 원인 파악)
      try {
        addResult('📧 이메일 인증 API 테스트 중...')

        // 실제 요청 URL 확인
        const requestUrl = '/api/proxy/api/v1/users/verify/email-send'
        addResult(`🔗 요청 URL: ${requestUrl}`)

        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
          }),
        })
        addResult(`📊 이메일 인증 응답 상태: ${response.status}`)

        if (response.ok) {
          const data = await response.json()
          addResult('✅ 이메일 인증 API 호출 성공')
          addResult(`📊 응답 데이터: ${JSON.stringify(data, null, 2)}`)
        } else {
          const errorText = await response.text()
          addResult(
            `❌ 이메일 인증 API 실패: ${response.status} - ${errorText}`,
          )
        }
      } catch (error) {
        addResult(`❌ 이메일 인증 API 오류: ${error}`)
      }

      // 3. 직접 백엔드 호출 테스트 (프록시 우회)
      try {
        addResult('🔗 직접 백엔드 호출 테스트 중...')

        const directResponse = await fetch(
          'http://43.202.206.47:8080/api/v1/users/verify/email-send',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: 'test@example.com',
            }),
          },
        )
        addResult(`📊 직접 호출 응답 상태: ${directResponse.status}`)

        if (directResponse.ok) {
          const data = await directResponse.json()
          addResult('✅ 직접 백엔드 호출 성공')
          addResult(`📊 응답 데이터: ${JSON.stringify(data, null, 2)}`)
        } else {
          const errorText = await directResponse.text()
          addResult(
            `❌ 직접 호출 실패: ${directResponse.status} - ${errorText}`,
          )
        }
      } catch (error) {
        addResult(`❌ 직접 호출 오류: ${error}`)
      }

      // 4. 백엔드 서버 상태 확인
      try {
        addResult('🔍 백엔드 서버 상태 확인 중...')
        const response = await fetch('/api/proxy/')
        addResult(`📊 백엔드 루트 응답 상태: ${response.status}`)

        if (response.ok) {
          addResult('✅ 백엔드 서버 정상')
        } else {
          addResult('❌ 백엔드 서버 응답 이상')
        }
      } catch (error) {
        addResult(`❌ 백엔드 서버 연결 실패: ${error}`)
      }

      // 5. 닉네임 체크 API 테스트
      try {
        addResult('👤 닉네임 체크 API 테스트 중...')
        const response = await fetch(
          '/api/proxy/api/v1/users/verify/check-nickname',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nickname: 'testuser',
            }),
          },
        )
        addResult(`📊 닉네임 체크 응답 상태: ${response.status}`)

        if (response.ok) {
          const data = await response.json()
          addResult('✅ 닉네임 체크 API 호출 성공')
          addResult(`📊 응답 데이터: ${JSON.stringify(data, null, 2)}`)
        } else {
          const errorText = await response.text()
          addResult(
            `❌ 닉네임 체크 API 실패: ${response.status} - ${errorText}`,
          )
        }
      } catch (error) {
        addResult(`❌ 닉네임 체크 API 오류: ${error}`)
      }

      // 6. 레슨 목록 API 테스트 (정상 작동하는 API)
      try {
        addResult('📚 레슨 목록 API 테스트 중...')
        const response = await fetch(
          '/api/proxy/api/v1/lessons?category=ALL&city=서울특별시&district=강남구&dong=역삼동&page=1&limit=5',
        )
        addResult(`📊 레슨 목록 응답 상태: ${response.status}`)

        if (response.ok) {
          const data = await response.json()
          addResult('✅ 레슨 목록 API 호출 성공')
        } else {
          const errorText = await response.text()
          addResult(`❌ 레슨 목록 API 실패: ${response.status} - ${errorText}`)
        }
      } catch (error) {
        addResult(`❌ 레슨 목록 API 오류: ${error}`)
      }
    } catch (error) {
      addResult(`❌ 전체 테스트 실패: ${error}`)
    } finally {
      setIsLoading(false)
      addResult('🏁 API 테스트 완료')
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">🔧 백엔드 API 테스트</h1>

      <div className="mb-6">
        <button
          onClick={testApiConnection}
          disabled={isLoading}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? '테스트 중...' : 'API 연결 테스트'}
        </button>
      </div>

      <div className="rounded-lg bg-gray-100 p-4">
        <h2 className="mb-4 text-xl font-semibold">테스트 결과:</h2>
        <div className="max-h-96 space-y-2 overflow-y-auto">
          {testResults.map((result, index) => (
            <div key={index} className="rounded bg-white p-2 font-mono text-sm">
              {result}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-4 text-xl font-semibold">API 문서 및 도구:</h2>
        <div className="space-y-2 rounded-lg bg-blue-50 p-4">
          <p>
            <strong>Swagger UI:</strong>{' '}
            <a
              href="http://43.202.206.47:8080/swagger-ui/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              API 문서 보기
            </a>
          </p>
          <p>
            <strong>서버 URL:</strong> http://43.202.206.47:8080
          </p>
          <p>
            <strong>클라이언트:</strong> http://localhost:8031
          </p>
        </div>
      </div>
    </div>
  )
}
