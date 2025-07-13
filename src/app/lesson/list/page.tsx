'use client'

import ListItem from '@/components/lesson/list-item'
import Container from '@/components/Container'
import ListFilter from '@/components/lesson/list-filter'

// 더미 데이터
const dummyLessons = [
  {
    id: '1',
    title: '초보자를 위한 수영 레슨 - 기초부터 차근차근',
    instructor: {
      name: '김수영',
      avatar: '/placeholder-user.jpg',
      rating: 4.8,
      reviewCount: 24,
    },
    category: '수영',
    location: '서울특별시 강남구 역삼동',
    price: 120000,
    duration: '60분',
    maxStudents: 10,
    currentStudents: 6,
    schedule: '매주 화, 목 19:00-20:00',
    tags: ['1:1 레슨', '신규 강사'],
    image: '/placeholder.jpg',
    isLiked: false,
    viewCount: 234,
  },
  {
    id: '2',
    title: '프리미엄 요가 클래스 - 몸과 마음의 균형',
    instructor: {
      name: '이요가',
      avatar: '/placeholder-user.jpg',
      rating: 4.9,
      reviewCount: 38,
    },
    category: '요가',
    location: '서울특별시 강남구 청담동',
    price: 180000,
    duration: '60분',
    maxStudents: 8,
    currentStudents: 4,
    schedule: '매주 월, 수, 금 18:30-19:30',
    tags: ['그룹 레슨', '인기 강사'],
    image: '/placeholder.jpg',
    isLiked: true,
    viewCount: 156,
  },
  {
    id: '3',
    title: '코어 강화 필라테스 - 건강한 몸매 만들기',
    instructor: {
      name: '박필라',
      avatar: '/placeholder-user.jpg',
      rating: 4.7,
      reviewCount: 31,
    },
    category: '필라테스',
    location: '서울특별시 강남구 논현동',
    price: 160000,
    duration: '60분',
    maxStudents: 12,
    currentStudents: 8,
    schedule: '매주 월, 수 20:00-21:00',
    tags: ['그룹 레슨', '무료 체험'],
    image: '/placeholder.jpg',
    isLiked: false,
    viewCount: 312,
  },
  {
    id: '4',
    title: '홈트레이닝 강화 레슨',
    instructor: {
      name: '최홈트',
      avatar: '/placeholder-user.jpg',
      rating: 4.6,
      reviewCount: 67,
    },
    category: '홈트레이닝',
    location: '온라인',
    price: 35000,
    duration: '30분',
    maxStudents: 10,
    currentStudents: 8,
    schedule: '매주 월, 수, 금 18:00',
    tags: ['그룹 레슨', '무료 체험'],
    image: '/placeholder.jpg',
    isLiked: false,
    viewCount: 189,
  },
  {
    id: '5',
    title: '복싱 기초 레슨 - 체력과 기술을 동시에',
    instructor: {
      name: '김복싱',
      avatar: '/placeholder-user.jpg',
      rating: 4.8,
      reviewCount: 45,
    },
    category: '복싱',
    location: '서울특별시 강남구 역삼동',
    price: 200000,
    duration: '90분',
    maxStudents: 6,
    currentStudents: 3,
    schedule: '매주 화, 목 19:00-20:30',
    tags: ['1:1 레슨', '신규 강사'],
    image: '/placeholder.jpg',
    isLiked: false,
    viewCount: 145,
  },
  {
    id: '6',
    title: '골프 기초 레슨 - 올바른 스윙 배우기',
    instructor: {
      name: '이골프',
      avatar: '/placeholder-user.jpg',
      rating: 4.9,
      reviewCount: 52,
    },
    category: '골프',
    location: '서울특별시 강남구 청담동',
    price: 250000,
    duration: '120분',
    maxStudents: 4,
    currentStudents: 2,
    schedule: '매주 토, 일 09:00-11:00',
    tags: ['1:1 레슨', '인기 강사'],
    image: '/placeholder.jpg',
    isLiked: true,
    viewCount: 98,
  },
]

export default function LessonListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF] via-white to-[#E1D8FB]">
      <Container size="lg" className="py-12">
        {/* 상단 헤더 */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-[#7B61FF]">검색 결과</h1>
          <p className="mb-2 text-gray-500">
            총 <span className="font-bold text-[#7B61FF]">24개</span>의 레슨을
            찾았습니다
          </p>
        </div>
        <div className="flex items-start gap-8">
          {/* 좌측 필터 */}
          <aside className="sticky top-24 w-80 shrink-0">
            <div className="mb-4 rounded-2xl bg-white/90 p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold text-gray-800">
                검색 필터
              </h2>
              <ListFilter />
            </div>
          </aside>
          {/* 우측 리스트 */}
          <section className="flex flex-1 flex-col gap-8">
            {dummyLessons.map((lesson) => (
              <ListItem key={lesson.id} lesson={lesson} />
            ))}
          </section>
        </div>
      </Container>
    </div>
  )
}
