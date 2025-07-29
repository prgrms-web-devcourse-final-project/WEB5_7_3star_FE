'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRegionData } from '@/hooks/useRegionData'
import { categories } from '@/lib/utils'
import { Filter, MapPin, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ListFilterProps {
  keyword?: string
  category?: string
  city?: string
  district?: string
  dong?: string
  ri?: string
  sortBy?: string
}

export default function ListFilter({
  keyword,
  category,
  city,
  district,
  dong,
  ri,
  sortBy,
}: ListFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    regionData,
    loading,
    getSidoList,
    getSigunguList,
    getDongList,
    getRiList,
  } = useRegionData()

  const [filters, setFilters] = useState({
    keyword: keyword || '',
    category: category || 'all',
    city: city || '',
    district: district || '',
    dong: dong || '',
    ri: ri || '',
    sortBy: 'LATEST',
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null)
  const [expandedCity, setExpandedCity] = useState<string | null>(null)

  // 초기 필터 설정
  useEffect(() => {
    if (loading) return

    const urlKeyword = searchParams.get('search') || ''
    const urlCategory = searchParams.get('category') || 'all'
    const urlCity = searchParams.get('city') || ''
    const urlDistrict = searchParams.get('district') || ''
    const urlDong = searchParams.get('dong') || ''
    const urlRi = searchParams.get('ri') || 'none'
    const urlSortBy = searchParams.get('sortBy') || 'LATEST'

    const newFilters = {
      keyword: urlKeyword || keyword || '',
      category: urlCategory || category || 'all',
      city: urlCity || city || '',
      district: urlDistrict || district || '',
      dong: urlDong || dong || '',
      ri: urlRi || ri || '',
      sortBy: urlSortBy || sortBy || 'LATEST',
    }
    setFilters(newFilters)

    const active: string[] = []
    if (newFilters.category && newFilters.category !== 'all')
      active.push('category')
    if (newFilters.city) active.push('city')
    if (newFilters.district) active.push('district')
    if (newFilters.dong) active.push('dong')
    if (newFilters.ri && newFilters.ri.trim()) active.push('ri')
    if (newFilters.sortBy && newFilters.sortBy !== 'LATEST')
      active.push('sortBy')
    setActiveFilters(active)
  }, [
    keyword,
    category,
    city,
    district,
    dong,
    ri,
    sortBy,
    loading,
    getSidoList,
    searchParams,
  ])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="mb-4 h-6 rounded bg-gray-200"></div>
          <div className="space-y-4">
            <div className="h-14 rounded-xl bg-gray-200"></div>
            <div className="h-10 rounded-lg bg-gray-200"></div>
            <div className="h-10 rounded-lg bg-gray-200"></div>
            <div className="h-10 rounded-lg bg-gray-200"></div>
          </div>
        </div>
      </div>
    )
  }

  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams()

    if (newFilters.keyword) params.set('search', newFilters.keyword)
    if (newFilters.category && newFilters.category !== 'all')
      params.set('category', newFilters.category)

    const sidoList = getSidoList()
    const defaultCity = sidoList[0] || ''
    if (newFilters.city) params.set('city', newFilters.city)
    if (newFilters.district) params.set('district', newFilters.district)
    if (newFilters.dong) params.set('dong', newFilters.dong)
    if (newFilters.ri && newFilters.ri.trim()) params.set('ri', newFilters.ri)
    if (newFilters.sortBy && newFilters.sortBy !== 'LATEST')
      params.set('sortBy', newFilters.sortBy)

    params.set('page', '1')
    params.set('limit', '10')

    console.log(params)

    router.push(`/lesson/list?${params.toString()}`)
  }

  const handleInputChange = (field: string, value: string) => {
    const newFilters = {
      ...filters,
      [field]: value,
    }
    setFilters(newFilters)

    // 검색어는 엔터키 또는 버튼 클릭으로만 적용
    if (field !== 'keyword') {
      updateURL(newFilters)
    }
  }

  const handleKeywordSearch = () => {
    updateURL(filters)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleKeywordSearch()
    }
  }

  const sortOptions = [
    { value: 'LATEST', label: '최신순' },
    { value: 'OLDEST', label: '오래된순' },
    { value: 'PRICE_LOW', label: '가격 낮은순' },
    { value: 'PRICE_HIGH', label: '가격 높은순' },
  ]

  const handleLocationChange = (
    type: 'city' | 'district' | 'dong' | 'ri',
    value: string,
  ) => {
    if (type === 'city') {
      const newFilters = {
        ...filters,
        city: value,
        district: '',
        dong: '',
        ri: '',
      }
      setFilters(newFilters)
      updateURL(newFilters)
    } else if (type === 'district') {
      const newFilters = {
        ...filters,
        district: value,
        dong: '',
        ri: '',
      }
      setFilters(newFilters)
      updateURL(newFilters)
    } else if (type === 'dong') {
      const newFilters = {
        ...filters,
        dong: value,
        ri: '',
      }
      setFilters(newFilters)
      updateURL(newFilters)
    } else if (type === 'ri') {
      const newFilters = {
        ...filters,
        ri: value === 'none' ? '' : value,
      }
      setFilters(newFilters)
      updateURL(newFilters)
    }
  }

  const handleCategoryChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams)

    // 카테고리가 'all'인 경우 파라미터에서 제거 (undefined 처리)
    if (value === 'all') {
      newParams.delete('category')
    } else {
      newParams.set('category', value)
    }

    newParams.set('page', '1')
    router.push(`/lesson/list?${newParams.toString()}`)
  }

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams)

    // sortBy가 기본값인 경우 파라미터에서 제거
    if (value === 'LATEST') {
      newParams.delete('sortBy')
    } else {
      newParams.set('sortBy', value)
    }

    newParams.set('page', '1')
    router.push(`/lesson/list?${newParams.toString()}`)
  }

  return (
    <div className="space-y-6">
      {/* 검색어 */}
      <div className="space-y-3">
        <label className="text-md flex cursor-pointer items-center gap-2 font-semibold text-gray-800">
          <Search className="h-5 w-5 text-blue-600" />
          검색어
        </label>
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="레슨명, 강사명으로 검색"
              value={filters.keyword}
              onChange={(e) => handleInputChange('keyword', e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-md h-10 rounded-xl border border-gray-200 pl-12 transition-colors focus:border-blue-600"
            />
          </div>
          <Button
            onClick={handleKeywordSearch}
            className="w-full rounded bg-blue-600 hover:bg-blue-700"
          >
            검색
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-md flex items-center gap-2 font-semibold text-gray-800">
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
              value={filters.category || 'all'}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="h-10 cursor-pointer rounded-lg border border-gray-200 transition-colors focus:border-blue-600">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-gray-200 bg-white">
                <SelectItem
                  value="all"
                  className="cursor-pointer hover:bg-gray-50"
                >
                  전체
                </SelectItem>
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
          {/* 지역 선택 */}
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4 text-green-600" />
              지역
            </label>

            {/* 시/도 선택 */}
            <div className="space-y-2">
              <label className="text-xs text-gray-500">시/도</label>
              <Select
                value={filters.city}
                onValueChange={(value) => handleLocationChange('city', value)}
              >
                <SelectTrigger className="h-10 rounded-lg border border-gray-200">
                  <SelectValue placeholder="시/도 선택" />
                </SelectTrigger>
                <SelectContent>
                  {getSidoList().map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 구/군 선택 */}
            <div className="space-y-2">
              <label className="text-xs text-gray-500">구/군</label>
              <Select
                value={filters.district}
                onValueChange={(value) =>
                  handleLocationChange('district', value)
                }
              >
                <SelectTrigger className="h-10 rounded-lg border border-gray-200">
                  <SelectValue placeholder="구/군 선택" />
                </SelectTrigger>
                <SelectContent>
                  {filters.city
                    ? getSigunguList(filters.city).map((district: string) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
            </div>

            {/* 동/면 선택 */}
            <div className="space-y-2">
              <label className="text-xs text-gray-500">동/면</label>
              <Select
                value={filters.dong}
                onValueChange={(value) => handleLocationChange('dong', value)}
              >
                <SelectTrigger className="h-10 rounded-lg border border-gray-200">
                  <SelectValue placeholder="동/면 선택" />
                </SelectTrigger>
                <SelectContent>
                  {filters.city && filters.district
                    ? getDongList(filters.city, filters.district).map(
                        (dong: string) => (
                          <SelectItem key={dong} value={dong}>
                            {dong}
                          </SelectItem>
                        ),
                      )
                    : null}
                </SelectContent>
              </Select>
            </div>

            {/* 리 선택 */}
            <div className="space-y-2">
              <label className="text-xs text-gray-500">리 (선택)</label>
              <Select
                value={filters.ri || 'none'}
                onValueChange={(value) => handleLocationChange('ri', value)}
              >
                <SelectTrigger className="h-10 rounded-lg border border-gray-200">
                  <SelectValue placeholder="리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">선택 안함</SelectItem>
                  {filters.city && filters.district
                    ? getRiList(filters.city, filters.district).map(
                        (ri: string) => (
                          <SelectItem key={ri} value={ri}>
                            {ri}
                          </SelectItem>
                        ),
                      )
                    : null}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {/* 가격대 선택 */}
        {/* <div className="space-y-2">
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
          </div> */}
        {/* 정렬 */}
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
            <Filter className="h-4 w-4 text-orange-600" />
            정렬
          </label>
          <Select
            value={filters.sortBy || 'LATEST'}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="h-12 cursor-pointer rounded-lg border border-gray-200 transition-colors focus:border-blue-600">
              <SelectValue placeholder="정렬 기준 선택" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200 bg-white">
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
  )
}
