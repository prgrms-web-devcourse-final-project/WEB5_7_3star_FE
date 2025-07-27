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

  // 쿠키 전달 (모든 관련 쿠키 포함)
  const cookieHeader = request.headers.get('cookie')
  console.log('받은 쿠키 헤더:', cookieHeader)

  if (cookieHeader) {
    // JSESSIONID, _ga 등 백엔드 관련 쿠키만 필터링
    const relevantCookies = cookieHeader
      .split(';')
      .map((c) => c.trim())
      // .filter(
      //   (c) =>
      //     c.startsWith('JSESSIONID=') ||
      //     c.startsWith('_ga=') ||
      //     c.startsWith('__next_hmr_refresh_hash__='),
      // )
      .join('; ')

    if (relevantCookies) {
      headers['Cookie'] = relevantCookies
      console.log('전달할 쿠키:', relevantCookies)
    } else {
      console.log('관련 쿠키 없음')
    }
  } else {
    console.log('쿠키 헤더 없음')
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

  // Set-Cookie 헤더 상세 분석
  const setCookieHeaders = response.headers.getSetCookie()
  if (setCookieHeaders && setCookieHeaders.length > 0) {
    console.log('🍪 Set-Cookie 헤더 상세 분석:')
    setCookieHeaders.forEach((cookie, index) => {
      console.log(`쿠키 ${index + 1}:`, cookie)

      // 쿠키 속성 파싱
      const parts = cookie.split(';').map((part) => part.trim())
      const cookieName = parts[0].split('=')[0]
      console.log(`  이름: ${cookieName}`)

      parts.slice(1).forEach((part) => {
        if (part.toLowerCase().startsWith('domain=')) {
          console.log(`  Domain: ${part.split('=')[1]}`)
        } else if (part.toLowerCase().startsWith('path=')) {
          console.log(`  Path: ${part.split('=')[1]}`)
        } else if (part.toLowerCase().startsWith('samesite=')) {
          console.log(`  SameSite: ${part.split('=')[1]}`)
        } else if (part.toLowerCase() === 'httponly') {
          console.log(`  HttpOnly: true`)
        } else if (part.toLowerCase() === 'secure') {
          console.log(`  Secure: true`)
        }
      })
    })
  }

  console.log('모든 헤더:', Object.fromEntries(response.headers.entries()))
  console.log('================================')

  // 204 No Content 응답 처리
  if (response.status === 204) {
    console.log('204 No Content 응답 처리')
    return new NextResponse(null, { status: 204 })
  }

  // 빈 응답 처리 (204가 아닌 경우)
  if (!responseText || responseText.trim() === '') {
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

      // Set-Cookie 헤더가 있으면 클라이언트에 전달
      const responseHeaders = new Headers()
      const setCookieHeaders = response.headers.getSetCookie()
      if (setCookieHeaders && setCookieHeaders.length > 0) {
        setCookieHeaders.forEach((cookie) => {
          console.log('프록시 - Original cookie:', cookie)

          // 쿠키 속성 수정
          let modifiedCookie = cookie

          // SameSite가 없으면 추가
          if (!cookie.toLowerCase().includes('samesite=')) {
            modifiedCookie += '; SameSite=Lax'
          }

          // Secure는 개발환경에서 제거
          if (cookie.toLowerCase().includes('secure')) {
            modifiedCookie = modifiedCookie.replace(/;\s*Secure/gi, '')
          }

          console.log('프록시 - Modified cookie:', modifiedCookie)
          responseHeaders.append('Set-Cookie', modifiedCookie)
        })
        console.log('Set-Cookie 헤더를 클라이언트에 전달:', setCookieHeaders)
      }

      return NextResponse.json(data, {
        status: response.status,
        headers: responseHeaders,
      })
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
  console.log('🔧 PATCH 요청 시작!')
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
    console.log('원본 쿠키 헤더:', request.headers.get('cookie'))
    console.log('전달될 헤더:', getCommonHeaders(request, hasBody))
    console.log('========================')

    const headers = getCommonHeaders(request, hasBody)
    console.log('🔧 PATCH 최종 헤더:', headers)

    const fetchOptions: RequestInit = {
      method: 'PATCH',
      headers: headers,
    }

    if (hasBody && body) {
      fetchOptions.body = body
    }

    console.log('🔧 PATCH fetch 옵션:', fetchOptions)
    const response = await fetch(url, fetchOptions)
    console.log('🔧 PATCH 응답 상태:', response.status)
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
