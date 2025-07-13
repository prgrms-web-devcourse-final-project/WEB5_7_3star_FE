'use client'

import { useState } from 'react'
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

// 지역 데이터 (간략화)
const regionData = {
  서울특별시: {
    강남구: ['역삼동', '청담동'],
    서초구: ['서초동', '잠원동'],
  },
  부산광역시: {
    해운대구: ['우동', '중동'],
  },
}

const categories = ['전체', '수영', '요가', '필라테스', '복싱', '골프', '댄스']

interface SelectedRegion {
  province: string
  city: string
  district: string
  dong?: string
}

export default function LessonSearch() {
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion | null>(
    null,
  )
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null)
  const [expandedCity, setExpandedCity] = useState<string | null>(null)

  const handleRegionSelect = (region: SelectedRegion) => {
    setSelectedRegion(region)
  }

  const removeRegion = () => {
    setSelectedRegion(null)
  }

  const formatRegionText = (region: SelectedRegion) => {
    if (region.dong) {
      return `${region.province} ${region.city} ${region.district} ${region.dong}`
    }
    return `${region.province} ${region.city} ${region.district} (전체)`
  }

  const handleSearch = () => {
    // 실제로는 쿼리스트링 등으로 전달
    window.location.href = '/lesson/list'
  }

  return (
    <div>
      <Container size="md">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] bg-clip-text text-4xl font-bold text-transparent">
            레슨 검색
          </h1>
          <p className="text-lg text-gray-600">
            원하는 조건으로 레슨을 찾아보세요
          </p>
        </div>

        <Card className="rounded-2xl border-2 border-gray-100 bg-white shadow-xl">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* 키워드 검색 */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-xl font-semibold">
                  <Search className="h-6 w-6 text-blue-600" />
                  키워드 검색
                </Label>
                <div className="relative">
                  <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="찾고 싶은 레슨을 입력하세요."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="border-secondary/80 h-14 rounded-xl border pl-12 text-lg"
                  />
                </div>
              </div>

              <Separator className="h-px bg-gray-200" />

              {/* 지역 선택 */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-xl font-semibold">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  지역 선택
                </Label>

                {/* 선택된 지역 표시 */}
                {selectedRegion && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="flex cursor-pointer items-center gap-2 border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 text-sm text-gray-700 transition-all duration-150 hover:border-blue-400 hover:bg-blue-100"
                      >
                        <span>{formatRegionText(selectedRegion)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeRegion}
                          className="group h-4 w-4 cursor-pointer p-0 hover:bg-red-100"
                        >
                          <X className="h-3 w-3 cursor-pointer text-red-500 transition-colors duration-150 group-hover:text-red-700" />
                        </Button>
                      </Badge>
                    </div>
                  </div>
                )}

                {/* 지역 트리 */}
                <div className="max-h-80 overflow-y-auto rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm">
                  {Object.entries(regionData).map(([province, cities]) => (
                    <div key={province} className="mb-3">
                      <Button
                        variant="ghost"
                        className="h-auto w-full cursor-pointer justify-start rounded-lg border border-transparent p-3 text-lg font-semibold text-blue-600 transition-all duration-150 hover:border-blue-200 hover:bg-blue-50"
                        onClick={() =>
                          setExpandedProvince(
                            expandedProvince === province ? null : province,
                          )
                        }
                      >
                        {expandedProvince === province ? (
                          <ChevronDown className="mr-3 h-5 w-5" />
                        ) : (
                          <ChevronRight className="mr-3 h-5 w-5" />
                        )}
                        <span>{province}</span>
                      </Button>

                      {expandedProvince === province && (
                        <div className="mt-2 ml-6 space-y-2">
                          {Object.entries(cities).map(([city, dongs]) => (
                            <div key={city}>
                              <Button
                                variant="ghost"
                                className="h-auto w-full cursor-pointer justify-start rounded-md border border-transparent p-2 font-medium transition-all duration-150 hover:border-blue-200 hover:bg-blue-50"
                                onClick={() =>
                                  setExpandedCity(
                                    expandedCity === city ? null : city,
                                  )
                                }
                              >
                                {expandedCity === city ? (
                                  <ChevronDown className="mr-2 h-4 w-4" />
                                ) : (
                                  <ChevronRight className="mr-2 h-4 w-4" />
                                )}
                                {city}
                              </Button>

                              {expandedCity === city && (
                                <div className="mt-1 ml-6 space-y-1">
                                  <Button
                                    variant="ghost"
                                    className="h-auto w-full cursor-pointer justify-start rounded border border-transparent p-1 text-xs text-blue-600 transition-all duration-150 hover:border-blue-200 hover:bg-blue-50"
                                    onClick={() =>
                                      handleRegionSelect({
                                        province,
                                        city,
                                        district: city,
                                      })
                                    }
                                  >
                                    • {city} (전체)
                                  </Button>
                                  {Array.isArray(dongs) &&
                                    dongs.map((dong) => (
                                      <Button
                                        key={dong}
                                        variant="ghost"
                                        className="h-auto w-full cursor-pointer justify-start rounded border border-transparent p-1 text-xs transition-all duration-150 hover:border-blue-200 hover:bg-blue-50"
                                        onClick={() =>
                                          handleRegionSelect({
                                            province,
                                            city,
                                            district: city,
                                            dong,
                                          })
                                        }
                                      >
                                        • {dong}
                                      </Button>
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

              <Separator className="h-px bg-gray-200" />

              {/* 카테고리 선택 */}
              <div>
                <Label className="mb-3 flex items-center gap-2 text-xl font-semibold">
                  <span className="from-primary to-secondary inline-block h-5 w-5 rounded-full bg-gradient-to-r" />
                  카테고리
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="focus:border-secondary focus:ring-secondary/30 hover:border-secondary hover:ring-secondary/30 h-12 w-full rounded-xl border border-gray-200 bg-white px-5 text-lg font-medium shadow-sm transition-all focus:ring">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent className="mt-2 rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="hover:bg-secondary/10 focus:bg-secondary/10 focus:text-secondary rounded-lg px-4 py-3 text-base font-medium transition-all"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  size="lg"
                  className="cursor-pointer rounded-xl bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-150 hover:scale-105 hover:from-[#7AA8FF] hover:to-[#B8A8F5] hover:shadow-2xl"
                  onClick={handleSearch}
                >
                  검색하기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
