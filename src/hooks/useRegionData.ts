import {
  regionData,
  getSidoList,
  getSigunguList,
  getDongList,
  getRiList,
} from '@/lib/region-data-static'

export function useRegionData() {
  return {
    regionData,
    loading: false, // 정적 데이터이므로 항상 false
    error: null, // 정적 데이터이므로 에러 없음
    getSidoList,
    getSigunguList,
    getDongList,
    getRiList,
    refetch: () => {
      // 정적 데이터이므로 refetch 불필요
      console.log('정적 데이터는 refetch가 필요하지 않습니다.')
    },
  }
}
