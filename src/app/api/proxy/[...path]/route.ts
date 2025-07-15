import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

// 공통 헤더 설정
const getCommonHeaders = () => ({
  'Content-Type': 'application/json',
})

// 에러 응답 생성
const createErrorResponse = (message: string, status: number = 500) => {
  return NextResponse.json(
    {
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status },
  )
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  try {
    const path = params.path.join('/')
    const url = `${API_BASE_URL}/${path}`

    console.log('프록시 GET 요청:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: getCommonHeaders(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('백엔드 응답 에러:', response.status, errorText)
      return createErrorResponse(
        `Backend error: ${response.status}`,
        response.status,
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('프록시 GET 요청 실패:', error)
    return createErrorResponse(
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  try {
    const path = params.path.join('/')
    const url = `${API_BASE_URL}/${path}`
    const body = await request.json()

    console.log('프록시 POST 요청:', url, body)

    const response = await fetch(url, {
      method: 'POST',
      headers: getCommonHeaders(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('백엔드 응답 에러:', response.status, errorText)
      return createErrorResponse(
        `Backend error: ${response.status}`,
        response.status,
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('프록시 POST 요청 실패:', error)
    return createErrorResponse(
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  try {
    const path = params.path.join('/')
    const url = `${API_BASE_URL}/${path}`
    const body = await request.json()

    console.log('프록시 PUT 요청:', url, body)

    const response = await fetch(url, {
      method: 'PUT',
      headers: getCommonHeaders(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('백엔드 응답 에러:', response.status, errorText)
      return createErrorResponse(
        `Backend error: ${response.status}`,
        response.status,
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('프록시 PUT 요청 실패:', error)
    return createErrorResponse(
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  try {
    const path = params.path.join('/')
    const url = `${API_BASE_URL}/${path}`

    console.log('프록시 DELETE 요청:', url)

    const response = await fetch(url, {
      method: 'DELETE',
      headers: getCommonHeaders(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('백엔드 응답 에러:', response.status, errorText)
      return createErrorResponse(
        `Backend error: ${response.status}`,
        response.status,
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('프록시 DELETE 요청 실패:', error)
    return createErrorResponse(
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  try {
    const path = params.path.join('/')
    const url = `${API_BASE_URL}/${path}`
    const body = await request.json()

    console.log('프록시 PATCH 요청:', url, body)

    const response = await fetch(url, {
      method: 'PATCH',
      headers: getCommonHeaders(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('백엔드 응답 에러:', response.status, errorText)
      return createErrorResponse(
        `Backend error: ${response.status}`,
        response.status,
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('프록시 PATCH 요청 실패:', error)
    return createErrorResponse(
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
