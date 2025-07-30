'use client'

import { useState, useEffect } from 'react'
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
import {
  Calendar,
  Camera,
  Clock,
  DollarSign,
  Edit,
  Eye,
  FileText,
  Lock,
  MapPin,
  Save,
  Trash2,
  Users,
} from 'lucide-react'
import type { components } from '@/types/swagger-generated'
import { useRegionData } from '@/hooks/useRegionData'
import { categories } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

type LessonDetailData = components['schemas']['LessonDetailResponseDto']

interface LessonEditClientProps {
  lesson: LessonDetailData
}

export default function LessonEditClient({ lesson }: LessonEditClientProps) {
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

  const [formData, setFormData] = useState({
    lessonName: lesson.lessonName || '',
    city: lesson.city || '',
    district: lesson.district || '',
    dong: lesson.dong || '',
    ri: lesson.ri || '',
    addressDetail: lesson.addressDetail || '',
    startAt: lesson.startAt
      ? new Date(lesson.startAt).toISOString().slice(0, 16)
      : '',
    endAt: lesson.endAt
      ? new Date(lesson.endAt).toISOString().slice(0, 16)
      : '',
    description: lesson.description || '',
    maxParticipants: lesson.maxParticipants?.toString() || '',
    price: lesson.price?.toString() || '',
    category: lesson.category || '',
    openRun: lesson.openRun || false,
    openTime: lesson.openTime
      ? new Date(lesson.openTime).toISOString().slice(0, 16)
      : '',
    lessonImages: lesson.lessonImages || [],
  })

  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<string[]>(
    lesson.lessonImages || [],
  )
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

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

  // 참가자 유무 확인 (현재 참가자 수가 0보다 큰지 확인)
  const hasParticipants = (lesson.currentParticipants || 0) > 0

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

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index))
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

  const handleMaxParticipantsChange = (value: string) => {
    const newValue = parseInt(value)
    const currentParticipants = lesson.currentParticipants || 0

    // 참가자가 있는 경우 현재 참가자 수보다 적게 설정할 수 없음
    if (hasParticipants && newValue < currentParticipants) {
      alert(
        `현재 참가자가 ${currentParticipants}명 있어서 그보다 적게 설정할 수 없습니다.`,
      )
      return
    }

    setFormData({ ...formData, maxParticipants: value })
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
      setSaving(true)
      setError(null)

      // 이미지 업로드 처리
      let uploadedImageUrls: string[] = []

      // 기존 이미지들 추가
      uploadedImageUrls = [...existingImages]

      // URL 이미지들 추가
      uploadedImageUrls = [...uploadedImageUrls, ...imageUrls]

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

      // openTime을 ISO 형식으로 변환
      const openTimeISO =
        formData.openRun && formData.openTime
          ? new Date(formData.openTime).toISOString()
          : undefined

      const lessonData = {
        ...(hasParticipants
          ? {}
          : {
              ...formData,
              openTime: openTimeISO,
              ri: formData.ri || null,
              lessonImages: uploadedImageUrls,
            }),
        lessonName: formData.lessonName,
        description: formData.description,
      }

      // 레슨 수정 API 호출
      const response = await fetch(`/api/proxy/api/v1/lessons/${lesson.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lessonData),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `레슨 수정 실패: ${response.status}`,
        )
      }

      const result = await response.json()
      alert('레슨이 성공적으로 수정되었습니다!')

      if (typeof window !== 'undefined') {
        window.location.href = `/lesson/${lesson.id}`
      }
    } catch (err) {
      console.error('레슨 수정 실패:', err)
      const errorMessage =
        err instanceof Error ? err.message : '레슨 수정에 실패했습니다.'
      setError(errorMessage)
      alert(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('정말로 이 레슨을 삭제하시겠습니까?')) {
      return
    }

    try {
      setSaving(true)
      setError(null)

      // 레슨 삭제 API 호출
      const response = await fetch(`/api/proxy/api/v1/lessons/${lesson.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `레슨 삭제 실패: ${response.status}`,
        )
      }

      alert('레슨이 성공적으로 삭제되었습니다!')

      // 목록 페이지로 이동
      window.location.href = '/lesson/list'
    } catch (err) {
      console.error('레슨 삭제 실패:', err)
      setError('레슨 삭제에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const DisabledFieldWrapper = ({
    children,
    disabled,
    reason,
  }: {
    children: React.ReactNode
    disabled: boolean
    reason?: string
  }) => (
    <div className={`relative ${disabled ? 'opacity-60' : ''}`}>
      {children}
      {disabled && (
        <div className="bg-opacity-50 absolute inset-0 flex cursor-not-allowed items-center justify-center bg-gray-100">
          <div className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1 text-sm text-white">
            <Lock className="h-4 w-4" />
            {reason || '수정불가'}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* 참가자 현황 정보 */}
      {hasParticipants && (
        <Card className="mb-6 border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-800">
              <Users className="h-5 w-5" />
              <span className="font-semibold">
                현재 참가자 {lesson.currentParticipants || 0}명이 있습니다.
              </span>
              <span className="text-sm text-orange-600">
                일부 항목은 수정이 제한됩니다.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 좌측: 폼 입력 */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                <Edit className="text-primary h-6 w-6" />
                레슨 정보 수정
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 레슨 이름 - 항상 수정 가능 */}
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
                    className="focus:border-primary border-2 border-gray-200 p-3 text-lg"
                    required
                  />
                </div>

                {/* 지역 선택 - 참가자 있으면 비활성화 */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-lg font-semibold">
                    <MapPin className="text-primary h-5 w-5" />
                    지역 *
                    {hasParticipants && (
                      <span className="flex items-center gap-1 text-sm text-orange-600">
                        <Lock className="h-3 w-3" />
                        수정제한
                      </span>
                    )}
                  </Label>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                    <DisabledFieldWrapper disabled={hasParticipants}>
                      <div>
                        <Label htmlFor="city" className="text-sm text-gray-600">
                          시/도
                        </Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) =>
                            !hasParticipants &&
                            setFormData({
                              ...formData,
                              city: value,
                              district: '',
                              dong: '',
                              ri: '',
                            })
                          }
                          disabled={hasParticipants}
                        >
                          <SelectTrigger className="focus:border-primary border-2 border-gray-200">
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
                    </DisabledFieldWrapper>
                    <DisabledFieldWrapper disabled={hasParticipants}>
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
                            !hasParticipants &&
                            setFormData({
                              ...formData,
                              district: value,
                              dong: '',
                              ri: '',
                            })
                          }
                          disabled={!formData.city || hasParticipants}
                        >
                          <SelectTrigger className="focus:border-primary border-2 border-gray-200">
                            <SelectValue placeholder="구/군 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.city &&
                              getSigunguList(formData.city).map(
                                (district: string) => (
                                  <SelectItem key={district} value={district}>
                                    {district}
                                  </SelectItem>
                                ),
                              )}
                          </SelectContent>
                        </Select>
                      </div>
                    </DisabledFieldWrapper>
                    <DisabledFieldWrapper disabled={hasParticipants}>
                      <div>
                        <Label htmlFor="dong" className="text-sm text-gray-600">
                          동/면
                        </Label>
                        <Select
                          value={formData.dong}
                          onValueChange={(value) =>
                            !hasParticipants &&
                            setFormData({ ...formData, dong: value, ri: '' })
                          }
                          disabled={!formData.district || hasParticipants}
                        >
                          <SelectTrigger className="focus:border-primary border-2 border-gray-200">
                            <SelectValue placeholder="동/면 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.district &&
                              getDongList(formData.city, formData.district).map(
                                (dong: string) => (
                                  <SelectItem key={dong} value={dong}>
                                    {dong}
                                  </SelectItem>
                                ),
                              )}
                          </SelectContent>
                        </Select>
                      </div>
                    </DisabledFieldWrapper>
                    <DisabledFieldWrapper disabled={hasParticipants}>
                      <div>
                        <Label htmlFor="ri" className="text-sm text-gray-600">
                          리 (선택)
                        </Label>
                        <Input
                          id="ri"
                          placeholder="리 입력 (선택사항)"
                          value={formData.ri || ''}
                          onChange={(e) =>
                            !hasParticipants &&
                            setFormData({ ...formData, ri: e.target.value })
                          }
                          className="focus:border-primary border-2 border-gray-200 p-3"
                          disabled={hasParticipants}
                        />
                      </div>
                    </DisabledFieldWrapper>
                  </div>
                </div>

                {/* 상세 주소 - 참가자 있으면 비활성화 */}
                <DisabledFieldWrapper disabled={hasParticipants}>
                  <div className="space-y-2">
                    <Label
                      htmlFor="addressDetail"
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      상세 주소 *
                      {hasParticipants && (
                        <span className="flex items-center gap-1 text-sm text-orange-600">
                          <Lock className="h-3 w-3" />
                          수정제한
                        </span>
                      )}
                    </Label>
                    <Input
                      id="addressDetail"
                      placeholder="상세 주소를 입력하세요"
                      value={formData.addressDetail}
                      onChange={(e) =>
                        !hasParticipants &&
                        setFormData({
                          ...formData,
                          addressDetail: e.target.value,
                        })
                      }
                      className="focus:border-primary border-2 border-gray-200 p-3"
                      disabled={hasParticipants}
                      required
                    />
                  </div>
                </DisabledFieldWrapper>

                {/* 날짜 - 참가자 있으면 비활성화 */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-lg font-semibold">
                    <Calendar className="text-primary h-5 w-5" />
                    레슨 기간 *
                    {hasParticipants && (
                      <span className="flex items-center gap-1 text-sm text-orange-600">
                        <Lock className="h-3 w-3" />
                        수정제한
                      </span>
                    )}
                  </Label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <DisabledFieldWrapper disabled={hasParticipants}>
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
                            !hasParticipants &&
                            setFormData({
                              ...formData,
                              startAt: e.target.value,
                            })
                          }
                          className="focus:border-primary border-2 border-gray-200 p-3"
                          disabled={hasParticipants}
                          required
                        />
                      </div>
                    </DisabledFieldWrapper>
                    <DisabledFieldWrapper disabled={hasParticipants}>
                      <div>
                        <Label
                          htmlFor="endAt"
                          className="text-sm text-gray-600"
                        >
                          종료 날짜
                        </Label>
                        <Input
                          id="endAt"
                          type="datetime-local"
                          value={formData.endAt}
                          onChange={(e) =>
                            !hasParticipants &&
                            setFormData({
                              ...formData,
                              endAt: e.target.value,
                            })
                          }
                          className="focus:border-primary border-2 border-gray-200 p-3"
                          disabled={hasParticipants}
                          required
                        />
                      </div>
                    </DisabledFieldWrapper>
                  </div>
                </div>

                {/* 카테고리 - 참가자 있으면 비활성화 */}
                <DisabledFieldWrapper disabled={hasParticipants}>
                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      카테고리 *
                      {hasParticipants && (
                        <span className="flex items-center gap-1 text-sm text-orange-600">
                          <Lock className="h-3 w-3" />
                          수정제한
                        </span>
                      )}
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        !hasParticipants &&
                        setFormData({ ...formData, category: value })
                      }
                      disabled={hasParticipants}
                    >
                      <SelectTrigger className="focus:border-primary border-2 border-gray-200 p-3">
                        <SelectValue placeholder="카테고리를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(
                          (category: { label: string; value: string }) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </DisabledFieldWrapper>

                {/* 모집 정보 */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* 모집 인원 - 참가자 있으면 증가만 가능 */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="maxParticipants"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Users className="text-primary h-5 w-5" />
                      모집 인원 *
                      {hasParticipants && (
                        <span className="flex items-center gap-1 text-sm text-orange-600">
                          <span>증가만 가능</span>
                        </span>
                      )}
                    </Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      placeholder="모집 인원"
                      value={formData.maxParticipants}
                      onChange={(e) =>
                        handleMaxParticipantsChange(e.target.value)
                      }
                      className="focus:border-primary border-2 border-gray-200 p-3"
                      min={
                        hasParticipants ? lesson.currentParticipants || 0 : 1
                      }
                      required
                    />
                    {hasParticipants && (
                      <p className="text-sm text-orange-600">
                        현재 참가자 {lesson.currentParticipants || 0}명보다 적게
                        설정할 수 없습니다.
                      </p>
                    )}
                  </div>

                  {/* 인당 가격 - 참가자 있으면 비활성화 */}
                  <DisabledFieldWrapper
                    disabled={hasParticipants}
                    reason="수정불가"
                  >
                    <div className="space-y-2">
                      <Label
                        htmlFor="price"
                        className="flex items-center gap-2 text-lg font-semibold"
                      >
                        <DollarSign className="text-primary h-5 w-5" />
                        인당 가격 *
                        {hasParticipants && (
                          <span className="flex items-center gap-1 text-sm text-orange-600">
                            <Lock className="h-3 w-3" />
                            수정제한
                          </span>
                        )}
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="인당 가격 (원)"
                        value={formData.price}
                        onChange={(e) =>
                          !hasParticipants &&
                          setFormData({
                            ...formData,
                            price: e.target.value,
                          })
                        }
                        className="focus:border-primary border-2 border-gray-200 p-3"
                        disabled={hasParticipants}
                        min="0"
                        required
                      />
                    </div>
                  </DisabledFieldWrapper>
                </div>

                {/* 참여 방식 - 참가자 있으면 비활성화 */}
                <DisabledFieldWrapper disabled={hasParticipants}>
                  <div className="space-y-4">
                    <Label className="flex items-center gap-2 text-lg font-semibold">
                      <Clock className="text-primary h-5 w-5" />
                      참여 방식
                      {hasParticipants && (
                        <span className="flex items-center gap-1 text-sm text-orange-600">
                          <Lock className="h-3 w-3" />
                          수정제한
                        </span>
                      )}
                    </Label>
                    <RadioGroup
                      value={formData.openRun ? 'true' : 'false'}
                      onValueChange={(value) =>
                        !hasParticipants &&
                        setFormData({ ...formData, openRun: value === 'true' })
                      }
                      className="flex flex-col space-y-3"
                      disabled={hasParticipants}
                    >
                      <div
                        className={`hover:border-primary flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-3 hover:bg-gray-50 ${hasParticipants ? 'opacity-60' : ''}`}
                      >
                        <RadioGroupItem
                          value="true"
                          id="openRun"
                          disabled={hasParticipants}
                        />
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
                      <div
                        className={`hover:border-primary flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-3 hover:bg-gray-50 ${hasParticipants ? 'opacity-60' : ''}`}
                      >
                        <RadioGroupItem
                          value="false"
                          id="approval"
                          disabled={hasParticipants}
                        />
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
                          참여 시작 시간 *
                        </Label>
                        <Input
                          id="openTime"
                          type="datetime-local"
                          value={formData.openTime}
                          onChange={(e) =>
                            !hasParticipants &&
                            setFormData({
                              ...formData,
                              openTime: e.target.value,
                            })
                          }
                          className="focus:border-primary border-2 border-gray-200 p-3"
                          required
                          disabled={hasParticipants}
                        />
                        <p className="text-sm text-gray-500">
                          이 시간부터 참여 신청이 가능합니다.
                        </p>
                      </div>
                    )}
                  </div>
                </DisabledFieldWrapper>

                {/* 소개글 - 항상 수정 가능 */}
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
                    className="focus:border-primary min-h-32 border-2 border-gray-200 p-3"
                    required
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* 우측: 사진 업로드 및 미리보기 */}
        <div className="space-y-6">
          {/* 사진 업로드 - 항상 수정 가능 */}
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <Camera className="text-primary h-5 w-5" />
                사진 업로드 ({selectedImages.length + imageUrls.length}/5)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* 파일 업로드 */}
              <div className="hover:border-primary rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors">
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
              <div className="mt-4 space-y-2">
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
                          className="h-24 w-full rounded-lg border-2 border-gray-200 object-cover"
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

          {/* 기존 이미지 */}
          {existingImages.length > 0 && (
            <Card className="border-2 border-gray-100 shadow-lg">
              <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                  <Eye className="text-primary h-5 w-5" />
                  기존 이미지
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Existing ${index + 1}`}
                        className="h-24 w-full rounded-lg border-2 border-gray-200 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 미리보기 */}
          <Card className="border-2 border-gray-100 shadow-lg">
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

          {/* 액션 버튼들 */}
          <div className="space-y-4">
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={saving}
              className="from-primary hover:to-primary w-full bg-gradient-to-r to-purple-600 py-4 text-lg font-semibold transition-all duration-300 hover:from-purple-600 disabled:opacity-50"
            >
              <Save className="mr-2 h-5 w-5" />
              {saving ? '저장 중...' : '레슨 수정하기'}
            </Button>
            <Button
              onClick={handleDelete}
              size="lg"
              variant="destructive"
              disabled={saving}
              className="w-full py-4 text-lg font-semibold"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              레슨 삭제하기
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
