"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "./header"
import { Trash2, AlertTriangle, Info } from "lucide-react"

export function CouponDeleteConfirm() {
  const [confirmChecks, setConfirmChecks] = useState({
    understand: false,
    irreversible: false,
    finalDelete: false,
  })
  const [deleteReason, setDeleteReason] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const allChecked = Object.values(confirmChecks).every(Boolean)

  const handleCheckChange = (key: string, checked: boolean) => {
    setConfirmChecks((prev) => ({ ...prev, [key]: checked }))
  }

  const handleDelete = () => {
    if (!allChecked) return

    if (confirm("정말로 이 쿠폰을 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      setIsDeleting(true)
      setTimeout(() => {
        alert("쿠폰이 성공적으로 삭제되었습니다.")
        setIsDeleting(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/20 via-white to-[#FFE1E1]/20">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#8BB5FF] mb-2">쿠폰 삭제 확인</h2>
          <p className="text-gray-600">정말로 이 쿠폰을 삭제하시겠습니까?</p>
        </div>

        {/* 경고 메시지 */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription>
            <h3 className="text-red-800 font-bold text-lg mb-2">⚠️ 삭제 시 주의사항</h3>
            <ul className="text-red-700 text-sm space-y-1">
              <li>• 삭제된 쿠폰은 복구할 수 없습니다.</li>
              <li>• 이미 사용된 쿠폰 내역은 유지되지만, 새로운 사용은 불가능합니다.</li>
              <li>• 사용자가 보유한 미사용 쿠폰도 모두 무효화됩니다.</li>
              <li>• 관련된 모든 통계 데이터가 영향을 받을 수 있습니다.</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* 삭제할 쿠폰 정보 */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
          <CardHeader className="bg-red-50 border-b border-red-200">
            <CardTitle className="flex items-center text-red-800">
              <Trash2 className="w-5 h-5 mr-2" />
              삭제 예정 쿠폰 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "쿠폰명", value: "신규회원 특별할인" },
                { label: "쿠폰 ID", value: "#1000" },
                { label: "할인율", value: "30%", highlight: true },
                { label: "현재 상태", value: "활성", badge: true },
                { label: "발행 수량", value: "100개" },
                { label: "사용된 수량", value: "50개" },
                { label: "생성일", value: "2024년 1월 8일" },
                { label: "유효기간", value: "2024년 12월 31일" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">{item.label}:</span>
                  <span
                    className={`font-semibold ${
                      item.highlight
                        ? "text-red-600"
                        : item.badge
                          ? "px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                          : "text-gray-900"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 영향받는 데이터 */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
          <CardHeader className="bg-orange-50 border-b border-orange-200">
            <CardTitle className="flex items-center text-orange-800">
              <Info className="w-5 h-5 mr-2" />
              삭제로 인해 영향받는 데이터
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">50개</div>
                <div className="text-sm text-red-700">무효화될 미사용 쿠폰</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">3명</div>
                <div className="text-sm text-blue-700">영향받는 사용자</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">₩79,500</div>
                <div className="text-sm text-purple-700">기존 할인 총액</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 삭제 확인 체크박스 */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
          <CardContent className="p-6 space-y-4">
            {[
              { key: "understand", label: "위의 모든 주의사항을 확인했으며, 쿠폰 삭제로 인한 결과를 이해합니다." },
              {
                key: "finalDelete",
                label: '"신규회원 특별할인" 쿠폰을 영구적으로 삭제하는 것에 동의합니다.',
                bold: true,
              },
            ].map((item) => (
              <div key={item.key} className="flex items-start space-x-2">
                <Checkbox
                  id={item.key}
                  checked={confirmChecks[item.key as keyof typeof confirmChecks]}
                  onCheckedChange={(checked) => handleCheckChange(item.key, checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor={item.key} className={`text-sm ${item.bold ? "font-semibold" : ""}`}>
                  {item.label}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        

        {/* 버튼들 */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" className="px-8 py-3 bg-transparent">
            취소
          </Button>
          <Button
            onClick={handleDelete}
            disabled={!allChecked || isDeleting}
            className={`px-8 py-3 ${
              allChecked && !isDeleting
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-white"
            }`}
          >
            <Trash2 className="w-5 h-5 mr-2" />
            {isDeleting ? "삭제 중..." : "영구 삭제"}
          </Button>
        </div>
      </div>
    </div>
  )
}
