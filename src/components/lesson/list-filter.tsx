'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  X,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchFilters {
  category?: string
  city?: string
  district?: string
  dong?: string
  search?: string
  page?: number
  limit?: number
}

interface ListFilterProps {
  initialFilters?: SearchFilters
}

export default function ListFilter({ initialFilters }: ListFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    keyword: initialFilters?.search || '',
    category: initialFilters?.category || 'YOGA',
    city: initialFilters?.city || '서울특별시',
    district: initialFilters?.district || '강남구',
    dong: initialFilters?.dong || '역삼동',
    priceRange: '0-200000',
    sortBy: 'latest',
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null)
  const [expandedCity, setExpandedCity] = useState<string | null>(null)

  // 초기 필터 설정
  useEffect(() => {
    if (initialFilters) {
      const newFilters = {
        keyword: initialFilters.search || '',
        category: initialFilters.category || 'YOGA',
        city: initialFilters.city || '서울특별시',
        district: initialFilters.district || '강남구',
        dong: initialFilters.dong || '역삼동',
        priceRange: '0-20000',
        sortBy: 'latest',
      }
      setFilters(newFilters)

      // 활성 필터 설정 (기본값이 아닌 경우만 활성으로 표시)
      const active: string[] = []
      if (newFilters.category !== 'YOGA' && newFilters.category !== 'all')
        active.push('category')
      if (newFilters.city !== '서울특별시' && newFilters.city !== 'all')
        active.push('city')
      if (newFilters.district !== '강남구' && newFilters.district !== 'all')
        active.push('district')
      if (newFilters.dong !== '역삼동' && newFilters.dong !== 'all')
        active.push('dong')
      setActiveFilters(active)
    }
  }, [initialFilters])

  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams()

    if (newFilters.keyword) params.set('search', newFilters.keyword)
    if (newFilters.category !== 'YOGA')
      params.set('category', newFilters.category)
    if (newFilters.city !== '서울특별시') params.set('city', newFilters.city)
    if (newFilters.district !== '강남구')
      params.set('district', newFilters.district)
    if (newFilters.dong !== '역삼동') params.set('dong', newFilters.dong)
    if (newFilters.priceRange !== '0-20000')
      params.set('priceRange', newFilters.priceRange)

    params.set('page', '1')
    params.set('limit', '10')

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

  const handleFilterChange = (filterType: string, value: string) => {
    // 'all' 선택 시 기본값으로 변환
    const defaultValues = {
      category: 'YOGA',
      city: '서울특별시',
      district: '강남구',
      dong: '역삼동',
    }

    const actualValue =
      value === 'all'
        ? defaultValues[filterType as keyof typeof defaultValues] || 'all'
        : value

    handleInputChange(filterType, actualValue)

    // 기본값이 아닌 경우만 활성 필터로 추가
    const isDefault =
      filterType === 'category'
        ? actualValue === 'YOGA'
        : filterType === 'city'
          ? actualValue === '서울특별시'
          : filterType === 'district'
            ? actualValue === '강남구'
            : filterType === 'dong'
              ? actualValue === '역삼동'
              : filterType === 'priceRange'
                ? actualValue === '0-20000'
                : actualValue === 'all'

    if (!isDefault && !activeFilters.includes(filterType)) {
      setActiveFilters([...activeFilters, filterType])
    } else if (isDefault) {
      setActiveFilters(activeFilters.filter((f) => f !== filterType))
    }
  }

  const removeFilter = (filterType: string) => {
    const defaultValues = {
      category: 'YOGA',
      city: '서울특별시',
      district: '강남구',
      dong: '역삼동',
      priceRange: '0-20000',
    }
    const defaultValue =
      defaultValues[filterType as keyof typeof defaultValues] || 'all'
    handleInputChange(filterType, defaultValue)
    setActiveFilters(activeFilters.filter((f) => f !== filterType))
  }

  const clearAllFilters = () => {
    const newFilters = {
      keyword: '',
      category: 'YOGA',
      city: '서울특별시',
      district: '강남구',
      dong: '역삼동',
      priceRange: '0-20000',
      sortBy: 'latest',
    }
    setFilters(newFilters)
    setActiveFilters([])
    updateURL(newFilters)
  }

  const handleKeywordSearch = () => {
    updateURL(filters)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleKeywordSearch()
    }
  }

  // 지역 데이터
  const regionData = {
    서울특별시: {
      강남구: ['역삼동', '청담동', '논현동', '압구정동'],
      서초구: ['서초동', '잠원동', '반포동', '방배동'],
      마포구: ['합정동', '홍대동', '상암동', '연남동'],
      종로구: ['명동', '인사동', '종로1가', '종로2가'],
      중구: ['명동', '을지로', '신당동', '회현동'],
    },
    부산광역시: {
      해운대구: ['우동', '중동', '좌동', '재송동'],
      부산진구: ['서면동', '양정동', '연지동', '전포동'],
    },
    인천광역시: {
      남동구: ['구월동', '간석동', '만수동', '논현동'],
      연수구: ['연수동', '청학동', '송도동', '옥련동'],
    },
  }

  const categories = [
    { value: 'GYM', label: '헬스' },
    { value: 'PILATES', label: '필라테스' },
    { value: 'YOGA', label: '요가' },
    { value: 'RUNNING', label: '러닝' },
    { value: 'CYCLING', label: '사이클링' },
    { value: 'HIKING', label: '등산' },
    { value: 'CLIMBING', label: '클라이밍' },
    { value: 'SWIMMING', label: '수영' },
    { value: 'TENNIS', label: '테니스' },
    { value: 'BADMINTON', label: '배드민턴' },
    { value: 'SQUASH', label: '스쿼시' },
    { value: 'FOOTBALL', label: '축구' },
    { value: 'BASKETBALL', label: '농구' },
    { value: 'BASEBALL', label: '야구' },
    { value: 'GOLF', label: '골프' },
    { value: 'DANCE', label: '댄스' },
    { value: 'MARTIAL_ARTS', label: '무술' },
    { value: 'CROSS_FIT', label: '크로스핏' },
    { value: 'BOARD_SPORTS', label: '보드스포츠' },
    { value: 'ESPORTS', label: 'E스포츠' },
    { value: 'TABLE_TENNIS', label: '탁구' },
    { value: 'VOLLEYBALL', label: '배구' },
    { value: 'BOXING', label: '복싱' },
    { value: 'KICKBOXING', label: '킥복싱' },
    { value: 'FENCING', label: '펜싱' },
    { value: 'ARCHERY', label: '양궁' },
    { value: 'INLINE_SKATING', label: '인라인스케이팅' },
    { value: 'SKATING', label: '스케이팅' },
    { value: 'SURFING', label: '서핑' },
    { value: 'HORSE_RIDING', label: '승마' },
    { value: 'SKIING', label: '스키' },
    { value: 'SNOWBOARDING', label: '스노보드' },
    { value: 'TRIATHLON', label: '철인3종' },
    { value: 'SPORTS_WATCHING_PARTY', label: '스포츠 관람' },
    { value: 'ETC', label: '기타' },
  ]

  const priceRanges = [
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

  const handleLocationChange = (
    type: 'city' | 'district' | 'dong',
    value: string,
  ) => {
    if (type === 'city') {
      const newFilters = {
        ...filters,
        city: value,
        district: 'all',
        dong: 'all',
      }
      setFilters(newFilters)
      updateURL(newFilters)
    } else if (type === 'district') {
      const newFilters = {
        ...filters,
        district: value,
        dong: 'all',
      }
      setFilters(newFilters)
      updateURL(newFilters)
    } else {
      const newFilters = {
        ...filters,
        dong: value,
      }
      setFilters(newFilters)
      updateURL(newFilters)
    }
  }

  return (
    <div className="space-y-6">
      {/* 검색어 */}
      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-gray-800">
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
              className="h-14 rounded-xl border-2 border-gray-200 pl-12 text-lg shadow-xs transition-colors focus:border-blue-600"
            />
          </div>
          <Button
            onClick={handleKeywordSearch}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            검색
          </Button>
        </div>
      </div>

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
                  {Object.keys(regionData).map((city) => (
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
                  {regionData[filters.city as keyof typeof regionData] &&
                    Object.keys(
                      regionData[filters.city as keyof typeof regionData],
                    ).map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
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
                  {(() => {
                    const cityData =
                      regionData[filters.city as keyof typeof regionData]
                    if (!cityData) return null
                    const districtData = cityData[
                      filters.district as keyof typeof cityData
                    ] as string[]
                    if (!districtData) return null
                    return districtData.map((dong: string) => (
                      <SelectItem key={dong} value={dong}>
                        {dong}
                      </SelectItem>
                    ))
                  })()}
                </SelectContent>
              </Select>
            </div>
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
              className="h-auto p-1 text-xs text-red-600 hover:text-red-700"
            >
              전체 해제
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filterType) => {
              const filterLabels: { [key: string]: string } = {
                category: '카테고리',
                city: '시/도',
                district: '구/군',
                dong: '동/면',
                priceRange: '가격대',
              }
              return (
                <Badge
                  key={filterType}
                  variant="secondary"
                  className="flex items-center gap-1 bg-blue-50 text-blue-700"
                >
                  {filterLabels[filterType]}:{' '}
                  {filters[filterType as keyof typeof filters]}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter(filterType)}
                    className="h-auto p-0 text-blue-700 hover:text-blue-900"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
