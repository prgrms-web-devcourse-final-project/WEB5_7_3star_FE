'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, MapPin, DollarSign, Filter, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ListFilter() {
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    location: '',
    priceRange: '',
    sortBy: '',
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFilterChange = (filterType: string, value: string) => {
    handleInputChange(filterType, value)

    // 활성 필터 추가
    if (value && value !== 'all') {
      setActiveFilters((prev) => {
        const filtered = prev.filter((f) => !f.startsWith(filterType))
        return [...filtered, `${filterType}:${value}`]
      })
    } else {
      setActiveFilters((prev) => prev.filter((f) => !f.startsWith(filterType)))
    }
  }

  const removeFilter = (filter: string) => {
    const [type] = filter.split(':')
    setActiveFilters((prev) => prev.filter((f) => f !== filter))
    handleInputChange(type, '')
  }

  const clearAllFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      location: '',
      priceRange: '',
      sortBy: '',
    })
    setActiveFilters([])
  }

  const categories = [
    { value: 'all', label: '전체 카테고리' },
    { value: 'yoga', label: '요가' },
    { value: 'pilates', label: '필라테스' },
    { value: 'swimming', label: '수영' },
    { value: 'home-training', label: '홈트레이닝' },
    { value: 'boxing', label: '복싱' },
    { value: 'dance', label: '댄스' },
    { value: 'golf', label: '골프' },
    { value: 'tennis', label: '테니스' },
  ]

  const locations = [
    { value: 'all', label: '전체 지역' },
    { value: 'gangnam', label: '강남구' },
    { value: 'seocho', label: '서초구' },
    { value: 'mapo', label: '마포구' },
    { value: 'jongno', label: '종로구' },
    { value: 'jung', label: '중구' },
    { value: 'online', label: '온라인' },
  ]

  const priceRanges = [
    { value: 'all', label: '전체 가격' },
    { value: '0-20000', label: '2만원 이하' },
    { value: '20000-50000', label: '2만원 - 5만원' },
    { value: '50000-100000', label: '5만원 - 10만원' },
    { value: '100000+', label: '10만원 이상' },
  ]

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'popular', label: '인기순' },
    { value: 'price-low', label: '가격 낮은순' },
    { value: 'price-high', label: '가격 높은순' },
    { value: 'rating', label: '평점순' },
  ]

  return (
    <div className="space-y-6">
      {/* 검색어 */}
      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-gray-800">
          <Search className="h-5 w-5 text-blue-600" />
          검색어
        </label>
        <div className="relative">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="레슨명, 강사명으로 검색"
            value={filters.keyword}
            onChange={(e) => handleInputChange('keyword', e.target.value)}
            className="h-14 rounded-xl border-2 border-gray-200 pl-12 text-lg shadow-xs transition-colors focus:border-blue-600"
          />
        </div>
      </div>

      {/* 필터 옵션 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Filter className="h-5 w-5 text-green-600" />
          필터 옵션
        </div>

        <div className="space-y-4">
          {/* 카테고리 */}
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4 text-blue-600" />
              카테고리
            </label>
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger className="h-12 cursor-pointer rounded-lg border-2 border-gray-200 shadow-xs transition-colors focus:border-blue-600">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-sm">
                {categories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 지역 */}
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4 text-green-600" />
              지역
            </label>
            <Select
              value={filters.location}
              onValueChange={(value) => handleFilterChange('location', value)}
            >
              <SelectTrigger className="h-12 cursor-pointer rounded-lg border-2 border-gray-200 shadow-xs transition-colors focus:border-blue-600">
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-sm">
                {locations.map((location) => (
                  <SelectItem
                    key={location.value}
                    value={location.value}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 가격대 */}
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
              <DollarSign className="h-4 w-4 text-purple-600" />
              가격대
            </label>
            <Select
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange('priceRange', value)}
            >
              <SelectTrigger className="h-12 cursor-pointer rounded-lg border-2 border-gray-200 shadow-xs transition-colors focus:border-blue-600">
                <SelectValue placeholder="가격대 선택" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-sm">
                {priceRanges.map((range) => (
                  <SelectItem
                    key={range.value}
                    value={range.value}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 정렬 */}
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
              <Filter className="h-4 w-4 text-orange-600" />
              정렬
            </label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleInputChange('sortBy', value)}
            >
              <SelectTrigger className="h-12 cursor-pointer rounded-lg border-2 border-gray-200 shadow-xs transition-colors focus:border-blue-600">
                <SelectValue placeholder="정렬 기준 선택" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-sm">
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 활성 필터 */}
      {activeFilters.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              적용된 필터
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="cursor-pointer text-xs text-gray-500 hover:text-gray-700"
            >
              모두 지우기
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => {
              const [, value] = filter.split(':')
              const label =
                [...categories, ...locations, ...priceRanges].find(
                  (item) => item.value === value,
                )?.label || value

              return (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="cursor-pointer gap-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  {label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              )
            })}
          </div>
        </div>
      )}

      {/* 필터 적용 버튼 */}
      <Button className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] px-8 py-3 text-lg font-semibold text-white shadow-xs transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-sm">
        필터 적용
      </Button>
    </div>
  )
}
