'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Award,
  Camera,
  CheckCircle,
  Mail,
  MapPin,
  Save,
  User,
  X,
} from 'lucide-react'
import { useState } from 'react'

export default function ProfileEdit() {
  const [profile, setProfile] = useState({
    nickname: '김수영',
    email: 'swimming.kim@example.com',
    introduction:
      '10년 경력의 수영 전문 강사입니다. 초보자부터 고급자까지 모든 레벨의 수영을 가르칩니다.',
    location: '서울 강남구',
    phone: '010-1234-5678',
    specialties: ['자유형', '배영', '접영', '평영'],
    certifications: ['수영지도사 2급', '생명구조원', 'CPR 자격증'],
  })

  const [newSpecialty, setNewSpecialty] = useState('')
  const [newCertification, setNewCertification] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const addSpecialty = () => {
    if (
      newSpecialty.trim() &&
      !profile.specialties.includes(newSpecialty.trim())
    ) {
      setProfile((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()],
      }))
      setNewSpecialty('')
    }
  }

  const removeSpecialty = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }))
  }

  const addCertification = () => {
    if (
      newCertification.trim() &&
      !profile.certifications.includes(newCertification.trim())
    ) {
      setProfile((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()],
      }))
      setNewCertification('')
    }
  }

  const removeCertification = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    // 실제로는 서버에 저장 요청
    setTimeout(() => {
      setIsLoading(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">프로필 수정</h1>
          <p className="text-gray-600">프로필 정보를 수정하고 업데이트하세요</p>
        </div>

        <div className="grid gap-6">
          {/* 프로필 이미지 */}
          <Card>
            <CardHeader>
              <CardTitle>프로필 이미지</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="border-gradient-to-r h-24 w-24 border-4 from-blue-200 to-purple-200">
                    <AvatarImage
                      src="/placeholder.svg"
                      alt={profile.nickname}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-xl font-bold">
                      {profile.nickname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="mb-2 font-medium text-gray-900">
                    이미지 업로드
                  </h3>
                  <p className="mb-3 text-sm text-gray-600">
                    JPG, PNG 파일만 업로드 가능합니다. (최대 5MB)
                  </p>
                  <Button variant="outline" size="sm">
                    이미지 선택
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="nickname" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    닉네임
                  </Label>
                  <Input
                    id="nickname"
                    value={profile.nickname}
                    onChange={(e) =>
                      handleInputChange('nickname', e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    이메일
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    지역
                  </Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) =>
                      handleInputChange('location', e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="introduction">자기소개</Label>
                <Textarea
                  id="introduction"
                  value={profile.introduction}
                  onChange={(e) =>
                    handleInputChange('introduction', e.target.value)
                  }
                  className="mt-1"
                  rows={4}
                  placeholder="자신을 소개해주세요..."
                />
              </div>
            </CardContent>
          </Card>

          {/* 전문 분야 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                전문 분야
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700"
                  >
                    {specialty}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSpecialty(index)}
                      className="ml-1 h-4 w-4 p-0 hover:bg-blue-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="새로운 전문 분야 추가"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                />
                <Button onClick={addSpecialty} variant="outline">
                  추가
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 자격증 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                자격증
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profile.certifications.map((cert, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-50 text-green-700"
                  >
                    {cert}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(index)}
                      className="ml-1 h-4 w-4 p-0 hover:bg-green-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="새로운 자격증 추가"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                />
                <Button onClick={addCertification} variant="outline">
                  추가
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 저장 버튼 */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">취소</Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  저장
                </>
              )}
            </Button>
          </div>

          {/* 저장 완료 메시지 */}
          {isSaved && (
            <div className="fixed right-4 bottom-4 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
              <CheckCircle className="h-5 w-5" />
              프로필이 성공적으로 저장되었습니다!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
