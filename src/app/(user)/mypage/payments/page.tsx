import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  CheckCircle,
  RefreshCcw,
} from 'lucide-react'
import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'

export default function MyPaymentsPage() {
  const payments = [
    {
      id: 1,
      lessonTitle: '요가 기초반 - 몸과 마음의 균형',
      date: '2025년 7월 15일',
      time: '오후 2:00 - 3:30',
      location: '강남구 요가스튜디오',
      amount: 25000,
      paymentMethod: '카카오페이',
      status: '결제완료',
      paymentDate: '2025년 7월 2일 15:14',
      canCancel: true,
    },
    {
      id: 2,
      lessonTitle: '필라테스 중급반',
      date: '2025년 7월 2일',
      time: '오후 2:00 - 3:30',
      location: '역삼동 붕붕필라테스',
      amount: 40000,
      paymentMethod: '토스페이',
      status: '결제완료',
      paymentDate: '2025년 7월 3일 15:14',
      canCancel: false,
    },
  ]

  const refunds = [
    {
      id: 1,
      lessonTitle: '수영 왕초보반 - 수지아트센터',
      originalAmount: 25000,
      refundAmount: 20000,
      refundDate: '2025.06.23',
      status: '환불 완료',
      reason: '개인사정',
    },
    {
      id: 2,
      lessonTitle: '수영 중급반(월,수,금 저녁 8:00) - 광교숲속수영장',
      originalAmount: 25000,
      refundAmount: 25000,
      refundDate: '2025.07.02',
      status: '환불 대기',
      reason: '개인사정',
    },
  ]

  return (
    <Container size="lg">
      <PageHeader
        title="결제 내역"
        subtitle="결제 내역을 확인할 수 있습니다."
        align="left"
      />
      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList className="mb-8 flex w-full items-center overflow-hidden rounded-xl bg-gray-100 p-0 shadow-sm">
          <TabsTrigger
            value="payments"
            className="flex h-12 flex-1 items-center justify-center rounded-none border-none bg-white text-base font-medium text-gray-700 shadow-none transition-colors focus:outline-none data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-500"
          >
            결제 내역
          </TabsTrigger>
          <TabsTrigger
            value="refunds"
            className="flex h-12 flex-1 items-center justify-center rounded-none border-none bg-gray-100 text-base font-medium text-gray-500 shadow-none transition-colors focus:outline-none data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-500"
          >
            환불 내역
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="space-y-8">
          {payments.map((payment) => (
            <div key={payment.id} className="relative">
              {/* 상태 뱃지 우측상단 */}
              <div className="absolute top-6 right-8 z-20 flex items-center gap-1">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700 shadow">
                  {payment.status}
                </span>
              </div>
              <div className="relative rounded-xl bg-gradient-to-br from-[#f5f6fa] to-[#e9eafc] p-6 shadow-lg">
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-bold text-gray-900">
                    {payment.lessonTitle}
                  </div>
                  <div className="text-sm text-gray-500">
                    결제일 : {payment.paymentDate}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-primary h-4 w-4" /> {payment.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-primary h-4 w-4" /> {payment.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-primary h-4 w-4" />{' '}
                    {payment.location}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {payment.paymentMethod}
                  </span>
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-gray-500">레슨 가격</div>
                    <div className="text-primary text-2xl font-bold">
                      {payment.amount.toLocaleString()}원
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* 결제 취소 버튼 */}
                    {payment.canCancel && (
                      <Button className="rounded-lg bg-[#ffe3e3] px-4 py-2 font-semibold text-red-500 shadow-sm hover:bg-[#ffd6d6]">
                        결제 취소
                      </Button>
                    )}
                    {/* 영수증 보기 버튼 */}
                    <Button className="text-primary rounded-lg bg-[#e3e7fd] px-4 py-2 font-semibold shadow-sm hover:bg-[#d1d8fa]">
                      영수증보기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="refunds" className="space-y-8">
          {refunds.map((refund) => (
            <div key={refund.id} className="relative">
              {/* 상태 뱃지 우측상단 */}
              <div className="absolute top-6 right-8 z-20 flex items-center gap-1">
                {refund.status === '환불 완료' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <RefreshCcw className="h-5 w-5 text-blue-400" />
                )}
                <span
                  className={`rounded-full px-4 py-1 text-sm font-semibold shadow ${refund.status === '환불 완료' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                >
                  {refund.status}
                </span>
              </div>
              <div className="relative rounded-xl bg-gradient-to-br from-[#f5f6fa] to-[#e9eafc] p-6 shadow-lg">
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-bold text-gray-900">
                    {refund.lessonTitle}
                  </div>
                  <div className="text-sm text-gray-500">
                    환불일: {refund.refundDate}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-gray-500">
                      원래 결제 금액 :{' '}
                      <span className="font-semibold text-gray-700">
                        {refund.originalAmount.toLocaleString()}원
                      </span>
                    </div>
                    <div className="mt-2 text-gray-500">
                      환불 사유 :{' '}
                      <span className="font-semibold text-gray-700">
                        {refund.reason}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-end">
                    <div className="text-xs text-gray-500">환불금액</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {refund.refundAmount.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Container>
  )
}
