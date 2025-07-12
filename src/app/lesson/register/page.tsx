'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Calendar, MapPin, DollarSign, Upload, Plus, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

export default function LessonRegisterPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: '',
    maxStudents: '',
    schedule: '',
    duration: '',
    requirements: '',
    materials: '',
  })

  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<File[]>([])

  const categories = [
    { value: 'yoga', label: '요가' },
    { value: 'pilates', label: '필라테스' },
    { value: 'swimming', label: '수영' },
    { value: 'home-training', label: '홈트레이닝' },
    { value: 'boxing', label: '복싱' },
    { value: 'dance', label: '댄스' },
    { value: 'golf', label: '골프' },
    { value: 'tennis', label: '테니스' },
  ]

  const daysOfWeek = [
    { value: 'monday', label: '월요일' },
    { value: 'tuesday', label: '화요일' },
    { value: 'wednesday', label: '수요일' },
    { value: 'thursday', label: '목요일' },
    { value: 'friday', label: '금요일' },
    { value: 'saturday', label: '토요일' },
    { value: 'sunday', label: '일요일' },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    )
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedImages((prev) => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('레슨 등록 데이터:', {
      ...formData,
      selectedDays,
      uploadedImages,
    })
    // 여기에 실제 등록 로직 추가
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-4xl font-bold text-transparent">
            레슨 등록
          </h1>
          <p className="mt-3 text-gray-600">
            새로운 레슨을 등록하고 수강생들을 모집해보세요
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 기본 정보 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="mr-2 h-5 w-5 text-[#8BB5FF]" />
                기본 정보
              </CardTitle>
              <CardDescription>
                레슨의 기본적인 정보를 입력해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">레슨 제목 *</Label>
                  <Input
                    id="title"
                    placeholder="레슨 제목을 입력하세요"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">카테고리 *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange('category', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">레슨 설명 *</Label>
                <Textarea
                  id="description"
                  placeholder="레슨에 대한 자세한 설명을 입력하세요"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* 가격 및 인원 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-[#8BB5FF]" />
                가격 및 인원
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">레슨 가격 (원) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="가격을 입력하세요"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStudents">최대 수강인원 *</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    placeholder="최대 인원을 입력하세요"
                    value={formData.maxStudents}
                    onChange={(e) =>
                      handleInputChange('maxStudents', e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 일정 및 장소 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-[#8BB5FF]" />
                일정 및 장소
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">장소 *</Label>
                  <Input
                    id="location"
                    placeholder="레슨 장소를 입력하세요"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange('location', e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">레슨 시간 (분) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="레슨 시간을 입력하세요"
                    value={formData.duration}
                    onChange={(e) =>
                      handleInputChange('duration', e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>수업 요일 선택 *</Label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={day.value}
                        checked={selectedDays.includes(day.value)}
                        onCheckedChange={() => handleDayToggle(day.value)}
                      />
                      <Label htmlFor={day.value} className="text-sm">
                        {day.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">구체적인 시간 *</Label>
                <Input
                  id="schedule"
                  placeholder="예: 오후 2:00-3:30"
                  value={formData.schedule}
                  onChange={(e) =>
                    handleInputChange('schedule', e.target.value)
                  }
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* 추가 정보 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-[#8BB5FF]" />
                추가 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="requirements">수강 요건</Label>
                <Textarea
                  id="requirements"
                  placeholder="수강생이 준비해야 할 것들을 입력하세요"
                  value={formData.requirements}
                  onChange={(e) =>
                    handleInputChange('requirements', e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="materials">준비물</Label>
                <Textarea
                  id="materials"
                  placeholder="수강생이 준비해야 할 준비물을 입력하세요"
                  value={formData.materials}
                  onChange={(e) =>
                    handleInputChange('materials', e.target.value)
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* 이미지 업로드 */}
          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-5 w-5 text-[#8BB5FF]" />
                이미지 업로드
              </CardTitle>
              <CardDescription>
                레슨을 소개하는 이미지를 업로드하세요 (최대 5장)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <span className="font-medium text-[#8BB5FF] hover:text-[#7AA8FF]">
                    이미지 선택
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </Label>
                <p className="mt-2 text-sm text-gray-500">
                  PNG, JPG, JPEG 파일만 업로드 가능합니다
                </p>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index + 1}`}
                        className="h-24 w-full rounded-lg object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 등록 버튼 */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" className="px-8">
              임시저장
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] px-8 text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5]"
            >
              레슨 등록
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
