// User types
export interface User {
  id: string
  email: string
  name: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}

// Lesson types
export interface Lesson {
  id: string
  title: string
  description: string
  instructor: User
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  duration: number // minutes
  maxStudents: number
  currentStudents: number
  location: string
  startDate: Date
  endDate: Date
  imageUrl?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

// API Lesson types (for backend API)
export interface ApiLesson {
  id: number
  lessonName: string
  lessonLeader: number
  category: string
  price: number
  maxParticipants: number
  currentParticipants: number
  status: LessonStatus
  startAt: string
  endAt: string
  openTime: string
  openRun: boolean
  city: string
  district: string
  dong: string
  ri?: string | null
  createdAt: string
  likeCount: number
  reviewCount: number
}

// 레슨 상세 조회용 타입
export interface ApiLessonDetail {
  id: number
  lessonName: string
  description: string
  lessonLeader: number
  lessonLeaderName: string
  profileIntro: string
  profileImage: string
  likeCount: number
  reviewCount: number
  rating: number
  category: string
  price: number
  maxParticipants: number
  currentParticipants: number
  status: LessonStatus
  startAt: string
  endAt: string
  openTime: string
  openRun: boolean
  city: string
  district: string
  dong: string
  ri?: string | null
  addressDetail: string
  createdAt: string
  updatedAt: string
  lessonImages: string[]
}

export enum LessonStatus {
  RECRUITING = '모집중',
  RECRUITMENT_COMPLETED = '모집완료',
  IN_PROGRESS = '진행중',
  COMPLETED = '완료',
  CANCELLED = '취소',
}

export interface LessonSearchParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  city: string
  district: string
  dong: string
}

export interface LessonListResponse {
  status: string
  message: string
  data: {
    lessons: ApiLesson[]
  }
  count: number
}

// 레슨 신청 관련 타입
export enum ApplicationStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export interface LessonApplication {
  lessonApplicationId: number
  lessonId: number
  userId: number
  status: ApplicationStatus
  appliedAt: string
}

export interface LessonApplicationResponse {
  status: number
  message: string
  data: LessonApplication
}

// 내 레슨 신청 목록 관련 타입
export enum ApplicationStatusFilter {
  ALL = 'ALL',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
}

export interface MyLessonApplication {
  lessonApplicationId: number
  lesson: {
    id: number
    lessonName: string
    lessonLeader: number
    startAt: string
    price: number
    addressDetail: string
  }
  status: ApplicationStatus
  appliedAt: string
}

export interface MyLessonApplicationsResponse {
  status: number
  message: string
  data: {
    lessonApplications: MyLessonApplication[]
  }
  count: number
}

export interface MyLessonApplicationsParams {
  page?: number
  limit?: number
  status?: ApplicationStatusFilter
}

// 레슨 간략 조회 관련 타입
export interface LessonSummary {
  lessonId: number
  lessonName: string
  startAt: string
  endAt: string
  price: number
  addressDetail: string
}

export interface LessonSummaryResponse {
  status: string
  message: string
  data: LessonSummary
}

// 레슨 생성 관련 타입
export interface CreateLessonRequest {
  lessonName: string
  description: string
  category: string
  price: number
  maxParticipants: number
  startAt: string
  endAt: string
  openTime?: string
  openRun: boolean
  city: string
  district: string
  dong: string
  ri?: string | null
  addressDetail: string
  lessonImages: string[]
}

export interface CreateLessonResponse {
  status: string
  message: string
  data: {
    id: number
    lessonName: string
    description: string
    lessonLeader: number
    category: string
    price: number
    maxParticipants: number
    startAt: string
    endAt: string
    openTime: string
    openRun: boolean
    city: string
    district: string
    dong: string
    ri?: string | null
    addressDetail: string
    status: LessonStatus
    createdAt: string
    lessonImages: string[]
  }
}

// 레슨 신청자 목록 관련 타입
export interface LessonApplicant {
  lessonApplicationId: number
  user: {
    id: number
    nickname: string
    profileImage: string
  }
  status: ApplicationStatus
  appliedAt: string
}

export interface LessonApplicantsResponse {
  status: number
  message: string
  data: {
    lessonApplications: LessonApplicant[]
    totalCount: number
  }
}

export interface LessonApplicantsParams {
  page?: number
  limit?: number
  status?: ApplicationStatusFilter
}

// 레슨 신청 승인/거절 관련 타입
export enum ApplicationAction {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
}

export interface ProcessApplicationRequest {
  action: ApplicationAction
}

export interface ProcessApplicationResponse {
  status: string
  message: string
  data: {
    lessonApplicationId: number
    userId: number
    status: ApplicationStatus
    processedAt: string
  }
}

// 레슨 참가자 목록 관련 타입
export interface LessonParticipant {
  lessonApplicationId: number
  user: {
    id: number
    nickname: string
    profileImage: string
  }
  joinedAt: string
}

export interface LessonParticipantsResponse {
  status: number
  message: string
  data: {
    lessonApplications: LessonParticipant[]
    count: number
  }
}

export interface LessonParticipantsParams {
  page?: number
  limit?: number
}

// 개설한 레슨 목록 관련 타입
export interface CreatedLesson {
  id: number
  lessonName: string
  maxParticipants: number
  currentParticipants: number
  price: number
  status: LessonStatus
  startAt: string
  endAt: string
  openRun: boolean
  addressDetail: string
}

export interface CreatedLessonsResponse {
  status: number
  message: string
  data: {
    lessons: CreatedLesson[]
    count: number
  }
}

export interface CreatedLessonsParams {
  page?: number
  limit?: number
  status?: LessonStatus
}

// 랭킹 관련 타입
export interface TrainerRanking {
  rank: number
  userId: number
  userNickname: string
  avgRating: number
  reviewCount: number
  category: string
  profileImage: string
}

export interface RankingsResponse {
  status: number
  message: string
  data: {
    rankings: TrainerRanking[]
  }
}

export interface RankingsParams {
  category: string
  limit?: number
}

// 쿠폰 발급 관련 타입
export enum CouponStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IssueCouponResponse {
  status: number
  message: string
  data: {
    couponId: number
    userId: number
    createdAt: string
    expirationDate: string
    status: CouponStatus
  }
}

// 내 쿠폰 목록 관련 타입
export interface MyUserCoupon {
  couponId: number
  couponName: string
  discountPrice: string
  minOrderPrice: number
  expirationDate: string
  status: CouponStatus
  useDate: string | null
}

export interface MyCouponsResponse {
  status: string
  message: string
  data: {
    userCoupons: MyUserCoupon[]
  }
}

export interface MyCouponsParams {
  status?: CouponStatus
}

// 사용 가능한 쿠폰 관련 타입
export interface AvailableCoupon {
  couponId: number
  couponName: string
  discountPrice: string
  minOrderPrice: number
  expirationDate: string
  status: string
  used: boolean
}

export interface AvailableCouponsResponse {
  status: string
  message: string
  data: {
    coupons: AvailableCoupon[]
  }
}

export interface AvailableCouponsParams {
  status: string
  expired?: boolean
}

// 발급 가능한 쿠폰 관련 타입
export enum OwnedStatus {
  OWNED = 'OWNED',
  NOT_OWNED = 'NOT_OWNED',
}

export interface IssuableCoupon {
  couponId: number
  couponName: string
  discountPrice: string
  minOrderPrice: number
  expirationDate: string
  ownedStatus: OwnedStatus
  quantity: number
  category: string
  openTime: string
}

export interface IssuableCouponsResponse {
  status: string
  message: string
  data: {
    coupons: IssuableCoupon[]
  }
}

// API 응답 타입
export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

// Coupon types
export interface Coupon {
  id: string
  title: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minAmount: number
  maxDiscount?: number
  validFrom: Date
  validUntil: Date
  isActive: boolean
  createdAt: Date
}

export interface UserCoupon {
  id: string
  userId: string
  couponId: string
  coupon: Coupon
  isUsed: boolean
  usedAt?: Date
  issuedAt: Date
}

// Payment types
export interface Payment {
  id: string
  userId: string
  lessonId: string
  lesson: Lesson
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  paymentMethod: string
  transactionId?: string
  couponId?: string
  coupon?: Coupon
  createdAt: Date
  updatedAt: Date
}

// Search types
export interface SearchFilters {
  category?: string
  level?: string
  priceRange?: [number, number]
  location?: string
  dateRange?: [Date, Date]
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
  }
}

// API Response types
export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Search Lessons 관련 타입
export type SearchLessonsParams = {
  pageRequestDto: {
    page: number
    limit: number
  }
  category?:
    | 'GYM'
    | 'PILATES'
    | 'YOGA'
    | 'RUNNING'
    | 'CYCLING'
    | 'HIKING'
    | 'CLIMBING'
    | 'SWIMMING'
    | 'TENNIS'
    | 'BADMINTON'
    | 'SQUASH'
    | 'FOOTBALL'
    | 'BASKETBALL'
    | 'BASEBALL'
    | 'GOLF'
    | 'DANCE'
    | 'MARTIAL_ARTS'
    | 'CROSS_FIT'
    | 'BOARD_SPORTS'
    | 'ESPORTS'
    | 'TABLE_TENNIS'
    | 'VOLLEYBALL'
    | 'BOXING'
    | 'KICKBOXING'
    | 'FENCING'
    | 'ARCHERY'
    | 'INLINE_SKATING'
    | 'SKATING'
    | 'SURFING'
    | 'HORSE_RIDING'
    | 'SKIING'
    | 'SNOWBOARDING'
    | 'TRIATHLON'
    | 'SPORTS_WATCHING_PARTY'
    | 'ETC'
  search?: string
  city: string
  district: string
  dong: string
  ri?: string | null
  sortBy?: 'LATEST' | 'OLDEST' | 'PRICE_HIGH' | 'PRICE_LOW'
}

export type Category = SearchLessonsParams['category']
export type SortBy = SearchLessonsParams['sortBy']

// User 관련 타입 (role 추가)
export type UserRole = 'USER' | 'ADMIN'

// Comment 관련 타입 (nickname 추가)
export interface Comment {
  id: number
  userId: number
  nickname: string
  content: string
  parentCommentId: number | null
  deleted: boolean
  createdAt: string
  replies?: Comment[]
}

// UserInfoResponseDto 타입 확장 (email, role 필드 추가)
export interface UserInfoResponseDto {
  userId?: number
  nickname?: string
  email?: string
  role?: string
}

// LoginResponseDto 타입 확장 (email, role 필드 추가)
export interface LoginResponseDto {
  id?: number
  email?: string
  nickname?: string
  role?: string
}
