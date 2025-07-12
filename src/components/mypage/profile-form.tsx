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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera, User, Save, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProfileData {
  name: string
  email: string
  phone: string
  birthDate: string
  gender: string
  location: string
  bio: string
  interests: string[]
  experience: string
}

export default function ProfileForm({
  initialData,
}: {
  initialData?: ProfileData
}) {
  const [profileData, setProfileData] = useState<ProfileData>(
    initialData || {
      name: '김운동',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      birthDate: '1990-01-01',
      gender: 'male',
      location: '강남구',
      bio: '운동을 좋아하는 사람입니다. 건강한 라이프스타일을 추구합니다.',
      interests: ['요가', '필라테스', '수영'],
      experience: 'intermediate',
    },
  )

  const [uploadedImage, setUploadedImage] = useState<File | null>(null)

  const genderOptions = [
    { value: 'male', label: '남성' },
    { value: 'female', label: '여성' },
    { value: 'other', label: '기타' },
  ]

  const experienceOptions = [
    { value: 'beginner', label: '초보자' },
    { value: 'intermediate', label: '중급자' },
    { value: 'advanced', label: '고급자' },
  ]

  const interestOptions = [
    '요가',
    '필라테스',
    '수영',
    '홈트레이닝',
    '크로스핏',
    '복싱',
    '댄스',
    '골프',
    '테니스',
  ]

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 클라이언트에서 폼 제출 로직 처리
    console.log('프로필 수정 데이터:', { profileData, uploadedImage })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 프로필 이미지 */}
      <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5 text-[#8BB5FF]" />
            프로필 이미지
          </CardTitle>
          <CardDescription>
            프로필에 표시될 이미지를 업로드하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={
                    uploadedImage
                      ? URL.createObjectURL(uploadedImage)
                      : '/placeholder-user.jpg'
                  }
                  alt="Profile"
                />
                <AvatarFallback className="text-2xl">
                  {profileData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {uploadedImage && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0"
                  onClick={removeImage}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-[#8BB5FF]">
                  <Camera className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                  <span className="font-medium text-[#8BB5FF] hover:text-[#7AA8FF]">
                    이미지 선택
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </Label>
              <p className="mt-2 text-sm text-gray-500">
                PNG, JPG, JPEG 파일만 업로드 가능합니다
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 기본 정보 */}
      <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5 text-[#8BB5FF]" />
            기본 정보
          </CardTitle>
          <CardDescription>개인 정보를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                placeholder="이름을 입력하세요"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일 *</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                placeholder="전화번호를 입력하세요"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">생년월일</Label>
              <Input
                id="birthDate"
                type="date"
                value={profileData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gender">성별</Label>
              <Select
                value={profileData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="성별을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">지역</Label>
              <Input
                id="location"
                placeholder="지역을 입력하세요"
                value={profileData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 운동 정보 */}
      <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5 text-[#8BB5FF]" />
            운동 정보
          </CardTitle>
          <CardDescription>운동 경험과 관심사를 설정해주세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="experience">운동 경험</Label>
            <Select
              value={profileData.experience}
              onValueChange={(value) => handleInputChange('experience', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="운동 경험을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>관심 운동</Label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={interest}
                    checked={profileData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                    className="rounded border-gray-300 text-[#8BB5FF] focus:ring-[#8BB5FF]"
                  />
                  <Label htmlFor={interest} className="text-sm">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 자기소개 */}
      <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5 text-[#8BB5FF]" />
            자기소개
          </CardTitle>
          <CardDescription>자신에 대해 간단히 소개해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="bio">자기소개</Label>
            <Textarea
              id="bio"
              placeholder="자신에 대해 소개해주세요"
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* 저장 버튼 */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" className="px-8">
          취소
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] px-8 text-white hover:from-[#7AA8FF] hover:to-[#B8A8F5]"
        >
          <Save className="mr-2 h-4 w-4" />
          저장
        </Button>
      </div>
    </form>
  )
}
