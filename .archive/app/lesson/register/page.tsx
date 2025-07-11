'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Camera,
  FileText,
  Eye,
} from 'lucide-react'

export default function LessonRegistration() {
  const [formData, setFormData] = useState({
    lessonName: '',
    city: '',
    district: '',
    dong: '',
    detailAddress: '',
    startDate: '',
    endDate: '',
    description: '',
    maxParticipants: '',
    pricePerPerson: '',
    category: '',
    registrationType: 'first-come',
  })

  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const cities = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
  ]
  const districts = {
    서울특별시: [
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ],
    부산광역시: [
      '중구',
      '서구',
      '동구',
      '영도구',
      '부산진구',
      '동래구',
      '남구',
      '북구',
      '해운대구',
      '사하구',
      '금정구',
      '강서구',
      '연제구',
      '수영구',
      '사상구',
      '기장군',
    ],
  }
  const dongs = [
    '역삼동',
    '논현동',
    '압구정동',
    '청담동',
    '삼성동',
    '대치동',
    '개포동',
    '일원동',
    '수서동',
    '세곡동',
  ]

  const categories = [
    '수영',
    '헬스',
    '테니스',
    '베드민턴',
    '요가',
    '필라테스',
    '골프',
    '축구',
    '농구',
    '배구',
    '탁구',
    '클라이밍',
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (selectedImages.length + files.length <= 10) {
      setSelectedImages([...selectedImages, ...files])
    } else {
      alert('최대 10장까지 업로드 가능합니다.')
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    console.log('Selected images:', selectedImages)
    // 여기에 실제 제출 로직을 구현
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 배경 장식 요소 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 h-32 w-32 rounded-full opacity-20 blur-3xl"
          style={{
            background: `rgba(107, 115, 255, 0.08)`,
          }}
        ></div>
        <div
          className="absolute top-40 right-20 h-24 w-24 rounded-full opacity-15 blur-3xl"
          style={{
            background: `rgba(159, 122, 234, 0.06)`,
          }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 h-40 w-40 rounded-full opacity-10 blur-3xl"
          style={{
            background: `rgba(107, 115, 255, 0.05)`,
          }}
        ></div>
      </div>

      <div className="relative container mx-auto max-w-7xl px-4 py-8">
        {/* 상단 헤더 */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">레슨 등록</h1>
          <p className="text-lg text-gray-600">
            새로운 레슨을 등록하고 참여자를 모집해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 좌측: 폼 입력 */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-gray-100 shadow-lg">
              <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <FileText className="text-primary h-6 w-6" />
                  레슨 정보 입력
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* 레슨 이름 */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="lessonName"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <FileText className="text-primary h-5 w-5" />
                      레슨 이름
                    </Label>
                    <Input
                      id="lessonName"
                      placeholder="레슨 이름을 입력하세요"
                      value={formData.lessonName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lessonName: e.target.value,
                        })
                      }
                      className="focus:border-primary border-2 border-gray-200 p-3 text-lg"
                    />
                  </div>

                  {/* 지역 선택 */}
                  <div className="space-y-4">
                    <Label className="flex items-center gap-2 text-lg font-semibold">
                      <MapPin className="text-primary h-5 w-5" />
                      지역
                    </Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor="city" className="text-sm text-gray-600">
                          시/도
                        </Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              city: value,
                              district: '',
                              dong: '',
                            })
                          }
                        >
                          <SelectTrigger className="focus:border-primary border-2 border-gray-200">
                            <SelectValue placeholder="시/도를 선택하세요" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label
                          htmlFor="district"
                          className="text-sm text-gray-600"
                        >
                          구/군
                        </Label>
                        <Select
                          value={formData.district}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              district: value,
                              dong: '',
                            })
                          }
                          disabled={!formData.city}
                        >
                          <SelectTrigger className="focus:border-primary border-2 border-gray-200">
                            <SelectValue placeholder="구/군을 선택하세요" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.city &&
                              districts[
                                formData.city as keyof typeof districts
                              ]?.map((district) => (
                                <SelectItem key={district} value={district}>
                                  {district}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="dong" className="text-sm text-gray-600">
                          동
                        </Label>
                        <Select
                          value={formData.dong}
                          onValueChange={(value) =>
                            setFormData({ ...formData, dong: value })
                          }
                          disabled={!formData.district}
                        >
                          <SelectTrigger className="focus:border-primary border-2 border-gray-200">
                            <SelectValue placeholder="동을 선택하세요" />
                          </SelectTrigger>
                          <SelectContent>
                            {dongs.map((dong) => (
                              <SelectItem key={dong} value={dong}>
                                {dong}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="detailAddress"
                        className="text-sm text-gray-600"
                      >
                        상세주소
                      </Label>
                      <Input
                        id="detailAddress"
                        placeholder="상세주소를 입력하세요"
                        value={formData.detailAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            detailAddress: e.target.value,
                          })
                        }
                        className="focus:border-primary border-2 border-gray-200"
                      />
                    </div>
                  </div>

                  {/* 날짜 선택 */}
                  <div className="space-y-4">
                    <Label className="flex items-center gap-2 text-lg font-semibold">
                      <Calendar className="text-primary h-5 w-5" />
                      레슨 기간
                    </Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label
                          htmlFor="startDate"
                          className="text-sm text-gray-600"
                        >
                          시작일
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startDate: e.target.value,
                            })
                          }
                          className="focus:border-primary border-2 border-gray-200"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="endDate"
                          className="text-sm text-gray-600"
                        >
                          종료일
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.value,
                            })
                          }
                          className="focus:border-primary border-2 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 카테고리 선택 */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-lg font-semibold">
                      카테고리
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="focus:border-primary border-2 border-gray-200">
                        <SelectValue placeholder="카테고리를 선택하세요" />
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

                  {/* 참가자 수 */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="maxParticipants"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Users className="text-primary h-5 w-5" />
                      최대 참가자 수
                    </Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      placeholder="최대 참가자 수를 입력하세요"
                      value={formData.maxParticipants}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxParticipants: e.target.value,
                        })
                      }
                      className="focus:border-primary border-2 border-gray-200"
                    />
                  </div>

                  {/* 가격 */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="pricePerPerson"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <DollarSign className="text-primary h-5 w-5" />
                      인당 가격 (원)
                    </Label>
                    <Input
                      id="pricePerPerson"
                      type="number"
                      placeholder="인당 가격을 입력하세요"
                      value={formData.pricePerPerson}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricePerPerson: e.target.value,
                        })
                      }
                      className="focus:border-primary border-2 border-gray-200"
                    />
                  </div>

                  {/* 레슨 설명 */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-lg font-semibold"
                    >
                      레슨 설명
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="레슨에 대한 상세한 설명을 입력하세요"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={6}
                      className="focus:border-primary resize-none border-2 border-gray-200"
                    />
                  </div>

                  {/* 등록 방식 */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">등록 방식</Label>
                    <RadioGroup
                      value={formData.registrationType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, registrationType: value })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="first-come" id="first-come" />
                        <Label htmlFor="first-come">선착순</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="approval" id="approval" />
                        <Label htmlFor="approval">승인제</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* 이미지 업로드 */}
                  <div className="space-y-4">
                    <Label className="flex items-center gap-2 text-lg font-semibold">
                      <Camera className="text-primary h-5 w-5" />
                      이미지 업로드 (최대 10장)
                    </Label>
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Camera className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-gray-600">
                          클릭하여 이미지를 선택하세요
                        </p>
                      </label>
                    </div>
                    {selectedImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {selectedImages.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="h-24 w-full rounded-lg object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 제출 버튼 */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="h-12 w-full text-lg font-semibold"
                    >
                      레슨 등록하기
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* 우측: 미리보기 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-2 border-gray-100 shadow-lg">
              <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                  <Eye className="text-primary h-5 w-5" />
                  미리보기
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">레슨명</h3>
                    <p className="text-gray-600">
                      {formData.lessonName || '레슨명을 입력하세요'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">지역</h3>
                    <p className="text-gray-600">
                      {formData.city && formData.district
                        ? `${formData.city} ${formData.district} ${formData.dong || ''}`
                        : '지역을 선택하세요'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">기간</h3>
                    <p className="text-gray-600">
                      {formData.startDate && formData.endDate
                        ? `${formData.startDate} ~ ${formData.endDate}`
                        : '기간을 선택하세요'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">카테고리</h3>
                    <p className="text-gray-600">
                      {formData.category || '카테고리를 선택하세요'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">참가자 수</h3>
                    <p className="text-gray-600">
                      {formData.maxParticipants || '0'}명
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">가격</h3>
                    <p className="text-gray-600">
                      {formData.pricePerPerson || '0'}원
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
