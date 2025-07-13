import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(98.79deg,_rgba(212,227,255,0.6)_0%,_rgba(225,216,251,0.6)_100%)] text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7]">
                <span className="text-sm font-bold text-white">T</span>
              </div>
              <span className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-xl font-bold text-transparent">
                TrainUs
              </span>
            </div>
            <p className="mb-4 max-w-md text-gray-700">
              건강한 운동 문화를 만들어가는 운동메이트 플랫폼입니다.
              <br /> 전문 트레이너와 함께하는 맞춤형 운동 레슨을 경험해보세요.
            </p>
            {/* <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/search"
                  className="text-gray-700 transition-colors hover:text-white"
                >
                  레슨 찾기
                </Link>
              </li>
              <li>
                <Link
                  href="/coupons"
                  className="text-gray-700 transition-colors hover:text-white"
                >
                  쿠폰
                </Link>
              </li>
              <li>
                <Link
                  href="/mypage"
                  className="text-gray-700 transition-colors hover:text-white"
                >
                  마이페이지
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-700 transition-colors hover:text-white"
                >
                  로그인
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          {/* <div>
            <h3 className="mb-4 text-lg font-semibold">고객지원</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-700 transition-colors hover:text-white"
                >
                  고객센터
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 transition-colors hover:text-white"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 transition-colors hover:text-white"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 transition-colors hover:text-white"
                >
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              © 2025 TrainUs. All rights reserved.
            </p>
            {/* <div className="mt-4 flex space-x-6 md:mt-0">
              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                이용약관
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                개인정보처리방침
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                쿠키 정책
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
