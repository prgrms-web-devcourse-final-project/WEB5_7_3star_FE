import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'

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
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('프록시 GET 요청 실패:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
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

    console.log('프록시 POST 요청:', url)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('프록시 POST 요청 실패:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
