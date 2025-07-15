import Container from '@/components/Container'
import { dummyLessonDetail } from '@/lib/dummy-data'
import LessonDetailClient from './lesson-detail-client'

export default function LessonDetailPage() {
  return (
    <div className="min-h-screen">
      <Container size="lg">
        <LessonDetailClient lesson={dummyLessonDetail} />
      </Container>
    </div>
  )
}
