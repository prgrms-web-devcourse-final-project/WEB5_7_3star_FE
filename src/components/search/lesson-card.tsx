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
import { MapPin, Clock, User, Star } from 'lucide-react'

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
}

interface LessonCardProps {
  lesson: Lesson
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge className="bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] text-[#8BB5FF]">
            {lesson.category}
          </Badge>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            {lesson.rating}
            <span className="ml-1 text-gray-500">({lesson.reviewCount})</span>
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
          <span className="text-lg font-bold text-[#8BB5FF]">
            {lesson.price.toLocaleString()}원
          </span>
          <Button
            // onClick={() => onViewDetail(lesson.id)}
            className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5]"
          >
            상세보기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
