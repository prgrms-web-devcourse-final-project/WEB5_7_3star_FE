'use client'

import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import { getAdminCoupons } from '@/lib/api'
import { cn } from '@/lib/utils'
import { components } from '@/types/swagger-generated'
import { Edit, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

type Coupon = components['schemas']['CouponListItemDto']

// 메인 페이지 컴포넌트
export default function CouponAdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'list' | 'create'>('list')
  const [coupons, setCoupons] = useState<Coupon[]>([])

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

  const fetchCoupons = async () => {
    const coupon = await getAdminCoupons()
    if (coupon.data) {
      setCoupons(coupon.data.coupons)
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  return (
    <Container size="lg">
      <PageHeader
        title="쿠폰 관리"
        subtitle="쿠폰을 생성하고 관리할 수 있습니다."
        align="center"
      />
      {TabBar}
      {tab === 'list' && <CouponList coupons={coupons} />}
      {tab === 'create' && <CouponCreateForm />}
    </Container>
  )
}

function CouponList({ coupons }: { coupons: Coupon[] }) {
  const router = useRouter()

  const handleDeleteCoupon = async (couponId: number) => {
    const response = await fetch(
      `/api/proxy/api/v1/admin/coupons/${couponId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      alert(errorData.message)
    } else {
      alert('쿠폰 삭제가 완료되었습니다.')
      window.location.reload()
    }
  }

  return (
    <>
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
                  상태
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  유효기간
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  오픈시각
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  종료시각
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  생성일
                </th>
                <th className="border-b-2 border-[#E3E8FF] px-4 py-2 font-medium whitespace-nowrap">
                  관리
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons?.map((c) => (
                <tr
                  key={c.couponId}
                  className="rounded-2xl border-b border-[#E3E8FF] bg-white transition last:border-0 hover:scale-[1.01] hover:shadow-lg"
                >
                  <td className="px-4 py-3 align-middle font-semibold whitespace-nowrap text-gray-900">
                    {c.couponName}
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm font-bold whitespace-nowrap text-[#FF3B30]">
                    {c.discountPrice}
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.quantity}
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.minOrderPrice?.toLocaleString()}원
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    {c.status === 'ACTIVE' ? (
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
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.expirationDate?.split('T')[0]}{' '}
                    {c.expirationDate?.split('T')[1].slice(0, 5)}
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    {c.category === 'OPEN_RUN' ? (
                      c.couponOpenAt ? (
                        <>
                          {c.couponOpenAt?.split('T')[0]}{' '}
                          {c.couponOpenAt?.split('T')[1].slice(0, 5)}
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    {c.category === 'OPEN_RUN' ? (
                      c.couponDeadlineAt ? (
                        <>
                          {c.couponDeadlineAt?.split('T')[0]}{' '}
                          {c.couponDeadlineAt?.split('T')[1].slice(0, 5)}
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                    {c.createdAt?.split('T')[0]}{' '}
                    {c.createdAt?.split('T')[1].slice(0, 5)}
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={'/admin/coupon/' + c.couponId}
                        className="rounded-full border border-[#E3E8FF] bg-white p-2 transition hover:bg-[#F6F7FB]"
                        title="상세보기"
                      >
                        <Eye className="h-5 w-5 text-[#7B61FF]" />
                      </Link>
                      <Link
                        href={`/admin/coupon/${c.couponId}/edit`}
                        className="rounded-full border border-[#E3E8FF] bg-white p-2 transition hover:bg-[#F6F7FB]"
                        title="수정"
                      >
                        <Edit className="h-5 w-5 text-[#22C55E]" />
                      </Link>
                      <button
                        onClick={() => {
                          if (c.couponId) {
                            handleDeleteCoupon(c.couponId)
                          }
                        }}
                        className="rounded-full border border-[#E3E8FF] bg-white p-2 text-sm transition hover:bg-[#FFF0F0]"
                        title="삭제"
                      >
                        <Trash2 className="h-5 w-5 text-[#FF3B30]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function CouponCreateForm() {
  // 현재 시간을 ISO 형식으로 변환 (datetime-local 입력에 맞게)
  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const [formData, setFormData] = useState({
    couponName: '',
    discountPrice: '0',
    minOrderPrice: 0,
    quantity: 0,
    expirationDate: '',
    couponOpenAt: getCurrentDateTime(),
    couponDeadlineAt: '',
    category: 'NORMAL' as 'OPEN_RUN' | 'NORMAL',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/proxy/api/v1/admin/coupons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      alert(errorData.message)
    } else {
      alert('쿠폰 생성이 완료되었습니다.')
      window.location.reload()
    }
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
                value={formData.couponName}
                onChange={(e) =>
                  setFormData({ ...formData, couponName: e.target.value })
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
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: +e.target.value })
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
                value={formData.discountPrice}
                onChange={(e) =>
                  setFormData({ ...formData, discountPrice: e.target.value })
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
                value={formData.minOrderPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minOrderPrice: +e.target.value,
                  })
                }
              />
              <span className="font-bold text-[#B0B8C1]">원</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#7B61FF]">
              쿠폰 종류
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <select
                  className={inputClass + ' appearance-none'}
                  value={formData.category}
                  onChange={(e) => {
                    const newType = e.target.value
                    setFormData({
                      ...formData,
                      category: newType as 'OPEN_RUN' | 'NORMAL',
                      // 선착순이 아닌 경우 시간 필드 초기화
                      couponOpenAt:
                        newType !== 'OPEN_RUN' ? '' : formData.couponOpenAt,
                      expirationDate:
                        newType !== 'OPEN_RUN' ? '' : formData.expirationDate,
                      couponDeadlineAt:
                        newType !== 'OPEN_RUN' ? '' : formData.couponDeadlineAt,
                    })
                  }}
                >
                  <option value="">쿠폰 종류를 선택하세요</option>
                  <option value="OPEN_RUN">선착순</option>
                  <option value="NORMAL">일반</option>
                </select>
                <div className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
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
            <label className="text-xs font-bold text-[#7B61FF]">유효기간</label>
            <div className="flex items-center gap-2">
              <input
                type="datetime-local"
                className={inputClass}
                placeholder="yyyy-mm-dd hh:mm"
                value={formData.expirationDate}
                onChange={(e) =>
                  setFormData({ ...formData, expirationDate: e.target.value })
                }
              />
              <svg
                className={`h-5 w-5 ${formData.category !== 'OPEN_RUN' ? 'text-gray-300' : 'text-[#B0B8C1]'}`}
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
              오픈 시각
            </label>
            <div className="flex items-center gap-2">
              <input
                type="datetime-local"
                className={inputClass}
                placeholder="yyyy-mm-dd hh:mm"
                value={formData.couponOpenAt}
                onChange={(e) =>
                  setFormData({ ...formData, couponOpenAt: e.target.value })
                }
                disabled={formData.category !== 'OPEN_RUN'}
              />
              <svg
                className={`h-5 w-5 ${formData.category !== 'OPEN_RUN' ? 'text-gray-300' : 'text-[#B0B8C1]'}`}
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
            {formData.category !== 'OPEN_RUN' && (
              <p className="text-xs text-gray-400">
                선착순 쿠폰에서만 설정 가능합니다.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#7B61FF]">
              종료 시각
            </label>
            <div className="flex items-center gap-2">
              <input
                type="datetime-local"
                className={inputClass}
                placeholder="yyyy-mm-dd hh:mm"
                value={formData.couponDeadlineAt}
                onChange={(e) =>
                  setFormData({ ...formData, couponDeadlineAt: e.target.value })
                }
                disabled={formData.category !== 'OPEN_RUN'}
              />
              <svg
                className={`h-5 w-5 ${formData.category !== 'OPEN_RUN' ? 'text-gray-300' : 'text-[#B0B8C1]'}`}
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
            {formData.category !== 'OPEN_RUN' && (
              <p className="text-xs text-gray-400">
                선착순 쿠폰에서만 설정 가능합니다.
              </p>
            )}
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
