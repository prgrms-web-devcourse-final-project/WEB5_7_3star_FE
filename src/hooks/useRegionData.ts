import { useState, useEffect, useCallback } from 'react'
import { RegionData } from '@/lib/region-data'

interface RegionDataResponse {
  success: boolean
  data?: RegionData
  error?: string
  message?: string
  details?: string
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

        console.log('지역 데이터 API 호출 시작...')

        // 배포 환경에서 더 안정적인 fetch 요청
        const response = await fetch('/api/regions', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // 배포 환경에서 타임아웃 설정
          signal: AbortSignal.timeout(30000), // 30초 타임아웃
        })

        console.log('API 응답 상태:', response.status)
        console.log(
          'API 응답 헤더:',
          Object.fromEntries(response.headers.entries()),
        )

        const result: RegionDataResponse = await response.json()
        console.log('API 응답 결과:', result)

        if (result.success && result.data) {
          console.log(
            '지역 데이터 로드 성공:',
            Object.keys(result.data).length,
            '개 시도',
          )
          setRegionData(result.data)
        } else {
          const errorMsg =
            result.error ||
            result.message ||
            '지역 데이터를 불러오는데 실패했습니다.'
          console.error('API 응답 오류:', errorMsg, result.details)
          setError(errorMsg)

          // 빈 데이터라도 설정 (UI가 작동하도록)
          if (result.data) {
            setRegionData(result.data)
          }
        }
      } catch (err) {
        const errorMsg = '지역 데이터를 불러오는데 실패했습니다.'
        console.error('지역 데이터 로딩 오류:', err)
        setError(errorMsg)
      } finally {
        setLoading(false)
      }
    }

    fetchRegionData()
  }, [])

  // 시도 목록 가져오기
  const getSidoList = useCallback(() => {
    const sidoList = Object.keys(regionData)
    console.log('시도 목록:', sidoList.length, '개')
    return sidoList
  }, [regionData])

  // 특정 시도의 시군구 목록 가져오기
  const getSigunguList = useCallback(
    (sido: string) => {
      const sigunguList = regionData[sido]
        ? Object.keys(regionData[sido]).sort()
        : []
      console.log(`${sido}의 시군구 목록:`, sigunguList.length, '개')
      return sigunguList
    },
    [regionData],
  )

  // 특정 시군구의 동/읍/면 목록 가져오기
  const getDongList = useCallback(
    (sido: string, sigungu: string) => {
      const result = regionData[sido]?.[sigungu]?.dongs || []
      console.log(`${sido} ${sigungu}의 동/읍/면 목록:`, result.length, '개')
      return result.sort()
    },
    [regionData],
  )

  // 특정 시군구의 리 목록 가져오기
  const getRiList = useCallback(
    (sido: string, sigungu: string) => {
      const result = regionData[sido]?.[sigungu]?.ris || []
      console.log(`${sido} ${sigungu}의 리 목록:`, result.length, '개')
      return result.sort()
    },
    [regionData],
  )

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/regions', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30000),
      })

      const result: RegionDataResponse = await response.json()

      if (result.success && result.data) {
        setRegionData(result.data)
      } else {
        setError(
          result.error ||
            result.message ||
            '지역 데이터를 불러오는데 실패했습니다.',
        )
      }
    } catch (err) {
      setError('지역 데이터를 불러오는데 실패했습니다.')
      console.error('지역 데이터 로딩 오류:', err)
    } finally {
      setLoading(false)
    }
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
