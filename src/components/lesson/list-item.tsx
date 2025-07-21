'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, MapPin, Users, Heart, Calendar } from 'lucide-react'
import Link from 'next/link'

interface LessonItemProps {
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
  }
}

export default function ListItem({ lesson }: LessonItemProps) {
  // 더미 데이터
  const defaultLesson = {
    id: '1',
    title: '초보자를 위한 수영 레슨 - 기초부터 차근차근',
    instructor: {
      name: '김수영',
      avatar: '',
      rating: 4.8,
      reviewCount: 24,
    },
    category: '수영',
    location: '서울특별시 강남구 역삼동',
    price: 120000,
    duration: '60분',
    maxStudents: 10,
    currentStudents: 6,
    schedule: '매주 화, 목 19:00-20:00',
    tags: ['1:1 레슨', '신규 강사'],
    image: '/placeholder.jpg',
    isLiked: false,
    viewCount: 234,
  }

  const lessonData = lesson || defaultLesson

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // 클라이언트에서 좋아요 로직 처리
    console.log('좋아요 토글:', lessonData.id)
  }

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // 클라이언트에서 참여하기 로직 처리
    console.log('레슨 참여:', lessonData.id)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString()
  }

  const getSpotsLeft = () => {
    return lessonData.maxStudents - lessonData.currentStudents
  }

  return (
    <Link href={`/lesson/${lessonData.id}`} className="block">
      <div className="group relative flex overflow-hidden rounded-2xl bg-white/90 shadow-lg backdrop-blur-md transition-all duration-200 hover:shadow-xl">
        {/* 이미지 */}
        <div className="relative h-40 w-56 flex-shrink-0 bg-gray-100">
          <img
            src={lessonData.image}
            alt={lessonData.title}
            className="h-full w-full object-cover"
          />
          {/* 카테고리 뱃지 */}
          <div className="absolute top-3 left-3 z-10">
            <Badge className="border-0 bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] px-4 py-1 text-xs font-semibold text-[#6B73FF] shadow">
              {lessonData.category}
            </Badge>
          </div>
        </div>
        {/* 정보 */}
        <div className="flex flex-1 flex-col justify-between gap-2 p-6">
          <div>
            <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900">
              {lessonData.title}
            </h3>
            <div className="mb-2 flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={lessonData.instructor.avatar}
                  alt={lessonData.instructor.name}
                />
                <AvatarFallback className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] font-bold text-white">
                  {lessonData.instructor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-800">
                {lessonData.instructor.name}
              </span>
              <span className="ml-2 flex items-center gap-1 text-xs text-gray-500">
                <Star className="h-3 w-3 fill-current text-yellow-400" />
                {lessonData.instructor.rating} (
                {lessonData.instructor.reviewCount})
              </span>
            </div>
            <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="h-4 w-4 text-[#6B73FF]" />
              {lessonData.location}
            </div>
            <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-4 w-4 text-[#6B73FF]" />
              {lessonData.schedule}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Users className="h-4 w-4 text-[#6B73FF]" />
              {lessonData.currentStudents}/{lessonData.maxStudents}명 참여
              <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                {getSpotsLeft()}자리 남음
              </span>
            </div>
          </div>
        </div>
        {/* 금액/참여 */}
        <div className="flex w-40 min-w-[120px] flex-col items-end justify-between p-6">
          <button
            onClick={handleLike}
            className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow transition-all duration-200 hover:scale-110 ${lessonData.isLiked ? 'text-red-500' : 'text-gray-400'}`}
          >
            <Heart
              className={`h-5 w-5 ${lessonData.isLiked ? 'fill-current' : ''}`}
            />
          </button>
          <div className="text-right">
            <div className="mb-1 bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] bg-clip-text text-xl font-bold text-transparent">
              {formatPrice(lessonData.price)}원
            </div>
            <div className="mb-3 text-xs text-gray-400">총 금액</div>
            <Button
              onClick={handleJoin}
              className="border-0 bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] px-6 py-2 text-sm font-semibold text-white shadow hover:shadow-lg"
            >
              참여하기
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
