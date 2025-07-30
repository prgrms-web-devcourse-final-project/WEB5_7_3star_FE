import { NextResponse } from 'next/server'
import { parseRegionDataFromCsv } from '@/lib/region-data'

export async function GET() {
  console.log('=== 지역 데이터 API 호출 시작 ===')
  console.log('환경:', process.env.NODE_ENV)
  console.log('현재 작업 디렉토리:', process.cwd())

  try {
    let csvContent: string = ''

    if (process.env.NODE_ENV === 'production') {
      console.log('배포 환경에서 CSV 파일 로드 시작')

      // 배포 환경에서는 더 간단한 방법 사용
      let csvUrl = '/regions.csv'

      // 환경 변수가 있으면 사용
      if (process.env.NEXT_PUBLIC_SITE_URL) {
        csvUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/regions.csv`
      } else if (process.env.VERCEL_URL) {
        csvUrl = `https://${process.env.VERCEL_URL}/regions.csv`
      }

      console.log('CSV 파일 URL:', csvUrl)
      console.log('환경 변수:', {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        VERCEL_URL: process.env.VERCEL_URL,
      })

      try {
        console.log('CSV 파일 fetch 시도...')
        const response = await fetch(csvUrl, {
          method: 'GET',
          headers: {
            Accept: 'text/csv,text/plain,*/*',
          },
        })

        console.log('CSV 파일 fetch 응답 상태:', response.status)
        console.log(
          'CSV 파일 fetch 응답 헤더:',
          Object.fromEntries(response.headers.entries()),
        )

        if (response.ok) {
          csvContent = await response.text()
          console.log('CSV 파일 내용 길이:', csvContent.length)

          if (!csvContent || csvContent.trim().length === 0) {
            throw new Error('CSV 파일이 비어있습니다.')
          }

          console.log('CSV 파일 첫 100자:', csvContent.substring(0, 100))
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
      } catch (fetchError) {
        console.error('CSV 파일 fetch 실패:', fetchError)

        // 폴백: 빈 데이터 반환
        return NextResponse.json({
          success: true,
          data: {},
          message: 'CSV 파일을 불러올 수 없어 빈 데이터를 반환합니다.',
          error:
            fetchError instanceof Error
              ? fetchError.message
              : String(fetchError),
        })
      }
    } else {
      console.log('개발 환경에서 CSV 파일 로드 시작')

      // 개발 환경에서는 기존 경로의 CSV 파일을 읽기
      try {
        const fs = await import('fs')
        const path = await import('path')

        const csvPath = path.join(
          process.cwd(),
          'figma_export',
          '국토교통부_전국 법정동_20250415_삭제지역 제거.csv',
        )
        console.log('CSV 파일 경로:', csvPath)

        csvContent = fs.readFileSync(csvPath, 'utf-8')
        console.log('개발 환경 CSV 파일 내용 길이:', csvContent.length)
      } catch (fileError) {
        console.error('개발 환경 CSV 파일 읽기 실패:', fileError)
        throw fileError
      }
    }

    console.log('CSV 파싱 시작...')
    const regionData = parseRegionDataFromCsv(csvContent)
    console.log('파싱된 지역 데이터:', {
      sidoCount: Object.keys(regionData).length,
      totalSigungu: Object.values(regionData).reduce(
        (acc, sido) => acc + Object.keys(sido).length,
        0,
      ),
    })

    console.log('=== 지역 데이터 API 호출 성공 ===')
    return NextResponse.json({
      success: true,
      data: regionData,
    })
  } catch (error) {
    console.error('=== 지역 데이터 로딩 실패 ===')
    console.error('에러 타입:', typeof error)
    console.error(
      '에러 메시지:',
      error instanceof Error ? error.message : String(error),
    )
    console.error(
      '에러 스택:',
      error instanceof Error ? error.stack : '스택 없음',
    )
    console.error('전체 에러 객체:', error)

    return NextResponse.json(
      {
        success: false,
        error: '지역 데이터를 불러오는데 실패했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류',
        errorType: typeof error,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
