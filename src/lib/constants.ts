// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  LESSONS: {
    LIST: '/api/lessons',
    DETAIL: (id: string) => `/api/lessons/${id}`,
    CREATE: '/api/lessons',
    UPDATE: (id: string) => `/api/lessons/${id}`,
    DELETE: (id: string) => `/api/lessons/${id}`,
    APPLY: (id: string) => `/api/lessons/${id}/apply`,
  },
  COUPONS: {
    LIST: '/api/coupons',
    ISSUE: (id: string) => `/api/coupons/${id}/issue`,
    USER_COUPONS: '/api/user/coupons',
  },
  PAYMENTS: {
    CREATE: '/api/payments',
    DETAIL: (id: string) => `/api/payments/${id}`,
    CANCEL: (id: string) => `/api/payments/${id}/cancel`,
  },
  USERS: {
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
  },
} as const

// Lesson categories
export const LESSON_CATEGORIES = [
  '피트니스',
  '요가',
  '필라테스',
  '스포츠',
  '댄스',
  '음악',
  '언어',
  '요리',
  '미술',
  '기타',
] as const

// Lesson levels
export const LESSON_LEVELS = [
  { value: 'beginner', label: '초급' },
  { value: 'intermediate', label: '중급' },
  { value: 'advanced', label: '고급' },
] as const

// Payment methods
export const PAYMENT_METHODS = [
  { value: 'card', label: '신용카드' },
  { value: 'bank_transfer', label: '계좌이체' },
  { value: 'kakao_pay', label: '카카오페이' },
  { value: 'naver_pay', label: '네이버페이' },
] as const

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^01[0-9]-\d{3,4}-\d{4}$/,
  PASSWORD:
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
} as const

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED: '필수 입력 항목입니다.',
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다.',
  INVALID_PHONE: '올바른 전화번호 형식이 아닙니다.',
  PASSWORD_TOO_WEAK:
    '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: '로그인되었습니다.',
  REGISTER: '회원가입이 완료되었습니다.',
  LOGOUT: '로그아웃되었습니다.',
  PROFILE_UPDATE: '프로필이 업데이트되었습니다.',
  LESSON_CREATE: '레슨이 등록되었습니다.',
  LESSON_UPDATE: '레슨이 수정되었습니다.',
  LESSON_DELETE: '레슨이 삭제되었습니다.',
  LESSON_APPLY: '레슨 신청이 완료되었습니다.',
  COUPON_ISSUE: '쿠폰이 발급되었습니다.',
  PAYMENT_COMPLETE: '결제가 완료되었습니다.',
} as const

// Local storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_PROFILE: 'user_profile',
  SEARCH_HISTORY: 'search_history',
  CART_ITEMS: 'cart_items',
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
} as const
