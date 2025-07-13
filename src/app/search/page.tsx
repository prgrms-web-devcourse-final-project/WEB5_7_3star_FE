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
import PageHeader from '@/components/ui/PageHeader'

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

  return (
    <div>
      <Container size="md">
        <PageHeader
          title="레슨 검색"
          subtitle="원하는 조건으로 레슨을 찾아보세요"
          align="center"
        />

        <Card className="rounded-md border border-gray-100 bg-white shadow-none">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* 키워드 검색 */}
              <div className="space-y-1">
                <Label className="flex items-center gap-2 text-base font-medium">
                  <Search className="h-4 w-4 text-gray-500" />
                  키워드 검색
                </Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="찾고 싶은 레슨을 입력하세요."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="h-9 rounded-md border border-gray-200 bg-white px-3 py-2 pl-10 text-base shadow-none transition-colors placeholder:text-gray-400 focus:border-blue-300 focus:ring-1 focus:ring-blue-50"
                  />
                </div>
              </div>
              <Separator className="h-px bg-gray-100" />
              {/* 지역 선택 */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-base font-medium">
                  <MapPin className="h-4 w-4 text-gray-500" />
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
                <div className="max-h-80 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-none">
                  {Object.entries(regionData).map(([province, cities]) => (
                    <div key={province} className="mb-2">
                      <Button
                        variant="ghost"
                        className="h-auto w-full cursor-pointer justify-start rounded-md border border-transparent p-2 text-base font-medium text-blue-600 transition-all duration-150 hover:border-blue-200 hover:bg-blue-50"
                        onClick={() =>
                          setExpandedProvince(
                            expandedProvince === province ? null : province,
                          )
                        }
                      >
                        {expandedProvince === province ? (
                          <ChevronDown className="mr-2 h-4 w-4" />
                        ) : (
                          <ChevronRight className="mr-2 h-4 w-4" />
                        )}
                        <span>{province}</span>
                      </Button>

                      {expandedProvince === province && (
                        <div className="mt-1 ml-4 space-y-1">
                          {Object.entries(cities).map(([city, dongs]) => (
                            <div key={city}>
                              <Button
                                variant="ghost"
                                className="h-auto w-full cursor-pointer justify-start rounded border border-transparent p-2 text-sm font-normal transition-all duration-150 hover:border-blue-200 hover:bg-blue-50"
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
                                <div className="mt-1 ml-4 space-y-1">
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
              <Separator className="h-px bg-gray-100" />
              {/* 카테고리 */}
              <Label className="flex items-center gap-2 text-base font-medium">
                <span className="inline-block h-3 w-3 rounded-full bg-purple-200" />
                카테고리
              </Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="h-9 rounded-md border border-gray-200 bg-white px-3 py-2 text-base shadow-none transition-colors focus:border-blue-300 focus:ring-1 focus:ring-blue-50">
                  <SelectValue placeholder="전체" />
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
              {/* 검색 버튼 */}
              <Button className="mt-2 h-9 w-full cursor-pointer rounded border border-gray-200 bg-gray-100 px-4 py-1 font-medium text-gray-800 hover:bg-gray-200">
                검색하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
