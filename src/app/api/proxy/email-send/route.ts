import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(
      'http://43.202.206.47:8080/api/v1/users/verify/email-send',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('프록시 에러:', error)
    return NextResponse.json({ error: '프록시 서버 오류' }, { status: 500 })
  }
}
