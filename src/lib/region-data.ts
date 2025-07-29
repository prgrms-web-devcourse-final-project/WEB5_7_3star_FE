// CSV 파일에서 파싱된 지역 데이터 타입
export interface RegionData {
  [sido: string]: {
    [sigungu: string]: {
      dongs: string[]
      ris: string[]
    }
  }
}

// CSV 행 데이터 타입
interface CsvRow {
  법정동코드: string
  시도명: string
  시군구명: string
  읍면동명: string
  리명: string
  순위: string
  생성일자: string
  삭제일자: string
  과거법정동코드: string
}

// CSV 파일을 파싱하여 regionData 구조로 변환하는 함수
export function parseRegionDataFromCsv(csvContent: string): RegionData {
  const lines = csvContent.split('\n')
  const headers = lines[0].split(',')
  const data: RegionData = {}

  // 헤더를 제외한 데이터 라인들을 처리
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = line.split(',')
    const row: CsvRow = {
      법정동코드: values[0] || '',
      시도명: values[1] || '',
      시군구명: values[2] || '',
      읍면동명: values[3] || '',
      리명: values[4] || '',
      순위: values[5] || '',
      생성일자: values[6] || '',
      삭제일자: values[7] || '',
      과거법정동코드: values[8] || '',
    }

    // 삭제된 지역은 제외
    if (row.삭제일자) continue

    const sido = row.시도명
    const sigungu = row.시군구명
    const dong = row.읍면동명
    const ri = row.리명

    if (!sido || !sigungu || !dong) continue

    // 시도가 없으면 생성
    if (!data[sido]) {
      data[sido] = {}
    }

    // 시군구가 없으면 생성
    if (!data[sido][sigungu]) {
      data[sido][sigungu] = { dongs: [], ris: [] }
    }

    // 동이 중복되지 않도록 추가
    if (!data[sido][sigungu].dongs.includes(dong)) {
      data[sido][sigungu].dongs.push(dong)
    }

    // 리가 있고 중복되지 않도록 추가
    if (ri && !data[sido][sigungu].ris.includes(ri)) {
      data[sido][sigungu].ris.push(ri)
    }
  }

  return data
}

// CSV 파일을 읽어서 regionData를 생성하는 함수 (서버 사이드에서 사용)
export async function loadRegionDataFromCsv(): Promise<RegionData> {
  try {
    const fs = await import('fs')
    const path = await import('path')

    const csvPath = path.join(
      process.cwd(),
      'figma_export',
      '국토교통부_전국 법정동_20250415_삭제지역 제거.csv',
    )
    const csvContent = fs.readFileSync(csvPath, 'utf-8')

    return parseRegionDataFromCsv(csvContent)
  } catch (error) {
    console.error('CSV 파일 로딩 실패:', error)
    // CSV 로딩 실패시 빈 객체 반환
    return {}
  }
}

// 클라이언트 사이드에서 사용할 수 있는 regionData
// 서버 사이드에서는 loadRegionDataFromCsv()를 사용하고,
// 클라이언트 사이드에서는 빈 객체로 시작하여 필요시 API를 통해 로드
export const regionData: RegionData = {}
