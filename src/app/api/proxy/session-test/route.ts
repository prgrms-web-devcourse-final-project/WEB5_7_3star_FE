import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing session status...')

    // 쿠키 확인
    const cookies = request.headers.get('cookie')
    console.log('Cookies:', cookies ? 'Present' : 'Missing')
    if (cookies) {
      console.log('Cookie content:', cookies)
    }

    // JSESSIONID 추출
    const jsessionId = cookies?.match(/JSESSIONID=([^;]+)/)?.[1]
    console.log('Extracted JSESSIONID:', jsessionId)

    // 더 많은 세션 확인 엔드포인트 시도
    const sessionEndpoints = [
      '/api/v1/users/me',
      '/api/v1/auth/me',
      '/api/v1/profiles/me',
      '/api/v1/session',
      '/api/v1/users/current',
      '/api/v1/users/profile',
      '/api/v1/auth/status',
      '/api/v1/auth/verify',
      '/api/v1/users/verify',
      '/api/v1/profiles',
      '/api/v1/me',
      '/api/v1/user',
      '/api/v1/current-user',
      '/api/v1/account',
      '/api/v1/status',
    ]

    const results = []

    for (const endpoint of sessionEndpoints) {
      try {
        console.log(`Testing endpoint: ${endpoint}`)

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': request.headers.get('user-agent') || '',
            Accept: request.headers.get('accept') || '*/*',
            ...(jsessionId && { Cookie: `JSESSIONID=${jsessionId}` }),
          },
          credentials: 'include',
        })

        const responseText = await response.text()
        let responseData
        try {
          responseData = JSON.parse(responseText)
        } catch {
          responseData = responseText
        }

        const result = {
          endpoint,
          status: response.status,
          statusText: response.statusText,
          data: responseData,
          headers: Object.fromEntries(response.headers.entries()),
        }

        results.push(result)
        console.log(`${endpoint} - Result:`, result)

        if (response.ok) {
          return NextResponse.json({
            success: true,
            endpoint: endpoint,
            status: response.status,
            data: responseData,
            sessionId: jsessionId,
            allResults: results,
          })
        }
      } catch (error) {
        console.error(`Error testing ${endpoint}:`, error)
        results.push({
          endpoint,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // 모든 엔드포인트가 실패한 경우
    return NextResponse.json(
      {
        success: false,
        message: 'No valid session endpoint found',
        sessionId: jsessionId,
        testedEndpoints: sessionEndpoints,
        allResults: results,
      },
      { status: 404 },
    )
  } catch (error) {
    console.error('Session test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
