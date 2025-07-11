import CouponIssueClient from './_components/CouponIssueClient'

export default function CouponIssuePage() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="badge">🎁 쿠폰 센터</div>
        <h1 className="main-title">
          <span className="gradient-text">쿠폰</span> 발급 센터
        </h1>
        <p className="main-description">
          다양한 할인 혜택을 받아보세요. 매일 새로운 쿠폰이 준비되어 있습니다.
        </p>
      </div>

      {/* Coupon Issue Client Component */}
      <CouponIssueClient />
    </>
  )
}
