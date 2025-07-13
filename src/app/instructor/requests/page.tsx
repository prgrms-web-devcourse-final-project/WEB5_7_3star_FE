'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  MapPin,
  MessageSquare,
  Star,
  Phone,
  Mail,
} from 'lucide-react'

// 더미 데이터
const dummyRequests = [
  {
    id: 1,
    lessonTitle: '초보자를 위한 자유형 마스터 클래스',
    lessonDate: '2024-01-20',
    lessonTime: '오후 2:00 - 3:30',
    lessonLocation: '강남구 수영장',
    lessonPrice: 45000,
    applicant: {
      id: 'USER001',
      name: '김수영',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      avatar: '/placeholder-user.jpg',
      rating: 4.5,
      reviewCount: 12,
      joinDate: '2023-06-15',
    },
    appliedDate: '2024-01-15',
    message:
      '수영을 처음 배우는 초보자입니다. 친절하게 가르쳐주시면 감사하겠습니다.',
    status: 'pending',
  },
  {
    id: 2,
    lessonTitle: '초보자를 위한 자유형 마스터 클래스',
    lessonDate: '2024-01-20',
    lessonTime: '오후 2:00 - 3:30',
    lessonLocation: '강남구 수영장',
    lessonPrice: 45000,
    applicant: {
      id: 'USER002',
      name: '이헬스',
      email: 'lee@example.com',
      phone: '010-2345-6789',
      avatar: '/placeholder-user.jpg',
      rating: 4.8,
      reviewCount: 25,
      joinDate: '2023-03-20',
    },
    appliedDate: '2024-01-14',
    message:
      '수영 기초는 있지만 자유형을 더 잘하고 싶습니다. 체계적으로 지도해주세요.',
    status: 'pending',
  },
  {
    id: 3,
    lessonTitle: '초보자를 위한 자유형 마스터 클래스',
    lessonDate: '2024-01-20',
    lessonTime: '오후 2:00 - 3:30',
    lessonLocation: '강남구 수영장',
    lessonPrice: 45000,
    applicant: {
      id: 'USER003',
      name: '박운동',
      email: 'park@example.com',
      phone: '010-3456-7890',
      avatar: '/placeholder-user.jpg',
      rating: 4.2,
      reviewCount: 8,
      joinDate: '2023-09-10',
    },
    appliedDate: '2024-01-13',
    message: '수영을 배우고 싶어서 신청했습니다. 열심히 배우겠습니다!',
    status: 'approved',
  },
  {
    id: 4,
    lessonTitle: '초보자를 위한 자유형 마스터 클래스',
    lessonDate: '2024-01-20',
    lessonTime: '오후 2:00 - 3:30',
    lessonLocation: '강남구 수영장',
    lessonPrice: 45000,
    applicant: {
      id: 'USER004',
      name: '최스포츠',
      email: 'choi@example.com',
      phone: '010-4567-8901',
      avatar: '/placeholder-user.jpg',
      rating: 4.0,
      reviewCount: 15,
      joinDate: '2023-12-05',
    },
    appliedDate: '2024-01-12',
    message: '수영을 배우고 싶습니다. 시간이 맞아서 신청했습니다.',
    status: 'rejected',
  },
]

export default function InstructorRequestsPage() {
  const [requests, setRequests] = useState(dummyRequests)
  const [selectedRequest, setSelectedRequest] = useState<
    (typeof dummyRequests)[0] | null
  >(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectionModal, setShowRejectionModal] = useState(false)

  const pendingRequests = requests.filter((req) => req.status === 'pending')
  const approvedRequests = requests.filter((req) => req.status === 'approved')
  const rejectedRequests = requests.filter((req) => req.status === 'rejected')

  const handleApprove = (requestId: number) => {
    if (confirm('이 신청을 승인하시겠습니까?')) {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: 'approved' } : req,
        ),
      )
      alert('신청이 승인되었습니다.')
    }
  }

  const handleReject = (requestId: number) => {
    setSelectedRequest(requests.find((req) => req.id === requestId) || null)
    setShowRejectionModal(true)
  }

  const confirmRejection = () => {
    if (!selectedRequest || !rejectionReason.trim()) {
      alert('거절 사유를 입력해주세요.')
      return
    }

    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest.id ? { ...req, status: 'rejected' } : req,
      ),
    )
    setShowRejectionModal(false)
    setRejectionReason('')
    setSelectedRequest(null)
    alert('신청이 거절되었습니다.')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="border-yellow-200 bg-yellow-100 text-yellow-700">
            <Clock className="mr-1 h-3 w-3" />
            승인 대기
          </Badge>
        )
      case 'approved':
        return (
          <Badge className="border-green-200 bg-green-100 text-green-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            승인됨
          </Badge>
        )
      case 'rejected':
        return (
          <Badge className="border-red-200 bg-red-100 text-red-700">
            <XCircle className="mr-1 h-3 w-3" />
            거절됨
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <div className="container mx-auto w-full max-w-5xl px-4 py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">
            참여 신청 관리
          </h1>
          <p className="text-lg text-gray-600">
            레슨 참여 신청을 검토하고 승인/거절하세요
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="border-2 border-gray-100 shadow-xs">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">전체 신청</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {requests.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-100 shadow-xs">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">승인 대기</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {pendingRequests.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-100 shadow-xs">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">승인됨</p>
                  <p className="text-2xl font-bold text-green-600">
                    {approvedRequests.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-100 shadow-xs">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">거절됨</p>
                  <p className="text-2xl font-bold text-red-600">
                    {rejectedRequests.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 신청 목록 */}
        <div className="space-y-6">
          {requests.map((request) => (
            <Card
              key={request.id}
              className="border-2 border-gray-100 shadow-xs"
            >
              <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2 text-xl font-bold text-gray-800">
                      {request.lessonTitle}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(request.lessonDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {request.lessonTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {request.lessonLocation}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(request.status)}
                    <Badge className="border-0 bg-blue-100 text-blue-700">
                      {request.lessonPrice.toLocaleString()}원
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* 신청자 정보 */}
                  <div className="lg:col-span-1">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={request.applicant.avatar} />
                        <AvatarFallback className="text-lg font-bold">
                          {request.applicant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-bold text-gray-800">
                          {request.applicant.name}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {request.applicant.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {request.applicant.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            {request.applicant.rating} (
                            {request.applicant.reviewCount}개 리뷰)
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            가입일: {formatDate(request.applicant.joinDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 신청 메시지 */}
                  <div className="lg:col-span-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-800">
                          <MessageSquare className="h-4 w-4" />
                          신청 메시지
                        </h4>
                        <div className="rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
                          <p className="text-gray-700">{request.message}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          신청일: {formatDate(request.appliedDate)}
                        </div>

                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleReject(request.id)}
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              거절
                            </Button>
                            <Button
                              onClick={() => handleApprove(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              승인
                            </Button>
                          </div>
                        )}

                        {request.status === 'approved' && (
                          <Badge className="border-0 bg-green-100 text-green-700">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            승인 완료
                          </Badge>
                        )}

                        {request.status === 'rejected' && (
                          <Badge className="border-0 bg-red-100 text-red-700">
                            <XCircle className="mr-1 h-3 w-3" />
                            거절 완료
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 거절 사유 모달 */}
        {showRejectionModal && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                거절 사유 입력
              </h3>
              <Textarea
                placeholder="거절 사유를 입력해주세요..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mb-4"
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRejectionModal(false)
                    setRejectionReason('')
                    setSelectedRequest(null)
                  }}
                >
                  취소
                </Button>
                <Button
                  onClick={confirmRejection}
                  className="bg-red-600 hover:bg-red-700"
                >
                  거절하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
