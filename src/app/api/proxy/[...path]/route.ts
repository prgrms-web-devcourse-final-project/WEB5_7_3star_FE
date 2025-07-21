import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'
)
  .replace(/\/api\/proxy$/, '')
  .replace(/\/+$/, '')

// 공통 헤더 설정 (스웨거와 동일하게)
const getCommonHeaders = (request: NextRequest, hasBody: boolean = false) => {
  const headers: Record<string, string> = {
    accept: '*/*', // 스웨거와 동일한 Accept 헤더
  }

  // Content-Type은 POST/PUT/PATCH 등 body가 있을 때만 추가
  // GET 요청에는 Content-Type을 보내지 않음 (백엔드에서 400 에러 발생)
  if (hasBody) {
    headers['Content-Type'] = 'application/json'
  }

  // Authorization 헤더 전달 (Bearer 토큰)
  const authHeader = request.headers.get('authorization')
  if (authHeader) {
    headers['Authorization'] = authHeader
  }

  // 쿠키 전달 (쿠키 기반 인증을 위해, Supabase 관련 쿠키는 제거)
  const cookieHeader = request.headers.get('cookie')
  if (cookieHeader) {
    const filteredCookie = cookieHeader
      .split(';')
      .map((c) => c.trim())
      .filter((c) => !c.startsWith('sb-'))
      .join(';')

    if (filteredCookie) {
      headers['Cookie'] = filteredCookie
    } else {
      console.log('Supabase 관련 쿠키만 존재, 제거됨')
    }
  } else {
    console.log('쿠키 없음')
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

// 백엔드 응답 처리 (수정됨)
const handleBackendResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type')
  const responseText = await response.text()

  console.log('=== 백엔드 응답 상세 분석 ===')
  console.log('상태:', response.status)
  console.log('Status Text:', response.statusText)
  console.log('Content-Type:', contentType)
  console.log('응답 길이:', responseText.length)
  console.log('응답 내용 (처음 1000자):', responseText.substring(0, 1000))
  console.log(
    '응답 내용 (마지막 200자):',
    responseText.substring(Math.max(0, responseText.length - 200)),
  )
  console.log('모든 헤더:', Object.fromEntries(response.headers.entries()))
  console.log('================================')

  // 빈 응답 처리
  if (!responseText || responseText.trim() === '') {
    console.log('빈 응답 처리')
    return NextResponse.json(
      {
        message: 'Empty response',
        status: response.status,
      },
      { status: response.status },
    )
  }

  // HTML 응답인 경우 (에러 페이지)
  if (
    contentType?.includes('text/html') ||
    responseText.includes('<!doctype html>') ||
    responseText.includes('<html')
  ) {
    console.log('HTML 응답 감지 및 처리')

    // HTML에서 에러 정보 추출 시도
    let errorMessage = `HTTP ${response.status} - ${response.statusText}`
    let errorTitle = ''

    // HTML에서 title 태그 추출
    const titleMatch = responseText.match(/<title>(.*?)<\/title>/i)
    if (titleMatch) {
      errorTitle = titleMatch[1]
      console.log('추출된 title:', errorTitle)
    }

    // h1 태그에서 에러 제목 추출
    const h1Match = responseText.match(/<h1>(.*?)<\/h1>/i)
    if (h1Match) {
      errorTitle = h1Match[1]
      console.log('추출된 h1:', errorTitle)
    }

    // 에러 메시지 개선
    if (response.status === 400) {
      errorMessage = '잘못된 요청입니다. 인증 정보를 확인해주세요.'
    } else if (response.status === 401) {
      errorMessage = '인증이 필요합니다. 로그인해주세요.'
    } else if (response.status === 403) {
      errorMessage = '접근 권한이 없습니다.'
    } else if (response.status === 404) {
      errorMessage = '요청한 리소스를 찾을 수 없습니다.'
    } else if (response.status >= 500) {
      errorMessage = '서버 오류가 발생했습니다.'
    }

    console.log('HTML 에러 응답 반환:', { errorMessage, errorTitle })
    return NextResponse.json(
      {
        error: 'Backend returned HTML error page',
        message: errorMessage,
        status: response.status,
        statusText: response.statusText,
        title: errorTitle,
        contentType: contentType,
      },
      { status: response.status },
    )
  }

  // JSON 응답 처리
  if (
    contentType?.includes('application/json') ||
    responseText.trim().startsWith('{') ||
    responseText.trim().startsWith('[')
  ) {
    console.log('JSON 응답 감지 및 처리')
    try {
      const data = JSON.parse(responseText)
      console.log('파싱된 JSON 데이터:', data)
      return NextResponse.json(data, { status: response.status })
    } catch (parseError) {
      console.warn('JSON 파싱 실패:', parseError)
      console.log('파싱 실패한 텍스트:', responseText)

      // JSON 파싱 실패 시 원본 텍스트 반환
      return NextResponse.json(
        {
          error: 'JSON 파싱 실패',
          message: '응답을 JSON으로 파싱할 수 없습니다.',
          raw_response: responseText,
          parse_error:
            parseError instanceof Error
              ? parseError.message
              : 'Unknown parse error',
        },
        { status: response.status },
      )
    }
  }

  // 일반 텍스트 응답 처리
  console.log('일반 텍스트 응답 처리')
  return NextResponse.json(
    {
      message: responseText,
      raw_response: responseText,
      contentType: contentType,
      status: response.status,
    },
    { status: response.status },
  )
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const resolvedParams = await params
    const path = resolvedParams.path.join('/')

    // 쿼리 파라미터 추가
    const searchParams = request.nextUrl.searchParams
    const queryString = searchParams.toString()
    const urlBase = [API_BASE_URL, path].join('/').replace(/([^:]\/)\/+/g, '$1')
    const url = queryString ? `${urlBase}?${queryString}` : urlBase

    console.log('=== GET 요청 디버깅 ===')
    console.log('요청 URL:', url)
    console.log('경로:', path)
    console.log('쿼리:', queryString)
    console.log('헤더:', getCommonHeaders(request))
    console.log('=====================')

    const response = await fetch(url, {
      method: 'GET',
      headers: getCommonHeaders(request),
    })

    console.log('fetch 완료, 응답 상태:', response.status)
    return await handleBackendResponse(response)
  } catch (error) {
    console.error('프록시 GET 요청 실패:', error)
    return createErrorResponse(
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const resolvedParams = await params
    const path = resolvedParams.path.join('/')
    const url = [API_BASE_URL, path].join('/').replace(/([^:]\/)\/+/g, '$1')

    // body 처리
    let body = null
    let hasBody = false

    try {
      const requestBody = await request.json()
      if (requestBody && Object.keys(requestBody).length > 0) {
        body = JSON.stringify(requestBody)
        hasBody = true
      }
    } catch (error) {
      console.log('POST 요청에 body가 없거나 JSON이 아닙니다.')
    }

    console.log('=== POST 요청 디버깅 ===')
    console.log('요청 URL:', url)
    console.log('경로:', path)
    console.log('Body 있음:', hasBody)
    console.log('Body 내용:', body)
    console.log('헤더:', getCommonHeaders(request, hasBody))
    console.log('=======================')

    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: getCommonHeaders(request, hasBody),
    }

    if (hasBody && body) {
      fetchOptions.body = body
    }

    const response = await fetch(url, fetchOptions)
    return await handleBackendResponse(response)
  } catch (error) {
    console.error('프록시 POST 요청 실패:', error)
    return createErrorResponse(
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const resolvedParams = await params
    const path = resolvedParams.path.join('/')
    const url = [API_BASE_URL, path].join('/').replace(/([^:]\/)\/+/g, '$1')

    let body = null
    let hasBody = false

    try {
      const requestBody = await request.json()
      if (requestBody && Object.keys(requestBody).length > 0) {
        body = JSON.stringify(requestBody)
        hasBody = true
      }
    } catch (error) {
      console.log('PUT 요청에 body가 없거나 JSON이 아닙니다.')
    }

    console.log('=== PUT 요청 디버깅 ===')
    console.log('요청 URL:', url)
    console.log('Body 있음:', hasBody)
    console.log('Body 내용:', body)
    console.log('======================')

    const fetchOptions: RequestInit = {
      method: 'PUT',
      headers: getCommonHeaders(request, hasBody),
    }

    if (hasBody && body) {
      fetchOptions.body = body
    }

    const response = await fetch(url, fetchOptions)
    return await handleBackendResponse(response)
  } catch (error) {
    console.error('프록시 PUT 요청 실패:', error)
    return createErrorResponse(
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const resolvedParams = await params
    const path = resolvedParams.path.join('/')
    const url = [API_BASE_URL, path].join('/').replace(/([^:]\/)\/+/g, '$1')

    console.log('=== DELETE 요청 디버깅 ===')
    console.log('요청 URL:', url)
    console.log('경로:', path)
    console.log('========================')

    const response = await fetch(url, {
      method: 'DELETE',
      headers: getCommonHeaders(request),
    })

    return await handleBackendResponse(response)
  } catch (error) {
    console.error('프록시 DELETE 요청 실패:', error)
    return createErrorResponse(
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const resolvedParams = await params
    const path = resolvedParams.path.join('/')
    const url = [API_BASE_URL, path].join('/').replace(/([^:]\/)\/+/g, '$1')

    let body = null
    let hasBody = false

    try {
      const requestBody = await request.json()
      if (requestBody && Object.keys(requestBody).length > 0) {
        body = JSON.stringify(requestBody)
        hasBody = true
      }
    } catch (error) {
      console.log('PATCH 요청에 body가 없거나 JSON이 아닙니다.')
    }

    console.log('=== PATCH 요청 디버깅 ===')
    console.log('요청 URL:', url)
    console.log('Body 있음:', hasBody)
    console.log('Body 내용:', body)
    console.log('========================')

    const fetchOptions: RequestInit = {
      method: 'PATCH',
      headers: getCommonHeaders(request, hasBody),
    }

    if (hasBody && body) {
      fetchOptions.body = body
    }

    const response = await fetch(url, fetchOptions)
    return await handleBackendResponse(response)
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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}
