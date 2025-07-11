'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Header } from './header'
import { Trash2, AlertTriangle, Info } from 'lucide-react'

export function CouponDeleteConfirm() {
  const [confirmChecks, setConfirmChecks] = useState({
    understand: false,
    irreversible: false,
    finalDelete: false,
  })
  const [isDeleting, setIsDeleting] = useState(false)

  const allChecked = Object.values(confirmChecks).every(Boolean)

  const handleCheckChange = (key: string, checked: boolean) => {
    setConfirmChecks((prev) => ({ ...prev, [key]: checked }))
  }

  const handleDelete = () => {
    if (!allChecked) return

    if (
      confirm(
        '정말로 이 쿠폰을 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      )
    ) {
      setIsDeleting(true)
      setTimeout(() => {
        alert('쿠폰이 성공적으로 삭제되었습니다.')
        setIsDeleting(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/20 via-white to-[#FFE1E1]/20">
      <Header />

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-red-500">
              <Trash2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-[#8BB5FF]">
            쿠폰 삭제 확인
          </h2>
          <p className="text-gray-600">정말로 이 쿠폰을 삭제하시겠습니까?</p>
        </div>

        {/* 경고 메시지 */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription>
            <h3 className="mb-2 text-lg font-bold text-red-800">
              ⚠️ 삭제 시 주의사항
            </h3>
            <ul className="space-y-1 text-sm text-red-700">
              <li>• 삭제된 쿠폰은 복구할 수 없습니다.</li>
              <li>
                • 이미 사용된 쿠폰 내역은 유지되지만, 새로운 사용은
                불가능합니다.
              </li>
              <li>• 사용자가 보유한 미사용 쿠폰도 모두 무효화됩니다.</li>
              <li>• 관련된 모든 통계 데이터가 영향을 받을 수 있습니다.</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* 삭제할 쿠폰 정보 */}
        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
          <CardHeader className="border-b border-red-200 bg-red-50">
            <CardTitle className="flex items-center text-red-800">
              <Trash2 className="mr-2 h-5 w-5" />
              삭제 예정 쿠폰 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { label: '쿠폰명', value: '신규회원 특별할인' },
                { label: '쿠폰 ID', value: '#1000' },
                { label: '할인율', value: '30%', highlight: true },
                { label: '현재 상태', value: '활성', badge: true },
                { label: '발행 수량', value: '100개' },
                { label: '사용된 수량', value: '50개' },
                { label: '생성일', value: '2024년 1월 8일' },
                { label: '유효기간', value: '2024년 12월 31일' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-gray-200 py-2"
                >
                  <span className="font-medium text-gray-600">
                    {item.label}:
                  </span>
                  <span
                    className={`font-semibold ${
                      item.highlight
                        ? 'text-red-600'
                        : item.badge
                          ? 'rounded-full bg-green-100 px-2 py-1 text-xs text-green-800'
                          : 'text-gray-900'
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
        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
          <CardHeader className="border-b border-orange-200 bg-orange-50">
            <CardTitle className="flex items-center text-orange-800">
              <Info className="mr-2 h-5 w-5" />
              삭제로 인해 영향받는 데이터
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                <div className="text-2xl font-bold text-red-600">50개</div>
                <div className="text-sm text-red-700">무효화될 미사용 쿠폰</div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">3명</div>
                <div className="text-sm text-blue-700">영향받는 사용자</div>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ₩79,500
                </div>
                <div className="text-sm text-purple-700">기존 할인 총액</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 삭제 확인 체크박스 */}
        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
          <CardContent className="space-y-4 p-6">
            {[
              {
                key: 'understand',
                label:
                  '위의 모든 주의사항을 확인했으며, 쿠폰 삭제로 인한 결과를 이해합니다.',
              },
              {
                key: 'finalDelete',
                label:
                  '"신규회원 특별할인" 쿠폰을 영구적으로 삭제하는 것에 동의합니다.',
                bold: true,
              },
            ].map((item) => (
              <div key={item.key} className="flex items-start space-x-2">
                <Checkbox
                  id={item.key}
                  checked={
                    confirmChecks[item.key as keyof typeof confirmChecks]
                  }
                  onCheckedChange={(checked) =>
                    handleCheckChange(item.key, checked as boolean)
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor={item.key}
                  className={`text-sm ${item.bold ? 'font-semibold' : ''}`}
                >
                  {item.label}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 버튼들 */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" className="bg-transparent px-8 py-3">
            취소
          </Button>
          <Button
            onClick={handleDelete}
            disabled={!allChecked || isDeleting}
            className={`px-8 py-3 ${
              allChecked && !isDeleting
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                : 'cursor-not-allowed bg-gray-400 text-white'
            }`}
          >
            <Trash2 className="mr-2 h-5 w-5" />
            {isDeleting ? '삭제 중...' : '영구 삭제'}
          </Button>
        </div>
      </div>
    </div>
  )
}
