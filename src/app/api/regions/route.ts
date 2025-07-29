import { NextResponse } from 'next/server'
import { loadRegionDataFromCsv } from '@/lib/region-data'

export async function GET() {
  try {
    const regionData = await loadRegionDataFromCsv()

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
