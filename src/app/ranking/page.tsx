'use client'

import Container from '@/components/Container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import {
  Award,
  Crown,
  Dumbbell,
  Flame,
  Heart,
  Leaf,
  Medal,
  Star,
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

const CATEGORY_META = [
  {
    key: '웨이트 트레이닝',
    color: 'bg-blue-100 text-blue-700',
    icon: <Dumbbell className="mr-1 h-4 w-4" />,
  },
  {
    key: '요가/필라테스',
    color: 'bg-pink-100 text-pink-700',
    icon: <Heart className="mr-1 h-4 w-4" />,
  },
  {
    key: '크로스핏',
    color: 'bg-orange-100 text-orange-700',
    icon: <Flame className="mr-1 h-4 w-4" />,
  },
  {
    key: '다이어트 코칭',
    color: 'bg-green-100 text-green-700',
    icon: <Leaf className="mr-1 h-4 w-4" />,
  },
]

export default function RankingPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체')

  // 전체/카테고리별 데이터 필터링 예시
  const filteredRankings =
    selectedCategory === '전체'
      ? dummyRankings.overall
      : dummyRankings.overall.filter(
          (r) => r.user.category === selectedCategory,
        )

  // Top3/4~10위 분리
  const top3 = filteredRankings.slice(0, 3)
  const rest = filteredRankings.slice(3, 10)

  // 전체 통계 예시
  const totalTrainers = dummyRankings.overall.length
  const avgRating = (
    dummyRankings.overall.reduce((acc, r) => acc + r.stats.averageRating, 0) /
    totalTrainers
  ).toFixed(1)

  // Top3 카드별 스타일
  const top3CardStyle = [
    'border-yellow-300 bg-yellow-50 shadow-xl ring-2 ring-yellow-200',
    'border-gray-200 bg-white shadow-md',
    'border-orange-200 bg-orange-50 shadow-md',
  ]
  const top3Icon = [
    <Crown key="crown" className="h-8 w-8 text-yellow-400" />,
    <Medal key="medal" className="h-8 w-8 text-gray-400" />,
    <Award key="award" className="h-8 w-8 text-orange-400" />,
  ]
  const top3BadgeStyle = ['bg-yellow-400', 'bg-gray-300', 'bg-orange-400']

  // 카테고리 버튼 스타일
  // const categoryBtnStyle = [
  //   'bg-blue-50 border-blue-400 text-blue-700',
  //   'bg-purple-50 border-purple-400 text-purple-700',
  //   'bg-pink-50 border-pink-400 text-pink-700',
  //   'bg-orange-50 border-orange-400 text-orange-700',
  //   'bg-green-50 border-green-400 text-green-700',
  // ]

  return (
    <div>
      <Container size="lg">
        <div className="flex gap-10">
          {/* 사이드바 */}
          {/* <aside className="flex w-80 shrink-0 flex-col gap-10 rounded-2xl border border-gray-100 bg-white p-10 shadow-xl">
            <div>
              <h2 className="mb-5 flex items-center gap-2 text-lg font-extrabold tracking-tight">
                <span className="text-2xl">🥇</span> 운동 분야별 랭킹
              </h2>
              <ul className="flex flex-col gap-3">
                <li>
                  <button
                    className={`flex w-full items-center justify-start gap-2 rounded-xl border px-4 py-2 text-base font-semibold transition-all duration-150 ${selectedCategory === '전체' ? categoryBtnStyle[0] + ' shadow-md ring-2 ring-blue-200' : 'border-transparent bg-gray-50 text-gray-700 hover:bg-blue-50'}`}
                    onClick={() => setSelectedCategory('전체')}
                  >
                    <Users className="mr-1 h-5 w-5" /> 전체
                  </button>
                </li>
                {CATEGORY_META.map((meta, idx) => (
                  <li key={meta.key}>
                    <button
                      className={`flex w-full items-center justify-start gap-2 rounded-xl border px-4 py-2 text-base font-semibold transition-all duration-150 ${selectedCategory === meta.key ? categoryBtnStyle[idx + 1] + ' shadow-md ring-2 ring-black/10' : 'border-transparent bg-gray-50 text-gray-700 hover:bg-blue-50'}`}
                      onClick={() => setSelectedCategory(meta.key)}
                    >
                      {meta.icon} {meta.key}
                      {selectedCategory === meta.key && (
                        <span className="ml-auto rounded-full bg-gradient-to-r from-pink-400 to-pink-300 px-2 py-0.5 text-xs font-bold text-white shadow">
                          창인
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-base font-bold">전체 통계</h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span>등록 트레이너</span>
                  <span className="font-bold text-gray-700">
                    {totalTrainers}명
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>평균 평점</span>
                  <span className="flex items-center gap-1 font-bold text-yellow-500">
                    <Star className="h-4 w-4" /> {avgRating}점
                  </span>
                </div>
              </div>
            </div>
          </aside> */}
          {/* 메인 랭킹 */}
          <main className="flex-1">
            <div className="mb-10 text-center">
              <h1 className="mb-2 flex items-center justify-center gap-2 text-4xl font-extrabold tracking-tight text-[#6C63FF]">
                <span className="text-3xl">👑</span> 전체 랭킹
              </h1>
              <p className="text-lg font-medium text-gray-500">
                최고의 피트니스 전문가들을 만나보세요!
              </p>
            </div>
            {/* Top3 카드 */}
            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {top3.map((ranking, idx) => (
                <Card
                  key={ranking.user.id}
                  className={`relative flex flex-col items-center justify-center rounded-2xl border-2 ${top3CardStyle[idx]} min-h-[240px] px-4 py-10 transition-all duration-200 hover:scale-105 hover:shadow-2xl`}
                >
                  {/* 순위 뱃지 */}
                  <div
                    className={`absolute -top-7 left-1/2 -translate-x-1/2 ${top3BadgeStyle[idx]} z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white text-xl font-extrabold text-white shadow-lg`}
                  >
                    {ranking.rank}위
                  </div>
                  {/* 왕관/메달/리본 아이콘 */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2">
                    {top3Icon[idx]}
                  </div>
                  {/* 아바타 배경 */}
                  <div className="mt-8 mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-100 shadow-inner">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={ranking.user.avatar} />
                      <AvatarFallback className="text-3xl font-extrabold text-gray-400">
                        {ranking.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mb-1 text-xl font-extrabold tracking-tight text-gray-800">
                    {ranking.user.name}
                  </div>
                  <div className="mb-1 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="text-lg font-bold text-[#6C63FF]">
                      {ranking.stats.averageRating}점
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gray-400">
                    리뷰({ranking.stats.totalReviews})
                  </div>
                </Card>
              ))}
            </div>
            {/* 4~10위 리스트 */}
            <section>
              <h2 className="mb-4 text-left text-2xl font-extrabold tracking-tight">
                전체 트레이너 랭킹
              </h2>
              <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-xl">
                {rest.map((ranking) => (
                  <div
                    key={ranking.user.id}
                    className="group flex items-center gap-6 px-10 py-6 transition hover:bg-blue-50/40"
                  >
                    {/* 순위 원형 */}
                    <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg font-extrabold text-gray-500 transition group-hover:bg-blue-100 group-hover:text-blue-700">
                      {ranking.rank}
                    </div>
                    {/* 아바타 */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-100 shadow-inner">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={ranking.user.avatar} />
                        <AvatarFallback className="text-xl font-bold text-gray-400">
                          {ranking.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    {/* 이름/분야/경력 */}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-lg font-bold text-gray-800">
                        {ranking.user.name}
                      </div>
                      <div className="mt-1 flex gap-2 text-xs text-gray-500">
                        <span>경력 {Math.floor(Math.random() * 8) + 4}년</span>
                        <span
                          className="font-bold"
                          style={{ color: idxToColor(ranking.user.category) }}
                        >
                          {ranking.user.category}
                        </span>
                      </div>
                    </div>
                    {/* 평점 */}
                    <div className="flex items-center gap-1 text-base font-bold text-yellow-500">
                      <Star className="h-4 w-4" />
                      {ranking.stats.averageRating}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </Container>
    </div>
  )
}

// 카테고리별 컬러 매핑 함수
function idxToColor(category: string) {
  switch (category) {
    case '웨이트 트레이닝':
      return '#7C3AED'
    case '요가/필라테스':
      return '#EC4899'
    case '크로스핏':
      return '#F59E42'
    case '다이어트 코칭':
      return '#22C55E'
    default:
      return '#2563EB'
  }
}
