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
import { Search, MapPin, DollarSign } from 'lucide-react'
import { regionData } from '@/lib/region-data'

export default function SearchForm() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    keyword: '',
    category: 'all',
    location: 'all',
    priceRange: 'all',
    ri: '',
    sortBy: 'LATEST',
  })

  const handleInputChange = (field: string, value: string) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()

    if (searchData.keyword.trim()) {
      params.append('search', searchData.keyword.trim())
    }

    // 카테고리가 'all'이 아닌 경우에만 추가
    if (searchData.category && searchData.category !== 'all') {
      params.append('category', searchData.category)
    }

    if (searchData.location && searchData.location !== 'all') {
      params.append('city', searchData.location)
    }

    // ri 필드가 있는 경우에만 추가
    if (searchData.ri && searchData.ri.trim()) {
      params.append('ri', searchData.ri.trim())
    }

    // sortBy가 기본값이 아닌 경우에만 추가
    if (searchData.sortBy && searchData.sortBy !== 'LATEST') {
      params.append('sortBy', searchData.sortBy)
    }

    const queryString = params.toString()
    router.push(`/lesson/list?${queryString}`)
  }

  const sortOptions = [
    { value: 'LATEST', label: '최신순' },
    { value: 'OLDEST', label: '오래된순' },
    { value: 'PRICE_LOW', label: '가격 낮은순' },
    { value: 'PRICE_HIGH', label: '가격 높은순' },
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* 카테고리 선택 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">카테고리</label>
          <Select
            value={searchData.category}
            onValueChange={(value) => handleInputChange('category', value)}
          >
            <SelectTrigger className="h-12 rounded-lg border-2 border-gray-200">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="YOGA">요가</SelectItem>
              <SelectItem value="PILATES">필라테스</SelectItem>
              <SelectItem value="SWIMMING">수영</SelectItem>
              <SelectItem value="BOXING">복싱</SelectItem>
              <SelectItem value="DANCE">댄스</SelectItem>
              <SelectItem value="GOLF">골프</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 리 선택 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">리 (선택)</label>
          <Input
            type="text"
            placeholder="리 입력 (선택사항)"
            value={searchData.ri}
            onChange={(e) => handleInputChange('ri', e.target.value)}
            className="h-12 rounded-lg border-2 border-gray-200"
          />
        </div>

        {/* 정렬 기준 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">정렬</label>
          <Select
            value={searchData.sortBy}
            onValueChange={(value) => handleInputChange('sortBy', value)}
          >
            <SelectTrigger className="h-12 rounded-lg border-2 border-gray-200">
              <SelectValue placeholder="정렬 기준 선택" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  )
}
