export interface UserProfile {
  userId: number
  nickname: string
  profileImage: string
  intro: string
  joinDate: string
  reviewCount: number
  likeCount: number
  rating: number
}

export interface Lesson {
  id: number
  lessonName: string
  maxParticipants: number
  currentParticipants: number
  price: number
  status: 'RECRUITING' | 'CLOSED' | 'READY' | 'COMPLETED'
  startAt: string
  addressDetail: string
}

export interface LessonApplication {
  lessonApplicationId: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  user: {
    intro: string
    nickname: string
    profileImage: string
    userId: number
  }
  appliedAt: string
}

export interface Payment {
  id: number
  lessonId: number
  lessonName: string
  amount: number
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  paymentMethod: string
  paidAt: string
}

export interface UserCoupon {
  id: number
  couponId: number
  couponName: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minOrderAmount: number
  expirationDate: string
  status: 'active' | 'used' | 'expired'
  issuedAt: string
  usedAt?: string
}

export interface UserProfileResponse {
  status: string
  message: string
  data: UserProfile
}

export interface UserLessonsResponse {
  status: string | number
  message: string
  data: {
    lessons: Lesson[]
    count: number
  }
}

export interface LessonApplicationsResponse {
  status: number
  message: string
  data: {
    lessonApplications: LessonApplication[]
    pagination: {
      currentPage: number
      totalPages: number
      totalCount: number
      limit: number
    }
  }
}

export interface PaymentsResponse {
  status: number
  message: string
  data: {
    payments: Payment[]
    pagination: {
      current_page: number
      total_pages: number
      total_count: number
      limit: number
      has_next: boolean
      has_prev: boolean
    }
  }
}

export interface UserCouponsResponse {
  status: string
  message: string
  data: {
    userCoupons: UserCoupon[]
  }
}
