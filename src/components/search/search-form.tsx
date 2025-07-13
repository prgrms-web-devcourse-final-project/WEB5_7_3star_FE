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
import { Search, MapPin, DollarSign } from 'lucide-react'

export default function SearchForm() {
  const [searchData, setSearchData] = useState({
    keyword: '',
    category: '',
    location: '',
    priceRange: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 클라이언트에서 검색 로직 처리
    console.log('검색 데이터:', searchData)
  }

  const categories = [
    { value: 'all', label: '전체' },
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 검색어 입력 */}
      <div className="relative">
        <Search className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="레슨명, 강사명, 키워드를 입력하세요"
          value={searchData.keyword}
          onChange={(e) => handleInputChange('keyword', e.target.value)}
          className="h-14 rounded-xl border-2 border-gray-200 pl-12 text-lg shadow-xs transition-colors focus:border-blue-600"
        />
      </div>

      {/* 검색 버튼 */}
      <Button
        type="submit"
        className="h-14 w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] font-semibold text-white shadow-xs transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-sm"
      >
        <Search className="mr-2 h-5 w-5" />
        레슨 검색
      </Button>

      {/* 필터 옵션 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">상세 필터</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* 카테고리 */}
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4 text-blue-600" />
              카테고리
            </label>
            <Select
              value={searchData.category}
              onValueChange={(value) => handleInputChange('category', value)}
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
              value={searchData.location}
              onValueChange={(value) => handleInputChange('location', value)}
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
              value={searchData.priceRange}
              onValueChange={(value) => handleInputChange('priceRange', value)}
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
        </div>
      </div>
    </form>
  )
}
