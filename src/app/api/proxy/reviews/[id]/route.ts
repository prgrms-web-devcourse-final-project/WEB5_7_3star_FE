import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

    console.log(`Creating review for lesson: ${id}`)

    const body = await request.json()

    const response = await fetch(`${backendUrl}/api/v1/reviews/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers.entries()),
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Proxy error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      cause: error instanceof Error ? error.cause : undefined,
      stack: error instanceof Error ? error.stack : undefined,
    })

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

    console.log(
      `Fetching reviews for user ${id} from ${backendUrl}/api/v1/reviews/${id}`,
    )

    const response = await fetch(`${backendUrl}/api/v1/reviews/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers.entries()),
      },
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Proxy error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      cause: error instanceof Error ? error.cause : undefined,
      stack: error instanceof Error ? error.stack : undefined,
    })

    // 백엔드 연결 실패 시 더 구체적인 에러 메시지
    if (
      error instanceof Error &&
      error.cause &&
      typeof error.cause === 'object' &&
      'code' in error.cause
    ) {
      const cause = error.cause as { code: string }
      if (cause.code === 'ECONNREFUSED') {
        return NextResponse.json(
          {
            error:
              '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.',
            details: 'ECONNREFUSED - Backend server is not running',
          },
          { status: 503 },
        )
      }
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
