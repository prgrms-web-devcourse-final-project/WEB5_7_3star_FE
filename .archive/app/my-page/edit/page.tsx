'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Camera, User, Lock, Save } from 'lucide-react'
import Link from 'next/link'

export default function EditProfile() {
  const [profileData, setProfileData] = useState({
    nickname: '김코치',
    email: 'coach.kim@example.com',
    introduction: '10년 경력의 수영 전문 강사입니다',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [profileImage, setProfileImage] = useState(
    '/placeholder.svg?height=120&width=120',
  )

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    console.log('Profile updated:', profileData)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 배경 장식 요소 */}
      <div className="pointer-events-none fixed top-24 left-[-50px] h-48 w-48 rounded-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 blur-3xl" />
      <div className="pointer-events-none fixed top-72 right-[-80px] h-36 w-36 rounded-full bg-gradient-to-r from-purple-100/20 to-blue-100/20 blur-3xl" />

      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/mypage">
            <Button
              variant="outline"
              size="sm"
              className="h-10 w-10 rounded-full bg-transparent p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] bg-clip-text text-3xl font-bold text-transparent">
              프로필 수정
            </h1>
            <p className="mt-1 text-gray-600">개인정보를 수정하고 관리하세요</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* 프로필 사진 변경 */}
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600" />
                프로필 사진
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <Avatar className="border-gradient-to-r h-32 w-32 border-4 from-blue-200 to-purple-200">
                  <AvatarImage
                    src={profileImage || '/placeholder.svg'}
                    alt="프로필 사진"
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-2xl font-bold">
                    {profileData.nickname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-800">
                      프로필 사진 변경
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      JPG, PNG 파일만 업로드 가능합니다. (최대 5MB)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                      onClick={() =>
                        document.getElementById('profile-upload')?.click()
                      }
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      사진 업로드
                    </Button>
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button variant="outline">기본 이미지로 변경</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 기본 정보 수정 */}
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="nickname"
                    className="text-sm font-medium text-gray-700"
                  >
                    닉네임
                  </Label>
                  <Input
                    id="nickname"
                    value={profileData.nickname}
                    onChange={(e) =>
                      handleInputChange('nickname', e.target.value)
                    }
                    className="rounded-lg border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    이메일
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rounded-lg border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="introduction"
                  className="text-sm font-medium text-gray-700"
                >
                  자기소개
                </Label>
                <Textarea
                  id="introduction"
                  value={profileData.introduction}
                  onChange={(e) =>
                    handleInputChange('introduction', e.target.value)
                  }
                  className="min-h-[100px] rounded-lg border-2 border-gray-200 focus:border-blue-500"
                  placeholder="자신을 소개해주세요..."
                />
              </div>
            </CardContent>
          </Card>

          {/* 비밀번호 변경 */}
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                비밀번호 변경
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  현재 비밀번호
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={profileData.currentPassword}
                  onChange={(e) =>
                    handleInputChange('currentPassword', e.target.value)
                  }
                  className="rounded-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    새 비밀번호
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={profileData.newPassword}
                    onChange={(e) =>
                      handleInputChange('newPassword', e.target.value)
                    }
                    className="rounded-lg border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    새 비밀번호 확인
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
                    className="rounded-lg border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-gray-600">
                <p className="mb-2 font-medium">비밀번호 요구사항:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>8자 이상 16자 이하</li>
                  <li>영문 대소문자, 숫자, 특수문자 중 3종류 이상 조합</li>
                  <li>연속된 문자나 숫자 3개 이상 사용 금지</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 저장 버튼 */}
          <div className="flex justify-center gap-4 pt-6">
            <Link href="/mypage">
              <Button
                variant="outline"
                className="bg-transparent px-8 py-3 text-lg"
              >
                취소
              </Button>
            </Link>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-lg text-white hover:from-blue-600 hover:to-purple-700"
            >
              <Save className="mr-2 h-5 w-5" />
              저장하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
