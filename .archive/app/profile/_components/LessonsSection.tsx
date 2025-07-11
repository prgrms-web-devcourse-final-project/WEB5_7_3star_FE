'use client'

import { BookOpen, Users, MapPin, Calendar } from 'lucide-react'

interface Lesson {
  id: number
  lessonName: string
  maxParticipants: number
  currentParticipants: number
  price: number
  status: 'RECRUITING' | 'CLOSED' | 'READY' | 'COMPLETED'
  startAt: string
  addressDetail: string
}

interface LessonsSectionProps {
  lessons: Lesson[]
}

export default function LessonsSection({ lessons }: LessonsSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RECRUITING':
        return 'bg-blue-100 text-blue-800'
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800'
      case 'READY':
        return 'bg-green-100 text-green-800'
      case 'COMPLETED':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'RECRUITING':
        return '모집 중'
      case 'CLOSED':
        return '마감됨'
      case 'READY':
        return '준비 중'
      case 'COMPLETED':
        return '완료됨'
      default:
        return '알 수 없음'
    }
  }

  return (
    <div className="service-card">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100">
          <BookOpen className="h-4 w-4 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">레슨</h2>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">{lesson.lessonName}</h3>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(lesson.status)}`}
              >
                {getStatusText(lesson.status)}
              </span>
            </div>
            <div className="mb-2 flex items-center gap-4">
              <span className="text-lg font-bold text-gray-900">
                {lesson.price.toLocaleString()}원
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                {lesson.currentParticipants}/{lesson.maxParticipants}명
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {lesson.addressDetail}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {lesson.startAt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
