'use client'

import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import { useState } from 'react'
import { Users, AlarmClock, X as LucideX } from 'lucide-react'

const dummyRequests = [
  { id: 1, name: '김은동', status: 'pending', date: '2024.12.12 14:30' },
  { id: 2, name: '박건강', status: 'approved', date: '2024.12.12 16:45' },
  { id: 3, name: '이체력', status: 'pending', date: '2024.12.13 09:20' },
  { id: 4, name: '최참여', status: 'confirmed', date: '2024.12.14 10:00' },
]

const statusLabel: Record<
  'pending' | 'approved' | 'rejected' | 'confirmed',
  { label: string; class: string }
> = {
  pending: { label: '대기중', class: 'bg-[#FFF3E3] text-[#E6A800]' },
  approved: { label: '승인됨', class: 'bg-[#E3FFF6] text-[#1CB66D]' },
  rejected: { label: '거절됨', class: 'bg-[#FFE3E3] text-[#E64C4C]' },
  confirmed: { label: '참여 확정', class: 'bg-[#E6E6FF] text-[#7C3AED]' },
}

export default function InstructorRequestsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const filtered =
    activeTab === 'all'
      ? dummyRequests
      : dummyRequests.filter((r) => r.status === activeTab)

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
          <div className="mb-2 rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-base font-bold text-gray-800">
                초보자를 위한 헬스 기초
              </span>
              <span className="rounded border border-[#BFD7FF] bg-[#E3F0FF] px-2 py-0.5 text-xs font-semibold text-[#2563eb]">
                모집중
              </span>
            </div>
            <div className="mb-1 flex items-center gap-2 text-xs text-gray-700">
              <span className="rounded bg-[#E3F0FF] px-2 py-0.5 text-xs font-semibold text-[#2563eb]">
                헬스
              </span>
              <span>📅 2024.12.20</span>
              <span>19:00 (60분)</span>
            </div>
            <div className="mb-1 flex items-center gap-1 text-xs text-[#E64C4C]">
              <span>📍 강남구 피트니스센터</span>
            </div>
            <div className="mb-2 text-lg font-bold text-[#2563eb]">
              50,000원
            </div>
            <div className="text-xs font-normal text-gray-400">
              헬스 초보자를 위한 기본 동작과 올바른 자세를 배우는 레슨입니다.
            </div>
          </div>
          <div className="flex gap-4">
            {/* 승인된 참여자 */}
            <div className="flex flex-1 flex-col items-center rounded-2xl border border-[#BFD7FF] bg-[#E6F0FF] py-5 shadow-sm">
              <Users className="mb-1 h-5 w-5 text-[#6B93C0]" />
              <span className="mb-1 text-lg font-extrabold text-[#2563eb]">
                1/10
              </span>
              <span className="text-center text-xs leading-tight text-gray-400">
                승인된 참여자
              </span>
            </div>
            {/* 대기중 */}
            <div className="flex flex-1 flex-col items-center rounded-2xl border border-[#FFE6A0] bg-[#FFFBE6] py-5 shadow-sm">
              <AlarmClock className="mb-1 h-5 w-5 text-[#E6A800]" />
              <span className="mb-1 text-lg font-extrabold text-[#E6A800]">
                3
              </span>
              <span className="text-center text-xs leading-tight text-gray-400">
                대기중
              </span>
            </div>
            {/* 거절됨 */}
            <div className="flex flex-1 flex-col items-center rounded-2xl border border-[#FFBDBD] bg-[#FFE6E6] py-5 shadow-sm">
              <LucideX className="mb-1 h-5 w-5 text-[#E64C4C]" />
              <span className="mb-1 text-lg font-extrabold text-[#E64C4C]">
                1
              </span>
              <span className="text-center text-xs leading-tight text-gray-400">
                거절됨
              </span>
            </div>
          </div>
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
              전체 (3)
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`rounded-full px-6 py-2 text-sm font-bold shadow-none transition ${activeTab === 'pending' ? 'bg-[#2563eb] text-white' : 'bg-[#E6F0FF] text-[#2563eb]'}`}
            >
              대기중 (2)
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`rounded-full px-6 py-2 text-sm font-bold shadow-none transition ${activeTab === 'approved' ? 'bg-[#2563eb] text-white' : 'bg-[#E6F0FF] text-[#2563eb]'}`}
            >
              승인됨 (1)
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`rounded-full px-6 py-2 text-sm font-bold shadow-none transition ${activeTab === 'rejected' ? 'bg-[#2563eb] text-white' : 'bg-[#E6F0FF] text-[#2563eb]'}`}
            >
              거절됨 (0)
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {filtered.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-4 shadow-sm"
              >
                {/* 프로필 pill */}
                <div className="mr-4 flex flex-col items-center">
                  <div className="mb-1 rounded-full border bg-[#EDE3FF] px-3 py-1 text-base font-bold text-[#7C3AED] shadow-sm">
                    {req.name[0]}
                  </div>
                </div>
                {/* 이름/상태/날짜/프로필 */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-base font-bold text-gray-800">
                      {req.name}
                    </span>
                    <span
                      className={`ml-1 rounded-full px-3 py-1 text-xs font-semibold ${statusLabel[req.status as 'pending' | 'approved' | 'rejected' | 'confirmed'].class}`}
                    >
                      {
                        statusLabel[
                          req.status as
                            | 'pending'
                            | 'approved'
                            | 'rejected'
                            | 'confirmed'
                        ].label
                      }
                    </span>
                    <span className="ml-2 text-xs font-normal text-gray-400">
                      {req.date}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      (window.location.href = `/profile/${req.name}`)
                    }
                    className="w-fit cursor-pointer rounded border border-[#BFD7FF] bg-[#E3F0FF] px-3 py-1 text-xs font-semibold text-[#2563eb] shadow-sm transition hover:bg-[#d1e7ff]"
                  >
                    프로필 보기
                  </button>
                </div>
                {/* 버튼 */}
                <div className="ml-4 flex items-center gap-2">
                  {req.status === 'pending' && (
                    <>
                      <button className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-[#E3FFF6] px-4 py-2 text-xs font-bold text-[#1CB66D] shadow-none transition hover:bg-[#c2f2e3]">
                        <span className="mb-0.5 text-base">✓</span> 승인
                      </button>
                      <button className="ml-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-[#FFE3E3] bg-white px-4 py-2 text-xs font-bold text-[#E64C4C] shadow-none transition hover:bg-[#ffe3e3]">
                        <span className="mb-0.5 text-base">×</span> 거절
                      </button>
                    </>
                  )}
                  {req.status === 'approved' && (
                    <button
                      disabled
                      className="flex cursor-not-allowed flex-col items-center justify-center rounded-lg bg-[#E3FFF6] px-4 py-2 text-xs font-bold text-[#1CB66D] shadow-none"
                    >
                      <span className="mb-0.5 text-base">✓</span> 승인됨
                    </button>
                  )}
                  {req.status === 'confirmed' && (
                    <button
                      disabled
                      className="flex cursor-not-allowed flex-col items-center justify-center rounded-lg bg-[#E6E6FF] px-4 py-2 text-xs font-bold text-[#7C3AED] shadow-none"
                    >
                      <span className="mb-0.5 text-base">✓</span> 참여 확정
                    </button>
                  )}
                  {req.status === 'rejected' && (
                    <button
                      disabled
                      className="flex cursor-not-allowed flex-col items-center justify-center rounded-lg bg-[#FFE3E3] px-4 py-2 text-xs font-bold text-[#E64C4C] shadow-none"
                    >
                      <span className="mb-0.5 text-base">×</span> 거절됨
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Container>
  )
}
