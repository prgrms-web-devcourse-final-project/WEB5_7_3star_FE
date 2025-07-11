"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Heart, Users, Clock, Filter, ArrowLeft, Calendar, DollarSign } from "lucide-react"

// 샘플 레슨 데이터
const sampleLessons = [
  {
    id: 1,
    title: "초보자를 위한 수영 레슨",
    instructor: {
      name: "김수영",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      reviews: 124,
    },
    category: "수영",
    location: "서울 강남구 역삼동",
    price: 50000,
    duration: 60,
    participants: { current: 6, max: 8 },
    image: "/placeholder.svg?height=200&width=300",
    tags: ["초보자", "개인레슨", "자유형"],
    likes: 89,
    isLiked: false,
    schedule: "매주 월, 수, 금 10:00-11:00",
  },
  {
    id: 2,
    title: "프리미엄 요가 클래스",
    instructor: {
      name: "이요가",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      reviews: 98,
    },
    category: "요가",
    location: "서울 강남구 청담동",
    price: 180000,
    duration: 60,
    participants: { current: 4, max: 8 },
    image: "/placeholder.svg?height=200&width=300",
    tags: ["소그룹", "스트레스해소", "초보환영"],
    likes: 156,
    isLiked: false,
    schedule: "매주 월, 수, 금 18:30-19:30",
  },
  {
    id: 3,
    title: "테니스 기초반",
    instructor: {
      name: "박테니스",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      reviews: 76,
    },
    category: "테니스",
    location: "서울 서초구 반포동",
    price: 80000,
    duration: 90,
    participants: { current: 3, max: 6 },
    image: "/placeholder.svg?height=200&width=300",
    tags: ["기초", "그룹레슨", "실외"],
    likes: 67,
    isLiked: false,
    schedule: "매주 화, 목 14:00-15:30",
  },
  {
    id: 4,
    title: "필라테스 소그룹 클래스",
    instructor: {
      name: "최필라",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      reviews: 142,
    },
    category: "필라테스",
    location: "서울 마포구 홍대",
    price: 120000,
    duration: 50,
    participants: { current: 5, max: 6 },
    image: "/placeholder.svg?height=200&width=300",
    tags: ["소그룹", "체형교정", "코어강화"],
    likes: 203,
    isLiked: false,
    schedule: "매주 월, 수, 금 19:00-19:50",
  },
  {
    id: 5,
    title: "골프 입문 레슨",
    instructor: {
      name: "정골프",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.6,
      reviews: 89,
    },
    category: "골프",
    location: "경기 성남시 분당구",
    price: 200000,
    duration: 60,
    participants: { current: 2, max: 4 },
    image: "/placeholder.svg?height=200&width=300",
    tags: ["입문", "개인지도", "실내연습장"],
    likes: 45,
    isLiked: false,
    schedule: "매주 토, 일 10:00-11:00",
  },
  {
    id: 6,
    title: "복싱 기초 트레이닝",
    instructor: {
      name: "김복싱",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      reviews: 67,
    },
    category: "복싱",
    location: "서울 강동구 천호동",
    price: 90000,
    duration: 60,
    participants: { current: 7, max: 10 },
    image: "/placeholder.svg?height=200&width=300",
    tags: ["기초", "체력향상", "스트레스해소"],
    likes: 78,
    isLiked: false,
    schedule: "매주 화, 목, 토 18:00-19:00",
  },
]

export default function SearchResults() {
  const [lessons, setLessons] = useState(sampleLessons)
  const [sortBy, setSortBy] = useState("likes")
  const [filterCategory, setFilterCategory] = useState("전체")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["전체", "수영", "요가", "테니스", "필라테스", "골프", "복싱", "헬스", "베드민턴"]

  const handleLike = (lessonId: number) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              isLiked: !lesson.isLiked,
              likes: lesson.isLiked ? lesson.likes - 1 : lesson.likes + 1,
            }
          : lesson,
      ),
    )
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    const sortedLessons = [...lessons].sort((a, b) => {
      switch (value) {
        case "likes":
          return b.likes - a.likes
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.instructor.rating - a.instructor.rating
        default:
          return 0
      }
    })
    setLessons(sortedLessons)
  }

  const filteredLessons = lessons.filter((lesson) => {
    const matchesCategory = filterCategory === "전체" || lesson.category === filterCategory
    const matchesKeyword =
      searchKeyword === "" ||
      lesson.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      lesson.instructor.name.toLowerCase().includes(searchKeyword.toLowerCase())
    return matchesCategory && matchesKeyword
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => window.history.back()} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                검색으로 돌아가기
              </Button>
              <div className="text-lg font-semibold text-gray-700">
                검색 결과 <span className="text-blue-600">{filteredLessons.length}개</span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 md:hidden"
            >
              <Filter className="w-4 h-4" />
              필터
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 사이드바 필터 */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">검색 필터</h3>

                {/* 키워드 검색 */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">키워드</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="레슨명, 강사명..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* 카테고리 필터 */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">카테고리</label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
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

                {/* 정렬 */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">정렬</label>
                  <Select value={sortBy} onValueChange={handleSort}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="likes">좋아요 많은 순</SelectItem>
                      <SelectItem value="rating">평점 높은 순</SelectItem>
                      <SelectItem value="price-low">가격 낮은 순</SelectItem>
                      <SelectItem value="price-high">가격 높은 순</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 검색 결과 */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLessons.map((lesson) => (
                <Card key={lesson.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={lesson.image || "/placeholder.svg"}
                      alt={lesson.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700">{lesson.category}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-3 right-3 p-2 rounded-full ${
                        lesson.isLiked ? "bg-red-500 text-white" : "bg-white/90 text-gray-600"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike(lesson.id)
                      }}
                    >
                      <Heart className={`w-4 h-4 ${lesson.isLiked ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* 제목 및 기본 정보 */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{lesson.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{lesson.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{lesson.schedule}</span>
                        </div>
                      </div>

                      {/* 강사 정보 */}
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={lesson.instructor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{lesson.instructor.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{lesson.instructor.name}</div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{lesson.instructor.rating}</span>
                            <span>({lesson.instructor.reviews}개 리뷰)</span>
                          </div>
                        </div>
                      </div>

                      {/* 태그 */}
                      <div className="flex flex-wrap gap-1">
                        {lesson.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* 하단 정보 */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{lesson.duration}분</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>
                              {lesson.participants.current}/{lesson.participants.max}명
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{lesson.likes}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{lesson.price.toLocaleString()}원</div>
                          <div className="text-xs text-gray-500">
                            회당 {Math.round(lesson.price / 4).toLocaleString()}원
                          </div>
                        </div>
                      </div>

                      {/* 예약 버튼 */}
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <DollarSign className="w-4 h-4 mr-2" />
                        예약하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 결과가 없을 때 */}
            {filteredLessons.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">검색 결과가 없습니다</div>
                <p className="text-gray-400">다른 검색 조건을 시도해보세요</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
