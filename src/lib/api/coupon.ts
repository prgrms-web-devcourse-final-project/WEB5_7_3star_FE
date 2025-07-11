import {
  CouponsResponse,
  UserCouponsResponse,
  IssueCouponResponse,
} from '@/types/coupon'

// 현재 시간 기준 미래 openTime 생성
const now = new Date()
const in1Hour = new Date(now.getTime() + 60 * 60 * 1000).toISOString()
const in2Hours = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString()

// 임시 더미 데이터
const mockAvailableCoupons = {
  status: '200',
  message: '발급가능한 쿠폰 조회 성공',
  data: {
    coupons: [
      {
        couponId: 201,
        couponName: '오픈런 쿠폰 1',
        discountPrice: '3000',
        minOrderPrice: 10000,
        expirationDate: '2025-07-31T23:59:59',
        ownedStatus: 'NOT_OWNED',
        quantity: 300,
        category: 'openRun',
        openTime: in1Hour, // 1시간 후 오픈예정
      },
      {
        couponId: 202,
        couponName: '오픈런 쿠폰 2',
        discountPrice: '40%',
        minOrderPrice: 20000,
        expirationDate: '2025-08-31T23:59:59',
        ownedStatus: 'NOT_OWNED',
        quantity: 10,
        category: 'openRun',
        openTime: in2Hours, // 2시간 후 오픈예정
      },
      {
        couponId: 203,
        couponName: '신규 회원 환영 쿠폰',
        discountPrice: '5000',
        minOrderPrice: 15000,
        expirationDate: '2025-08-15T23:59:59',
        ownedStatus: 'OWNED',
        quantity: 50,
        category: 'newUser',
        openTime: undefined,
      },
      {
        couponId: 204,
        couponName: '주말 특가 쿠폰',
        discountPrice: '25%',
        minOrderPrice: 30000,
        expirationDate: '2025-07-20T23:59:59',
        ownedStatus: 'NOT_OWNED',
        quantity: 100,
        category: 'weekend',
        openTime: undefined,
      },
      {
        couponId: 205,
        couponName: 'VIP 회원 특별 쿠폰',
        discountPrice: '10000',
        minOrderPrice: 50000,
        expirationDate: '2025-09-30T23:59:59',
        ownedStatus: 'NOT_OWNED',
        quantity: 20,
        category: 'vip',
        openTime: undefined,
      },
      {
        couponId: 206,
        couponName: '일일 출석 쿠폰',
        discountPrice: '1000',
        minOrderPrice: 5000,
        expirationDate: '2025-07-31T23:59:59',
        ownedStatus: 'NOT_OWNED',
        quantity: 1000,
        category: 'daily',
        openTime: undefined,
      },
    ],
  },
}

const mockUserCoupons = {
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
        status: 'ACTIVE',
        useDate: null,
      },
      {
        couponId: 103,
        couponName: '신규 회원 환영 쿠폰',
        discountPrice: '5000',
        minOrderPrice: 15000,
        expirationDate: '2025-08-15T23:59:59',
        status: 'INACTIVE',
        useDate: '2025-07-10T15:30:00',
      },
      {
        couponId: 104,
        couponName: '주말 특가 쿠폰',
        discountPrice: '25%',
        minOrderPrice: 30000,
        expirationDate: '2025-07-20T23:59:59',
        status: 'ACTIVE',
        useDate: null,
      },
    ],
  },
}

export async function getAvailableCoupons(): Promise<CouponsResponse> {
  // 실제 API 호출 대신 더미 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAvailableCoupons as CouponsResponse)
    }, 500) // 0.5초 지연으로 실제 API 호출 시뮬레이션
  })
}

export async function getUserCoupons(): Promise<UserCouponsResponse> {
  // 실제 API 호출 대신 더미 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserCoupons as UserCouponsResponse)
    }, 300) // 0.3초 지연으로 실제 API 호출 시뮬레이션
  })
}

export async function issueCoupon(
  couponId: number,
): Promise<IssueCouponResponse> {
  // 실제 API 호출 대신 성공 응답 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: '200',
        message: '쿠폰 발급 성공',
        data: {
          couponId: couponId,
        },
      })
    }, 1000) // 1초 지연으로 실제 발급 과정 시뮬레이션
  })
}
