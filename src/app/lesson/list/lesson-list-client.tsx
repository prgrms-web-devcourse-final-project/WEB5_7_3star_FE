'use client'

import type { components } from '@/types/swagger-generated'
import { getLessonStatusText, formatPrice } from '@/lib/utils'

type LessonSearchResponseDto = components['schemas']['LessonSearchResponseDto']

interface LessonListClientProps {
  lessons: LessonSearchResponseDto[]
}

export default function LessonListClient({ lessons }: LessonListClientProps) {
  if (lessons.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        검색 결과가 없습니다.
      </div>
    )
  }

  return (
    <>
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex flex-col gap-4 md:flex-row">
            {/* 레슨 이미지 */}
            <div className="w-full md:w-48">
              <div className="aspect-video w-full rounded-lg bg-gray-200">
                {/* 이미지가 없는 경우 회색 배경으로 처리 */}
              </div>
            </div>

            {/* 레슨 정보 */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {lesson.lessonName}
                  </h3>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                    {getLessonStatusText(lesson.status || '모집중')}
                  </span>
                </div>

                <div className="mb-4 space-y-1 text-sm text-gray-600">
                  <p>
                    <strong>카테고리:</strong> {lesson.category}
                  </p>
                  <p>
                    <strong>위치:</strong> {lesson.city} {lesson.district}{' '}
                    {lesson.dong}
                  </p>
                  <p>
                    <strong>가격:</strong> {formatPrice(lesson.price || 0)}
                  </p>
                  <p>
                    <strong>참가자:</strong> {lesson.currentParticipants || 0}/
                    {lesson.maxParticipants || 0}명
                  </p>
                  <p>
                    <strong>시작일:</strong>{' '}
                    {lesson.startAt
                      ? new Date(lesson.startAt).toLocaleDateString('ko-KR')
                      : '미정'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>💬 {lesson.reviewCount || 0}</span>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                    상세보기
                  </button>
                  <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
                    신청하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
