'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, User, Star, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'

interface Lesson {
  id: number
  title: string
  trainer: string
  category: string
  location: string
  price: number
  rating: number
  reviewCount: number
  image: string
  description: string
  schedule: string
  isLiked: boolean
  isPopular: boolean
}

interface ListItemProps {
  lesson: Lesson
}

export default function ListItem({ lesson }: ListItemProps) {
  const toggleLike = (lessonId: number) => {
    // 클라이언트에서 좋아요 토글 로직 처리
    console.log('좋아요 토글:', lessonId)
  }

  const shareLesson = (lessonId: number) => {
    // 클라이언트에서 공유 로직 처리
    console.log('레슨 공유:', lessonId)
  }

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] text-[#8BB5FF]">
              {lesson.category}
            </Badge>
            {lesson.isPopular && (
              <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white">
                인기
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                toggleLike(lesson.id)
              }}
              className={`h-8 w-8 p-0 ${lesson.isLiked ? 'text-red-500' : 'text-gray-400'}`}
            >
              <Heart
                className={`h-4 w-4 ${lesson.isLiked ? 'fill-current' : ''}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                shareLesson(lesson.id)
              }}
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg">{lesson.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {lesson.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            {lesson.trainer}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            {lesson.location}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {lesson.schedule}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{lesson.rating}</span>
            <span className="ml-1 text-xs text-gray-500">
              ({lesson.reviewCount})
            </span>
          </div>
          <span className="text-lg font-bold text-[#8BB5FF]">
            {lesson.price.toLocaleString()}원
          </span>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            className="flex-1 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5]"
            asChild
          >
            <Link href={`/lesson/${lesson.id}`}>상세보기</Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/lesson/${lesson.id}/apply`}>신청하기</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
