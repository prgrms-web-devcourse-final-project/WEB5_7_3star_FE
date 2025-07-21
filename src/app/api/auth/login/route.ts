import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Login request body:', body)
    console.log('[Debug] 요청 시 전달된 쿠키:', request.headers.get('cookie'))

    const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: '', // remove all browser cookies to avoid Supabase 400 error
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    console.log('Backend login response:', {
      status: response.status,
      statusText: response.statusText,
      data: data,
    })

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
    console.log('Backend Set-Cookie headers:', setCookieHeaders)
    console.log(
      'All response headers:',
      Object.fromEntries(response.headers.entries()),
    )

    if (setCookieHeaders.length === 0) {
      console.warn('No Set-Cookie headers from backend!')
    }

    setCookieHeaders.forEach((cookie) => {
      console.log('Setting cookie:', cookie)
      nextResponse.headers.append('Set-Cookie', cookie)
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
