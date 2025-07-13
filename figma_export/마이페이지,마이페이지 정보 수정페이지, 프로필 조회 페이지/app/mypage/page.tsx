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
  Calendar,
  Heart,
  MessageSquare,
  Star,
  Edit,
  Clock,
  CreditCard,
  Users,
  Gift,
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
    <div className="min-h-screen bg-white">
      {/* 배경 장식 요소 */}
      <div className="pointer-events-none fixed top-24 left-[-50px] h-48 w-48 rounded-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 blur-3xl" />
      <div className="pointer-events-none fixed top-72 right-[-80px] h-36 w-36 rounded-full bg-gradient-to-r from-purple-100/20 to-blue-100/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-48 left-1/4 h-44 w-44 rounded-full bg-gradient-to-r from-blue-100/20 to-purple-100/20 blur-3xl" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8">
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
                  <Button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 text-white transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-purple-700">
                    <Edit className="mr-2 h-4 w-4" />
                    프로필 수정
                  </Button>
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

        {/* 탭 영역 */}
        <Tabs defaultValue="applied" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-4 rounded-lg bg-gray-50 p-1">
            <TabsTrigger
              value="applied"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Clock className="h-4 w-4" />
              신청한 레슨
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <CreditCard className="h-4 w-4" />
              결제내역
            </TabsTrigger>
            <TabsTrigger
              value="mylessons"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Users className="h-4 w-4" />
              내가 개설한 레슨
            </TabsTrigger>
            <TabsTrigger
              value="coupons"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Gift className="h-4 w-4" />내 쿠폰
            </TabsTrigger>
          </TabsList>

          {/* 신청한 레슨 */}
          <TabsContent value="applied">
            <div className="space-y-4">
              {appliedLessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="border border-gray-200 transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* 좌측 정보 */}
                      <div className="flex-1">
                        <h3 className="mb-3 text-xl font-semibold text-gray-800">
                          {lesson.title}
                        </h3>
                        <div className="space-y-2 text-gray-600">
                          <p>
                            <strong>강사:</strong> {lesson.instructor}
                          </p>
                          <p>
                            <strong>일시:</strong> {lesson.date} {lesson.time}
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

                      {/* 우측 정보 */}
                      <div className="flex min-w-fit flex-col items-end justify-between gap-4">
                        {/* 우측 상단: 뱃지 */}
                        <div>{getStatusBadge(lesson.status)}</div>

                        {/* 우측 하단: 버튼들 */}
                        <div className="flex gap-2">
                          {lesson.status === '승인완료' && (
                            <>
                              <Button
                                variant="outline"
                                className="border-red-200 bg-transparent text-red-600 hover:bg-red-50"
                              >
                                취소
                              </Button>
                              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                                결제하기
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 결제내역 */}
          <TabsContent value="payment">
            <div className="mb-6">
              <Select value={paymentPeriod} onValueChange={setPaymentPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">최근 1개월</SelectItem>
                  <SelectItem value="3months">최근 3개월</SelectItem>
                  <SelectItem value="6months">최근 6개월</SelectItem>
                  <SelectItem value="1year">최근 1년</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <Card key={payment.id} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* 좌측 정보 */}
                      <div className="flex-1">
                        <h3 className="mb-3 text-xl font-semibold text-gray-800">
                          {payment.title}
                        </h3>
                        <div className="space-y-1 text-gray-600">
                          <p>
                            <strong>결제일:</strong> {payment.date}
                          </p>
                          <p>
                            <strong>결제방법:</strong> {payment.paymentMethod}
                          </p>
                        </div>
                      </div>

                      {/* 우측 정보 */}
                      <div className="flex min-w-fit flex-col items-end justify-between gap-4">
                        {/* 우측 상단: 뱃지 */}
                        <div>{getStatusBadge(payment.status)}</div>

                        {/* 우측 하단: 금액 */}
                        <div>
                          <p className="text-2xl font-bold text-gray-800">
                            {payment.amount.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 내가 개설한 레슨 */}
          <TabsContent value="mylessons">
            <div className="space-y-4">
              {myLessons.map((lesson) => (
                <Card key={lesson.id} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* 좌측 정보 */}
                      <div className="flex-1">
                        <h3 className="mb-3 text-xl font-semibold text-gray-800">
                          {lesson.title}
                        </h3>
                        <div className="space-y-2 text-gray-600">
                          <p>
                            <strong>일시:</strong> {lesson.date}
                          </p>
                          <p>
                            <strong>참여자:</strong> {lesson.participants}/
                            {lesson.maxParticipants}명
                          </p>
                          <p>
                            <strong>가격:</strong>{' '}
                            {lesson.price.toLocaleString()}원
                          </p>
                        </div>
                      </div>

                      {/* 우측 정보 */}
                      <div className="flex min-w-fit flex-col items-end justify-between gap-4">
                        {/* 우측 상단: 뱃지 */}
                        <div>{getStatusBadge(lesson.status)}</div>

                        {/* 우측 하단: 버튼들 */}
                        <div className="flex gap-2">
                          <Button variant="outline">수정</Button>
                          <Button
                            variant="outline"
                            className="border-red-200 bg-transparent text-red-600 hover:bg-red-50"
                          >
                            삭제
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 내 쿠폰 */}
          <TabsContent value="coupons">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myCoupons.map((coupon) => (
                <Card
                  key={coupon.id}
                  className={`border-2 ${coupon.status === '사용가능' ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50' : 'border-gray-200 bg-gray-50'}`}
                >
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {/* 상단: 제목과 뱃지 */}
                      <div className="flex items-start justify-between">
                        <h3 className="flex-1 text-lg font-semibold text-gray-800">
                          {coupon.title}
                        </h3>
                        <div>{getStatusBadge(coupon.status)}</div>
                      </div>

                      {/* 중앙: 할인 정보 */}
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] bg-clip-text text-3xl font-bold text-transparent">
                          {coupon.discount}
                        </div>
                        <div className="mt-3 space-y-1 text-sm text-gray-600">
                          <p>
                            최소 주문 금액: {coupon.minAmount.toLocaleString()}
                            원
                          </p>
                          <p>유효기간: {coupon.expiryDate}</p>
                        </div>
                      </div>
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
