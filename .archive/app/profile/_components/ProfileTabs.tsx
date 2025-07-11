'use client'

import { useState } from 'react'
import ProfileCard from './ProfileCard'
import ReviewsSection from './ReviewsSection'
import CouponsSection from './CouponsSection'
import LessonsSection from './LessonsSection'
import PaymentsSection from './PaymentsSection'
import ApplicationsSection from './ApplicationsSection'

interface UserProfile {
  nickname: string
  profileImage: string
  introduction: string
  joinDate: string
  reviewCount: number
  likeCount: number
  averageRating: number
}

interface ProfileTabsProps {
  profile: UserProfile
}

export default function ProfileTabs({ profile }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('내 프로필')

  const tabs = [
    { id: '내 프로필', label: '내 프로필', icon: '👤' },
    { id: '타인 프로필', label: '타인 프로필', icon: '👥' },
  ]

  // 더미 데이터
  const dummyReviews = [
    {
      id: 1,
      name: '김학생',
      rating: 5,
      content: '정말 좋은 레슨이었습니다!',
      date: '2024-01-15',
      lesson: '기초 피아노 레슨',
    },
  ]

  const dummyCoupons = [
    {
      id: 1,
      couponId: 1,
      couponName: '신규 가입 쿠폰',
      discountType: 'percentage' as const,
      discountValue: 20,
      minOrderAmount: 10000,
      expirationDate: '2024-12-31',
      status: 'active' as const,
      issuedAt: '2024-01-01',
      usedAt: undefined,
    },
  ]

  const dummyLessons = [
    {
      id: 1,
      lessonName: '기초 피아노 레슨',
      maxParticipants: 10,
      currentParticipants: 5,
      price: 50000,
      status: 'RECRUITING' as const,
      startAt: '2024-01-15',
      addressDetail: '서울시 강남구',
    },
  ]

  const dummyPayments = [
    {
      id: 1,
      lessonId: 1,
      lessonName: '기초 피아노 레슨',
      amount: 50000,
      status: 'COMPLETED' as const,
      paymentMethod: 'CARD',
      paidAt: '2024-01-10',
    },
  ]

  const dummyApplications = [
    {
      id: 1,
      lessonId: 1,
      lessonName: '기초 피아노 레슨',
      instructorName: '김강사',
      status: 'APPROVED' as const,
      appliedAt: '2024-01-05',
      startDate: '2024-01-15',
      price: 50000,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <ProfileCard userProfile={profile} />

      {/* Tabs Container */}
      <div className="tabs-container">
        <div className="tabs-list">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-trigger ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === '내 프로필' && (
            <div className="space-y-6">
              <ReviewsSection reviews={dummyReviews} />
              <CouponsSection coupons={dummyCoupons} />
              <LessonsSection lessons={dummyLessons} />
              <PaymentsSection payments={dummyPayments} />
              <ApplicationsSection applications={dummyApplications} />
            </div>
          )}

          {activeTab === '타인 프로필' && (
            <div className="space-y-6">
              <ReviewsSection reviews={dummyReviews} />
              <LessonsSection lessons={dummyLessons} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
