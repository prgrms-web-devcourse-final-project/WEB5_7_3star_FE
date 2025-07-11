'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Header } from '../../src/components/header'
import { Pause, Info, BarChart3, Settings, CheckCircle } from 'lucide-react'

export function CouponDeactivateConfirm() {
  const [options, setOptions] = useState({
    notifyUsers: true,
    scheduleReactivation: false,
  })
  const [reactivationDate, setReactivationDate] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [isDeactivating, setIsDeactivating] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleDeactivate = () => {
    if (!confirmed) return

    if (
      confirm(
        '쿠폰을 비활성화하시겠습니까? 언제든지 다시 활성화할 수 있습니다.',
      )
    ) {
      setIsDeactivating(true)
      setTimeout(() => {
        setIsSuccess(true)
        setIsDeactivating(false)
        setTimeout(() => {
          alert('쿠폰 목록 페이지로 이동합니다.')
        }, 3000)
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/20 via-white to-[#FFF4E6]/20">
      <Header />

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-orange-500">
              <Pause className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-[#8BB5FF]">
            쿠폰 비활성화
          </h2>
          <p className="text-gray-600">이 쿠폰을 비활성화하시겠습니까?</p>
        </div>

        {/* 안내 메시지 */}
        <Alert className="mb-8 border-orange-200 bg-orange-50">
          <Info className="h-4 w-4 text-orange-600" />
          <AlertDescription>
            <h3 className="mb-2 text-lg font-bold text-orange-800">
              💡 비활성화 안내
            </h3>
            <ul className="space-y-1 text-sm text-orange-700">
              <li>• 비활성화된 쿠폰은 새로운 사용이 중단됩니다.</li>
              <li>• 기존 사용 내역과 데이터는 모두 보존됩니다.</li>
              <li>• 언제든지 다시 활성화할 수 있습니다.</li>
              <li>
                • 사용자가 보유한 미사용 쿠폰은 일시적으로 사용할 수 없게
                됩니다.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* 비활성화할 쿠폰 정보 */}
        <Card className="mb-8 border border-orange-200 bg-white/90 shadow-lg backdrop-blur-sm">
          <CardHeader className="border-b border-orange-200 bg-orange-50">
            <CardTitle className="flex items-center text-orange-800">
              <Pause className="mr-2 h-5 w-5" />
              비활성화 예정 쿠폰 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { label: '쿠폰명', value: '신규회원 특별할인' },
                { label: '쿠폰 ID', value: '#1000' },
                { label: '할인율', value: '30%' },
                { label: '현재 상태', value: '활성' },
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
                  <span className="font-semibold text-gray-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 영향받는 데이터 */}
        <Card className="mb-8 border border-blue-200 bg-white/90 shadow-lg backdrop-blur-sm">
          <CardHeader className="border-b border-blue-200 bg-blue-50">
            <CardTitle className="flex items-center text-blue-800">
              <BarChart3 className="mr-2 h-5 w-5" />
              비활성화 후 상태 변화
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">50개</div>
                <div className="text-sm text-orange-700">
                  일시 중단될 미사용 쿠폰
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  재활성화 시 복구됨
                </div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">3명</div>
                <div className="text-sm text-blue-700">영향받는 사용자</div>
                <div className="mt-1 text-xs text-gray-500">알림 발송 예정</div>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
                <div className="text-2xl font-bold text-green-600">보존</div>
                <div className="text-sm text-green-700">기존 사용 내역</div>
                <div className="mt-1 text-xs text-gray-500">
                  데이터 손실 없음
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 비활성화 옵션 */}
        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Settings className="mr-2 h-5 w-5" />
              비활성화 옵션
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="notifyUsers"
                checked={options.notifyUsers}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({
                    ...prev,
                    notifyUsers: checked as boolean,
                  }))
                }
                className="mt-1"
              />
              <div>
                <Label htmlFor="notifyUsers" className="font-medium">
                  사용자에게 알림 발송
                </Label>
                <p className="mt-1 text-xs text-gray-500">
                  쿠폰을 보유한 사용자들에게 비활성화 안내 메시지를 발송합니다.
                </p>
              </div>
            </div>

            {options.scheduleReactivation && (
              <div className="ml-7">
                <Label htmlFor="reactivationDate">재활성화 예정일</Label>
                <Input
                  id="reactivationDate"
                  type="date"
                  min="2024-01-11"
                  value={reactivationDate}
                  onChange={(e) => setReactivationDate(e.target.value)}
                  className="mt-2"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* 확인 체크박스 */}
        <Card className="mb-8 border border-gray-200 bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="confirmed"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                className="mt-1"
              />
              <div>
                <Label htmlFor="confirmed" className="font-medium">
                  &quot;신규회원 특별할인&quot; 쿠폰을 비활성화하는 것에
                  동의합니다.
                </Label>
                <p className="mt-1 text-xs text-gray-500">
                  비활성화 후에도 언제든지 다시 활성화할 수 있습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 성공 메시지 */}
        {isSuccess && (
          <Alert className="mb-8 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <p className="font-medium text-green-800">
                쿠폰이 성공적으로 비활성화되었습니다!
              </p>
              <p className="text-sm text-green-700">
                언제든지 쿠폰 관리 페이지에서 다시 활성화할 수 있습니다.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* 버튼들 */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" className="bg-transparent px-8 py-3">
            취소
          </Button>
          <Button
            onClick={handleDeactivate}
            disabled={!confirmed || isDeactivating || isSuccess}
            className={`px-8 py-3 ${
              confirmed && !isDeactivating && !isSuccess
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                : isSuccess
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : 'cursor-not-allowed bg-gray-400 text-white'
            }`}
          >
            <Pause className="mr-2 h-5 w-5" />
            {isDeactivating
              ? '비활성화 중...'
              : isSuccess
                ? '✓ 비활성화 완료'
                : '쿠폰 비활성화'}
          </Button>
        </div>
      </div>
    </div>
  )
}
