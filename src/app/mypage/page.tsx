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
                      {userProfile.averageRating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 탭 메뉴 */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-xl bg-gray-100 p-1">
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              신청 레슨
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              결제 내역
            </TabsTrigger>
            <TabsTrigger
              value="my-lessons"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              내 레슨
            </TabsTrigger>
            <TabsTrigger
              value="coupons"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              쿠폰
            </TabsTrigger>
          </TabsList>

          {/* 신청 레슨 탭 */}
          <TabsContent value="applications" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">신청한 레슨</h2>
              <Select value={paymentPeriod} onValueChange={setPaymentPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1개월</SelectItem>
                  <SelectItem value="3months">3개월</SelectItem>
                  <SelectItem value="6months">6개월</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {appliedLessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="border border-gray-200 transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {lesson.title}
                          </h3>
                          {getStatusBadge(lesson.status)}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>강사: {lesson.instructor}</p>
                          <p>
                            날짜: {lesson.date} {lesson.time}
                          </p>
                          <p>위치: {lesson.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {lesson.price.toLocaleString()}원
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          상세보기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 결제 내역 탭 */}
          <TabsContent value="payments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">결제 내역</h2>
              <Select value={paymentPeriod} onValueChange={setPaymentPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1개월</SelectItem>
                  <SelectItem value="3months">3개월</SelectItem>
                  <SelectItem value="6months">6개월</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {paymentHistory.map((payment) => (
                <Card
                  key={payment.id}
                  className="border border-gray-200 transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {payment.title}
                          </h3>
                          {getStatusBadge(payment.status)}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>결제일: {payment.date}</p>
                          <p>결제수단: {payment.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {payment.amount.toLocaleString()}원
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          상세보기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 내 레슨 탭 */}
          <TabsContent value="my-lessons" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">내 레슨</h2>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                레슨 등록
              </Button>
            </div>

            <div className="grid gap-4">
              {myLessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="border border-gray-200 transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {lesson.title}
                          </h3>
                          {getStatusBadge(lesson.status)}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>날짜: {lesson.date}</p>
                          <p>
                            참가자: {lesson.participants}/
                            {lesson.maxParticipants}명
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {lesson.price.toLocaleString()}원
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          관리하기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 쿠폰 탭 */}
          <TabsContent value="coupons" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">내 쿠폰</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                쿠폰 받기
              </Button>
            </div>

            <div className="grid gap-4">
              {myCoupons.map((coupon) => (
                <Card
                  key={coupon.id}
                  className="border border-gray-200 transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {coupon.title}
                          </h3>
                          {getStatusBadge(coupon.status)}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>할인: {coupon.discount}</p>
                          <p>
                            최소 주문금액: {coupon.minAmount.toLocaleString()}원
                          </p>
                          <p>만료일: {coupon.expiryDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          disabled={coupon.status === '만료됨'}
                        >
                          사용하기
                        </Button>
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
