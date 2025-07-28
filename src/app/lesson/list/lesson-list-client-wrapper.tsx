'use client'

import { useState, useEffect } from 'react'
import { getLessons } from '@/lib/api/lesson'
import LessonListClient from './lesson-list-client'
import type { components } from '@/types/swagger-generated'

type LessonSearchResponseDto = components['schemas']['LessonSearchResponseDto']

interface SearchFilters {
  category: string
  city: string
  district: string
  dong: string
  search: string
  page: number
  limit: number
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
    let isMounted = true

    const fetchLessons = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await getLessons(searchFilters)

        if (!isMounted) return

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
        if (!isMounted) return

        console.error('레슨 목록 조회 실패:', err)
        setError(
          err instanceof Error
            ? err.message
            : '레슨 목록을 불러오는데 실패했습니다.',
        )
        setLessons([])
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchLessons()

    return () => {
      isMounted = false
    }
  }, [searchFilters])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <span>레슨 목록을 불러오는 중...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-red-800">⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          다시 시도
        </button>
      </div>
    )
  }

  return <LessonListClient lessons={lessons} />
}
