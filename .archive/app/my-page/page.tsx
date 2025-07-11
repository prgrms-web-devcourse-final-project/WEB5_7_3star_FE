'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Edit,
  CreditCard,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'

// 샘플 데이터
const userProfile = {
  nickname: '김코치',
  email: 'coach.kim@example.com',
  profileImage: '/placeholder.svg?height=120&width=120',
  introduction: '10년 경력의 수영 전문 강사입니다',
  joinDate: '2023.03.15',
  reviewCount: 127,
  likeCount: 89,
  averageRating: 4.8,
}

const appliedLessons = [
  {
    id: 1,
    title: '초급자를 위한 수영 레슨',
    instructor: '박강사',
    date: '2024.01.15',
    time: '14:00-16:00',
    price: 50000,
    status: '승인대기',
    location: '강남구 수영장',
  },
  {
    id: 2,
    title: '테니스 기초반',
    instructor: '이코치',
    date: '2024.01.20',
    time: '10:00-12:00',
    price: 40000,
    status: '승인완료',
    location: '서초구 테니스장',
  },
  {
    id: 3,
    title: '요가 힐링 클래스',
    instructor: '정선생',
    date: '2024.01.25',
    time: '19:00-20:30',
    price: 30000,
    status: '결제완료',
    location: '강남구 요가스튜디오',
  },
]

const paymentHistory = [
  {
    id: 1,
    title: '요가 힐링 클래스',
    date: '2024.01.10',
    amount: 30000,
    status: '결제완료',
    paymentMethod: '카드',
  },
  {
    id: 2,
    title: '수영 개인레슨',
    date: '2024.01.05',
    amount: 80000,
    status: '환불처리',
    paymentMethod: '카드',
  },
]

const myLessons = [
  {
    id: 1,
    title: '프리스타일 수영 마스터 클래스',
    date: '2024.02.01',
    participants: 8,
    maxParticipants: 10,
    status: '모집중',
    price: 60000,
  },
  {
    id: 2,
    title: '초보자 수영 기초반',
    date: '2024.01.28',
    participants: 12,
    maxParticipants: 12,
    status: '모집완료',
    price: 45000,
  },
]

const myCoupons = [
  {
    id: 1,
    title: '신규 회원 할인',
    discount: '20%',
    minAmount: 30000,
    expiryDate: '2024.03.31',
    status: '사용가능',
  },
  {
    id: 2,
    title: '레슨 할인 쿠폰',
    discount: '5000원',
    minAmount: 50000,
    expiryDate: '2024.02.15',
    status: '사용가능',
  },
  {
    id: 3,
    title: 'VIP 회원 혜택',
    discount: '15%',
    minAmount: 100000,
    expiryDate: '2024.01.20',
    status: '만료됨',
  },
]

export default function MyPage() {
  const [paymentPeriod, setPaymentPeriod] = useState('1month')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '승인대기':
        return (
          <Badge
            variant="outline"
            className="border-gray-300 bg-gray-50 text-gray-600"
          >
            <AlertCircle className="mr-1 h-3 w-3" />
            승인대기
          </Badge>
        )
      case '승인완료':
        return (
          <Badge
            variant="outline"
            className="border-blue-300 bg-blue-50 text-blue-600"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            승인완료
          </Badge>
        )
      case '결제완료':
        return (
          <Badge
            variant="outline"
            className="border-purple-300 bg-purple-50 text-purple-600"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            결제완료
          </Badge>
        )
      case '환불처리':
        return (
          <Badge
            variant="outline"
            className="border-gray-300 bg-gray-50 text-gray-600"
          >
            <XCircle className="mr-1 h-3 w-3" />
            환불처리
          </Badge>
        )
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
      case '사용가능':
        return (
          <Badge
            variant="outline"
            className="border-blue-300 bg-blue-50 text-blue-600"
          >
            사용가능
          </Badge>
        )
      case '만료됨':
        return (
          <Badge
            variant="outline"
            className="border-gray-300 bg-gray-50 text-gray-600"
          >
            만료됨
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      {/* 배경 장식 요소 */}
      <div className="pointer-events-none fixed top-20 left-[-50px] h-48 w-48 rounded-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 blur-3xl" />
      <div className="pointer-events-none fixed top-72 right-[-80px] h-36 w-36 rounded-full bg-gradient-to-r from-purple-100/20 to-blue-100/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-48 left-1/4 h-44 w-44 rounded-full bg-gradient-to-r from-blue-100/20 to-purple-100/20 blur-3xl" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            마이페이지
          </h1>
          <p className="text-gray-600">내 정보와 활동 내역을 확인하세요</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* 프로필 카드 */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-gray-100 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="border-gradient-to-r mx-auto mb-4 h-24 w-24 border-4 from-blue-200 to-purple-200">
                    <AvatarImage
                      src={userProfile.profileImage}
                      alt={userProfile.nickname}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-2xl font-bold">
                      {userProfile.nickname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mb-1 text-xl font-bold text-gray-800">
                    {userProfile.nickname}
                  </h2>
                  <p className="mb-4 text-sm text-gray-600">
                    {userProfile.email}
                  </p>
                  <p className="mb-6 text-sm text-gray-700">
                    {userProfile.introduction}
                  </p>

                  {/* 통계 정보 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">가입일</span>
                      <span className="font-medium">
                        {userProfile.joinDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">리뷰</span>
                      <span className="font-medium">
                        {userProfile.reviewCount}개
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">좋아요</span>
                      <span className="font-medium">
                        {userProfile.likeCount}개
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">평점</span>
                      <span className="font-medium">
                        {userProfile.averageRating}/5.0
                      </span>
                    </div>
                  </div>

                  <Button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Edit className="mr-2 h-4 w-4" />
                    프로필 수정
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="applied" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="applied">신청한 레슨</TabsTrigger>
                <TabsTrigger value="my-lessons">내 레슨</TabsTrigger>
                <TabsTrigger value="payments">결제 내역</TabsTrigger>
                <TabsTrigger value="coupons">내 쿠폰</TabsTrigger>
                <TabsTrigger value="settings">설정</TabsTrigger>
              </TabsList>

              {/* 신청한 레슨 */}
              <TabsContent value="applied" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    신청한 레슨
                  </h3>
                  <span className="text-sm text-gray-600">
                    {appliedLessons.length}개
                  </span>
                </div>
                <div className="space-y-4">
                  {appliedLessons.map((lesson) => (
                    <Card
                      key={lesson.id}
                      className="border border-gray-200 transition-shadow hover:shadow-md"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1">
                            <div className="mb-3 flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-gray-800">
                                {lesson.title}
                              </h4>
                              {getStatusBadge(lesson.status)}
                            </div>
                            <div className="space-y-2 text-gray-600">
                              <p>
                                <strong>강사:</strong> {lesson.instructor}
                              </p>
                              <p>
                                <strong>일시:</strong> {lesson.date}{' '}
                                {lesson.time}
                              </p>
                              <p>
                                <strong>장소:</strong> {lesson.location}
                              </p>
                              <p>
                                <strong>가격:</strong>{' '}
                                {lesson.price.toLocaleString()}원
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              상세보기
                            </Button>
                            {lesson.status === '승인완료' && (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-500 to-purple-600"
                              >
                                결제하기
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 내 레슨 */}
              <TabsContent value="my-lessons" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    내 레슨
                  </h3>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    레슨 등록
                  </Button>
                </div>
                <div className="space-y-4">
                  {myLessons.map((lesson) => (
                    <Card
                      key={lesson.id}
                      className="border border-gray-200 transition-shadow hover:shadow-md"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1">
                            <div className="mb-3 flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-gray-800">
                                {lesson.title}
                              </h4>
                              {getStatusBadge(lesson.status)}
                            </div>
                            <div className="space-y-2 text-gray-600">
                              <p>
                                <strong>일시:</strong> {lesson.date}
                              </p>
                              <p>
                                <strong>참가자:</strong> {lesson.participants}/
                                {lesson.maxParticipants}명
                              </p>
                              <p>
                                <strong>가격:</strong>{' '}
                                {lesson.price.toLocaleString()}원
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              수정
                            </Button>
                            <Button variant="outline" size="sm">
                              관리
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 결제 내역 */}
              <TabsContent value="payments" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    결제 내역
                  </h3>
                  <div className="flex items-center gap-4">
                    <Select
                      value={paymentPeriod}
                      onValueChange={setPaymentPeriod}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1month">1개월</SelectItem>
                        <SelectItem value="3months">3개월</SelectItem>
                        <SelectItem value="6months">6개월</SelectItem>
                        <SelectItem value="1year">1년</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <Card
                      key={payment.id}
                      className="border border-gray-200 transition-shadow hover:shadow-md"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1">
                            <div className="mb-3 flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-gray-800">
                                {payment.title}
                              </h4>
                              {getStatusBadge(payment.status)}
                            </div>
                            <div className="space-y-2 text-gray-600">
                              <p>
                                <strong>결제일:</strong> {payment.date}
                              </p>
                              <p>
                                <strong>결제수단:</strong>{' '}
                                {payment.paymentMethod}
                              </p>
                              <p>
                                <strong>금액:</strong>{' '}
                                {payment.amount.toLocaleString()}원
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              상세보기
                            </Button>
                            {payment.status === '결제완료' && (
                              <Button variant="outline" size="sm">
                                환불신청
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 내 쿠폰 */}
              <TabsContent value="coupons" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    내 쿠폰
                  </h3>
                  <span className="text-sm text-gray-600">
                    {myCoupons.length}개
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {myCoupons.map((coupon) => (
                    <Card
                      key={coupon.id}
                      className="border border-gray-200 transition-shadow hover:shadow-md"
                    >
                      <CardContent className="p-6">
                        <div className="mb-3 flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {coupon.title}
                          </h4>
                          {getStatusBadge(coupon.status)}
                        </div>
                        <div className="space-y-2 text-gray-600">
                          <p>
                            <strong>할인:</strong> {coupon.discount}
                          </p>
                          <p>
                            <strong>최소금액:</strong>{' '}
                            {coupon.minAmount.toLocaleString()}원
                          </p>
                          <p>
                            <strong>만료일:</strong> {coupon.expiryDate}
                          </p>
                        </div>
                        {coupon.status === '사용가능' && (
                          <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600">
                            사용하기
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 설정 */}
              <TabsContent value="settings" className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">설정</h3>
                <div className="space-y-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <h4 className="mb-4 text-lg font-semibold text-gray-800">
                        계정 설정
                      </h4>
                      <div className="space-y-4">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          프로필 수정
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          결제 수단 관리
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          알림 설정
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
