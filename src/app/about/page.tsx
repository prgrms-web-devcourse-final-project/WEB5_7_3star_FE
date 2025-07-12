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
import {
  Users,
  Target,
  Award,
  Heart,
  Star,
  ArrowRight,
  Play,
  BookOpen,
  Shield,
  Zap,
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-[#8BB5FF]" />,
      title: '전문 강사 매칭',
      description:
        '검증된 전문 강사들과 1:1 매칭으로 맞춤형 레슨을 제공합니다.',
    },
    {
      icon: <Target className="h-8 w-8 text-[#8BB5FF]" />,
      title: '목표 달성 지원',
      description:
        '개인별 목표에 맞는 체계적인 운동 계획을 수립하고 관리합니다.',
    },
    {
      icon: <Award className="h-8 w-8 text-[#8BB5FF]" />,
      title: '품질 보장',
      description:
        '모든 레슨은 품질 검증을 거쳐 안전하고 효과적인 운동을 보장합니다.',
    },
    {
      icon: <Heart className="h-8 w-8 text-[#8BB5FF]" />,
      title: '건강한 라이프스타일',
      description:
        '단순한 운동이 아닌 건강한 라이프스타일 변화를 도와드립니다.',
    },
  ]

  const stats = [
    {
      number: '10,000+',
      label: '등록된 강사',
      icon: <Users className="h-6 w-6" />,
    },
    { number: '50,000+', label: '수강생', icon: <Heart className="h-6 w-6" /> },
    {
      number: '100,000+',
      label: '완료된 레슨',
      icon: <Award className="h-6 w-6" />,
    },
    { number: '4.8', label: '평균 평점', icon: <Star className="h-6 w-6" /> },
  ]

  const testimonials = [
    {
      name: '김민수',
      role: '회사원',
      content:
        'TrainUs를 통해 처음으로 요가를 시작했는데, 정말 만족스럽습니다. 강사님이 친절하게 가르쳐주셔서 부담 없이 시작할 수 있었어요.',
      rating: 5,
    },
    {
      name: '이지영',
      role: '대학생',
      content:
        '홈트레이닝 레슨을 받고 있는데, 집에서도 효과적으로 운동할 수 있어서 좋습니다. 체계적인 관리 덕분에 목표 달성에 가까워지고 있어요.',
      rating: 5,
    },
    {
      name: '박준호',
      role: '프리랜서',
      content:
        '수영을 배우고 싶었는데, TrainUs에서 좋은 강사님을 만나서 빠르게 진도가 나가고 있습니다. 안전하고 체계적인 수업이 인상적이에요.',
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 헤더 섹션 */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-5xl font-bold text-transparent">
            TrainUs 소개
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            TrainUs는 지역 기반의 운동 메이트/트레이너 매칭 플랫폼입니다. 전문
            강사와 수강생을 연결하여 개인 맞춤형 운동 경험을 제공합니다.
          </p>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]"></div>
        </div>

        {/* 통계 섹션 */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 bg-white/90 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="mb-3 flex justify-center text-[#8BB5FF]">
                  {stat.icon}
                </div>
                <div className="mb-1 text-2xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 특징 섹션 */}
        <div className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            TrainUs만의 특별한 특징
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 서비스 소개 */}
        <div className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            우리의 서비스
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]">
                  <Play className="h-8 w-8 text-[#8BB5FF]" />
                </div>
                <CardTitle>다양한 레슨</CardTitle>
                <CardDescription>
                  요가, 필라테스, 수영, 홈트레이닝 등 다양한 운동을 선택할 수
                  있습니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]">
                  <BookOpen className="h-8 w-8 text-[#8BB5FF]" />
                </div>
                <CardTitle>체계적인 관리</CardTitle>
                <CardDescription>
                  개인별 목표 설정부터 진행 상황까지 체계적으로 관리해드립니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]">
                  <Shield className="h-8 w-8 text-[#8BB5FF]" />
                </div>
                <CardTitle>안전 보장</CardTitle>
                <CardDescription>
                  검증된 강사와 안전한 환경에서 운동할 수 있도록 보장합니다.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* 후기 섹션 */}
        <div className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            수강생들의 후기
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-white/90 shadow-lg backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-4 leading-relaxed text-gray-600">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] text-[#8BB5FF]">
                      수강생
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center">
          <Card className="border-0 bg-gradient-to-r from-[#D4E3FF]/50 to-[#E1D8FB]/50 shadow-lg">
            <CardContent className="p-12">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                지금 시작해보세요
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
                TrainUs와 함께 건강한 라이프스타일을 만들어가세요. 전문 강사와
                함께하는 맞춤형 운동 경험을 제공합니다.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] px-8 py-3 text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5]"
                  asChild
                >
                  <Link href="/search">
                    레슨 찾기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="px-8 py-3" asChild>
                  <Link href="/lesson/register">
                    레슨 등록
                    <Zap className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
