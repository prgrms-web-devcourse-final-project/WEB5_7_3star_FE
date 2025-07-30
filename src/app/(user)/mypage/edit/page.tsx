'use client'

import Container from '@/components/Container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageHeader from '@/components/ui/PageHeader'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/hooks/useAuth'
import {
  changePassword,
  getProfileDetail,
  updateProfileImage,
  updateUserProfile,
} from '@/lib/api/profile'
import { getDownloadPresignedUrl } from '@/lib/api/s3'
import { Camera, Loader2, Lock, Save, Trash, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProfileData {
  nickname: string
  email: string
  introduction: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfileEditPage() {
  const { user } = useAuth()
  const router = useRouter()
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

  const [profileImage, setProfileImage] = useState<string>('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [profileImageKey, setProfileImageKey] = useState<string>('')

  useEffect(() => {
    const initializeData = async () => {
      if (typeof window !== 'undefined') {
        try {
          if (!user || !user.userId) {
            return
          }
          const response = await getProfileDetail(user.userId)
          const profile = response.data

          if (profile) {
            setProfileData({
              nickname: profile.nickname || '',
              email: user.email || '',
              introduction: profile.intro || '',
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            })

            setProfileImage(profile.profileImage || '')

            // if (profile.profileImage) {
            //   // S3에 저장된 이미지인 경우 presigned URL 발급
            //   try {
            //     const presignedUrl = await getDownloadPresignedUrl(
            //       profile.profileImage,
            //     )
            //     setProfileImage(presignedUrl)
            //     setProfileImageKey(profile.profileImage)
            //   } catch (error) {
            //     console.error('프로필 이미지 URL 발급 실패:', error)
            //     // 실패 시 기본 이미지 표시
            //     setProfileImage('')
            //     setProfileImageKey('')
            //   }
            // } else {
            //   setProfileImage('')
            //   setProfileImageKey('')
            // }
          }
        } catch (err) {
          console.error('프로필 데이터 로딩 에러:', err)
          setError('프로필 정보를 불러오는 중 오류가 발생했습니다.')
        }
      }
    }

    initializeData()
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
    setProfileImage('')
    setUploadedFile(null)
    setProfileImageKey('')
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)

      // 1. 프로필 정보 업데이트
      try {
        await updateUserProfile({
          intro: profileData.introduction,
        })
      } catch (err) {
        throw new Error(
          `프로필 정보 수정 실패: ${err instanceof Error ? err.message : String(err)}`,
        )
      }

      // 2. 프로필 이미지 업데이트
      if (uploadedFile) {
        try {
          const formData = new FormData()
          formData.append('file', uploadedFile)

          const uploadResponse = await fetch(
            '/api/proxy/api/v1/test/s3/upload',
            {
              method: 'POST',
              body: formData,
              credentials: 'include',
            },
          )

          if (!uploadResponse.ok) {
            throw new Error(`프록시 업로드 실패: ${uploadResponse.status}`)
          }

          const uploadResult = await uploadResponse.text()

          // 응답에서 실제 URL 추출
          let uploadedKey = uploadResult
          try {
            const parsedResult = JSON.parse(uploadResult)
            if (parsedResult.message) {
              uploadedKey = parsedResult.message
            }
          } catch (parseError) {
            // JSON 파싱 실패 시 원본 텍스트 사용
          }

          // 서버에 이미지 경로 업데이트
          await updateProfileImage(uploadedKey)
        } catch (err) {
          console.error('=== 프로필 이미지 업로드 실패 ===')
          console.error('에러 타입:', typeof err)
          console.error('에러 객체:', err)
          console.error(
            '에러 메시지:',
            err instanceof Error ? err.message : String(err),
          )
          console.error(
            '에러 스택:',
            err instanceof Error ? err.stack : '스택 없음',
          )
          throw new Error(
            `프로필 이미지 수정 실패: ${err instanceof Error ? err.message : String(err)}`,
          )
        }
      } else if (profileImage === '') {
        // 기본 이미지로 변경하는 경우
        try {
          await updateProfileImage(null)
        } catch (err) {
          console.error('기본 이미지 변경 실패:', err)
          throw new Error(
            `프로필 이미지 수정 실패: ${err instanceof Error ? err.message : String(err)}`,
          )
        }
      }

      // 3. 비밀번호 변경
      if (
        profileData.newPassword &&
        profileData.newPassword === profileData.confirmPassword
      ) {
        try {
          await changePassword(
            profileData.currentPassword,
            profileData.newPassword,
            profileData.confirmPassword,
          )

          setProfileData((prev) => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }))
        } catch (err) {
          throw new Error(
            `비밀번호 변경 실패: ${err instanceof Error ? err.message : String(err)}`,
          )
        }
      }

      alert('프로필이 성공적으로 수정되었습니다.')
      router.push(`/profile/${user?.userId}`)
    } catch (err) {
      console.error('프로필 수정 실패:', err)

      const errorMessage =
        err instanceof Error ? err.message : '프로필 수정에 실패했습니다.'
      setError(errorMessage)
      alert(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleWithdraw = async () => {
    if (!confirm('정말 회원 탈퇴하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch('/api/proxy/api/v1/users/withdraw', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함
      })

      if (!response.ok) {
        let errorMessage = '회원탈퇴에 실패했습니다.'
        try {
          const errorData = await response.json()
          if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (parseError) {
          try {
            const errorText = await response.text()
            if (errorText) {
              errorMessage = errorText
            }
          } catch (textError) {}
        }
        throw new Error(errorMessage)
      }

      // 로컬 스토리지 정리
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      }

      alert('회원탈퇴가 완료되었습니다.')
      window.location.href = '/'
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err))
      console.error('회원 탈퇴 실패:', err)
    }
  }

  if (!profileData.nickname) {
    return (
      <div className="min-h-screen bg-white">
        <Container size="lg" className="relative z-10">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-500" />
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
        title="내 정보 수정"
        subtitle="개인정보를 수정하고 관리하세요"
        align="left"
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
                {profileImage ? (
                  <AvatarImage src={profileImage} alt="프로필 사진" />
                ) : null}
                <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100">
                  <User className="h-16 w-16 text-white" />
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
                  disabled
                />
                <p className="text-xs text-gray-500">
                  닉네임은 변경할 수 없습니다.
                </p>
              </div>
              {/* <div className="space-y-2">
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
                  disabled
                />
                <p className="text-xs text-gray-500">
                  이메일은 변경할 수 없습니다.
                </p>
              </div> */}
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
                className="min-h-[100px]"
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
        </Card>

        {/* 회원 탈퇴 버튼 */}
        <div className="flex justify-between">
          <div className="flex justify-start">
            <Button
              onClick={handleWithdraw}
              disabled={false}
              className="rounded-xl bg-gradient-to-r from-[#E64C4C] to-[#E64C4C] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
            >
              <Trash className="mr-2 h-4 w-4" />
              회원 탈퇴
            </Button>
          </div>

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
      </div>
    </Container>
  )
}
