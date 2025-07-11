'use client'

import { Edit, Star, Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  nickname: string
  profileImage: string
  introduction: string
  joinDate: string
  reviewCount: number
  likeCount: number
  averageRating: number
}

interface ProfileCardProps {
  userProfile: UserProfile
}

export default function ProfileCard({ userProfile }: ProfileCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="service-card">
      <div className="flex items-start gap-6">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0">
          <div className="avatar">
            <img
              src={userProfile.profileImage}
              alt={userProfile.nickname}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* 프로필 정보 */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                {userProfile.nickname}
              </h1>
              <div className="mb-2 flex items-center gap-4 text-sm text-gray-500">
                <span>가입일: {userProfile.joinDate}</span>
                <div className="flex items-center gap-1">
                  {renderStars(userProfile.averageRating)}
                  <span>({userProfile.reviewCount}개 리뷰)</span>
                </div>
              </div>
            </div>
            <Link
              href="/profile/edit"
              className="edit-btn flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              프로필 수정
            </Link>
          </div>

          <p className="mb-4 leading-relaxed text-gray-700">
            {userProfile.introduction}
          </p>

          {/* 통계 */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-gray-700">{userProfile.likeCount}개</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700">{userProfile.reviewCount}개</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
