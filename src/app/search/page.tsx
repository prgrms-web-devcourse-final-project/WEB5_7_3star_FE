'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, MapPin } from 'lucide-react'
import { useRegionData } from '@/hooks/useRegionData'
import { categories } from '@/lib/utils'

interface Region {
  city: string
  district: string
  dong: string
  ri?: string
}

function SearchPageContent() {
  const router = useRouter()
  const {
    regionData,
    loading,
    getSidoList,
    getSigunguList,
    getDongList,
    getRiList,
  } = useRegionData()
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<Region>({
    city: 'all',
    district: 'all',
    dong: 'all',
    ri: 'none',
  })

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (keyword.trim()) {
      params.append('search', keyword.trim())
    }

    if (selectedCategory && selectedCategory !== 'all') {
      params.append('category', selectedCategory)
    }

    if (selectedRegion.city && selectedRegion.city !== 'all') {
      params.append('city', selectedRegion.city)
    }

    if (selectedRegion.district && selectedRegion.district !== 'all') {
      params.append('district', selectedRegion.district)
    }

    if (selectedRegion.dong && selectedRegion.dong !== 'all') {
      params.append('dong', selectedRegion.dong)
    }

    // ri 필드가 있고 'none'이 아닌 경우에만 추가
    if (
      selectedRegion.ri &&
      selectedRegion.ri.length > 0 &&
      selectedRegion.ri !== 'none'
    ) {
      params.append('ri', selectedRegion.ri)
    }

    params.append('sortBy', 'LATEST')

    const queryString = params.toString()
    router.push(`/lesson/list?${queryString}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse">
            <div className="mb-8 h-8 rounded bg-gray-200"></div>
            <div className="space-y-6">
              <div className="h-14 rounded-xl bg-gray-200"></div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="h-10 rounded-lg bg-gray-200"></div>
                <div className="h-10 rounded-lg bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          레슨 검색
        </h1>

        <div className="space-y-6">
          {/* 검색어 입력 */}
          <div className="space-y-2">
            <label className="text-md font-semibold text-gray-800">
              검색어
            </label>
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="레슨명, 강사명, 키워드를 입력하세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-md h-10 rounded-xl border border-gray-200 pl-12 transition-colors placeholder:text-sm focus:border-blue-600"
              />
            </div>
          </div>

          {/* 필터 옵션 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 카테고리 선택 */}
            <div className="space-y-2">
              <label className="text-md font-semibold text-gray-800">
                카테고리
              </label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="h-10 w-full rounded-lg border border-gray-200">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 지역 선택 */}
          <div className="space-y-4">
            <label className="text-md font-semibold text-gray-800">
              지역 선택
            </label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {/* 시/도 선택 */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">시/도</label>
                <Select
                  value={selectedRegion?.city || ''}
                  onValueChange={(value) => {
                    setSelectedRegion({
                      ...selectedRegion,
                      city: value,
                      district: 'all',
                      dong: 'all',
                      ri: 'all',
                    })
                  }}
                >
                  <SelectTrigger className="h-10 rounded-lg border border-gray-200">
                    <SelectValue placeholder="시/도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    {getSidoList().map((sido) => (
                      <SelectItem key={sido} value={sido}>
                        {sido}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 구/군 선택 */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">구/군</label>
                <Select
                  value={selectedRegion?.district || ''}
                  onValueChange={(value) => {
                    setSelectedRegion({
                      ...selectedRegion,
                      district: value,
                      dong: 'all',
                      ri: 'all',
                    })
                  }}
                  disabled={
                    !selectedRegion?.city || selectedRegion?.city === 'all'
                  }
                >
                  <SelectTrigger className="h-10 rounded-lg border border-gray-200">
                    <SelectValue placeholder="구/군 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    {selectedRegion?.city &&
                      selectedRegion.city !== 'all' &&
                      getSigunguList(selectedRegion.city).map((sigungu) => (
                        <SelectItem key={sigungu} value={sigungu}>
                          {sigungu}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 동/면 선택 */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">동/면</label>
                <Select
                  value={selectedRegion?.dong || 'all'}
                  onValueChange={(value) => {
                    setSelectedRegion({
                      ...selectedRegion,
                      dong: value,
                    })
                  }}
                  disabled={
                    !selectedRegion?.district ||
                    selectedRegion?.district === 'all'
                  }
                >
                  <SelectTrigger className="h-10 rounded-lg border border-gray-200">
                    <SelectValue placeholder="동/면 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    {selectedRegion?.city &&
                      selectedRegion?.district &&
                      selectedRegion.city !== 'all' &&
                      selectedRegion.district !== 'all' &&
                      getDongList(
                        selectedRegion.city,
                        selectedRegion.district,
                      ).map((dong: string) => (
                        <SelectItem key={dong} value={dong}>
                          {dong}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 리 선택 */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">리 (선택)</label>
                <Select
                  value={selectedRegion?.ri || 'all'}
                  onValueChange={(value) => {
                    setSelectedRegion({
                      ...selectedRegion,
                      ri: value,
                    })
                  }}
                  disabled={
                    !selectedRegion?.district ||
                    selectedRegion?.district === 'all'
                  }
                >
                  <SelectTrigger className="h-10 rounded-lg border border-gray-200">
                    <SelectValue placeholder="리 선택 (선택사항)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">선택 안함</SelectItem>
                    {selectedRegion?.city &&
                      selectedRegion?.district &&
                      selectedRegion.city !== 'all' &&
                      selectedRegion.district !== 'all' &&
                      getRiList(
                        selectedRegion.city,
                        selectedRegion.district,
                      ).map((ri: string) => (
                        <SelectItem key={ri} value={ri}>
                          {ri}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 검색 버튼 */}
          <Button
            onClick={handleSearch}
            className="h-14 w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] font-semibold text-white shadow-xs transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-sm"
          >
            <Search className="mr-2 h-5 w-5" />
            레슨 검색
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return <SearchPageContent />
}
