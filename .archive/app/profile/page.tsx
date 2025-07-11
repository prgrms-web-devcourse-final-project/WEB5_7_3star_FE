import ProfileTabs from './_components/ProfileTabs'

// 더미 프로필 데이터
const dummyProfile = {
  nickname: '김강사',
  profileImage: '/placeholder.svg',
  introduction:
    '안녕하세요! 피아노를 가르치는 김강사입니다. 10년간의 경험을 바탕으로 체계적이고 재미있는 레슨을 제공합니다.',
  joinDate: '2023-01-15',
  reviewCount: 25,
  likeCount: 42,
  averageRating: 4.8,
}

export default async function ProfilePage() {
  return (
    <>
      <ProfileTabs profile={dummyProfile} />
    </>
  )
}
