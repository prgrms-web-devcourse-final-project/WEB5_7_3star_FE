'use client'

import Container from '@/components/Container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Award,
  Calendar,
  Crown,
  Medal,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

// 더미 랭킹 데이터
const dummyRankings = {
  overall: [
    {
      rank: 1,
      user: {
        id: 'USER001',
        name: '김수영',
        avatar: '/placeholder-user.jpg',
        joinDate: '2023-01-15',
        level: '마스터',
        category: '수영',
      },
      stats: {
        totalLessons: 156,
        completedLessons: 142,
        totalReviews: 89,
        averageRating: 4.9,
        totalLikes: 234,
        totalPoints: 2847,
      },
      achievements: ['마스터 트레이너', '100회 완주', '5년 연속 우수강사'],
    },
    {
      rank: 2,
      user: {
        id: 'USER002',
        name: '이요가',
        avatar: '/placeholder-user.jpg',
        joinDate: '2023-03-20',
        level: '전문가',
        category: '요가',
      },
      stats: {
        totalLessons: 134,
        completedLessons: 128,
        totalReviews: 76,
        averageRating: 4.8,
        totalLikes: 198,
        totalPoints: 2654,
      },
      achievements: ['요가 마스터', '80회 완주', '3년 연속 우수강사'],
    },
    {
      rank: 3,
      user: {
        id: 'USER003',
        name: '박테니스',
        avatar: '/placeholder-user.jpg',
        joinDate: '2023-02-10',
        level: '전문가',
        category: '테니스',
      },
      stats: {
        totalLessons: 98,
        completedLessons: 92,
        totalReviews: 65,
        averageRating: 4.7,
        totalLikes: 167,
        totalPoints: 2341,
      },
      achievements: ['테니스 전문가', '60회 완주', '2년 연속 우수강사'],
    },
    {
      rank: 4,
      user: {
        id: 'USER004',
        name: '최필라',
        avatar: '/placeholder-user.jpg',
        joinDate: '2023-05-15',
        level: '중급',
        category: '필라테스',
      },
      stats: {
        totalLessons: 87,
        completedLessons: 81,
        totalReviews: 54,
        averageRating: 4.6,
        totalLikes: 143,
        totalPoints: 1987,
      },
      achievements: ['필라테스 중급', '50회 완주'],
    },
    {
      rank: 5,
      user: {
        id: 'USER005',
        name: '정골프',
        avatar: '/placeholder-user.jpg',
        joinDate: '2023-04-08',
        level: '중급',
        category: '골프',
      },
      stats: {
        totalLessons: 76,
        completedLessons: 72,
        totalReviews: 48,
        averageRating: 4.5,
        totalLikes: 129,
        totalPoints: 1876,
      },
      achievements: ['골프 중급', '40회 완주'],
    },
  ],
  monthly: [
    {
      rank: 1,
      user: {
        id: 'USER006',
        name: '김헬스',
        avatar: '/placeholder-user.jpg',
        joinDate: '2023-08-20',
        level: '초급',
        category: '헬스',
      },
      stats: {
        totalLessons: 45,
        completedLessons: 42,
        totalReviews: 28,
        averageRating: 4.8,
        totalLikes: 89,
        totalPoints: 987,
      },
      achievements: ['헬스 초급', '30회 완주'],
    },
    {
      rank: 2,
      user: {
        id: 'USER007',
        name: '이복싱',
        avatar: '/placeholder-user.jpg',
        joinDate: '2023-09-12',
        level: '초급',
        category: '복싱',
      },
      stats: {
        totalLessons: 38,
        completedLessons: 36,
        totalReviews: 24,
        averageRating: 4.7,
        totalLikes: 76,
        totalPoints: 876,
      },
      achievements: ['복싱 초급', '25회 완주'],
    },
  ],
  categories: {
    수영: [
      {
        rank: 1,
        user: { name: '김수영', avatar: '/placeholder-user.jpg' },
        points: 2847,
      },
      {
        rank: 2,
        user: { name: '박수영', avatar: '/placeholder-user.jpg' },
        points: 2341,
      },
      {
        rank: 3,
        user: { name: '이수영', avatar: '/placeholder-user.jpg' },
        points: 1987,
      },
    ],
    요가: [
      {
        rank: 1,
        user: { name: '이요가', avatar: '/placeholder-user.jpg' },
        points: 2654,
      },
      {
        rank: 2,
        user: { name: '김요가', avatar: '/placeholder-user.jpg' },
        points: 1987,
      },
      {
        rank: 3,
        user: { name: '박요가', avatar: '/placeholder-user.jpg' },
        points: 1654,
      },
    ],
    테니스: [
      {
        rank: 1,
        user: { name: '박테니스', avatar: '/placeholder-user.jpg' },
        points: 2341,
      },
      {
        rank: 2,
        user: { name: '김테니스', avatar: '/placeholder-user.jpg' },
        points: 1876,
      },
      {
        rank: 3,
        user: { name: '이테니스', avatar: '/placeholder-user.jpg' },
        points: 1432,
      },
    ],
  },
}

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState('overall')
  const [selectedCategory, setSelectedCategory] = useState('수영')

  const categories = [
    '수영',
    '요가',
    '테니스',
    '필라테스',
    '골프',
    '헬스',
    '복싱',
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <Badge className="border-yellow-200 bg-yellow-100 text-yellow-700">
            🥇 1위
          </Badge>
        )
      case 2:
        return (
          <Badge className="border-gray-200 bg-gray-100 text-gray-700">
            🥈 2위
          </Badge>
        )
      case 3:
        return (
          <Badge className="border-amber-200 bg-amber-100 text-amber-700">
            🥉 3위
          </Badge>
        )
      default:
        return (
          <Badge className="border-blue-200 bg-blue-100 text-blue-700">
            {rank}위
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="">
      <Container size="lg">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7]">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">전체 랭킹</h1>
          </div>
          <p className="text-lg text-gray-600">
            최고의 피트니스 전문가들을 만나보세요!
          </p>
        </div>

        {/* 탭 메뉴 */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 border border-[#D4E3FF] bg-white/80 shadow-sm backdrop-blur-sm">
            <TabsTrigger
              value="overall"
              className="transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4E3FF]/60 data-[state=active]:to-[#E1D8FB]/60 data-[state=active]:text-gray-800"
            >
              <Trophy className="mr-2 h-4 w-4" />
              전체 랭킹
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4E3FF]/60 data-[state=active]:to-[#E1D8FB]/60 data-[state=active]:text-gray-800"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              이번 달 랭킹
            </TabsTrigger>
            <TabsTrigger
              value="category"
              className="transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4E3FF]/60 data-[state=active]:to-[#E1D8FB]/60 data-[state=active]:text-gray-800"
            >
              <Target className="mr-2 h-4 w-4" />
              카테고리별
            </TabsTrigger>
          </TabsList>

          {/* 전체 랭킹 */}
          <TabsContent value="overall" className="space-y-6">
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="border-2 border-gray-100 shadow-xs">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">총 참여자</p>
                      <p className="text-2xl font-bold text-gray-800">
                        1,247명
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
                      <p className="text-sm text-gray-600">총 레슨 수</p>
                      <p className="text-2xl font-bold text-gray-800">
                        8,934개
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 shadow-xs">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">평균 평점</p>
                      <p className="text-2xl font-bold text-gray-800">4.6점</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {dummyRankings.overall.map((ranking) => (
                <Card
                  key={ranking.user.id}
                  className="border-2 border-gray-100 shadow-xs transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* 순위 */}
                      <div className="flex-shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center">
                          {getRankIcon(ranking.rank)}
                        </div>
                      </div>

                      {/* 사용자 정보 */}
                      <div className="flex flex-1 items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={ranking.user.avatar} />
                          <AvatarFallback className="text-lg font-bold">
                            {ranking.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-800">
                              {ranking.user.name}
                            </h3>
                            {getRankBadge(ranking.rank)}
                            <Badge className="border-0 bg-purple-100 text-purple-700">
                              {ranking.user.level}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              가입일: {formatDate(ranking.user.joinDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              {ranking.user.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 통계 */}
                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <p className="text-sm text-gray-600">총 포인트</p>
                          <p className="text-2xl font-bold text-gray-800">
                            {ranking.stats.totalPoints.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">완료 레슨</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {ranking.stats.completedLessons}개
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">평균 평점</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {ranking.stats.averageRating}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 업적 */}
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">
                          업적:
                        </span>
                        <div className="flex gap-2">
                          {ranking.achievements.map((achievement, index) => (
                            <Badge
                              key={index}
                              className="border-blue-200 bg-blue-50 text-xs text-blue-700"
                            >
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 이번 달 랭킹 */}
          <TabsContent value="monthly" className="space-y-6">
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="border-2 border-gray-100 shadow-xs">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">이번 달 참여자</p>
                      <p className="text-2xl font-bold text-gray-800">234명</p>
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
                      <p className="text-sm text-gray-600">이번 달 레슨</p>
                      <p className="text-2xl font-bold text-gray-800">
                        1,567개
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 shadow-xs">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">평균 평점</p>
                      <p className="text-2xl font-bold text-gray-800">4.7점</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {dummyRankings.monthly.map((ranking) => (
                <Card
                  key={ranking.user.id}
                  className="border-2 border-gray-100 shadow-xs transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center">
                          {getRankIcon(ranking.rank)}
                        </div>
                      </div>

                      <div className="flex flex-1 items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={ranking.user.avatar} />
                          <AvatarFallback className="text-lg font-bold">
                            {ranking.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-800">
                              {ranking.user.name}
                            </h3>
                            {getRankBadge(ranking.rank)}
                            <Badge className="border-0 bg-purple-100 text-purple-700">
                              {ranking.user.level}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              가입일: {formatDate(ranking.user.joinDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              {ranking.user.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <p className="text-sm text-gray-600">
                            이번 달 포인트
                          </p>
                          <p className="text-2xl font-bold text-gray-800">
                            {ranking.stats.totalPoints.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">완료 레슨</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {ranking.stats.completedLessons}개
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">평균 평점</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {ranking.stats.averageRating}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 카테고리별 랭킹 */}
          <TabsContent value="category" className="space-y-6">
            <div className="mb-6 flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? 'default' : 'outline'
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="border-2"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              {dummyRankings.categories[
                selectedCategory as keyof typeof dummyRankings.categories
              ]?.map((ranking) => (
                <Card
                  key={ranking.rank}
                  className="border-2 border-gray-100 shadow-xs transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center">
                          {getRankIcon(ranking.rank)}
                        </div>
                      </div>

                      <div className="flex flex-1 items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={ranking.user.avatar} />
                          <AvatarFallback className="text-lg font-bold">
                            {ranking.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-800">
                              {ranking.user.name}
                            </h3>
                            {getRankBadge(ranking.rank)}
                          </div>
                          <p className="text-sm text-gray-600">
                            {selectedCategory} 카테고리
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">총 포인트</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {ranking.points.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  )
}
