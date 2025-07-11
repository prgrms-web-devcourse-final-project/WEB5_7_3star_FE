'use client'

import { useState } from 'react'
import { Search, MapPin, ChevronRight, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// 지역 데이터 구조
const regionData = {
  서울특별시: {
    강남구: ['역삼동', '논현동', '압구정동', '청담동', '삼성동', '대치동'],
    서초구: ['서초동', '잠원동', '반포동', '방배동', '양재동', '내곡동'],
    강동구: ['강일동', '고덕동', '길동', '둔촌동', '명일동', '상일동'],
    마포구: ['공덕동', '아현동', '서교동', '합정동', '망원동', '연남동'],
    송파구: ['잠실동', '석촌동', '삼전동', '가락동', '문정동', '장지동'],
    강서구: ['화곡동', '등촌동', '염창동', '발산동', '우장산동', '가양동'],
  },
  부산광역시: {
    해운대구: ['우동', '중동', '좌동', '송정동', '반여동', '반송동'],
    부산진구: ['부전동', '연지동', '초읍동', '양정동', '전포동', '범천동'],
    동래구: ['온천동', '사직동', '안락동', '명륜동', '복산동', '칠산동'],
    남구: ['대연동', '용호동', '감만동', '우암동', '문현동', '용당동'],
  },
  경기도: {
    수원시: ['영통구', '팔달구', '장안구', '권선구'],
    성남시: ['분당구', '수정구', '중원구'],
    고양시: ['일산동구', '일산서구', '덕양구'],
    용인시: ['기흥구', '수지구', '처인구'],
  },
  인천광역시: {
    남동구: ['구월동', '간석동', '만수동', '장수동', '서창동', '논현동'],
    연수구: ['송도동', '연수동', '청학동', '동춘동', '옥련동'],
    부평구: ['부평동', '산곡동', '청천동', '일신동', '십정동'],
  },
}

const categories = [
  '전체',
  '수영',
  '헬스',
  '테니스',
  '베드민턴',
  '요가',
  '필라테스',
  '골프',
  '축구',
  '농구',
  '배구',
  '탁구',
  '클라이밍',
  '복싱',
  '태권도',
]

interface SelectedRegion {
  province: string
  city: string
  district: string
  dong?: string
}

export default function SearchClient() {
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [sortBy, setSortBy] = useState('likes')
  const [selectedRegions, setSelectedRegions] = useState<SelectedRegion[]>([])
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null)
  const [expandedCity, setExpandedCity] = useState<string | null>(null)

  const handleRegionSelect = (region: SelectedRegion) => {
    if (selectedRegions.length >= 3) {
      alert('최대 3개 지역까지 선택 가능합니다.')
      return
    }

    const isDuplicate = selectedRegions.some(
      (r) =>
        r.province === region.province &&
        r.city === region.city &&
        r.district === region.district &&
        r.dong === region.dong,
    )

    if (!isDuplicate) {
      setSelectedRegions([...selectedRegions, region])
    }
  }

  const removeRegion = (index: number) => {
    setSelectedRegions(selectedRegions.filter((_, i) => i !== index))
  }

  const formatRegionText = (region: SelectedRegion) => {
    if (region.dong) {
      return `${region.province} ${region.city} ${region.district} ${region.dong}`
    }
    return `${region.province} ${region.city} ${region.district} (전체)`
  }

  const handleSearch = () => {
    console.log('검색 조건:', {
      keyword,
      selectedCategory,
      selectedRegions,
      sortBy,
    })
    window.location.href = '/search-results'
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-4xl">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
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
                  <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="찾고 싶은 레슨을 입력하세요..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="h-14 rounded-xl border-2 border-gray-200 pl-12 text-lg shadow-sm focus:border-blue-600"
                  />
                </div>
              </div>

              <Separator className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* 지역 선택 */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-xl font-semibold">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  지역 선택 ({selectedRegions.length}/3)
                </Label>

                {/* 선택된 지역 표시 */}
                {selectedRegions.length > 0 && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedRegions.map((region, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-2 border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 text-sm text-gray-700"
                        >
                          <span>{formatRegionText(region)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRegion(index)}
                            className="h-4 w-4 p-0 hover:bg-red-100"
                          >
                            <X className="h-3 w-3 text-red-500" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* 지역 트리 */}
                <div className="max-h-80 overflow-y-auto rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm">
                  {Object.entries(regionData).map(([province, cities]) => (
                    <div key={province} className="mb-3">
                      <Button
                        variant="ghost"
                        className="h-auto w-full justify-start rounded-lg border border-transparent p-3 text-lg font-semibold text-blue-600 hover:border-gray-200 hover:bg-gray-50"
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
                          {Object.entries(cities).map(([city, districts]) => (
                            <div key={city}>
                              <Button
                                variant="ghost"
                                className="h-auto w-full justify-start rounded-lg border border-transparent p-2 text-base font-medium text-purple-600 hover:border-gray-200 hover:bg-gray-50"
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
                                <span>{city}</span>
                              </Button>

                              {expandedCity === city && (
                                <div className="mt-1 ml-6 space-y-1">
                                  {districts.map((district) => (
                                    <div
                                      key={district}
                                      className="flex flex-col space-y-1"
                                    >
                                      <Button
                                        variant="ghost"
                                        className="h-auto w-full justify-start rounded-lg border border-transparent p-2 text-sm text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                                        onClick={() =>
                                          handleRegionSelect({
                                            province,
                                            city,
                                            district,
                                          })
                                        }
                                      >
                                        <span>{district} (전체)</span>
                                      </Button>
                                    </div>
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

              <Separator className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* 카테고리 선택 */}
              <div className="space-y-3">
                <Label className="text-xl font-semibold">카테고리</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="h-14 rounded-xl border-2 border-gray-200 text-lg shadow-sm focus:border-blue-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* 정렬 옵션 */}
              <div className="space-y-3">
                <Label className="text-xl font-semibold">정렬</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-14 rounded-xl border-2 border-gray-200 text-lg shadow-sm focus:border-blue-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="likes">좋아요 순</SelectItem>
                    <SelectItem value="recent">최신순</SelectItem>
                    <SelectItem value="price">가격순</SelectItem>
                    <SelectItem value="rating">평점순</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 검색 버튼 */}
              <div className="pt-6">
                <Button
                  onClick={handleSearch}
                  className="h-14 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                >
                  <Search className="mr-2 h-5 w-5" />
                  레슨 검색하기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
