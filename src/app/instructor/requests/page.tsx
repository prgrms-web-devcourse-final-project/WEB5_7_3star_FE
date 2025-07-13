'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Users, Bell, XCircle } from 'lucide-react'
import Link from 'next/link'

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
  const [activeTab, setActiveTab] = useState('all')
  const filteredRequests =
    activeTab === 'all'
      ? requests
      : requests.filter((req) => req.status === activeTab)

  // Figma 스타일용 상태 분류
  const allRequests = requests

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

  // 상태 뱃지 스타일
  const statusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="ml-2 rounded-full bg-[#FFEFC2] px-3 py-1 text-sm font-semibold text-[#E6A800]">
            대기중
          </span>
        )
      case 'approved':
        return (
          <span className="ml-2 rounded-full bg-[#C2F2D2] px-3 py-1 text-sm font-semibold text-[#1CB66D]">
            승인됨
          </span>
        )
      case 'rejected':
        return (
          <span className="ml-2 rounded-full bg-[#FFD6D6] px-3 py-1 text-sm font-semibold text-[#E64C4C]">
            거절됨
          </span>
        )
      default:
        return null
    }
  }

  // 이니셜 추출 함수
  const getInitial = (name: string) => name.slice(0, 1)

  // 이니셜 원 색상 배열 (신청자마다 다르게)
  const initialColors = [
    'bg-[#A9A4F7]', // 보라
    'bg-[#7BC6FF]', // 파랑
    'bg-[#FFD36E]', // 노랑
    'bg-[#FFB6B6]', // 빨강
    'bg-[#B6FFC9]', // 연두
    'bg-[#FFB6F9]', // 핑크
  ]

  return (
    <div className="mx-auto flex max-w-7xl gap-8 py-10">
      {/* 좌측: 정보/요약 */}
      <aside className="flex w-[370px] flex-col gap-6">
        {/* 레슨 정보 카드 */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xl font-bold">초보자를 위한 헬스 기초</span>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-500">
              모집중
            </span>
          </div>
          <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
              헬스
            </span>
            <span>2024.12.20</span>
            <span>19:00 (60분)</span>
          </div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <span>📍 강남구 피트니스센터</span>
          </div>
          <div className="mb-2 text-4xl font-bold text-[#4F6BFF]">50,000원</div>
          <div className="text-sm text-gray-600">
            헬스 초보자를 위한 기본 동작과 올바른 자세를 배우는 레슨입니다.
          </div>
        </div>
        {/* 요약 카드 */}
        <div className="flex gap-3">
          <div className="flex flex-1 flex-col items-center rounded-xl bg-[#EAF3FF] py-6 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-2xl font-bold text-[#4F6BFF]">
              <Users className="h-7 w-7 text-[#4F6BFF]" />
              1/10
            </div>
            <div className="text-sm text-gray-500">승인된 참여자</div>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-xl bg-[#FFF9E3] py-6 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-2xl font-bold text-[#E6A800]">
              <Bell className="h-7 w-7 text-[#E6A800]" />3
            </div>
            <div className="text-sm text-gray-500">대기중</div>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-xl bg-[#FFECEC] py-6 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-2xl font-bold text-[#E64C4C]">
              <XCircle className="h-7 w-7 text-[#E64C4C]" />1
            </div>
            <div className="text-sm text-gray-500">거절됨</div>
          </div>
        </div>
      </aside>
      {/* 우측: 탭/리스트 */}
      <main className="flex flex-1 flex-col gap-6">
        {/* 상단 탭/필터 */}
        <div className="mb-4 flex gap-2">
          <Link href="/instructor/requests">
            <button className="rounded-lg border border-[#E0E0E0] bg-[#fff] px-6 py-2 text-base font-semibold">
              전체
            </button>
          </Link>
          <Link href="/lesson/LESSON001/edit">
            <button className="rounded-lg border border-[#E0E0E0] bg-[#fff] px-6 py-2 text-base font-semibold">
              레슨 수정
            </button>
          </Link>
        </div>
        <div className="mb-6 flex overflow-hidden rounded-lg border border-[#D9D9D9]">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 border-r border-[#D9D9D9] py-3 text-base font-semibold ${activeTab === 'all' ? 'bg-[#F2F6FF]' : 'bg-white'}`}
          >
            전체 ({allRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 border-r border-[#D9D9D9] py-3 text-base font-semibold ${activeTab === 'pending' ? 'bg-[#FFF9E3]' : 'bg-white'}`}
          >
            대기중 ({allRequests.filter((r) => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex-1 border-r border-[#D9D9D9] py-3 text-base font-semibold ${activeTab === 'approved' ? 'bg-[#EAF3FF]' : 'bg-white'}`}
          >
            승인됨 ({allRequests.filter((r) => r.status === 'approved').length})
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`flex-1 py-3 text-base font-semibold ${activeTab === 'rejected' ? 'bg-[#FFECEC]' : 'bg-white'}`}
          >
            거절됨 ({allRequests.filter((r) => r.status === 'rejected').length})
          </button>
        </div>
        {/* 신청자 리스트 */}
        <div className="flex flex-col gap-6">
          {filteredRequests.map((req, idx) => (
            <div
              key={req.id}
              className="flex items-center justify-between rounded-xl border border-[#F0F0F0] bg-white px-8 py-6 shadow-sm"
            >
              <div className="flex items-center gap-6">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-white ${initialColors[idx % initialColors.length]}`}
                >
                  {getInitial(req.applicant.name)}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {req.applicant.name}
                    </span>
                    {statusBadge(req.status)}
                  </div>
                  <button className="rounded border border-[#D9D9D9] px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                    프로필 보기
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">2024.12.12 14:30</span>
                {req.status === 'pending' && (
                  <>
                    <button
                      className="flex items-center gap-1 rounded bg-[#1CB66D] px-4 py-2 text-sm font-bold text-white"
                      onClick={() => handleApprove(req.id)}
                    >
                      <span>✓</span> 승인
                    </button>
                    <button
                      className="ml-2 flex items-center gap-1 rounded border border-[#E64C4C] bg-white px-4 py-2 text-sm font-bold text-[#E64C4C]"
                      onClick={() => handleReject(req.id)}
                    >
                      <span>×</span> 거절
                    </button>
                  </>
                )}
                {req.status === 'approved' && (
                  <button
                    disabled
                    className="flex items-center gap-1 rounded bg-[#C2F2D2] px-4 py-2 text-sm font-bold text-[#1CB66D]"
                  >
                    ✓ 참여 확정
                  </button>
                )}
                {req.status === 'rejected' && (
                  <button
                    disabled
                    className="flex items-center gap-1 rounded bg-[#FFD6D6] px-4 py-2 text-sm font-bold text-[#E64C4C]"
                  >
                    × 거절됨
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* 거절 사유 모달 (기존 유지) */}
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
      </main>
    </div>
  )
}
