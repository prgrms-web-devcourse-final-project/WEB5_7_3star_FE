import { useState, useEffect, useCallback } from 'react'
import { RegionData } from '@/lib/region-data'

interface RegionDataResponse {
  success: boolean
  data?: RegionData
  error?: string
}

export function useRegionData() {
  const [regionData, setRegionData] = useState<RegionData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/regions')
        const result: RegionDataResponse = await response.json()

        if (result.success && result.data) {
          setRegionData(result.data)
        } else {
          setError(result.error || '지역 데이터를 불러오는데 실패했습니다.')
        }
      } catch (err) {
        setError('지역 데이터를 불러오는데 실패했습니다.')
        console.error('지역 데이터 로딩 오류:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRegionData()
  }, [])

  // 시도 목록 가져오기
  const getSidoList = useCallback(() => {
    return Object.keys(regionData)
  }, [regionData])

  // 특정 시도의 시군구 목록 가져오기
  const getSigunguList = useCallback(
    (sido: string) => {
      return regionData[sido] ? Object.keys(regionData[sido]).sort() : []
    },
    [regionData],
  )

  // 특정 시군구의 동/읍/면 목록 가져오기
  const getDongList = useCallback(
    (sido: string, sigungu: string) => {
      const result = regionData[sido]?.[sigungu]?.dongs || []
      return result.sort()
    },
    [regionData],
  )

  // 특정 시군구의 리 목록 가져오기
  const getRiList = useCallback(
    (sido: string, sigungu: string) => {
      const result = regionData[sido]?.[sigungu]?.ris || []
      return result.sort()
    },
    [regionData],
  )

  const refetch = useCallback(() => {
    setLoading(true)
    setError(null)
    fetch('/api/regions')
      .then((response) => response.json())
      .then((result: RegionDataResponse) => {
        if (result.success && result.data) {
          setRegionData(result.data)
        } else {
          setError(result.error || '지역 데이터를 불러오는데 실패했습니다.')
        }
      })
      .catch((err) => {
        setError('지역 데이터를 불러오는데 실패했습니다.')
        console.error('지역 데이터 로딩 오류:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    regionData,
    loading,
    error,
    getSidoList,
    getSigunguList,
    getDongList,
    getRiList,
    refetch,
  }
}
