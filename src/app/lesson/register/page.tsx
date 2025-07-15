import PageHeader from '@/components/ui/PageHeader'
import Container from '@/components/Container'
import LessonRegisterClient from './lesson-register-client'

export default function LessonRegistration() {
  return (
    <Container size="lg">
      <PageHeader
        title="레슨 등록"
        subtitle="새로운 레슨을 등록하고 참여자를 모집해보세요"
        align="center"
      />
      <LessonRegisterClient />
    </Container>
  )
}
