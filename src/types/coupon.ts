export interface Coupon {
  couponId: number
  couponName: string
  discountPrice: string
  minOrderPrice: number
  expirationDate: string
  ownedStatus: 'OWNED' | 'NOT_OWNED'
  quantity: number
  category: string
  openTime?: string
}

export interface UserCoupon {
  couponId: number
  couponName: string
  discountPrice: string
  minOrderPrice: number
  expirationDate: string
  status: 'ACTIVE' | 'INACTIVE'
  useDate: string | null
}

export interface CouponsResponse {
  status: string
  message: string
  data: {
    coupons: Coupon[]
  }
}

export interface UserCouponsResponse {
  status: string
  message: string
  data: {
    userCoupons: UserCoupon[]
  }
}

export interface IssueCouponResponse {
  status: string
  message: string
  data?: {
    couponId: number
  }
}
