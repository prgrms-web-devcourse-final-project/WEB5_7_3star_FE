'use client'

import Container from '@/components/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/ui/PageHeader'
import { Clock, CreditCard, Edit, Gift, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  dummyUser,
  dummyLessonApplications,
  dummyUserCoupons,
  dummyPayments,
  dummyCreatedLessons,
} from '@/lib/dummy-data'
import {
  getCurrentUserProfile,
  getInstructorCreatedLessons,
} from '@/lib/api/profile'
import { getMyLessonApplications } from '@/lib/api/lesson'
import { useAuth } from '@/hooks/useAuth'
import type {
  User,
  LessonApplication,
  MyUserCoupon,
  Payment,
  CreatedLesson,
} from '@/types'
import {
  getApplicationStatusText,
  getCouponStatusText,
  getPaymentStatusText,
  getLessonStatusText,
  formatDate,
  formatPrice,
} from '@/lib/utils'

export default function MyPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('applied')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 프로필 데이터
  const [profile, setProfile] = useState<User | null>(null)

  // 탭별 데이터
  const [appliedLessons, setAppliedLessons] = useState<LessonApplication[]>([])
  const [coupons, setCoupons] = useState<MyUserCoupon[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [myLessons, setMyLessons] = useState<CreatedLesson[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!user?.userId) {
          return
        }

        // 실제 API 호출
        try {
          const profileResponse = await getCurrentUserProfile()
          if (profileResponse.data) {
            setProfile(profileResponse.data as User)
          }
        } catch (err) {
          console.error('프로필 로드 실패:', err)
          setProfile(dummyUser) // 실패 시 더미 데이터
        }

        try {
          const applicationsResponse = await getMyLessonApplications()
          setAppliedLessons(applicationsResponse.data?.lessonApplications || [])
        } catch (err) {
          console.error('신청 레슨 로드 실패:', err)
          setAppliedLessons(dummyLessonApplications) // 실패 시 더미 데이터
        }

        try {
          const createdLessonsResponse = await getInstructorCreatedLessons(
            user.userId,
          )
          setMyLessons(createdLessonsResponse.data?.lessons || [])
        } catch (err) {
          console.error('개설한 레슨 로드 실패:', err)
          setMyLessons([]) // 실패 시 빈 배열
        }
      } catch (err) {
        console.error('마이페이지 데이터 로드 실패:', err)
        setError('데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user?.userId])

  const getStatusBadge = (status: string) => {
    const statusText = getApplicationStatusText(status)

    switch (status) {
      case 'PENDING':
        return (
          <Badge className="border-0 bg-gray-100 text-gray-700">
            {statusText}
          </Badge>
        )
      case 'APPROVED':
        return (
          <Badge className="border-0 bg-blue-100 text-blue-700">
            {statusText}
          </Badge>
        )
      case 'REJECTED':
        return (
          <Badge className="border-0 bg-red-100 text-red-700">
            {statusText}
          </Badge>
        )
      case 'CANCELLED':
        return (
          <Badge className="border-0 bg-gray-100 text-gray-700">
            {statusText}
          </Badge>
        )
      default:
        return (
          <Badge className="border-0 bg-gray-100 text-gray-700">
            {statusText}
          </Badge>
        )
    }
  }

  const getCouponStatusBadge = (status: string) => {
    const statusText = getCouponStatusText(status)

    switch (status) {
      case 'ACTIVE':
        return (
          <Badge className="border-0 bg-green-100 text-green-700">
            {statusText}
          </Badge>
        )
      case 'INACTIVE':
        return (
          <Badge className="border-0 bg-gray-100 text-gray-700">
            {statusText}
          </Badge>
        )
      default:
        return (
          <Badge className="border-0 bg-gray-100 text-gray-700">
            {statusText}
          </Badge>
        )
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusText = getPaymentStatusText(status)

    switch (status) {
      case 'completed':
        return (
          <Badge className="border-0 bg-green-100 text-green-700">
            {statusText}
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="border-0 bg-yellow-100 text-yellow-700">
            {statusText}
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="border-0 bg-red-100 text-red-700">
            {statusText}
          </Badge>
        )
      default:
        return (
          <Badge className="border-0 bg-gray-100 text-gray-700">
            {statusText}
          </Badge>
        )
    }
  }

  const getLessonStatusBadge = (status: string) => {
    const statusText = getLessonStatusText(status)

    switch (status) {
      case 'RECRUITING':
        return (
          <Badge className="border-0 bg-blue-100 text-blue-700">
            {statusText}
          </Badge>
        )
      case 'RECRUITMENT_COMPLETED':
        return (
          <Badge className="border-0 bg-green-100 text-green-700">
            {statusText}
          </Badge>
        )
      case 'IN_PROGRESS':
        return (
          <Badge className="border-0 bg-orange-100 text-orange-700">
            {statusText}
          </Badge>
        )
      case 'COMPLETED':
        return (
          <Badge className="border-0 bg-gray-100 text-gray-700">
            {statusText}
          </Badge>
        )
      case 'CANCELLED':
        return (
          <Badge className="border-0 bg-red-100 text-red-700">
            {statusText}
          </Badge>
        )
      default:
        return (
          <Badge className="border-0 bg-gray-100 text-gray-700">
            {statusText}
          </Badge>
        )
    }
  }

  if (loading) {
    return (
      <Container size="lg" className="relative z-10">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-600">데이터를 불러오는 중...</p>
          </div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="lg" className="relative z-10">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="mb-4 text-red-600">{error}</p>
            <Button onClick={() => window.location.reload()}>다시 시도</Button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container size="lg" className="relative z-10">
      <PageHeader
        title={profile?.name || user?.nickname || '사용자'}
        subtitle="자기소개를 입력해주세요"
        align="left"
        right={
          <Link href="/mypage/edit">
            <Button className="rounded-xl bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
              <Edit className="mr-2 h-4 w-4" />
              프로필 수정
            </Button>
          </Link>
        }
      />

      {/* 사용자 정보 섹션 */}
      <div className="mb-6 rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          사용자 정보
        </h2>
        <div className="space-y-2 text-sm text-gray-600">
          {user?.email && <p>이메일: {user.email}</p>}
          {user?.role && (
            <p>권한: {user.role === 'ADMIN' ? '관리자' : '일반 사용자'}</p>
          )}
        </div>
      </div>

      {/* 탭 영역 */}
      <div className="rounded-2xl border-2 border-gray-100 bg-white shadow-lg">
        {/* 탭 버튼 */}
        <div className="m-4 grid grid-cols-4 gap-1 rounded-xl bg-gray-50 p-1">
          <button
            onClick={() => setActiveTab('applied')}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              activeTab === 'applied'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Clock className="h-4 w-4" />
            신청한 레슨
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              activeTab === 'payment'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            결제내역
          </button>
          <button
            onClick={() => setActiveTab('mylessons')}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              activeTab === 'mylessons'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Users className="h-4 w-4" />
            내가 개설한 레슨
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              activeTab === 'coupons'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Gift className="h-4 w-4" />내 쿠폰
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="p-6">
          {activeTab === 'applied' && (
            <div className="space-y-4">
              {appliedLessons.length > 0 ? (
                appliedLessons.map((lesson) => (
                  <div
                    key={lesson.lessonApplicationId}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      {/* 좌측 정보 */}
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          레슨 ID: {lesson.lessonId}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <strong>신청일:</strong>{' '}
                            {formatDate(lesson.appliedAt)}
                          </p>
                          <p>
                            <strong>신청 ID:</strong>{' '}
                            {lesson.lessonApplicationId}
                          </p>
                        </div>
                      </div>

                      {/* 우측 정보 */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex justify-end">
                          {getStatusBadge(lesson.status)}
                        </div>
                        {lesson.status === 'APPROVED' && (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              취소
                            </Button>
                            <Button className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] text-white">
                              결제하기
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  신청한 레슨이 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-4">
              <div className="mb-4">
                <select className="rounded-lg border-2 border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none">
                  <option value="1month">최근 1개월</option>
                  <option value="3months">최근 3개월</option>
                  <option value="6months">최근 6개월</option>
                  <option value="1year">최근 1년</option>
                </select>
              </div>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      {/* 좌측 정보 */}
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          {payment.lesson.title}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <strong>결제금액:</strong>{' '}
                            {formatPrice(payment.amount)}
                          </p>
                          <p>
                            <strong>결제방법:</strong> {payment.paymentMethod}
                          </p>
                          <p>
                            <strong>결제일:</strong>{' '}
                            {payment.createdAt
                              ? formatDate(payment.createdAt)
                              : '-'}
                          </p>
                        </div>
                      </div>

                      {/* 우측 정보 */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex justify-end">
                          {getPaymentStatusBadge(payment.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  결제내역이 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === 'mylessons' && (
            <div className="space-y-4">
              {myLessons.length > 0 ? (
                myLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      {/* 좌측 정보 */}
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          {lesson.lessonName}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <strong>일시:</strong> {formatDate(lesson.startAt)}
                          </p>
                          <p>
                            <strong>참가자:</strong>{' '}
                            {lesson.currentParticipants}/
                            {lesson.maxParticipants}명
                          </p>
                          <p>
                            <strong>가격:</strong> {formatPrice(lesson.price)}
                          </p>
                        </div>
                      </div>

                      {/* 우측 정보 */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex justify-end">
                          {getLessonStatusBadge(lesson.status)}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">수정</Button>
                          <Button className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] text-white">
                            관리
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  개설한 레슨이 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="space-y-4">
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <div
                    key={coupon.couponId}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      {/* 좌측 정보 */}
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          {coupon.couponName}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <strong>할인:</strong> {coupon.discountPrice}
                          </p>
                          <p>
                            <strong>최소 주문금액:</strong>{' '}
                            {formatPrice(coupon.minOrderPrice)}
                          </p>
                          <p>
                            <strong>만료일:</strong>{' '}
                            {formatDate(coupon.expirationDate)}
                          </p>
                        </div>
                      </div>

                      {/* 우측 정보 */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex justify-end">
                          {getCouponStatusBadge(coupon.status)}
                        </div>
                        {coupon.status === 'ACTIVE' && (
                          <Button className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] text-white">
                            사용하기
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  보유한 쿠폰이 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
