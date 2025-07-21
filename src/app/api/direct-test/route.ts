import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

export async function GET(request: NextRequest) {
  try {
    console.log('=== 스웨거와 동일한 방식으로 백엔드 API 테스트 ===')

    // 쿠키 확인
    const cookieHeader = request.headers.get('cookie')
    console.log('받은 쿠키:', cookieHeader)

    // 스웨거와 정확히 동일한 방식으로 호출
    const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
      method: 'GET',
      headers: {
        accept: '*/*', // 스웨거와 동일
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    })

    console.log('백엔드 응답 상태:', response.status, response.statusText)
    console.log(
      '백엔드 응답 헤더:',
      Object.fromEntries(response.headers.entries()),
    )

    const responseText = await response.text()
    console.log('백엔드 응답 내용:', responseText)

    let data
    try {
      data = JSON.parse(responseText)
    } catch (error) {
      data = { raw_response: responseText }
    }

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: data,
      direct_call: true,
    })
  } catch (error) {
    console.error('직접 API 호출 에러:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        direct_call: true,
      },
      { status: 500 },
    )
  }
}
