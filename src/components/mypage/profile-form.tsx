'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Camera, FileText, Mail, Save, User, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  getCurrentUserProfile,
  updateUserProfile,
  uploadProfileImage,
} from '@/lib/api/profile'

interface ProfileData {
  nickname: string
  email: string
  introduction: string
}

export default function ProfileForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [profileData, setProfileData] = useState<ProfileData>({
    nickname: '',
    email: '',
    introduction: '',
  })

  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [profileImage, setProfileImage] = useState<string>(
    '/placeholder-user.jpg',
  )

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await getCurrentUserProfile()
        const profile = response.data

        setProfileData({
          nickname: profile.nickname || '',
          email: '', // API에서 email을 제공하지 않으므로 빈 문자열로 설정
          introduction: profile.intro || '',
        })

        if (profile.profileImage) {
          setProfileImage(profile.profileImage)
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
      setUploadedImage(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSaving(true)
      setError(null)

      // 프로필 이미지 업로드
      if (uploadedImage) {
        const imageResponse = await uploadProfileImage(uploadedImage)
        setProfileImage(imageResponse.data.imageUrl)
      }

      // 프로필 정보 업데이트
      await updateUserProfile({
        intro: profileData.introduction,
        profileImage:
          profileImage === '/placeholder-user.jpg' ? null : profileImage,
      })

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
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">프로필을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <Button onClick={() => window.location.reload()}>다시 시도</Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* 프로필 이미지 */}
      <Card className="rounded-3xl border border-gray-200 bg-white shadow-lg">
        <CardHeader className="rounded-t-3xl border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-8 py-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-gray-900">
            <Camera className="h-6 w-6 text-blue-500" />
            프로필 이미지
          </CardTitle>
          <CardDescription className="text-base font-medium text-gray-500">
            프로필에 표시될 이미지를 업로드하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-10 p-10 md:flex-row">
          <div className="relative flex flex-col items-center">
            <Avatar className="h-36 w-36 border-4 border-white bg-gray-100 shadow-md">
              <AvatarImage
                src={
                  uploadedImage
                    ? URL.createObjectURL(uploadedImage)
                    : profileImage
                }
                alt="Profile"
              />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-5xl font-bold text-white">
                {profileData.nickname.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {uploadedImage && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-9 w-9 rounded-full border border-white shadow-md"
                onClick={removeImage}
                aria-label="이미지 삭제"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="w-full max-w-xs flex-1 md:max-w-md">
            <Label htmlFor="image-upload" className="block cursor-pointer">
              <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/40 p-8 text-center transition-colors hover:border-blue-500 hover:bg-blue-100/60">
                <Camera className="mx-auto mb-2 h-10 w-10 text-blue-400" />
                <span className="text-base font-semibold text-blue-700 group-hover:text-blue-800">
                  이미지 업로드
                </span>
                <span className="text-xs text-gray-400">PNG, JPG, JPEG</span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </Label>
          </div>
        </CardContent>
      </Card>
      {/* 기본 정보 */}
      <Card className="rounded-3xl border border-gray-200 bg-white shadow-lg">
        <CardHeader className="rounded-t-3xl border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-8 py-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-gray-900">
            <User className="h-6 w-6 text-green-500" />
            기본 정보
          </CardTitle>
          <CardDescription className="text-base font-medium text-gray-500">
            개인 정보를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <Label
                htmlFor="nickname"
                className="flex items-center gap-2 text-base font-semibold text-gray-800"
              >
                <User className="h-5 w-5 text-green-500" />
                닉네임 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nickname"
                placeholder="이름을 입력하세요"
                value={profileData.nickname}
                onChange={(e) => handleInputChange('nickname', e.target.value)}
                className="h-14 rounded-xl border-2 border-gray-200 text-lg font-medium shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
                disabled
              />
              <p className="text-xs text-gray-500">
                닉네임은 변경할 수 없습니다.
              </p>
            </div>
            <div className="space-y-4">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-base font-semibold text-gray-800"
              >
                <Mail className="h-5 w-5 text-green-500" />
                이메일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-14 rounded-xl border-2 border-gray-200 text-lg font-medium shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
                disabled
              />
              <p className="text-xs text-gray-500">
                이메일은 변경할 수 없습니다.
              </p>
            </div>
            <div className="space-y-4 md:col-span-2">
              <Label
                htmlFor="introduction"
                className="flex items-center gap-2 text-base font-semibold text-gray-800"
              >
                <FileText className="h-5 w-5 text-purple-500" />
                자기소개
              </Label>
              <Textarea
                id="introduction"
                placeholder="자기소개를 입력하세요"
                value={profileData.introduction}
                onChange={(e) =>
                  handleInputChange('introduction', e.target.value)
                }
                rows={4}
                className="rounded-xl border-2 border-gray-200 text-lg font-medium shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={saving}
          className="h-14 rounded-xl bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] px-10 py-3 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
        >
          <Save className="mr-2 h-5 w-5" />
          {saving ? '저장 중...' : '프로필 저장'}
        </Button>
      </div>
    </form>
  )
}
