'use client'

import { Camera, Eye, EyeOff, Lock, User } from 'lucide-react'
import { useState } from 'react'

interface ProfileData {
  nickname: string
  email: string
  profileImage: string
  introduction: string
}

export default function ProfileEditClient() {
  const [profileData, setProfileData] = useState<ProfileData>({
    nickname: '김수영',
    email: 'kim@example.com',
    profileImage: 'https://s3.ap-northeast-2.amazonaws.com/mybucket/puppy.jpg',
    introduction:
      '15년 경력의 테니스 전문 강사입니다. 초보자부터 고급자까지 체계적인 지도를 제공합니다.',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          profileImage: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateProfile = () => {
    const newErrors: Record<string, string> = {}

    if (!profileData.nickname.trim()) {
      newErrors.nickname = '닉네임을 입력해주세요.'
    }

    if (!profileData.introduction.trim()) {
      newErrors.introduction = '자기소개를 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePassword = () => {
    const newErrors: Record<string, string> = {}

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.'
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.'
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = '비밀번호는 8자 이상이어야 합니다.'
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = '새 비밀번호 확인을 입력해주세요.'
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProfileSave = async () => {
    if (!validateProfile()) return

    setIsLoading(true)

    // 실제 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert('프로필이 성공적으로 수정되었습니다.')
    setIsLoading(false)
  }

  const handlePasswordChange = async () => {
    if (!validatePassword()) return

    setIsLoading(true)

    // 실제 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert('비밀번호가 성공적으로 변경되었습니다.')
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setIsLoading(false)
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="space-y-8">
      {/* 프로필 수정 */}
      <div className="service-card">
        <div className="mb-6 flex items-center gap-3">
          <User className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">프로필 수정</h2>
        </div>

        <div className="space-y-6">
          {/* 프로필 이미지 */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="avatar">
                <img
                  src={profileData.profileImage}
                  alt={profileData.nickname}
                  className="h-full w-full object-cover"
                />
              </div>
              <label className="absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 transition-colors hover:bg-blue-700">
                <Camera className="h-4 w-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">
                프로필 이미지
              </label>
              <p className="mt-1 text-sm text-gray-500">
                클릭하여 이미지를 변경하세요
              </p>
            </div>
          </div>

          {/* 닉네임 */}
          <div className="space-y-2">
            <label
              htmlFor="nickname"
              className="text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={profileData.nickname}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
              className="h-12 w-full rounded-lg border-2 border-gray-200 px-3 focus:border-blue-600"
              placeholder="닉네임을 입력하세요"
            />
            {errors.nickname && (
              <p className="text-sm text-red-500">{errors.nickname}</p>
            )}
          </div>

          {/* 이메일 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              value={profileData.email}
              disabled
              className="h-12 w-full rounded-lg border-2 border-gray-200 bg-gray-100 px-3 text-gray-500"
            />
            <p className="text-sm text-gray-500">
              이메일은 변경할 수 없습니다.
            </p>
          </div>

          {/* 자기소개 */}
          <div className="space-y-2">
            <label
              htmlFor="introduction"
              className="text-sm font-medium text-gray-700"
            >
              자기소개
            </label>
            <textarea
              id="introduction"
              value={profileData.introduction}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  introduction: e.target.value,
                }))
              }
              rows={4}
              className="w-full resize-none rounded-lg border-2 border-gray-200 p-3 focus:border-blue-600"
              placeholder="자기소개를 입력하세요"
            />
            {errors.introduction && (
              <p className="text-sm text-red-500">{errors.introduction}</p>
            )}
          </div>

          {/* 저장 버튼 */}
          <button
            onClick={handleProfileSave}
            disabled={isLoading}
            className="edit-btn w-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                저장 중...
              </div>
            ) : (
              '프로필 저장'
            )}
          </button>
        </div>
      </div>

      {/* 비밀번호 변경 */}
      <div className="service-card">
        <div className="mb-6 flex items-center gap-3">
          <Lock className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">비밀번호 변경</h2>
        </div>

        <div className="space-y-6">
          {/* 현재 비밀번호 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              현재 비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                className="h-12 w-full rounded-lg border-2 border-gray-200 px-3 pr-12 focus:border-blue-600"
                placeholder="현재 비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
              >
                {showPassword.current ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-sm text-red-500">{errors.currentPassword}</p>
            )}
          </div>

          {/* 새 비밀번호 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              새 비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="h-12 w-full rounded-lg border-2 border-gray-200 px-3 pr-12 focus:border-blue-600"
                placeholder="새 비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
              >
                {showPassword.new ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-red-500">{errors.newPassword}</p>
            )}
          </div>

          {/* 새 비밀번호 확인 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              새 비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="h-12 w-full rounded-lg border-2 border-gray-200 px-3 pr-12 focus:border-blue-600"
                placeholder="새 비밀번호를 다시 입력하세요"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
              >
                {showPassword.confirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* 변경 버튼 */}
          <button
            onClick={handlePasswordChange}
            disabled={isLoading}
            className="edit-btn w-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                변경 중...
              </div>
            ) : (
              '비밀번호 변경'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
