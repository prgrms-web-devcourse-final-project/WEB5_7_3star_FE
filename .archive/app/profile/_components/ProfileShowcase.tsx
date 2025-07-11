'use client'

import { UserProfile, Lesson } from '@/types/profile'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Heart, MessageSquare, Star, Users } from 'lucide-react'

// 더미 리뷰 데이터
const reviews = [
  {
    id: 1,
    name: '김수영',
    date: '2024.01.15',
    rating: 5.0,
    content:
      '정말 친절하게 가르쳐주셔서 테니스 실력이 많이 늘었어요! 초보자도 쉽게 따라할 수 있도록 단계별로 설명해주시고, 개인별 맞춤 피드백도 해주셔서 너무 만족스러웠습니다.',
    lesson: '초급자를 위한 테니스 레슨',
    avatar: '',
  },
  {
    id: 2,
    name: '이테니스',
    date: '2024.01.10',
    rating: 4.0,
    content:
      '테니스 기초부터 차근차근 알려주셔서 좋았어요. 다만 시간이 조금 더 길었으면 하는 아쉬움이 있습니다. 그래도 전반적으로 만족스러운 레슨이었어요!',
    lesson: '테니스 기초반',
    avatar: '',
  },
  {
    id: 3,
    name: '박테니스',
    date: '2024.01.08',
    rating: 5.0,
    content:
      '실전 경기 위주로 진행되어서 정말 도움이 많이 되었습니다. 개인별 맞춤 피드백과 전략적인 조언까지 해주셔서 실력 향상에 큰 도움이 되었어요.',
    lesson: '테니스 중급반',
    avatar: '',
  },
]

interface ProfileShowcaseProps {
  profile: UserProfile
  lessons: Lesson[]
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'RECRUITING':
      return (
        <Badge className="border-blue-300 bg-blue-50 text-blue-600">
          모집중
        </Badge>
      )
    case 'CLOSED':
      return (
        <Badge className="border-purple-300 bg-purple-50 text-purple-600">
          모집완료
        </Badge>
      )
    case 'READY':
      return (
        <Badge className="border-gray-300 bg-gray-50 text-gray-600">
          모집전
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

export default function ProfileShowcase({
  profile,
  lessons,
}: ProfileShowcaseProps) {
  return (
    <div className="min-h-screen bg-[#fafbff] py-8">
      {/* 상단 헤더 */}
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-6 flex items-center gap-2">
          <button className="mr-2 rounded-full border border-gray-200 bg-white p-2">
            <span className="sr-only">뒤로가기</span>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-blue-700">강사 프로필</h1>
            <p className="text-sm text-gray-500">
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
                <Avatar className="border-gradient-to-r h-28 w-28 border-4 from-blue-200 to-purple-200">
                  <AvatarImage
                    src={profile.profileImage}
                    alt={profile.nickname}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-2xl font-bold">
                    {profile.nickname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              {/* 프로필 정보 */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">
                      {profile.nickname}
                    </h1>
                    <p className="text-lg text-gray-700">{profile.intro}</p>
                  </div>
                  <button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 font-semibold text-white">
                    좋아요
                  </button>
                </div>
                {/* 통계 정보 */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-4">
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">리뷰</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {profile.reviewCount}개
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">좋아요</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {profile.likeCount}개
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                      <Star className="h-4 w-4" />
                      <span className="text-sm">평점</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {profile.rating}/5.0
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">가입일</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {profile.joinDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* 개설한 레슨 섹션 */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-blue-700">개설한 레슨</h2>
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
                        <h3 className="text-lg font-semibold text-gray-800">
                          {lesson.lessonName}
                        </h3>
                        {getStatusBadge(lesson.status)}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <strong>일시:</strong>{' '}
                          {lesson.startAt
                            ? new Date(lesson.startAt).toLocaleDateString()
                            : ''}
                        </p>
                        <p>
                          <strong>장소:</strong> {lesson.addressDetail}
                        </p>
                        {lesson.maxParticipants &&
                          lesson.currentParticipants !== undefined && (
                            <p>
                              <strong>참가자:</strong>{' '}
                              {lesson.currentParticipants}/
                              {lesson.maxParticipants}명
                            </p>
                          )}
                        <p>
                          <strong>가격:</strong> {lesson.price.toLocaleString()}
                          원
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* 리뷰 섹션 */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-blue-700">
              리뷰 ({reviews.length})
            </h2>
            <span className="ml-auto text-sm text-gray-500">최신순</span>
          </div>
          <div className="mb-4 flex items-center gap-4 rounded-xl bg-white p-6 shadow">
            <div className="text-4xl font-bold text-blue-600">4.6</div>
            <div>
              <div className="mb-1 flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i <= 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={i <= 5 ? '#facc15' : 'none'}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                전체 {reviews.length}개 리뷰
                <br />
                평균 평점
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="rounded-xl bg-white shadow">
                <CardContent className="flex items-start gap-4 p-6">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gray-200 text-lg font-bold">
                      {review.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-bold text-gray-800">
                        {review.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {review.date}
                      </span>
                      <span className="ml-auto flex items-center gap-1">
                        <Star
                          className="h-4 w-4 text-yellow-400"
                          fill="#facc15"
                        />
                        <span className="font-semibold text-blue-700">
                          {review.rating.toFixed(1)}
                        </span>
                      </span>
                    </div>
                    <div className="mb-1 text-xs text-gray-500">
                      수강한 레슨: {review.lesson}
                    </div>
                    <div className="text-sm whitespace-pre-line text-gray-700">
                      {review.content}
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
