'use client'

import { useState, useEffect } from 'react'
import { getLessons } from '@/lib/api/lesson'
import LessonListClient from './lesson-list-client'
import type { components } from '@/types/swagger-generated'
import { OptimizedPagination } from '@/components/ui/pagination'

type LessonSearchResponseDto = components['schemas']['LessonSearchResponseDto']

interface SearchFilters {
  category?: string
  city?: string
  district?: string
  dong?: string
  ri?: string
  search?: string
  page: number
  sortBy?: string
}

interface LessonListClientWrapperProps {
  searchFilters: SearchFilters
}

export default function LessonListClientWrapper({
  searchFilters,
}: LessonListClientWrapperProps) {
  const [lessons, setLessons] = useState<LessonSearchResponseDto[]>([])
  const [totalCount, setTotalCount] = useState(0)
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
            limit: 5,
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

        setLessons(response.lessons)
        setTotalCount(response.count)
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

  // 필수 지역 정보 검증
  const isRegionValid = () => {
    return (
      searchFilters.city &&
      searchFilters.city.length > 0 &&
      searchFilters.district &&
      searchFilters.district.length > 0 &&
      searchFilters.dong &&
      searchFilters.dong.length > 0
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  // 지역 정보가 없을 때 안내 메시지
  if (!isRegionValid()) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 rounded-full bg-blue-100 p-6">
          <svg
            className="h-12 w-12 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          지역을 선택해주세요
        </h3>
        <p className="mb-6 max-w-md text-gray-500">
          레슨을 찾으려면 시/도, 구/군, 동/면을 모두 선택해야 합니다.
          <br />
          왼쪽 필터에서 지역을 선택해주세요.
        </p>
      </div>
    )
  }

  return (
    <>
      <LessonListClient lessons={lessons} />
      <div className="mt-8">
        <OptimizedPagination
          currentPage={searchFilters.page}
          pageSize={5}
          totalCount={totalCount}
          movablePageCount={10}
          onPageChange={(page) => {
            // URL 쿼리스트링 변경 (Next.js 라우터 사용)
            const params = new URLSearchParams(window.location.search)
            params.set('page', page.toString())
            window.location.search = params.toString()
          }}
        />
      </div>
    </>
  )
}
