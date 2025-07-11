"use client"

import { useState } from "react"
import { CouponDetailView } from "@/components/coupon-detail-view"
import { CouponEditForm } from "@/components/coupon-edit-form"
import { CouponDeleteConfirm } from "@/components/coupon-delete-confirm"
import { CouponDeactivateConfirm } from "@/components/coupon-deactivate-confirm"
import { PaymentWithCoupon } from "@/components/payment-with-coupon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type PageType = "menu" | "detail" | "edit" | "delete" | "deactivate" | "payment"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("menu")

  const renderPage = () => {
    switch (currentPage) {
      case "detail":
        return <CouponDetailView />
      case "edit":
        return <CouponEditForm />
      case "delete":
        return <CouponDeleteConfirm />
      case "deactivate":
        return <CouponDeactivateConfirm />
      case "payment":
        return <PaymentWithCoupon />
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">운</span>
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-transparent">
                  운동메이트 쿠폰 관리 시스템
                </CardTitle>
                <p className="text-gray-600">React 버전 데모</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => setCurrentPage("detail")}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-16 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    👁️ 쿠폰 상세 보기
                  </Button>
                  <Button
                    onClick={() => setCurrentPage("edit")}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-16 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    ✏️ 쿠폰 수정
                  </Button>
                  <Button
                    onClick={() => setCurrentPage("deactivate")}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 h-16 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    🔶 쿠폰 비활성화
                  </Button>
                  <Button
                    onClick={() => setCurrentPage("delete")}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 h-16 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    🗑️ 쿠폰 삭제
                  </Button>
                </div>
                <Button
                  onClick={() => setCurrentPage("payment")}
                  className="w-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] hover:from-[#7AA8FF] hover:to-[#B8A8F5] h-16 text-lg"
                >
                  💳 결제 페이지 (쿠폰 적용)
                </Button>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">✨ 주요 기능</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
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
      {currentPage !== "menu" && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => setCurrentPage("menu")}
            className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border border-gray-200/50 transition-all duration-200"
          >
            ← 메뉴로 돌아가기
          </Button>
        </div>
      )}
      {renderPage()}
    </div>
  )
}
