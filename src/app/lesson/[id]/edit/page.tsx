import { getLessonDetail } from '@/lib/api/profile'
import { notFound } from 'next/navigation'
import LessonEditClient from './lesson-edit-client'

interface LessonEditPageProps {
  params: {
    id: string
  }
}

export default async function LessonEditPage({ params }: LessonEditPageProps) {
  try {
    const lessonData = await getLessonDetail(params.id)

    if (!lessonData.data) {
      notFound()
    }

    return <LessonEditClient lesson={lessonData.data} />
  } catch (error) {
    console.error('레슨 정보 로드 실패:', error)
    notFound()
  }
}
