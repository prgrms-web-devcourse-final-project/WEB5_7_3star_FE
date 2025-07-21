import Container from '@/components/Container'
import LessonDetailClient from './lesson-detail-client'
import { getLessonDetail } from '@/lib/api/profile'
import { notFound } from 'next/navigation'
import type { components } from '@/types/swagger-generated'

// 타입 정의
type LessonDetailApiResponse =
  components['schemas']['BaseResponseLessonDetailResponseDto']
type LessonDetailData = components['schemas']['LessonDetailResponseDto'] & {
  id: string
}

interface PageProps {
  params: {
    id: string
  }
}

export default async function LessonDetailPage({ params }: PageProps) {
  try {
    const response: LessonDetailApiResponse = await getLessonDetail(params.id)

    if (!response.data) {
      console.error('레슨 데이터가 없습니다')
      notFound()
    }

    return (
      <div className="min-h-screen">
        <Container size="lg">
          <LessonDetailClient lesson={response.data} />
        </Container>
      </div>
    )
  } catch (error) {
    console.error('레슨 상세 조회 실패:', error)
    notFound()
  }
}
