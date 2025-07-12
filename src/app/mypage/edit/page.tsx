import ProfileForm from '@/components/mypage/profile-form'

// 서버에서 사용자 데이터를 가져오는 함수 (실제 구현에서는 API 호출)
async function getUserProfile() {
  // 실제로는 데이터베이스나 API에서 사용자 데이터를 가져옵니다
  return {
    name: '김운동',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    birthDate: '1990-01-01',
    gender: 'male',
    location: '강남구',
    bio: '운동을 좋아하는 사람입니다. 건강한 라이프스타일을 추구합니다.',
    interests: ['요가', '필라테스', '수영'],
    experience: 'intermediate',
  }
}

export default async function ProfileEditPage() {
  const userProfile = await getUserProfile()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-4xl font-bold text-transparent">
            프로필 설정
          </h1>
          <p className="mt-3 text-gray-600">
            개인 정보를 수정하고 프로필을 업데이트하세요
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]"></div>
        </div>

        <ProfileForm initialData={userProfile} />
      </div>
    </div>
  )
}
