'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Star,
} from 'lucide-react'
import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import Link from 'next/link'

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
      status: 'completed',
      appliedDate: '2024.01.10',
      message: '레슨이 완료되었습니다! 리뷰를 작성해주세요.',
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

  const approvedApplications = applications.filter(
    (app) => app.status === 'approved',
  )
  const completedApplications = applications.filter(
    (app) => app.status === 'completed',
  )
  const pendingApplications = applications.filter(
    (app) => app.status === 'pending',
  )
  const rejectedApplications = applications.filter(
    (app) => app.status === 'rejected',
  )

  return (
    <Container size="lg">
      <PageHeader
        title="신청레슨 현황"
        subtitle="신청하신 레슨의 승인 상태를 확인하고 결제를 진행하세요"
        align="left"
      />

      {/* 요약 카드 */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* 승인된 레슨 */}
        <Card className="border border-[#A6E9C8] bg-[#DFFCEA]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#22B573]">
                  승인된 레슨
                </p>
                <p className="text-3xl font-bold text-[#22B573]">
                  {approvedApplications.length}개
                </p>
                <p className="mt-1 text-xs text-[#22B573]">결제 가능</p>
              </div>
              <CheckCircle className="h-8 w-8 text-[#22B573]" />
            </div>
          </CardContent>
        </Card>
        {/* 대기중인 레슨 */}
        <Card className="border border-[#BFD7FF] bg-[#F1F6FF]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2563eb]">
                  대기중인 레슨
                </p>
                <p className="text-3xl font-bold text-[#2563eb]">
                  {pendingApplications.length}개
                </p>
                <p className="mt-1 text-xs text-[#2563eb]">승인 대기</p>
              </div>
              <AlertCircle className="h-8 w-8 text-[#2563eb]" />
            </div>
          </CardContent>
        </Card>
        {/* 거절된 레슨 */}
        <Card className="border border-[#FFBDBD] bg-[#FFE6E6]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#E64C4C]">
                  거절된 레슨
                </p>
                <p className="text-3xl font-bold text-[#E64C4C]">
                  {rejectedApplications.length}개
                </p>
                <p className="mt-1 text-xs text-[#E64C4C]">승인 거절</p>
              </div>
              <XCircle className="h-8 w-8 text-[#E64C4C]" />
            </div>
          </CardContent>
        </Card>
        {/* 완료된 레슨 */}
        <Card className="border border-[#BFD7FF] bg-[#F1F6FF]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2563eb]">
                  완료된 레슨
                </p>
                <p className="text-3xl font-bold text-[#2563eb]">
                  {completedApplications.length}개
                </p>
                <p className="mt-1 text-xs text-[#2563eb]">리뷰 작성</p>
              </div>
              <CheckCircle className="h-8 w-8 text-[#2563eb]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 탭 메뉴 */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 border border-[#D4E3FF] bg-white/80 shadow-sm backdrop-blur-sm">
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
            value="completed"
            className="transition-all duration-200 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
          >
            완료됨 ({completedApplications.length})
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

        <TabsContent value="all" className="space-y-8">
          {applications.map((application) => {
            const today = new Date()
            const lessonDate = new Date(
              application.date.replace(/년 |월 |일/g, '-').replace(/-$/, ''),
            )
            const showReviewButton =
              application.status === 'approved' && lessonDate < today
            return (
              <div className="relative mb-8" key={application.id}>
                {/* 상태 뱃지: pill, 위치/컬러/폰트/아이콘 일관 */}
                <div className="absolute top-6 right-6 z-10">
                  {application.status === 'approved' && (
                    <span className="flex items-center gap-1 rounded-full bg-[#DFFCEA] px-4 py-1 text-sm font-semibold text-[#22B573] shadow-sm">
                      <CheckCircle className="h-5 w-5 text-[#22B573]" /> 승인됨
                    </span>
                  )}
                  {application.status === 'pending' && (
                    <span className="flex items-center gap-1 rounded-full bg-[#E6F0FF] px-4 py-1 text-sm font-semibold text-[#2563eb] shadow-sm">
                      <AlertCircle className="h-5 w-5 text-[#2563eb]" /> 대기중
                    </span>
                  )}
                  {application.status === 'rejected' && (
                    <span className="flex items-center gap-1 rounded-full bg-[#FFE6E6] px-4 py-1 text-sm font-semibold text-[#E64C4C] shadow-sm">
                      <XCircle className="h-5 w-5 text-[#E64C4C]" /> 거절됨
                    </span>
                  )}
                </div>
                <Card className="rounded-2xl border-0 bg-[#F1F6FF] px-8 pt-8 pb-6 shadow-none">
                  <CardHeader className="mb-2 bg-transparent p-0">
                    <CardTitle className="mb-2 text-xl font-bold text-gray-800">
                      {application.lessonTitle}
                    </CardTitle>
                    <CardDescription className="mb-4 flex items-center gap-4 text-base text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4 text-gray-400" />
                        {application.trainerName}
                      </span>
                      <span>신청일: {application.appliedDate}</span>
                    </CardDescription>
                    <div className="mb-4 flex flex-wrap items-center gap-8 text-sm text-gray-700">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />{' '}
                        {application.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />{' '}
                        {application.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />{' '}
                        {application.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* 메시지 박스: full width, 상태별 컬러, 라운드/여백/폰트 통일 */}
                    {application.status === 'approved' && (
                      <div className="mb-4 w-full rounded-lg bg-[#DFFCEA] px-6 py-4 text-sm font-medium text-[#22B573]">
                        {application.message}
                      </div>
                    )}
                    {application.status === 'pending' && (
                      <div className="mb-4 w-full rounded-lg bg-[#E6F0FF] px-6 py-4 text-sm font-medium text-[#2563eb]">
                        {application.message}
                      </div>
                    )}
                    {application.status === 'rejected' && (
                      <div className="mb-4 w-full rounded-lg bg-[#FFE6E6] px-6 py-4 text-sm font-medium text-[#E64C4C]">
                        {application.message}
                      </div>
                    )}
                    <div className="flex items-end justify-between pt-2">
                      <div>
                        <p className="mb-1 text-sm text-gray-600">레슨 가격</p>
                        <p className="text-2xl font-bold text-[#2563eb]">
                          {application.price.toLocaleString()}원
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* 버튼: 라운드, 폰트, 컬러, 그림자/테두리 없음, 일관 */}
                        {showReviewButton ? (
                          <Button className="rounded-lg border-0 bg-[#2563eb] px-8 font-semibold text-white shadow-none">
                            리뷰 작성
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            className="rounded-lg border-0 bg-[#E6F0FF] px-8 font-semibold text-[#2563eb] shadow-none"
                          >
                            {application.status === 'approved' && '예약 결제'}
                            {application.status === 'pending' && '대기중'}
                            {application.status === 'rejected' && '거절됨'}
                          </Button>
                        )}
                        {/* 결제 취소 버튼: 승인 상태에서만, 동일 스타일 */}
                        {application.status === 'approved' &&
                          !showReviewButton && (
                            <Link
                              href={`/payment/cancel?lessonId=${application.id}`}
                              passHref
                            >
                              <Button className="rounded-lg border-0 bg-[#FFE6E6] px-8 font-semibold text-[#E64C4C] shadow-none">
                                결제 취소
                              </Button>
                            </Link>
                          )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </TabsContent>
        {/* 완료된 레슨 탭 */}
        <TabsContent value="completed" className="space-y-8">
          {completedApplications.map((application) => (
            <div className="relative mb-8" key={application.id}>
              <div className="absolute top-6 right-6 z-10">
                <span className="flex items-center gap-1 rounded-full bg-[#BFD7FF] px-4 py-1 text-sm font-semibold text-[#2563eb] shadow-sm">
                  <CheckCircle className="h-5 w-5 text-[#2563eb]" /> 완료됨
                </span>
              </div>
              <Card className="rounded-2xl border-0 bg-[#F1F6FF] px-8 pt-8 pb-6 shadow-none">
                <CardHeader className="mb-2 bg-transparent p-0">
                  <CardTitle className="mb-2 text-xl font-bold text-gray-800">
                    {application.lessonTitle}
                  </CardTitle>
                  <CardDescription className="mb-4 flex items-center gap-4 text-base text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4 text-gray-400" />
                      {application.trainerName}
                    </span>
                    <span>신청일: {application.appliedDate}</span>
                  </CardDescription>
                  <div className="mb-4 flex flex-wrap items-center gap-8 text-sm text-gray-700">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />{' '}
                      {application.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />{' '}
                      {application.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />{' '}
                      {application.location}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="mb-4 w-full rounded-lg bg-[#BFD7FF] px-6 py-4 text-sm font-medium text-[#2563eb]">
                    {application.message}
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <div>
                      <p className="mb-1 text-sm text-gray-600">레슨 가격</p>
                      <p className="text-2xl font-bold text-[#2563eb]">
                        {application.price.toLocaleString()}원
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() =>
                          (window.location.href = `/review/write?id=${application.id}`)
                        }
                        size="lg"
                        className="rounded-lg border-0 bg-[#2563eb] px-8 font-semibold text-white shadow-none"
                      >
                        <Star className="mr-2 h-4 w-4" />
                        리뷰 작성
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </TabsContent>
        {/* 승인됨, 대기중, 거절됨 탭도 위와 동일하게 반복 */}
        <TabsContent value="approved" className="space-y-8">
          {approvedApplications.map((application) => {
            const today = new Date()
            const lessonDate = new Date(
              application.date.replace(/년 |월 |일/g, '-').replace(/-$/, ''),
            )
            const showReviewButton =
              application.status === 'approved' && lessonDate < today
            return (
              <div className="relative mb-8" key={application.id}>
                <div className="absolute top-6 right-6 z-10">
                  <span className="flex items-center gap-1 rounded-full bg-[#DFFCEA] px-4 py-1 text-sm font-semibold text-[#22B573] shadow-sm">
                    <CheckCircle className="h-5 w-5 text-[#22B573]" /> 승인됨
                  </span>
                </div>
                <Card className="rounded-2xl border-0 bg-[#F1F6FF] px-8 pt-8 pb-6 shadow-none">
                  <CardHeader className="mb-2 bg-transparent p-0">
                    <CardTitle className="mb-2 text-xl font-bold text-gray-800">
                      {application.lessonTitle}
                    </CardTitle>
                    <CardDescription className="mb-4 flex items-center gap-4 text-base text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4 text-gray-400" />
                        {application.trainerName}
                      </span>
                      <span>신청일: {application.appliedDate}</span>
                    </CardDescription>
                    <div className="mb-4 flex flex-wrap items-center gap-8 text-sm text-gray-700">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />{' '}
                        {application.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />{' '}
                        {application.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />{' '}
                        {application.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="mb-4 w-full rounded-lg bg-[#DFFCEA] px-6 py-4 text-sm font-medium text-[#22B573]">
                      {application.message}
                    </div>
                    <div className="flex items-end justify-between pt-2">
                      <div>
                        <p className="mb-1 text-sm text-gray-600">레슨 가격</p>
                        <p className="text-2xl font-bold text-[#2563eb]">
                          {application.price.toLocaleString()}원
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {showReviewButton ? (
                          <Button className="rounded-lg border-0 bg-[#2563eb] px-8 font-semibold text-white shadow-none">
                            리뷰 작성
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            className="rounded-lg border-0 bg-[#E6F0FF] px-8 font-semibold text-[#2563eb] shadow-none"
                          >
                            예약 결제
                          </Button>
                        )}
                        {!showReviewButton && (
                          <Link
                            href={`/payment/cancel?lessonId=${application.id}`}
                            passHref
                          >
                            <Button className="rounded-lg border-0 bg-[#FFE6E6] px-8 font-semibold text-[#E64C4C] shadow-none">
                              결제 취소
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </TabsContent>
        <TabsContent value="pending" className="space-y-8">
          {pendingApplications.map((application) => {
            return (
              <div className="relative mb-8" key={application.id}>
                <div className="absolute top-6 right-6 z-10">
                  <span className="flex items-center gap-1 rounded-full bg-[#E6F0FF] px-4 py-1 text-sm font-semibold text-[#2563eb] shadow-sm">
                    <AlertCircle className="h-5 w-5 text-[#2563eb]" /> 대기중
                  </span>
                </div>
                <Card className="rounded-2xl border-0 bg-[#F1F6FF] px-8 pt-8 pb-6 shadow-none">
                  <CardHeader className="mb-2 bg-transparent p-0">
                    <CardTitle className="mb-2 text-xl font-bold text-gray-800">
                      {application.lessonTitle}
                    </CardTitle>
                    <CardDescription className="mb-4 flex items-center gap-4 text-base text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4 text-gray-400" />
                        {application.trainerName}
                      </span>
                      <span>신청일: {application.appliedDate}</span>
                    </CardDescription>
                    <div className="mb-4 flex flex-wrap items-center gap-8 text-sm text-gray-700">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />{' '}
                        {application.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />{' '}
                        {application.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />{' '}
                        {application.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="mb-4 w-full rounded-lg bg-[#E6F0FF] px-6 py-4 text-sm font-medium text-[#2563eb]">
                      {application.message}
                    </div>
                    <div className="flex items-end justify-between pt-2">
                      <div>
                        <p className="mb-1 text-sm text-gray-600">레슨 가격</p>
                        <p className="text-2xl font-bold text-[#2563eb]">
                          {application.price.toLocaleString()}원
                        </p>
                      </div>
                      <Button
                        size="lg"
                        className="rounded-lg border-0 bg-[#E6F0FF] px-8 font-semibold text-[#2563eb] shadow-none"
                      >
                        대기중
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </TabsContent>
        <TabsContent value="rejected" className="space-y-8">
          {rejectedApplications.map((application) => {
            return (
              <div className="relative mb-8" key={application.id}>
                <div className="absolute top-6 right-6 z-10">
                  <span className="flex items-center gap-1 rounded-full bg-[#FFE6E6] px-4 py-1 text-sm font-semibold text-[#E64C4C] shadow-sm">
                    <XCircle className="h-5 w-5 text-[#E64C4C]" /> 거절됨
                  </span>
                </div>
                <Card className="rounded-2xl border-0 bg-[#F1F6FF] px-8 pt-8 pb-6 shadow-none">
                  <CardHeader className="mb-2 bg-transparent p-0">
                    <CardTitle className="mb-2 text-xl font-bold text-gray-800">
                      {application.lessonTitle}
                    </CardTitle>
                    <CardDescription className="mb-4 flex items-center gap-4 text-base text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4 text-gray-400" />
                        {application.trainerName}
                      </span>
                      <span>신청일: {application.appliedDate}</span>
                    </CardDescription>
                    <div className="mb-4 flex flex-wrap items-center gap-8 text-sm text-gray-700">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />{' '}
                        {application.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />{' '}
                        {application.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />{' '}
                        {application.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="mb-4 w-full rounded-lg bg-[#FFE6E6] px-6 py-4 text-sm font-medium text-[#E64C4C]">
                      {application.message}
                    </div>
                    <div className="flex items-end justify-between pt-2">
                      <div>
                        <p className="mb-1 text-sm text-gray-600">레슨 가격</p>
                        <p className="text-2xl font-bold text-[#2563eb]">
                          {application.price.toLocaleString()}원
                        </p>
                      </div>
                      <Button
                        size="lg"
                        className="rounded-lg border-0 bg-[#E6F0FF] px-8 font-semibold text-[#2563eb] shadow-none"
                      >
                        거절됨
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </TabsContent>
      </Tabs>
    </Container>
  )
}
