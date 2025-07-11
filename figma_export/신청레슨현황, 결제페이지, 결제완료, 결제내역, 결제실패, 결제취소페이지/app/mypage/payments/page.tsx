import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, CreditCard } from "lucide-react"

export default function MyPaymentsPage() {
  const payments = [
    {
      id: 1,
      lessonTitle: "요가 기초반 - 몸과 마음의 균형",
      date: "2024년 1월 15일",
      time: "오후 2:00 - 3:30",
      location: "강남구 요가스튜디오",
      amount: 25000,
      paymentMethod: "카카오페이",
      status: "완료",
      paymentDate: "2025.01.10",
      canCancel: true,
    },
    {
      id: 2,
      lessonTitle: "필라테스 중급반",
      date: "2024년 1월 8일",
      time: "오전 10:00 - 11:00",
      location: "서초구 필라테스센터",
      amount: 30000,
      paymentMethod: "토스페이",
      status: "완료",
      paymentDate: "2025.01.05",
      canCancel: false,
    },
    {
      id: 3,
      lessonTitle: "홈트레이닝 개인레슨",
      date: "2024년 1월 20일",
      time: "오후 7:00 - 8:00",
      location: "온라인",
      amount: 40000,
      paymentMethod: "결제 요망",
      status: "예약승인",
      paymentDate: "2025.01.12",
      canCancel: true,
    },
  ]

  const refunds = [
    {
      id: 1,
      lessonTitle: "수영 기초반",
      originalAmount: 35000,
      refundAmount: 35000,
      refundDate: "2024.01.03",
      status: "환불완료",
      reason: "개인사정",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">결제 내역</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payments">결제 내역</TabsTrigger>
            <TabsTrigger value="refunds">환불 내역</TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-4">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{payment.lessonTitle}</CardTitle>
                      <CardDescription className="mt-1">결제일: {payment.paymentDate}</CardDescription>
                    </div>
                    <Badge
                      variant={payment.status === "완료" ? "default" : "secondary"}
                      className={payment.status === "완료" ? "bg-green-100 text-green-800" : ""}
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 레슨 정보 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{payment.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{payment.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{payment.location}</span>
                    </div>
                  </div>

                  {/* 결제 정보 */}
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{payment.paymentMethod}</span>
                    </div>
                    <span className="font-semibold text-lg">{payment.amount.toLocaleString()}원</span>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm">
                      영수증 보기
                    </Button>
                    {payment.canCancel && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        예약 취소
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="refunds" className="space-y-4">
            {refunds.map((refund) => (
              <Card key={refund.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{refund.lessonTitle}</CardTitle>
                      <CardDescription className="mt-1">환불일: {refund.refundDate}</CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">{refund.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">원래 결제금액</span>
                      <p className="font-semibold">{refund.originalAmount.toLocaleString()}원</p>
                    </div>
                    <div>
                      <span className="text-gray-600">환불금액</span>
                      <p className="font-semibold text-blue-600">{refund.refundAmount.toLocaleString()}원</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">환불 사유: </span>
                    <span>{refund.reason}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
