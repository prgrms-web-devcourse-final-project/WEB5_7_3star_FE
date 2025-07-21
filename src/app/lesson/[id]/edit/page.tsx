import PageHeader from '@/components/ui/PageHeader'
import Container from '@/components/Container'
import { getLessonDetail } from '@/lib/api/profile'
import { notFound } from 'next/navigation'
import LessonEditClient from './lesson-edit-client'

interface PageProps {
  params: {
    id: string
  }
}

export default async function LessonEditPage({ params }: PageProps) {
  try {
    const response = await getLessonDetail(params.id)

    if (!response.data) {
      console.error('레슨 데이터가 없습니다')
      notFound()
    }

    return (
      <Container size="lg">
        <PageHeader
          title="레슨 수정"
          subtitle="레슨 정보를 수정하고 업데이트하세요"
          align="center"
        />
        <LessonEditClient lesson={response.data} />
      </Container>
    )
  } catch (error) {
    console.error('레슨 상세 조회 실패:', error)
    notFound()
  }
}
