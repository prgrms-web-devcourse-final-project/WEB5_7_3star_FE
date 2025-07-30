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

  // 유효한 값인지 확인하는 함수
  const isValidValue = (value: string | undefined | null): boolean => {
    if (!value) return false
    const trimmedValue = value.trim()
    return (
      trimmedValue !== '' &&
      trimmedValue !== 'all' &&
      trimmedValue !== 'none' &&
      trimmedValue !== 'undefined' &&
      trimmedValue !== 'null'
    )
  }

  // 안전한 문자열 변환 함수
  const safeString = (value: string | undefined | null): string => {
    return value || ''
  }

  // 필수 지역 정보 검증 함수
  const isRegionValid = () => {
    return (
      isValidValue(selectedRegion.city) &&
      isValidValue(selectedRegion.district) &&
      isValidValue(selectedRegion.dong)
    )
  }

  const handleSearch = () => {
    // 필수 지역 정보 검증
    if (!isRegionValid()) {
      alert('시/도, 구/군, 동/면을 모두 선택해주세요.')
      return
    }

    const params = new URLSearchParams()

    // 검색어 추가 (유효한 값인 경우만)
    if (isValidValue(keyword)) {
      params.append('search', safeString(keyword).trim())
    }

    // 카테고리 추가 (유효한 값인 경우만)
    if (isValidValue(selectedCategory)) {
      params.append('category', safeString(selectedCategory))
    }

    // 지역 정보 추가 (유효한 값인 경우만)
    if (isValidValue(selectedRegion.city)) {
      params.append('city', safeString(selectedRegion.city))
    }

    if (isValidValue(selectedRegion.district)) {
      params.append('district', safeString(selectedRegion.district))
    }

    if (isValidValue(selectedRegion.dong)) {
      params.append('dong', safeString(selectedRegion.dong))
    }

    // ri 필드 추가 (유효한 값인 경우만)
    if (isValidValue(selectedRegion.ri)) {
      params.append('ri', safeString(selectedRegion.ri))
    }

    // 정렬 기준 추가
    params.append('sortBy', 'LATEST')

    const queryString = params.toString()
    console.log('생성된 쿼리:', queryString) // 디버깅용
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
              지역 선택 <span className="text-red-500">*</span>
            </label>
            {!isRegionValid() && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">
                  ⚠️ 시/도, 구/군, 동/면을 모두 선택해주세요.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {/* 시/도 선택 */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">
                  시/도 <span className="text-red-500">*</span>
                </label>
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
                  <SelectTrigger
                    className={`h-10 rounded-lg border ${
                      !selectedRegion?.city || selectedRegion?.city === 'all'
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  >
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
                <label className="text-sm text-gray-600">
                  구/군 <span className="text-red-500">*</span>
                </label>
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
                  <SelectTrigger
                    className={`h-10 rounded-lg border ${
                      !selectedRegion?.district ||
                      selectedRegion?.district === 'all'
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  >
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
                <label className="text-sm text-gray-600">
                  동/면 <span className="text-red-500">*</span>
                </label>
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
                  <SelectTrigger
                    className={`h-10 rounded-lg border ${
                      !selectedRegion?.dong || selectedRegion?.dong === 'all'
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  >
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
            disabled={!isRegionValid()}
            className={`h-14 w-full rounded-xl font-semibold text-white shadow-xs transition-all duration-200 ${
              isRegionValid()
                ? 'cursor-pointer bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] hover:from-blue-700 hover:to-purple-700 hover:shadow-sm'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            <Search className="mr-2 h-5 w-5" />
            {isRegionValid() ? '레슨 검색' : '지역을 선택해주세요'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return <SearchPageContent />
}
