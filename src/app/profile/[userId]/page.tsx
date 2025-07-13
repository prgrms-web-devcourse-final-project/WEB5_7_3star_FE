'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar,
  Star,
  MessageSquare,
  Heart,
  MapPin,
  Clock,
  Users,
  Award,
  Edit,
  Share,
} from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'

// 샘플 사용자 데이터
const userProfile = {
  id: 'user123',
  nickname: '김수영',
  email: 'swimming.kim@example.com',
  profileImage: '/placeholder.svg?height=120&width=120',
  introduction:
    '10년 경력의 수영 전문 강사입니다. 초보자부터 고급자까지 모든 레벨의 수영을 가르칩니다.',
  joinDate: '2023.03.15',
  location: '서울 강남구',
  reviewCount: 127,
  likeCount: 89,
  averageRating: 4.8,
  totalStudents: 156,
  completedLessons: 89,
  specialties: ['자유형', '배영', '접영', '평영'],
  certifications: ['수영지도사 2급', '생명구조원', 'CPR 자격증'],
}

const userLessons = [
  {
    id: 1,
    title: '초보자를 위한 수영 기초반',
    category: '수영',
    price: 50000,
    duration: 60,
    maxParticipants: 8,
    currentParticipants: 6,
    rating: 4.9,
    reviewCount: 45,
    schedule: '매주 월, 수, 금 10:00-11:00',
    location: '강남구 수영장',
    status: '모집중',
  },
  {
    id: 2,
    title: '프리스타일 마스터 클래스',
    category: '수영',
    price: 80000,
    duration: 90,
    maxParticipants: 6,
    currentParticipants: 4,
    rating: 4.8,
    reviewCount: 32,
    schedule: '매주 화, 목 14:00-15:30',
    location: '강남구 수영장',
    status: '모집중',
  },
  {
    id: 3,
    title: '개인 수영 레슨',
    category: '수영',
    price: 120000,
    duration: 60,
    maxParticipants: 1,
    currentParticipants: 1,
    rating: 4.9,
    reviewCount: 28,
    schedule: '매주 토, 일 09:00-10:00',
    location: '강남구 수영장',
    status: '모집완료',
  },
]

const userReviews = [
  {
    id: 1,
    reviewer: '박학생',
    rating: 5,
    comment:
      '정말 친절하고 체계적으로 가르쳐주세요! 처음 수영을 배우는데도 쉽게 따라할 수 있었습니다.',
    date: '2024.01.15',
    lessonTitle: '초보자를 위한 수영 기초반',
  },
  {
    id: 2,
    reviewer: '이직장인',
    rating: 5,
    comment:
      '개인 맞춤형 지도가 정말 좋았어요. 부족한 부분을 정확히 짚어서 도움을 주셨습니다.',
    date: '2024.01.10',
    lessonTitle: '개인 수영 레슨',
  },
  {
    id: 3,
    reviewer: '최주부',
    rating: 4,
    comment:
      '아이들이 정말 좋아해요. 재미있게 가르쳐주시고 안전도 신경써주세요.',
    date: '2024.01.08',
    lessonTitle: '초보자를 위한 수영 기초반',
  },
]

export default function UserProfile({
  params,
}: {
  params: { userId: string }
}) {
  const [activeTab, setActiveTab] = useState('lessons')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '모집중':
        return <Badge className="bg-green-100 text-green-800">모집중</Badge>
      case '모집완료':
        return <Badge className="bg-blue-100 text-blue-800">모집완료</Badge>
      case '마감':
        return <Badge className="bg-gray-100 text-gray-800">마감</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 배경 장식 요소 */}
      <div className="pointer-events-none fixed top-24 left-[-50px] h-48 w-48 rounded-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 blur-3xl" />
      <div className="pointer-events-none fixed top-72 right-[-80px] h-36 w-36 rounded-full bg-gradient-to-r from-purple-100/20 to-blue-100/20 blur-3xl" />

      <div className="relative z-10 container mx-auto w-full max-w-5xl px-4 py-12">
        <PageHeader
          title={userProfile.nickname}
          subtitle={userProfile.introduction}
          align="left"
          right={
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                공유
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                <Edit className="mr-2 h-4 w-4" />
                프로필 수정
              </Button>
            </div>
          }
        />
        {/* 프로필 카드 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col items-start gap-8 lg:flex-row">
              {/* 프로필 이미지 */}
              <div className="flex-shrink-0">
                <Avatar className="border-gradient-to-r h-32 w-32 border-4 from-blue-200 to-purple-200">
                  <AvatarImage
                    src={userProfile.profileImage || '/placeholder.svg'}
                    alt={userProfile.nickname}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-2xl font-bold">
                    {userProfile.nickname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* 프로필 정보 */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">
                      {userProfile.nickname}
                    </h1>
                    <p className="mb-2 text-lg text-gray-700">
                      {userProfile.introduction}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{userProfile.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Share className="h-4 w-4" />
                      공유
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                      <Edit className="mr-2 h-4 w-4" />
                      프로필 수정
                    </Button>
                  </div>
                </div>

                {/* 통계 정보 */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-4">
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">가입일</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {userProfile.joinDate}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">리뷰</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {userProfile.reviewCount}개
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">좋아요</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {userProfile.likeCount}개
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                      <Star className="h-4 w-4" />
                      <span className="text-sm">평점</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {userProfile.averageRating}
                    </p>
                  </div>
                </div>

                {/* 전문 분야 및 자격증 */}
                <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                      <Award className="h-4 w-4" />
                      전문 분야
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-50 text-blue-700"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                      <Award className="h-4 w-4" />
                      자격증
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.certifications.map((cert, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-green-50 text-green-700"
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 탭 메뉴 */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1">
            <TabsTrigger value="lessons" className="rounded-lg">
              레슨 목록
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg">
              리뷰
            </TabsTrigger>
          </TabsList>

          {/* 레슨 목록 탭 */}
          <TabsContent value="lessons" className="space-y-4">
            <div className="grid gap-4">
              {userLessons.map((lesson) => (
                <Card key={lesson.id} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                              {lesson.title}
                            </h3>
                            <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{lesson.duration}분</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>
                                  {lesson.currentParticipants}/
                                  {lesson.maxParticipants}명
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{lesson.location}</span>
                              </div>
                            </div>
                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {renderStars(lesson.rating)}
                                <span className="text-sm text-gray-600">
                                  ({lesson.reviewCount})
                                </span>
                              </div>
                              <span className="text-lg font-bold text-green-600">
                                {lesson.price.toLocaleString()}원
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {lesson.schedule}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(lesson.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 리뷰 탭 */}
          <TabsContent value="reviews" className="space-y-4">
            <div className="grid gap-4">
              {userReviews.map((review) => (
                <Card key={review.id} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="mb-1 font-semibold text-gray-900">
                            {review.reviewer}
                          </h4>
                          <p className="mb-2 text-sm text-gray-600">
                            {review.lessonTitle}
                          </p>
                          <div className="mb-3 flex items-center gap-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="leading-relaxed text-gray-700">
                        {review.comment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
