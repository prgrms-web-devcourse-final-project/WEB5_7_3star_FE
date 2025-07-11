import ProfileTabs from '../_components/ProfileTabs'
import type { Lesson, UserProfile } from '@/types/profile'

interface Review {
  id: number
  name: string
  date: string
  rating: number
  content: string
  lesson: string
}

export default async function ProfilePage({
  params,
}: {
  params: { userId: string }
}) {
  // params 사용을 위해 await만 호출
  await Promise.resolve(params)
  // 샘플 데이터 (타입에 맞게 수정)
  const profile: UserProfile = {
    userId: 2,
    nickname: '킹왕짱',
    profileImage: '',
    intro: '저는 헬스를 좋아하는 임창인입니다.',
    reviewCount: 42,
    rating: 4.5,
    joinDate: '2023.03.15',
    likeCount: 89,
  }
  const lessons: Lesson[] = []
  const reviews: Review[] = []

  return (
    <div className="min-h-screen bg-white">
      {/* 배경 장식 요소 - Figma Export 스타일 */}
      <div className="bg-decoration bg-decoration-1" />
      <div className="bg-decoration bg-decoration-2" />
      <div className="bg-decoration bg-decoration-3" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8">
        <ProfileTabs
          profile={profile}
          lessons={lessons}
          reviews={reviews}
          tabType="other"
        />
      </div>
    </div>
  )
}
