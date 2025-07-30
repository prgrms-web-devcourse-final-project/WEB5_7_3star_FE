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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PageHeader from '@/components/ui/PageHeader'
import { components } from '@/types/swagger-generated'
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Calendar,
  Edit,
  Trash2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

export default function CouponDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [coupon, setCoupon] = useState<
    components['schemas']['CouponDetailResponseDto'] | null
  >(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCoupon = async () => {
      const coupon = await fetch(`/api/proxy/api/v1/admin/coupons/${id}`, {
        credentials: 'include',
      })
      console.log(coupon)
      const data = await coupon.json()
      setCoupon(data.data)
    }
    fetchCoupon()

    setLoading(false)
  }, [])

  const handleEdit = () => {
    router.push(`/admin/coupon/${id}/edit`)
  }

  const handleDelete = async () => {
    const response = await fetch(`/api/proxy/api/v1/admin/coupons/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      alert(errorData.message)
    } else {
      alert('쿠폰 삭제가 완료되었습니다.')
      router.push('/admin/coupon')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#8BB5FF]"></div>
          <p className="mt-4 text-gray-600">쿠폰 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!coupon) {
    return (
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
    )
  }

  return (
    <Container size="lg">
      <PageHeader
        title="쿠폰 상세 정보"
        subtitle={`${coupon.couponName} 쿠폰의 상세 정보를 확인할 수 있습니다.`}
        align="left"
        right={
          <Button
            onClick={() => router.push('/admin/coupon')}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 메인 정보 */}
        <div className="space-y-6 lg:col-span-2">
          {/* 기본 정보 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰명
                  </label>
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="font-medium text-gray-900">
                      {coupon.couponName}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰 ID
                  </label>
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="font-mono text-gray-600">{coupon.id}</span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    할인율 또는 할인금액
                  </label>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <span className="text-lg font-bold text-red-600">
                      {coupon.discountPrice}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    최소 주문금액
                  </label>
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="font-medium text-gray-900">
                      {(coupon.minOrderPrice ?? 0)?.toLocaleString()}원
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰 활성화 날짜
                  </label>
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="text-gray-900">
                      {coupon.couponOpenAt?.split('T')[0]}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    유효기간
                  </label>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                    <span className="font-medium text-green-700">
                      {coupon.expirationDate?.split('T')[0]}까지
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    쿠폰 종류
                  </label>
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <span className="text-gray-900">
                      {coupon.couponCategory === 'OPEN_RUN' ? '선착순' : '일반'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        {/* <div className="space-y-6">
          {/* 상태 정보 */}
        <div>
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Calendar className="mr-2 h-5 w-5 text-green-600" />
                현재 상태
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">상태</span>
                <Badge
                  className={
                    coupon.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800'
                      : coupon.status === 'INACTIVE'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                  }
                >
                  {coupon.status === 'ACTIVE'
                    ? '활성'
                    : coupon.status === 'INACTIVE'
                      ? '비활성'
                      : '만료'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">발행 수량</span>
                <span className="text-sm font-medium text-gray-900">
                  {coupon.issuedCount}개
                </span>
              </div>

              {coupon.quantity && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">잔여 수량</span>
                  <span className="text-sm font-medium text-green-600">
                    {(coupon.quantity ?? 0) - (coupon.issuedCount ?? 0)}개
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 액션 버튼들 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardContent className="space-y-3 p-6">
              <Button
                onClick={handleEdit}
                className="h-9 cursor-pointer gap-2 rounded border border-gray-200 bg-gray-100 px-4 py-1 font-medium text-gray-800 hover:bg-gray-200"
              >
                <Edit className="mr-1 h-4 w-4" />
                쿠폰 수정
              </Button>
              {/* <Button
                onClick={handleDeactivate}
                className="h-9 cursor-pointer gap-2 rounded border border-orange-100 bg-orange-50 px-4 py-1 font-medium text-orange-700 hover:bg-orange-100"
              >
                <Pause className="mr-1 h-4 w-4" />
                쿠폰 비활성화
              </Button> */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="h-9 cursor-pointer gap-2 rounded border border-red-100 bg-red-50 px-4 py-1 font-medium text-red-700 hover:bg-red-100">
                    <Trash2 className="mr-1 h-4 w-4" />
                    쿠폰 삭제
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>쿠폰 삭제 확인</AlertDialogTitle>
                    <AlertDialogDescription>
                      정말로 &quot;{coupon.couponName}&quot; 쿠폰을
                      삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      삭제
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
