import { NextResponse } from 'next/server'
import { parseRegionDataFromCsv } from '@/lib/region-data'

export async function GET() {
  try {
    let csvContent: string = ''

    if (process.env.NODE_ENV === 'production') {
      // 배포 환경에서는 public 폴더의 CSV 파일을 fetch로 읽기
      const possibleUrls = []

      // NEXT_PUBLIC_SITE_URL 환경 변수 사용
      if (process.env.NEXT_PUBLIC_SITE_URL) {
        possibleUrls.push(`${process.env.NEXT_PUBLIC_SITE_URL}/regions.csv`)
      }

      // Vercel 환경 (폴백)
      if (process.env.VERCEL_URL) {
        possibleUrls.push(`https://${process.env.VERCEL_URL}/regions.csv`)
      }

      // 상대 경로 시도
      possibleUrls.push('/regions.csv')

      console.log('시도할 URL 목록:', possibleUrls)
      console.log('현재 환경 변수:', {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        VERCEL_URL: process.env.VERCEL_URL,
      })

      let fetchSuccess = false
      let lastError: Error | null = null

      for (const csvUrl of possibleUrls) {
        try {
          console.log(`CSV 파일 fetch 시도: ${csvUrl}`)
          const response = await fetch(csvUrl)
          console.log(
            `CSV 파일 fetch 응답 상태: ${response.status} (${csvUrl})`,
          )

          if (response.ok) {
            csvContent = await response.text()
            console.log('CSV 파일 내용 길이:', csvContent.length)

            if (csvContent && csvContent.trim().length > 0) {
              fetchSuccess = true
              console.log(`CSV 파일 성공적으로 로드됨: ${csvUrl}`)
              break
            } else {
              throw new Error('CSV 파일이 비어있습니다.')
            }
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
        } catch (fetchError) {
          console.error(`CSV 파일 fetch 실패 (${csvUrl}):`, fetchError)
          lastError =
            fetchError instanceof Error
              ? fetchError
              : new Error(String(fetchError))
        }
      }

      if (!fetchSuccess) {
        console.error('모든 URL에서 CSV 파일 로드 실패')

        // 폴백: 빈 데이터 반환
        return NextResponse.json({
          success: true,
          data: {},
          message: 'CSV 파일을 불러올 수 없어 빈 데이터를 반환합니다.',
          error: lastError?.message,
        })
      }
    } else {
      // 개발 환경에서는 기존 경로의 CSV 파일을 읽기
      const fs = await import('fs')
      const path = await import('path')

      const csvPath = path.join(
        process.cwd(),
        'figma_export',
        '국토교통부_전국 법정동_20250415_삭제지역 제거.csv',
      )
      csvContent = fs.readFileSync(csvPath, 'utf-8')
    }

    const regionData = parseRegionDataFromCsv(csvContent)
    console.log('파싱된 지역 데이터:', {
      sidoCount: Object.keys(regionData).length,
      totalSigungu: Object.values(regionData).reduce(
        (acc, sido) => acc + Object.keys(sido).length,
        0,
      ),
    })

    return NextResponse.json({
      success: true,
      data: regionData,
    })
  } catch (error) {
    console.error('지역 데이터 로딩 실패:', error)

    return NextResponse.json(
      {
        success: false,
        error: '지역 데이터를 불러오는데 실패했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 },
    )
  }
}
