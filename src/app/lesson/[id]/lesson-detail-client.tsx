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
  Loader2,
  Clock,
  CardSim,
  CreditCard,
} from 'lucide-react'
import { getLessonStatusText, formatPrice, formatDate } from '@/lib/utils'
import { applyLesson, cancelLessonApplication } from '@/lib/api/profile'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import type { components } from '@/types/swagger-generated'
import Link from 'next/link'

// 타입 정의
type LessonDetailData = components['schemas']['LessonDetailResponseDto']

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
  lesson: LessonDetailData
}

export default function LessonDetailClient({
  lesson,
}: LessonDetailClientProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('introduction')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [startDate, setStartDate] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [applicationStatus, setApplicationStatus] = useState<string | null>(
    null,
  )

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

  const handleLessonApply = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    if (!startDate) {
      alert('시작 날짜를 선택해주세요.')
      return
    }

    try {
      setIsApplying(true)
      console.log('레슨 신청 시작:', lesson.id)
      if (!lesson.id) {
        alert('레슨 ID가 없습니다.')
        return
      }

      const response = await applyLesson(lesson.id)
      console.log('레슨 신청 성공:', response)

      alert('레슨 신청이 완료되었습니다!')
      setApplicationStatus('applied')
    } catch (error) {
      console.error('레슨 신청 실패:', error)
      const errorMessage =
        error instanceof Error ? error.message : '레슨 신청에 실패했습니다.'
      alert(errorMessage)
    } finally {
      setIsApplying(false)
    }
  }

  const handleLessonCancel = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!confirm('정말로 레슨 신청을 취소하시겠습니까?')) {
      return
    }

    try {
      setIsCancelling(true)
      console.log('레슨 신청 취소 시작:', lesson.id)

      if (!lesson.id) {
        alert('레슨 ID가 없습니다.')
        return
      }

      const response = await cancelLessonApplication(lesson.id)
      console.log('레슨 신청 취소 성공:', response)

      alert('레슨 신청이 취소되었습니다.')
      setApplicationStatus(null)
    } catch (error) {
      console.error('레슨 신청 취소 실패:', error)
      const errorMessage =
        error instanceof Error
          ? error.message
          : '레슨 신청 취소에 실패했습니다.'
      alert(errorMessage)
    } finally {
      setIsCancelling(false)
    }
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

    setComments((prev) => [newCommentObj, ...(prev || [])])
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
              {/* 이미지가 있는 경우 표시, 없으면 기본 배경 */}
              {lesson.lessonImages && lesson.lessonImages.length > 0 ? (
                <img
                  src={lesson.lessonImages[currentImageIndex]}
                  alt={lesson.lessonName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <span className="text-gray-500">이미지 없음</span>
                </div>
              )}
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
            {lesson.lessonImages && lesson.lessonImages.length > 1 && (
              <div className="flex gap-2 bg-gray-50 p-4">
                {lesson.lessonImages.map((image: string, index: number) => (
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
                  {lesson.category || '카테고리'}
                </Badge>
                <h1 className="mb-3 text-3xl font-bold text-gray-800">
                  {lesson.lessonName || '레슨 제목'}
                </h1>
              </div>

              {/* 평점 */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(lesson.rating || 0)}
                </div>
                <span className="font-semibold text-gray-800">
                  {lesson.rating || 0}
                </span>
                <span className="text-gray-600">
                  ({lesson.reviewCount || 0}개 후기)
                </span>
              </div>

              {/* 강사 정보 */}
              <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                <Avatar className="h-16 w-16 border-2 border-gray-200">
                  {lesson.profileImage ? (
                    <AvatarImage
                      src={lesson.profileImage}
                      alt={lesson.lessonLeaderName || '강사'}
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-gray-800">
                    {lesson.lessonLeaderName || '강사'} 강사
                  </h3>
                  <p className="mb-2 text-gray-600">
                    {lesson.profileIntro || '소개글이 없습니다.'}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      수강생
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {lesson.rating || 0} 평점
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      전문가
                    </span>
                  </div>
                </div>
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
                  <p className="leading-relaxed text-gray-700">
                    {lesson.description || '레슨 소개가 없습니다.'}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">
                      댓글{' '}
                      <span className="text-gray-500">({comments.length})</span>
                    </h3>
                  </div>

                  {/* 댓글 작성 폼 */}
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          <User className="h-5 w-5" />
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
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="border-b border-gray-200 pb-4"
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                <User className="h-4 w-4" />
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
                      ))
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <p>아직 댓글이 없습니다.</p>
                        <p className="text-sm">첫 번째 댓글을 작성해보세요!</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* 예약 사이드바 */}
      <div className="space-y-6 lg:col-span-1">
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
                    alt={lesson.lessonLeaderName || '강사'}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white">
                    {(lesson.lessonLeaderName || '강사').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h5 className="mb-1 font-semibold text-gray-800">
                    {lesson.lessonLeaderName || '강사'} 강사
                  </h5>
                  <p className="mb-2 text-gray-600">
                    {lesson.profileIntro || '소개글이 없습니다.'}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>평점 {lesson.rating || 0}</span>
                    <span>후기 {lesson.reviewCount || 0}개</span>
                  </div>
                </div>
              </div>
              <Link
                className="flex w-full items-center justify-center rounded-lg border border-purple-600 p-2 text-purple-600"
                href={`/profile/${lesson.lessonLeader}`}
              >
                <User className="mr-2 h-4 w-4" />
                <div>프로필 보기</div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 예약 카드 */}
        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* 가격 정보 */}
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  {lesson.price ? formatPrice(lesson.price) : '45,000원'}
                </div>
                <div className="text-gray-600">/월 (주 2회)</div>
              </div>

              {/* 레슨 일정 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  레슨 일정
                </h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-700">
                        매주 화요일, 목요일
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-700">
                        {lesson.startAt && lesson.endAt
                          ? `${new Date(lesson.startAt).toLocaleTimeString(
                              'ko-KR',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )} - ${new Date(lesson.endAt).toLocaleTimeString(
                              'ko-KR',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )} (60분)`
                          : '오후 7:00 - 8:00 (60분)'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-700">
                        {lesson.addressDetail ||
                          `${lesson.city || ''} ${lesson.district || ''} ${lesson.dong || ''}`.trim() ||
                          '서울 강남구 역삼동'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-700">
                        {lesson.currentParticipants || 8}/
                        {lesson.maxParticipants || 12}명 (4자리 남음)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-700">
                        2024년 3월 5일 시작
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 예약 버튼 */}
              <div className="space-y-3">
                {applicationStatus === 'applied' ? (
                  <Button
                    onClick={handleLessonCancel}
                    disabled={isCancelling}
                    className="h-14 w-full rounded-xl bg-red-500 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-600 hover:shadow-xl disabled:opacity-50"
                  >
                    {isCancelling ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        취소 처리 중...
                      </>
                    ) : lesson.openRun ? (
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        즉시 시작하기
                      </div>
                    ) : (
                      '레슨 신청하기'
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleLessonApply}
                    disabled={isApplying}
                    className="h-14 w-full rounded-xl bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:opacity-50"
                  >
                    {isApplying ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        신청 처리 중...
                      </>
                    ) : lesson.openRun ? (
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        즉시 시작하기
                      </div>
                    ) : (
                      '레슨 신청하기'
                    )}
                  </Button>
                )}
              </div>

              {/* 보장 정보 */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">
                    첫 수업 전 취소 시 100% 환불
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">안전한 결제 시스템</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
