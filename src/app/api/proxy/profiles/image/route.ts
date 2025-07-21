import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

    console.log('Updating profile image...')

    // FormData를 그대로 백엔드로 전달
    const formData = await request.formData()

    const response = await fetch(`${backendUrl}/api/v1/profiles/image`, {
      method: 'PATCH',
      headers: {
        // Authorization 헤더 전달
        ...Object.fromEntries(request.headers.entries()),
      },
      body: formData,
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
