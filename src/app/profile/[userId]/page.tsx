'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/useAuth'
import { getMyCoupons, getMyLessonApplications, MyCoupon } from '@/lib/api'
import type { CreatedLesson, ProfileDetailResponse } from '@/lib/api/profile'
import {
  cancelLessonApplication,
  deleteLesson,
  getProfileDetail,
  getUserReviews,
} from '@/lib/api/profile'
import { ReviewViewResponse } from '@/lib/api/review'
import { MyLessonApplication } from '@/types'
import {
  Edit,
  Loader2,
  MapPin,
  MessageSquare,
  Star,
  User,
  Users,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

export default function UserProfile({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = use(params)
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [activeTab, setActiveTab] = useState('lessons') // 기본값으로 설정
  const [isClient, setIsClient] = useState(false)
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null,
  )
  const [createdLessons, setCreatedLessons] = useState<CreatedLesson[]>([])
  const [reviews, setReviews] = useState<ReviewViewResponse[]>([])
  const [applications, setApplications] = useState<MyLessonApplication[]>([])
  const [coupons, setCoupons] = useState<MyCoupon[]>([])

  const fetchProfile = async () => {
    const response = await getProfileDetail(Number(userId))
    if (response.data) {
      setProfileData(response.data)
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!authLoading && user && userId) {
      const isMyProfileValue = user.id === Number(userId)
      setIsMyProfile(isMyProfileValue)

      if (isClient) {
        setActiveTab(isMyProfileValue ? 'applications' : 'lessons')
      }
    }
  }, [authLoading, user, userId, isClient])

  useEffect(() => {
    fetchProfile()
  }, [userId])

  const fetchReviews = async () => {
    if (!userId) return

    const response = await getUserReviews(userId)
    if (response.data) {
      setReviews(response.data.reviews)
    }
  }

  useEffect(() => {
    if (profileData && activeTab === 'lessons') {
      fetchCreatedLessons()
    } else if (profileData && activeTab === 'applications') {
      fetchApplications()
    } else if (profileData && activeTab === 'coupons') {
      fetchCoupons()
    } else if (profileData && activeTab === 'reviews') {
      fetchReviews()
    }
  }, [profileData, userId, isMyProfile, activeTab])

  const fetchCreatedLessons = async () => {
    try {
      let response
      if (isMyProfile) {
        // 내 프로필: /api/v1/lessons/{userId}/created-lessons
        const apiResponse = await fetch(
          `/api/proxy/api/v1/lessons/${userId}/created-lessons`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          },
        )

        if (!apiResponse.ok) {
          throw new Error(`내 레슨 목록 조회 실패: ${apiResponse.status}`)
        }

        response = await apiResponse.json()
      } else {
        const apiResponse = await fetch(
          `/api/proxy/api/v1/profiles/${userId}/created-lessons`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          },
        )

        if (!apiResponse.ok) {
          throw new Error(`타인 레슨 목록 조회 실패: ${apiResponse.status}`)
        }

        response = await apiResponse.json()
      }

      if (response.data && response.data.lessons) {
        setCreatedLessons(response.data.lessons)
      } else if (response.data && Array.isArray(response.data)) {
        setCreatedLessons(response.data)
      }
    } catch (err) {
      console.error('레슨 목록 로딩 에러:', err)
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await getMyLessonApplications()
      if (response.data && response.data.lessonApplications) {
        setApplications(response.data.lessonApplications)
      }
    } catch (err) {
      console.error('신청자 목록 로딩 에러:', err)
    }
  }

  const fetchCoupons = async () => {
    if (!userId) return

    try {
      const response = await getMyCoupons()
      if (response.data && response.data.myCoupons) {
        setCoupons(response.data.myCoupons)
      }
    } catch (err) {
      console.error('쿠폰 목록 로딩 에러:', err)
    } finally {
    }
  }

  const handleCancelLesson = async (lessonId: string) => {
    if (!confirm('정말로 이 레슨을 취소하시겠습니까?')) return
    try {
      await cancelLessonApplication(lessonId)
      await fetchApplications()
      alert('레슨 신청이 취소되었습니다.')
    } catch (err) {
      console.error('레슨 신청 취소 에러:', err)
      alert('레슨 신청 취소 중 오류가 발생했습니다.')
    }
  }

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('정말로 이 레슨을 삭제하시겠습니까?')) return

    try {
      await deleteLesson(lessonId)
      await fetchCreatedLessons()
      alert('레슨이 삭제되었습니다.')
    } catch (err) {
      console.error('레슨 삭제 에러:', err)
      alert('레슨 삭제 중 오류가 발생했습니다.')
    }
  }

  const handleManageLesson = (lessonId: string) => {
    router.push(`/instructor/requests/${lessonId}`)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === 'lessons') {
      fetchCreatedLessons()
    } else if (value === 'applications') {
      fetchApplications()
    } else if (value === 'coupons') {
      fetchCoupons()
    } else if (value === 'reviews') {
      fetchReviews()
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      RECRUITING: { label: '모집중', class: 'bg-green-100 text-green-800' },
      RECRUITMENT_COMPLETED: {
        label: '모집완료',
        class: 'bg-blue-100 text-blue-800',
      },
      COMPLETED: { label: '완료', class: 'bg-gray-100 text-gray-800' },
      CANCELLED: { label: '취소', class: 'bg-red-100 text-red-800' },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      class: 'bg-gray-100 text-gray-800',
    }

    return <Badge className={config.class}>{config.label}</Badge>
  }

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

  // 로딩 상태 처리
  if (authLoading || !isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>로딩 중...</span>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>프로필 정보를 불러오는 중...</span>
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
        <Card className="mb-8 w-full border-2 border-gray-100 shadow-lg">
          <CardContent className="w-full p-8">
            <div className="flex w-full flex-col items-start gap-2">
              {/* 프로필 이미지 */}
              <div className="flex w-full flex-shrink-0 items-start justify-between">
                <Avatar className="border-gradient-to-r h-32 w-32 border-4 from-blue-200 to-purple-200">
                  {profileData.profileImage ? (
                    <AvatarImage
                      src={profileData.profileImage}
                      alt={profileData.nickname || '사용자'}
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100">
                    <User className="h-16 w-16 text-white" />
                  </AvatarFallback>
                </Avatar>
                {isMyProfile && (
                  <Button
                    className="self-start bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                    onClick={() => (window.location.href = '/mypage/edit')}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    프로필 수정
                  </Button>
                )}
              </div>

              {/* 프로필 정보 */}
              <div className="w-full flex-1 space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="mb-2 text-3xl font-bold text-nowrap text-gray-800">
                      {profileData.nickname || '사용자'}
                    </h1>
                    <p className="mb-2 w-full text-lg text-gray-700">
                      {profileData.intro || '소개글이 없습니다.'}
                    </p>
                  </div>
                  <div className="flex w-full gap-2">
                    {/* {!isMyProfile && (
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Share className="h-4 w-4" />
                        공유
                      </Button>
                    )} */}
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

        {/* 탭 메뉴 - 내 프로필과 타인 프로필에 따라 다른 구성 */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          {isMyProfile ? (
            <TabsList className="grid w-full grid-cols-3 rounded-xl bg-gray-100 p-1">
              <TabsTrigger value="applications" className="rounded-lg">
                신청한 레슨
              </TabsTrigger>
              <TabsTrigger value="lessons" className="rounded-lg">
                내가 개설한 레슨
              </TabsTrigger>
              <TabsTrigger value="coupons" className="rounded-lg">
                내 쿠폰
              </TabsTrigger>
            </TabsList>
          ) : (
            // 타인 프로필: 2개 탭
            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1">
              <TabsTrigger value="lessons" className="rounded-lg">
                개설한 레슨
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg">
                리뷰 ({profileData?.reviewCount || 0})
              </TabsTrigger>
            </TabsList>
          )}

          {/* 레슨 목록 탭 */}
          <TabsContent value="lessons" className="space-y-4">
            {createdLessons.length === 0 ? (
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
                              {/* 내 프로필인 경우에만 관리/삭제 버튼 표시 */}
                              {isMyProfile && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      lesson.id &&
                                      handleManageLesson(lesson.id.toString())
                                    }
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
                                </>
                              )}
                              {/* 타인 프로필인 경우에는 상세보기 버튼 */}
                              {!isMyProfile && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    router.push(`/lesson/${lesson.id}`)
                                  }}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  상세보기
                                </Button>
                              )}
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
            {reviews.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p>리뷰가 없습니다.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {reviews?.map((review) => (
                  <Card
                    key={review.reviewId}
                    className="border border-gray-200"
                  >
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

          {/* 내 프로필인 경우에만 표시되는 탭들 */}
          <>
            <TabsContent value="applications" className="space-y-4">
              {applications.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  <p>신청한 레슨이 없습니다.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {applications.map((application) => (
                    <Card
                      key={application.lesson.id}
                      className="border border-gray-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1">
                            <div className="mb-4 flex items-start justify-between">
                              <div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                  {application.lesson.lessonName}
                                </h3>
                                <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>
                                      {application.lesson.addressDetail}
                                    </span>
                                  </div>
                                </div>
                                <div className="mb-3 flex items-center gap-2">
                                  <span className="text-lg font-bold text-green-600">
                                    {application.lesson.price?.toLocaleString()}
                                    원
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                  <p>
                                    시작:{' '}
                                    {application.lesson.startAt
                                      ? new Date(
                                          application.lesson.startAt,
                                        ).toLocaleDateString('ko-KR')
                                      : '미정'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {/* 내 프로필인 경우에만 관리/삭제 버튼 표시 */}
                                {isMyProfile && (
                                  <>
                                    {application.status === 'PENDING' && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          application.lesson.id &&
                                          handleCancelLesson(
                                            application.lesson.id.toString(),
                                          )
                                        }
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        취소
                                      </Button>
                                    )}
                                    {application.status === 'APPROVED' && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          router.push(
                                            `/review/write?lessonId=${application.lesson.id}`,
                                          )
                                        }
                                        className="text-blue-600 hover:text-blue-700"
                                      >
                                        리뷰 작성
                                      </Button>
                                    )}
                                    {/* <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        application.lesson.id &&
                                        handleDeleteLesson(
                                          application.lesson.id.toString(),
                                        )
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      삭제
                                    </Button> */}
                                  </>
                                )}
                                {/* 타인 프로필인 경우에는 상세보기 버튼 */}
                                {!isMyProfile && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      router.push(
                                        `/lesson/${application.lesson.id}`,
                                      )
                                    }}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    상세보기
                                  </Button>
                                )}
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
          </>
        </Tabs>
      </div>
    </div>
  )
}
