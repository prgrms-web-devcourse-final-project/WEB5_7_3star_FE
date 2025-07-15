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
  MapPin,
  Save,
  Trash2,
  Users,
} from 'lucide-react'
import type { ApiLessonDetail } from '@/types'

interface LessonEditClientProps {
  lesson: ApiLessonDetail
}

export default function LessonEditClient({ lesson }: LessonEditClientProps) {
  const [formData, setFormData] = useState({
    lessonName: '',
    city: '',
    district: '',
    dong: '',
    addressDetail: '',
    startAt: '',
    endAt: '',
    description: '',
    maxParticipants: '',
    price: '',
    category: '',
    openRun: true,
  })

  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    'YOGA',
    'PILATES',
    'FITNESS',
    'SWIMMING',
    'TENNIS',
    'BADMINTON',
    'GOLF',
    'SOCCER',
    'BASKETBALL',
    'VOLLEYBALL',
    'TABLE_TENNIS',
    'CLIMBING',
  ]

  // 레슨 데이터가 로드되면 폼에 설정
  useEffect(() => {
    setFormData({
      lessonName: lesson.lessonName,
      city: lesson.city,
      district: lesson.district,
      dong: lesson.dong,
      addressDetail: lesson.addressDetail,
      startAt: lesson.startAt.split('T')[0],
      endAt: lesson.endAt.split('T')[0],
      description: lesson.description,
      maxParticipants: lesson.maxParticipants.toString(),
      price: lesson.price.toString(),
      category: lesson.category,
      openRun: lesson.openRun,
    })
    setExistingImages(lesson.lessonImages || [])
  }, [lesson])

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

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
      !formData.price ||
      !formData.category
    ) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    try {
      setSaving(true)
      setError(null)

      const lessonData: Partial<ApiLessonDetail> = {
        lessonName: formData.lessonName,
        description: formData.description,
        category: formData.category,
        price: parseInt(formData.price),
        maxParticipants: parseInt(formData.maxParticipants),
        startAt: formData.startAt,
        endAt: formData.endAt,
        openRun: formData.openRun,
        city: formData.city,
        district: formData.district,
        dong: formData.dong,
        addressDetail: formData.addressDetail,
      }

      // 실제 API 호출 (주석 처리)
      // const response = await updateLesson(lesson.id.toString(), lessonData)
      // console.log('레슨 수정 성공:', response)

      // 더미 데이터로 성공 시뮬레이션
      console.log('레슨 수정 데이터:', lessonData)
      alert('레슨이 성공적으로 수정되었습니다!')
    } catch (err) {
      console.error('레슨 수정 실패:', err)
      setError('레슨 수정에 실패했습니다.')
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

      // 실제 API 호출 (주석 처리)
      // await deleteLesson(lesson.id.toString())

      // 더미 데이터로 성공 시뮬레이션
      console.log('레슨 삭제:', lesson.id)
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
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                <Edit className="text-primary h-6 w-6" />
                레슨 정보 수정
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
                    className="focus:border-primary border-2 border-gray-200 p-3 text-lg"
                    required
                  />
                </div>

                {/* 지역 선택 */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-lg font-semibold">
                    <MapPin className="text-primary h-5 w-5" />
                    지역 *
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
                          <SelectValue placeholder="시/도 선택" />
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
                          <SelectValue placeholder="구/군 선택" />
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
                        동/면
                      </Label>
                      <Select
                        value={formData.dong}
                        onValueChange={(value) =>
                          setFormData({ ...formData, dong: value })
                        }
                        disabled={!formData.district}
                      >
                        <SelectTrigger className="focus:border-primary border-2 border-gray-200">
                          <SelectValue placeholder="동/면 선택" />
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
                </div>

                {/* 상세 주소 */}
                <div className="space-y-2">
                  <Label
                    htmlFor="addressDetail"
                    className="text-sm text-gray-600"
                  >
                    상세 주소 *
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
                    className="focus:border-primary border-2 border-gray-200 p-3"
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
                        type="date"
                        value={formData.startAt}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startAt: e.target.value,
                          })
                        }
                        className="focus:border-primary border-2 border-gray-200 p-3"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endAt" className="text-sm text-gray-600">
                        종료 날짜
                      </Label>
                      <Input
                        id="endAt"
                        type="date"
                        value={formData.endAt}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            endAt: e.target.value,
                          })
                        }
                        className="focus:border-primary border-2 border-gray-200 p-3"
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
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="focus:border-primary border-2 border-gray-200 p-3">
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
                          maxParticipants: e.target.value,
                        })
                      }
                      className="focus:border-primary border-2 border-gray-200 p-3"
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
                          price: e.target.value,
                        })
                      }
                      className="focus:border-primary border-2 border-gray-200 p-3"
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
                    <div className="hover:border-primary flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-3 hover:bg-gray-50">
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
                    <div className="hover:border-primary flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-3 hover:bg-gray-50">
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
          {/* 사진 업로드 */}
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardHeader className="border-b-2 border-gray-100 bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <Camera className="text-primary h-5 w-5" />
                사진 업로드 ({selectedImages.length}/10)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
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
                    최대 10장까지 업로드 가능
                  </p>
                </Label>
              </div>
              {selectedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file) || '/placeholder.svg'}
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
                          ? `${formData.startAt} ~ ${formData.endAt}`
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
