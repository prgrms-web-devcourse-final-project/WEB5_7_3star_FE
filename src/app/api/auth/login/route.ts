import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          status: response.status,
          message: data.message || '로그인에 실패했습니다.',
        },
        { status: response.status },
      )
    }

    // 성공 응답 생성
    const nextResponse = NextResponse.json(data)

    // 백엔드에서 설정한 쿠키들을 클라이언트로 전달
    const setCookieHeaders = response.headers.getSetCookie()

    if (setCookieHeaders.length === 0) {
      console.warn('No Set-Cookie headers from backend!')
    }

    setCookieHeaders.forEach((cookie) => {
      // 쿠키 속성 수정 (SameSite와 Domain 추가/수정)
      let modifiedCookie = cookie

      // SameSite가 없으면 추가
      if (!cookie.toLowerCase().includes('samesite=')) {
        modifiedCookie += '; SameSite=Lax'
      }

      // Secure는 개발환경에서 제거 (localhost는 HTTP)
      if (cookie.toLowerCase().includes('secure')) {
        modifiedCookie = modifiedCookie.replace(/;\s*Secure/gi, '')
      }

      nextResponse.headers.append('Set-Cookie', modifiedCookie)
    })

    return nextResponse
  } catch (error) {
    console.error('Login proxy error:', error)
    return NextResponse.json(
      {
        status: 500,
        message: '서버 오류가 발생했습니다.',
      },
      { status: 500 },
    )
  }
}
