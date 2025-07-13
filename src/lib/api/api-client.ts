import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// API 클라이언트 기본 설정
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

class ApiClient {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      withCredentials: true, // 세션 쿠키 자동 전송
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // 요청 인터셉터 - 토큰 자동 첨부
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('accessToken')
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // 응답 인터셉터 - 에러 처리
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data
      },
      (error) => {
        console.error('API 요청 실패:', error)

        // 에러 응답 처리
        if (error.response) {
          const { status, data } = error.response
          throw new Error(data?.message || `HTTP error! status: ${status}`)
        } else if (error.request) {
          throw new Error('네트워크 오류가 발생했습니다.')
        } else {
          throw new Error('요청 설정 오류가 발생했습니다.')
        }
      },
    )
  }

  // GET 요청
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get(endpoint, config)
  }

  // POST 요청
  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance.post(endpoint, data, config)
  }

  // PUT 요청
  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance.put(endpoint, data, config)
  }

  // PATCH 요청
  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance.patch(endpoint, data, config)
  }

  // DELETE 요청
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete(endpoint, config)
  }
}

// API 클라이언트 인스턴스 생성
export const apiClient = new ApiClient(API_BASE_URL)

// 공통 응답 타입 (백엔드 명세에 맞춤)
export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

// 에러 응답 타입
export interface ApiErrorResponse {
  status: string
  message: string
  code?: string
}

// HTTP 상태 코드 enum
export enum HttpStatus {
  OK = '200',
  CREATED = '201',
  NO_CONTENT = '204',
  BAD_REQUEST = '400',
  UNAUTHORIZED = '401',
  NOT_FOUND = '404',
  INTERNAL_SERVER_ERROR = '500',
}

// 응답 메시지 enum
export enum ResponseMessage {
  LOGIN_SUCCESS = '로그인 성공',
  LOGIN_FAILED = '로그인 실패',
  SIGNUP_SUCCESS = '회원가입이 완료되었습니다.',
  SIGNUP_FAILED = '회원가입 실패',
  LOGOUT_SUCCESS = '로그아웃 되었습니다.',
  EMAIL_VERIFICATION_SENT = '인증 코드가 이메일로 발송되었습니다.',
  EMAIL_VERIFICATION_COMPLETED = '이메일 인증이 완료되었습니다.',
  NICKNAME_AVAILABLE = '사용가능한 닉네임입니다.',
  PROFILE_FETCH_SUCCESS = '조회 성공.',
  PROFILE_UPDATE_SUCCESS = '수정에 성공했습니다.',
  COMMENT_CREATE_SUCCESS = '댓글 등록 완료되었습니다.',
  COMMENT_DELETE_SUCCESS = '댓글이 삭제되었습니다.',
  UNAUTHORIZED = '인증이 필요합니다',
  NOT_FOUND = '리소스를 찾을 수 없습니다',
  INTERNAL_ERROR = '서버 오류가 발생했습니다',
}
