import { getLessons } from '@/lib/api/lesson'
import Container from '@/components/Container'
import ListFilter from '@/components/lesson/list-filter'
import LessonListClient from './lesson-list-client'
import type { components } from '@/types/swagger-generated'

type LessonSearchResponseDto = components['schemas']['LessonSearchResponseDto']

// 정적 렌더링 비활성화 (searchParams 사용으로 인해)
export const dynamic = 'force-dynamic'

interface LessonListPageProps {
  searchParams: {
    category?: string
    city?: string
    district?: string
    dong?: string
    search?: string
    page?: string
    limit?: string
  }
}

export default async function LessonListPage({
  searchParams,
}: LessonListPageProps) {
  try {
    // 실제 API 호출
    const response = await getLessons({
      category: searchParams.category || 'YOGA',
      city: searchParams.city || '서울특별시',
      district: searchParams.district || '강남구',
      dong: searchParams.dong || '역삼동',
      search: searchParams.search,
      page: searchParams.page ? parseInt(searchParams.page) : 1,
      limit: searchParams.limit ? parseInt(searchParams.limit) : 10,
    })

    return (
      <Container>
        <div className="py-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">레슨 목록</h1>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* 필터 사이드바 */}
            <div className="lg:col-span-1">
              <ListFilter />
            </div>

            {/* 레슨 목록 */}
            <div className="space-y-6 lg:col-span-3">
              <LessonListClient lessons={response.data?.lessons || []} />
            </div>
          </div>
        </div>
      </Container>
    )
  } catch (error) {
    console.error('레슨 목록 조회 실패:', error)

    // 에러 발생 시 더미 데이터 사용
    const dummyLessons: LessonSearchResponseDto[] = [
      {
        id: 1,
        lessonName: '요가 초급 클래스',
        category: 'YOGA',
        price: 50000,
        maxParticipants: 10,
        currentParticipants: 5,
        startAt: '2024-01-15T10:00:00Z',
        endAt: '2024-01-15T11:00:00Z',
        status: '모집중',
        city: '서울특별시',
        district: '강남구',
        dong: '역삼동',
        openTime: '10:00',
        openRun: true,
        createdAt: '2024-01-01T00:00:00Z',
        reviewCount: 8,
        rating: 4.5,
        lessonLeaderName: '김요가',
        lessonLeaderImage: '',
        lessonImages: [],
      },
    ]

    return (
      <Container>
        <div className="py-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">레슨 목록</h1>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* 필터 사이드바 */}
            <div className="lg:col-span-1">
              <ListFilter />
            </div>

            {/* 레슨 목록 */}
            <div className="space-y-6 lg:col-span-3">
              <div className="rounded-lg bg-yellow-50 p-4">
                <p className="text-yellow-800">
                  ⚠️ API 연결에 실패했습니다. 더미 데이터를 표시합니다.
                </p>
              </div>
              <LessonListClient lessons={dummyLessons} />
            </div>
          </div>
        </div>
      </Container>
    )
  }
}
