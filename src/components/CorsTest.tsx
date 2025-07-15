'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  testServerConnection,
  testDirectFetch,
  testRootPath,
  testLessonsApi,
  testRankingsApi,
} from '@/lib/api/test'

export default function CorsTest() {
  const [results, setResults] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [frontendUrl, setFrontendUrl] = useState<string>('')

  useEffect(() => {
    // 현재 브라우저의 주소를 가져옴
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.origin
      setFrontendUrl(currentUrl)
    }
  }, [])

  const runTest = async (
    testName: string,
    testFunction: () => Promise<unknown>,
  ) => {
    setLoading((prev) => ({ ...prev, [testName]: true }))
    setResults((prev) => ({ ...prev, [testName]: '테스트 중...' }))

    try {
      const result = await testFunction()
      setResults((prev) => ({
        ...prev,
        [testName]: `✅ 성공: ${JSON.stringify(result, null, 2)}`,
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [testName]: `❌ 실패: ${error instanceof Error ? error.message : String(error)}`,
      }))
    } finally {
      setLoading((prev) => ({ ...prev, [testName]: false }))
    }
  }

  const tests = [
    {
      name: '1. 서버 연결 테스트 (루트 경로)',
      function: () => testServerConnection(),
      description: '기본 서버 연결 상태 확인 - GET /',
    },
    {
      name: '2. 직접 Fetch 테스트 (CORS 정책 확인)',
      function: () => testDirectFetch(),
      description: '브라우저 내장 fetch API 사용 - GET /api/v1/lessons',
    },
    {
      name: '3. 레슨 목록 API 테스트',
      function: () => testLessonsApi(),
      description: '실제 레슨 목록 API - GET /api/v1/lessons',
    },
    {
      name: '4. 랭킹 API 테스트',
      function: () => testRankingsApi(),
      description: '실제 랭킹 API - GET /api/v1/rankings',
    },
    {
      name: '5. 루트 경로 테스트 (Axios)',
      function: () => testRootPath(),
      description: 'Axios를 통한 루트 경로 테스트 - GET /',
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">🔧 CORS 테스트 페이지</h1>

      <div className="rounded-lg bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-900">📋 테스트 목적:</h3>
        <p className="mb-2 text-sm text-blue-800">
          이 페이지는 백엔드 API 서버의 CORS 설정을 테스트하기 위한 도구입니다.
        </p>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>
            • 프론트엔드({frontendUrl || '로딩 중...'})에서
            백엔드(43.202.206.47:8080)로의 직접 요청
          </li>
          <li>• 브라우저의 CORS 정책이 올바르게 설정되었는지 확인</li>
          <li>• 실제 API 엔드포인트들의 접근 가능성 검증</li>
        </ul>
      </div>

      <div className="rounded-lg bg-yellow-50 p-4">
        <h3 className="font-semibold text-yellow-900">🌐 서버 정보:</h3>
        <div className="space-y-1 text-sm text-yellow-800">
          <p>
            <strong>프론트엔드:</strong> {frontendUrl || '로딩 중...'}
          </p>
          <p>
            <strong>백엔드 API:</strong>{' '}
            {process.env.NEXT_PUBLIC_API_BASE_URL ||
              'http://43.202.206.47:8080'}
          </p>
          <p>
            <strong>테스트 환경:</strong> 브라우저 (Chrome/Firefox/Safari)
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-green-50 p-4">
        <h3 className="font-semibold text-green-900">📝 테스트 방법:</h3>
        <ol className="list-inside list-decimal space-y-1 text-sm text-green-800">
          <li>각 테스트 버튼을 클릭하여 개별적으로 실행</li>
          <li>성공 시: ✅ 표시와 함께 응답 데이터 표시</li>
          <li>실패 시: ❌ 표시와 함께 에러 메시지 표시</li>
          <li>모든 테스트가 성공하면 CORS 설정이 올바름</li>
        </ol>
      </div>

      <div className="grid gap-4">
        {tests.map((test) => (
          <Card key={test.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {test.name}
                <Button
                  onClick={() => runTest(test.name, test.function)}
                  disabled={loading[test.name]}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {loading[test.name] ? '테스트 중...' : '테스트 실행'}
                </Button>
              </CardTitle>
              <p className="text-sm text-gray-600">{test.description}</p>
            </CardHeader>
            <CardContent>
              {results[test.name] && (
                <pre className="mt-2 overflow-x-auto rounded bg-gray-100 p-3 text-sm">
                  {results[test.name]}
                </pre>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-purple-50 p-4">
        <h3 className="font-semibold text-purple-900">🔍 테스트 결과 해석:</h3>
        <div className="space-y-2 text-sm text-purple-800">
          <div>
            <strong>✅ 성공:</strong> CORS가 올바르게 설정되어 있음
            <ul className="mt-1 ml-4 space-y-1">
              <li>• 서버가 올바른 CORS 헤더를 반환</li>
              <li>• 프론트엔드에서 백엔드 API 접근 가능</li>
              <li>• 브라우저가 요청을 허용함</li>
            </ul>
          </div>
          <div>
            <strong>❌ 실패:</strong> CORS 설정에 문제가 있음
            <ul className="mt-1 ml-4 space-y-1">
              <li>• 서버의 CORS 헤더 설정 확인 필요</li>
              <li>• Access-Control-Allow-Origin 헤더 누락</li>
              <li>• Access-Control-Allow-Methods 헤더 누락</li>
              <li>• Access-Control-Allow-Headers 헤더 누락</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-red-50 p-4">
        <h3 className="font-semibold text-red-900">
          ⚠️ 백엔드 개발자를 위한 CORS 설정 가이드:
        </h3>
        <div className="space-y-2 text-sm text-red-800">
          <p>
            <strong>필요한 CORS 헤더:</strong>
          </p>
          <ul className="ml-4 space-y-1">
            <li>
              • Access-Control-Allow-Origin:{' '}
              {frontendUrl || 'http://localhost:8031'}
            </li>
            <li>
              • Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
            </li>
            <li>• Access-Control-Allow-Headers: Content-Type, Authorization</li>
            <li>• Access-Control-Allow-Credentials: true (필요시)</li>
          </ul>
          <p className="mt-2">
            <strong>테스트할 API 엔드포인트:</strong>
          </p>
          <ul className="ml-4 space-y-1">
            <li>• GET / (루트 경로)</li>
            <li>• GET /api/v1/lessons (레슨 목록)</li>
            <li>• GET /api/v1/rankings (랭킹)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
