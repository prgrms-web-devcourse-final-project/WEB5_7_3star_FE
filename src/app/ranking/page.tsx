'use client'

import Container from '@/components/Container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getCategoryRankings, getOverallRankings } from '@/lib/api/profile'
import { RankingResponse } from '@/lib/api/ranking'
import {
  Award,
  Crown,
  Dumbbell,
  Flame,
  Heart,
  Leaf,
  Loader2,
  Medal,
  Star,
  User,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const [rankings, setRankings] = useState<RankingResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRankings()
  }, [selectedCategory])

  const fetchRankings = async () => {
    try {
      setIsLoading(true)
      setError(null)

      let response
      if (selectedCategory === '전체') {
        response = await getOverallRankings()
      } else {
        response = await getCategoryRankings(selectedCategory)
      }

      if (response.data && response.data.length > 0) {
        setRankings(response.data)
      } else {
        setRankings([])
      }
    } catch (err) {
      console.error('랭킹 데이터 로딩 에러:', err)
      setError('랭킹 정보를 불러오는 중 오류가 발생했습니다.')
      setRankings([])
    } finally {
      setIsLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

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

  // 전체 통계 예시
  const totalTrainers = rankings.length
  const avgRating =
    rankings.length > 0
      ? (
          rankings.reduce((acc, r) => acc + (r.rating || 0), 0) / totalTrainers
        ).toFixed(1)
      : '0.0'

  // Top3/4~10위 분리
  const top3 = rankings.slice(0, 3)
  const rest = rankings.slice(3, 10)

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
  const categoryBtnStyle = [
    'bg-blue-50 border-blue-400 text-blue-700',
    'bg-purple-50 border-purple-400 text-purple-700',
    'bg-pink-50 border-pink-400 text-pink-700',
    'bg-orange-50 border-orange-400 text-orange-700',
    'bg-green-50 border-green-400 text-green-700',
  ]

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>랭킹 정보를 불러오는 중...</span>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <Button onClick={fetchRankings}>다시 시도</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Container size="lg">
        <div className="flex gap-10">
          {/* 사이드바 */}
          <aside className="flex hidden w-80 shrink-0 flex-col gap-10 rounded-2xl border border-gray-100 bg-white p-10 shadow-xl">
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
                          Top 10
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
          </aside>
          {/* 메인 랭킹 */}
          <main className="flex-1">
            <div className="mb-10 text-center">
              <h1 className="mb-2 flex items-center justify-center gap-2 text-4xl font-extrabold tracking-tight text-[#6C63FF]">
                <span className="text-3xl">👑</span>{' '}
                {selectedCategory === '전체' ? '전체' : selectedCategory} 랭킹
              </h1>
              <p className="text-lg font-medium text-gray-500">
                최고의 피트니스 전문가들을 만나보세요!
              </p>
            </div>

            {rankings.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <p>랭킹 데이터가 없습니다.</p>
              </div>
            ) : (
              <>
                {/* Top3 카드 */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                  {top3.map((ranking, idx) => (
                    <Card
                      key={ranking.userId || idx}
                      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 ${top3CardStyle[idx]} min-h-[240px] px-4 py-10 transition-all duration-200 hover:scale-105 hover:shadow-2xl`}
                    >
                      {/* 순위 뱃지 */}
                      <div
                        className={`absolute -top-7 left-1/2 -translate-x-1/2 ${top3BadgeStyle[idx]} z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white text-xl font-extrabold text-white shadow-lg`}
                      >
                        {ranking.rank || idx + 1}위
                      </div>
                      {/* 왕관/메달/리본 아이콘 */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2">
                        {top3Icon[idx]}
                      </div>
                      {/* 아바타 배경 */}
                      <div className="mt-8 mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-100 shadow-inner">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={ranking.profileImage} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <User className="h-10 w-10" />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="mb-1 text-xl font-extrabold tracking-tight text-gray-800">
                        {ranking.userNickname}
                      </div>
                      <div className="mb-1 flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="text-lg font-bold text-[#6C63FF]">
                          {ranking.rating ? ranking.rating.toFixed(1) : '0.0'}점
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-gray-400">
                        리뷰({ranking.reviewCount || 0})
                      </div>
                    </Card>
                  ))}
                </div>
                {/* 4~10위 리스트 */}
                {rest.length > 0 && (
                  <section>
                    <h2 className="mb-4 text-left text-2xl font-extrabold tracking-tight">
                      {selectedCategory === '전체' ? '전체' : selectedCategory}{' '}
                      트레이너 랭킹
                    </h2>
                    <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-xl">
                      {rest.map((ranking, idx) => (
                        <div
                          key={ranking.userId}
                          className="group flex items-center gap-6 px-10 py-6 transition hover:bg-blue-50/40"
                        >
                          {/* 순위 원형 */}
                          <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg font-extrabold text-gray-500 transition group-hover:bg-blue-100 group-hover:text-blue-700">
                            {ranking.rank || idx + 4}
                          </div>
                          {/* 아바타 */}
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-100 shadow-inner">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={ranking.profileImage || ''} />
                              <AvatarFallback className="text-xl font-bold text-gray-400">
                                {ranking.userNickname?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          {/* 이름/분야/경력 */}
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-lg font-bold text-gray-800">
                              {ranking.userNickname}
                            </div>
                            <div className="mt-1 flex gap-2 text-xs text-gray-500">
                              <span>리뷰 {ranking.reviewCount || 0}개</span>
                              {/* {ranking. && (
                                <span className="font-bold text-blue-600">
                                  {ranking.introduction.length > 20
                                    ? ranking.introduction.substring(0, 20) + '...'
                                    : ranking.introduction}
                                </span>
                              )} */}
                            </div>
                          </div>
                          {/* 평점 */}
                          <div className="flex items-center gap-1 text-base font-bold text-yellow-500">
                            <Star className="h-4 w-4" />
                            {ranking.rating ? ranking.rating.toFixed(1) : '0.0'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
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
