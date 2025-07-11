"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, MapPin, Users, DollarSign, Camera, FileText, Clock, Eye } from "lucide-react"

export default function LessonRegistration() {
  const [formData, setFormData] = useState({
    lessonName: "",
    city: "",
    district: "",
    dong: "",
    detailAddress: "",
    startDate: "",
    endDate: "",
    description: "",
    maxParticipants: "",
    pricePerPerson: "",
    category: "",
    registrationType: "first-come",
  })

  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const cities = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
  ]
  const districts = {
    서울특별시: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    부산광역시: [
      "중구",
      "서구",
      "동구",
      "영도구",
      "부산진구",
      "동래구",
      "남구",
      "북구",
      "해운대구",
      "사하구",
      "금정구",
      "강서구",
      "연제구",
      "수영구",
      "사상구",
      "기장군",
    ],
  }
  const dongs = ["역삼동", "논현동", "압구정동", "청담동", "삼성동", "대치동", "개포동", "일원동", "수서동", "세곡동"]

  const categories = [
    "수영",
    "헬스",
    "테니스",
    "베드민턴",
    "요가",
    "필라테스",
    "골프",
    "축구",
    "농구",
    "배구",
    "탁구",
    "클라이밍",
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (selectedImages.length + files.length <= 10) {
      setSelectedImages([...selectedImages, ...files])
    } else {
      alert("최대 10장까지 업로드 가능합니다.")
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    console.log("Selected images:", selectedImages)
    // 여기에 실제 제출 로직을 구현
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 blur-3xl"
          style={{
            background: `rgba(107, 115, 255, 0.08)`,
          }}
        ></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 rounded-full opacity-15 blur-3xl"
          style={{
            background: `rgba(159, 122, 234, 0.06)`,
          }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full opacity-10 blur-3xl"
          style={{
            background: `rgba(107, 115, 255, 0.05)`,
          }}
        ></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8 relative">
        {/* 상단 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">레슨 등록</h1>
          <p className="text-gray-600 text-lg">새로운 레슨을 등록하고 참여자를 모집해보세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 좌측: 폼 입력 */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-2 border-gray-100">
              <CardHeader className="bg-gray-50 border-b-2 border-gray-100">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  레슨 정보 입력
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* 레슨 이름 */}
                  <div className="space-y-2">
                    <Label htmlFor="lessonName" className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      레슨 이름
                    </Label>
                    <Input
                      id="lessonName"
                      placeholder="레슨 이름을 입력하세요"
                      value={formData.lessonName}
                      onChange={(e) => setFormData({ ...formData, lessonName: e.target.value })}
                      className="text-lg p-3 border-2 border-gray-200 focus:border-primary"
                    />
                  </div>

                  {/* 지역 선택 */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      지역
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-sm text-gray-600">
                          시/도
                        </Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) => setFormData({ ...formData, city: value, district: "", dong: "" })}
                        >
                          <SelectTrigger className="border-2 border-gray-200 focus:border-primary">
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
                        <Label htmlFor="district" className="text-sm text-gray-600">
                          구/군
                        </Label>
                        <Select
                          value={formData.district}
                          onValueChange={(value) => setFormData({ ...formData, district: value, dong: "" })}
                          disabled={!formData.city}
                        >
                          <SelectTrigger className="border-2 border-gray-200 focus:border-primary">
                            <SelectValue placeholder="구/군 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.city &&
                              districts[formData.city as keyof typeof districts]?.map((district) => (
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
                          onValueChange={(value) => setFormData({ ...formData, dong: value })}
                          disabled={!formData.district}
                        >
                          <SelectTrigger className="border-2 border-gray-200 focus:border-primary">
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
                    <Label htmlFor="detailAddress" className="text-sm text-gray-600">
                      상세 주소
                    </Label>
                    <Input
                      id="detailAddress"
                      placeholder="상세 주소를 입력하세요"
                      value={formData.detailAddress}
                      onChange={(e) => setFormData({ ...formData, detailAddress: e.target.value })}
                      className="p-3 border-2 border-gray-200 focus:border-primary"
                    />
                  </div>

                  {/* 날짜 */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      레슨 기간
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate" className="text-sm text-gray-600">
                          시작 날짜
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="p-3 border-2 border-gray-200 focus:border-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate" className="text-sm text-gray-600">
                          종료 날짜
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="p-3 border-2 border-gray-200 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 카테고리 */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-lg font-semibold">
                      카테고리
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="p-3 border-2 border-gray-200 focus:border-primary">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants" className="text-lg font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        모집 인원
                      </Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        placeholder="모집 인원"
                        value={formData.maxParticipants}
                        onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                        className="p-3 border-2 border-gray-200 focus:border-primary"
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pricePerPerson" className="text-lg font-semibold flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        인당 가격
                      </Label>
                      <Input
                        id="pricePerPerson"
                        type="number"
                        placeholder="인당 가격 (원)"
                        value={formData.pricePerPerson}
                        onChange={(e) => setFormData({ ...formData, pricePerPerson: e.target.value })}
                        className="p-3 border-2 border-gray-200 focus:border-primary"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* 참여 방식 */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      참여 방식
                    </Label>
                    <RadioGroup
                      value={formData.registrationType}
                      onValueChange={(value) => setFormData({ ...formData, registrationType: value })}
                      className="flex flex-col space-y-3"
                    >
                      <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50">
                        <RadioGroupItem value="first-come" id="first-come" />
                        <Label htmlFor="first-come" className="cursor-pointer flex-1">
                          <div className="font-medium">선착순 참여</div>
                          <div className="text-sm text-gray-600">신청 즉시 참여 확정</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50">
                        <RadioGroupItem value="approval" id="approval" />
                        <Label htmlFor="approval" className="cursor-pointer flex-1">
                          <div className="font-medium">승인 후 참여</div>
                          <div className="text-sm text-gray-600">작성자 승인 후 참여 확정</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* 소개글 */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-lg font-semibold">
                      레슨 소개
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="레슨에 대한 자세한 소개를 작성해주세요"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-32 p-3 border-2 border-gray-200 focus:border-primary"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* 우측: 사진 업로드 및 미리보기 */}
          <div className="space-y-6">
            {/* 사진 업로드 */}
            <Card className="shadow-lg border-2 border-gray-100">
              <CardHeader className="bg-gray-50 border-b-2 border-gray-100">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  사진 업로드 ({selectedImages.length}/10)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">클릭하여 사진을 업로드하세요</p>
                    <p className="text-sm text-gray-500">최대 10장까지 업로드 가능</p>
                  </Label>
                </div>
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 미리보기 */}
            <Card className="shadow-lg border-2 border-gray-100">
              <CardHeader className="bg-gray-50 border-b-2 border-gray-100">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  미리보기
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {formData.lessonName || "레슨 이름을 입력하세요"}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {formData.city && formData.district
                            ? `${formData.city} ${formData.district} ${formData.dong || ""}`
                            : "지역을 선택하세요"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formData.startDate && formData.endDate
                            ? `${formData.startDate} ~ ${formData.endDate}`
                            : "날짜를 선택하세요"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{formData.maxParticipants ? `${formData.maxParticipants}명` : "인원을 입력하세요"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>
                          {formData.pricePerPerson
                            ? `${Number(formData.pricePerPerson).toLocaleString()}원`
                            : "가격을 입력하세요"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {formData.description && (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">레슨 소개</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{formData.description}</p>
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
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300"
              >
                레슨 등록하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
