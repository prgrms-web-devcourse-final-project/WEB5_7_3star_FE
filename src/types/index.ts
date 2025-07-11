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
  success: boolean
  data?: T
  error?: string
  message?: string
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
