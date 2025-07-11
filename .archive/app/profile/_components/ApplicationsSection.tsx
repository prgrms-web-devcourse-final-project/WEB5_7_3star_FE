'use client'

import { FileText, Calendar, User } from 'lucide-react'

interface LessonApplication {
  id: number
  lessonId: number
  lessonName: string
  instructorName: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  appliedAt: string
  startDate: string
  price: number
}

interface ApplicationsSectionProps {
  applications: LessonApplication[]
}

export default function ApplicationsSection({
  applications,
}: ApplicationsSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return '승인됨'
      case 'PENDING':
        return '대기 중'
      case 'REJECTED':
        return '거절됨'
      case 'CANCELLED':
        return '취소됨'
      default:
        return '알 수 없음'
    }
  }

  return (
    <div className="service-card">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100">
          <FileText className="h-4 w-4 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">레슨 신청</h2>
      </div>

      <div className="space-y-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">
                {application.lessonName}
              </h3>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(application.status)}`}
              >
                {getStatusText(application.status)}
              </span>
            </div>
            <div className="mb-2 flex items-center gap-4">
              <span className="text-lg font-bold text-gray-900">
                {application.price.toLocaleString()}원
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <User className="h-4 w-4" />
                {application.instructorName}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                신청일: {application.appliedAt}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                시작일: {application.startDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
