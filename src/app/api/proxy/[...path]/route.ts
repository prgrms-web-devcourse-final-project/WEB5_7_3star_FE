import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

// 공통 헤더 설정
const getCommonHeaders = (request: NextRequest) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Authorization 헤더 전달 (Bearer 토큰)
  const authHeader = request.headers.get('authorization')
  if (authHeader) {
    headers['Authorization'] = authHeader
  }

  // 쿠키 전달 (쿠키 기반 인증을 위해)
  const cookieHeader = request.headers.get('cookie')
  if (cookieHeader) {
    headers['Cookie'] = cookieHeader
  }

  // 기타 중요한 헤더들 전달
  const userAgent = request.headers.get('user-agent')
  if (userAgent) {
    headers['User-Agent'] = userAgent
  }

  return headers
}

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

    // 쿼리 파라미터 추가
    const searchParams = request.nextUrl.searchParams
    const queryString = searchParams.toString()
    const url = queryString
      ? `${API_BASE_URL}/${path}?${queryString}`
      : `${API_BASE_URL}/${path}`

    console.log('프록시 GET 요청:', url)
    console.log('요청 헤더:', getCommonHeaders(request))
    console.log('원본 요청 URL:', request.url)
    console.log('요청 메서드:', request.method)
    console.log('쿼리 파라미터:', queryString)

    const response = await fetch(url, {
      method: 'GET',
      headers: getCommonHeaders(request),
    })

    console.log('백엔드 응답 상태:', response.status)
    console.log(
      '백엔드 응답 헤더:',
      Object.fromEntries(response.headers.entries()),
    )

    // 응답 텍스트 읽기
    const responseJSON = await response.json()
    console.log('백엔드 응답 본문:', responseJSON)

    if (!response.ok) {
      console.error('백엔드 응답 에러:', response.status, responseJSON)
      return createErrorResponse(
        `Backend error: ${response.status} - ${responseJSON}`,
        response.status,
      )
    }

    // JSON 파싱 시도
    let data
    try {
      data = responseJSON ? JSON.parse(responseJSON) : {}
    } catch (parseError) {
      console.warn('JSON 파싱 실패, 텍스트로 반환:', responseJSON)
      data = { message: responseJSON }
    }

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

    // body가 있는지 확인하고 파싱
    let body = null
    try {
      body = await request.json()
    } catch (error) {
      // body가 없는 경우 (로그아웃 등)
      console.log('요청에 body가 없습니다.')
    }

    console.log('=== 프록시 POST 요청 디버깅 ===')
    console.log('요청 URL:', url)
    console.log('요청 본문:', body ? JSON.stringify(body, null, 2) : '없음')
    console.log('요청 헤더:', getCommonHeaders(request))
    console.log('원본 요청 URL:', request.url)
    console.log('요청 메서드:', request.method)
    console.log('경로 파라미터:', params.path)
    console.log('API_BASE_URL:', API_BASE_URL)
    console.log('최종 백엔드 URL:', url)
    console.log('================================')

    // 최소한의 헤더만 전달 (문제가 될 수 있는 헤더 제거)
    const minimalHeaders = {
      'Content-Type': 'application/json',
    }

    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: minimalHeaders,
    }

    // body가 있는 경우에만 추가
    if (body) {
      fetchOptions.body = JSON.stringify(body)
    }

    const response = await fetch(url, fetchOptions)

    console.log('=== 백엔드 응답 디버깅 ===')
    console.log('백엔드 응답 상태:', response.status)
    console.log(
      '백엔드 응답 헤더:',
      Object.fromEntries(response.headers.entries()),
    )
    console.log('백엔드 응답 URL:', response.url)
    console.log('백엔드 응답 타입:', response.type)
    console.log('백엔드 응답 리다이렉트:', response.redirected)
    console.log('================================')

    // 응답 텍스트 읽기
    const responseJSON = await response.json()
    console.log('백엔드 응답 본문:', responseJSON)

    if (!response.ok) {
      console.error('백엔드 응답 에러:', response.status, responseJSON)
      return createErrorResponse(
        `Backend error: ${response.status} - ${responseJSON}`,
        response.status,
      )
    }

    // JSON 파싱 시도
    let data
    try {
      data = responseJSON ? JSON.parse(responseJSON) : {}
    } catch (parseError) {
      console.warn('JSON 파싱 실패, 텍스트로 반환:', responseJSON)
      data = { message: responseJSON }
    }

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
      headers: getCommonHeaders(request),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorJSON = await response.json()
      console.error('백엔드 응답 에러:', response.status, errorJSON)
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
      headers: getCommonHeaders(request),
    })

    if (!response.ok) {
      const errorJSON = await response.json()
      console.error('백엔드 응답 에러:', response.status, errorJSON)
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
      headers: getCommonHeaders(request),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorJSON = await response.json()
      console.error('백엔드 응답 에러:', response.status, errorJSON)
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
