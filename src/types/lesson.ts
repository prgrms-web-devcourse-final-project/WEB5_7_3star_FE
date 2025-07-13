export interface Lesson {
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
  createdAt: string
  likeCount: number
  reviewCount: number
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
  category: string
  search?: string
  city: string
  district: string
  dong: string
}

export interface LessonListResponse {
  status: string
  message: string
  data: {
    lessons: Lesson[]
  }
  count: number
}
