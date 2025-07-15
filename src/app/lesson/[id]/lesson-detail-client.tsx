'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar,
  MapPin,
  User,
  Star,
  Heart,
  Users,
  Award,
  CheckCircle,
} from 'lucide-react'
import type { ApiLessonDetail } from '@/types'
import { getLessonStatusText, formatPrice, formatDate } from '@/lib/utils'

interface Comment {
  id: string
  author: string
  content: string
  date: string
  isMyComment: boolean
  isDeleted?: boolean
  replies?: Comment[]
}

interface LessonDetailClientProps {
  lesson: ApiLessonDetail
}

const initialComments: Comment[] = [
  {
    id: '1',
    author: '박수영',
    content:
      '정말 좋은 레슨이에요! 강사님이 너무 친절하시고 실력도 뛰어나세요.',
    date: '2024.02.15 14:30',
    isMyComment: false,
    replies: [
      {
        id: '2',
        author: '김수영 강사',
        content: '감사합니다! 앞으로도 열심히 지도하겠습니다 😊',
        date: '2024.02.15 15:00',
        isMyComment: false,
      },
    ],
  },
  {
    id: '3',
    author: '이헬스',
    content: '수영장 위치가 어디인가요? 레슨 받고 싶어요!',
    date: '2024.02.16 10:20',
    isMyComment: false,
  },
  {
    id: '4',
    author: '나',
    content: '레슨 시간이 어떻게 되나요? 평일 저녁에도 가능한지 궁금합니다.',
    date: '2024.02.16 16:45',
    isMyComment: true,
  },
]

export default function LessonDetailClient({
  lesson,
}: LessonDetailClientProps) {
  const [activeTab, setActiveTab] = useState('introduction')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [startDate, setStartDate] = useState('')

  // 오늘 날짜를 시작 날짜의 최소값으로 설정
  useState(() => {
    const today = new Date().toISOString().split('T')[0]
    setStartDate(today)
  })

  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
  }

  const handleBookingClick = () => {
    if (!startDate) {
      alert('시작 날짜를 선택해주세요.')
      return
    }
    alert('예약 페이지로 이동합니다.')
  }

  const handleProfileClick = () => {
    // 강사 프로필 페이지로 이동
    window.location.href = `/profile/${lesson.lessonLeader}`
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      alert('댓글을 입력해주세요.')
      return
    }

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: '나',
      content: newComment,
      date: getCurrentDateTime(),
      isMyComment: true,
      replies: [],
    }

    setComments((prev) => [newCommentObj, ...prev])
    setNewComment('')
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* 메인 콘텐츠 */}
      <div className="space-y-6 lg:col-span-2">
        {/* 레슨 이미지 */}
        <Card className="overflow-hidden border-2 border-gray-100 shadow-xs">
          <div className="relative">
            <div className="relative aspect-video bg-gradient-to-r from-blue-500 to-purple-600">
              {/* 이미지가 없는 경우 회색 배경으로 처리 */}
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-gray-500">이미지 없음</span>
              </div>
              <button
                onClick={handleFavoriteClick}
                className={`absolute top-4 right-4 rounded-full p-2 transition-all duration-200 ${
                  isFavorite
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white'
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`}
                />
              </button>
            </div>

            {/* 썸네일 이미지들 */}
            {lesson.lessonImages && lesson.lessonImages.length > 0 && (
              <div className="flex gap-2 bg-gray-50 p-4">
                {lesson.lessonImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`h-12 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-blue-500 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`썸네일 ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* 레슨 정보 */}
        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* 카테고리와 제목 */}
              <div>
                <Badge className="mb-2 border-0 bg-blue-100 text-blue-700">
                  {lesson.category}
                </Badge>
                <h1 className="mb-3 text-3xl font-bold text-gray-800">
                  {lesson.lessonName}
                </h1>
              </div>

              {/* 평점 */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(lesson.rating)}
                </div>
                <span className="font-semibold text-gray-800">
                  {lesson.rating}
                </span>
                <span className="text-gray-600">
                  ({lesson.reviewCount}개 후기)
                </span>
              </div>

              {/* 강사 정보 */}
              <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                <Avatar className="h-16 w-16 border-2 border-gray-200">
                  <AvatarImage
                    src={lesson.profileImage}
                    alt={lesson.lessonLeaderName}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white">
                    {lesson.lessonLeaderName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-gray-800">
                    {lesson.lessonLeaderName} 강사
                  </h3>
                  <p className="mb-2 text-gray-600">{lesson.profileIntro}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      수강생
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {lesson.rating} 평점
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      전문가
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleProfileClick}
                  variant="outline"
                  className="flex-shrink-0"
                >
                  프로필 보기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 탭 콘텐츠 */}
        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-50">
                <TabsTrigger
                  value="introduction"
                  className="data-[state=active]:bg-white"
                >
                  레슨 소개
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-white"
                >
                  댓글
                </TabsTrigger>
              </TabsList>

              <TabsContent value="introduction" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-xl font-bold text-gray-800">
                      레슨 소개
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      {lesson.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-gray-800">
                      레슨 정보
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>시작일:</strong> {formatDate(lesson.startAt)}
                      </p>
                      <p>
                        <strong>종료일:</strong> {formatDate(lesson.endAt)}
                      </p>
                      <p>
                        <strong>위치:</strong> {lesson.addressDetail}
                      </p>
                      <p>
                        <strong>참가자:</strong> {lesson.currentParticipants}/
                        {lesson.maxParticipants}명
                      </p>
                      <p>
                        <strong>가격:</strong> {formatPrice(lesson.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">
                      댓글{' '}
                      <span className="text-gray-500">
                        ({comments.filter((c) => !c.isDeleted).length})
                      </span>
                    </h3>
                  </div>

                  {/* 댓글 작성 폼 */}
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder-user.jpg"
                          alt="내 프로필"
                        />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          나
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="댓글을 작성해주세요..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[80px] border-2 border-gray-200 focus:border-blue-600"
                        />
                        <div className="mt-2 flex justify-end">
                          <Button
                            onClick={handleSubmitComment}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                          >
                            댓글 작성
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 댓글 목록 */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border-b border-gray-200 pb-4"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder-user.jpg"
                              alt={comment.author}
                            />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-xs text-white">
                              {comment.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="font-semibold text-gray-800">
                                {comment.author}
                              </span>
                              <span className="text-sm text-gray-500">
                                {comment.date}
                              </span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* 예약 사이드바 */}
      <div className="space-y-6 lg:col-span-1">
        {/* 예약 카드 */}
        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* 가격 정보 */}
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-gray-800">
                  {formatPrice(lesson.price)}
                </div>
                <div className="text-gray-600">레슨 비용</div>
              </div>

              {/* 레슨 일정 */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">레슨 일정</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">
                      {formatDate(lesson.startAt)} ~ {formatDate(lesson.endAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-700">
                      {lesson.addressDetail}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-600" />
                    <span className="text-gray-700">
                      최대 {lesson.maxParticipants}명 (현재{' '}
                      {lesson.currentParticipants}명)
                    </span>
                  </div>
                </div>
              </div>

              {/* 예약 폼 */}
              <div className="space-y-3">
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700"
                >
                  시작 날짜
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* 예약 버튼 */}
              <Button
                onClick={handleBookingClick}
                className="h-12 w-full bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] font-semibold text-white shadow-xs transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-sm"
              >
                <Calendar className="mr-2 h-5 w-5" />
                레슨 신청하기
              </Button>

              {/* 상태 정보 */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">
                    상태: {getLessonStatusText(lesson.status)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 강사 정보 카드 */}
        <Card className="border-2 border-gray-100 shadow-xs">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">
              강사 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-gray-200">
                  <AvatarImage
                    src={lesson.profileImage}
                    alt={lesson.lessonLeaderName}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white">
                    {lesson.lessonLeaderName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h5 className="mb-1 font-semibold text-gray-800">
                    {lesson.lessonLeaderName} 강사
                  </h5>
                  <p className="mb-2 text-gray-600">{lesson.profileIntro}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>평점 {lesson.rating}</span>
                    <span>후기 {lesson.reviewCount}개</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleProfileClick}
                variant="outline"
                className="w-full border-2 border-gray-200 text-gray-700 hover:border-gray-300"
              >
                <User className="mr-2 h-4 w-4" />
                프로필 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
