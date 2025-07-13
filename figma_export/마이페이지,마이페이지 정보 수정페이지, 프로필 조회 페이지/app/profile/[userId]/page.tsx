'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Calendar,
  Heart,
  MessageSquare,
  Star,
  Users,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'

// 샘플 데이터 (실제로는 userId로 데이터를 가져올 것)
const userProfile = {
  nickname: '박강사',
  profileImage: '/placeholder.svg?height=120&width=120',
  introduction: '15년 경력의 테니스 전문 강사입니다',
  joinDate: '2022.08.20',
  reviewCount: 89,
  likeCount: 156,
  averageRating: 4.9,
}

const instructorLessons = [
  {
    id: 1,
    title: '테니스 기초반 - 완전 초보자 환영',
    date: '2024.02.05',
    participants: 6,
    maxParticipants: 8,
    status: '모집중',
    price: 45000,
    location: '서초구 테니스장',
  },
  {
    id: 2,
    title: '테니스 중급반 - 실전 경기 위주',
    date: '2024.02.10',
    participants: 10,
    maxParticipants: 10,
    status: '모집완료',
    price: 60000,
    location: '강남구 테니스클럽',
  },
  {
    id: 3,
    title: '테니스 개인레슨 (1:1)',
    date: '2024.02.15',
    participants: 0,
    maxParticipants: 1,
    status: '모집전',
    price: 100000,
    location: '서초구 테니스장',
  },
]

export default function UserProfile({
  params,
}: {
  params: { userId: string }
}) {
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

  return (
    <div className="min-h-screen bg-white">
      {/* 배경 장식 요소 */}
      <div className="pointer-events-none fixed top-24 left-[-50px] h-48 w-48 rounded-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 blur-3xl" />
      <div className="pointer-events-none fixed top-72 right-[-80px] h-36 w-36 rounded-full bg-gradient-to-r from-purple-100/20 to-blue-100/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-48 left-1/4 h-44 w-44 rounded-full bg-gradient-to-r from-blue-100/20 to-purple-100/20 blur-3xl" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-transparent"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] bg-clip-text text-3xl font-bold text-transparent">
              강사 프로필
            </h1>
            <p className="mt-1 text-gray-600">
              강사의 정보와 개설 레슨을 확인하세요
            </p>
          </div>
        </div>

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
                    <p className="text-lg text-gray-700">
                      {userProfile.introduction}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/reviews/${params.userId}`}>
                      <Button variant="outline" className="bg-transparent">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        리뷰 보기
                      </Button>
                    </Link>
                    <Button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 text-white transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-purple-700">
                      <Heart className="mr-2 h-4 w-4" />
                      좋아요
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
                      {userProfile.averageRating}/5.0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 개설한 레슨 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">개설한 레슨</h2>
          </div>

          <div className="space-y-4">
            {instructorLessons.map((lesson) => (
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
                          <strong>참여자:</strong> {lesson.participants}/
                          {lesson.maxParticipants}명
                        </p>
                        <p>
                          <strong>가격:</strong> {lesson.price.toLocaleString()}
                          원
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                        레슨 신청
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
