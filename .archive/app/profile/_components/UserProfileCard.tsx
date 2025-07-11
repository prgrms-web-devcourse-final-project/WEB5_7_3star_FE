'use client'

import { UserProfile } from '@/types/profile'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageSquare, Calendar, Star } from 'lucide-react'
import Link from 'next/link'

interface UserProfileCardProps {
  profile: UserProfile
}

export default function UserProfileCard({ profile }: UserProfileCardProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0">
          <Avatar className="border-gradient-to-r h-32 w-32 border-4 from-blue-200 to-purple-200">
            <AvatarImage src={profile.profileImage} alt={profile.nickname} />
            <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-2xl font-bold">
              {profile.nickname.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* 프로필 정보 */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-800">
                {profile.nickname}
              </h1>
              <p className="text-lg text-gray-700">{profile.intro}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/reviews/${profile.userId}`}>
                <Button variant="outline" className="bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  리뷰 보기
                </Button>
              </Link>
              <Button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 text-white transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-purple-700">
                <Heart className="mr-2 h-4 w-4" />
                좋아요
              </Button>
            </div>
          </div>
          {/* 통계 정보 */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-4">
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">리뷰</span>
              </div>
              <p className="font-semibold text-gray-800">
                {profile.reviewCount}개
              </p>
            </div>
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-gray-600">
                <Star className="h-4 w-4" />
                <span className="text-sm">평점</span>
              </div>
              <p className="font-semibold text-gray-800">
                {profile.rating}/5.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
