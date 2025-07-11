'use client'
import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Trophy, Gift } from 'lucide-react'

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
      {/* Header */}
      <header className="border-secondary-200 sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="bg-primary-500 flex h-8 w-8 items-center justify-center rounded-lg">
                  <span className="text-lg font-bold text-white">T</span>
                </div>
                <span className="text-secondary-900 text-xl font-bold">
                  TrainUs
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1">
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <Badge variant="primary" size="md" className="mb-6">
                환영합니다! 🎉
              </Badge>
              <h1 className="text-secondary-900 mb-6 text-5xl leading-tight font-extrabold">
                <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  TrainUs
                </span>
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
                    <Card
                      variant="elevated"
                      className="group hover:shadow-strong h-full cursor-pointer rounded-2xl p-8 transition-all duration-300"
                    >
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
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 mt-16 py-8 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-secondary-700 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-200 to-purple-200 text-xs font-bold">
                T
              </div>
              <span className="text-lg font-bold">TrainUs</span>
            </div>
            <div className="text-secondary-400 text-sm">
              © 2025 TrainUs. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
