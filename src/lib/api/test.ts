import { apiClient } from './api-client'

/**
 * 서버 연결 상태 확인 (가장 기본적인 테스트)
 */
export async function testServerConnection(): Promise<{ status: string }> {
  try {
    // 기본 루트 경로로 테스트
    const response = await apiClient.get<{ status: string }>('/')
    console.log('서버 연결 성공:', response)
    return response
  } catch (error) {
    console.error('서버 연결 실패:', error)
    throw error
  }
}

/**
 * API 서버 주소 확인
 */
export function getApiServerUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.202.206.47:8080'
}

/**
 * 브라우저에서 직접 fetch로 테스트 (프록시 우회)
 */
export async function testDirectFetch(): Promise<{ status: string }> {
  try {
    // 프록시를 통한 직접 fetch 테스트 (필수 파라미터 포함)
    const response = await fetch(
      '/api/proxy/api/v1/lessons?category=ALL&city=서울특별시&district=강남구&dong=역삼동&page=1&limit=5',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('직접 fetch 테스트 성공:', data)
    return data
  } catch (error) {
    console.error('직접 fetch 테스트 실패:', error)
    throw error
  }
}

/**
 * 간단한 루트 경로 테스트
 */
export async function testRootPath(): Promise<unknown> {
  try {
    const response = await apiClient.get('/')
    console.log('루트 경로 테스트 성공:', response)
    return response
  } catch (error) {
    console.error('루트 경로 테스트 실패:', error)
    throw error
  }
}

/**
 * 레슨 목록 API 테스트 (실제 존재하는 API)
 */
export async function testLessonsApi(): Promise<unknown> {
  try {
    // 필수 파라미터 포함하여 요청
    const response = await apiClient.get(
      '/api/v1/lessons?category=ALL&city=서울특별시&district=강남구&dong=역삼동&page=1&limit=5',
    )
    console.log('레슨 API 테스트 성공:', response)
    return response
  } catch (error) {
    console.error('레슨 API 테스트 실패:', error)
    throw error
  }
}

/**
 * 랭킹 API 테스트 (실제 존재하는 API)
 */
export async function testRankingsApi(): Promise<unknown> {
  try {
    const response = await apiClient.get('/api/v1/rankings')
    console.log('랭킹 API 테스트 성공:', response)
    return response
  } catch (error) {
    console.error('랭킹 API 테스트 실패:', error)
    throw error
  }
}
