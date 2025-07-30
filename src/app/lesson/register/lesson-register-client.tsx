'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/hooks/useAuth'
import { LessonCreateRequest } from '@/lib/api'
import { createLesson } from '@/lib/api/profile'
import { useRegionData } from '@/hooks/useRegionData'
import { categories, Category } from '@/lib/utils'
import type { CreateLessonRequest } from '@/types'
import {
  Calendar,
  Camera,
  Clock,
  DollarSign,
  Eye,
  FileText,
  MapPin,
  Users,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'

export default function LessonRegisterClient() {
  const router = useRouter()
  const { user } = useAuth()
  const {
    regionData,
    loading: regionLoading,
    getSidoList,
    getSigunguList,
    getDongList,
    getRiList,
  } = useRegionData()

  const [formData, setFormData] = useState<LessonCreateRequest>({
    lessonName: '',
    city: '',
    district: '',
    dong: '',
    ri: '',
    addressDetail: '',
    startAt: '',
    endAt: '',
    description: '',
    price: 10000,
    maxParticipants: 10,
    category: 'GYM',
    openRun: false,
    openTime: undefined,
  })

  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 날짜 초기값 설정 (hydration 문제 해결)
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const nextMonth = new Date(today)
    nextMonth.setMonth(today.getMonth() + 1)

    setFormData((prev) => ({
      ...prev,
      startAt: tomorrow.toISOString().slice(0, 16),
      endAt: nextMonth.toISOString().slice(0, 16),
    }))
  }, [])

  // 지역 데이터 로딩 완료 후 기본값 설정
  useEffect(() => {
    if (!regionLoading && getSidoList().length > 0) {
      const defaultCity = getSidoList()[0]
      setFormData((prev) => ({
        ...prev,
        city: defaultCity,
      }))
    }
  }, [regionLoading, getSidoList])

  if (regionLoading) {
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

  if (!user) {
    return <div className="text-center">로그인 후 이용해주세요.</div>
  }

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

  const addImageUrl = () => {
    if (newImageUrl.trim() && selectedImages.length + imageUrls.length < 5) {
      setImageUrls([...imageUrls, newImageUrl.trim()])
      setNewImageUrl('')
    } else if (selectedImages.length + imageUrls.length >= 5) {
      alert('최대 5개의 이미지 URL까지 추가 가능합니다.')
    }
  }

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.lessonName) {
      alert('레슨 이름을 입력해주세요.')
      return
    }

    if (!formData.city) {
      alert('시/도를 선택해주세요.')
      return
    }

    if (!formData.district) {
      alert('구/군을 선택해주세요.')
      return
    }

    if (!formData.dong) {
      alert('동/면을 선택해주세요.')
      return
    }

    if (!formData.addressDetail) {
      alert('상세 주소를 입력해주세요.')
      return
    }

    if (!formData.startAt || !formData.endAt) {
      alert('레슨 기간을 선택해주세요.')
      return
    }

    if (!formData.description) {
      alert('레슨 소개를 입력해주세요.')
      return
    }

    if (!formData.maxParticipants) {
      alert('모집 인원을 입력해주세요.')
      return
    }

    if (!formData.category) {
      alert('카테고리를 선택해주세요.')
      return
    }

    if (!formData.openRun) {
      alert('레슨 참여 방식을 선택해주세요.')
      return
    }

    if (formData.openRun && !formData.openTime) {
      alert('선착순 오픈 시간을 선택해주세요.')
      return
    }

    if (
      !formData.lessonName ||
      !formData.city ||
      !formData.district ||
      !formData.dong ||
      !formData.addressDetail ||
      !formData.startAt ||
      !formData.endAt ||
      !formData.description ||
      !formData.maxParticipants ||
      !formData.category
    ) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // 1. 이미지 업로드 처리
      let uploadedImageUrls: string[] = []

      // URL 이미지들 추가
      uploadedImageUrls = [...imageUrls]

      if (selectedImages.length > 0) {
        try {
          // S3에 이미지들을 순차적으로 업로드
          for (const image of selectedImages) {
            const formData = new FormData()
            formData.append('file', image)

            const response = await fetch('/api/proxy/api/v1/test/s3/upload', {
              method: 'POST',
              body: formData,
              credentials: 'include',
            })

            if (!response.ok) {
              throw new Error(`이미지 업로드 실패: ${response.status}`)
            }

            const imageUrl = await response.text()
            uploadedImageUrls.push(imageUrl)
          }
        } catch (imageError) {
          console.error('이미지 업로드 중 오류:', imageError)
          throw new Error('이미지 업로드에 실패했습니다.')
        }
      }

      const lessonData: CreateLessonRequest = {
        lessonName: formData.lessonName,
        description: formData.description,
        category: formData.category as Category,
        price: +(formData.price ?? 0),
        maxParticipants: +formData.maxParticipants,
        startAt: formData.startAt,
        endAt: formData.endAt,
        openTime: formData.openTime,
        openRun: formData.openRun,
        city: formData.city,
        district: formData.district,
        dong: formData.dong,
        ri: formData.ri || null,
        addressDetail: formData.addressDetail,
        lessonImages: uploadedImageUrls,
      }

      // 3. 실제 API 호출
      const response = await createLesson(lessonData)

      alert('레슨이 성공적으로 등록되었습니다!')

      // 4. 폼 초기화
      setFormData({
        lessonName: '',
        city: '',
        district: '',
        dong: '',
        ri: '',
        addressDetail: '',
        startAt: '',
        endAt: '',
        description: '',
        maxParticipants: 0,
        price: 0,
        category: 'GYM',
        openRun: false,
        openTime: undefined,
      })
      setSelectedImages([])
      setImageUrls([])
      setNewImageUrl('')

      router.push(`/lesson/${response.data.id}`)
    } catch (err) {
      console.error('레슨 등록 실패:', err)
      const errorMessage =
        err instanceof Error ? err.message : '레슨 등록에 실패했습니다.'
      setError(errorMessage)
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 좌측: 폼 입력 */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-100 shadow-lg">
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
                    레슨 이름 *
                  </Label>
                  <Input
                    id="lessonName"
                    placeholder="레슨 이름을 입력하세요"
                    value={formData.lessonName}
                    onChange={(e) =>
                      setFormData({ ...formData, lessonName: e.target.value })
                    }
                    className="focus:border-primary border border-gray-200 p-3 text-lg"
                    required
                  />
                </div>

                {/* 지역 선택 */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-lg font-semibold">
                    <MapPin className="text-primary h-5 w-5" />
                    지역 *
                  </Label>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
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
                            ri: '',
                          })
                        }
                      >
                        <SelectTrigger className="focus:border-primary border border-gray-200">
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
                            ri: '',
                          })
                        }
                        disabled={!formData.city}
                      >
                        <SelectTrigger className="focus:border-primary border border-gray-200">
                          <SelectValue placeholder="구/군 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.city &&
                            getSigunguList(formData.city).map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dong" className="text-sm text-gray-600">
                        동/면
                      </Label>
                      <Select
                        value={formData.dong}
                        onValueChange={(value) =>
                          setFormData({ ...formData, dong: value, ri: '' })
                        }
                        disabled={!formData.district}
                      >
                        <SelectTrigger className="focus:border-primary border border-gray-200">
                          <SelectValue placeholder="동/면 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.district &&
                            getDongList(formData.city, formData.district).map(
                              (dong) => (
                                <SelectItem key={dong} value={dong}>
                                  {dong}
                                </SelectItem>
                              ),
                            )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ri" className="text-sm text-gray-600">
                        리 (선택)
                      </Label>
                      <Select
                        value={formData.ri}
                        onValueChange={(value) =>
                          setFormData({ ...formData, ri: value })
                        }
                        disabled={!formData.district}
                      >
                        <SelectTrigger className="focus:border-primary border border-gray-200">
                          <SelectValue placeholder="리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.district &&
                            formData.dong &&
                            getRiList(formData.city, formData.district).map(
                              (ri) => (
                                <SelectItem key={ri} value={ri}>
                                  {ri}
                                </SelectItem>
                              ),
                            )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* 상세 주소 */}
                <div className="space-y-2">
                  <Label
                    htmlFor="addressDetail"
                    className="text-sm text-gray-600"
                  >
                    상세 주소
                  </Label>
                  <Input
                    id="addressDetail"
                    placeholder="상세 주소를 입력하세요"
                    value={formData.addressDetail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        addressDetail: e.target.value,
                      })
                    }
                    className="focus:border-primary border border-gray-200 p-3"
                    required
                  />
                </div>

                {/* 날짜 */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-lg font-semibold">
                    <Calendar className="text-primary h-5 w-5" />
                    레슨 기간 *
                  </Label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="startAt"
                        className="text-sm text-gray-600"
                      >
                        시작 날짜
                      </Label>
                      <Input
                        id="startAt"
                        type="datetime-local"
                        value={formData.startAt}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startAt: e.target.value,
                          })
                        }
                        className="focus:border-primary border border-gray-200 p-3"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endAt" className="text-sm text-gray-600">
                        종료 날짜
                      </Label>
                      <Input
                        id="endAt"
                        type="datetime-local"
                        value={formData.endAt}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            endAt: e.target.value,
                          })
                        }
                        className="focus:border-primary border border-gray-200 p-3"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 카테고리 */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-lg font-semibold">
                    카테고리 *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        category: value as any,
                      })
                    }
                  >
                    <SelectTrigger className="focus:border-primary border border-gray-200 p-3">
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

                {/* 모집 정보 */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="maxParticipants"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Users className="text-primary h-5 w-5" />
                      모집 인원 *
                    </Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      placeholder="모집 인원"
                      value={formData.maxParticipants}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxParticipants: +e.target.value,
                        })
                      }
                      className="focus:border-primary border border-gray-200 p-3"
                      min="1"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <DollarSign className="text-primary h-5 w-5" />
                      인당 가격 *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="인당 가격 (원)"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: +e.target.value,
                        })
                      }
                      className="focus:border-primary border border-gray-200 p-3"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* 참여 방식 */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-lg font-semibold">
                    <Clock className="text-primary h-5 w-5" />
                    참여 방식
                  </Label>
                  <RadioGroup
                    value={formData.openRun ? 'true' : 'false'}
                    onValueChange={(value) =>
                      setFormData({ ...formData, openRun: value === 'true' })
                    }
                    className="flex flex-col space-y-3"
                  >
                    <div className="hover:border-primary flex items-center space-x-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                      <RadioGroupItem value="true" id="openRun" />
                      <Label
                        htmlFor="openRun"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">선착순 참여</div>
                        <div className="text-sm text-gray-600">
                          신청 즉시 참여 확정
                        </div>
                      </Label>
                    </div>
                    <div className="hover:border-primary flex items-center space-x-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                      <RadioGroupItem value="false" id="approval" />
                      <Label
                        htmlFor="approval"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">승인 후 참여</div>
                        <div className="text-sm text-gray-600">
                          작성자 승인 후 참여 확정
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* OpenTime 입력 필드 (선착순 참여일 때만 표시) */}
                  {formData.openRun && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="openTime"
                        className="flex items-center gap-2 text-lg font-semibold"
                      >
                        <Clock className="text-primary h-5 w-5" />
                        선착순 오픈 시간 *
                      </Label>
                      <Input
                        id="openTime"
                        type="datetime-local"
                        value={formData.openTime || new Date().toISOString()}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            openTime: new Date(e.target.value).toISOString(),
                          })
                        }
                        className="focus:border-primary border border-gray-200 p-3"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        이 시간부터 참여 신청이 가능합니다.
                      </p>
                    </div>
                  )}
                </div>

                {/* 소개글 */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-lg font-semibold"
                  >
                    레슨 소개 *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="레슨에 대한 자세한 소개를 작성해주세요"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="focus:border-primary min-h-32 border border-gray-200 p-3"
                    required
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* 우측: 사진 업로드 및 미리보기 */}
        <div className="space-y-6">
          {/* 사진 업로드 */}
          <Card className="border border-gray-100 shadow-lg">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <Camera className="text-primary h-5 w-5" />
                사진 업로드 ({selectedImages.length + imageUrls.length}/5)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* 파일 업로드 */}
              <div className="hover:border-primary rounded-lg border border-dashed border-gray-300 p-6 text-center transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Camera className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                  <p className="text-gray-600">클릭하여 사진을 업로드하세요</p>
                  <p className="text-sm text-gray-500">
                    최대 5장까지 업로드 가능
                  </p>
                </Label>
              </div>

              {/* URL 입력 */}
              <div className="mt-4 items-center space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  또는 이미지 URL 입력
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addImageUrl}
                    disabled={
                      !newImageUrl.trim() ||
                      selectedImages.length + imageUrls.length >= 5
                    }
                    size="sm"
                    className="mt-1.5"
                  >
                    추가
                  </Button>
                </div>
              </div>

              {/* 업로드된 파일 미리보기 */}
              {selectedImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-gray-700">
                    업로드된 파일
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full rounded-lg border border-gray-200 object-cover"
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
                </div>
              )}

              {/* URL 이미지 미리보기 */}
              {imageUrls.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-gray-700">
                    URL 이미지
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`URL Image ${index + 1}`}
                          className="h-24 w-full rounded-lg border border-gray-200 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-image.jpg'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImageUrl(index)}
                          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 미리보기 */}
          <Card className="border border-gray-100 shadow-lg">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <Eye className="text-primary h-5 w-5" />
                미리보기
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="mb-2 text-lg font-bold text-gray-800">
                    {formData.lessonName || '레슨 이름을 입력하세요'}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {formData.city && formData.district
                          ? `${formData.city} ${formData.district} ${formData.dong || ''}`
                          : '지역을 선택하세요'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formData.startAt && formData.endAt
                          ? `${formData.startAt.split('T')[0]} ${formData.startAt.split('T')[1]} ~ ${formData.endAt.split('T')[0]} ${formData.endAt.split('T')[1]}`
                          : '날짜를 선택하세요'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>
                        {formData.maxParticipants
                          ? `${formData.maxParticipants}명`
                          : '인원을 입력하세요'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>
                        {formData.price
                          ? `${Number(formData.price).toLocaleString()}원`
                          : '가격을 입력하세요'}
                      </span>
                    </div>
                  </div>
                </div>
                {formData.description && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-semibold text-gray-800">
                      레슨 소개
                    </h4>
                    <p className="text-sm whitespace-pre-line text-gray-600">
                      {formData.description}
                    </p>
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
              disabled={loading}
              className="from-primary hover:to-primary w-full bg-gradient-to-r to-purple-600 py-4 text-lg font-semibold transition-all duration-300 hover:from-purple-600 disabled:opacity-50"
            >
              {loading ? '등록 중...' : '레슨 등록하기'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
