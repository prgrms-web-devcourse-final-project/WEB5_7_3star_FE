'use client'

import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Camera, MapPin, Send, Star, User } from 'lucide-react'
import { useState } from 'react'

// 더미 레슨 데이터
const dummyLesson = {
  id: 'LESSON001',
  title: '초보자를 위한 자유형 마스터 클래스',
  instructor: {
    name: '김수영',
    avatar: '/placeholder-user.jpg',
  },
  category: '수영',
  location: '강남구 수영장',
  date: '2024-01-15',
  time: '오후 2:00 - 3:30',
  price: 45000,
}

export default function ReviewWritePage() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (selectedImages.length + files.length <= 5) {
      setSelectedImages([...selectedImages, ...files])
    } else {
      alert('최대 5장까지 업로드 가능합니다.')
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (rating === 0) {
      alert('평점을 선택해주세요.')
      return
    }
    if (!reviewText.trim()) {
      alert('리뷰 내용을 작성해주세요.')
      return
    }

    console.log('리뷰 제출:', {
      lessonId: dummyLesson.id,
      rating,
      reviewText,
      images: selectedImages,
    })

    alert('리뷰가 성공적으로 등록되었습니다!')
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        onClick={() => setRating(i + 1)}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
        className="p-1 transition-all duration-200 hover:scale-110"
      >
        <Star
          className={`h-8 w-8 ${
            i < (hoverRating || rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      </button>
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Container size="lg">
      <PageHeader
        title="리뷰 작성"
        subtitle="레슨에 대한 솔직한 후기를 남겨주세요"
        align="center"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 메인 콘텐츠 */}
        <div className="space-y-6 lg:col-span-2">
          {/* 레슨 정보 */}
          <Card className="border-2 border-gray-100 shadow-xs">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="text-xl font-bold text-gray-800">
                수강한 레슨
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white">
                  {dummyLesson.category.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-bold text-gray-800">
                    {dummyLesson.title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      {dummyLesson.instructor.name} 강사
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      {formatDate(dummyLesson.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      {dummyLesson.location}
                    </div>
                  </div>
                </div>
                <Badge className="border-0 bg-green-100 text-green-700">
                  수강 완료
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 평점 */}
          <Card className="border-2 border-gray-100 shadow-xs">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="text-xl font-bold text-gray-800">
                평점
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-center">
                <div className="flex justify-center gap-2">{renderStars()}</div>
                <p className="text-gray-600">
                  {rating === 0
                    ? '평점을 선택해주세요'
                    : `${rating}점을 선택하셨습니다`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 리뷰 내용 */}
          <Card className="border-2 border-gray-100 shadow-xs">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="text-xl font-bold text-gray-800">
                리뷰 내용
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Textarea
                  placeholder="레슨에 대한 솔직한 후기를 작성해주세요. 강사님의 지도 방식, 레슨 내용, 시설 등에 대한 의견을 자유롭게 남겨주세요."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="min-h-32 border-2 border-gray-200 p-4 focus:border-blue-600"
                  maxLength={1000}
                />
                <div className="text-right text-sm text-gray-500">
                  {reviewText.length}/1000자
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 사진 업로드 */}
          <Card className="border-2 border-gray-100 shadow-xs">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <Camera className="h-5 w-5 text-blue-600" />
                사진 첨부 ({selectedImages.length}/5)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-600">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Camera className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                    <p className="text-gray-600">
                      클릭하여 사진을 업로드하세요
                    </p>
                    <p className="text-sm text-gray-500">
                      최대 5장까지 업로드 가능
                    </p>
                  </label>
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Review ${index + 1}`}
                          className="h-24 w-full rounded-lg border-2 border-gray-200 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 제출 버튼 */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] py-4 text-lg font-semibold transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="mr-2 h-5 w-5" />
              리뷰 등록하기
            </Button>
          </div>
        </div>

        {/* 사이드바 */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 border-2 border-gray-100 shadow-xs">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="text-lg font-bold text-gray-800">
                리뷰 가이드
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">평점 기준</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span>매우 만족</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 4 }, (_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <Star className="h-3 w-3 text-gray-300" />
                      </div>
                      <span>만족</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 3 }, (_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        {Array.from({ length: 2 }, (_, i) => (
                          <Star key={i} className="h-3 w-3 text-gray-300" />
                        ))}
                      </div>
                      <span>보통</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">리뷰 작성 팁</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>• 구체적인 경험담을 작성해주세요</p>
                    <p>• 강사님의 지도 방식에 대한 의견</p>
                    <p>• 레슨 내용의 유용성</p>
                    <p>• 시설 및 환경에 대한 평가</p>
                    <p>• 다른 수강생에게 도움이 될 정보</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">주의사항</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>• 개인정보가 포함되지 않도록 주의</p>
                    <p>• 타인을 비방하는 내용 금지</p>
                    <p>• 허위 정보 작성 금지</p>
                    <p>• 한 번 등록된 리뷰는 수정 불가</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
