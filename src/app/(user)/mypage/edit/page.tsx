'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Camera, User, Save } from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/Container'
import PageHeader from '@/components/ui/PageHeader'
import {
  getCurrentUserProfile,
  updateUserProfile,
  uploadProfileImage,
  updateProfileImage,
  // TODO: Swagger에 비밀번호 변경 API가 없음 - 백엔드에서 추가 필요
  // changePassword,
} from '@/lib/api/profile'

interface ProfileData {
  nickname: string
  email: string
  introduction: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfileEditPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [profileData, setProfileData] = useState<ProfileData>({
    nickname: '',
    email: '',
    introduction: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [profileImage, setProfileImage] = useState<string>(
    '/placeholder-user.jpg',
  )
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await getCurrentUserProfile()
        const profile = response.data

        if (profile) {
          setProfileData({
            nickname: profile.nickname || '',
            email: '', // API에서 email을 제공하지 않으므로 빈 문자열로 설정
            introduction: profile.intro || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          })

          if (profile.profileImage) {
            setProfileImage(profile.profileImage)
          }
        }
      } catch (err) {
        console.error('프로필 로드 실패:', err)
        setError('프로필을 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDefaultImage = () => {
    setProfileImage('/placeholder-user.jpg')
    setUploadedFile(null)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)

      // 프로필 이미지 업데이트 (새로운 API 사용)
      if (uploadedFile) {
        await updateProfileImage(uploadedFile)
      }

      // 프로필 정보 업데이트
      await updateUserProfile({
        intro: profileData.introduction,
        // 이미지는 별도 API로 처리하므로 제거
        // profileImage: uploadedImageUrl === '/placeholder-user.jpg' ? undefined : uploadedImageUrl,
      })

      // TODO: 비밀번호 변경 API가 Swagger에 없음 - 백엔드에서 추가 필요
      // if (
      //   profileData.newPassword &&
      //   profileData.newPassword === profileData.confirmPassword
      // ) {
      //   await changePassword(
      //     profileData.currentPassword,
      //     profileData.newPassword,
      //   )

      //   // 비밀번호 필드 초기화
      //   setProfileData((prev) => ({
      //     ...prev,
      //     currentPassword: '',
      //     newPassword: '',
      //     confirmPassword: '',
      //   }))
      // }

      // 성공 메시지 표시
      alert('프로필이 성공적으로 수정되었습니다.')
    } catch (err) {
      console.error('프로필 수정 실패:', err)
      setError('프로필 수정에 실패했습니다.')
      alert('프로필 수정에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Container size="lg" className="relative z-10">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-600">프로필을 불러오는 중...</p>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Container size="lg" className="relative z-10">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="mb-4 text-red-600">{error}</p>
              <Button onClick={() => window.location.reload()}>
                다시 시도
              </Button>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <Container size="lg" className="relative z-10">
      <PageHeader
        title="프로필 수정"
        subtitle="개인정보를 수정하고 관리하세요"
        align="left"
        left={
          <Link href="/mypage">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        }
      />

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
                <AvatarImage src={profileImage} alt="프로필 사진" />
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
                  <label htmlFor="profile-upload">
                    <Button
                      asChild
                      className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                    >
                      <span>
                        <Camera className="mr-2 h-4 w-4" />
                        사진 업로드
                      </span>
                    </Button>
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button variant="outline" onClick={handleDefaultImage}>
                    기본 이미지로 변경
                  </Button>
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
                  disabled
                />
                <p className="text-xs text-gray-500">
                  닉네임은 변경할 수 없습니다.
                </p>
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
                  disabled
                />
                <p className="text-xs text-gray-500">
                  이메일은 변경할 수 없습니다.
                </p>
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
        {/* <Card className="border-2 border-gray-100 shadow-lg">
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
                placeholder="현재 비밀번호를 입력하세요"
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
                  placeholder="새 비밀번호를 입력하세요"
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
                  placeholder="새 비밀번호를 다시 입력하세요"
                />
              </div>
            </div>
            {profileData.newPassword &&
              profileData.newPassword !== profileData.confirmPassword && (
                <p className="text-sm text-red-600">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
          </CardContent>
        </Card> */}

        {/* 저장 버튼 */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? '저장 중...' : '저장하기'}
          </Button>
        </div>
      </div>
    </Container>
  )
}
