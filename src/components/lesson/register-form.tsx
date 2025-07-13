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
import {
  Calendar,
  MapPin,
  DollarSign,
  Upload,
  X,
  FileText,
  Users,
  Clock,
  Tag,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface LessonFormData {
  title: string
  category: string
  description: string
  price: string
  location: string
  maxStudents: string
  schedule: string
  duration: string
  requirements: string
  materials: string
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<LessonFormData>({
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
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImages((prev) => [...prev, file])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 클라이언트에서 폼 제출 로직 처리
    console.log('레슨 등록 데이터:', {
      formData,
      selectedDays,
      uploadedImages,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 기본 정보 */}
      <Card className="rounded-2xl border-2 border-gray-100 shadow-xs">
        <CardHeader className="rounded-t-2xl border-b-2 border-gray-100 bg-gray-50">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <FileText className="h-6 w-6 text-blue-600" />
            기본 정보
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            레슨의 기본적인 정보를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label
                htmlFor="title"
                className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
              >
                <FileText className="h-5 w-5 text-blue-600" />
                레슨 제목 *
              </Label>
              <Input
                id="title"
                placeholder="레슨 제목을 입력하세요"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="h-14 rounded-lg border-2 border-gray-200 text-lg shadow-xs transition-colors focus:border-blue-600"
                required
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="category"
                className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
              >
                <Tag className="h-5 w-5 text-blue-600" />
                카테고리 *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger className="h-14 cursor-pointer rounded-lg border-2 border-gray-200 shadow-xs transition-colors focus:border-blue-600">
                  <SelectValue placeholder="카테고리를 선택하세요" />
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
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="description"
              className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
            >
              <FileText className="h-5 w-5 text-blue-600" />
              레슨 설명 *
            </Label>
            <Textarea
              id="description"
              placeholder="레슨에 대한 자세한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="rounded-lg border-2 border-gray-200 text-lg shadow-xs transition-colors focus:border-blue-600"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* 가격 및 위치 */}
      <Card className="rounded-2xl border-2 border-gray-100 shadow-xs">
        <CardHeader className="rounded-t-2xl border-b-2 border-gray-100 bg-gray-50">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <DollarSign className="h-6 w-6 text-green-600" />
            가격 및 위치
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            레슨 가격과 위치 정보를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label
                htmlFor="price"
                className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
              >
                <DollarSign className="h-5 w-5 text-green-600" />
                레슨 가격 *
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="가격을 입력하세요"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="h-14 rounded-lg border-2 border-gray-200 text-lg shadow-xs transition-colors focus:border-green-600"
                required
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="location"
                className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
              >
                <MapPin className="h-5 w-5 text-green-600" />
                위치 *
              </Label>
              <Input
                id="location"
                placeholder="레슨 장소를 입력하세요"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="h-14 rounded-lg border-2 border-gray-200 text-lg shadow-xs transition-colors focus:border-green-600"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 일정 및 인원 */}
      <Card className="rounded-2xl border-2 border-gray-100 shadow-xs">
        <CardHeader className="rounded-t-2xl border-b-2 border-gray-100 bg-gray-50">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <Calendar className="h-6 w-6 text-purple-600" />
            일정 및 인원
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            레슨 일정과 수강 인원을 설정해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <Label
                htmlFor="maxStudents"
                className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
              >
                <Users className="h-5 w-5 text-purple-600" />
                최대 인원 *
              </Label>
              <Input
                id="maxStudents"
                type="number"
                placeholder="최대 수강 인원"
                value={formData.maxStudents}
                onChange={(e) =>
                  handleInputChange('maxStudents', e.target.value)
                }
                className="h-14 rounded-lg border-2 border-gray-200 text-lg shadow-xs transition-colors focus:border-purple-600"
                required
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="duration"
                className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
              >
                <Clock className="h-5 w-5 text-purple-600" />
                레슨 시간 *
              </Label>
              <Input
                id="duration"
                placeholder="예: 60분"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="h-14 rounded-lg border-2 border-gray-200 text-lg shadow-xs transition-colors focus:border-purple-600"
                required
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="schedule"
                className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
              >
                <Calendar className="h-5 w-5 text-purple-600" />
                레슨 시간대 *
              </Label>
              <Input
                id="schedule"
                placeholder="예: 19:00"
                value={formData.schedule}
                onChange={(e) => handleInputChange('schedule', e.target.value)}
                className="h-14 rounded-lg border-2 border-gray-200 text-lg shadow-xs transition-colors focus:border-purple-600"
                required
              />
            </div>
          </div>

          {/* 요일 선택 */}
          <div className="space-y-3">
            <Label className="flex cursor-pointer items-center gap-2 text-lg font-semibold">
              <Calendar className="h-5 w-5 text-purple-600" />
              레슨 요일
            </Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
              {daysOfWeek.map((day) => (
                <div key={day.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={day.value}
                    checked={selectedDays.includes(day.value)}
                    onCheckedChange={() => handleDayToggle(day.value)}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={day.value}
                    className="cursor-pointer text-sm font-medium"
                  >
                    {day.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 추가 정보 */}
      <Card className="rounded-2xl border-2 border-gray-100 shadow-xs">
        <CardHeader className="rounded-t-2xl border-b-2 border-gray-100 bg-gray-50">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <FileText className="h-6 w-6 text-orange-600" />
            추가 정보
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            레슨에 필요한 추가 정보를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label
                htmlFor="requirements"
                className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
              >
                <FileText className="h-5 w-5 text-orange-600" />
                준비물
              </Label>
              <Textarea
                id="requirements"
                placeholder="수강생이 준비해야 할 물건들을 입력하세요"
                value={formData.requirements}
                onChange={(e) =>
                  handleInputChange('requirements', e.target.value)
                }
                rows={3}
                className="rounded-lg border-2 border-gray-200 text-lg shadow-xs transition-colors focus:border-orange-600"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="materials"
                className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
              >
                <FileText className="h-5 w-5 text-orange-600" />
                제공 물품
              </Label>
              <Textarea
                id="materials"
                placeholder="강사가 제공하는 물건들을 입력하세요"
                value={formData.materials}
                onChange={(e) => handleInputChange('materials', e.target.value)}
                rows={3}
                className="rounded-lg border-2 border-gray-200 text-lg shadow-xs transition-colors focus:border-orange-600"
              />
            </div>
          </div>

          {/* 이미지 업로드 */}
          <div className="space-y-3">
            <Label className="flex cursor-pointer items-center gap-2 text-lg font-semibold">
              <Upload className="h-5 w-5 text-orange-600" />
              레슨 이미지
            </Label>
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-orange-400">
                <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <span className="text-lg font-medium text-orange-600 hover:text-orange-700">
                  이미지 선택
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="mt-3 text-sm text-gray-500">
                  PNG, JPG, JPEG 파일만 업로드 가능합니다
                </p>
              </div>

              {/* 업로드된 이미지 미리보기 */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${index + 1}`}
                        className="h-24 w-full rounded-lg object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 cursor-pointer rounded-full p-0 shadow-xs"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 제출 버튼 */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="cursor-pointer rounded-lg bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] px-8 py-3 text-lg font-semibold text-white shadow-xs transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-sm"
        >
          레슨 등록하기
        </Button>
      </div>
    </form>
  )
}
