'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, CheckCircle, XCircle } from 'lucide-react'
import { changePassword } from '@/lib/api/profile'

interface PasswordChangeFormProps {
  userId: number
}

interface PasswordValidation {
  length: boolean
  complexity: boolean
  noSequential: boolean
}

export default function PasswordChangeForm({
  userId,
}: PasswordChangeFormProps) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [validation, setValidation] = useState<PasswordValidation>({
    length: false,
    complexity: false,
    noSequential: false,
  })

  const validatePassword = (password: string): PasswordValidation => {
    const length = password.length >= 8 && password.length <= 16
    const complexity =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)
    const noSequential =
      !/(.)\1{2,}/.test(password) && !/(.)(.)\1\2/.test(password)

    return { length, complexity, noSequential }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // 새 비밀번호 입력 시 validation 체크
    if (field === 'newPassword') {
      setValidation(validatePassword(value))
    }

    // 에러 메시지 초기화
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // 현재 비밀번호 검증
    if (!formData.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.'
    }

    // 새 비밀번호 검증
    if (!formData.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.'
    } else {
      const { length, complexity, noSequential } = validation
      if (!length || !complexity || !noSequential) {
        newErrors.newPassword = '비밀번호 요구사항을 확인해주세요.'
      }
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await changePassword(userId, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })

      // 성공 시 폼 초기화
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setValidation({
        length: false,
        complexity: false,
        noSequential: false,
      })
      setErrors({})

      alert('비밀번호가 성공적으로 변경되었습니다.')
    } catch (error) {
      console.error('비밀번호 변경 실패:', error)
      setErrors({ submit: '비밀번호 변경에 실패했습니다. 다시 시도해주세요.' })
    } finally {
      setIsLoading(false)
    }
  }

  const getValidationIcon = (isValid: boolean) => {
    return isValid ? (
      <CheckCircle className="text-figma-success h-4 w-4" />
    ) : (
      <XCircle className="text-figma-error h-4 w-4" />
    )
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <h2 className="section-title">
          <Lock className="h-5 w-5" />
          비밀번호 변경
        </h2>
      </div>
      <div className="section-content">
        <form className="password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword" className="form-label">
              현재 비밀번호
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) =>
                  handleInputChange('currentPassword', e.target.value)
                }
                className={`form-input password-input ${errors.currentPassword ? 'error' : ''}`}
                placeholder="현재 비밀번호를 입력하세요"
              />
              <button
                type="button"
                className={`password-toggle ${showPasswords.current ? 'active' : ''}`}
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <div className="error-message">{errors.currentPassword}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">
                새 비밀번호
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={(e) =>
                    handleInputChange('newPassword', e.target.value)
                  }
                  className={`form-input password-input ${errors.newPassword ? 'error' : ''}`}
                  placeholder="새 비밀번호를 입력하세요"
                />
                <button
                  type="button"
                  className={`password-toggle ${showPasswords.new ? 'active' : ''}`}
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <div className="error-message">{errors.newPassword}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                새 비밀번호 확인
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange('confirmPassword', e.target.value)
                  }
                  className={`form-input password-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="새 비밀번호를 다시 입력하세요"
                />
                <button
                  type="button"
                  className={`password-toggle ${showPasswords.confirm ? 'active' : ''}`}
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="error-message">{errors.confirmPassword}</div>
              )}
            </div>
          </div>

          {/* 비밀번호 요구사항 */}
          <div className="password-requirements">
            <p className="requirements-title">비밀번호 요구사항:</p>
            <ul className="requirements-list">
              <li className="flex items-center gap-2">
                {getValidationIcon(validation.length)}
                8자 이상 16자 이하
              </li>
              <li className="flex items-center gap-2">
                {getValidationIcon(validation.complexity)}
                영문 대소문자, 숫자, 특수문자 중 3종류 이상 조합
              </li>
              <li className="flex items-center gap-2">
                {getValidationIcon(validation.noSequential)}
                연속된 문자나 숫자 3개 이상 사용 금지
              </li>
            </ul>
          </div>

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <div className="action-buttons">
            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={isLoading}
            >
              {isLoading ? '변경 중...' : '비밀번호 변경'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
