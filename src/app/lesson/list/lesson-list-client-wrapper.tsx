'use client'

import { useState, useEffect } from 'react'
import { getLessons } from '@/lib/api/lesson'
import LessonListClient from './lesson-list-client'
import type { components } from '@/types/swagger-generated'

type LessonSearchResponseDto = components['schemas']['LessonSearchResponseDto']

interface SearchFilters {
  category?: string
  city?: string
  district?: string
  dong?: string
  ri?: string
  search?: string
  page: number
  limit: number
  sortBy?: string
}

interface LessonListClientWrapperProps {
  searchFilters: SearchFilters
}

export default function LessonListClientWrapper({
  searchFilters,
}: LessonListClientWrapperProps) {
  const [lessons, setLessons] = useState<LessonSearchResponseDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true)
        setError(null)

        // 카테고리가 'all'인 경우 undefined로 처리
        const apiFilters = {
          pageRequestDto: {
            page: searchFilters.page,
            limit: searchFilters.limit,
          },
          category:
            searchFilters.category === 'all'
              ? undefined
              : (searchFilters.category as any),
          city: searchFilters.city,
          district: searchFilters.district,
          dong: searchFilters.dong,
          ri: searchFilters.ri,
          search: searchFilters.search,
          sortBy: (searchFilters.sortBy as any) || 'LATEST',
        }

        const response = await getLessons(apiFilters as any)

        // 응답 데이터 구조에 따라 조정
        if (response && response.lessons) {
          setLessons(response.lessons)
        } else if (Array.isArray(response)) {
          setLessons(response)
        } else {
          console.warn('예상치 못한 응답 구조:', response)
          setLessons([])
        }
      } catch (err) {
        console.error('레슨 목록 조회 실패:', err)
        setError('레슨 목록을 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [searchFilters])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">레슨 목록을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return <LessonListClient lessons={lessons} />
}
