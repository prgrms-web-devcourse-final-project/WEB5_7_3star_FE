'use client'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Gift, Plus, Search, Trophy } from 'lucide-react'
import Link from 'next/link'

interface ServiceCard {
  icon: 'search' | 'plus' | 'trophy' | 'gift'
  title: string
  description: string
  href: string
  color: string
}

interface LandingMainProps {
  serviceCards: ServiceCard[]
}

const iconMap = {
  search: Search,
  plus: Plus,
  trophy: Trophy,
  gift: Gift,
}

export default function LandingMain({ serviceCards }: LandingMainProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <Badge className="mb-6">환영합니다! 🎉</Badge>
            <h1 className="text-secondary-900 mb-6 text-5xl leading-tight font-extrabold">
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                TrainUs
              </span>{' '}
              대시보드
            </h1>
            <p className="text-secondary-600 mx-auto max-w-2xl text-xl leading-relaxed">
              원하는 서비스를 선택하여 시작해보세요. 모든 기능이 한 곳에서
              관리됩니다.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
            {serviceCards.map((card) => {
              const Icon = iconMap[card.icon]
              return (
                <Link href={card.href} key={card.title} className="group">
                  <Card className="group hover:shadow-strong h-full cursor-pointer rounded-2xl p-8 transition-all duration-300">
                    <div className="mb-6">
                      <div
                        className={`h-16 w-16 bg-gradient-to-br ${card.color} flex items-center justify-center rounded-2xl transition-transform group-hover:scale-110`}
                      >
                        <Icon className="text-secondary-700 h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-secondary-900 mb-3 text-2xl font-bold">
                      {card.title}
                    </h3>
                    <p className="text-secondary-600 mb-6 leading-relaxed">
                      {card.description}
                    </p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
