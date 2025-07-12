'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  MapPin,
  Clock,
  User,
  Star,
  Filter,
  Heart,
  Share2,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

export default function LessonListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const lessons = [
    {
      id: 1,
      title: '요가 기초반 - 몸과 마음의 균형',
      trainer: '김요가 강사',
      category: '요가',
      location: '강남구',
      price: 25000,
      rating: 4.8,
      reviewCount: 127,
      image: '/placeholder.jpg',
      description:
        '초보자를 위한 요가 기초 과정입니다. 몸과 마음의 균형을 찾아보세요.',
      schedule: '월, 수, 금 오후 2:00-3:30',
      isLiked: false,
      isPopular: true,
    },
    {
      id: 2,
      title: '필라테스 중급반',
      trainer: '박필라 강사',
      category: '필라테스',
      location: '서초구',
      price: 30000,
      rating: 4.9,
      reviewCount: 89,
      image: '/placeholder.jpg',
      description: '코어 강화와 자세 교정에 특화된 필라테스 레슨입니다.',
      schedule: '화, 목 오전 10:00-11:00',
      isLiked: true,
      isPopular: false,
    },
    {
      id: 3,
      title: '홈트레이닝 개인레슨',
      trainer: '이홈트 강사',
      category: '홈트레이닝',
      location: '온라인',
      price: 40000,
      rating: 4.7,
      reviewCount: 156,
      image: '/placeholder.jpg',
      description: '집에서도 효과적인 운동을 할 수 있도록 도와드립니다.',
      schedule: '매일 오후 7:00-8:00',
      isLiked: false,
      isPopular: true,
    },
    {
      id: 4,
      title: '수영 기초반',
      trainer: '최수영 강사',
      category: '수영',
      location: '강남구',
      price: 35000,
      rating: 4.6,
      reviewCount: 203,
      image: '/placeholder.jpg',
      description: '수영을 처음 배우시는 분들을 위한 기초 과정입니다.',
      schedule: '토, 일 오후 3:00-4:00',
      isLiked: false,
      isPopular: false,
    },
    {
      id: 5,
      title: '크로스핏 초급반',
      trainer: '정크로스 강사',
      category: '크로스핏',
      location: '서초구',
      price: 45000,
      rating: 4.5,
      reviewCount: 78,
      image: '/placeholder.jpg',
      description: '고강도 인터벌 트레이닝으로 체력을 극대화하세요.',
      schedule: '월, 수, 금 오후 6:00-7:00',
      isLiked: true,
      isPopular: true,
    },
    {
      id: 6,
      title: '복싱 기초반',
      trainer: '김복싱 강사',
      category: '복싱',
      location: '강남구',
      price: 28000,
      rating: 4.4,
      reviewCount: 95,
      image: '/placeholder.jpg',
      description: '기본 자세부터 차근차근 배우는 복싱 레슨입니다.',
      schedule: '화, 목 오후 5:00-6:00',
      isLiked: false,
      isPopular: false,
    },
  ]

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'yoga', label: '요가' },
    { value: 'pilates', label: '필라테스' },
    { value: 'swimming', label: '수영' },
    { value: 'home-training', label: '홈트레이닝' },
    { value: 'crossfit', label: '크로스핏' },
    { value: 'boxing', label: '복싱' },
  ]

  const locations = [
    { value: 'all', label: '전체 지역' },
    { value: 'gangnam', label: '강남구' },
    { value: 'seocho', label: '서초구' },
    { value: 'online', label: '온라인' },
  ]

  const sortOptions = [
    { value: 'popular', label: '인기순' },
    { value: 'rating', label: '평점순' },
    { value: 'price-low', label: '가격 낮은순' },
    { value: 'price-high', label: '가격 높은순' },
    { value: 'recent', label: '최신순' },
  ]

  const toggleLike = (lessonId: number) => {
    // 좋아요 토글 로직
    console.log('좋아요 토글:', lessonId)
  }

  const shareLesson = (lessonId: number) => {
    // 공유 로직
    console.log('레슨 공유:', lessonId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-4xl font-bold text-transparent">
            레슨 목록
          </h1>
          <p className="mt-3 text-gray-600">
            다양한 레슨을 둘러보고 원하는 것을 선택해보세요
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]"></div>
        </div>

        {/* 검색 및 필터 */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="레슨명, 강사명, 키워드로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5]">
              검색
            </Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="지역" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
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
          ))}
        </div>
      </div>
    </div>
  )
}
