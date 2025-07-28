'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Search, MapPin, ChevronRight, ChevronDown, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { categories } from '@/lib/utils'
import { regionData } from '@/lib/region-data'

interface SelectedRegion {
  province: string
  city: string
  district: string
  dong?: string
}

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('YOGA')
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion | null>(
    null,
  )
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null)
  const [expandedCity, setExpandedCity] = useState<string | null>(null)

  // URL 파라미터에서 초기값 설정
  useEffect(() => {
    const keywordParam = searchParams.get('keyword') || ''
    const categoryParam = searchParams.get('category') || 'YOGA'
    const cityParam = searchParams.get('city')
    const districtParam = searchParams.get('district')
    const dongParam = searchParams.get('dong')

    setKeyword(keywordParam)
    setSelectedCategory(categoryParam)

    // 지역 파라미터가 모두 있을 때만 설정
    if (cityParam && districtParam && dongParam) {
      setSelectedRegion({
        province: cityParam,
        city: districtParam,
        district: dongParam,
      })
    }
  }, [searchParams])

  const handleRegionSelect = (region: SelectedRegion) => {
    setSelectedRegion(region)
  }

  const resetRegion = () => {
    setSelectedRegion(null)
    setExpandedProvince(null)
    setExpandedCity(null)
  }

  const resetAllFilters = () => {
    setKeyword('')
    setSelectedCategory('YOGA')
    setSelectedRegion(null)
    setExpandedProvince(null)
    setExpandedCity(null)
  }

  const handleSearch = () => {
    // lesson/list로 리다이렉트
    const params = new URLSearchParams()

    if (keyword) params.set('search', keyword)
    if (selectedCategory && selectedCategory !== 'YOGA')
      params.set('category', selectedCategory)

    // 지역이 선택된 경우만 파라미터에 추가
    if (selectedRegion) {
      params.set('city', selectedRegion.province)
      params.set('district', selectedRegion.city)
      params.set('dong', selectedRegion.district)
    }

    params.set('page', '1')
    params.set('limit', '10')

    router.push(`/lesson/list?${params.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Container size="lg">
        <PageHeader
          title="레슨 검색"
          subtitle="원하는 레슨을 찾아보세요"
          align="center"
        />

        {/* 검색 폼 */}
        <Card className="mx-auto mb-8 max-w-2xl border-0 bg-white/80 shadow-xl backdrop-blur-sm">
          <CardContent className="space-y-6 p-8">
            {/* 키워드 검색 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-base font-medium">
                <Search className="h-4 w-4" />
                키워드 검색
              </Label>
              <div className="relative">
                <Input
                  placeholder="레슨명, 강사명 등을 입력하세요"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 rounded-lg border-gray-200 pr-10 text-base"
                />
                {keyword && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setKeyword('')}
                    className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* 지역 선택 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-base font-medium">
                <MapPin className="h-4 w-4" />
                지역 선택
              </Label>

              {selectedRegion && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    {selectedRegion.province} {selectedRegion.city}{' '}
                    {selectedRegion.district}
                    {selectedRegion.dong && ` ${selectedRegion.dong}`}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={resetRegion}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="space-y-2 rounded-lg border border-gray-200 p-4">
                {Object.entries(regionData).map(([province, cities]) => (
                  <div key={province}>
                    <button
                      onClick={() =>
                        setExpandedProvince(
                          expandedProvince === province ? null : province,
                        )
                      }
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-gray-50"
                    >
                      <span className="font-medium">{province}</span>
                      {expandedProvince === province ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedProvince === province && (
                      <div className="ml-4 space-y-1">
                        {Object.entries(cities).map(([city, districts]) => (
                          <div key={city}>
                            <button
                              onClick={() =>
                                setExpandedCity(
                                  expandedCity === city ? null : city,
                                )
                              }
                              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-gray-50"
                            >
                              <span>{city}</span>
                              {expandedCity === city ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                            {expandedCity === city && (
                              <div className="ml-4 space-y-1">
                                {districts.map((district) => (
                                  <button
                                    key={district}
                                    onClick={() =>
                                      handleRegionSelect({
                                        province,
                                        city,
                                        district,
                                      })
                                    }
                                    className="block w-full rounded-md px-3 py-2 text-left hover:bg-blue-50"
                                  >
                                    {district}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 카테고리 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-base font-medium">
                <span className="inline-block h-3 w-3 rounded-full bg-purple-200" />
                카테고리
              </Label>
              <div className="flex items-center gap-2">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="h-12 flex-1 rounded-lg border-gray-200">
                    <SelectValue placeholder="전체" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCategory !== 'all' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                    className="h-12 w-12 p-0 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* 검색 버튼 */}
            <div className="flex gap-3">
              <Button
                onClick={handleSearch}
                className="h-12 flex-1 rounded-lg bg-blue-600 text-base font-semibold hover:bg-blue-700"
              >
                <Search className="mr-2 h-4 w-4" />
                검색하기
              </Button>
              <Button
                variant="outline"
                onClick={resetAllFilters}
                className="h-12 rounded-lg border-gray-300 px-6 text-base font-medium hover:bg-gray-50"
              >
                <X className="mr-2 h-4 w-4" />
                초기화
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default function LessonSearch() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p>검색 페이지를 불러오는 중...</p>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  )
}
