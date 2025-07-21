'use client'

import Container from '@/components/Container'
import { cn } from '@/lib/utils'
import { Edit, Eye, Search, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import PageHeader from '@/components/ui/PageHeader'

const badgeActive =
  'inline-flex items-center gap-1 rounded-full bg-[#E6F9F0] text-[#22C55E] px-3 py-1 text-xs font-bold border border-[#B6F2D6]'
const badgeExpired =
  'inline-flex items-center gap-1 rounded-full bg-[#FFF0F0] text-[#FF3B30] px-3 py-1 text-xs font-bold border border-[#FFD6D6]'

// 피그마 스타일용 색상/클래스
const cardClass = 'rounded-xl bg-white border border-gray-200' // shadow, border-0 제거, border 얇게
const tabWrap = 'flex gap-2 bg-[#F2F4FA] rounded-xl p-1 w-fit mb-8'
const tabBtn =
  'px-4 py-1 rounded font-medium transition text-base cursor-pointer' // 두께, padding, cursor-pointer
const tabActive = 'bg-[#E3E8FF] text-[#7B61FF]'
const tabInactive = 'text-[#B0B8C1] hover:bg-[#E3E8FF]'
const inputClass =
  'rounded border border-gray-200 bg-white px-3 py-2 text-base w-full placeholder:text-[#B0B8C1] focus:border-[#8BB5FF] focus:ring-1 focus:ring-[#8BB5FF]/20 focus:bg-white transition mt-1' // border, shadow, spacing
// 버튼 스타일 축소
const btnMain =
  'rounded bg-[#E3E8FF] text-[#7B61FF] font-medium px-3 py-1 text-sm hover:bg-[#A7BFFF] transition flex items-center gap-2 cursor-pointer' // shadow, 두꺼운 border 제거, cursor-pointer

// 쿠폰 타입 정의
interface Coupon {
  id: string
  name: string
  discount: number
  minAmount: number
  totalQuantity: number
  usedQuantity: number
  remainingQuantity: number
  createdDate: string
  expiryDate: string
  status: 'active' | 'inactive' | 'expired'
  description: string
  totalDiscount: number
  averageOrderAmount: number
  dailyUsage: number
}

// 더미 데이터
const dummyCoupons: Coupon[] = [
  {
    id: '1000',
    name: '신규회원 특별할인',
    discount: 30,
    minAmount: 50000,
    totalQuantity: 100,
    usedQuantity: 50,
    remainingQuantity: 50,
    createdDate: '2024년 1월 8일',
    expiryDate: '2024년 12월 31일',
    status: 'active',
    description:
      '신규 회원을 위한 특별 할인 쿠폰입니다. 첫 구매 시 30% 할인 혜택을 제공하며, 최소 주문금액 50,000원 이상 구매 시 사용 가능합니다.',
    totalDiscount: 79500,
    averageOrderAmount: 88333,
    dailyUsage: 2.5,
  },
  {
    id: '1001',
    name: 'VIP 회원 전용',
    discount: 25,
    minAmount: 100000,
    totalQuantity: 50,
    usedQuantity: 15,
    remainingQuantity: 35,
    createdDate: '2024년 1월 7일',
    expiryDate: '2024년 11월 30일',
    status: 'active',
    description:
      'VIP 회원을 위한 전용 할인 쿠폰입니다. 25% 할인 혜택을 제공하며, 최소 주문금액 100,000원 이상 구매 시 사용 가능합니다.',
    totalDiscount: 45000,
    averageOrderAmount: 120000,
    dailyUsage: 1.2,
  },
  {
    id: '1002',
    name: '주말 특가 쿠폰',
    discount: 20,
    minAmount: 30000,
    totalQuantity: 200,
    usedQuantity: 200,
    remainingQuantity: 0,
    createdDate: '2024년 1월 6일',
    expiryDate: '2024년 1월 15일',
    status: 'expired',
    description:
      '주말에만 사용 가능한 특가 쿠폰입니다. 20% 할인 혜택을 제공하며, 최소 주문금액 30,000원 이상 구매 시 사용 가능합니다.',
    totalDiscount: 120000,
    averageOrderAmount: 75000,
    dailyUsage: 15.0,
  },
]

// 메인 페이지 컴포넌트
export default function CouponAdminPage() {
  const [tab, setTab] = useState<'list' | 'create'>('list')
  const [search, setSearch] = useState('')
  const [statusTab, setStatusTab] = useState<
    'all' | 'active' | 'used' | 'expired'
  >('all')
  const [coupons] = useState<Coupon[]>(dummyCoupons)

  // 검색/필터링
  const filtered = coupons.filter((c) => {
    const match = c.name.includes(search) || c.description.includes(search)
    if (statusTab === 'all') return match
    if (statusTab === 'active') return c.status === 'active' && match
    if (statusTab === 'expired') return c.status === 'expired' && match
    if (statusTab === 'used') return c.usedQuantity > 0 && match
    return match
  })

  // 통계
  const totalCount = coupons.length
  const activeCount = coupons.filter((c) => c.status === 'active').length
  const usedCount = coupons.reduce((sum, c) => sum + c.usedQuantity, 0)
  const totalDiscount = coupons.reduce((sum, c) => sum + c.totalDiscount, 0)

  // 탭 UI
  const TabBar = (
    <div className={tabWrap}>
      <button
        className={cn(tabBtn, tab === 'list' ? tabActive : tabInactive)}
        onClick={() => setTab('list')}
      >
        쿠폰 목록
      </button>
      <button
        className={cn(tabBtn, tab === 'create' ? tabActive : tabInactive)}
        onClick={() => setTab('create')}
      >
        쿠폰 생성
      </button>
    </div>
  )

  // 쿠폰 목록 테이블
  function CouponList({
    coupons,
    onDetail,
  }: {
    coupons: Coupon[]
    onDetail: (coupon: Coupon) => void
  }) {
    return (
      <>
        {/* 검색 인풋 */}
        {/* <div className={cardClass + ' mb-6 flex flex-col gap-4 p-6'}>
          <div className="flex items-center gap-2">
            <span className="text-lg text-[#7B61FF]">
              <Search />
            </span>
            <input
              className={inputClass + ' max-w-xl'}
              placeholder="쿠폰명, 사용자명으로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={btnMain + ' ml-2 px-8'}>검색</button>
          </div>
        </div> */}

        {/* 통계 카드 */}
        {/* <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="flex flex-col items-center rounded-2xl bg-[#EEF3FF] p-6 shadow">
            <span className="text-2xl font-bold text-[#7B61FF]">
              {totalCount}
            </span>
            <span className="mt-1 text-xs font-bold text-[#7B61FF]">
              총 쿠폰 수
            </span>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-[#E6F9F0] p-6 shadow">
            <span className="text-2xl font-bold text-[#22C55E]">
              {activeCount}
            </span>
            <span className="mt-1 text-xs font-bold text-[#22C55E]">
              활성 쿠폰
            </span>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-[#FFF9E3] p-6 shadow">
            <span className="text-2xl font-bold text-[#F59E42]">
              {usedCount}
            </span>
            <span className="mt-1 text-xs font-bold text-[#F59E42]">
              사용된 쿠폰
            </span>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-[#F3EEFF] p-6 shadow">
            <span className="text-2xl font-bold text-[#A78BFA]">
              ₩{(totalDiscount / 10000).toFixed(1)}만
            </span>
            <span className="mt-1 text-xs font-bold text-[#A78BFA]">
              총 할인액
            </span>
          </div>
        </div> */}

        {/* 상태별 탭/필터 */}
        {/* <div className="mb-4 flex gap-2">
          <button
            className={cn(
              tabBtn,
              statusTab === 'all' ? tabActive : tabInactive,
            )}
            onClick={() => setStatusTab('all')}
          >
            전체 쿠폰
          </button>
          <button
            className={cn(
              tabBtn,
              statusTab === 'active' ? tabActive : tabInactive,
            )}
            onClick={() => setStatusTab('active')}
          >
            활성 쿠폰
          </button>
          <button
            className={cn(
              tabBtn,
              statusTab === 'used' ? tabActive : tabInactive,
            )}
            onClick={() => setStatusTab('used')}
          >
            사용된 쿠폰
          </button>
          <button
            className={cn(
              tabBtn,
              statusTab === 'expired' ? tabActive : tabInactive,
            )}
            onClick={() => setStatusTab('expired')}
          >
            종료 쿠폰
          </button>
          <div className="flex-1" />
          <button className={btnMain + ' px-4'}>내보내기</button>
        </div> */}
        <div className={cardClass + ' p-8'}>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-lg">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm2 0v10h12V7H6zm2 2h8v2H8V9zm0 4h5v2H8v-2z"
                    fill="#7B61FF"
                  />
                </svg>
              </span>
              <span className="text-lg font-bold text-gray-900">쿠폰 목록</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 text-base">
              <thead>
                <tr className="border-b-2 border-[#E3E8FF] bg-[#F6F7FB] text-sm font-medium text-[#7B61FF]">
                  <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                    쿠폰명
                  </th>
                  <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                    할인율
                  </th>
                  <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                    수량
                  </th>
                  <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                    최소주문금액
                  </th>
                  <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                    유효기간
                  </th>
                  <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                    상태
                  </th>
                  <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                    사용횟수
                  </th>
                  <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                    생성일
                  </th>
                  <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-400">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="rounded-2xl border-b border-[#E3E8FF] bg-white transition last:border-0 hover:scale-[1.01] hover:shadow-lg"
                    >
                      <td className="px-4 py-3 align-middle font-semibold whitespace-nowrap text-gray-900">
                        {c.name}
                      </td>
                      <td className="px-4 py-3 text-center align-middle text-sm font-bold whitespace-nowrap text-[#FF3B30]">
                        {c.discount}%
                      </td>
                      <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                        {c.usedQuantity}/{c.totalQuantity}
                      </td>
                      <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                        {c.minAmount.toLocaleString()}원
                      </td>
                      <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                        {c.expiryDate}
                      </td>
                      <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                        {c.status === 'active' ? (
                          <span className={badgeActive}>
                            <span>활</span>
                            <span>성</span>
                          </span>
                        ) : (
                          <span className={badgeExpired}>
                            <span>종</span>
                            <span>료</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                        <Link
                          href={'/admin/coupon/' + c.id}
                          className="font-bold text-[#2563eb] underline hover:text-[#7B61FF]"
                        >
                          {c.usedQuantity}회
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                        {c.createdDate}
                      </td>
                      <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={'/admin/coupon/' + c.id}
                            className="rounded-full border border-[#E3E8FF] bg-white p-2 shadow transition hover:bg-[#F6F7FB]"
                            title="상세보기"
                          >
                            <Eye className="h-5 w-5 text-[#7B61FF]" />
                          </Link>
                          <Link
                            href={`/admin/coupon/${c.id}/edit`}
                            className="rounded-full border border-[#E3E8FF] bg-white p-2 shadow transition hover:bg-[#F6F7FB]"
                            title="수정"
                          >
                            <Edit className="h-5 w-5 text-[#22C55E]" />
                          </Link>
                          <button
                            onClick={() => alert('삭제 기능 구현 필요')}
                            className="rounded-full border border-[#E3E8FF] bg-white p-2 shadow transition hover:bg-[#FFF0F0]"
                            title="삭제"
                          >
                            <Trash2 className="h-5 w-5 text-[#FF3B30]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }

  // 쿠폰 생성 폼 (피그마 스타일)
  function CouponCreateForm() {
    const [formData, setFormData] = useState({
      name: '',
      discount: '',
      minAmount: '',
      totalQuantity: '',
      openDate: '',
      expiryDate: '',
      couponType: '',
      description: '',
    })
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // 쿠폰 생성 로직
      console.log('쿠폰 생성:', formData)
    }
    return (
      <div className={cardClass + ' p-8'}>
        <div className="mb-4 flex items-center gap-2 text-lg font-bold">
          <span className="text-xl text-[#7B61FF]">+</span> 새 쿠폰 생성
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                쿠폰 이름
              </label>
              <div className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="예: 신규회원 특별할인"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                발행 수량
              </label>
              <div className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="100"
                  value={formData.totalQuantity}
                  onChange={(e) =>
                    setFormData({ ...formData, totalQuantity: e.target.value })
                  }
                />
                <span className="font-bold text-[#B0B8C1]">개</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                할인율 (% or 원)
              </label>
              <div className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="30"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
                />
                <span className="font-bold text-[#B0B8C1]">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                최소 주문금액 (원)
              </label>
              <div className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="50000"
                  value={formData.minAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, minAmount: e.target.value })
                  }
                />
                <span className="font-bold text-[#B0B8C1]">원</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                오픈 날짜
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className={inputClass}
                  placeholder="mm/dd/yyyy"
                  value={formData.openDate}
                  onChange={(e) =>
                    setFormData({ ...formData, openDate: e.target.value })
                  }
                />
                <svg
                  className="h-5 w-5 text-[#B0B8C1]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                유효기간
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className={inputClass}
                  placeholder="mm/dd/yyyy"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                />
                <svg
                  className="h-5 w-5 text-[#B0B8C1]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                쿠폰 종류
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    className={inputClass}
                    placeholder="쿠폰 종류를 선택하세요"
                    value={formData.couponType}
                    onChange={(e) =>
                      setFormData({ ...formData, couponType: e.target.value })
                    }
                  />
                  <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
                    <svg
                      className="h-4 w-4 text-[#B0B8C1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <svg
                      className="h-4 w-4 text-[#B0B8C1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                쿠폰 설명
              </label>
              <div className="relative">
                <textarea
                  className={inputClass + ' resize-none pr-10'}
                  placeholder="쿠폰에 대한 설명을 입력하세요"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
                <div className="absolute right-2 bottom-2">
                  <svg
                    className="h-4 w-4 text-[#B0B8C1]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className={
                btnMain + ' bg-[#F2F4FA] text-[#7B61FF] hover:bg-[#E3E8FF]'
              }
            >
              취소
            </button>
            <button
              type="submit"
              className={
                btnMain +
                ' bg-gradient-to-r from-[#A7BFFF] to-[#E1D8FB] text-[#7B61FF]'
              }
            >
              + 쿠폰 생성
            </button>
          </div>
        </form>
      </div>
    )
  }

  // 쿠폰 조회 탭
  const CouponSearchTab = (
    <>
      {/* 검색 인풋 */}
      <div className={cardClass + ' mb-6 flex flex-col gap-4 p-6'}>
        <div className="flex items-center gap-2">
          <span className="text-lg text-[#7B61FF]">
            <Search />
          </span>
          <input
            className={inputClass + ' max-w-xl'}
            placeholder="쿠폰명, 사용자명으로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={btnMain + ' ml-2 px-8'}>검색</button>
        </div>
      </div>
      {/* 통계 카드 */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="flex flex-col items-center rounded-2xl bg-[#EEF3FF] p-6 shadow">
          <span className="text-2xl font-bold text-[#7B61FF]">
            {totalCount}
          </span>
          <span className="mt-1 text-xs font-bold text-[#7B61FF]">
            총 쿠폰 수
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-[#E6F9F0] p-6 shadow">
          <span className="text-2xl font-bold text-[#22C55E]">
            {activeCount}
          </span>
          <span className="mt-1 text-xs font-bold text-[#22C55E]">
            활성 쿠폰
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-[#FFF9E3] p-6 shadow">
          <span className="text-2xl font-bold text-[#F59E42]">{usedCount}</span>
          <span className="mt-1 text-xs font-bold text-[#F59E42]">
            사용된 쿠폰
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-[#F3EEFF] p-6 shadow">
          <span className="text-2xl font-bold text-[#A78BFA]">
            ₩{(totalDiscount / 10000).toFixed(1)}만
          </span>
          <span className="mt-1 text-xs font-bold text-[#A78BFA]">
            총 할인액
          </span>
        </div>
      </div>
      {/* 상태별 탭/필터 */}
      <div className="mb-4 flex gap-2">
        <button
          className={cn(tabBtn, statusTab === 'all' ? tabActive : tabInactive)}
          onClick={() => setStatusTab('all')}
        >
          전체 쿠폰
        </button>
        <button
          className={cn(
            tabBtn,
            statusTab === 'active' ? tabActive : tabInactive,
          )}
          onClick={() => setStatusTab('active')}
        >
          활성 쿠폰
        </button>
        <button
          className={cn(tabBtn, statusTab === 'used' ? tabActive : tabInactive)}
          onClick={() => setStatusTab('used')}
        >
          사용된 쿠폰
        </button>
        <button
          className={cn(
            tabBtn,
            statusTab === 'expired' ? tabActive : tabInactive,
          )}
          onClick={() => setStatusTab('expired')}
        >
          종료 쿠폰
        </button>
        <div className="flex-1" />
        <button className={btnMain + ' px-4'}>내보내기</button>
      </div>
      {/* 결과 테이블 */}
      <div className={cardClass + ' overflow-x-auto p-0'}>
        <table className="w-full border-separate border-spacing-0 text-base">
          <thead>
            <tr className="border-b-2 border-[#E3E8FF] bg-[#F6F7FB] text-sm font-bold text-[#7B61FF]">
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                쿠폰명
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                할인율
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                수량
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                최소주문금액
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                유효기간
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                상태
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                사용횟수
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                생성일
              </th>
              <th className="border-b-2 border-[#E3E8FF] px-4 py-3 font-bold whitespace-nowrap">
                액션
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-gray-400">
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr
                  key={c.id}
                  className="rounded-2xl border-b border-[#E3E8FF] bg-white transition last:border-0 hover:scale-[1.01] hover:shadow-lg"
                >
                  <td className="px-4 py-3 align-middle font-semibold whitespace-nowrap text-gray-900">
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm font-bold whitespace-nowrap text-[#FF3B30]">
                    {c.discount}%
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.usedQuantity}/{c.totalQuantity}
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.minAmount.toLocaleString()}원
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.expiryDate}
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    {c.status === 'active' ? (
                      <span className={badgeActive}>
                        <span>활</span>
                        <span>성</span>
                      </span>
                    ) : (
                      <span className={badgeExpired}>
                        <span>종</span>
                        <span>료</span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    <Link
                      href={'/admin/coupon/' + c.id}
                      className="font-bold text-[#2563eb] underline hover:text-[#7B61FF]"
                    >
                      {c.usedQuantity}회
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.createdDate}
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={'/admin/coupon/' + c.id}
                        className="rounded-full border border-[#E3E8FF] bg-white p-2 shadow transition hover:bg-[#F6F7FB]"
                        title="상세보기"
                      >
                        <Eye className="h-5 w-5 text-[#7B61FF]" />
                      </Link>
                      <Link
                        href={`/admin/coupon/${c.id}/edit`}
                        className="rounded-full border border-[#E3E8FF] bg-white p-2 shadow transition hover:bg-[#F6F7FB]"
                        title="수정"
                      >
                        <Edit className="h-5 w-5 text-[#22C55E]" />
                      </Link>
                      <button
                        onClick={() => alert('삭제 기능 구현 필요')}
                        className="rounded-full border border-[#E3E8FF] bg-white p-2 shadow transition hover:bg-[#FFF0F0]"
                        title="삭제"
                      >
                        <Trash2 className="h-5 w-5 text-[#FF3B30]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )

  return (
    <Container size="lg">
      <PageHeader
        title="쿠폰 관리"
        subtitle="쿠폰을 생성하고 관리할 수 있습니다."
        align="center"
      />
      {TabBar}
      {tab === 'list' && <CouponList coupons={coupons} onDetail={() => {}} />}
      {tab === 'create' && <CouponCreateForm />}
    </Container>
  )
}
