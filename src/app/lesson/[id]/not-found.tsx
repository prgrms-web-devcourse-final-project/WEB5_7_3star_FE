import { Button } from '@/components/ui/button'
import Container from '@/components/Container'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Container size="lg" className="relative z-10">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">
              레슨을 찾을 수 없습니다
            </h1>
            <p className="mb-8 text-gray-600">
              요청하신 레슨이 존재하지 않거나 삭제되었습니다.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/lesson/list">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                  레슨 목록으로 돌아가기
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">홈으로 돌아가기</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
