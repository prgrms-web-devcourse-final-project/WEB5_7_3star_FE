'use client'

import { useState, useEffect } from 'react'
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
  Loader2,
} from 'lucide-react'
import {
  getProfileDetail,
  getCreatedLessons,
  getUserReviews,
  deleteLesson,
  getLessonApplications,
  approveRejectApplication,
  getLessonParticipants,
} from '@/lib/api/profile'
import type { ProfileDetailResponse, CreatedLesson } from '@/lib/api/profile'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function UserProfile({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('lessons')
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null,
  )
  const [createdLessons, setCreatedLessons] = useState<CreatedLesson[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [participants, setParticipants] = useState<any[]>([])
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLessonsLoading, setIsLessonsLoading] = useState(false)
  const [isReviewsLoading, setIsReviewsLoading] = useState(false)
  const [isApplicationsLoading, setIsApplicationsLoading] = useState(false)
  const [isParticipantsLoading, setIsParticipantsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const initializeData = async () => {
      try {
        setError(null)

        const response = await getProfileDetail(+userId)
        if (response.data) {
          setProfileData(response.data)
        } else {
          setError('프로필 정보를 불러올 수 없습니다.')
        }
      } catch (err) {
        console.error('프로필 데이터 로딩 에러:', err)
        setError('프로필 정보를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    initializeData()
  }, [userId])

  // 프로필 데이터가 로드된 후 기본 탭(lessons)의 데이터 로드
  useEffect(() => {
    if (profileData && activeTab === 'lessons') {
      fetchCreatedLessons()
    }
  }, [profileData, userId])

  // 내 프로필인지 확인
  const isMyProfile = user && user.id === +userId

  // 레슨 목록 가져오기
  const fetchCreatedLessons = async () => {
    if (!userId) return

    try {
      setIsLessonsLoading(true)
      const response = await getCreatedLessons(userId)
      if (response.data && response.data.lessons) {
        setCreatedLessons(response.data.lessons)
      }
    } catch (err) {
      console.error('레슨 목록 로딩 에러:', err)
    } finally {
      setIsLessonsLoading(false)
    }
  }

  // 리뷰 목록 가져오기
  const fetchReviews = async () => {
    if (!userId) return

    try {
      setIsReviewsLoading(true)
      const response = await getUserReviews(userId)
      if (response.data && response.data.reviews) {
        setReviews(response.data.reviews)
      }
    } catch (err) {
      console.error('리뷰 목록 로딩 에러:', err)
      // 백엔드 연결 실패 시 사용자에게 알림
      if (err instanceof Error && err.message.includes('fetch failed')) {
        console.error(
          '백엔드 서버 연결 실패 - 서버가 실행 중인지 확인해주세요.',
        )
      }
    } finally {
      setIsReviewsLoading(false)
    }
  }

  // 레슨 신청자 목록 가져오기
  const fetchApplications = async (lessonId: string) => {
    try {
      setIsApplicationsLoading(true)
      const response = await getLessonApplications(lessonId)
      if (response.data && response.data.applications) {
        setApplications(response.data.applications)
      }
    } catch (err) {
      console.error('신청자 목록 로딩 에러:', err)
    } finally {
      setIsApplicationsLoading(false)
    }
  }

  // 레슨 참가자 목록 가져오기
  const fetchParticipants = async (lessonId: string) => {
    try {
      setIsParticipantsLoading(true)
      const response = await getLessonParticipants(lessonId)
      if (response.data && response.data.participants) {
        setParticipants(response.data.participants)
      }
    } catch (err) {
      console.error('참가자 목록 로딩 에러:', err)
    } finally {
      setIsParticipantsLoading(false)
    }
  }

  // 레슨 삭제
  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('정말로 이 레슨을 삭제하시겠습니까?')) return

    try {
      await deleteLesson(lessonId)
      // 삭제 후 레슨 목록 새로고침
      await fetchCreatedLessons()
    } catch (err) {
      console.error('레슨 삭제 에러:', err)
      alert('레슨 삭제 중 오류가 발생했습니다.')
    }
  }

  // 신청 승인/거절 처리
  const handleApplicationAction = async (
    applicationId: string,
    action: 'APPROVE' | 'REJECT',
  ) => {
    try {
      await approveRejectApplication(applicationId, action)
      // 처리 후 신청자 목록 새로고침
      if (selectedLessonId) {
        await fetchApplications(selectedLessonId)
      }
    } catch (err) {
      console.error('신청 처리 에러:', err)
      alert(
        action === 'APPROVE'
          ? '승인 처리 중 오류가 발생했습니다.'
          : '거절 처리 중 오류가 발생했습니다.',
      )
    }
  }

  // 탭 변경 시 데이터 로드
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === 'lessons') {
      fetchCreatedLessons()
    } else if (value === 'reviews') {
      fetchReviews()
    }
  }

  // 상태 뱃지 렌더링
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      RECRUITING: { label: '모집중', class: 'bg-green-100 text-green-800' },
      FULL: { label: '모집완료', class: 'bg-blue-100 text-blue-800' },
      COMPLETED: { label: '완료', class: 'bg-gray-100 text-gray-800' },
      CANCELLED: { label: '취소', class: 'bg-red-100 text-red-800' },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      class: 'bg-gray-100 text-gray-800',
    }

    return <Badge className={config.class}>{config.label}</Badge>
  }

  // 별점 렌더링
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>프로필 정보를 불러오는 중...</span>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error || !profileData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="mb-4 text-red-600">
            {error || '프로필 정보를 불러올 수 없습니다.'}
          </p>
          <Button onClick={() => window.location.reload()}>다시 시도</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 배경 장식 요소 */}
      <div className="pointer-events-none fixed top-24 left-[-50px] h-48 w-48 rounded-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 blur-3xl" />
      <div className="pointer-events-none fixed top-72 right-[-80px] h-36 w-36 rounded-full bg-gradient-to-r from-purple-100/20 to-blue-100/20 blur-3xl" />

      <div className="relative z-10 container mx-auto w-full max-w-5xl px-4 py-12">
        {/* 프로필 카드 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col items-start gap-8 lg:flex-row">
              {/* 프로필 이미지 */}
              <div className="flex-shrink-0">
                <Avatar className="border-gradient-to-r h-32 w-32 border-4 from-blue-200 to-purple-200">
                  <AvatarImage
                    src={profileData.profileImage || '/placeholder.svg'}
                    alt={profileData.nickname || '사용자'}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-2xl font-bold">
                    {(profileData.nickname || '사용자').charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* 프로필 정보 */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">
                      {profileData.nickname || '사용자'}
                    </h1>
                    <p className="mb-2 text-lg text-gray-700">
                      {profileData.intro || '소개글이 없습니다.'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Share className="h-4 w-4" />
                      공유
                    </Button>
                    {/* 내 프로필인 경우에만 프로필 수정 버튼 표시 */}
                    {isMyProfile && (
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                        onClick={() => (window.location.href = '/mypage/edit')}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        프로필 수정
                      </Button>
                    )}
                  </div>
                </div>

                {/* 통계 정보 */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-2">
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">리뷰</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {profileData.reviewCount || 0}개
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                      <Star className="h-4 w-4" />
                      <span className="text-sm">평점</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {profileData.rating
                        ? profileData.rating.toFixed(1)
                        : '0.0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 탭 메뉴 */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 rounded-xl bg-gray-100 p-1">
            <TabsTrigger value="lessons" className="rounded-lg">
              레슨 목록
            </TabsTrigger>
            <TabsTrigger value="applications" className="rounded-lg">
              신청자 관리
            </TabsTrigger>
            <TabsTrigger value="participants" className="rounded-lg">
              참가자 관리
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg">
              리뷰
            </TabsTrigger>
          </TabsList>

          {/* 레슨 목록 탭 */}
          <TabsContent value="lessons" className="space-y-4">
            {isLessonsLoading ? (
              <div className="py-8 text-center">
                <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                <p className="mt-2 text-gray-500">레슨 목록을 불러오는 중...</p>
              </div>
            ) : createdLessons.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p>개설한 레슨이 없습니다.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {createdLessons.map((lesson) => (
                  <Card key={lesson.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="mb-4 flex items-start justify-between">
                            <div>
                              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                {lesson.lessonName}
                              </h3>
                              <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>
                                    {lesson.currentParticipants}/
                                    {lesson.maxParticipants}명
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{lesson.addressDetail}</span>
                                </div>
                              </div>
                              <div className="mb-3 flex items-center gap-2">
                                <span className="text-lg font-bold text-green-600">
                                  {lesson.price?.toLocaleString()}원
                                </span>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>
                                  시작:{' '}
                                  {lesson.startAt
                                    ? new Date(
                                        lesson.startAt,
                                      ).toLocaleDateString('ko-KR')
                                    : '미정'}
                                </p>
                                <p>
                                  종료:{' '}
                                  {lesson.endAt
                                    ? new Date(lesson.endAt).toLocaleDateString(
                                        'ko-KR',
                                      )
                                    : '미정'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(lesson.status || 'UNKNOWN')}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  router.push(
                                    `/instructor/requests/${lesson.id}`,
                                  )
                                }}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                관리
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  lesson.id &&
                                  handleDeleteLesson(lesson.id.toString())
                                }
                                className="text-red-600 hover:text-red-700"
                              >
                                삭제
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* 리뷰 탭 */}
          <TabsContent value="reviews" className="space-y-4">
            {isReviewsLoading ? (
              <div className="py-8 text-center">
                <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                <p className="mt-2 text-gray-500">리뷰 목록을 불러오는 중...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p>받은 리뷰가 없습니다.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="mb-1 font-semibold text-gray-900">
                              {review.reviewerNickname || '익명'}
                            </h4>
                            <p className="mb-2 text-sm text-gray-600">
                              {review.lessonName || '레슨'}
                            </p>
                            <div className="mb-3 flex items-center gap-2">
                              {renderStars(review.rating || 0)}
                              <span className="text-sm text-gray-500">
                                {review.createdAt
                                  ? new Date(
                                      review.createdAt,
                                    ).toLocaleDateString('ko-KR')
                                  : '날짜 없음'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="leading-relaxed text-gray-700">
                          {review.content || '리뷰 내용이 없습니다.'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* 신청자 관리 탭 */}
          <TabsContent value="applications" className="space-y-4">
            {!selectedLessonId ? (
              <div className="py-8 text-center text-gray-500">
                <p>레슨을 선택해주세요.</p>
                <p className="mt-2 text-sm">
                  레슨 목록에서 "관리" 버튼을 클릭하세요.
                </p>
              </div>
            ) : isApplicationsLoading ? (
              <div className="py-8 text-center">
                <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                <p className="mt-2 text-gray-500">
                  신청자 목록을 불러오는 중...
                </p>
              </div>
            ) : applications.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p>신청자가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">신청자 목록</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      selectedLessonId && fetchApplications(selectedLessonId)
                    }
                  >
                    새로고침
                  </Button>
                </div>
                <div className="grid gap-4">
                  {applications.map((application) => (
                    <Card
                      key={application.id}
                      className="border border-gray-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {application.applicantNickname || '익명'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              신청일:{' '}
                              {application.createdAt
                                ? new Date(
                                    application.createdAt,
                                  ).toLocaleDateString('ko-KR')
                                : '날짜 없음'}
                            </p>
                            <p className="text-sm text-gray-600">
                              상태: {application.status || '대기중'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleApplicationAction(
                                  application.id,
                                  'APPROVE',
                                )
                              }
                              disabled={application.status === 'APPROVED'}
                            >
                              승인
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleApplicationAction(
                                  application.id,
                                  'REJECT',
                                )
                              }
                              disabled={application.status === 'REJECTED'}
                            >
                              거절
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* 참가자 관리 탭 */}
          <TabsContent value="participants" className="space-y-4">
            {!selectedLessonId ? (
              <div className="py-8 text-center text-gray-500">
                <p>레슨을 선택해주세요.</p>
                <p className="mt-2 text-sm">
                  레슨 목록에서 "관리" 버튼을 클릭하세요.
                </p>
              </div>
            ) : isParticipantsLoading ? (
              <div className="py-8 text-center">
                <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                <p className="mt-2 text-gray-500">
                  참가자 목록을 불러오는 중...
                </p>
              </div>
            ) : participants.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p>참가자가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">참가자 목록</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      selectedLessonId && fetchParticipants(selectedLessonId)
                    }
                  >
                    새로고침
                  </Button>
                </div>
                <div className="grid gap-4">
                  {participants.map((participant) => (
                    <Card
                      key={participant.id}
                      className="border border-gray-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {participant.participantNickname || '익명'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              참가일:{' '}
                              {participant.joinedAt
                                ? new Date(
                                    participant.joinedAt,
                                  ).toLocaleDateString('ko-KR')
                                : '날짜 없음'}
                            </p>
                            <p className="text-sm text-gray-600">
                              상태: {participant.status || '참가중'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
