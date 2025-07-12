import ListFilter from '@/components/lesson/list-filter'
import ListItem from '@/components/lesson/list-item'

// 서버에서 데이터를 가져오는 함수 (실제 구현에서는 API 호출)
async function getLessons() {
  // 실제로는 데이터베이스나 API에서 데이터를 가져옵니다
  return [
    {
      id: 1,
      title: '요가 기초반 - 몸과 마음의 균형',
      trainer: '김요가 강사',
      category: '요가',
      location: '강남구',
      price: 25000,
      rating: 4.8,
      reviewCount: 127,
      image: '/placeholder.jpg',
      description:
        '초보자를 위한 요가 기초 과정입니다. 몸과 마음의 균형을 찾아보세요.',
      schedule: '월, 수, 금 오후 2:00-3:30',
      isLiked: false,
      isPopular: true,
    },
    {
      id: 2,
      title: '필라테스 중급반',
      trainer: '박필라 강사',
      category: '필라테스',
      location: '서초구',
      price: 30000,
      rating: 4.9,
      reviewCount: 89,
      image: '/placeholder.jpg',
      description: '코어 강화와 자세 교정에 특화된 필라테스 레슨입니다.',
      schedule: '화, 목 오전 10:00-11:00',
      isLiked: true,
      isPopular: false,
    },
    {
      id: 3,
      title: '홈트레이닝 개인레슨',
      trainer: '이홈트 강사',
      category: '홈트레이닝',
      location: '온라인',
      price: 40000,
      rating: 4.7,
      reviewCount: 156,
      image: '/placeholder.jpg',
      description: '집에서도 효과적인 운동을 할 수 있도록 도와드립니다.',
      schedule: '매일 오후 7:00-8:00',
      isLiked: false,
      isPopular: true,
    },
    {
      id: 4,
      title: '수영 기초반',
      trainer: '최수영 강사',
      category: '수영',
      location: '강남구',
      price: 35000,
      rating: 4.6,
      reviewCount: 203,
      image: '/placeholder.jpg',
      description: '수영을 처음 배우시는 분들을 위한 기초 과정입니다.',
      schedule: '토, 일 오후 3:00-4:00',
      isLiked: false,
      isPopular: false,
    },
    {
      id: 5,
      title: '크로스핏 초급반',
      trainer: '정크로스 강사',
      category: '크로스핏',
      location: '서초구',
      price: 45000,
      rating: 4.5,
      reviewCount: 78,
      image: '/placeholder.jpg',
      description: '고강도 인터벌 트레이닝으로 체력을 극대화하세요.',
      schedule: '월, 수, 금 오후 6:00-7:00',
      isLiked: true,
      isPopular: true,
    },
    {
      id: 6,
      title: '복싱 기초반',
      trainer: '김복싱 강사',
      category: '복싱',
      location: '강남구',
      price: 28000,
      rating: 4.4,
      reviewCount: 95,
      image: '/placeholder.jpg',
      description: '기본 자세부터 차근차근 배우는 복싱 레슨입니다.',
      schedule: '화, 목 오후 5:00-6:00',
      isLiked: false,
      isPopular: false,
    },
  ]
}

export default async function LessonListPage() {
  const lessons = await getLessons()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-4xl font-bold text-transparent">
            레슨 목록
          </h1>
          <p className="mt-3 text-gray-600">
            다양한 레슨을 둘러보고 원하는 것을 선택해보세요
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]"></div>
        </div>

        {/* 검색 및 필터 */}
        <div className="mb-8">
          <ListFilter />
        </div>

        {/* 검색 결과 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <ListItem key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  )
}
