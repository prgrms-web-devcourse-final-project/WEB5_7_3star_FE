import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const requestUrl = `${API_BASE_URL}/api/v1/users/login`
    console.log('[Debug] 요청 URL:', requestUrl)

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    const setCookieHeaders = response.headers.getSetCookie()

    console.log('[Debug] 백엔드 응답 상태:', response.status)
    console.log(
      '[Debug] 백엔드 응답 헤더:',
      Object.fromEntries(response.headers.entries()),
    )

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      data: data,
      setCookieHeaders: setCookieHeaders,
      allHeaders: Object.fromEntries(response.headers.entries()),
    })
  } catch (error) {
    console.error('Login test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
