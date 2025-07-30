'use client'

import Container from '@/components/Container'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import PageHeader from '@/components/ui/PageHeader'
import { components } from '@/types/swagger-generated'
import { AlertTriangle, ArrowLeft, Save, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Coupon = components['schemas']['CouponListItemDto']

// 피그마 스타일용 색상/클래스
const cardClass = 'rounded-xl bg-white border border-gray-200'
const inputClass =
  'rounded border border-gray-200 bg-white px-3 py-2 text-base w-full placeholder:text-[#B0B8C1] focus:border-[#8BB5FF] focus:ring-1 focus:ring-[#8BB5FF]/20 focus:bg-white transition mt-1'
const disabledInputClass =
  'rounded border border-gray-200 bg-gray-100 px-3 py-2 text-base w-full text-gray-500 cursor-not-allowed mt-1'
const btnMain =
  'rounded bg-[#E3E8FF] text-[#7B61FF] font-medium px-3 py-1 text-sm hover:bg-[#A7BFFF] transition flex items-center gap-2 cursor-pointer'

export default function CouponEditPage() {
  const params = useParams()
  const router = useRouter()
  const [coupon, setCoupon] = useState<Coupon | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    couponName: '',
    discountPrice: '',
    minOrderPrice: 0,
    quantity: 0,
    expirationDate: '',
    couponOpenAt: '',
    couponDeadlineAt: '',
    category: 'NORMAL' as 'OPEN_RUN' | 'NORMAL',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
  })

  // 날짜가 현재 시간보다 미래인지 확인
  const isFutureDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    return date > now
  }

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await fetch(
          `/api/proxy/api/v1/admin/coupons/${params.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          },
        )

        if (!response.ok) {
          throw new Error('쿠폰 정보를 불러올 수 없습니다.')
        }

        const data = await response.json()
        const couponData = data.data

        setCoupon(couponData)
        setFormData({
          couponName: couponData.couponName || '',
          discountPrice: couponData.discountPrice || '',
          minOrderPrice: couponData.minOrderPrice || 0,
          quantity: couponData.quantity || 0,
          expirationDate: couponData.expirationDate
            ? couponData.expirationDate.split('T')[0] +
              'T' +
              couponData.expirationDate.split('T')[1].slice(0, 5)
            : '',
          couponOpenAt: couponData.couponOpenAt
            ? couponData.couponOpenAt.split('T')[0] +
              'T' +
              couponData.couponOpenAt.split('T')[1].slice(0, 5)
            : '',
          couponDeadlineAt: couponData.couponDeadlineAt
            ? couponData.couponDeadlineAt.split('T')[0] +
              'T' +
              couponData.couponDeadlineAt.split('T')[1].slice(0, 5)
            : '',
          category: couponData.category || 'NORMAL',
          status: couponData.status || 'ACTIVE',
        })
      } catch (error) {
        console.error('쿠폰 정보 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCoupon()
    }
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `/api/proxy/api/v1/admin/coupons/${params.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            couponName: formData.couponName,
            category: formData.category,
            status: formData.status,
            quantity:
              formData.category === 'OPEN_RUN' ? formData.quantity : null,
            couponOpenAt:
              formData.category === 'OPEN_RUN' ? formData.couponOpenAt : null,
            couponDeadlineAt:
              formData.category === 'OPEN_RUN'
                ? formData.couponDeadlineAt
                : null,
          }),
          credentials: 'include',
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        alert(errorData.message || '쿠폰 수정에 실패했습니다.')
      } else {
        alert('쿠폰 수정이 완료되었습니다.')
        router.push(`/admin/coupon/${params.id}`)
      }
    } catch (error) {
      alert('쿠폰 수정 중 오류가 발생했습니다.')
      console.error('쿠폰 수정 실패:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#8BB5FF]"></div>
          <p className="mt-4 text-gray-600">쿠폰 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!coupon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              쿠폰을 찾을 수 없습니다
            </h2>
            <p className="mb-6 text-gray-600">
              요청하신 쿠폰이 존재하지 않거나 삭제되었습니다.
            </p>
            <Button onClick={() => router.push('/admin/coupon')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              쿠폰 목록으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Container size="lg">
      <PageHeader
        title="쿠폰 수정"
        subtitle={`${coupon.couponName} 쿠폰의 정보를 수정할 수 있습니다.`}
        align="left"
        right={
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <X className="mr-2 h-4 w-4" />
                취소
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>변경사항 취소</AlertDialogTitle>
                <AlertDialogDescription>
                  변경사항이 저장되지 않습니다. 정말로 나가시겠습니까?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>계속 편집</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => router.push(`/admin/coupon/${params.id}`)}
                >
                  나가기
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
      />

      {/* 수정 폼 */}
      <div className={cardClass + ' p-8'}>
        <div className="mb-4 flex items-center gap-2 text-lg font-bold">
          <span className="text-xl text-[#7B61FF]">✏️</span> 쿠폰 정보 수정
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 쿠폰명 - 수정 가능 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                쿠폰 이름
              </label>
              <input
                className={inputClass}
                placeholder="예: 신규회원 특별할인"
                value={formData.couponName}
                onChange={(e) =>
                  setFormData({ ...formData, couponName: e.target.value })
                }
                required
              />
            </div>

            {/* 쿠폰 ID - 읽기 전용 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                쿠폰 ID
              </label>
              <input
                className={disabledInputClass}
                value={coupon.couponId}
                disabled
                readOnly
              />
            </div>

            {/* 할인율 - 읽기 전용 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                할인율 (% or 원)
              </label>
              <input
                className={disabledInputClass}
                value={coupon.discountPrice}
                disabled
                readOnly
              />
            </div>

            {/* 최소 주문금액 - 읽기 전용 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                최소 주문금액 (원)
              </label>
              <input
                className={disabledInputClass}
                value={coupon.minOrderPrice?.toLocaleString()}
                disabled
                readOnly
              />
            </div>

            {/* 쿠폰 종류 - 수정 가능 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                쿠폰 종류
              </label>
              <div className="relative flex-1">
                <select
                  className={inputClass + ' appearance-none'}
                  value={formData.category}
                  onChange={(e) => {
                    const newType = e.target.value as 'OPEN_RUN' | 'NORMAL'
                    setFormData({
                      ...formData,
                      category: newType,
                      // 선착순이 아닌 경우 시간 필드 초기화
                      couponOpenAt:
                        newType !== 'OPEN_RUN' ? '' : formData.couponOpenAt,
                      couponDeadlineAt:
                        newType !== 'OPEN_RUN' ? '' : formData.couponDeadlineAt,
                    })
                  }}
                >
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

            {/* 발행 수량 - 선착순일 때만 수정 가능 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                발행 수량
              </label>
              <div className="flex items-center gap-2">
                <input
                  className={
                    formData.category === 'OPEN_RUN'
                      ? inputClass
                      : disabledInputClass
                  }
                  placeholder="100"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: +e.target.value })
                  }
                  disabled={formData.category !== 'OPEN_RUN'}
                  required={formData.category === 'OPEN_RUN'}
                />
                <span className="font-bold text-[#B0B8C1]">개</span>
              </div>
            </div>

            {/* 유효기간 - 읽기 전용 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                유효기간
              </label>
              <input
                type="datetime-local"
                className={disabledInputClass}
                value={formData.expirationDate}
                disabled
                readOnly
              />
            </div>

            {/* 발급 오픈 시각 - 선착순이고 미래일 때만 수정 가능 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                발급 오픈 시각
              </label>
              <input
                type="datetime-local"
                className={
                  formData.category === 'OPEN_RUN' &&
                  isFutureDate(formData.couponOpenAt)
                    ? inputClass
                    : disabledInputClass
                }
                value={formData.couponOpenAt}
                onChange={(e) =>
                  setFormData({ ...formData, couponOpenAt: e.target.value })
                }
                disabled={
                  formData.category !== 'OPEN_RUN' ||
                  !isFutureDate(formData.couponOpenAt)
                }
              />
            </div>

            {/* 발급 종료 시각 - 선착순이고 미래일 때만 수정 가능 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">
                발급 종료 시각
              </label>
              <input
                type="datetime-local"
                className={
                  formData.category === 'OPEN_RUN' &&
                  isFutureDate(formData.couponDeadlineAt)
                    ? inputClass
                    : disabledInputClass
                }
                value={formData.couponDeadlineAt}
                onChange={(e) =>
                  setFormData({ ...formData, couponDeadlineAt: e.target.value })
                }
                disabled={
                  formData.category !== 'OPEN_RUN' ||
                  !isFutureDate(formData.couponDeadlineAt)
                }
              />
            </div>

            {/* 상태 - 수정 가능 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B61FF]">상태</label>
              <div className="relative flex-1">
                <select
                  className={inputClass + ' appearance-none'}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as 'ACTIVE' | 'INACTIVE',
                    })
                  }
                >
                  <option value="ACTIVE">활성</option>
                  <option value="INACTIVE">비활성</option>
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

          {/* 읽기 전용 정보 */}
          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-6">
            <h3 className="mb-4 font-semibold text-gray-700">읽기 전용 정보</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">생성일</Label>
                <div className="text-sm font-medium text-gray-900">
                  {coupon.createdAt?.split('T')[0]}{' '}
                  {coupon.createdAt?.split('T')[1].slice(0, 5)}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">발행 수량</Label>
                <div className="text-sm font-medium text-blue-600">
                  {coupon.quantity || 0}개
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 border-2 border-gray-200 bg-white/80 transition-all duration-200 hover:bg-gray-50"
                >
                  <X className="mr-2 h-4 w-4" />
                  취소
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>변경사항 취소</AlertDialogTitle>
                  <AlertDialogDescription>
                    변경사항이 저장되지 않습니다. 정말로 나가시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>계속 편집</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => router.push(`/admin/coupon/${params.id}`)}
                  >
                    나가기
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              type="submit"
              className="h-12 bg-gradient-to-r from-green-500 to-green-600 shadow-lg transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-xl"
            >
              <Save className="mr-2 h-4 w-4" />
              저장
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}
