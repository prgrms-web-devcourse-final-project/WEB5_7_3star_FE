import Container from '@/components/Container'
import LessonDetailClient from './lesson-detail-client'
import { getLessonDetail } from '@/lib/api/profile'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

export default async function LessonDetailPage({ params }: PageProps) {
  try {
    const response = await getLessonDetail(params.id)

    if (!response.data) {
      console.error('레슨 데이터가 없습니다')
      notFound()
    }

    console.log('레슨 상세 데이터:', response.data)

    // lesson 데이터에 id를 추가해서 전달
    const lessonWithId = {
      ...response.data,
      id: params.id,
    }

    return (
      <div className="min-h-screen">
        <Container size="lg">
          <LessonDetailClient lesson={lessonWithId} />
        </Container>
      </div>
    )
  } catch (error) {
    console.error('레슨 상세 조회 실패:', error)
    notFound()
  }
}
