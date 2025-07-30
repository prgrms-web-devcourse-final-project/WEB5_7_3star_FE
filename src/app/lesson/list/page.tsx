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
    ri?: string
    search?: string
    page?: string
    limit?: string
    sortBy?: string
  }>
}

export default async function LessonListPage({
  searchParams,
}: LessonListPageProps) {
  const params = await searchParams

  const searchFilters = {
    category:
      params.category && params.category !== 'all'
        ? params.category
        : undefined,
    city: params.city && params.city.trim() ? params.city.trim() : undefined,
    district:
      params.district && params.district.trim()
        ? params.district.trim()
        : undefined,
    dong: params.dong && params.dong.trim() ? params.dong.trim() : undefined,
    ri:
      params.ri && params.ri.trim() && params.ri !== 'none'
        ? params.ri.trim()
        : undefined,
    search:
      params.search && params.search.trim() ? params.search.trim() : undefined,
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    sortBy: params.sortBy || undefined,
  }

  return (
    <Container>
      <div className="py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">레슨 목록</h1>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* 필터 사이드바 */}
          <div className="lg:col-span-1">
            <ListFilter
              keyword={searchFilters.search}
              category={searchFilters.category}
              city={searchFilters.city}
              district={searchFilters.district}
              dong={searchFilters.dong}
              ri={searchFilters.ri}
              sortBy={searchFilters.sortBy}
            />
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
