import { Suspense, use } from 'react'
import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import { Loader2 } from 'lucide-react'
import ReviewWriteClient from './review-write-client'

function ReviewWriteLoading() {
  return (
    <Container size="lg">
      <PageHeader
        title="리뷰 작성"
        subtitle="레슨에 대한 솔직한 후기를 남겨주세요"
        align="center"
      />
      <div className="flex h-full items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    </Container>
  )
}

export default function ReviewWritePage({
  searchParams,
}: {
  searchParams: Promise<{ lessonId: string }>
}) {
  const { lessonId } = use(searchParams)

  return (
    <Suspense fallback={<ReviewWriteLoading />}>
      <ReviewWriteClient lessonId={lessonId} />
    </Suspense>
  )
}
