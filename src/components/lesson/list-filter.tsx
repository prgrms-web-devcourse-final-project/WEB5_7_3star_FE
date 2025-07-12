'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ListFilter() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'yoga', label: '요가' },
    { value: 'pilates', label: '필라테스' },
    { value: 'swimming', label: '수영' },
    { value: 'home-training', label: '홈트레이닝' },
    { value: 'crossfit', label: '크로스핏' },
    { value: 'boxing', label: '복싱' },
  ]

  const locations = [
    { value: 'all', label: '전체 지역' },
    { value: 'gangnam', label: '강남구' },
    { value: 'seocho', label: '서초구' },
    { value: 'online', label: '온라인' },
  ]

  const sortOptions = [
    { value: 'popular', label: '인기순' },
    { value: 'rating', label: '평점순' },
    { value: 'price-low', label: '가격 낮은순' },
    { value: 'price-high', label: '가격 높은순' },
    { value: 'recent', label: '최신순' },
  ]

  const handleSearch = () => {
    // 클라이언트에서 검색 로직 처리
    console.log('Search:', {
      searchTerm,
      selectedCategory,
      selectedLocation,
      sortBy,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="레슨명, 강사명, 키워드로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5]"
        >
          검색
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="지역" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.value} value={location.value}>
                {location.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="정렬" />
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
  )
}
