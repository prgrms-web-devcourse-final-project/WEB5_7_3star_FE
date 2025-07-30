import { NextResponse } from 'next/server'
import { parseRegionDataFromCsv } from '@/lib/region-data'

export async function GET() {
  try {
    let csvContent: string

    if (process.env.NODE_ENV === 'production') {
      // 배포 환경에서는 public 폴더의 CSV 파일을 fetch로 읽기
      let baseUrl = 'http://localhost:8031'

      // NEXT_PUBLIC_SITE_URL 환경 변수 사용
      if (process.env.NEXT_PUBLIC_SITE_URL) {
        baseUrl = process.env.NEXT_PUBLIC_SITE_URL
      }
      const csvUrl = `${baseUrl}/regions.csv`
      console.log('배포 환경에서 CSV 파일 URL:', csvUrl)

      const response = await fetch(csvUrl)

      if (!response.ok) {
        throw new Error(
          `CSV 파일을 불러올 수 없습니다: ${response.status} - ${csvUrl}`,
        )
      }

      csvContent = await response.text()
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
      },
      { status: 500 },
    )
  }
}
