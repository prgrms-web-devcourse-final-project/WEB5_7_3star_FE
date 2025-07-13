'use client'

import { useState } from 'react'
import { CouponDetailView } from '@/components/coupon-detail-view'
import { CouponEditForm } from '@/components/coupon-edit-form'
import { CouponDeleteConfirm } from '@/components/coupon-delete-confirm'
import { CouponDeactivateConfirm } from '@/components/coupon-deactivate-confirm'
import { PaymentWithCoupon } from '@/components/payment-with-coupon'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type PageType = 'menu' | 'detail' | 'edit' | 'delete' | 'deactivate' | 'payment'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('menu')

  const renderPage = () => {
    switch (currentPage) {
      case 'detail':
        return <CouponDetailView />
      case 'edit':
        return <CouponEditForm />
      case 'delete':
        return <CouponDeleteConfirm />
      case 'deactivate':
        return <CouponDeactivateConfirm />
      case 'payment':
        return <PaymentWithCoupon />
      default:
        return (
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30 p-4">
            <Card className="w-full max-w-2xl overflow-hidden border-0 bg-white/95 shadow-2xl backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7]">
                  <span className="text-xl font-bold text-white">운</span>
                </div>
                <CardTitle className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-2xl font-bold text-transparent">
                  운동메이트 쿠폰 관리 시스템
                </CardTitle>
                <p className="text-gray-600">React 버전 데모</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Button
                    onClick={() => setCurrentPage('detail')}
                    className="h-16 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
                  >
                    👁️ 쿠폰 상세 보기
                  </Button>
                  <Button
                    onClick={() => setCurrentPage('edit')}
                    className="h-16 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-xl"
                  >
                    ✏️ 쿠폰 수정
                  </Button>
                  <Button
                    onClick={() => setCurrentPage('deactivate')}
                    className="h-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl"
                  >
                    🔶 쿠폰 비활성화
                  </Button>
                  <Button
                    onClick={() => setCurrentPage('delete')}
                    className="h-16 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-xl"
                  >
                    🗑️ 쿠폰 삭제
                  </Button>
                </div>
                <Button
                  onClick={() => setCurrentPage('payment')}
                  className="h-16 w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-lg hover:from-[#7AA8FF] hover:to-[#B8A8F5]"
                >
                  💳 결제 페이지 (쿠폰 적용)
                </Button>

                <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-blue-800">
                    ✨ 주요 기능
                  </h3>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• 완전한 React/TypeScript 변환</li>
                    <li>• shadcn/ui 컴포넌트 사용</li>
                    <li>• 반응형 디자인 & 애니메이션</li>
                    <li>• 상태 관리 & 폼 검증</li>
                    <li>• 운동메이트 브랜드 색상 적용</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div>
      {currentPage !== 'menu' && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => setCurrentPage('menu')}
            className="border border-gray-200/50 bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white"
          >
            ← 메뉴로 돌아가기
          </Button>
        </div>
      )}
      {renderPage()}
    </div>
  )
}
