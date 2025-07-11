'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'

interface Lesson {
  id: number
  title: string
  date: string
  participants: number
  maxParticipants: number
  status: string
  price: number
  location: string
}

interface LessonListProps {
  lessons: Lesson[]
}

export default function LessonList({ lessons }: LessonListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case '모집중':
        return (
          <Badge
            variant="outline"
            className="border-blue-300 bg-blue-50 text-blue-600"
          >
            모집중
          </Badge>
        )
      case '모집완료':
        return (
          <Badge
            variant="outline"
            className="border-purple-300 bg-purple-50 text-purple-600"
          >
            모집완료
          </Badge>
        )
      case '모집전':
        return (
          <Badge
            variant="outline"
            className="border-gray-300 bg-gray-50 text-gray-600"
          >
            모집전
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleViewDetails = (lessonId: number) => {
    // 상세보기 기능 구현
    console.log('상세보기 클릭:', lessonId)
  }

  const handleApplyLesson = (lessonId: number) => {
    // 신청하기 기능 구현
    console.log('신청하기 클릭:', lessonId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">개설한 레슨</h2>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="border border-gray-200 transition-shadow hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {lesson.title}
                    </h3>
                    {getStatusBadge(lesson.status)}
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <strong>일시:</strong> {lesson.date}
                    </p>
                    <p>
                      <strong>장소:</strong> {lesson.location}
                    </p>
                    <p>
                      <strong>참가자:</strong> {lesson.participants}/
                      {lesson.maxParticipants}명
                    </p>
                    <p>
                      <strong>가격:</strong> {lesson.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(lesson.id)}
                  >
                    상세보기
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                    onClick={() => handleApplyLesson(lesson.id)}
                  >
                    신청하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
