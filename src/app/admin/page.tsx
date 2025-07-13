'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  CreditCard,
  FileText,
  BarChart3,
  Shield,
  Activity,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Power,
} from 'lucide-react'

type AdminPageType =
  | 'dashboard'
  | 'users'
  | 'lessons'
  | 'payments'
  | 'coupons'
  | 'reports'

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState<AdminPageType>('dashboard')

  // 더미 데이터
  const dashboardStats = {
    totalUsers: 1247,
    totalLessons: 89,
    totalRevenue: 15420000,
    activeCoupons: 12,
    pendingApprovals: 5,
    todayRevenue: 1250000,
  }

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      action: '새 사용자 가입',
      user: '김운동',
      time: '2분 전',
    },
    {
      id: 2,
      type: 'lesson',
      action: '레슨 등록',
      user: '박요가',
      time: '5분 전',
    },
    {
      id: 3,
      type: 'payment',
      action: '결제 완료',
      user: '이수영',
      time: '10분 전',
    },
    {
      id: 4,
      type: 'coupon',
      action: '쿠폰 발급',
      user: '최헬스',
      time: '15분 전',
    },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 사용자</p>
                <p className="text-2xl font-bold text-gray-800">
                  {dashboardStats.totalUsers.toLocaleString()}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 레슨</p>
                <p className="text-2xl font-bold text-gray-800">
                  {dashboardStats.totalLessons}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 매출</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(dashboardStats.totalRevenue / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">활성 쿠폰</p>
                <p className="text-2xl font-bold text-gray-800">
                  {dashboardStats.activeCoupons}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">승인 대기</p>
                <p className="text-2xl font-bold text-gray-800">
                  {dashboardStats.pendingApprovals}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">오늘 매출</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(dashboardStats.todayRevenue / 10000).toFixed(0)}만원
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 최근 활동 */}
      <Card className="border-2 border-gray-100 shadow-xs">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            최근 활동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      activity.type === 'user'
                        ? 'bg-blue-100'
                        : activity.type === 'lesson'
                          ? 'bg-green-100'
                          : activity.type === 'payment'
                            ? 'bg-purple-100'
                            : 'bg-orange-100'
                    }`}
                  >
                    {activity.type === 'user' && (
                      <Users className="h-4 w-4 text-blue-600" />
                    )}
                    {activity.type === 'lesson' && (
                      <FileText className="h-4 w-4 text-green-600" />
                    )}
                    {activity.type === 'payment' && (
                      <CreditCard className="h-4 w-4 text-purple-600" />
                    )}
                    {activity.type === 'coupon' && (
                      <Activity className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsers = () => (
    <Card className="border-2 border-gray-100 shadow-xs">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          사용자 관리
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white">
                김
              </div>
              <div>
                <p className="font-medium text-gray-800">김운동</p>
                <p className="text-sm text-gray-600">user@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="border-0 bg-green-100 text-green-700">
                활성
              </Badge>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Power className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderLessons = () => (
    <Card className="border-2 border-gray-100 shadow-xs">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          레슨 관리
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-800">
                초보자를 위한 자유형 마스터 클래스
              </p>
              <p className="text-sm text-gray-600">김수영 강사 • 수영</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="border-0 bg-blue-100 text-blue-700">
                승인됨
              </Badge>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderPayments = () => (
    <Card className="border-2 border-gray-100 shadow-xs">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          결제 관리
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-800">
                초보자를 위한 자유형 마스터 클래스
              </p>
              <p className="text-sm text-gray-600">이수영 • 45,000원</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="border-0 bg-green-100 text-green-700">
                완료
              </Badge>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderCoupons = () => (
    <Card className="border-2 border-gray-100 shadow-xs">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          쿠폰 관리
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-800">신규 가입 쿠폰</p>
              <p className="text-sm text-gray-600">
                10,000원 할인 • 2024.12.31까지
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="border-0 bg-green-100 text-green-700">
                활성
              </Badge>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => (window.location.href = '/admin/coupon')}
              className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] hover:from-blue-600 hover:to-blue-700"
            >
              쿠폰 관리 페이지로 이동
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderReports = () => (
    <Card className="border-2 border-gray-100 shadow-xs">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          리포트
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-4">
              <h3 className="mb-2 font-semibold text-blue-800">월별 매출</h3>
              <p className="text-2xl font-bold text-blue-600">15.4M</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-800">신규 사용자</h3>
              <p className="text-2xl font-bold text-green-600">247</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (currentPage) {
      case 'users':
        return renderUsers()
      case 'lessons':
        return renderLessons()
      case 'payments':
        return renderPayments()
      case 'coupons':
        return renderCoupons()
      case 'reports':
        return renderReports()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <div className="container mx-auto w-full max-w-5xl px-4 py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">
            관리자 대시보드
          </h1>
          <p className="text-lg text-gray-600">시스템 관리 및 모니터링</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-2 border-gray-100 shadow-xs">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Button
                    onClick={() => setCurrentPage('dashboard')}
                    variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    대시보드
                  </Button>
                  <Button
                    onClick={() => setCurrentPage('users')}
                    variant={currentPage === 'users' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    사용자 관리
                  </Button>
                  <Button
                    onClick={() => setCurrentPage('lessons')}
                    variant={currentPage === 'lessons' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    레슨 관리
                  </Button>
                  <Button
                    onClick={() => setCurrentPage('payments')}
                    variant={currentPage === 'payments' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    결제 관리
                  </Button>
                  <Button
                    onClick={() => setCurrentPage('coupons')}
                    variant={currentPage === 'coupons' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    쿠폰 관리
                  </Button>
                  <Button
                    onClick={() => setCurrentPage('reports')}
                    variant={currentPage === 'reports' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    리포트
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
