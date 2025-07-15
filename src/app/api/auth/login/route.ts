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

    return NextResponse.json(data)
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
