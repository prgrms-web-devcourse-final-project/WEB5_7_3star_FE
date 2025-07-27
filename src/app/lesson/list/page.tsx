import Container from '@/components/Container'
import ListFilter from '@/components/lesson/list-filter'
import LessonListClientWrapper from './lesson-list-client-wrapper'

// 정적 렌더링 비활성화
export const dynamic = 'force-dynamic'

interface LessonListPageProps {
  searchParams: Promise<{
    category?: string
    city?: string
    district?: string
    dong?: string
    search?: string
    page?: string
    limit?: string
  }>
}

export default async function LessonListPage({
  searchParams,
}: LessonListPageProps) {
  // searchParams await 처리
  const params = await searchParams

  const searchFilters = {
    category: params.category || 'YOGA',
    city: params.city || '서울특별시',
    district: params.district || '강남구',
    dong: params.dong || '역삼동',
    search: params.search || '',
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
  }

  return (
    <Container>
      <div className="py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">레슨 목록</h1>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* 필터 사이드바 */}
          <div className="lg:col-span-1">
            <ListFilter initialFilters={searchFilters} />
          </div>

          {/* 레슨 목록 */}
          <div className="space-y-6 lg:col-span-3">
            <LessonListClientWrapper searchFilters={searchFilters} />
          </div>
        </div>
      </div>
    </Container>
  )
}
