'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, User, ArrowLeft, Save, X } from 'lucide-react'
import type { UserProfile } from '@/types/profile'
import { updateUserProfile } from '@/lib/api/profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PasswordChangeForm from './PasswordChangeForm'

interface ProfileEditFormProps {
  profile: UserProfile
}

export default function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileFormData, setProfileFormData] = useState({
    profileImage: profile.profileImage,
    intro: profile.intro,
  })

  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewImage(result)
        setProfileFormData((prev) => ({ ...prev, profileImage: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileInputChange = (
    field: keyof typeof profileFormData,
    value: string,
  ) => {
    setProfileFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProfileLoading(true)

    try {
      await updateUserProfile(profile.userId, {
        profileImage: profileFormData.profileImage,
        intro: profileFormData.intro,
      })

      // 성공 시 프로필 페이지로 이동
      router.push('/profile')
    } catch (error) {
      console.error('프로필 수정 실패:', error)
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsProfileLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  const handleDefaultImage = () => {
    setPreviewImage(null)
    setProfileFormData((prev) => ({ ...prev, profileImage: '' }))
  }

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="page-header">
        <button className="back-btn" onClick={handleCancel}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="header-text">
          <h1 className="page-title">프로필 수정</h1>
          <p className="page-subtitle">개인정보를 수정하고 관리하세요</p>
        </div>
      </div>

      <div className="form-container">
        {/* 프로필 사진 변경 */}
        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">
              <Camera className="h-5 w-5" />
              프로필 사진
            </h2>
          </div>
          <div className="section-content">
            <div className="profile-photo-section">
              <div className="current-photo">
                <Avatar className="profile-avatar">
                  <AvatarImage
                    src={previewImage || profileFormData.profileImage}
                    alt="프로필 사진"
                  />
                  <AvatarFallback className="bg-figma-bg-light text-figma-primary text-3xl font-bold">
                    {profile.nickname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className="photo-overlay"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-6 w-6" />
                </div>
              </div>
              <div className="photo-controls">
                <div className="photo-info">
                  <h3 className="photo-title">프로필 사진 변경</h3>
                  <p className="photo-description">
                    JPG, PNG 파일만 업로드 가능합니다. (최대 5MB)
                  </p>
                </div>
                <div className="photo-buttons">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    사진 업로드
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleDefaultImage}
                  >
                    기본 이미지로 변경
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 기본 정보 수정 */}
        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">
              <User className="h-5 w-5" />
              기본 정보
            </h2>
          </div>
          <div className="section-content">
            <form className="profile-form" onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label htmlFor="nickname" className="form-label">
                  닉네임
                </label>
                <input
                  type="text"
                  id="nickname"
                  value={profile.nickname}
                  className="form-input"
                  disabled
                />
                <p className="text-figma-text-secondary mt-1 text-sm">
                  닉네임은 변경할 수 없습니다.
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="introduction" className="form-label">
                  자기소개
                </label>
                <textarea
                  id="introduction"
                  value={profileFormData.intro}
                  onChange={(e) =>
                    handleProfileInputChange('intro', e.target.value)
                  }
                  className="form-textarea"
                  placeholder="자신을 소개해주세요..."
                  rows={4}
                />
              </div>

              <div className="action-buttons">
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={isProfileLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isProfileLoading ? '저장 중...' : '프로필 저장'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 비밀번호 변경 */}
        <PasswordChangeForm userId={profile.userId} />

        {/* 취소 버튼 */}
        <div className="action-buttons">
          <button
            type="button"
            className="btn btn-outline btn-large"
            onClick={handleCancel}
          >
            <X className="mr-2 h-4 w-4" />
            취소
          </button>
        </div>
      </div>
    </div>
  )
}
