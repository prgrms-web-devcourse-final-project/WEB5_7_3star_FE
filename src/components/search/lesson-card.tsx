'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Star,
  MapPin,
  Clock,
  Users,
  Heart,
  Eye,
  MessageCircle,
  Calendar,
  BookOpen,
} from 'lucide-react'

interface LessonCardProps {
  lesson?: {
    id: string
    title: string
    instructor: {
      name: string
      avatar: string
      rating: number
      reviewCount: number
    }
    category: string
    location: string
    price: number
    duration: string
    maxStudents: number
    currentStudents: number
    schedule: string
    tags: string[]
    image: string
    isLiked: boolean
    viewCount: number
    description: string
  }
}

export default function LessonCard({ lesson }: LessonCardProps) {
  // 더미 데이터
  const defaultLesson = {
    id: '1',
    title: '초보자를 위한 요가 레슨',
    instructor: {
      name: '김요가',
      avatar: '/placeholder-user.jpg',
      rating: 4.8,
      reviewCount: 127,
    },
    category: '요가',
    location: '강남구',
    price: 50000,
    duration: '60분',
    maxStudents: 8,
    currentStudents: 6,
    schedule: '월, 수, 금 19:00',
    tags: ['1:1 레슨', '신규 강사'],
    image: '/placeholder.jpg',
    isLiked: false,
    viewCount: 234,
    description:
      '초보자도 쉽게 따라할 수 있는 요가 레슨입니다. 체계적인 커리큘럼으로 단계별로 배워보세요.',
  }

  const lessonData = lesson || defaultLesson

  const handleLike = () => {
    // 클라이언트에서 좋아요 로직 처리
    console.log('좋아요 토글:', lessonData.id)
  }

  const handleView = () => {
    // 클라이언트에서 상세보기 로직 처리
    console.log('레슨 상세보기:', lessonData.id)
  }

  const formatPrice = (price: number) => {
    return price >= 10000
      ? `${(price / 10000).toFixed(0)}만원`
      : `${price.toLocaleString()}원`
  }

  const getProgressPercentage = () => {
    return Math.round(
      (lessonData.currentStudents / lessonData.maxStudents) * 100,
    )
  }

  return (
    <Card className="group cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* 이미지 섹션 */}
          <div className="relative h-48 lg:h-auto lg:w-2/5">
            <img
              src={lessonData.image}
              alt={lessonData.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="border-0 bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] px-3 py-1 text-sm font-medium text-white">
                {lessonData.category}
              </Badge>
              {lessonData.tags?.includes('신규 강사') && (
                <Badge className="border-0 bg-green-500 px-3 py-1 text-sm font-medium text-white">
                  신규
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`absolute top-3 right-3 h-10 w-10 cursor-pointer rounded-full p-0 shadow-sm transition-all duration-200 ${
                lessonData.isLiked
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart
                className={`h-5 w-5 ${lessonData.isLiked ? 'fill-current' : ''}`}
              />
            </Button>
          </div>

          {/* 콘텐츠 섹션 */}
          <div className="flex-1 space-y-4 p-6">
            {/* 헤더 */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="line-clamp-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                  {lessonData.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{lessonData.viewCount}</span>
                </div>
              </div>

              {/* 강사 정보 */}
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-gray-200">
                  <AvatarImage
                    src={lessonData.instructor.avatar}
                    alt={lessonData.instructor.name}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white">
                    {lessonData.instructor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {lessonData.instructor.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {lessonData.instructor.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({lessonData.instructor.reviewCount}리뷰)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 레슨 설명 */}
            <p className="line-clamp-2 text-sm text-gray-600">
              {lessonData.description}
            </p>

            {/* 레슨 정보 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="truncate">{lessonData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-green-600" />
                <span>{lessonData.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="truncate">{lessonData.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-orange-600" />
                <span>
                  {lessonData.currentStudents}/{lessonData.maxStudents}명
                </span>
              </div>
            </div>

            {/* 수강 인원 진행률 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">수강 인원</span>
                <span className="font-medium text-gray-800">
                  {getProgressPercentage()}% 완료
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>

            {/* 태그 */}
            {lessonData.tags && lessonData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {lessonData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-gray-200 px-2 py-1 text-xs text-gray-600 transition-colors hover:border-blue-300 hover:text-blue-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* 하단 액션 */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(lessonData.price)}
                </span>
                <span className="text-sm text-gray-500">/회</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer rounded-lg border-2 border-gray-200 px-4 py-2 transition-colors hover:border-gray-300"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  문의
                </Button>
                <Button
                  onClick={handleView}
                  className="cursor-pointer rounded-lg bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] px-6 py-2 font-semibold text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-md"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  상세보기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
