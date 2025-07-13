'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
} from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/Container'

export default function ApplicationsPage() {
  const applications = [
    {
      id: 1,
      lessonTitle: '요가 기초반 - 몸과 마음의 균형',
      trainerName: '김요가 강사',
      date: '2024년 1월 15일',
      time: '오후 2:00 - 3:30',
      location: '강남구 요가스튜디오',
      price: 25000,
      status: 'approved',
      appliedDate: '2024.01.10',
      message: '레슨 신청이 승인되었습니다! 결제를 완료해주세요.',
    },
    {
      id: 2,
      lessonTitle: '필라테스 중급반',
      trainerName: '박필라 강사',
      date: '2024년 1월 20일',
      time: '오전 10:00 - 11:00',
      location: '서초구 필라테스센터',
      price: 30000,
      status: 'pending',
      appliedDate: '2024.01.12',
      message: '신청이 접수되었습니다. 강사의 승인을 기다려주세요.',
    },
    {
      id: 3,
      lessonTitle: '홈트레이닝 개인레슨',
      trainerName: '이홈트 강사',
      date: '2024년 1월 18일',
      time: '오후 7:00 - 8:00',
      location: '온라인',
      price: 40000,
      status: 'rejected',
      appliedDate: '2024.01.08',
      message:
        '죄송합니다. 해당 시간대가 이미 예약되어 있어 승인이 어렵습니다.',
    },
    {
      id: 4,
      lessonTitle: '수영 기초반',
      trainerName: '최수영 강사',
      date: '2024년 1월 25일',
      time: '오후 3:00 - 4:00',
      location: '강남구 수영장',
      price: 35000,
      status: 'approved',
      appliedDate: '2024.01.13',
      message: '레슨 신청이 승인되었습니다! 결제를 완료해주세요.',
    },
    {
      id: 5,
      lessonTitle: '크로스핏 초급반',
      trainerName: '정크로스 강사',
      date: '2024년 1월 22일',
      time: '오후 6:00 - 7:00',
      location: '서초구 크로스핏센터',
      price: 45000,
      status: 'rejected',
      appliedDate: '2024.01.11',
      message: '죄송합니다. 정원이 마감되어 승인이 어렵습니다.',
    },
    {
      id: 6,
      lessonTitle: '복싱 기초반',
      trainerName: '김복싱 강사',
      date: '2024년 1월 28일',
      time: '오후 5:00 - 6:00',
      location: '강남구 복싱체육관',
      price: 28000,
      status: 'pending',
      appliedDate: '2024.01.14',
      message: '신청이 접수되었습니다. 강사의 승인을 기다려주세요.',
    },
  ]

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          label: '승인됨',
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: <CheckCircle className="h-4 w-4" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-300',
        }
      case 'pending':
        return {
          label: '대기중',
          color:
            'bg-gradient-to-r from-primary-100 to-secondary-100 text-gray-700 border-primary-200',
          icon: <AlertCircle className="h-4 w-4" />,
          bgColor: 'bg-gradient-to-r from-primary-50 to-secondary-50',
          borderColor: 'border-primary-300',
        }
      case 'rejected':
        return {
          label: '거절됨',
          color: 'bg-red-100 text-red-700 border-red-200',
          icon: <XCircle className="h-4 w-4" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-300',
        }
      default:
        return {
          label: '알 수 없음',
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: <AlertCircle className="h-4 w-4" />,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-300',
        }
    }
  }

  const approvedApplications = applications.filter(
    (app) => app.status === 'approved',
  )
  const pendingApplications = applications.filter(
    (app) => app.status === 'pending',
  )
  const rejectedApplications = applications.filter(
    (app) => app.status === 'rejected',
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <Container size="lg">
        {/* 페이지 헤더 */}
        <div className="mb-10">
          <h1 className="bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-4xl font-bold text-transparent">
            신청레슨 현황
          </h1>
          <p className="mt-3 text-gray-600">
            신청하신 레슨의 승인 상태를 확인하고 결제를 진행하세요
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]"></div>
        </div>

        {/* 요약 카드 */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">
                    승인된 레슨
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    {approvedApplications.length}개
                  </p>
                  <p className="mt-1 text-xs text-green-600">결제 가능</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D4E3FF] bg-gradient-to-br from-[#D4E3FF]/40 to-[#E1D8FB]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    대기중인 레슨
                  </p>
                  <p className="text-3xl font-bold text-gray-700">
                    {pendingApplications.length}개
                  </p>
                  <p className="mt-1 text-xs text-gray-600">승인 대기</p>
                </div>
                <AlertCircle className="h-8 w-8 text-[#8BB5FF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-rose-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">
                    거절된 레슨
                  </p>
                  <p className="text-3xl font-bold text-red-700">
                    {rejectedApplications.length}개
                  </p>
                  <p className="mt-1 text-xs text-red-600">승인 거절</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 탭 메뉴 */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 border border-[#D4E3FF] bg-white/80 shadow-sm backdrop-blur-sm">
            <TabsTrigger
              value="all"
              className="transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4E3FF]/60 data-[state=active]:to-[#E1D8FB]/60 data-[state=active]:text-gray-800"
            >
              전체 ({applications.length})
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="transition-all duration-200 data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              승인됨 ({approvedApplications.length})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4E3FF]/60 data-[state=active]:to-[#E1D8FB]/60 data-[state=active]:text-gray-800"
            >
              대기중 ({pendingApplications.length})
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="transition-all duration-200 data-[state=active]:bg-red-100 data-[state=active]:text-red-800"
            >
              거절됨 ({rejectedApplications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {applications.map((application) => {
              const statusInfo = getStatusInfo(application.status)
              return (
                <Card
                  key={application.id}
                  className="border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg"
                >
                  <CardHeader className="rounded-t-lg bg-gradient-to-r from-[#D4E3FF]/40 to-[#E1D8FB]/40">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2 text-xl text-gray-800">
                          {application.lessonTitle}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 text-base text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {application.trainerName}
                          </span>
                          <span>신청일: {application.appliedDate}</span>
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${statusInfo.color} flex items-center gap-1 px-3 py-1 shadow-sm`}
                      >
                        {statusInfo.icon}
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div
                      className={`grid grid-cols-1 gap-4 p-4 md:grid-cols-3 ${statusInfo.bgColor} rounded-lg`}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#8BB5FF]" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#8BB5FF]" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#8BB5FF]" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.location}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-4 ${statusInfo.bgColor} rounded-lg border-l-4 ${statusInfo.borderColor}`}
                    >
                      <p className="text-sm font-medium text-gray-700">
                        {application.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-sm text-gray-600">레슨 가격</p>
                        <p className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-2xl font-bold text-transparent">
                          {application.price.toLocaleString()}원
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {application.status === 'approved' && (
                          <Link
                            href={`/payment/checkout?lessonId=${application.id}`}
                          >
                            <Button
                              size="lg"
                              className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] px-8 shadow-lg transition-all duration-300 hover:from-[#7AA8FF] hover:to-[#B8A8F5] hover:shadow-xl"
                            >
                              결제하기
                            </Button>
                          </Link>
                        )}

                        {application.status === 'pending' && (
                          <Button
                            size="lg"
                            disabled
                            className="bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] px-8 text-gray-600"
                          >
                            대기중
                          </Button>
                        )}

                        {application.status === 'rejected' && (
                          <Button
                            size="lg"
                            disabled
                            className="bg-red-100 px-8 text-red-600"
                          >
                            거절됨
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          {/* 승인됨 탭 */}
          <TabsContent value="approved" className="space-y-4">
            {approvedApplications.map((application) => {
              const statusInfo = getStatusInfo(application.status)
              return (
                <Card
                  key={application.id}
                  className="border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg"
                >
                  <CardHeader className="rounded-t-lg bg-gradient-to-r from-green-50 to-emerald-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2 text-xl text-gray-800">
                          {application.lessonTitle}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 text-base text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {application.trainerName}
                          </span>
                          <span>신청일: {application.appliedDate}</span>
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${statusInfo.color} flex items-center gap-1 px-3 py-1 shadow-sm`}
                      >
                        {statusInfo.icon}
                        승인 완료
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-1 gap-4 rounded-lg bg-green-50 p-4 md:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-primary-500 h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-primary-500 h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-primary-500 h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.location}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg border-l-4 border-green-300 bg-green-50 p-4">
                      <p className="text-sm font-medium text-green-800">
                        {application.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-sm text-gray-600">레슨 가격</p>
                        <p className="from-primary-500 to-secondary-500 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                          {application.price.toLocaleString()}원
                        </p>
                      </div>

                      <Link
                        href={`/payment/checkout?lessonId=${application.id}`}
                      >
                        <Button
                          size="lg"
                          className="from-primary-400 to-secondary-400 hover:from-primary-500 hover:to-secondary-500 bg-gradient-to-r px-8 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                          결제하기
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          {/* 대기중 탭 */}
          <TabsContent value="pending" className="space-y-4">
            {pendingApplications.map((application) => {
              const statusInfo = getStatusInfo(application.status)
              return (
                <Card
                  key={application.id}
                  className="border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg"
                >
                  <CardHeader className="from-primary-50 to-secondary-50 rounded-t-lg bg-gradient-to-r">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2 text-xl text-gray-800">
                          {application.lessonTitle}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 text-base text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {application.trainerName}
                          </span>
                          <span>신청일: {application.appliedDate}</span>
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${statusInfo.color} flex items-center gap-1 px-3 py-1 shadow-sm`}
                      >
                        {statusInfo.icon}
                        승인 대기중
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="from-primary-50 to-secondary-50 grid grid-cols-1 gap-4 rounded-lg bg-gradient-to-r p-4 md:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-primary-500 h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-primary-500 h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-primary-500 h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.location}
                        </span>
                      </div>
                    </div>

                    <div className="from-primary-50 to-secondary-50 border-primary-300 rounded-lg border-l-4 bg-gradient-to-r p-4">
                      <p className="text-sm font-medium text-gray-700">
                        {application.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-sm text-gray-600">레슨 가격</p>
                        <p className="text-2xl font-bold text-gray-400">
                          {application.price.toLocaleString()}원
                        </p>
                      </div>

                      <Button
                        size="lg"
                        disabled
                        className="from-primary-100 to-secondary-100 bg-gradient-to-r px-8 text-gray-600"
                      >
                        대기중
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          {/* 거절됨 탭 */}
          <TabsContent value="rejected" className="space-y-4">
            {rejectedApplications.map((application) => {
              const statusInfo = getStatusInfo(application.status)
              return (
                <Card
                  key={application.id}
                  className="border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg"
                >
                  <CardHeader className="rounded-t-lg bg-gradient-to-r from-red-50 to-rose-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2 text-xl text-gray-800">
                          {application.lessonTitle}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 text-base text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {application.trainerName}
                          </span>
                          <span>신청일: {application.appliedDate}</span>
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${statusInfo.color} flex items-center gap-1 px-3 py-1 shadow-sm`}
                      >
                        {statusInfo.icon}
                        승인 거절
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-1 gap-4 rounded-lg bg-red-50 p-4 md:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-primary-500 h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-primary-500 h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-primary-500 h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">
                          {application.location}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg border-l-4 border-red-300 bg-red-50 p-4">
                      <p className="text-sm font-medium text-red-800">
                        {application.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-sm text-gray-600">레슨 가격</p>
                        <p className="text-2xl font-bold text-gray-400">
                          {application.price.toLocaleString()}원
                        </p>
                      </div>

                      <Button
                        size="lg"
                        disabled
                        className="bg-red-100 px-8 text-red-600"
                      >
                        거절됨
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  )
}
