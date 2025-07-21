'use client'

import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import { useState, useEffect } from 'react'
import { Users, AlarmClock, X as LucideX, Loader2 } from 'lucide-react'
import {
  getLessonApplications,
  approveRejectApplication,
  getInstructorCreatedLessons,
} from '@/lib/api/profile'

// 더미 데이터는 주석 처리 (실제 API 사용)
/*
const dummyRequests = [
  { id: 1, name: '김은동', status: 'pending', date: '2024.12.12 14:30' },
  { id: 2, name: '박건강', status: 'approved', date: '2024.12.12 16:45' },
  { id: 3, name: '이체력', status: 'pending', date: '2024.12.13 09:20' },
  { id: 4, name: '최참여', status: 'confirmed', date: '2024.12.14 10:00' },
]
*/

const statusLabel: Record<
  'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED',
  { label: string; class: string }
> = {
  PENDING: { label: '대기중', class: 'bg-[#FFF3E3] text-[#E6A800]' },
  APPROVED: { label: '승인됨', class: 'bg-[#E3FFF6] text-[#1CB66D]' },
  REJECTED: { label: '거절됨', class: 'bg-[#FFE3E3] text-[#E64C4C]' },
  COMPLETED: { label: '완료됨', class: 'bg-[#E6E6FF] text-[#7C3AED]' },
}

export default function InstructorRequestsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [applications, setApplications] = useState<any[]>([])
  const [lessonInfo, setLessonInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  // URL에서 lessonId 파라미터 가져오기 (실제로는 라우팅에서 가져와야 함)
  const lessonId = '1' // 임시로 하드코딩, 실제로는 URL 파라미터에서 가져와야 함

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 레슨 신청자 목록 조회
        const applicationsResponse = await getLessonApplications(lessonId)
        if (
          applicationsResponse.data &&
          applicationsResponse.data.applications
        ) {
          setApplications(applicationsResponse.data.applications)
        } else {
          setApplications([])
        }

        // 레슨 정보 조회 (임시로 더미 데이터 사용)
        setLessonInfo({
          id: lessonId,
          title: '초보자를 위한 헬스 기초',
          category: '헬스',
          date: '2024.12.20',
          time: '19:00 (60분)',
          location: '강남구 피트니스센터',
          price: 50000,
          description:
            '헬스 초보자를 위한 기본 동작과 올바른 자세를 배우는 레슨입니다.',
          maxParticipants: 10,
          status: '모집중',
        })
      } catch (err) {
        console.error('데이터 로딩 에러:', err)
        setError('데이터를 불러오는 중 오류가 발생했습니다.')
        setApplications([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [lessonId])

  const handleApproveReject = async (
    applicationId: string,
    action: 'APPROVE' | 'REJECT',
  ) => {
    try {
      setProcessingId(applicationId)

      await approveRejectApplication(applicationId, action)

      // 성공 시 목록 새로고침
      const applicationsResponse = await getLessonApplications(lessonId)
      if (applicationsResponse.data && applicationsResponse.data.applications) {
        setApplications(applicationsResponse.data.applications)
      }
    } catch (err) {
      console.error('승인/거절 처리 에러:', err)
      alert(
        action === 'APPROVE'
          ? '승인 처리 중 오류가 발생했습니다.'
          : '거절 처리 중 오류가 발생했습니다.',
      )
    } finally {
      setProcessingId(null)
    }
  }

  const filteredApplications =
    activeTab === 'all'
      ? applications
      : applications.filter((app) => app.status === activeTab)

  const pendingCount = applications.filter(
    (app) => app.status === 'PENDING',
  ).length
  const approvedCount = applications.filter(
    (app) => app.status === 'APPROVED',
  ).length
  const rejectedCount = applications.filter(
    (app) => app.status === 'REJECTED',
  ).length

  // 로딩 상태
  if (isLoading) {
    return (
      <Container size="lg">
        <PageHeader
          title="레슨 관리"
          subtitle="신청자를 관리하고 레슨을 운영하세요"
          align="left"
        />
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>데이터를 불러오는 중...</span>
          </div>
        </div>
      </Container>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <Container size="lg">
        <PageHeader
          title="레슨 관리"
          subtitle="신청자를 관리하고 레슨을 운영하세요"
          align="left"
        />
        <div className="py-20 text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </Container>
    )
  }

  return (
    <Container size="lg">
      <PageHeader
        title="레슨 관리"
        subtitle="신청자를 관리하고 레슨을 운영하세요"
        align="left"
      />
      <div className="flex gap-4">
        {/* 좌측 요약 카드 */}
        <aside className="flex w-[260px] flex-col gap-4">
          {lessonInfo && (
            <>
              <div className="mb-2 rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-base font-bold text-gray-800">
                    {lessonInfo.title}
                  </span>
                  <span className="rounded border border-[#BFD7FF] bg-[#E3F0FF] px-2 py-0.5 text-xs font-semibold text-[#2563eb]">
                    {lessonInfo.status}
                  </span>
                </div>
                <div className="mb-1 flex items-center gap-2 text-xs text-gray-700">
                  <span className="rounded bg-[#E3F0FF] px-2 py-0.5 text-xs font-semibold text-[#2563eb]">
                    {lessonInfo.category}
                  </span>
                  <span>📅 {lessonInfo.date}</span>
                  <span>{lessonInfo.time}</span>
                </div>
                <div className="mb-1 flex items-center gap-1 text-xs text-[#E64C4C]">
                  <span>📍 {lessonInfo.location}</span>
                </div>
                <div className="mb-2 text-lg font-bold text-[#2563eb]">
                  {lessonInfo.price.toLocaleString()}원
                </div>
                <div className="text-xs font-normal text-gray-400">
                  {lessonInfo.description}
                </div>
              </div>
              <div className="flex gap-4">
                {/* 승인된 참여자 */}
                <div className="flex flex-1 flex-col items-center rounded-2xl border border-[#BFD7FF] bg-[#E6F0FF] py-5 shadow-sm">
                  <Users className="mb-1 h-5 w-5 text-[#6B93C0]" />
                  <span className="mb-1 text-lg font-extrabold text-[#2563eb]">
                    {approvedCount}/{lessonInfo.maxParticipants}
                  </span>
                  <span className="text-center text-xs leading-tight text-gray-400">
                    승인된 참여자
                  </span>
                </div>
                {/* 대기중 */}
                <div className="flex flex-1 flex-col items-center rounded-2xl border border-[#FFE6A0] bg-[#FFFBE6] py-5 shadow-sm">
                  <AlarmClock className="mb-1 h-5 w-5 text-[#E6A800]" />
                  <span className="mb-1 text-lg font-extrabold text-[#E6A800]">
                    {pendingCount}
                  </span>
                  <span className="text-center text-xs leading-tight text-gray-400">
                    대기중
                  </span>
                </div>
                {/* 거절됨 */}
                <div className="flex flex-1 flex-col items-center rounded-2xl border border-[#FFBDBD] bg-[#FFE6E6] py-5 shadow-sm">
                  <LucideX className="mb-1 h-5 w-5 text-[#E64C4C]" />
                  <span className="mb-1 text-lg font-extrabold text-[#E64C4C]">
                    {rejectedCount}
                  </span>
                  <span className="text-center text-xs leading-tight text-gray-400">
                    거절됨
                  </span>
                </div>
              </div>
            </>
          )}
        </aside>
        {/* 우측 탭/리스트 */}
        <main className="flex flex-1 flex-col gap-4">
          <div className="mb-2 flex gap-2">
            <button className="rounded border border-[#BFD7FF] bg-[#E3F0FF] px-4 py-1 text-xs font-semibold text-[#2563eb] shadow-sm">
              전체
            </button>
            <button className="rounded border border-[#BFD7FF] bg-[#E3F0FF] px-4 py-1 text-xs font-semibold text-[#2563eb] shadow-sm">
              레슨 수정
            </button>
          </div>
          <div className="mb-4 flex items-center gap-2 rounded-full border border-[#BFD7FF] bg-[#E6F0FF] p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`rounded-full px-6 py-2 text-sm font-bold shadow-none transition ${activeTab === 'all' ? 'bg-[#2563eb] text-white' : 'bg-[#E6F0FF] text-[#2563eb]'}`}
            >
              전체 ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab('PENDING')}
              className={`rounded-full px-6 py-2 text-sm font-bold shadow-none transition ${activeTab === 'PENDING' ? 'bg-[#2563eb] text-white' : 'bg-[#E6F0FF] text-[#2563eb]'}`}
            >
              대기중 ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab('APPROVED')}
              className={`rounded-full px-6 py-2 text-sm font-bold shadow-none transition ${activeTab === 'APPROVED' ? 'bg-[#2563eb] text-white' : 'bg-[#E6F0FF] text-[#2563eb]'}`}
            >
              승인됨 ({approvedCount})
            </button>
            <button
              onClick={() => setActiveTab('REJECTED')}
              className={`rounded-full px-6 py-2 text-sm font-bold shadow-none transition ${activeTab === 'REJECTED' ? 'bg-[#2563eb] text-white' : 'bg-[#E6F0FF] text-[#2563eb]'}`}
            >
              거절됨 ({rejectedCount})
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {filteredApplications.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                {activeTab === 'all'
                  ? '신청자가 없습니다.'
                  : `${statusLabel[activeTab as keyof typeof statusLabel]?.label} 신청자가 없습니다.`}
              </div>
            ) : (
              filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-4 shadow-sm"
                >
                  {/* 프로필 pill */}
                  <div className="mr-4 flex flex-col items-center">
                    <div className="mb-1 rounded-full border bg-[#EDE3FF] px-3 py-1 text-base font-bold text-[#7C3AED] shadow-sm">
                      {app.userName?.[0] || app.nickname?.[0] || '?'}
                    </div>
                  </div>
                  {/* 이름/상태/날짜/프로필 */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-base font-bold text-gray-800">
                        {app.userName || app.nickname || '알 수 없음'}
                      </span>
                      <span
                        className={`ml-1 rounded-full px-3 py-1 text-xs font-semibold ${statusLabel[app.status as keyof typeof statusLabel]?.class || 'bg-gray-100 text-gray-600'}`}
                      >
                        {statusLabel[app.status as keyof typeof statusLabel]
                          ?.label || app.status}
                      </span>
                      <span className="ml-2 text-xs font-normal text-gray-400">
                        {app.createdAt
                          ? new Date(app.createdAt).toLocaleDateString('ko-KR')
                          : '날짜 없음'}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        (window.location.href = `/profile/${app.userId || app.id}`)
                      }
                      className="w-fit cursor-pointer rounded border border-[#BFD7FF] bg-[#E3F0FF] px-3 py-1 text-xs font-semibold text-[#2563eb] shadow-sm transition hover:bg-[#d1e7ff]"
                    >
                      프로필 보기
                    </button>
                  </div>
                  {/* 버튼 */}
                  <div className="ml-4 flex items-center gap-2">
                    {app.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleApproveReject(app.id, 'APPROVE')}
                          disabled={processingId === app.id}
                          className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-[#E3FFF6] px-4 py-2 text-xs font-bold text-[#1CB66D] shadow-none transition hover:bg-[#c2f2e3] disabled:opacity-50"
                        >
                          {processingId === app.id ? (
                            <Loader2 className="mb-0.5 h-4 w-4 animate-spin" />
                          ) : (
                            <span className="mb-0.5 text-base">✓</span>
                          )}
                          승인
                        </button>
                        <button
                          onClick={() => handleApproveReject(app.id, 'REJECT')}
                          disabled={processingId === app.id}
                          className="ml-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-[#FFE3E3] bg-white px-4 py-2 text-xs font-bold text-[#E64C4C] shadow-none transition hover:bg-[#ffe3e3] disabled:opacity-50"
                        >
                          {processingId === app.id ? (
                            <Loader2 className="mb-0.5 h-4 w-4 animate-spin" />
                          ) : (
                            <span className="mb-0.5 text-base">×</span>
                          )}
                          거절
                        </button>
                      </>
                    )}
                    {app.status === 'APPROVED' && (
                      <button
                        disabled
                        className="flex cursor-not-allowed flex-col items-center justify-center rounded-lg bg-[#E3FFF6] px-4 py-2 text-xs font-bold text-[#1CB66D] shadow-none"
                      >
                        <span className="mb-0.5 text-base">✓</span> 승인됨
                      </button>
                    )}
                    {app.status === 'COMPLETED' && (
                      <button
                        disabled
                        className="flex cursor-not-allowed flex-col items-center justify-center rounded-lg bg-[#E6E6FF] px-4 py-2 text-xs font-bold text-[#7C3AED] shadow-none"
                      >
                        <span className="mb-0.5 text-base">✓</span> 완료됨
                      </button>
                    )}
                    {app.status === 'REJECTED' && (
                      <button
                        disabled
                        className="flex cursor-not-allowed flex-col items-center justify-center rounded-lg bg-[#FFE3E3] px-4 py-2 text-xs font-bold text-[#E64C4C] shadow-none"
                      >
                        <span className="mb-0.5 text-base">×</span> 거절됨
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </Container>
  )
}
