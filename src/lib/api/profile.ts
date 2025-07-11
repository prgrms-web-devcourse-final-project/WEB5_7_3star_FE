import type { UserProfile } from '@/types/profile'

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// 더미 데이터
const dummyProfile: UserProfile = {
  userId: 1,
  nickname: '김수영',
  profileImage: 'https://s3.ap-northeast-2.amazonaws.com/mybucket/puppy.jpg',
  intro:
    '15년 경력의 테니스 전문 강사입니다. 초보자부터 고급자까지 체계적인 지도를 제공합니다.',
  joinDate: '2022.08.20',
  reviewCount: 89,
  likeCount: 156,
  rating: 4.9,
}

export async function getUserProfile(
  userId: number,
): Promise<ApiResponse<UserProfile>> {
  // 실제 API 호출 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    data: dummyProfile,
    message: '프로필 조회 성공',
    success: true,
  }
}

export async function updateUserProfile(
  userId: number,
  profileData: Partial<UserProfile>,
): Promise<ApiResponse<UserProfile>> {
  // 실제 API 호출 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const updatedProfile = { ...dummyProfile, ...profileData }

  return {
    data: updatedProfile,
    message: '프로필 수정 성공',
    success: true,
  }
}

export async function changePassword(
  userId: number,
  currentPassword: string,
  newPassword: string,
): Promise<ApiResponse<null>> {
  // 실제 API 호출 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    data: null,
    message: '비밀번호 변경 성공',
    success: true,
  }
}

export async function getUserLessons(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId: number,
): Promise<any> {
  // Assuming UserLessonsResponse type is not defined, using 'any' for now
  return {
    status: 200,
    message: '개설한 레슨 목록 조회 완료.',
    data: {
      lessons: [
        {
          id: 1,
          lessonName: '이동국의 축구교실',
          maxParticipants: 10,
          currentParticipants: 3,
          price: 40000,
          status: 'RECRUITING',
          startAt: '2025-07-04T10:00:00Z',
          endAt: '2025-07-04T10:00:00Z',
          openRun: true,
          addressDetail: '고양이 아파트 101-1504',
        },
      ],
      count: 12,
    },
  }
}

export async function getLessonApplications(userId: number): Promise<any> {
  // Assuming LessonApplicationsResponse type is not defined, using 'any' for now
  return {
    status: 200,
    message: '나의 레슨 신청 목록 조회 완료.',
    data: {
      lessonApplications: [
        {
          lessonApplicationId: 1,
          lesson: {
            id: 2,
            lessonName: '이동국의 축구교실',
            lessonLeader: 21,
            startAt: '2025-07-04T10:00:00Z',
            price: 40000,
            addressDetail: '고양이아파트 운동장 101-1504',
            status: 'RECRUITING',
          },
          status: 'PENDING',
          appliedAt: '2025-07-04T10:00:00Z',
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 12,
        totalCount: 32,
        limit: 5,
      },
    },
  }
}

export async function getPayments(userId: number): Promise<any> {
  // Assuming PaymentsResponse type is not defined, using 'any' for now
  return {
    status: 200,
    message: '결제 목록 조회 성공',
    data: {
      payments: [
        {
          payment_id: '23f0c1f4-7b32-4ec3-b6fc-8c97c59e3d87',
          lesson_id: 12345,
          lesson_name: '요가 초급 클래스',
          origin_price: 30000,
          pay_price: 25000,
          pay_date: '2025-07-04T14:30:00Z',
          status: 'COMPLETED',
          payment_method: 'TOSS_PAY',
          location: '강남점 3층 요가실',
        },
      ],
      pagination: {
        current_page: 1,
        total_pages: 3,
        total_count: 45,
        limit: 20,
        has_next: true,
        has_prev: false,
      },
    },
  }
}

export async function getUserCoupons(userId: number): Promise<any> {
  // Assuming UserCouponsResponse type is not defined, using 'any' for now
  return {
    status: '200',
    message: '사용자 보유 쿠폰 조회 성공',
    data: {
      userCoupons: [
        {
          couponId: 101,
          couponName: '7월 신규회원 쿠폰',
          discountPrice: '3000',
          minOrderPrice: 10000,
          expirationDate: '2025-07-31T23:59:59',
          status: 'ACTIVE',
          useDate: null,
        },
        {
          couponId: 102,
          couponName: '여름 이벤트 쿠폰',
          discountPrice: '40%',
          minOrderPrice: 20000,
          expirationDate: '2025-08-31T23:59:59',
          status: 'INACTIVE',
          useDate: '2025-08-31T23:59:59',
        },
      ],
    },
  }
}
