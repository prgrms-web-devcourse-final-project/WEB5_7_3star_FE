'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  login,
  signup,
  logout,
  withdraw,
  sendEmailVerification,
  checkEmailVerification,
  checkNickname,
  getCurrentUser,
} from '@/lib/api/auth'
import {
  changePassword,
  getProfileDetail,
  updateProfileImage,
  getCreatedLessons,
} from '@/lib/api/profile'
import { createComment, deleteComment, getComments } from '@/lib/api/comment'
import {
  getLessons,
  getLessonDetail,
  createLesson,
  deleteLesson,
  updateLesson,
  applyLesson,
  cancelLessonApplication,
  getMyLessonApplications,
  getLessonSummary,
  getLessonApplications,
  getLessonParticipants,
  processLessonApplication,
} from '@/lib/api/lesson'
import {
  preparePayment,
  saveAmount,
  verifyAmount,
  confirmPayment,
  cancelPayment,
  getPaymentSuccess,
  getPaymentCancel,
} from '@/lib/api/payment'
import {
  getAvailableCoupons,
  getMyCoupons,
  issueCoupon,
  useCoupon,
  createAdminCoupon,
  getAdminCoupons,
  getAdminCouponDetail,
  updateAdminCoupon,
  deleteAdminCoupon,
} from '@/lib/api/coupon'
import { getRankings } from '@/lib/api/ranking'
import { createReview, getUserReviews } from '@/lib/api/review'
import { getOverallRankings, getCategoryRankings } from '@/lib/api/profile'

export default function ApiTestPage() {
  const [results, setResults] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    // 로그인/회원가입
    email: 'test@test.com',
    password: 'test123',
    nickname: 'testuser',
    confirmPassword: 'test123',

    // 이메일 인증
    verificationCode: '',

    // 닉네임 체크
    checkNickname: 'testuser2',

    // 비밀번호 변경
    currentPassword: 'test123',
    newPassword: 'newtest123',
    newConfirmPassword: 'newtest123',

    // 프로필 조회용 사용자 ID
    profileUserId: '1',

    // 레슨 관련
    lessonId: '1',
    lessonSearchCategory: 'all',
    lessonSearchCity: '서울',
    lessonSearchDistrict: '강남구',
    lessonSearchDong: '역삼동',

    // 댓글 관련
    commentContent: '테스트 댓글입니다.',
    commentId: '1',

    // 신청 처리
    applicationId: '1',
    applicationAction: 'APPROVED',

    // 레슨 생성 관련
    lessonName: '테스트 레슨',
    description: '테스트용 레슨입니다',
    category: 'YOGA',
    price: '50000',
    maxParticipants: '10',
    startAt: '2024-01-01T10:00:00Z',
    endAt: '2024-01-01T11:00:00Z',
    openTime: '2024-01-01T09:00:00Z',
    openRun: true,
    city: '서울',
    district: '강남구',
    dong: '역삼동',
    addressDetail: '테스트 주소',

    // 결제 관련
    paymentKey: 'test_payment_key',
    orderId: 'test_order_id',
    amount: '50000',
    cancelReason: '테스트 취소',

    // 쿠폰 관련
    couponId: '1',
    couponName: '테스트 쿠폰',
    discountRate: '10',
    minOrderAmount: '30000',
    userId: '1',

    // 랭킹 관련
    rankingCategory: 'YOGA',

    // 리뷰 관련
    reviewContent: '훌륭한 레슨이었습니다!',
    rating: '5',
  })

  const updateResult = (testName: string, result: any) => {
    setResults((prev) => ({ ...prev, [testName]: result }))
  }

  const setLoadingState = (testName: string, isLoading: boolean) => {
    setLoading((prev) => ({ ...prev, [testName]: isLoading }))
  }

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null
      setSelectedFile(file)
    },
    [],
  )

  // 회원가입 테스트
  const testSignup = async () => {
    setLoadingState('signup', true)
    try {
      const result = await signup({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
      })
      updateResult('signup', { success: true, data: result })
    } catch (error) {
      updateResult('signup', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('signup', false)
    }
  }

  // 로그인 테스트
  const testLogin = async () => {
    setLoadingState('login', true)
    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      })
      updateResult('login', { success: true, data: result })
    } catch (error) {
      updateResult('login', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('login', false)
    }
  }

  // 로그아웃 테스트
  const testLogout = async () => {
    setLoadingState('logout', true)
    try {
      const result = await logout()
      updateResult('logout', { success: true, data: result })
    } catch (error) {
      updateResult('logout', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('logout', false)
    }
  }

  // 회원탈퇴 테스트
  const testWithdraw = async () => {
    setLoadingState('withdraw', true)
    try {
      const response = await fetch('/api/proxy/api/v1/users/withdraw', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함
      })

      if (!response.ok) {
        // 서버에서 보낸 에러 메시지 읽기
        let errorMessage = '회원탈퇴에 실패했습니다.'
        try {
          const errorData = await response.json()
          if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (parseError) {
          // JSON 파싱 실패 시 response.text()로 읽기
          try {
            const errorText = await response.text()
            if (errorText) {
              errorMessage = errorText
            }
          } catch (textError) {
            // 기본 메시지 사용
          }
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

  // 이메일 인증 발송 테스트
  const testEmailSend = async () => {
    setLoadingState('emailSend', true)
    try {
      const result = await sendEmailVerification({ email: formData.email })
      updateResult('emailSend', { success: true, data: result })
    } catch (error) {
      updateResult('emailSend', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('emailSend', false)
    }
  }

  // 이메일 인증 확인 테스트
  const testEmailCheck = async () => {
    setLoadingState('emailCheck', true)
    try {
      const result = await checkEmailVerification({
        email: formData.email,
        verificationCode: formData.verificationCode,
      })
      updateResult('emailCheck', { success: true, data: result })
    } catch (error) {
      updateResult('emailCheck', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('emailCheck', false)
    }
  }

  // 닉네임 중복 확인 테스트
  const testNicknameCheck = async () => {
    setLoadingState('nicknameCheck', true)
    try {
      const result = await checkNickname({ nickname: formData.checkNickname })
      updateResult('nicknameCheck', { success: true, data: result })
    } catch (error) {
      updateResult('nicknameCheck', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('nicknameCheck', false)
    }
  }

  // 현재 사용자 정보 조회 테스트
  const testGetCurrentUser = async () => {
    setLoadingState('getCurrentUser', true)
    try {
      const result = await getCurrentUser()
      updateResult('getCurrentUser', { success: true, data: result })
    } catch (error) {
      updateResult('getCurrentUser', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getCurrentUser', false)
    }
  }

  // 비밀번호 변경 테스트
  const testChangePassword = async () => {
    setLoadingState('changePassword', true)
    try {
      const result = await changePassword(
        formData.currentPassword,
        formData.newPassword,
        formData.newConfirmPassword,
      )
      updateResult('changePassword', { success: true, data: result })
    } catch (error) {
      updateResult('changePassword', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('changePassword', false)
    }
  }

  // 프로필 조회 테스트
  const testGetProfile = async () => {
    setLoadingState('getProfile', true)
    try {
      const result = await getProfileDetail(parseInt(formData.profileUserId))
      updateResult('getProfile', { success: true, data: result })
    } catch (error) {
      updateResult('getProfile', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getProfile', false)
    }
  }

  // 프로필 이미지 수정 테스트
  const testUpdateProfileImage = async () => {
    if (!selectedFile) {
      updateResult('updateProfileImage', {
        success: false,
        error: '파일을 선택해주세요.',
      })
      return
    }

    setLoadingState('updateProfileImage', true)
    try {
      // updateProfileImage는 string | null을 받으므로 File 객체 대신 null 전달
      const result = await updateProfileImage(null)
      updateResult('updateProfileImage', { success: true, data: result })
    } catch (error) {
      updateResult('updateProfileImage', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('updateProfileImage', false)
    }
  }

  // 개설한 레슨 목록 조회 테스트
  const testGetCreatedLessons = async () => {
    setLoadingState('getCreatedLessons', true)
    try {
      const result = await getCreatedLessons(formData.profileUserId)
      updateResult('getCreatedLessons', { success: true, data: result })
    } catch (error) {
      updateResult('getCreatedLessons', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getCreatedLessons', false)
    }
  }

  // 댓글 생성 테스트
  const testCreateComment = async () => {
    setLoadingState('createComment', true)
    try {
      const result = await createComment(formData.lessonId, {
        content: formData.commentContent,
        parentCommentId: undefined,
      })
      updateResult('createComment', { success: true, data: result })
    } catch (error) {
      updateResult('createComment', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('createComment', false)
    }
  }

  // 댓글 조회 테스트
  const testGetComments = async () => {
    setLoadingState('getComments', true)
    try {
      const result = await getComments(formData.lessonId)
      updateResult('getComments', { success: true, data: result })
    } catch (error) {
      updateResult('getComments', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getComments', false)
    }
  }

  // 댓글 삭제 테스트
  const testDeleteComment = async () => {
    setLoadingState('deleteComment', true)
    try {
      const result = await deleteComment(formData.commentId)
      updateResult('deleteComment', { success: true, data: result })
    } catch (error) {
      updateResult('deleteComment', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('deleteComment', false)
    }
  }

  // 레슨 목록 조회 테스트
  const testGetLessons = async () => {
    setLoadingState('getLessons', true)
    try {
      const result = await getLessons({
        pageRequestDto: { page: 1, limit: 10 },
        category: formData.lessonSearchCategory as any,
        city: formData.lessonSearchCity,
        district: formData.lessonSearchDistrict,
        dong: formData.lessonSearchDong,
      })
      updateResult('getLessons', { success: true, data: result })
    } catch (error) {
      updateResult('getLessons', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getLessons', false)
    }
  }

  // 레슨 상세 조회 테스트
  const testGetLessonDetail = async () => {
    setLoadingState('getLessonDetail', true)
    try {
      const result = await getLessonDetail(formData.lessonId)
      updateResult('getLessonDetail', { success: true, data: result })
    } catch (error) {
      updateResult('getLessonDetail', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getLessonDetail', false)
    }
  }

  // 레슨 신청 테스트
  const testApplyLesson = async () => {
    setLoadingState('applyLesson', true)
    try {
      const result = await applyLesson(formData.lessonId)
      updateResult('applyLesson', { success: true, data: result })
    } catch (error) {
      updateResult('applyLesson', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('applyLesson', false)
    }
  }

  // 레슨 신청 취소 테스트
  const testCancelLessonApplication = async () => {
    setLoadingState('cancelLessonApplication', true)
    try {
      const result = await cancelLessonApplication(formData.lessonId)
      updateResult('cancelLessonApplication', { success: true, data: result })
    } catch (error) {
      updateResult('cancelLessonApplication', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('cancelLessonApplication', false)
    }
  }

  // 내 레슨 신청 목록 테스트
  const testGetMyLessonApplications = async () => {
    setLoadingState('getMyLessonApplications', true)
    try {
      const result = await getMyLessonApplications()
      updateResult('getMyLessonApplications', { success: true, data: result })
    } catch (error) {
      updateResult('getMyLessonApplications', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getMyLessonApplications', false)
    }
  }

  // 레슨 요약 정보 테스트
  const testGetLessonSummary = async () => {
    setLoadingState('getLessonSummary', true)
    try {
      const result = await getLessonSummary(formData.lessonId)
      updateResult('getLessonSummary', { success: true, data: result })
    } catch (error) {
      updateResult('getLessonSummary', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getLessonSummary', false)
    }
  }

  // 레슨 생성 테스트
  const testCreateLesson = async () => {
    setLoadingState('createLesson', true)
    try {
      const lessonData = {
        lessonName: formData.lessonName,
        description: formData.description,
        category: formData.category as 'YOGA',
        price: parseInt(formData.price),
        maxParticipants: parseInt(formData.maxParticipants),
        startAt: formData.startAt,
        endAt: formData.endAt,
        openTime: formData.openTime,
        openRun: formData.openRun,
        city: formData.city,
        district: formData.district,
        dong: formData.dong,
        addressDetail: formData.addressDetail,
      }
      const result = await createLesson(lessonData)
      updateResult('createLesson', { success: true, data: result })
    } catch (error) {
      updateResult('createLesson', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('createLesson', false)
    }
  }

  // 레슨 삭제 테스트
  const testDeleteLesson = async () => {
    setLoadingState('deleteLesson', true)
    try {
      const result = await deleteLesson(formData.lessonId)
      updateResult('deleteLesson', { success: true, data: result })
    } catch (error) {
      updateResult('deleteLesson', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('deleteLesson', false)
    }
  }

  // 결제 준비 테스트
  const testPreparePayment = async () => {
    setLoadingState('preparePayment', true)
    try {
      const paymentData = {
        lessonId: parseInt(formData.lessonId),
        amount: parseInt(formData.amount),
        orderId: formData.orderId,
      }
      const result = await preparePayment(paymentData)
      updateResult('preparePayment', { success: true, data: result })
    } catch (error) {
      updateResult('preparePayment', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('preparePayment', false)
    }
  }

  // 결제 내역 저장 테스트
  const testSaveAmount = async () => {
    setLoadingState('saveAmount', true)
    try {
      const amountData = {
        orderId: formData.orderId,
        amount: parseInt(formData.amount),
      }
      const result = await saveAmount(amountData)
      updateResult('saveAmount', { success: true, data: result })
    } catch (error) {
      updateResult('saveAmount', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('saveAmount', false)
    }
  }

  // 결제 내역 확인 테스트
  const testVerifyAmount = async () => {
    setLoadingState('verifyAmount', true)
    try {
      const verifyData = {
        orderId: formData.orderId,
        amount: parseInt(formData.amount),
      }
      const result = await verifyAmount(verifyData)
      updateResult('verifyAmount', { success: true, data: result })
    } catch (error) {
      updateResult('verifyAmount', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('verifyAmount', false)
    }
  }

  // 결제 승인 테스트
  const testConfirmPayment = async () => {
    setLoadingState('confirmPayment', true)
    try {
      const confirmData = {
        paymentKey: formData.paymentKey,
        orderId: formData.orderId,
        amount: parseInt(formData.amount),
      }
      const result = await confirmPayment(confirmData)
      updateResult('confirmPayment', { success: true, data: result })
    } catch (error) {
      updateResult('confirmPayment', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('confirmPayment', false)
    }
  }

  // 결제 취소 테스트
  const testCancelPayment = async () => {
    setLoadingState('cancelPayment', true)
    try {
      const cancelData = {
        orderId: formData.orderId,
        cancelReason: formData.cancelReason,
      }
      const result = await cancelPayment(cancelData)
      updateResult('cancelPayment', { success: true, data: result })
    } catch (error) {
      updateResult('cancelPayment', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('cancelPayment', false)
    }
  }

  // 결제 성공 내역 조회 테스트
  const testGetPaymentSuccess = async () => {
    setLoadingState('getPaymentSuccess', true)
    try {
      const result = await getPaymentSuccess()
      updateResult('getPaymentSuccess', { success: true, data: result })
    } catch (error) {
      updateResult('getPaymentSuccess', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getPaymentSuccess', false)
    }
  }

  // 결제 취소 내역 조회 테스트
  const testGetPaymentCancel = async () => {
    setLoadingState('getPaymentCancel', true)
    try {
      const result = await getPaymentCancel()
      updateResult('getPaymentCancel', { success: true, data: result })
    } catch (error) {
      updateResult('getPaymentCancel', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getPaymentCancel', false)
    }
  }

  // 발급 가능한 쿠폰 목록 테스트
  const testGetAvailableCoupons = async () => {
    setLoadingState('getAvailableCoupons', true)
    try {
      const result = await getAvailableCoupons()
      updateResult('getAvailableCoupons', { success: true, data: result })
    } catch (error) {
      updateResult('getAvailableCoupons', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getAvailableCoupons', false)
    }
  }

  // 내 쿠폰 목록 테스트
  const testGetMyCoupons = async () => {
    setLoadingState('getMyCoupons', true)
    try {
      const result = await getMyCoupons()
      updateResult('getMyCoupons', { success: true, data: result })
    } catch (error) {
      updateResult('getMyCoupons', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getMyCoupons', false)
    }
  }

  // 쿠폰 발급 테스트
  const testIssueCoupon = async () => {
    setLoadingState('issueCoupon', true)
    try {
      const result = await issueCoupon(formData.couponId)
      updateResult('issueCoupon', { success: true, data: result })
    } catch (error) {
      updateResult('issueCoupon', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('issueCoupon', false)
    }
  }

  // 쿠폰 사용 테스트
  const testUseCoupon = async () => {
    setLoadingState('useCoupon', true)
    try {
      const result = await useCoupon(formData.userId, formData.couponId)
      updateResult('useCoupon', { success: true, data: result })
    } catch (error) {
      updateResult('useCoupon', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('useCoupon', false)
    }
  }

  // 관리자 쿠폰 생성 테스트
  const testCreateAdminCoupon = async () => {
    setLoadingState('createAdminCoupon', true)
    try {
      const couponData = {
        couponName: formData.couponName,
        expirationDate: '2024-12-31T23:59:59Z',
        discountPrice: formData.discountRate + '%',
        minOrderPrice: parseInt(formData.minOrderAmount),
        status: 'ACTIVE' as const,
        quantity: 100,
        category: 'NORMAL' as const,
        couponOpenAt: '2024-01-01T00:00:00Z',
        couponDeadlineAt: '2024-12-31T23:59:59Z',
      }
      const result = await createAdminCoupon(couponData)
      updateResult('createAdminCoupon', { success: true, data: result })
    } catch (error) {
      updateResult('createAdminCoupon', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('createAdminCoupon', false)
    }
  }

  // 관리자 쿠폰 목록 테스트
  const testGetAdminCoupons = async () => {
    setLoadingState('getAdminCoupons', true)
    try {
      const result = await getAdminCoupons()
      updateResult('getAdminCoupons', { success: true, data: result })
    } catch (error) {
      updateResult('getAdminCoupons', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getAdminCoupons', false)
    }
  }

  // 관리자 쿠폰 상세 조회 테스트
  const testGetAdminCouponDetail = async () => {
    setLoadingState('getAdminCouponDetail', true)
    try {
      const result = await getAdminCouponDetail(formData.couponId)
      updateResult('getAdminCouponDetail', { success: true, data: result })
    } catch (error) {
      updateResult('getAdminCouponDetail', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getAdminCouponDetail', false)
    }
  }

  // 관리자 쿠폰 수정 테스트
  const testUpdateAdminCoupon = async () => {
    setLoadingState('updateAdminCoupon', true)
    try {
      const couponData = {
        couponName: formData.couponName + ' (수정됨)',
        discountRate: parseInt(formData.discountRate),
        minOrderAmount: parseInt(formData.minOrderAmount),
        description: '수정된 테스트 쿠폰',
        isActive: true,
      }
      const result = await updateAdminCoupon(formData.couponId, couponData)
      updateResult('updateAdminCoupon', { success: true, data: result })
    } catch (error) {
      updateResult('updateAdminCoupon', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('updateAdminCoupon', false)
    }
  }

  // 관리자 쿠폰 삭제 테스트
  const testDeleteAdminCoupon = async () => {
    setLoadingState('deleteAdminCoupon', true)
    try {
      const result = await deleteAdminCoupon(formData.couponId)
      updateResult('deleteAdminCoupon', { success: true, data: result })
    } catch (error) {
      updateResult('deleteAdminCoupon', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('deleteAdminCoupon', false)
    }
  }

  // 전체 랭킹 조회 테스트
  const testGetOverallRankings = async () => {
    setLoadingState('getOverallRankings', true)
    try {
      const result = await getOverallRankings()
      updateResult('getOverallRankings', { success: true, data: result })
    } catch (error) {
      updateResult('getOverallRankings', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getOverallRankings', false)
    }
  }

  // 카테고리별 랭킹 조회 테스트
  const testGetCategoryRankings = async () => {
    setLoadingState('getCategoryRankings', true)
    try {
      const result = await getCategoryRankings(formData.rankingCategory)
      updateResult('getCategoryRankings', { success: true, data: result })
    } catch (error) {
      updateResult('getCategoryRankings', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getCategoryRankings', false)
    }
  }

  // 리뷰 작성 테스트
  const testCreateReview = async () => {
    setLoadingState('createReview', true)
    try {
      const reviewData = {
        content: formData.reviewContent,
        rating: parseInt(formData.rating),
      }
      const result = await createReview(formData.lessonId, reviewData)
      updateResult('createReview', { success: true, data: result })
    } catch (error) {
      updateResult('createReview', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('createReview', false)
    }
  }

  // 사용자 리뷰 조회 테스트
  const testGetUserReviews = async () => {
    setLoadingState('getUserReviews', true)
    try {
      const result = await getUserReviews(formData.userId)
      updateResult('getUserReviews', { success: true, data: result })
    } catch (error) {
      updateResult('getUserReviews', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoadingState('getUserReviews', false)
    }
  }

  const TestCard = useCallback(
    ({ title, children }: { title: string; children: React.ReactNode }) => (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    ),
    [],
  )

  const ResultDisplay = useCallback(
    ({ testName }: { testName: string }) => {
      const result = results[testName]
      if (!result) return null

      return (
        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-medium">
            결과:{' '}
            <span
              className={result.success ? 'text-green-600' : 'text-red-600'}
            >
              {result.success ? '성공' : '실패'}
            </span>
          </h4>
          <Textarea
            value={JSON.stringify(result, null, 2)}
            readOnly
            className="h-32 text-sm"
          />
        </div>
      )
    },
    [results],
  )

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">API 테스트 (테스트 가능 API)</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 회원가입 */}
        <TestCard title="회원가입 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="이메일"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <Input
              placeholder="비밀번호"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <Input
              placeholder="닉네임"
              value={formData.nickname}
              onChange={(e) => handleInputChange('nickname', e.target.value)}
            />
            <Button
              onClick={testSignup}
              disabled={loading.signup}
              className="w-full"
            >
              {loading.signup ? '테스트 중...' : '회원가입 테스트'}
            </Button>
            <ResultDisplay testName="signup" />
          </div>
        </TestCard>

        {/* 로그인 */}
        <TestCard title="로그인 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="이메일"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <Input
              placeholder="비밀번호"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <Button
              onClick={testLogin}
              disabled={loading.login}
              className="w-full"
            >
              {loading.login ? '테스트 중...' : '로그인 테스트'}
            </Button>
            <ResultDisplay testName="login" />
          </div>
        </TestCard>

        {/* 로그아웃 */}
        <TestCard title="로그아웃 (MVP)">
          <div className="space-y-3">
            <p className="text-sm text-gray-600">세션 쿠키로 자동 인증</p>
            <Button
              onClick={testLogout}
              disabled={loading.logout}
              className="w-full"
            >
              {loading.logout ? '테스트 중...' : '로그아웃 테스트'}
            </Button>
            <ResultDisplay testName="logout" />
          </div>
        </TestCard>

        {/* 회원탈퇴 */}
        <TestCard title="회원탈퇴 (1차)">
          <div className="space-y-3">
            <p className="text-sm text-gray-600">세션 쿠키로 자동 인증</p>
            <Button
              onClick={testWithdraw}
              disabled={loading.withdraw}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading.withdraw ? '테스트 중...' : '회원탈퇴 테스트'}
            </Button>
            <ResultDisplay testName="withdraw" />
          </div>
        </TestCard>

        {/* 이메일 인증 발송 */}
        <TestCard title="이메일 인증 발송 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="이메일"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <Button
              onClick={testEmailSend}
              disabled={loading.emailSend}
              className="w-full"
            >
              {loading.emailSend ? '테스트 중...' : '이메일 인증 발송 테스트'}
            </Button>
            <ResultDisplay testName="emailSend" />
          </div>
        </TestCard>

        {/* 이메일 인증 확인 */}
        <TestCard title="이메일 인증 확인 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="이메일"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <Input
              placeholder="인증 코드"
              value={formData.verificationCode}
              onChange={(e) =>
                handleInputChange('verificationCode', e.target.value)
              }
            />
            <Button
              onClick={testEmailCheck}
              disabled={loading.emailCheck}
              className="w-full"
            >
              {loading.emailCheck ? '테스트 중...' : '이메일 인증 확인 테스트'}
            </Button>
            <ResultDisplay testName="emailCheck" />
          </div>
        </TestCard>

        {/* 닉네임 중복 확인 */}
        <TestCard title="닉네임 중복 확인 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="확인할 닉네임"
              value={formData.checkNickname}
              onChange={(e) =>
                handleInputChange('checkNickname', e.target.value)
              }
            />
            <Button
              onClick={testNicknameCheck}
              disabled={loading.nicknameCheck}
              className="w-full"
            >
              {loading.nicknameCheck
                ? '테스트 중...'
                : '닉네임 중복 확인 테스트'}
            </Button>
            <ResultDisplay testName="nicknameCheck" />
          </div>
        </TestCard>

        {/* 현재 로그인 사용자 정보 조회 */}
        <TestCard title="현재 로그인 사용자 정보 조회 (1차)">
          <div className="space-y-3">
            <p className="text-sm text-gray-600">세션 쿠키로 자동 인증</p>
            <Button
              onClick={testGetCurrentUser}
              disabled={loading.getCurrentUser}
              className="w-full"
            >
              {loading.getCurrentUser
                ? '테스트 중...'
                : '현재 사용자 정보 조회 테스트'}
            </Button>
            <ResultDisplay testName="getCurrentUser" />
          </div>
        </TestCard>

        {/* 비밀번호 변경 */}
        <TestCard title="비밀번호 변경 (1차)">
          <div className="space-y-3">
            <Input
              placeholder="현재 비밀번호"
              type="password"
              value={formData.currentPassword}
              onChange={(e) =>
                handleInputChange('currentPassword', e.target.value)
              }
            />
            <Input
              placeholder="새 비밀번호"
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
            />
            <Input
              placeholder="새 비밀번호 확인"
              type="password"
              value={formData.newConfirmPassword}
              onChange={(e) =>
                handleInputChange('newConfirmPassword', e.target.value)
              }
            />
            <Button
              onClick={testChangePassword}
              disabled={loading.changePassword}
              className="w-full"
            >
              {loading.changePassword ? '테스트 중...' : '비밀번호 변경 테스트'}
            </Button>
            <ResultDisplay testName="changePassword" />
          </div>
        </TestCard>

        {/* 프로필 조회 */}
        <TestCard title="프로필 조회 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="사용자 ID"
              value={formData.profileUserId}
              onChange={(e) =>
                handleInputChange('profileUserId', e.target.value)
              }
            />
            <p className="text-sm text-gray-600">
              특정 사용자의 프로필 정보를 조회합니다.
            </p>
            <Button
              onClick={testGetProfile}
              disabled={loading.getProfile}
              className="w-full"
            >
              {loading.getProfile ? '테스트 중...' : '프로필 조회 테스트'}
            </Button>
            <ResultDisplay testName="getProfile" />
          </div>
        </TestCard>

        {/* 프로필 이미지 수정 */}
        <TestCard title="프로필 이미지 수정 (MVP)">
          <div className="space-y-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                이미지 파일 선택
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />
              {selectedFile && (
                <p className="mt-1 text-sm text-green-600">
                  선택된 파일: {selectedFile.name}
                </p>
              )}
            </div>
            <p className="text-sm text-gray-600">
              S3에 이미지 업로드 후 프로필 이미지를 변경합니다.
            </p>
            <Button
              onClick={testUpdateProfileImage}
              disabled={loading.updateProfileImage || !selectedFile}
              className="w-full"
            >
              {loading.updateProfileImage
                ? '테스트 중...'
                : '프로필 이미지 수정 테스트'}
            </Button>
            <ResultDisplay testName="updateProfileImage" />
          </div>
        </TestCard>

        {/* 개설한 레슨 목록 조회 */}
        <TestCard title="개설한 레슨 목록 조회 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="사용자 ID"
              value={formData.profileUserId}
              onChange={(e) =>
                handleInputChange('profileUserId', e.target.value)
              }
            />
            <p className="text-sm text-gray-600">
              특정 사용자가 개설한 레슨 목록을 조회합니다.
            </p>
            <Button
              onClick={testGetCreatedLessons}
              disabled={loading.getCreatedLessons}
              className="w-full"
            >
              {loading.getCreatedLessons
                ? '테스트 중...'
                : '개설한 레슨 목록 조회 테스트'}
            </Button>
            <ResultDisplay testName="getCreatedLessons" />
          </div>
        </TestCard>

        {/* 댓글 생성 */}
        <TestCard title="댓글 생성 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="레슨 ID"
              value={formData.lessonId}
              onChange={(e) => handleInputChange('lessonId', e.target.value)}
            />
            <Input
              placeholder="댓글 내용"
              value={formData.commentContent}
              onChange={(e) =>
                handleInputChange('commentContent', e.target.value)
              }
            />
            <Button
              onClick={testCreateComment}
              disabled={loading.createComment}
              className="w-full"
            >
              {loading.createComment ? '테스트 중...' : '댓글 생성 테스트'}
            </Button>
            <ResultDisplay testName="createComment" />
          </div>
        </TestCard>

        {/* 댓글 조회 */}
        <TestCard title="댓글 조회 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="레슨 ID"
              value={formData.lessonId}
              onChange={(e) => handleInputChange('lessonId', e.target.value)}
            />
            <Button
              onClick={testGetComments}
              disabled={loading.getComments}
              className="w-full"
            >
              {loading.getComments ? '테스트 중...' : '댓글 조회 테스트'}
            </Button>
            <ResultDisplay testName="getComments" />
          </div>
        </TestCard>

        {/* 댓글 삭제 */}
        <TestCard title="댓글 삭제 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="댓글 ID"
              value={formData.commentId}
              onChange={(e) => handleInputChange('commentId', e.target.value)}
            />
            <Button
              onClick={testDeleteComment}
              disabled={loading.deleteComment}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading.deleteComment ? '테스트 중...' : '댓글 삭제 테스트'}
            </Button>
            <ResultDisplay testName="deleteComment" />
          </div>
        </TestCard>

        {/* 레슨 목록 조회 */}
        <TestCard title="레슨 목록 조회 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="카테고리 (all, 요가, 헬스, 댄스, 기타)"
              value={formData.lessonSearchCategory}
              onChange={(e) =>
                handleInputChange('lessonSearchCategory', e.target.value)
              }
            />
            <Input
              placeholder="도시"
              value={formData.lessonSearchCity}
              onChange={(e) =>
                handleInputChange('lessonSearchCity', e.target.value)
              }
            />
            <Input
              placeholder="구"
              value={formData.lessonSearchDistrict}
              onChange={(e) =>
                handleInputChange('lessonSearchDistrict', e.target.value)
              }
            />
            <Input
              placeholder="동"
              value={formData.lessonSearchDong}
              onChange={(e) =>
                handleInputChange('lessonSearchDong', e.target.value)
              }
            />
            <Button
              onClick={testGetLessons}
              disabled={loading.getLessons}
              className="w-full"
            >
              {loading.getLessons ? '테스트 중...' : '레슨 목록 조회 테스트'}
            </Button>
            <ResultDisplay testName="getLessons" />
          </div>
        </TestCard>

        {/* 레슨 상세 조회 */}
        <TestCard title="레슨 상세 조회 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="레슨 ID"
              value={formData.lessonId}
              onChange={(e) => handleInputChange('lessonId', e.target.value)}
            />
            <Button
              onClick={testGetLessonDetail}
              disabled={loading.getLessonDetail}
              className="w-full"
            >
              {loading.getLessonDetail
                ? '테스트 중...'
                : '레슨 상세 조회 테스트'}
            </Button>
            <ResultDisplay testName="getLessonDetail" />
          </div>
        </TestCard>

        {/* 레슨 신청 */}
        <TestCard title="레슨 신청 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="레슨 ID"
              value={formData.lessonId}
              onChange={(e) => handleInputChange('lessonId', e.target.value)}
            />
            <Button
              onClick={testApplyLesson}
              disabled={loading.applyLesson}
              className="w-full"
            >
              {loading.applyLesson ? '테스트 중...' : '레슨 신청 테스트'}
            </Button>
            <ResultDisplay testName="applyLesson" />
          </div>
        </TestCard>

        {/* 레슨 신청 취소 */}
        <TestCard title="레슨 신청 취소 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="레슨 ID"
              value={formData.lessonId}
              onChange={(e) => handleInputChange('lessonId', e.target.value)}
            />
            <Button
              onClick={testCancelLessonApplication}
              disabled={loading.cancelLessonApplication}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading.cancelLessonApplication
                ? '테스트 중...'
                : '레슨 신청 취소 테스트'}
            </Button>
            <ResultDisplay testName="cancelLessonApplication" />
          </div>
        </TestCard>

        {/* 내 레슨 신청 목록 */}
        <TestCard title="내 레슨 신청 목록 (MVP)">
          <div className="space-y-3">
            <Button
              onClick={testGetMyLessonApplications}
              disabled={loading.getMyLessonApplications}
              className="w-full"
            >
              {loading.getMyLessonApplications
                ? '테스트 중...'
                : '내 레슨 신청 목록 테스트'}
            </Button>
            <ResultDisplay testName="getMyLessonApplications" />
          </div>
        </TestCard>

        {/* 레슨 요약 정보 */}
        <TestCard title="레슨 요약 정보 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="레슨 ID"
              value={formData.lessonId}
              onChange={(e) => handleInputChange('lessonId', e.target.value)}
            />
            <Button
              onClick={testGetLessonSummary}
              disabled={loading.getLessonSummary}
              className="w-full"
            >
              {loading.getLessonSummary
                ? '테스트 중...'
                : '레슨 요약 정보 테스트'}
            </Button>
            <ResultDisplay testName="getLessonSummary" />
          </div>
        </TestCard>

        {/* 레슨 생성 */}
        <TestCard title="레슨 생성 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="레슨 이름"
              value={formData.lessonName}
              onChange={(e) => handleInputChange('lessonName', e.target.value)}
            />
            <Input
              placeholder="설명"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <Input
              placeholder="카테고리 (요가, 헬스, 댄스, 기타)"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            />
            <Input
              placeholder="가격"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
            />
            <Input
              placeholder="최대 참가자 수"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) =>
                handleInputChange('maxParticipants', e.target.value)
              }
            />
            <Input
              placeholder="시작 시간 (YYYY-MM-DDTHH:MM:SSZ)"
              value={formData.startAt}
              onChange={(e) => handleInputChange('startAt', e.target.value)}
            />
            <Input
              placeholder="종료 시간 (YYYY-MM-DDTHH:MM:SSZ)"
              value={formData.endAt}
              onChange={(e) => handleInputChange('endAt', e.target.value)}
            />
            <Input
              placeholder="개강 시간 (YYYY-MM-DDTHH:MM:SSZ)"
              value={formData.openTime}
              onChange={(e) => handleInputChange('openTime', e.target.value)}
            />
            <Input
              placeholder="개강 여부 (true/false)"
              type="checkbox"
              checked={formData.openRun}
              onChange={(e) =>
                handleInputChange('openRun', e.target.checked.toString())
              }
            />
            <Input
              placeholder="도시"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
            <Input
              placeholder="구"
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
            />
            <Input
              placeholder="동"
              value={formData.dong}
              onChange={(e) => handleInputChange('dong', e.target.value)}
            />
            <Input
              placeholder="상세 주소"
              value={formData.addressDetail}
              onChange={(e) =>
                handleInputChange('addressDetail', e.target.value)
              }
            />
            <Button
              onClick={testCreateLesson}
              disabled={loading.createLesson}
              className="w-full"
            >
              {loading.createLesson ? '테스트 중...' : '레슨 생성 테스트'}
            </Button>
            <ResultDisplay testName="createLesson" />
          </div>
        </TestCard>

        {/* 레슨 삭제 */}
        <TestCard title="레슨 삭제 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="레슨 ID"
              value={formData.lessonId}
              onChange={(e) => handleInputChange('lessonId', e.target.value)}
            />
            <Button
              onClick={testDeleteLesson}
              disabled={loading.deleteLesson}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading.deleteLesson ? '테스트 중...' : '레슨 삭제 테스트'}
            </Button>
            <ResultDisplay testName="deleteLesson" />
          </div>
        </TestCard>

        {/* 결제 준비 */}
        <TestCard title="결제 준비 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="레슨 ID"
              value={formData.lessonId}
              onChange={(e) => handleInputChange('lessonId', e.target.value)}
            />
            <Input
              placeholder="결제 금액"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
            />
            <Input
              placeholder="주문 ID"
              value={formData.orderId}
              onChange={(e) => handleInputChange('orderId', e.target.value)}
            />
            <Button
              onClick={testPreparePayment}
              disabled={loading.preparePayment}
              className="w-full"
            >
              {loading.preparePayment ? '테스트 중...' : '결제 준비 테스트'}
            </Button>
            <ResultDisplay testName="preparePayment" />
          </div>
        </TestCard>

        {/* 결제 내역 저장 */}
        <TestCard title="결제 내역 저장 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="주문 ID"
              value={formData.orderId}
              onChange={(e) => handleInputChange('orderId', e.target.value)}
            />
            <Input
              placeholder="결제 금액"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
            />
            <Button
              onClick={testSaveAmount}
              disabled={loading.saveAmount}
              className="w-full"
            >
              {loading.saveAmount ? '테스트 중...' : '결제 내역 저장 테스트'}
            </Button>
            <ResultDisplay testName="saveAmount" />
          </div>
        </TestCard>

        {/* 결제 내역 확인 */}
        <TestCard title="결제 내역 확인 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="주문 ID"
              value={formData.orderId}
              onChange={(e) => handleInputChange('orderId', e.target.value)}
            />
            <Input
              placeholder="결제 금액"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
            />
            <Button
              onClick={testVerifyAmount}
              disabled={loading.verifyAmount}
              className="w-full"
            >
              {loading.verifyAmount ? '테스트 중...' : '결제 내역 확인 테스트'}
            </Button>
            <ResultDisplay testName="verifyAmount" />
          </div>
        </TestCard>

        {/* 결제 승인 */}
        <TestCard title="결제 승인 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="결제 키"
              value={formData.paymentKey}
              onChange={(e) => handleInputChange('paymentKey', e.target.value)}
            />
            <Input
              placeholder="주문 ID"
              value={formData.orderId}
              onChange={(e) => handleInputChange('orderId', e.target.value)}
            />
            <Input
              placeholder="결제 금액"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
            />
            <Button
              onClick={testConfirmPayment}
              disabled={loading.confirmPayment}
              className="w-full"
            >
              {loading.confirmPayment ? '테스트 중...' : '결제 승인 테스트'}
            </Button>
            <ResultDisplay testName="confirmPayment" />
          </div>
        </TestCard>

        {/* 결제 취소 */}
        <TestCard title="결제 취소 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="결제 키"
              value={formData.paymentKey}
              onChange={(e) => handleInputChange('paymentKey', e.target.value)}
            />
            <Input
              placeholder="취소 사유"
              value={formData.cancelReason}
              onChange={(e) =>
                handleInputChange('cancelReason', e.target.value)
              }
            />
            <Button
              onClick={testCancelPayment}
              disabled={loading.cancelPayment}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading.cancelPayment ? '테스트 중...' : '결제 취소 테스트'}
            </Button>
            <ResultDisplay testName="cancelPayment" />
          </div>
        </TestCard>

        {/* 결제 성공 내역 조회 */}
        <TestCard title="결제 성공 내역 조회 (MVP)">
          <div className="space-y-3">
            <Button
              onClick={testGetPaymentSuccess}
              disabled={loading.getPaymentSuccess}
              className="w-full"
            >
              {loading.getPaymentSuccess
                ? '테스트 중...'
                : '결제 성공 내역 조회 테스트'}
            </Button>
            <ResultDisplay testName="getPaymentSuccess" />
          </div>
        </TestCard>

        {/* 결제 취소 내역 조회 */}
        <TestCard title="결제 취소 내역 조회 (MVP)">
          <div className="space-y-3">
            <Button
              onClick={testGetPaymentCancel}
              disabled={loading.getPaymentCancel}
              className="w-full"
            >
              {loading.getPaymentCancel
                ? '테스트 중...'
                : '결제 취소 내역 조회 테스트'}
            </Button>
            <ResultDisplay testName="getPaymentCancel" />
          </div>
        </TestCard>

        {/* 발급 가능한 쿠폰 목록 */}
        <TestCard title="발급 가능한 쿠폰 목록 (MVP)">
          <div className="space-y-3">
            <Button
              onClick={testGetAvailableCoupons}
              disabled={loading.getAvailableCoupons}
              className="w-full"
            >
              {loading.getAvailableCoupons
                ? '테스트 중...'
                : '발급 가능한 쿠폰 목록 테스트'}
            </Button>
            <ResultDisplay testName="getAvailableCoupons" />
          </div>
        </TestCard>

        {/* 내 쿠폰 목록 */}
        <TestCard title="내 쿠폰 목록 (MVP)">
          <div className="space-y-3">
            <Button
              onClick={testGetMyCoupons}
              disabled={loading.getMyCoupons}
              className="w-full"
            >
              {loading.getMyCoupons ? '테스트 중...' : '내 쿠폰 목록 테스트'}
            </Button>
            <ResultDisplay testName="getMyCoupons" />
          </div>
        </TestCard>

        {/* 쿠폰 발급 */}
        <TestCard title="쿠폰 발급 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="쿠폰 ID"
              value={formData.couponId}
              onChange={(e) => handleInputChange('couponId', e.target.value)}
            />
            <Button
              onClick={testIssueCoupon}
              disabled={loading.issueCoupon}
              className="w-full"
            >
              {loading.issueCoupon ? '테스트 중...' : '쿠폰 발급 테스트'}
            </Button>
            <ResultDisplay testName="issueCoupon" />
          </div>
        </TestCard>

        {/* 쿠폰 사용 */}
        <TestCard title="쿠폰 사용 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="사용자 ID"
              value={formData.userId}
              onChange={(e) => handleInputChange('userId', e.target.value)}
            />
            <Input
              placeholder="쿠폰 ID"
              value={formData.couponId}
              onChange={(e) => handleInputChange('couponId', e.target.value)}
            />
            <Button
              onClick={testUseCoupon}
              disabled={loading.useCoupon}
              className="w-full"
            >
              {loading.useCoupon ? '테스트 중...' : '쿠폰 사용 테스트'}
            </Button>
            <ResultDisplay testName="useCoupon" />
          </div>
        </TestCard>

        {/* 관리자 쿠폰 생성 */}
        <TestCard title="관리자 쿠폰 생성 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="쿠폰 이름"
              value={formData.couponName}
              onChange={(e) => handleInputChange('couponName', e.target.value)}
            />
            <Input
              placeholder="할인율"
              type="number"
              value={formData.discountRate}
              onChange={(e) =>
                handleInputChange('discountRate', e.target.value)
              }
            />
            <Input
              placeholder="최소 주문 금액"
              type="number"
              value={formData.minOrderAmount}
              onChange={(e) =>
                handleInputChange('minOrderAmount', e.target.value)
              }
            />
            <Button
              onClick={testCreateAdminCoupon}
              disabled={loading.createAdminCoupon}
              className="w-full"
            >
              {loading.createAdminCoupon
                ? '테스트 중...'
                : '관리자 쿠폰 생성 테스트'}
            </Button>
            <ResultDisplay testName="createAdminCoupon" />
          </div>
        </TestCard>

        {/* 관리자 쿠폰 목록 */}
        <TestCard title="관리자 쿠폰 목록 (MVP)">
          <div className="space-y-3">
            <Button
              onClick={testGetAdminCoupons}
              disabled={loading.getAdminCoupons}
              className="w-full"
            >
              {loading.getAdminCoupons
                ? '테스트 중...'
                : '관리자 쿠폰 목록 테스트'}
            </Button>
            <ResultDisplay testName="getAdminCoupons" />
          </div>
        </TestCard>

        {/* 관리자 쿠폰 상세 조회 */}
        <TestCard title="관리자 쿠폰 상세 조회 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="쿠폰 ID"
              value={formData.couponId}
              onChange={(e) => handleInputChange('couponId', e.target.value)}
            />
            <Button
              onClick={testGetAdminCouponDetail}
              disabled={loading.getAdminCouponDetail}
              className="w-full"
            >
              {loading.getAdminCouponDetail
                ? '테스트 중...'
                : '관리자 쿠폰 상세 조회 테스트'}
            </Button>
            <ResultDisplay testName="getAdminCouponDetail" />
          </div>
        </TestCard>

        {/* 관리자 쿠폰 수정 */}
        <TestCard title="관리자 쿠폰 수정 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="쿠폰 ID"
              value={formData.couponId}
              onChange={(e) => handleInputChange('couponId', e.target.value)}
            />
            <Input
              placeholder="쿠폰 이름"
              value={formData.couponName}
              onChange={(e) => handleInputChange('couponName', e.target.value)}
            />
            <Input
              placeholder="할인율"
              type="number"
              value={formData.discountRate}
              onChange={(e) =>
                handleInputChange('discountRate', e.target.value)
              }
            />
            <Input
              placeholder="최소 주문 금액"
              type="number"
              value={formData.minOrderAmount}
              onChange={(e) =>
                handleInputChange('minOrderAmount', e.target.value)
              }
            />
            <Button
              onClick={testUpdateAdminCoupon}
              disabled={loading.updateAdminCoupon}
              className="w-full"
            >
              {loading.updateAdminCoupon
                ? '테스트 중...'
                : '관리자 쿠폰 수정 테스트'}
            </Button>
            <ResultDisplay testName="updateAdminCoupon" />
          </div>
        </TestCard>

        {/* 관리자 쿠폰 삭제 */}
        <TestCard title="관리자 쿠폰 삭제 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="쿠폰 ID"
              value={formData.couponId}
              onChange={(e) => handleInputChange('couponId', e.target.value)}
            />
            <Button
              onClick={testDeleteAdminCoupon}
              disabled={loading.deleteAdminCoupon}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading.deleteAdminCoupon
                ? '테스트 중...'
                : '관리자 쿠폰 삭제 테스트'}
            </Button>
            <ResultDisplay testName="deleteAdminCoupon" />
          </div>
        </TestCard>

        {/* 전체 랭킹 조회 */}
        <TestCard title="전체 랭킹 조회 (MVP)">
          <div className="space-y-3">
            <Button
              onClick={testGetOverallRankings}
              disabled={loading.getOverallRankings}
              className="w-full"
            >
              {loading.getOverallRankings
                ? '테스트 중...'
                : '전체 랭킹 조회 테스트'}
            </Button>
            <ResultDisplay testName="getOverallRankings" />
          </div>
        </TestCard>

        {/* 카테고리별 랭킹 조회 */}
        <TestCard title="카테고리별 랭킹 조회 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="카테고리 (YOGA, FITNESS, DANCE, ETC)"
              value={formData.rankingCategory}
              onChange={(e) =>
                handleInputChange('rankingCategory', e.target.value)
              }
            />
            <Button
              onClick={testGetCategoryRankings}
              disabled={loading.getCategoryRankings}
              className="w-full"
            >
              {loading.getCategoryRankings
                ? '테스트 중...'
                : '카테고리별 랭킹 조회 테스트'}
            </Button>
            <ResultDisplay testName="getCategoryRankings" />
          </div>
        </TestCard>

        {/* 리뷰 작성 */}
        <TestCard title="리뷰 작성 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="레슨 ID"
              value={formData.lessonId}
              onChange={(e) => handleInputChange('lessonId', e.target.value)}
            />
            <Input
              placeholder="리뷰 내용"
              value={formData.reviewContent}
              onChange={(e) =>
                handleInputChange('reviewContent', e.target.value)
              }
            />
            <Input
              placeholder="평점 (1-5)"
              type="number"
              value={formData.rating}
              onChange={(e) => handleInputChange('rating', e.target.value)}
            />
            <Button
              onClick={testCreateReview}
              disabled={loading.createReview}
              className="w-full"
            >
              {loading.createReview ? '테스트 중...' : '리뷰 작성 테스트'}
            </Button>
            <ResultDisplay testName="createReview" />
          </div>
        </TestCard>

        {/* 사용자 리뷰 조회 */}
        <TestCard title="사용자 리뷰 조회 (MVP)">
          <div className="space-y-3">
            <Input
              placeholder="사용자 ID"
              value={formData.userId}
              onChange={(e) => handleInputChange('userId', e.target.value)}
            />
            <Button
              onClick={testGetUserReviews}
              disabled={loading.getUserReviews}
              className="w-full"
            >
              {loading.getUserReviews
                ? '테스트 중...'
                : '사용자 리뷰 조회 테스트'}
            </Button>
            <ResultDisplay testName="getUserReviews" />
          </div>
        </TestCard>
      </div>

      {/* 전체 결과 요약 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>테스트 결과 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Object.entries(results).map(([testName, result]) => (
              <div key={testName} className="rounded-lg bg-gray-50 p-3">
                <div className="text-sm font-medium">{testName}</div>
                <div
                  className={`text-xs ${result.success ? 'text-green-600' : 'text-red-600'}`}
                >
                  {result.success ? '✅ 성공' : '❌ 실패'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
