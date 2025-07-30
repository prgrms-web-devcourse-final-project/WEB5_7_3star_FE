const fs = require('fs')
const path = require('path')

// CSV 파일을 파싱하여 regionData 구조로 변환하는 함수
function parseRegionDataFromCsv(csvContent) {
  const lines = csvContent.split('\n')
  const headers = lines[0].split(',')
  const data = {}

  // 헤더를 제외한 데이터 라인들을 처리
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = line.split(',')
    const row = {
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

// CSV 파일 읽기
const csvPath = path.join(
  process.cwd(),
  'figma_export',
  '국토교통부_전국 법정동_20250415_삭제지역 제거.csv',
)
const csvContent = fs.readFileSync(csvPath, 'utf-8')

// 데이터 파싱
const regionData = parseRegionDataFromCsv(csvContent)

// 통계 출력
console.log('파싱 완료:')
console.log('- 시도 수:', Object.keys(regionData).length)
console.log(
  '- 총 시군구 수:',
  Object.values(regionData).reduce(
    (acc, sido) => acc + Object.keys(sido).length,
    0,
  ),
)

// JavaScript 파일로 생성
const jsContent = `// 자동 생성된 지역 데이터
// 생성 시간: ${new Date().toISOString()}
// 원본 파일: ${csvPath}

export const regionData = ${JSON.stringify(regionData, null, 2)}

export interface RegionData {
  [sido: string]: {
    [sigungu: string]: {
      dongs: string[]
      ris: string[]
    }
  }
}

// 시도 목록 가져오기
export function getSidoList(): string[] {
  return Object.keys(regionData)
}

// 특정 시도의 시군구 목록 가져오기
export function getSigunguList(sido: string): string[] {
  return regionData[sido] ? Object.keys(regionData[sido]).sort() : []
}

// 특정 시군구의 동/읍/면 목록 가져오기
export function getDongList(sido: string, sigungu: string): string[] {
  const result = regionData[sido]?.[sigungu]?.dongs || []
  return result.sort()
}

// 특정 시군구의 리 목록 가져오기
export function getRiList(sido: string, sigungu: string): string[] {
  const result = regionData[sido]?.[sigungu]?.ris || []
  return result.sort()
}
`

// 파일 저장
const outputPath = path.join(process.cwd(), 'src/lib/region-data-static.ts')
fs.writeFileSync(outputPath, jsContent, 'utf-8')

console.log('정적 지역 데이터 파일 생성 완료:', outputPath)
console.log(
  '파일 크기:',
  (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2),
  'MB',
)
