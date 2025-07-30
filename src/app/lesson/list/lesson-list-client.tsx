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
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 rounded-full bg-gray-100 p-6">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          검색 결과가 없습니다
        </h3>
        <p className="mb-6 max-w-md text-gray-500">
          선택하신 조건에 맞는 레슨을 찾을 수 없습니다.
          <br />
          다른 검색 조건을 시도해보세요.
        </p>
        <div className="flex gap-3">
          <Link
            href="/search"
            className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          >
            검색 조건 변경
          </Link>
          <Link
            href="/lesson/list"
            className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            전체 레슨 보기
          </Link>
        </div>
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
                  <span>{lesson.reviewCount ?? 0}</span>
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
