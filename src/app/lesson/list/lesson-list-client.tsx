'use client'

import { formatPrice, getCategoryText, getLessonStatusText } from '@/lib/utils'
import type { components } from '@/types/swagger-generated'
import { MessageCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
              <div className="h-full w-full rounded-lg bg-gray-100">
                {lesson.lessonImages && lesson.lessonImages[0] ? (
                  <Image
                    src={lesson.lessonImages[0]}
                    alt={lesson.lessonName || ''}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="bg-primary flex h-full w-full items-center justify-center rounded-lg"></div>
                )}
              </div>
            </div>

            {/* 레슨 정보 */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {lesson.lessonName}
                  </h3>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    {getLessonStatusText(lesson.status || '모집중')}
                  </span>
                </div>

                <div className="mb-4 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">카테고리:</span>{' '}
                    {getCategoryText(lesson.category || '')}
                  </p>
                  <p>
                    <span className="font-semibold">위치:</span> {lesson.city}{' '}
                    {lesson.district} {lesson.dong}
                  </p>
                  <p>
                    <span className="font-semibold">가격:</span>{' '}
                    {formatPrice(lesson.price || 0)}
                  </p>
                  <p>
                    <span className="font-semibold">참가자:</span>{' '}
                    {lesson.currentParticipants || 0}/
                    {lesson.maxParticipants || 0}명
                  </p>
                  <p>
                    <span className="font-semibold">시작일:</span>{' '}
                    {lesson.startAt
                      ? new Date(lesson.startAt).toLocaleDateString('ko-KR')
                      : '미정'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 fill-gray-500 text-sm text-gray-500">
                  <MessageCircleIcon className="h-4 w-4 text-gray-500" />{' '}
                  <span>{lesson.reviewCount || 0}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                    href={`/lesson/${lesson.id}`}
                  >
                    상세보기
                  </Link>
                  {/* <Link
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                    href={`/lesson/${lesson.id}/apply`}
                  >
                    신청하기
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
