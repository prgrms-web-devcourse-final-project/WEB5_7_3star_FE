import PageHeader from '@/components/ui/PageHeader'
import Container from '@/components/Container'
import { dummyLessonDetail } from '@/lib/dummy-data'
import LessonEditClient from './lesson-edit-client'

export default function LessonEditPage() {
  return (
    <Container size="lg">
      <PageHeader
        title="레슨 수정"
        subtitle="레슨 정보를 수정하고 업데이트하세요"
        align="center"
      />
      <LessonEditClient lesson={dummyLessonDetail} />
    </Container>
  )
}
