'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Container from '@/components/Container'
import {
  Edit,
  Calendar,
  MessageSquare,
  Heart,
  Star,
  Clock,
  CreditCard,
  Users,
  Gift,
} from 'lucide-react'

// 더미 데이터
const dummyUserProfile = {
  name: '김코치',
  intro: '10년 경력의 수영 전문 강사입니다',
  avatar: '/placeholder-user.jpg',
  joinDate: '2023.03.15',
  reviewCount: 127,
  likeCount: 89,
  rating: 4.8,
}

const dummyAppliedLessons = [
  {
    id: '1',
    title: '초급자를 위한 수영 레슨',
    instructor: '박강사',
    date: '2024.01.15 14:00-16:00',
    location: '강남구 수영장',
    price: 50000,
    status: 'pending',
    statusText: '승인대기',
  },
  {
    id: '2',
    title: '테니스 기초반',
    instructor: '이코치',
    date: '2024.01.20 10:00-12:00',
    location: '서초구 테니스장',
    price: 40000,
    status: 'approved',
    statusText: '승인완료',
  },
  {
    id: '3',
    title: '요가 힐링 클래스',
    instructor: '정선생',
    date: '2024.01.25 19:00-20:30',
    location: '강남구 요가스튜디오',
    price: 30000,
    status: 'paid',
    statusText: '결제완료',
  },
]

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('applied')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="border-0 bg-gray-100 text-gray-700">승인대기</Badge>
        )
      case 'approved':
        return (
          <Badge className="border-0 bg-blue-100 text-blue-700">승인완료</Badge>
        )
      case 'paid':
        return (
          <Badge className="border-0 bg-purple-100 text-purple-700">
            결제완료
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* 배경 장식 요소 */}
      <div className="fixed top-24 -left-12 h-48 w-48 rounded-full bg-[#6B73FF]/8 opacity-60 blur-[60px]"></div>
      <div className="fixed top-72 -right-20 h-36 w-36 rounded-full bg-[#9F7AEA]/6 opacity-50 blur-[60px]"></div>
      <div className="fixed bottom-48 left-1/4 h-44 w-44 rounded-full bg-[#6B73FF]/5 opacity-40 blur-[60px]"></div>

      <Container size="lg" className="relative z-10">
        {/* 프로필 카드 */}
        <div className="mb-8 rounded-2xl border-2 border-gray-100 bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* 프로필 이미지 */}
            <div className="flex justify-center">
              <Avatar className="h-32 w-32 border-4 border-blue-100">
                <AvatarImage
                  src={dummyUserProfile.avatar}
                  alt="프로필 이미지"
                />
                <AvatarFallback className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] text-4xl font-bold text-white">
                  {dummyUserProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* 프로필 정보 */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <h1 className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] bg-clip-text text-3xl font-bold text-transparent">
                    {dummyUserProfile.name}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {dummyUserProfile.intro}
                  </p>
                </div>
                <Button className="rounded-xl bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                  <Edit className="mr-2 h-4 w-4" />
                  프로필 수정
                </Button>
              </div>

              {/* 통계 정보 */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                <div className="text-center">
                  <div className="mb-1 flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>가입일</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {dummyUserProfile.joinDate}
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-1 flex items-center justify-center gap-1 text-sm text-gray-600">
                    <MessageSquare className="h-4 w-4" />
                    <span>리뷰</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {dummyUserProfile.reviewCount}개
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-1 flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Heart className="h-4 w-4" />
                    <span>좋아요</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {dummyUserProfile.likeCount}개
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-1 flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>평점</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {dummyUserProfile.rating}/5.0
                  </p>
                </div>
              </div>
            </div>
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
                {dummyAppliedLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      {/* 좌측 정보 */}
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          {lesson.title}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <strong>강사:</strong> {lesson.instructor}
                          </p>
                          <p>
                            <strong>일시:</strong> {lesson.date}
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
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex justify-end">
                          {getStatusBadge(lesson.status)}
                        </div>
                        {lesson.status === 'approved' && (
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
                ))}
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
                <div className="py-8 text-center text-gray-500">
                  결제내역이 없습니다.
                </div>
              </div>
            )}

            {activeTab === 'mylessons' && (
              <div className="py-8 text-center text-gray-500">
                개설한 레슨이 없습니다.
              </div>
            )}

            {activeTab === 'coupons' && (
              <div className="py-8 text-center text-gray-500">
                보유한 쿠폰이 없습니다.
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
