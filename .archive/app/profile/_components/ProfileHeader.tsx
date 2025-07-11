'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function ProfileHeader() {
  const handleBackClick = () => {
    window.history.back()
  }

  return (
    <div className="mb-8 flex items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        className="h-10 w-10 rounded-full bg-transparent p-0"
        onClick={handleBackClick}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div>
        <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
          강사 프로필
        </h1>
        <p className="mt-1 text-gray-600">
          강사의 정보와 개설 레슨을 확인하세요
        </p>
      </div>
    </div>
  )
}
